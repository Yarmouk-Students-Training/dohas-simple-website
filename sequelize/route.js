const express = require('express')
const { contant } = require('lodash')
const { posts , comment , friend , user ,reaction , sequelize } = require('./models')
const route = express()
route.use(express.json())

route.post('/user', async (req, res) => {
    const  { user_name , email, user_ID ,gender ,password}=req.body
  
    try {
      console.log("hi user")
      const User = await user.create({user_name , email, User_ID: user_ID ,gender ,password })
      return res.json(User)
    } 
    catch (err) {
    console.log(err)
    return res.status(500).json(err)
    }
  })

  route.post('/posts', async (req, res) => {
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


  route.post('/comment', async (req, res) => {
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
 
  
  route.post('/reaction', async (req, res) => {
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
  route.post('/friend', async (req, res) => {
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


route.get('/user', async (req, res) => {
    try { 
        console.log("hi")
      const User = await user.findAll()
  
      return res.json(User)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/user/:user_ID', async (req, res) => {
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
  
  
 
  route.get('/posts', async (req, res) => {
    try {
      const post = await posts.findAll()
  
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/posts/:posts_ID', async (req, res) => {
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

  route.get('/comment', async (req, res) => {
    try {
      const comments = await comment.findAll()
  
      return res.json(comments)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/comment/:comment_ID', async (req, res) => {
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

  route.get('/reaction', async (req, res) => {
    try {
      const Reaction = await reaction.findAll()
  
      return res.json(Reaction)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/reaction/:reaction_ID', async (req, res) => {
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

  route.get('/friend', async (req, res) => {
    try {
      const Friend = await friend.findAll()
  
      return res.json(Friend)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  route.get('/friend/:friend_ID', async (req, res) => {
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

  route.put('/user', async (req, res) => {
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
  route.put('/posts', async (req, res) => {
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
  route.put('/comment', async (req, res) => {
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

  route.put('/reaction', async (req, res) => {
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

route.delete('/user/:user_ID', async (req, res) => {
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

route.delete('/posts/:posts_ID', async (req, res) => {
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
route.delete('/comment/:comment_ID', async (req, res) => {
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
route.delete('/reaction/:reaction_ID', async (req, res) => {
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

route.listen({ port: 3000 }, async () => {
    console.log('Server up on http://localhost:3000')
    await sequelize.authenticate()
    console.log('Database Connected!')
  })