Template.songs.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('songs');
  }.bind(this));
};

Template.songs.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));

  //this.autorun(function () {
  //  if (!this.subscription.ready()) {
  //    IonLoading.show({
  //          backdrop: true
  //        }
  //    );
  //  } else {
  //    let app = Collection.Song.findOne(Router.current().params._id);
  //    M = new buzz.sound(app.url);
  //    IonLoading.hide();
  //  }
  //}.bind(this));
};

Template.songs.helpers({
  songs: function () {
    return Collection.Song.find({},{sort: {_id:1}});
  }
});
