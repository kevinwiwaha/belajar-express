const express = require('express')
const app = express()
const port = 8000
let todos = [
    {
        id: 1,
        name: "beli hamster",
        done: true
    }
]
app.use(express.json())


// Get All Todos
app.get('/todo', (req, res) => {
    res.send(todos)
})
// Create a Todo
app.post('/todo', (req, res) => {
    todos.push(req.body)
    res.send(todos)
})
// Update existing todo by ID
app.put('/todo', (req, res) => {
    let index = todos.findIndex(todo => todo.id == req.body.id)
    todos[index] = req.body
    res.send(todos)
})
// Delete todo by ID
app.delete('/todo', (req, res) => {
    let index = todos.findIndex(todo => todo.id == req.body.id)
    todos.splice(index, 1)
    res.send(todos)
})
// Run server 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})