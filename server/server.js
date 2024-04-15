const express =  require('express');
require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes')
const cookieParser =  require('cookie-parser');

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({extended: true})); // giup doc duoc data theo kieu array or obj
dbConnect();
initRoutes(app)

// app.use('/',(rep,res)=>{res.send('SERVER ON')});

app.listen(port,()=>{
    console.log("server running on the port: " + port);
});