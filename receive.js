var amqp = require('amqplib/callback_api');
const send = require('./send.js');

// Citation for the following function: 
// Date: 07.22.2022
// Copied from: 
// https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'get_sentence';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function reply(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            if (msg.content.toString() === 'get_sentence')
            {
                send.send()
            } 
        
            channel.ack(msg);
        });
        
    });
});