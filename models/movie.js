let mongoose=require('mongoose');
let Comment=require('./comments');

let movieSchema = new mongoose.Schema({

    Title:String,
    Year:String,
    Runtime:String,
    Genre:String,
    Director:String,
    Actors:String,
    Plot:String,
    imdbRating:String,
    Poster:String,
    youtube:String,

    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]




})



let Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie;