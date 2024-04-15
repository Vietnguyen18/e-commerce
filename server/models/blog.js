const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        unique:true,
    },
    numberViews:{
        type:Number,
        default:0,
    },
    likes:[
        {
            type: mongoose.Types.ObjectId,ref: 'User'
        }
    ],
    disLikes:[
        {
            type: mongoose.Types.ObjectId,ref: 'User'
        }
    ],
    images:{
        type: String,
        default: 'https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=75,format=auto,fit=crop,height=630/uploads/sites/2/2023/08/Colour-Scheme-Trends-Blog.jpeg',
    },
    author: {
        type:String,
        default: 'admin',
    }
},{
    timestamps: true,
    toJSON: {virtuals:true}, // chay khi dung ham json
    toObject: {virtuals:true} //
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);