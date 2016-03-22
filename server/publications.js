Meteor.publish('songs', function() {
  return Collection.Song.find();
});

Meteor.publish('song', function(_id) {
  return Collection.Song.find({_id: _id});
});
