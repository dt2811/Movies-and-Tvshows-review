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

router.get('/movies',async(req,res) => {
    let movies = await Movie.find();
    res.render('allmovies.ejs',{movies});
})

router.get('/movie/:id',isAuthenticated,async(req,res)=>{

    let { id } = req.params;

    let m = await Movie.findById(id).populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).populate('user') ;

    res.render('movie.ejs',{ m });
})





router.post('/movie/:id/comment/:uid',async(req,res)=>{
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

    let movie=await Movie.findById(id);
    movie.comments.push(comment);
    movie.save();
    // console.log(movie,comment);
    req.flash('success','Successfully Created Comment')
    res.redirect('/movie/'+id);

})

router.post('/movie/:id/commentdelete/:uid',async(req,res)=>{
    let { id, uid } = req.params;
    let movie=await Movie.findByIdAndUpdate(id,{ $pull : { comments: uid}});
    await movie.save();
    res.redirect('/movie/'+id)
});

router.get('/movie/:id/commentedit/:uid',async(req,res)=>{
    let { id, uid } = req.params;   
    let comment = await Comment.findById(uid);
    res.render('editcomment.ejs',{ comment,id })
});

router.post('/movie/:id/commentedit/:uid',async(req,res)=>{
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
    res.redirect('/movie/'+id);
});

router.post('/movie/:id/addToCart/:uid',async(req,res)=>{

    let { id, uid } = req.params;
    let user=await User.findById(uid).populate('movies');
    let movie=await Movie.findById(id);
    let Allmovie=user.movies;
    // console.log((user.movies).includes(movie));

    if(Allmovie.some(m => JSON.stringify(m._id) === JSON.stringify(movie._id))){
        
        req.flash('error','Object Already Present');
    } else{

        user.movies.push(movie);
        user.save();
        req.flash('success','Successfully Added Movie to WatchList')
        
    }
    
    res.redirect('/movie/cart/'+uid);

})


router.post('/movie/:id/removeFromCart/:uid',async(req,res)=>{

    let { id, uid } = req.params;
    // let user=await User.findById(uid).populate('movies');
    let movie=await Movie.findById(id);
    let user= await User.findByIdAndUpdate(uid,{ $pull : { movies : id }})
    
    res.redirect('/movie/cart/'+uid);

})



router.get('/movie/cart/:uid',isAuthenticated,async(req,res)=>{
    let { uid } = req.params;
    let user=await User.findById(uid).populate('movies').populate('shows');
    
    let allmovies = (user.movies);
    let allshows  = (user.shows);
    res.render('cart.ejs',{ allmovies , allshows });
})



module.exports = router ;

