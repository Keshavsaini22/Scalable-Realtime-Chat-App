import RedisConfigure from './redisConfigure';

class Publisher {
    private client: ReturnType<typeof RedisConfigure.getPublisherClient>;

    constructor() {
        this.client = RedisConfigure.getPublisherClient();
        RedisConfigure.connectPublisher();  // Connect the publisher client
    }

    async publish(channel: string, message: any): Promise<void> {
        try {
            await this.client.publish(channel, JSON.stringify(message));
            console.log(`Message published to channel ${channel}`);
        } catch (error) {
            console.error('Failed to publish message', error);
        }
    }
}

export default new Publisher();
