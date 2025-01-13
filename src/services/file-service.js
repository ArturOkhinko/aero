const path = require('path')
const fileModel = require('../models/file-model')
const storageService = require('../services/storage-service')
const fileRepository = require('../repositories/file-repository')
const ApiError = require('../exceptions/api-error')

class FileService {
    async upload(file) {
        const storageFileName = await storageService.uploadToStorage(file)
        await this.saveToDb(file, storageFileName)
    }

    async saveToDb(file, storageFileName) {
        const {
            linkToStorage,
            size,
            mimetype,
            fileExtName,
        } = this.getDataFromFile(file, storageFileName)

        await fileModel.create({
            linkToStorage,
            size,
            mimeType: mimetype,
            extName: fileExtName,
            name: storageFileName,
        })
    }

    getLinkToStorageByFileName(fileName) {
        return 'https://storage.yandexcloud.net/jwt-test/' + fileName
    }

    async getList(page, list_size) {
        const offset = (page - 1) * list_size

        const { rows: files, count: totalItem } = await fileModel.findAndCountAll({
            limit: list_size,
            offset,
        })

        const totalPages = Math.ceil(totalItem / list_size)

        return {
            files,
            meta: {
                totalItem,
                totalPages,
                currentPage: page
            }
        }
    }

    async delete(id) {
        const file = await fileRepository.findById(id, ['id', 'name'])
        if (!file) {
            throw ApiError.BadRequest('Файла с таким id не существует')
        }

        await storageService.deleteFileFromStorage(file.name)
        await fileRepository.deleteByName(file.name)
    }

    async getFileData(id) {
        const file = await fileRepository.findById(id)
        if (!file) {
            throw ApiError.BadRequest('Файла с таким id не существует')
        }

        return file
    }

    async download(id) {
        const file = await fileRepository.findById(id, ['id', 'name'])
        if (!file) {
            throw ApiError.BadRequest('Файла с таким id не существует')
        }
        const fileFromStorage = await storageService.getFileFromStorage(file.name)
        return {
            fileStream: fileFromStorage.Body,
            name: file.name
        }
    }

    async update(file, id) {
        const fileFromDb = await fileRepository.findById(id, ['id', 'name'])
        const {
            linkToStorage,
            size,
            mimetype,
            fileExtName,
            buffer,
        } = this.getDataFromFile(file, fileFromDb.name)
        await storageService.updateFileToStorage(buffer, fileFromDb.name, mimetype)
        await fileRepository.updateById(
            {
                size,
                mimeType: mimetype,
                linkToStorage,
                extName: fileExtName
            },
            id
        )
    }

    getDataFromFile(file, storageFileName) {
        const linkToStorage = this.getLinkToStorageByFileName(storageFileName)
        const { size, mimetype, originalname, buffer } = file
        const fileExtName = path.extname(originalname)

        return {
            linkToStorage,
            size,
            mimetype,
            fileExtName,
            originalname,
            buffer
        }
    }
}

module.exports = new FileService()
