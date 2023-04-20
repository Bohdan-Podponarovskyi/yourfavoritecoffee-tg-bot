const getContactsKeyboard = {
    "reply_markup": {
        "resize_keyboard": true,
        "keyboard": [[{
            text: 'Номер телефону',
            request_contact: true,
            one_time_keyboard: true
        }], ['Не треба']]
    }
};

const whenCoffeeKeyboard = {
    "reply_markup": {
        "resize_keyboard": true,
        "keyboard": [['Коли я отримаю свою безкоштовну каву?']],
        one_time_keyboard: true
    }
}

module.exports = {
    getContactsKeyboard,
    whenCoffeeKeyboard
};