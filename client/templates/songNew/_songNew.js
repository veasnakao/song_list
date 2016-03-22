AutoForm.hooks({
  'songs-new-form': {
    before: {
      insert: function (doc) {
        //debugger;
        doc._id = idGenerator.gen(Collection.Song, 4);
        console.log(doc);
        return doc;
      }
    },
    onSuccess: function (operation, result, template) {
      IonModal.close();
      Router.go('songs', {_id: result});
    },
    onError: function(operation, error, template) {
      alert(error);
    }
  }
});
