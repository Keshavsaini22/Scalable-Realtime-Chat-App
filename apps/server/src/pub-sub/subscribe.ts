import { Server } from 'socket.io';
import RedisConfigure from './redisConfigure';

class Subscriber {
    private client: ReturnType<typeof RedisConfigure.getSubscriberClient>;
    private io?: Server;

    constructor() {
        this.client = RedisConfigure.getSubscriberClient();
        RedisConfigure.connectSubscriber();  // Connect the subscriber client
    }

    public setIo(io: Server) {
        this.io = io;
    }

    public async subscribe(channel: string) {
        this.client.subscribe(channel, (message) => {
            console.log(`Received message: ${message}`);
            if (this.io) {
                this.io.emit('message', message);  // Emit message to all connected clients
            }
        });
    }
}

export default new Subscriber();
