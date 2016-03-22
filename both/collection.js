Collection.Song = new Mongo.Collection('songs');
//avatarUrl = 'http://studenteduloan.com/wp-content/uploads/2014/12/aib-online-student.jpg';

Schema.Song = new SimpleSchema({
    songTitle: {
        type: String,
        label: "Song Title"
    },
    url:{
        type:String,
        label:"Url"
    },
    cover:{
        type:String,
        label:"Song cover"
    },
    made:{
        type:String,
        label:"Made"
    },
    artict:{
        type:String,
        label:"Artict"
    },
    typeOfSong:{
        type: String,
        autoform: {
            type: "select",
            options: function () {
                return [
                    {label: "kontream", value: "kontream"}
                ];
            }

        }
    },
});
Collection.Song.attachSchema(Schema.Song);
