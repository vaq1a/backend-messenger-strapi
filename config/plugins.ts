export default ({ env }) => ({
    "strapi-plugin-populate-deep": {
        config: {
            defaultDepth: 5,
        },
    },
    io: {
        enabled: true,
        config: {
            IOServerOptions: {
                cors: { origin: env('SOCKET_HOST'), methods: ["GET", "POST"] },
            },
            contentTypes: {
                message: "*",
                chat: ["create"],
            },
            events: [
                {
                    name: "connection",
                    handler: ({ strapi }, socket) => {
                        strapi.log.info(`[io] new connection with id ${socket.id}`);

                        socket.on("client-message", async (messageData) => {
                            strapi.$io.raw("server-message", messageData);
                        });
                    },
                },
            ],
        },
    },
});
