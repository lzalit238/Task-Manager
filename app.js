const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');
const  { connect } = require('./routes/tasks');
require('dotenv').config()

//middleware
app.use(express.json())
app.use('/api/v1/tasks', tasks);
app.use(express.static('public'));

//routes
app.use(express.static('public'))
app.get('/', (req,res)=> {
    res.send("Task Manager App")
})

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(3000, console.log('Server is listening on port 3000... '));
    } catch(err) {
        console.log(err)
    }
}
start();