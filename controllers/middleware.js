const keyboards = require('./keyboards');
const User = require('../data/db');
const { generateRandomInt } = require('../helpers/utils');

// async function handleStartCommand(msg, bot) {
//     await bot.sendMessage(msg.chat.id, "Привіт! Як ми можемо зв'язатися з тобою?", keyboards.getContactsKeyboard);
//
//     const contactHandler = async (msg) => {
//         const isUser = await User.findOne({phone: msg.contact?.phone_number});
//
//         if (!isUser) {
//             const randomInt = generateRandomInt(1, 30);
//
//             const newCoffeeDate = new Date();
//             newCoffeeDate.setDate(newCoffeeDate.getDate() + randomInt)
//
//             const newUser = new User({
//                 userId: msg.from.id,
//                 name: msg.contact.first_name,
//                 phone: msg.contact.phone_number,
//                 coffeeDate: newCoffeeDate
//             });
//
//             await newUser.save();
//             await bot.sendMessage(msg.chat.id, `Отримай свою безкоштовну каву ${newCoffeeDate.toLocaleDateString()}`, keyboards.whenCoffeeKeyboard);
//
//         } else {
//             await bot.sendMessage(msg.chat.id, 'Ти вже брав участь', keyboards.whenCoffeeKeyboard);
//         }
//
//         // remove event listener after it has been triggered once
//         bot.removeListener('contact', contactHandler);
//     };
//
//     bot.on('contact', contactHandler);
// }

async function handleStart(msg, bot) {
    await bot.sendMessage(msg.chat.id, "Привіт! Як ми можемо зв'язатися з тобою?", keyboards.getContactsKeyboard)
}

async function handleContact(msg, bot) {
    const isUser = await User.findOne({phone: msg.contact?.phone_number})

    if (!isUser) {
        const randomInt = generateRandomInt(1, 30);

        const newCoffeeDate = new Date();
        newCoffeeDate.setDate(newCoffeeDate.getDate() + randomInt)

        const newUser = new User({
            userId: msg.from.id,
            name: msg.contact.first_name,
            phone: msg.contact.phone_number,
            coffeeDate: newCoffeeDate
        })

        await newUser.save();
        await bot.sendMessage(msg.chat.id, `Отримай свою безкоштовну каву ${newCoffeeDate.toLocaleDateString()}`, keyboards.whenCoffeeKeyboard)
    } else {
        await bot.sendMessage(msg.chat.id, 'Ти вже брав участь', keyboards.whenCoffeeKeyboard);
    }
}

async function handleNoResponse(msg, bot) {
    await bot.sendMessage(msg.chat.id, 'Повертайся, якщо передумаєш');
}

async function handleWhenCoffeeResponse(msg, bot) {
    const user = await User.findOne({userId: msg.from.id});

    console.log('User: ', user)

    if (user) {
        const coffeeDate = new Date(user.coffeeDate);
        const currentDate = new Date();

        coffeeDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        let whenCoffeeMessage;

        if (coffeeDate < currentDate) {
            whenCoffeeMessage = `Ваша безкоштовна кава була ${coffeeDate.toLocaleDateString()}`;
        } else if (coffeeDate.getTime() === currentDate.getTime()) {
            whenCoffeeMessage = `Ваша безкоштовна кава сьогодні ${coffeeDate.toLocaleDateString()}`;
        } else {
            whenCoffeeMessage = `Отримай свою безкоштовну кавy ${coffeeDate.toLocaleDateString()}`;
        }
        await bot.sendMessage(msg.chat.id, whenCoffeeMessage);
    } else {
        await bot.sendMessage(msg.chat.id, 'Обери варіант нижче', keyboards.getContactsKeyboard)
    }
}

async function handleOtherMessages(msg, bot) {
    await bot.sendMessage(msg.chat.id, 'Обери щось з варіантів нижче', keyboards.getContactsKeyboard);
}

module.exports = {
    handleStart,
    handleContact,
    handleNoResponse,
    handleWhenCoffeeResponse,
    handleOtherMessages
}

