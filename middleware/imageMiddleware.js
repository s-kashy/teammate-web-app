module.exports = (req, res, next) => {

    var newProfile = JSON.parse(req.body.value)

    if (req.file.url !== null && req.file.url !== undefined) {
        if (req.file.url !== newProfile.imageUrl) {
            console.log(req.file.url != newProfile.imageUrl)
            newProfile.imageUrl = req.file.url
            req.body = newProfile
            next()
        }
    } else {
        req.body = newProfile
        next()
    }



}