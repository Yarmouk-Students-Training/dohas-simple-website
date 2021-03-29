const express = require('express')
const { contant } = require('lodash')
const { posts  , sequelize } = require('.././models')
const jwt = require('jsonwebtoken');
const  { verifyToken }  = require('../verify.js');
const route = express.Router()
route.use(express.json())

route.post('/posts',verifyToken, async (req, res) => {
    const { user_ID , content , posts_ID } = req.body
  
    try {
       console.log("hi posts", user_ID)
      const post = await posts.create({content , posts_ID , userId:user_ID})
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })
  
  route.get('/posts',verifyToken, async (req, res) => {
    try {
      const post = await posts.findAll()
  
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/posts/:posts_ID',verifyToken, async (req, res) => {
    const posts_ID = req.params.posts_ID
    try {
      const post = await posts.findOne({where: { posts_ID },
        include: 'user',
      })
  
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
 
  route.put('/posts',verifyToken, async (req, res) => {
    const { user_ID ,content , posts_ID  }=req.body
    try {
      const post = await posts.findOne({where:{ posts_ID }})
  
      post.content = content
      await post.save()
      return res.json(post)
    } 
    catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  route.delete('/posts/:posts_ID',verifyToken, async (req, res) => {
    const posts_ID = req.params.posts_ID
    try {
      const post = await posts.findOne({ where: { posts_ID } })
      await post.destroy()
      return res.json({ message: 'posts deleted!' })
    } 
    catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  module.exports = route