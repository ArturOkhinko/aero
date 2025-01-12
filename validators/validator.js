const { body } = require('express-validator')

function userContactValidation() {
    return body('id')
        .custom(value => {
            const isEmail = /\S+@\S+\.\S+/.test(value)
            if (isEmail) {
                return true
            }
            const isPassword = /^\+?[0-9]{10,15}$/.test(value)
            if (isPassword) {
                return true
            }

            throw new Error('Контакт должен быть номером телефона или email')
        });
}

module.exports = userContactValidation
