import multer from "multer";

class multerMiddleware {
    static upload = multer({
        storage: multer.memoryStorage(),
    });
}

export default multerMiddleware;