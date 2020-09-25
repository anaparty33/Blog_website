//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require("lodash");
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://anaparty33:May@1995@cluster0.abgoa.mongodb.net/blogDB?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true});

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const blogSchema=new mongoose.Schema(
  {
    Title:String,
    Post:String
  });

const Blogposts=mongoose.model("AddedPost",blogSchema);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', function(req, res)
{
  Blogposts.find(function(err,results)
  {
    if(!err)
    {
      console.log(results);
      res.render('home',{homeContent:homeStartingContent, addposted:results});
    }
  })
  

})
app.get('/about', function(req,res)
{
  res.render('about',{abtContent:aboutContent})
})
app.get('/contact',function(req,res)
{
  res.render('contact',{ctctContent:contactContent})
})
app.get('/compose',function(req,res)
{
  res.render('compose')
})

//store the information in database
app.post('/compose',function(req,res)
{
  

  var post={titleArea:req.body.title, postArea:req.body.postText};
 
  //create a document with 2 fields and store the string
  const composedPost=new Blogposts(
    {
      Title:req.body.title,
      Post:req.body.postText
    })
    composedPost.save();
  


  

  res.redirect('/')

})
app.get('/posts/:route_item',function(req,res)
{
  var path_item=lodash.lowerCase(req.params.route_item);
   // const lod_item=lodash.lowercase("LLLLL");
  console.log(path_item);

  Blogposts.find(function(err,results)
  {
    for(var i=0; i<results.length;i++)
    {
    console.log(results[i].Title);
    if (path_item===lodash.lowerCase(results[i].Title))
    {
    
      res.render('post',{postTitle:results[i].Title ,postTextarea:results[i].Post});
    }
    }
  })
 
})








let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
