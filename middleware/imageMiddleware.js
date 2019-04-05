module.exports = (req, res, next) => {

    var newProfile = JSON.parse(req.body.value)
    let id = req.header("id")
    console.log("id", id)
    console.log("value", req.body.value)
    console.log("file",req.body.image)
    console.log("file",req.file)
    if (req.file.url !== null && req.file.url !== undefined) {
     
        newProfile.imageUrl = req.file.url
        req.body = newProfile
        next()
    } else {
        req.body = newProfile
        next()
    }



}