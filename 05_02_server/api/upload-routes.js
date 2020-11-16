const routes = require('express').Router();
const path = require('path');
const data = require('../db/db.json');

const upload = require('../middleware/upload');
const ImageResize = require('../app/image-resize');

routes.post('/image', upload.single('image'), 
    async function (req, res) {
        
        let dirPath = __dirname.split("/");dirPath.pop();
        let parentPath = dirPath.join("/");
        const imagePath = path.join(parentPath, '/public/images');

        const fileUpload = new ImageResize(imagePath);

        if (!req.file) {
          res.status(401).json({error: 'Please provide an image'});
        }
        const filename = await fileUpload.save(req.file.buffer);

        return res.status(200).json({ 
            dir: 'images',
            url: `images/${filename}`,
            image: filename 
        });
    }
);

module.exports = routes;
