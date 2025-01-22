import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { User } from "../proto/user_pb";
import { client } from "./utils";


// will listen to data pushed to client from the server
// create an array and return the array once the stream has finished
export default function allUsers() {
    return new Promise<User[]>((resolve, reject) => {
        const stream = client.getUsers(new Empty());
        const users: User[] = [];

        stream.on("data", (user: User) => users.push(user));
        stream.on("error", reject);
        stream.on("end", () => resolve(users));

    });
}