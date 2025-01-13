
class UserDto {
    id;
    userContact;

    constructor(userModel) {
        this.id = userModel.id
        this.userContact = userModel.userContact
    }
}

module.exports = UserDto
