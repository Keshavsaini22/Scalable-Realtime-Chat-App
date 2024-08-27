import { createClient, RedisClientType } from 'redis';

class RedisConfigure {
    private static publisherClient: RedisClientType;
    private static subscriberClient: RedisClientType;

    private constructor() {}  // Private constructor to prevent instantiation

    public static getPublisherClient(): RedisClientType {
        if (!this.publisherClient) {
            this.publisherClient = createClient({
                url: `redis://localhost:6379`
            });
            this.publisherClient.on('error', (err: Error) => console.log('Redis Publisher Client Error', err));
        }
        return this.publisherClient;
    }

    public static getSubscriberClient(): RedisClientType {
        if (!this.subscriberClient) {
            this.subscriberClient = createClient({
                url: `redis://localhost:6379`
            });
            this.subscriberClient.on('error', (err: Error) => console.log('Redis Subscriber Client Error', err));
        }
        return this.subscriberClient;
    }

    public static async connectPublisher(): Promise<void> {
        const client = this.getPublisherClient();
        if (!client.isOpen) {
            try {
                await client.connect();
                console.log("Connected to Redis Publisher");
            } catch (error) {
                console.error("Failed to connect to Redis Publisher", error);
            }
        }
    }

    public static async connectSubscriber(): Promise<void> {
        const client = this.getSubscriberClient();
        if (!client.isOpen) {
            try {
                await client.connect();
                console.log("Connected to Redis Subscriber");
            } catch (error) {
                console.error("Failed to connect to Redis Subscriber", error);
            }
        }
    }
}

export default RedisConfigure;
