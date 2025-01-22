import { User, UserRequest } from "../proto/user_pb";
import { client } from "./utils";

// will accept an id and
// return a promise that contains the user returned from the server
export default function getUsers(id: number) {
    return new Promise<User>((resolve, reject) => {
        const request = new UserRequest();
        request.setId(id);

        client.getUser(request, (err, user) => {
            if (err) reject(err);
            else resolve(user);
        })
    })
}