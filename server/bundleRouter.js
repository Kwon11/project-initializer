var express = require('express');
var bundleRouter = express.Router();
var path = require('path');
var bundler = require('./util/bundler/index.js');
var filter = require('./util/cf/index.js');
var projectView = require('./util/pv/projectView.js');

bundleRouter.post('/build/', function (req, res) {
  bundler(req, function(err, folderName) {
    if ( err ) {
      res.status(500);
    } else {
      var framework = req.body.frontEnd.framework;
      var packages = req.body.devTools.taskRunner.plugins;
      filter.queueConfig(framework, packages);

      res.status(201).send(folderName);
    }
  });
});

bundleRouter.get('/:id', (req, res) => {
  var fileName = req.params.id + '.tar.gz';
  res.download(path.resolve(__dirname, 'bundles', fileName ));
});

bundleRouter.get('/contents/:id', (req, res) => {
  var bundle = projectView.getProjectJSON(req.params.id);
  res.json(bundle);
});

bundleRouter.post('/contents/:id', (req, res) => {
  fs.writeFile(req.body.path, req.body.content, 'utf8', function(err) {
    if (!err) {
      console.log('SUCCESS');
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

bundleRouter.post('/recommendations/', (req, res) => {
  var framework = req.body.framework || null
  var packages = req.body.packages || null
  if ( packages && framework ) {
    filter.getRecommendations({framework, packages}, function(err, recommendations) {
      if ( err ) {
        res.status(500).send({ error: 'Error in getting recommendations' })
      } else if ( !recommendations ) {
        res.status(500).send({ error: 'There are no recommendations' })
      } else {
        res.status(200).send(recommendations);
      }
    });
  } else {
    res.status(500).send({ error: 'Error in getting recommendations: a framework and an array pf packages need to be sent' })
  }
});

module.exports = bundleRouter;

//in main app call this on /auth/
//just define everything past /auth/ from here