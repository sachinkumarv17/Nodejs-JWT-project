const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')
const { text } = require('express')
 
const getGoals = asyncHandler( async (req, res) =>{
    const goals = await Goal.find({user : req.user.id})
    res.status(200).json(goals)
}
)

const setGoal = asyncHandler(async (req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text : req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req, res) =>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400);
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }

    // User should match
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('USer not Authorised')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
    })
    res.status(200).json(updateGoal)
})

const deleteGoal = asyncHandler(async (req, res) =>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400);
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)

    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }

    // User should match
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('USer not Authorised')
    }

    await goal.deleteOne()
    res.status(200).json({id : req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}