const Router = require('express')
const FileController = require('../controllers/file-controller')
const upload = require('../middlewares/upload-middleware')

const router = Router()

router.post('/upload', upload.single('file'), FileController.upload)
router.get('/list', FileController.getList)
router.delete('/delete/:id', FileController.delete)
router.get('/:id', FileController.getFileData)
router.get('/download/:id', FileController.download)

module.exports = router
