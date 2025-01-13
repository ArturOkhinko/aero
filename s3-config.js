const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: 'ru-central1',
    endpoint: process.env.STORAGE_URL,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});

module.exports = s3;
