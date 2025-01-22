// utilities class that will contain the grpc connection to the server

import { UsersClient } from "../proto/user_grpc_pb";
import { credentials } from "@grpc/grpc-js";


const port = 3100;

export const client = new UsersClient(
    `localhost:${port}`,
    credentials.createInsecure()
);

export const noop = () => {};
