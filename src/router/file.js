const Router = require('express')
const FileController = require('../controllers/file-controller')
const upload = require('../middlewares/upload-middleware')
const authMiddleware = require('../middlewares/auth-middleware')

const router = Router()

router.post('/upload', authMiddleware, upload.single('file'), FileController.upload)
router.get('/list', authMiddleware, FileController.getList)
router.delete('/delete/:id', authMiddleware, FileController.delete)
router.get('/:id', authMiddleware, FileController.getFileData)
router.get('/download/:id', authMiddleware, FileController.download)
router.get('/update/:id', authMiddleware, upload.single('file'), FileController.update)

module.exports = router
