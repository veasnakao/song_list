Template._songsEdit.helpers({
  contact: function () {
    var template = Template.instance();
    return Collection.Song.findOne({_id: template.data.id});
  }
});

AutoForm.hooks({
  'songs-edit-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
    },

    onError: function(operation, error, template) {
      alert(error);
    }
  }
});
