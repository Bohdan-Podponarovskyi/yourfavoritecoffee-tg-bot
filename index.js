const express = require('express');
const bot = require('./config.js');
const handlers = require('./controllers/middleware');

require('dotenv').config();

const app = express();
app.use(express.json());
app.post('/webhook', (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});
app.listen(3000, () => console.log('Server running on port 3000'));

bot.on('message', async (msg) => {
    try {
        if (msg.text === '/start') {
            await handlers.handleStart(msg, bot);
        } else if (msg.contact) {
            await handlers.handleContact(msg, bot);
        } else if (msg.text === 'Не треба') {
            await handlers.handleNoResponse(msg, bot);
        } else if (msg.text === 'Коли я отримаю свою безкоштовну каву?') {
            await handlers.handleWhenCoffeeResponse(msg, bot);
        } else {
            await handlers.handleOtherMessages(msg, bot);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
});