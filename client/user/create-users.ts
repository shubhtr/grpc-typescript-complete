import { User } from "../proto/user_pb";
import { client, noop } from "./utils";

// will accept an array of users, 
// create a stream connection to the backend
// and write each user to that stream
export default function createNewUsers(users: User[]) {
    const stream = client.createUsers(noop);
    
    for(const user of users) {
        stream.write(user);
    }
    stream.end();
}