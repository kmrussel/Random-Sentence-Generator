var amqp = require('amqplib/callback_api');
const randModule = require('./languages.js');

// Citation for the following function: 
// Date: 07.22.2022
// Adapted from: 
// https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
function send () {
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        randModule.getSentence().then((res) => {
            var queue = 'rand_sentence';
            var msg = JSON.stringify(res)
    
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
    
            console.log(" [x] Sent %s", msg);
        })

    });
});
}

module.exports = {send}