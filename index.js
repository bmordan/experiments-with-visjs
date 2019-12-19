const express = require('express')
const { getNode, getNodes } = require('./api')
const { dgraphToVisjs, expandSingleNode } = require('./format')
const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    getNodes()
    .then(dgraph_raw => dgraphToVisjs(dgraph_raw.getNodes))
    .then(data => res.render("home", {data: JSON.stringify(data)}))
    .catch(err => {
        console.error(err)
        res.send(err)
    })
})

app.get("/nodes/:id", (req, res) => {
    getNode(req.params.id)
    .then(dgraph_raw => expandSingleNode(dgraph_raw.getNode))
    .then(data => res.json(data))
    .catch(err => {
        console.error(err)
        res.send(err)
    })
})

app.listen(3000, () => console.table({app: "applied alpha", port: 3000, status: "🚀"}))