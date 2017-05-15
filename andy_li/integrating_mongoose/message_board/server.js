var express = require("express");
var bp = require("body-parser");
var mongoose = require("mongoose");
var app = express();

app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/bower_components"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/message_board");
// Use native promises
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
 name_post: {type: String, required: true, minlength: 2},
 post: {type: String, required: true, minlength: 1},
 comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
}, {timestamps: true});

var CommentSchema = new mongoose.Schema({
 name_comment: {type: String, required: true, minlength: 2},
 comment: {type: String, required: true, minlength: 1},
 _post: {type: Schema.Types.ObjectId, ref: "Post"},
}, {timestamps: true});

mongoose.model("Post", PostSchema);
mongoose.model("Comment", CommentSchema);

var Post = mongoose.model("Post");
var Comment = mongoose.model("Comment");

// routes
app.get("/", function(req, res) {
  console.log("-= Reached / (index.ejs) =-");
  Post.find({}).populate("comments").exec(function(err, posts) {
    if (err) {
      res.send(err);
      console.log(err);
    }
    else {
      console.log(posts);
      res.render("index.ejs", {posts: posts});
    }
  });
});

app.post("/posts/create", function(req, res) {
  console.log("-= Reached /posts/create (redirect to /) =-");
  console.log("POST data:", req.body);

  var post = new Post(req.body);

  post.save(function(err, post) {
    if(err) {
      console.log("Error in adding post:", err);
      res.send(err);
    }
    else { // else console.log added post and redirect /
      console.log("Post added:", post);
      res.redirect('/');
    }
  });
});

app.post("/comments/create/:id", function(req, res) {
  console.log("-= Reached /comments/create/id (redirect to /) =-");
  console.log("POST data:", req.body);
  // find specific post, then create comment to put into comments array
  Post.findById(req.params.id).exec(function(err, post) {
    if(err) {
      res.send(err);
    }
    if(!post) {
      res.send(`${post} not found.`);
    }
    else {
      var comment = new Comment(req.body);
      comment._post = post._id;
      comment.save(function(err, comment) {
        if(err) {
          res.send(err);
        }
        else {
          post.comments.push(comment._id);
          post.save(function(err, post) {
            if(err) {
              res.send(err);
            }
            else {
              res.redirect("/");
            }
          }); // end save for pushing comment into post comments array
        }

      }); // end save for comment
    }
  }); // end query for post
});

var server = app.listen(8000, function() {
  console.log("Listening on port 8000...");
});
