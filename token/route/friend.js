const express = require('express')
const { contant } = require('lodash')
const {  friend , sequelize } = require('.././models')
const jwt = require('jsonwebtoken');
const  { verifyToken }  = require('../verify.js');
const route = express.Router()
route.use(express.json())

route.post('/friend',verifyToken, async (req, res) => {
    const { User_ID:User  , Friend_ID , status }=req.body
  
    try {
      console.log("friend",Friend_ID, User)
      const Friend = await friend.create({User , Friend_ID , status })
      return res.json(Friend)
    }
     catch (err) {
     console.log(err)
     return res.status(500).json(err)
    }
  })
  route.get('/friend', verifyToken,async (req, res) => {
    try {
      const Friend = await friend.findAll()
  
      return res.json(Friend)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  route.get('/friend/:friend_ID',verifyToken, async (req, res) => {
    const Friend_ID = req.params.Friend_ID
    try {
      const Friend = await friend.findOne({ where: { Friend_ID },
        include: 'posts',
      })
  
      return res.json(Friend)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  module.exports = route