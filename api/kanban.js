import express from 'express'
var MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const app = express()
app.use(express.json());

app.get('/boards', async (req, res) => {
  try {

    MongoClient.connect(process.env.MONGO, function (err, client) {

      var db = client.db(process.env.KANBAN)

      db.collection('boards').find().toArray(function (err, result) {
        if (err) throw err

        client.close();
        res.json(result)
      })
    })
  } catch (err) {
    console.log(err)
  }
})

app.get('/boards/:boardId', async (req, res) => {
  try {

    MongoClient.connect(process.env.MONGO, function (err, client) {

      var db = client.db(process.env.KANBAN)

      db.collection("boards").findOne({_id: new ObjectId(req.params.boardId)}, function(err, result) {
        if (err) throw err;

        client.close();
        res.json(result)
      });
    })
  } catch (err) {
    console.log(err)
  }
})

app.post('/boards', async (req, res) => {
  MongoClient.connect(process.env.MONGO, function (err, client) {
    var db = client.db(process.env.KANBAN)
    db.collection("boards").insertOne({
        name: req.body.name,
        columns: [{ title: "Backlog", tasks: []}],
        types: []
      }, function(err, result) {
      if (err) throw err;
      client.close();
      res.json(result)
    });
  })
})

app.put('/boards', async (req, res) => {
  MongoClient.connect(process.env.MONGO, function (err, client) {
    var db = client.db(process.env.KANBAN)
    db.collection("boards").updateOne(
      {_id: new ObjectId(req.body.board._id)},
      { "$set": {
        "name": req.body.board.name,
        "columns": req.body.board.columns,
        "types": req.body.board.types
      }}, function(err, result) {
        if (err) throw err;
        client.close();
        res.json(result)
      })
  })
})


export default {
  path: '/api',
  handler: app
}