module.exports = {
    http: {
        port: 3000
    },
    queue: {
        exchangeName: "minihn.posts"
    },
    storage: {
        username: "minihn",
        password: "minihn",
        database: "minihn",
        config: {
            host: 'localhost',
            dialect: 'postgres'
        }
    }
};