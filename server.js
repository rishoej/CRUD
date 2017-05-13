const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')
var db

MongoClient.connect('mongodb://<dbuser>:<dbpassword>@<dblink>/recipe-app', (err, database) => {
  if(err) return console.log(err)
  db = database
  app.listen(3000, function(){
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  db.collection('recipes').find().toArray((err, result) => {
    if(err) return console.log(err)
    console.log(result);
    res.render('index.ejs', {recipes: result})
  })
})

app.post('/recipes', (req, res) => {
  db.collection('recipes').save(req.body, (err, result) => {
    if(err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/recipes', (req, res) => {
  console.log("delete");
  console.log(req.body.id);
  db.collection('recipes', function(err, collection) {
    collection.deleteOne({_id: new mongodb.ObjectID(req.body.id)});
  });
})

app.put('/recipes', (req, res) => {
  db.collection('recipes').findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)}, {
    $set: {
      recipe: req.body.recipe,
      ingredients: req.body.ingredients
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
