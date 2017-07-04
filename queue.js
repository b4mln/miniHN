const amqp = require("amqp");

const connection = amqp.createConnection({ host: 'rabbit' });

module.exports = function(exchangeName) {
    // Initialize the exchange, queue and subscription
    return new Promise((resolve, err) => {

        connection.on('ready', function () {
            connection.exchange(exchangeName, { type: "direct" }, function (exchange) {
                resolve(exchange);
            });
        });
    });
};
