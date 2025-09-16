const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + "/../.env" });

const app = express()
app.use(cors())
app.use(express.json());

const url = process.env.MDBURL

mongoose.connect(url).then(() => { console.log('mongoose is connected') })
    .catch(error => {
        console.log(`server side error ${error}`)
    })

const schema = new mongoose.Schema({
    title: {type: String,required: true},
    price: {type: String,required: true},
    content: {type: String,required: true}
})

const newSchema = mongoose.model('ProjectSeven', schema)

app.get('/', async(req, res) => {
    const data = await newSchema.find()
    return res.json(data)
})

app.post('/', async(req, res) => {
    const body = req.body
    await newSchema.create({
        title:body.title,
        price:body.price,
        content:body.content
    })
    return res.json({msg:'data send successfully'})
})

/*const PORT = process.env.port

app.listen(PORT, () => { console.log(`the server is running is on port no http://localhost:${PORT}`) })*/

module.exports = app