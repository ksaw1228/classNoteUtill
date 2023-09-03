const express = require('express')
const app = express()
const crawler = require('./crawler')

app.listen(3000,() => {
  console.log(3000)
})

app.get('/studentList',(req,res) => {
    // res.json(crawler())
})

app.post('/uploadElbum',(req,res) => {
//   crawler(req.body())
})