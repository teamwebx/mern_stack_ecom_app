const express  = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/User.js");
const cors = require('cors');
const multer =require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
       cb(null, 'Images') ;
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage});

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb+srv://vipinrao:7411057158@cluster0.ickhurg.mongodb.net/ecom?retryWrites=true&w=majority");

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.get("/getUsers", (req, res) => {
    UserModel.find({},(err, result) => {
        if(err){
            console.log(err);
            res.json(err);
        }else{

            res.json(result);
        }
    });
});

app.post("/createUser",upload.single("image"), async (req, res) => {
    const user = req.body;
    console.log(req.file);
    const newUser = new UserModel(user);
    await newUser.save();

    res.json("success");

})

app.listen(3001, ()=>{
    console.log("server is setup");
});

// app.post("/upload", upload.single("image"), (req, res) => {
//     res.send( Date.now() + path.extname(file.originalname));

//     res.send("Image uploaded");
// });