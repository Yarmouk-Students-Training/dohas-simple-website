const express = require('express')
const { contant } = require('lodash')
const { reaction , sequelize } = require('.././models')
const jwt = require('jsonwebtoken');
const  { verifyToken }  = require('../verify.js');
const route = express.Router()
route.use(express.json())

route.post('/reaction', verifyToken,async (req, res) => {
    const {  reaction_type , posts_ID  , reaction_ID ,userId:user_ID  } = req.body
  
    try {
      const Reaction = await reaction.create({reaction_type , posts_ID , reaction_ID , userId:user_ID})
      return res.json(Reaction)
      } 
      catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })
  route.get('/reaction',verifyToken, async (req, res) => {
    try {
      const Reaction = await reaction.findAll()
  
      return res.json(Reaction)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/reaction/:reaction_ID',verifyToken, async (req, res) => {
    const reaction_ID = req.params.reaction_ID
    try {
      const Reaction = await reaction.findOne({where: { reaction_ID },
        //include: 'posts',
      })
  
      return res.json(Reaction)
    } catch (err){
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  route.put('/reaction',verifyToken, async (req, res) => {
    const { user_ID, reaction_type , reaction_ID , posts_ID  } = req.body
    try {
      const Reaction = await reaction.findOne({ where: { reaction_ID } })
      Reaction.reaction_type = reaction_type 
      await Reaction.save()
      return res.json(Reaction)
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  route.delete('/reaction/:reaction_ID',verifyToken, async (req, res) => {
    const reaction_ID = req.params.reaction_ID
    try {
      const Reaction = await reaction.findOne({ where: { reaction_ID } })
  
      await Reaction.destroy()
  
      return res.json({ message: 'reaction deleted!' })
    } 
    catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
    }
  }) 
  module.exports = route