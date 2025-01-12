const {PutObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3");
const s3 = require('../s3-config')
const path = require('path')
const fileModel = require("../models/file-model");
const storageService = require("../services/storage-service")
const fileRepository = require("../repositories/file-repository")
const ApiError = require('../exceptions/api-error')

class FileService {
    async upload(file) {
        const storageFileName = await this.uploadToStorage(file)
        await this.saveToDb(file, storageFileName)
    }

    async uploadToStorage(file) {
        const key = Date.now() + file.originalname
        const uploadParams = {
            Bucket: 'jwt-test',
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        }

        const command = new PutObjectCommand(uploadParams)

        await s3.send(command)
        return key
    }

    async saveToDb(file, storageFileName) {
        const linkToStorage = this.getLinkToStorageByFileName(storageFileName)
        const { size, mimetype } = file
        const fileExtName = path.extname(storageFileName)
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
        return await storageService.getFileFromStorage(file.name)
    }
}

module.exports = new FileService()
