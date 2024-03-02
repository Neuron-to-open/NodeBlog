

async function uploadFile(req, res) {
    const {file} = req ;

    if (!file){
        return res.status(400).json({ message: "No file provided" });
    }

    // 返回图片地址
    res.json({ msg: "File uploaded successfully!", filePath: file.path}) ;
} ;



module.exports = { uploadFile } ;