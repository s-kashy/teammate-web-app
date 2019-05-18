const express = require("express")
const mongoose = require("mongoose");
const http=require("http")
const path = require("path");
var bodyParser = require('body-parser')
const socketio=require("socket.io")
const keys = require("./config/keys")
var cors = require('cors')
const app = express()
const server =http.createServer(app)
const io=socketio(server)
app.use(cors())
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));

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
require("./models/chatTeam")
require("./models/team")


mongoose.set('useCreateIndex', true);
require("./routes/auth")(app)
require("./routes/profile")(app)
require("./routes/emailService")(app)
require("./routes/team")(app)
require("./routes/chatGroup")(app)
require("./socketManager/socketManager")(io)

// app.get('*', function (request, response){

//   response.redirect("/")
// })
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log("listening on port 5000");
});
