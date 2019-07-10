const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    //Padronizando caminho do projeto, e retornando dois caminhos de pastas até a pasta temp
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    //Definindo o método de armazenamento para armazenamento em disco
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        },
    })
}