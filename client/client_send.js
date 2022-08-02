const receive = require('./client_receive.js')
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'get_sentence';
        var msg = 'get_sentence';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
        receive.receive()
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
