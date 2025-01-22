import { Server, ServerCredentials} from "@grpc/grpc-js";
import { GreeterServer, UsersServer } from "./services";
import { UsersService } from "./proto/user_grpc_pb";
import { GreeterService } from "./proto/helloworld_grpc_pb";


const server = new Server();
server.addService(GreeterService, GreeterServer)
server.addService(UsersService, UsersServer);

const port = 3100;
const uri = `localhost:${port}`;
console.log(`Listening on ${uri}`);
server.bindAsync(uri, ServerCredentials.createInsecure(), (err) => {
    if (err) console.log(err);
  });

