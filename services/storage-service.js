const {DeleteObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");
const s3 = require("../s3-config");

class FileService {
    async deleteFileFromStorage(key) {
        const deleteParams = {
            Bucket: 'jwt-test',
            Key: key,
        }

        const command = new DeleteObjectCommand(deleteParams)
        await s3.send(command)
    }

    async getFileFromStorage(key) {
        const command = new GetObjectCommand({
            Bucket: 'jwt-test',
            Key: key,
        });
        const file = await s3.send(command)
        return file.Body
    }
}

module.exports = new FileService()
