// call each of the functions with sample static data
// import { User, UserStatus } from "./proto/user_pb";
// import { User } from "./proto/users/User";
import { User, UserStatus } from "../server/proto/user_pb";
import allUsers from "./user/all-users";
import createUsers from "./user/create-users";
import getUser from "./user/get-user";


async function run() {
    // get a user with id 1
    const user = await getUser(1);
    console.log(user.toString());


    // create a simple user called jim
    const jim = new User();
    jim.setName("Jim");
    jim.setAge(10);
    jim.setId(20);
    jim.setStatus(UserStatus.OFFLINE);
    createUsers([jim]);
    console.log(`\nCreated user ${jim.toString()}`);

    // stream all available users to console.log
    const users = await allUsers();
    console.log(`\nListing all ${users.length} users`);
    for (const user of users) {
        console.log(user.toString());
    }
}

run();
