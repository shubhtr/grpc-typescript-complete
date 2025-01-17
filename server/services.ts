// grpc services

import { 
    sendUnaryData, 
    ServerReadableStream, 
    ServerUnaryCall, 
    ServerWritableStream, 
    ServiceError 
} from "@grpc/grpc-js";
import { IUsersServer } from "../proto/users_grpc_pb";
import { User, UserRequest } from "../proto/users_pb";
import { users } from "./db"
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

export class UsersServer implements IUsersServer {

    ////////////////////////////////
    // GetUser
    // 
    // find the user based on the id
    // if user not found, throw a simple error
    ////////////////////////////////
    getUser(call: ServerUnaryCall<UserRequest>, callback: sendUnaryData<User>) {
        const userId = call.request.getId();
        const user = users.find((u) => u.getId() === userId);

        if (!user) {
            const error: ServiceError = {
                name: "User Missing",
                message: `User with ID ${userId} does not exist.`,
            };
            callback(error, null);
            return;
        }

        console.log(`getUser: returning ${user.getName()} (id: ${user.getId()})`);
        callback(null, user);
    }

    ////////////////////////////////
    // GetUsers
    //
    // it will write all the users to the stream passed in as the argument
    ////////////////////////////////
    getUsers(call: ServerWritableStream<Empty>) {
        console.log(`getUsers: streaming all users.`);
        for (const user of users) call.write(user);
        call.end();
    }

    ////////////////////////////////
    // CreateUsers
    //
    // it will listen for users and then push
    // them on the user array that we previously created 
    // also a counter to see how many users created in one stream 
    //////////////////////////////////
    createUser(call: ServerReadableStream<Empty>, callback: sendUnaryData<Empty>) {
        console.log(`createUsers: creating new users from stream.`);

        let userCount = 0;

        call.on("data", (u) => {
            userCount++;
            users.push(u);
        });

        call.on("end", (u) => {
            console.log(`Created ${userCount} new user(s)`);
            callback(null, new Empty());
        })
    }
}