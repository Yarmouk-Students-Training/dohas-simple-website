const express = require('express')
const { contant } = require('lodash')
const {  comment  , sequelize } = require('.././models')
const jwt = require('jsonwebtoken');
const  { verifyToken }  = require('../verify.js');
const route = express.Router()
route.use(express.json())


route.post('/comment',verifyToken, async (req, res) => {
    const {  comment_content , post_ID  , comment_ID , user_ID  } = req.body

    try {
      const comments = await comment.create({comment_content , post_ID  , comment_ID , userId:user_ID })
      return res.json(comments)
    }
     catch (err)
     {
      console.log(err)
      return res.status(500).json(err) 
    }
    }) 
    route.get('/comment',verifyToken, async (req, res) => {
        try {
          const comments = await comment.findAll()
      
          return res.json(comments)
        } catch (err) {
          console.log(err)
          return res.status(500).json({ error: 'Something went wrong' })
        }
      })
      
      route.get('/comment/:comment_ID',verifyToken, async (req, res) => {
        const comment_ID = req.params.comment_ID
        try {
          const comments = await comment.findOne({ where: { comment_ID },
            include: 'posts',
          })
      
          return res.json(comments)
        } catch (err) {
          console.log(err)
          return res.status(500).json({ error: 'Something went wrong' })
        }
      })
      route.put('/comment',verifyToken, async (req, res) => {
        const { user_ID , comment_content , comment_ID , posts_ID  } = req.body
      try {
        const comments = await comment.findOne({ where: {comment_ID} })
        comments.comment_content = comment_content
        await comments.save()
    
        return res.json(comments)
      } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
      }
    })
    route.delete('/comment/:comment_ID',verifyToken, async (req, res) => {
        const comment_ID = req.params.comment_ID
        try {
          const Comment = await comment.findOne({ where: { comment_ID } })
          await Comment.destroy()
          return res.json({ message: 'comment deleted!' })
          } 
        catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
        }
      })  
      module.exports = route