const Task = require('../models/task')

const getAllTasks = async (req,res) => {
    try {
        const task = await Task.find({})
        res.status(200).json({task})
    } catch(error) {
        res.status(500).json({msg:error})
    }
};

const createTask = async(req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch(error) {
        res.status(500).json({msg:error})
    }
};

const getTask = async(req,res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.status(200).json({task})
    } catch(error) {
        res.status(500).json({msg:error})
    }
    //res.status('Get task');
};

const updateTask = async(req,res) => {
    console.log(req.params)
    try {
        const task = await Task.findByIdAndUpdate(req.body)
        // const task = await Task.findByIdAndUpdate(req.params.id, {name: req.params.name, completed: req.params.completed})
        res.status(200).json({task})
    } catch(error) {
        res.status(500).json();
    }
    // res.status('Update task');
};

const deleteTask = async(req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({task})
    } catch(error) {
        res.status(500).json({msg:error})
    }
    res.status('Delete task');
};

module.exports = {getAllTasks, createTask, getTask, updateTask, deleteTask};