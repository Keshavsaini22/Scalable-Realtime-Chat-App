import { Server } from "socket.io";
import publisher from './pub-sub/publish';
import subscriber from "./pub-sub/subscribe"; // Assuming you have a subscriber module

class SocketService {
    private _io: Server;

    constructor() {
        console.log("Init socket service");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            }
        });

        // Set the io instance in the subscriber
        subscriber.setIo(this._io);
        
        // subscribe to redis
        subscriber.subscribe('MESSAGE');
    }

    public initListeners() {
        const io = this.io;
        console.log("INIT LISTENERS................");

        io.on("connection", (socket) => {
            console.log("New socket connection: ",socket.id);

            socket.on('event:message', async ({ message }: { message: string }) => {
                console.log('New message: ', message);
                //publish message to redis
                await publisher.publish('MESSAGE', {  message });
            })

            socket.on("disconnect", () => {
                console.log("Socket disconnected: " + socket.id);
            });
        });
    }

    get io() {
        return this._io;
    }
}

export default SocketService;