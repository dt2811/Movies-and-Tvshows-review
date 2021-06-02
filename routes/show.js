let express = require('express');

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

router.get('/shows',async(req,res)=>{
    let shows  = await Show.find();
    res.render('allshows.ejs', { shows });
})

router.get('/show/:id',isAuthenticated,async(req,res)=>{

    let { id } = req.params;
    let s = await Show.findById(id).populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).populate('user') ;
    res.render('show.ejs',{ s });
})

router.post('/show/:id/comment/:uid',async(req,res)=>{
    let { text } = req.body;
    let { id, uid } = req.params;

    let u=await User.findById(uid);
    var months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    let c={
        text,
        date:`${d.getDate()} ${months[d.getMonth()]}`
    };
    
    let comment = new Comment(c);
    comment.user=(u);
    comment.save();

    let show=await Show.findById(id);
    show.comments.push(comment);
    show.save();
    
    req.flash('success','Successfully Created Comment')
    res.redirect('/show/'+id);

})

router.post('/show/:id/commentdelete/:uid',async(req,res)=>{
    let { id, uid } = req.params;
    let show=await Show.findByIdAndUpdate(id,{ $pull : { comments: uid}});
    await show.save();
    res.redirect('/show/'+id)
});

router.get('/show/:id/commentedit/:uid',async(req,res)=>{
    let { id, uid } = req.params;   
    let comment = await Comment.findById(uid);
    res.render('editcomment1.ejs',{ comment,id })
});

router.post('/show/:id/commentedit/:uid',async(req,res)=>{
    let { text } = req.body;
    let { id, uid } = req.params;

    var months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    let c={
        text,
        date:`${d.getDate()} ${months[d.getMonth()]}`
    };
    
    let comment = await Comment.findByIdAndUpdate(uid, c);
    comment.save();
    console.log(comment)
    res.redirect('/show/'+id);
});

router.post('/show/:id/addToCart/:uid',async(req,res)=>{
    let { id, uid } = req.params;
    let user=await User.findById(uid).populate('shows');
    let show = await Show.findById(id);
    let Allshows = user.shows;
    if(Allshows.some(s => JSON.stringify(s._id) === JSON.stringify(show._id))){
        console.log("object already present");
        req.flash('error','Object Already Present');
    } else {
        user.shows.push(show);
        user.save();
        req.flash('success','Successfully Added Show to WatchList')
    }
    
    res.redirect('/movie/cart/'+uid);
})

router.post('/show/:id/removeFromCart/:uid',async(req,res)=>{

    let { id, uid } = req.params;
    // let user=await User.findById(uid).populate('movies');
    let show=await Show.findById(id);
    let user= await User.findByIdAndUpdate(uid,{ $pull : { shows : id }})
    
    res.redirect('/movie/cart/'+uid);

})

module.exports = router ;