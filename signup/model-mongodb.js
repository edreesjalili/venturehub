'use strict';

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(config) {
    var url = config.mongodb.url;
    var collectionName = config.mongodb.collection;
    var collection;

    function fromMongo(item) {
        if (Array.isArray(item) && item.length) {
            item = item[0];
        }

        item.id = item._id;
        delete item._id;
        return item;
    }

    function toMongo(item) {
        delete item.id;
        return item;
    }

    function getCollection(cb) {
        if (collection) {
            setImmediate(function () { cb(null, collection); });
            return;
        }
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err);
                return cb(err);
            }
            collection = db.collection(collectionName);
            cb(null, collection);
        });
    }

    function create(data, cb) {
      getCollection(function (err, collection) {
        if (err) { return cb(err); }
        collection.insert(data, {w: 1}, function (err, result) {
          if (err) { return cb(err); }
          var item = fromMongo(result.ops);
          cb(null, item);
        });
      });
    }

    //needs to be updated, don't use as is
    function read(id, cb) {
      getCollection(function (err, collection) {
        if (err) { return cb(err); }
        collection.findOne({
          _id: new ObjectID(id)
        }, function (err, result) {
          if (err) { return cb(err); }
          if (!result) {
            return cb({
              code: 404,
              message: 'Not found'
            });
          }
          cb(null, fromMongo(result));
        });
      });
    }

    //needs to be updated, don't use as is
    function update(id, data, cb) {
      getCollection(function (err, collection) {
        if (err) { return cb(err); }
        collection.update(
          { _id: new ObjectID(id) },
          { '$set': toMongo(data) },
          { w: 1 },
          function (err) {
            if (err) { return cb(err); }
            return read(id, cb);
          }
        );
      });
    }

    //needs to be updated, don't use as is
    function _delete(id, cb) {
      getCollection(function (err, collection) {
        if (err) { return cb(err); }
        collection.remove({
          _id: new ObjectID(id)
        }, cb);
      });
    }

    return {
      create: create,
      read: read,
      update: update,
      delete: _delete
    };
}
