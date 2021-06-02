let mongoose=require('mongoose');
let User=require('./user');

let ticketSchema=new mongoose.Schema({
    row:String,
    seatnumber:String,
    moviename:String,
    timing:String,
    date:String,
    status:{
        type:String,
        enum:['sold','unsold']
    },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
})


let Ticket = mongoose.model('Ticket',ticketSchema);

module.exports = Ticket;