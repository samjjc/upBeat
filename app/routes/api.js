Playlist = require('../../app/models/playlist')

module.exports = router => {

    router.use(function(req, res, next) {
        //console.log('Something is happening.');
        next();
    });

    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    });

// =============================================================================
    router.route('/playlist')
    
    .post( (req, res) => {
        
        let playlist = new Playlist();
        playlist.name = req.body.name;

        playlist.save((err) => {
            if (err) res.send(err);

            res.json({ 'SUCCESS': playlist });
        });

    })

    .get((req, res) => {
        Playlist.find((err,playlist)=> {
            if(err) res.send(err);

            res.json(playlist);
        });
    });

    // =============================================================================

    router.route('/playlist/:id')

        .get((req, res)=> {
            Playlist.findById(req.params.id,  (err, playlist)=>{
                if(err) res.send(err);
                res.json(playlist);
            })
        })

        .put((req, res)=> {
            Playlist.findById(req.params.id, (err, playlist)=>{
                if (err) res.send(err);
                playlist.name = req.body.name;
                playlist.save((err)=> {
                if(err)res.send(err);
                res.json({ message: 'Playlist Updated'});
                });
            });
        })

        .delete((req,res)=> {
            Playlist.remove({ _id: req.params.id }, (err, playlist)=>{
                if(err) res.send(err);
                res.json({ message: 'Successfully deleted'});
            });
        });
}
