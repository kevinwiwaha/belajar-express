const express = require('express')
const app = express()
const port = 8100
const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyF7jwvYEnse9nLJ' }).base('app8fNujnTIe6N0It');

app.use(express.json())


// Get All Todos
app.get('/todo', (req, res) => {
    base('todo').select({
        view: 'Grid view'
    }).firstPage(function (err, records) {
        if (err) { console.error(err); return; }
        let todos = []
        records.forEach(function (record) {
            let todo = {
                id: record.id,
                fields: record.fields
            }
            todos.push(todo)
        });
        res.send(todos)
    });
})
// Create a Todo
app.post('/todo', (req, res) => {
    base('todo').create([
        {
            "fields": req.body
        }
    ], function (err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            res.send(req.body)
        });
    });
})
// Update existing todo by ID
app.put('/todo', (req, res) => {
    base('todo').update([
        {
            "id": req.body.id,
            "fields": {
                name: req.body.name,
                done: req.body.done
            }
        }
    ], function (err, records) {
        if (err) {
            console.error(err);
            return;
        }
        res.send(req.body)
    });
})
// Delete todo by ID
app.delete('/todo', (req, res) => {
    base('todo').destroy([req.body.id], function (err, deletedRecords) {
        console.log(req.body)
        if (err) {
            console.error(err);
            return;
        }
        res.send(req.body)
    });
})
// Run server 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})