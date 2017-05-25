app.controller("MessagesController", function(UserFactory, MessageFactory, CommentFactory, $cookies) {
  console.log("Loaded MessagesController...");
  var self = this;
  self.messages = [];
  self.currentUser = {};
  self.msgErrors = [];
  self.comErrors = [];
  self.newMsg = {};
  self.newCom = {};

  self.index = function() {
    MessageFactory.index(function(res) {
      self.messages = res.data;
    });
  };

  self.createMsg = function(newMsg) {
    self.msgErrors = [];

    self.currentUser = $cookies.getObject("user");
    newMsg.user = self.currentUser._id;

    MessageFactory.create(newMsg, function(res) {
      if(res.data.errors) {
        for(key in res.data.errors) {
          var error = res.data.errors[key];
          self.msgErrors.push(error.message);
        }
      }
      else {
        self.index();
      }
    });
    // clear new message input
    self.newMsg = {};
  };

  self.createCom = function(newCom, index, message_id) {
    self.comErrors = [];
    // creates empty newCom object if input is blank, otherwise creates error
    if(!newCom[index]) {
      newCom[index] = {};
    }

    newCom = newCom[index];
    newCom.message = message_id;
    self.currentUser = $cookies.getObject("user");
    newCom.user = self.currentUser._id;
    console.log(newCom);

    CommentFactory.create(newCom, function(res) {
      if(res.data.errors) {
        for(key in res.data.errors) {
          var error = res.data.errors[key];
          self.comErrors.push(error.message);
        }
      }
      else {
        self.index();
      }
    });
    // clear new comment input
    self.newCom = {};

  };

  self.deleteMsg = function(message) {
    // send message id to factory delete method (http delete to server) to delete specific message
    MessageFactory.delete(message._id, self.index);
  };

  self.deleteCom = function(comment) {
    // send comment id to factory delete method (http delete to server) to delete specific comment
    CommentFactory.delete(comment._id, self.index);
  };

  self.addLikesMsg = function(message_id, user_id) {    
    MessageFactory.addLikes(message_id, user_id, self.index);
  }

});
