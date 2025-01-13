const {DeleteObjectCommand, GetObjectCommand, PutObjectCommand} = require('@aws-sdk/client-s3')
const s3 = require('../../s3-config')

class FileService {
    async uploadToStorage(file) {
        const key = Date.now() + file.originalname
        const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        }

        const command = new PutObjectCommand(uploadParams)

        await s3.send(command)
        return key
    }

    async getFileFromStorage(key) {
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        });
        return await s3.send(command)
    }

    async updateFileToStorage(fileContent, key, mimeType) {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: fileContent,
            ContentType: mimeType
        }

        const command = new PutObjectCommand(params)
        return await s3.send(command)
    }

    async deleteFileFromStorage(key) {
        const deleteParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        }

        const command = new DeleteObjectCommand(deleteParams)
        await s3.send(command)
    }
}

module.exports = new FileService()
