const express =  require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({extended: true})); // giup doc duoc data theo kieu array or obj

app.use('/',(rep,res)=>{res.send('SERVER ON')});

app.listen(port,()=>{
    console.log("server running on the port: " + port);
});