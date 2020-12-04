const multer  = require('multer')
const crypto = require('crypto');
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        let customFileName = crypto.randomBytes(18).toString('hex')
        let fileExtensionArr = file.originalname.split('.');
        fileFullName = Date.now() + customFileName + '.' + fileExtensionArr[fileExtensionArr.length - 1];
        cb(null, fileFullName);
    }
});


//USED TO CONTROL FILE EXTESIONS
const fileFilter = (req,file,cb) =>{
    console.log(file);
    if(file.mimetype == "text/csv")
    {
        cb(null,true)
        let fileResp = {
            orgFile : file,
            newFile : fileFullName

        }
        req.importedFileInfo = fileResp;
    }else{
        cb(null,false)
        let fileResp = {
            msg : 'Invalid File Type'
        }
        req.importedFileInfo = fileResp;
    }
    
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}); 

module.exports = upload;