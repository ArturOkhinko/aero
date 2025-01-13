const ApiError = require('../exceptions/api-error')
const fileService = require('../services/file-service')

class FileController {
    async upload(req, res, next) {
        try {
            const file = req.file
            if (!file) {
                return next(ApiError.BadRequest('Отсутствует файл'))
            }
            await fileService.upload(file)
            return res.sendStatus(200)
        }
        catch(e) {
            next(e)
        }
    }

    async getList(req, res, next) {
        try {
            const page = Number(req.query.page) || 1
            const list_size = Number(req.query.list_size) || 10

            const files = await fileService.getList(page, list_size)
            res.json(files)
        }
        catch(e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const id = Number(req.params.id)
            await fileService.delete(id)
            res.sendStatus(200)
        }
        catch(e) {
            next(e)
        }
    }

    async getFileData(req, res, next) {
        try {
            const id = Number(req.params.id)
            const file = await fileService.getFileData(id)
            res.json(file)
        }
        catch(e) {
            next(e)
        }
    }

    async download(req, res, next) {
        try {
            const id = Number(req.params.id)
            const fileData = await fileService.download(id)
            res.setHeader('Content-Type', fileData.fileStream.headers['content-type']);
            res.setHeader('Content-Disposition', `attachment; filename="${fileData.name}"`); // Укажите имя файла

            fileData.fileStream.pipe(res);
        }
        catch(e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const file = req.file
            const id = Number(req.params.id)
            if (!file) {
                return next(ApiError.BadRequest('Отсутствует файл'))
            }
            await fileService.update(file, id)
            res.sendStatus(200)
        }
        catch(e) {
            next(e)
        }
    }
}

module.exports = new FileController()
