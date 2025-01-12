const fileModel = require('../models/file-model')

class FileRepository {
    async findById(id, attributes) {
        return await fileModel.findOne({
            where: {
                id,
            },
            attributes,
        })
    }

    async deleteByName(name) {
        return await fileModel.destroy({
            where: {
                name
            }
        })
    }
}

module.exports = new FileRepository()
