Template.songsShow.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('song', Router.current().params._id);
    }.bind(this));
};

Template.songsShow.rendered = function () {
    //this.autorun(function () {
    //  if (!this.subscription.ready()) {
    //    IonLoading.show();
    //  } else {
    //    IonLoading.hide();
    //  }
    //}.bind(this));
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show({
                    backdrop: true
                }
            );
        } else {
            let app = Collection.Song.findOne(Router.current().params._id);
            M = new buzz.sound(app.url);
            IonLoading.hide();
        }
    }.bind(this));
};




//songsShow event
Template.songsShow.events({
    'click .jsPlay': function () {
        //someFunc();
        M.togglePlay();
        M.bind("timeupdate", function (e) {
            var time = buzz.toTimer(this.getTime());
            $('.time-start').html(time);
            let getTime = M.getTime();
        });

        //var time = buzz.toTimer(M.getTime());
        var timer = buzz.toTimer(M.getDuration());
        var get_timer = timer.split(':');
        let dur = get_timer.map(Number);
        var seconds = (dur[0] * 60) + dur[1];

        $('.progressBar').val(0);
        ////clearInterval(interval);
        //let increaseSecond = 0;
        //var interval = setInterval(function () {
        //    increaseSecond = increaseSecond + 1;
        //    $('.progressBar').val(increaseSecond);
        //    //console.log(increaseSecond);
        //}, 1000);
        //console.log(typeof interval);

        $('.progressBar').prop('max', seconds);
        $('.change-icon').removeClass('ion-ios-play').hide(200);
        $('.change-icon').addClass('ion-ios-pause').show(200);
        $('.song-duration').html(timer);


        if (M.isPaused()) {
            $('.change-icon').removeClass('ion-ios-pause');
            $('.change-icon').addClass('ion-ios-play');
        }

    },
    'change .progressBar': function () {
        let getInput = document.querySelector('.progressBar');
        console.log(getInput.value);
        let fromTime = getInput.value;
        M.setTime(buzz.fromTimer(fromTime));
        //$('.progressBar').val(0);
        //
        //let increaseSecond = 0;
        ////clearInterval(interval);
        //setInterval(function () {
        //    increaseSecond = increaseSecond + 1;
        //    $('.progressBar').val(increaseSecond);
        //    //console.log(increaseSecond);
        //}, 1000);

    }
});

//songShow helpers
Template.songsShow.helpers({
    song: function () {
        return Collection.Song.findOne({_id: Router.current().params._id});
    }
    //activeLabel: function () {
    //    if (this.details.active) {
    //        return '<i class="ion-checkmark-circled"></i> Active';
    //    } else {
    //        return '<i class="ion-minus-circled"></i> Inactive';
    //    }
    //}
});

Template.songsShow.onDestroyed(function () {
    M.stop();
});
