const express = require("express")
const mongoose = require("mongoose");
const path = require("path");
const cookieParser= require("cookie-parser")
var bodyParser = require('body-parser')
const keys = require("./config/keys")
var fileUpload= require('express-fileupload');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(fileUpload())
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(
    keys.MONGO_DB,
    { useNewUrlParser: true }, (err, db) => {
        console.log("mLab connected")
    }
);
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false);
require("./models/user")
require("./models/profile")




mongoose.set('useCreateIndex', true);
require("./routes/auth")(app)
require("./routes/profile")(app)

app.get('*', function (request, response){
    // response.sendFile(path.resolve(__dirname, './client/public/', 'index.html'))
  response.redirect("/")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("listening on port 5000");
});
