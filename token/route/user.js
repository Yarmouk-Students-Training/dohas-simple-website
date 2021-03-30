const express = require('express')
const { contant } = require('lodash')
const {  user  , sequelize} = require('.././models')
const jwt = require('jsonwebtoken');
const  { verifyToken }  = require('../verify.js');
const route = express.Router()
route.use(express.json())

route.post('/user', verifyToken, async (req, res) => {
  console.log(req.body)
    const  { user_name , email, user_ID ,gender ,password}=req.body
       try {
         console.log(user_ID)
      console.log("hi user")
      const User = await user.create({user_name , email, User_ID: user_ID ,gender ,password })
      return res.send(User)
    } 
    catch (err) {
    console.log(err)
    return res.status(500).send(err)
    }
  
  })

  
  route.get('/user', verifyToken, async (req, res) => {
    try { 
        console.log("hi")
      const User = await user.findAll()
  
      return res.json(User)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/user/:user_ID', verifyToken,async (req, res) => {
    const user_ID = req.params.user_ID
    try {
      const User = await user.findOne({   where: { User_ID: user_ID },
        include: 'posts',
      })
  
      return res.json(User)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  route.put('/user',verifyToken, async (req, res) => {
    const {user_name, email, user_ID ,gender ,password  } = req.body
    try {
      const User = await user.findOne({ where: { User_ID:user_ID } })
  
      User.user_name = user_name 
      User.email = email
      User.gender = gender
      User.password =password
  
      await User.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.delete('/user/:user_ID', verifyToken,async (req, res) => {
    const user_ID = req.params.user_ID
    try {
      const User = await user.findOne({ where: { User_ID: user_ID } })
  
      await User.destroy()
  
      return res.json({ message: 'User deleted!' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  module.exports = route