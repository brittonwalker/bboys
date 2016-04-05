module.exports = function(app, router) {
  var express = require('express');
  var router = express.Router();

  var Location = require('./models/location');

  router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
  });

  router.get('/', function(req, res) {
    // res.json({ message: 'hooray! welcome to our api!' });
  });

  router.route('/locations')

  // create a location (accessed at POST http://localhost:8080/api/locations)
  .post(function(req, res) {

      var location = new Location({
        name: req.body.name,
        address: req.body.address,
        lat: req.body.lat,
        long: req.body.long
      }); // create a new instance of the Location model

      // save the location and check for errors
      location.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Location created!'
        });
      });

    })
    .get(function(req, res) {
      Location.find(function(err, locations) {
        if (err)
          res.send(err);

        res.json(locations);
      });
    });

  // on routes that end in /locations/:location_id
  // ----------------------------------------------------
  router.route('/locations/:location_id')

  // get the location with that id (accessed at GET http://localhost:3000/api/locations/:location_id)
  .get(function(req, res) {
    Location.findById(req.params.location_id, function(err, location) {
      if (err)
        res.send(err);
      res.json(location);
    });
  })

  // update the location with this id (accessed at PUT http://localhost:8080/api/locations/:location_id)
  .put(function(req, res) {

      // use our location model to find the location we want
      Location.findById(req.params.location_id, function(err, location) {

        if (err)
          res.send(err);

        location.name = req.body.name; // update the locations info

        // save the location
        location.save(function(err) {
          if (err)
            res.send(err);

          res.json({
            message: 'Location updated!'
          });
        });

      });
    })
    .delete(function(req, res) {
      Location.remove({
        _id: req.params.location_id
      }, function(err, location) {
        if (err)
          res.send(err);

        res.json({
          message: 'Successfully deleted'
        });
      });
    });

  // POST ROUTES
  var Post = require('./models/post');

  router.get('/locations/:id/posts', function(req, res) {
    Location.find({
      _id: req.params.id
    }).then(function(locations) {
      res.json(locations);
    })
  });

  router.post('/locations/:id/posts', function(req, res) {
    Location.findOne({
      _id: req.params.id
    }).then(function(location) {
      var post = new Post({
        video_url: req.body.video_url,
        name: req.body.name,
        description: req.body.description
      });
      location.posts.push(post);
      location.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Post created!'
        });
      });
    })
  });

  router.get('/locations/:id/posts/:id', function(req, res) {
    Location.find({
      _id: req.params.id
    }).then(function(locations) {
      res.json(locations);
    })
  })

  app.use('/api', router);
};
