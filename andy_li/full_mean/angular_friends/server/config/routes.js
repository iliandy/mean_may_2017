var Friends = require("../controllers/friends.js");

module.exports = function(app){
  app.get('/friends', Friends.index);
  app.get('/friends/:id', Friends.show);
  app.post('/friends', Friends.create);
  app.put('/friends/:id', Friends.update);
  app.delete('/friends/:id', Friends.delete);
};
// this adds route listeners to friends for 5 of the 7 RESTful routes, excluding new and edit.
