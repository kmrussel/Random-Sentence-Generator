var amqp = require('amqplib/callback_api');
const randModule = require('./index.js');

function send () {
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        randModule.randSentence().then((res) => {
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