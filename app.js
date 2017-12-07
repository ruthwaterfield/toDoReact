var express = require('express')
var exphbs = require('express-handlebars')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID;

var app = express()
var url = 'mongodb://localhost:27017/myToDoDb';
app.use(bodyParser.json())
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

var findTasks = function (db, showDoneTasks, callback) {
    var cursor = db.collection('tasks').find({"done": showDoneTasks})
    var data = []
    cursor.each(function (err, doc) {
        assert.equal(err, null)
        if (doc != null) {
            data.push(doc)
        } else {
            console.log("Retrieved documents from the tasks collection.");
            callback(data)
        }
    })
}

var insertTask = function (db, taskToAdd, callback) {
    db.collection('tasks').insertOne(taskToAdd,
        function (err) {
            if (err) {
                callback(0)
                console.log(err.message)
            } else {
                console.log("Inserted a document into the tasks collection.");
                callback(1)
            }
        })
}

var updateTask = function (db, taskId, updatedData, callback) {
    db.collection('tasks').updateOne({'_id': ObjectId(taskId)},
        {
            $set: updatedData,
            $currentDate: {'lastModified': true}
        },
        function (err) {
            if (err) {
                callback(0)
                console.log(err.message)
            } else {
                console.log("Updated task: " + taskId);
                callback(1);
            }
        })
}

var deleteTask = function (db, taskId, callback) {
    db.collection('tasks').deleteOne({'_id': ObjectId(taskId)},
        function (err) {
            if (err) {
                callback(0)
                console.log(err.message)
            } else {
                console.log("Deleted task: " + taskId);
                callback(1);
            }
        })
}

app.get('/', function (req, res) {
    res.render('home')
})

app.get('/tasks', function (req, res) {
    if (req.query.done == 1) {
        var showDoneTasks = 1
    } else {
        var showDoneTasks = 0
    }

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err)
        console.log("Connected correctly to server.")
        findTasks(db, showDoneTasks, function (data) {
            db.close()
            res.json(data)
        })
    })
})

app.post('/tasks', function (req, res) {
    let taskToAdd = req.body

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        insertTask(db, taskToAdd, function (success) {
            db.close()
            res.json({'success': success})
        });
    });
})

app.put('/tasks/:id', function (req, res) {
    let taskId = req.params.id
    let updatedData = req.body

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        updateTask(db, taskId, updatedData, function (success) {
            db.close()
            res.json({'success': success})
        });
    });
})

app.del('/tasks/:id', function (req, res) {
    let taskId = req.params.id

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        deleteTask(db, taskId, function (success) {
            db.close()
            res.json({'success': success})
        });
    });
})


app.listen(8080, () => console.log('To do app listening on port 8080!'))

