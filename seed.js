let mongoose=require('mongoose');
let Movie = require('./models/movie');
let Show = require('./models/shows');
const Ticket = require('./models/ticket');
let Comment = require('./models/comments');
const dburl='mongodb://localhost:27017/movieSite';


mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!yeahhhhh");
});

let mov=[
    {
        "Title":"Dunkirk",
        "Year":"2017","Runtime":"106 min",
        "Genre":"Action, Drama, History, Thriller, War",
        "Director":"Christopher Nolan",
        "Actors":"Fionn Whitehead, Damien Bonnard, Aneurin Barnard, Lee Armstrong",
        "Plot":"Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War ",
        "imdbRating":"7.8",
        "Poster":"https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg0MTEtYzJmMWY3MWRhZjM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg",
        "youtube":"https://www.youtube.com/embed/DMOBlEcRuw8"
    },
    {
        Title:"Behind Enemy Lines",
        Year:"2001",
        Runtime:"106 min",
        Genre:"Action, Drama, Thriller, War",
        Director:"John Moore",
        Actors:"Owen Wilson, Gene Hackman, Gabriel Macht, Charles Malik Whitfield",
        Plot:"A Navy navigator is shot down over enemy territory and is ruthlessly pursued by a secret police enforcer and the opposing troops. Meanwhile his commanding officer goes against orders in an attempt to rescue him.",
        imdbRating:"6.4",
        Poster:"https://m.media-amazon.com/images/M/MV5BM2RhNjdlYjMtOTM4Ni00MWZhLTkyZmItNmI2NDkxMjBhYTJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        youtube:"https://www.youtube.com/embed/PUeWBp_kmuo"
    },
    {
        "Title":"The Pursuit of Happyness",
        "Year":"2006",
        "Runtime":"117 min",
        "Genre":"Biography, Drama",
        "Director":"Gabriele Muccino",
        "Actors":"Will Smith, Jaden Smith, Thandie Newton, Brian Howe",
        "Plot":"A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
        "imdbRating":"8.0",
        "Poster":"https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_SX300.jpg",
        "youtube":"https://www.youtube.com/embed/DMOBlEcRuw8"
     },
     {
        "Title":"The Imitation Game",
        "Year":"2014",
        "Runtime":"114 min",
        "Genre":"Biography, Drama, Thriller, War",
        "Director":"Morten Tyldum",
        "Actors":"Benedict Cumberbatch, Keira Knightley, Matthew Goode, Rory Kinnear",
        "Plot":"During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians.",
        "imdbRating":"8.0",
        "Poster":"https://m.media-amazon.com/images/M/MV5BOTgwMzFiMWYtZDhlNS00ODNkLWJiODAtZDVhNzgyNzJhYjQ4L2ltYWdlXkEyXkFqcGdeQXVyNzEzOTYxNTQ@._V1_SX300.jpg",
        "youtube":"https://www.youtube.com/embed/nuPZUUED5uk"
     },
     {
        "Title":"The Man Who Knew Infinity",
        "Year":"2015",
        "Runtime":"108 min",
        "Genre":"Biography, Drama",
        "Director":"Matt Brown",
        "Actors":"Jeremy Irons, Dev Patel, Malcolm Sinclair, Raghuvir Joshi",
        "Plot":"The story of the life and academic career of the pioneer Indian mathematician, Srinivasa Ramanujan, and his friendship with his mentor, Professor G.H. Hardy.",
        "imdbRating":"7.2",
        "Poster":"https://m.media-amazon.com/images/M/MV5BMTU3Njg4MDM3OV5BMl5BanBnXkFtZTgwMjE5ODM3ODE@._V1_SX300.jpg",
        "youtube":"https://www.youtube.com/embed/oXGm9Vlfx4w"
     },
     {
        "Title":"The Shawshank Redemption",
        "Year":"1994",
        "Runtime":"142 min",
        "Genre":"Drama",
        "Director":"Frank Darabont",
        "Actors":"Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
        "Plot":"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "imdbRating":"9.3",
        "Poster":"https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        "youtube":"https://www.youtube.com/embed/6hB3S9bIaco"
     },
     {
        "Title":"Schindler's List",
        "Year":"1993",
        "Runtime":"195 min",
        "Genre":"Biography, Drama, History",
        "Director":"Steven Spielberg",
        "Actors":"Liam Neeson, Ben Kingsley, Ralph Fiennes, Caroline Goodall",
        "Plot":"In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        "imdbRating":"8.9",
        "Poster":"https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        "youtube":"https://www.youtube.com/embed/gG22XNhtnoY"
     },
     {
        "Title":"Slumdog Millionaire",
        "Year":"2008",
        "Runtime":"120 min",
        "Genre":"Drama, Romance",
        "Director":"Danny Boyle, Loveleen Tandan(co-director)",
        "Actors":"Dev Patel, Saurabh Shukla, Anil Kapoor, Raj Zutshi",
        "Plot":"A Mumbai teenager reflects on his life after being accused of cheating on the Indian version of \\'Who Wants to be a Millionaire?\\'",
        "imdbRating":"8.0",
        "Poster":"https://m.media-amazon.com/images/M/MV5BZmNjZWI3NzktYWI1Mi00OTAyLWJkNTYtMzUwYTFlZDA0Y2UwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        "youtube":"https://www.youtube.com/embed/AIzbwV7on6Q"
     }, 
     {
      "Title":"Titanic",
      "Year":"1997",
      "Runtime":"194 min",
      "Genre":"Drama, Romance",
      "Director":"James Cameron",
      "Actors":"Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates",
      "Plot":"A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
      "imdbRating":"7.8",
      "youtube":"https://www.youtube.com/embed/kVrqfYjkTdQ"
   }
   ,
   {
      "Title":"Suicide Squad",
      "Year":"2016",
      "Runtime":"123 min",
      "Genre":"Action, Adventure, Fantasy, Sci-Fi",
      "Director":"David Ayer",
      "Actors":"Will Smith, Jaime FitzSimons, Ike Barinholtz, Margot Robbie",
      "Plot":"A secret government agency recruits some of the most dangerous incarcerated super-villains to form a defensive task force. Their first mission: save the world from the apocalypse.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMjM1OTMxNzUyM15BMl5BanBnXkFtZTgwNjYzMTIzOTE@._V1_SX300.jpg",
      "imdbRating":"6.0",
      "youtube":"https://www.youtube.com/embed/CmRih_VtVAs"
   },
   {
      "Title":"The Avengers",
      "Year":"2012",
      "Runtime":"143 min",
      "Genre":"Action, Adventure, Sci-Fi",
      "Director":"Joss Whedon",
      "Actors":"Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
      "Plot":"Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      "imdbRating":"8.0",
      "youtube":"https://www.youtube.com/embed/eOrNdBpGMv8"
   }
   ,{
      "Title":"Men in Black",
      "Year":"1997",
      "Runtime":"98 min",
      "Genre":"Action, Adventure, Comedy, Sci-Fi",
      "Director":"Barry Sonnenfeld",
      "Actors":"Tommy Lee Jones, Will Smith, Linda Fiorentino, Vincent D'Onofrio",
      "Plot":"A police officer joins a secret organization that polices and monitors extraterrestrial interactions on Earth.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BOTlhYTVkMDktYzIyNC00NzlkLTlmN2ItOGEyMWQ4OTA2NDdmXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
      "imdbRating":"7.3",
      "youtube":"https://www.youtube.com/embed/BV-WEb2oxLk"
   }
  ,{
      "Title":"Predator",
      "Year":"1987",
      "Runtime":"107 min",
      "Genre":"Action, Adventure, Sci-Fi, Thriller",
      "Director":"John McTiernan",
      "Actors":"Arnold Schwarzenegger, Carl Weathers, Elpidia Carrillo, Bill Duke",
      "Plot":"A team of commandos on a mission in a Central American jungle find themselves hunted by an extraterrestrial warrior.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BY2QwYmFmZTEtNzY2Mi00ZWMyLWEwY2YtMGIyNGZjMWExOWEyXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
      "imdbRating":"7.8",
      "youtube":"https://www.youtube.com/embed/X2hBYGwKh3I"
   }
  ,{
      "Title":"Insidious",
      "Year":"2010",
      "Runtime":"103 min",
      "Genre":"Horror, Mystery, Thriller",
      "Director":"James Wan",
      "Actors":"Patrick Wilson, Rose Byrne, Ty Simpkins, Lin Shaye",
      "Plot":"A family looks to prevent evil spirits from trapping their comatose child in a realm called The Further.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMTYyOTAxMDA0OF5BMl5BanBnXkFtZTcwNzgwNTc1NA@@._V1_SX300.jpg",
      "imdbRating":"6.8",
      "youtube":"https://www.youtube.com/embed/zuZnRUcoWos"
   }
   ,{
      "Title":"Inception",
      "Year":"2010",
      "Runtime":"148 min",
      "Genre":"Action, Adventure, Sci-Fi, Thriller",
      "Director":"Christopher Nolan",
      "Actors":"Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
      "Plot":"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      "imdbRating":"8.8",
      "youtube":"https://www.youtube.com/embed/YoHD9XEInc0"
   }
   ,{
      "Title":"Rampage",
      "Year":"2018",
      "Runtime":"107 min",
      "Genre":"Action, Adventure, Sci-Fi",
      "Director":"Brad Peyton",
      "Actors":"Dwayne Johnson, Naomie Harris, Malin Akerman, Jeffrey Dean Morgan",
      "Plot":"When three different animals become infected with a dangerous pathogen, a primatologist and a geneticist team up to stop them from destroying Chicago.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BNDA1NjA3ODU3OV5BMl5BanBnXkFtZTgwOTg3MTIwNTM@._V1_SX300.jpg",
      "imdbRating":"6.1",
      "youtube":"https://www.youtube.com/embed/coOKvrsmQiI"
   }

]

let shows=[
   {
      "Title":"The Salisbury Poisonings",
      "Year":"2020",
      "Runtime":"45 min",
      "Genre":"Drama, History, Thriller",
      "Director":"N/A",
      "Actors":"Anne-Marie Duff, Annabel Scholey, Rafe Spall, Sophia Ally",
      "Plot":"Fact based drama about the Novichok poisoning crisis in Salisbury in 2018.",
      "imdbRating":"7.3",
      "Poster":"https://m.media-amazon.com/images/M/MV5BNDBlM2M2NWQtMzg5NS00MjllLThjOWYtMDcwOGU1ZDI4MWVmXkEyXkFqcGdeQXVyMTAwMzM3NDI3._V1_SX300.jpg",
      "youtube":"https://www.youtube.com/embed/ekoW6g_wg7A"
   },
   {
      "Title":"Chernobyl",
      "Year":"2019",
      "Runtime":"330 min",
      "Genre":"Drama, History, Thriller",
      "Director":"N/A",
      "Actors":"Jessie Buckley, Jared Harris, Stellan Skarsgård, Adam Nagaitis",
      "Plot":"In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world's worst man-made catastrophes.",
      "imdbRating":"9.4",
      "Poster":"https://m.media-amazon.com/images/M/MV5BZGQ2YmMxZmEtYjI5OS00NzlkLTlkNTEtYWMyMzkyMzc2MDU5XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg",
      "youtube":"https://www.youtube.com/embed/s9APLXM9Ei8"
   },
   {
      "Title":"Friends",
      "Year":"1994–2004",
      "Runtime":"22 min",
      "Genre":"Comedy, Romance",
      "Director":"N/A",
      "Actors":"Jennifer Aniston, Courteney Cox, Lisa Kudrow, Matt LeBlanc",
      "Plot":"Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
      "imdbRating":"8.9",
      "Poster":"https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
      "youtube":"https://www.youtube.com/embed/hDNNmeeJs1Q"
   },
   {
      "Title":"The Big Bang Theory",
      "Year":"2007–2019",
      "Runtime":"22 min",
      "Genre":"Comedy, Romance",
      "Director":"N/A",
      "Actors":"Johnny Galecki, Jim Parsons, Kaley Cuoco, Simon Helberg",
      "Plot":"A woman who moves into an apartment across the hall from two brilliant but socially awkward physicists shows them how little they know about life outside of the laboratory.",
      "imdbRating":"8.1",
      "Poster":"https://m.media-amazon.com/images/M/MV5BY2FmZTY5YTktOWRlYy00NmIyLWE0ZmQtZDg2YjlmMzczZDZiXkEyXkFqcGdeQXVyNjg4NzAyOTA@._V1_SX300.jpg",
      "youtube":"https://www.youtube.com/embed/WBb3fojgW0Q"
   },
   {
      "Title":"Brooklyn Nine-Nine",
      "Year":"2013–present",
      "Runtime":"22 min",
      "Genre":"Comedy, Crime",
      "Director":"N/A",
      "Actors":"Andy Samberg, Stephanie Beatriz, Terry Crews, Melissa Fumero",
      "Plot":"Comedy series following the exploits of Det. Jake Peralta and his diverse, lovable colleagues as they police the NYPD's 99th Precinct.",
      "imdbRating":"8.4",
      "Poster":"https://m.media-amazon.com/images/M/MV5BNzVkYWY4NzYtMWFlZi00YzkwLThhZDItZjcxYTU4ZTMzMDZmXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_SX300.jpg",
      "youtube":"https://www.youtube.com/embed/sEOuJ4z5aTc"
   },
   {
      "Title":"The Office",
      "Year":"2005–2013",
      "Runtime":"22 min",
      "Genre":"Comedy",
      "Director":"N/A",
      "Actors":"Rainn Wilson, John Krasinski, Leslie David Baker, Brian Baumgartner",
      "Plot":"A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
      "imdbRating":"8.9",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg",
      "youtube":"https://www.youtube.com/embed/LHOtME2DL4g"
   },
   {
      "Title":"Schitt's Creek",
      "Year":"2015–2020",
      "Runtime":"22 min",
      "Genre":"Comedy",
      "Director":"N/A",
      "Actors":"Eugene Levy, Catherine O'Hara, Dan Levy, Annie Murphy",
      "Plot":"When rich video-store magnate Johnny Rose and his family suddenly find themselves broke, they are forced to leave their pampered lives to regroup in Schitt's Creek.",
      "imdbRating":"8.5",
      "Poster":"https://m.media-amazon.com/images/M/MV5BNWQ1ZmM3MTQtNTVhZC00MWVlLWI5ZjgtYmZiYWQxZjUzZWM0XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg",
      "youtube":"https://www.youtube.com/embed/W0uWS6CnC2o"
   },
   {
      "Title":"Modern Family",
      "Year":"2009–2020",
      "Runtime":"22 min",
      "Genre":"Comedy, Drama, Romance",
      "Director":"N/A",
      "Actors":"Ed O'Neill, Sofía Vergara, Julie Bowen, Ty Burrell",
      "Plot":"Three different but related families face trials and tribulations in their own uniquely comedic ways.",
      "imdbRating":"8.4",
      "Poster":"https://m.media-amazon.com/images/M/MV5BNzRhNWIxYTEtYjc2NS00YWFlLWFhOGEtMDZiMWM1M2RkNDkyXkEyXkFqcGdeQXVyNjc0MjkzNjc@._V1_SX300.jpg",
      "youtube":"https://www.youtube.com/embed/aogZUDx51vQ"
   },
   {
      "Title":"Asur",
      "Year":"2020",
      "Runtime":"139 min",
      "Genre":"Drama",
      "Director":"Pavel",
      "Actors":"Jeet, Abir Chatterjee, Trambak Roy, Nusrat Jahan",
      "Plot":"Tribute to Ramkinkar Baij, the film explores the relationship between three friends Kigan, Bodhi and Aditi.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMWU4NmY2NDMtODRmMC00NzljLTkwNDMtYThmNTE1OThhZjMwXkEyXkFqcGdeQXVyODk1NjE0OTk@._V1_SX300.jpg",
      "imdbRating":"6.9",
      "youtube":"https://www.youtube.com/embed/GeLNzGJp-DA"
   }
   ,{
      "Title":"Sacred Games",
      "Year":"2018–2019",
      "Runtime":"50 min",
      "Genre":"Action, Crime, Drama, Thriller",
      "Actors":"Saif Ali Khan, Nawazuddin Siddiqui, Neeraj Kabi, Elnaaz Norouzi",
      "Plot":"A link in their pasts leads an honest cop to a fugitive gang boss, whose cryptic warning spurs the officer on a quest to save Mumbai from cataclysm.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMjJlMjJlMzYtNmU5Yy00N2MwLWJmMjEtNWUwZWIyMGViZDgyXkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_SX300.jpg",
      "imdbRating":"8.6",
      "youtube":"https://www.youtube.com/embed/w-Xe8gLBc5I"
   }
   ,{
      "Title":"Mirzapur",
      "Year":"2018–",
      "Runtime":"60 min",
      "Genre":"Action, Crime, Drama, Thriller",
      "Actors":"Pankaj Tripathi, Ali Fazal, Divyendu Sharma, Shweta Tripathi",
      "Plot":"A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BN2NlNGYwYTUtMTczMi00NGVjLTgwMzUtNjBkZjIyNDc2NjcxXkEyXkFqcGdeQXVyODQ5NDUwMDk@._V1_SX300.jpg",
      "imdbRating":"8.4",
      "youtube":"https://www.youtube.com/embed/ZNeGF-PvRHY"
   }
   ,{
      "Title":"13 Reasons Why",
      "Year":"2017–2020",
      "Runtime":"60 min",
      "Genre":"Drama, Mystery, Thriller",
      "Actors":"Dylan Minnette, Christian Navarro, Alisha Boe, Brandon Flynn",
      "Plot":"Follows teenager Clay Jensen, in his quest to uncover the story behind his classmate and crush, Hannah, and her decision to end her life.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMDYzZTRlNGEtZDc2Mi00ZGNjLTlmZDAtMmVjMDZkOThiODEwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
      "imdbRating":"7.6",
      "youtube":"https://www.youtube.com/embed/toj3CyMhBOs"
   }
   ,{
      "Title":"Peaky Blinders",
      "Year":"2013–",
      "Runtime":"60 min",
      "Genre":"Crime, Drama",
      "Actors":"Cillian Murphy, Paul Anderson, Helen McCrory, Sophie Rundle",
      "Plot":"A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMTkzNjEzMDEzMF5BMl5BanBnXkFtZTgwMDI0MjE4MjE@._V1_SX300.jpg",
      "imdbRating":"8.8",
      "youtube":"https://www.youtube.com/embed/oVzVdvGIC7U"
   }
   ,{
      "Title":"Stranger Things",
      "Year":"2016–",
      "Runtime":"51 min",
      "Genre":"Drama, Fantasy, Horror, Mystery, Sci-Fi, Thriller",
      "Actors":"Winona Ryder, David Harbour, Finn Wolfhard, Millie Bobby Brown",
      "Plot":"When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_SX300.jpg",
      "imdbRating":"8.7",
      "youtube":"<https://www.youtube.com/embed/mnd7sFt5c3A"
   }
   ,{
      "Title":"Suits",
      "Year":"2011–2019",
      "Runtime":"44 min",
      "Genre":"Comedy, Drama",
      "Actors":"Gabriel Macht, Rick Hoffman, Sarah Rafferty, Patrick J. Adams",
      "Plot":"On the run from a drug deal gone bad, brilliant college dropout Mike Ross, finds himself working with Harvey Specter, one of New York City's best lawyers.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BNmVmMmM5ZmItZDg0OC00NTFiLWIxNzctZjNmYTY5OTU3ZWU3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      "imdbRating":"8.5",
      "youtube":"https://www.youtube.com/embed/85z53bAebsI"
   }
  ,{
      "Title":"Money Heist",
      "Year":"2017–",
      "Runtime":"70 min",
      "Genre":"Action, Crime, Mystery, Thriller",
      "Actors":"Úrsula Corberó, Álvaro Morte, Itziar Ituño, Pedro Alonso",
      "Plot":"An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BZDcxOGI0MDYtNTc5NS00NDUzLWFkOTItNDIxZjI0OTllNTljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      "imdbRating":"8.3",
      "youtube":"https://www.youtube.com/embed/hMANIarjT50"
   }
]

const seedDB0 = async () => {
   await Movie.deleteMany({});
   for(let m of mov){      
       let movie = new Movie(m);
       await movie.save();
   }

}


const seedDB = async () => {
    await Show.deleteMany({});
    for(let s of shows){      
        const show = new Show(s);
        await show.save();
    }

}





const seedDB1 = async () => {
   await Ticket.deleteMany({});
   let al=['A','B','C','D','E','F','G','H'];
   var months = ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"];
   var d = new Date()

   for(let a of al)
   {
      for(let i=0;i<10;i++)
      {
         let t={
            status:'unsold',
            row:a,
            seatnumber:(i+1),
            moviename:"dunkrik",
            timing:"9.00 pm - 11.00 pm",
            date:`${d.getDate()} ${months[d.getMonth()]}`
         }

         let ticket = new Ticket(t)
         await ticket.save();
      }
   }
  
}


const seedDB2 = async () => {
   await Comment.deleteMany({});
   // var months = ["January", "February", "March", "April", "May", "June",
   //  "July", "August", "September", "October", "November", "December"];
   // var d = new Date();
   // let c=new Comment({
   //    text:"nice movie",
   //    date:`${d.getDate()} ${months[d.getMonth()]}`
   // })
   // await c.save();
   // console.log(c);

}

const seedDB5 = async () => {

   let c = await Comment.findOne().populate('user');
   console.log(c);

}

seedDB();


