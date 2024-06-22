import multer from 'multer'
import path from 'path'
const store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), '/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})



const upload = multer({
    storage: store,
})

export default upload;