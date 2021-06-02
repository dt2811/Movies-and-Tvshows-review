let express = require('express');
const Movie = require('../models/movie');
const User = require('../models/user');
const Show = require('../models/shows');
const Ticket = require('../models/ticket');
const Comment = require('../models/comments');
let router=express.Router();

let isAuthenticated=((req,res,next)=>{

    if(!req.isAuthenticated()){
        req.session.toReturn = req.originalUrl
        req.flash('error','You must Log In First!!');
        return res.redirect('/login');
    }
    next();

})


router.get('/tickets',isAuthenticated,async(req,res)=>{
    let tickets = await Ticket.find().populate('user');
    res.render('bookticket.ejs',{tickets});
})

router.post('/ticket/:id/book/:uid',isAuthenticated,async(req,res)=>{
    let { id, uid } = req.params;
    let user=await User.findById(uid);
    let ticket=await Ticket.findById(id);
    if(ticket.status === 'unsold'){
        
        user.tickets.push(ticket);
        await user.save();
        ticket.user=(user);
        ticket.status = 'sold';
        await ticket.save();
        req.flash('success','Successfully Booked a ticket')
    } else {
        req.flash('error','Ticket Already Sold');
        res.redirect('/tickets');
    }
    res.redirect('/tickets/'+uid);
})

router.get('/tickets/:uid',async(req,res)=>{
    let { uid } = req.params;
    let user=await User.findById(uid).populate('tickets');
    let alltickets = user.tickets;
    res.render('userticket.ejs',{ alltickets });
})

router.post('/ticket/:id/unbook/:uid',isAuthenticated,async(req,res)=>{
    let { id, uid } = req.params;
    // let user=await User.findById(uid);
    let ticket=await Ticket.findById(id);
    let user= await User.findByIdAndUpdate(uid,{ $pull : { tickets : id }});
    // let ticket1 = await Ticket.findByIdAndUpdate(id,{ $pull : { user :uid }});
    ticket.status = "unsold";
    ticket.save();
    req.flash('success',' UnBooked ticket')
    res.redirect('/tickets/'+uid);
})



module.exports = router ;