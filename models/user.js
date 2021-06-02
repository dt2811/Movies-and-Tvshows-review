let mongoose=require('mongoose');
let passportLocalMongoose=require('passport-local-mongoose');
let Movie=require('./movie')
let Show =require('./shows')
let Ticket =require('./ticket');

let userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    movies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Movie'
        }
    ],
    shows:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Show'
        }
    ],
    tickets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Ticket'
        }
    ]
})

userSchema.plugin(passportLocalMongoose);

let User=mongoose.model('User',userSchema);

module.exports = User;