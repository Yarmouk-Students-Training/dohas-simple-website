
const express = require('express')
const { contant } = require('lodash')
const { post } = require('request')
const { sequelize } = require('./models')
const friend = require('./models/friend')
const {reaction } = require('./models/reaction')
const route = express()
//route.use(express.json())

route.post('/user', async (req, res) => {
    const { user_name, email, user_ID ,gender ,passwoed  } = req.body
  
    try {
      const user = await User.create({user_name, email, user_ID ,gender ,passwoed   })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  route.post('/post', async (req, res) => {
    const {  user_ID,content , post_ID   } = req.body
  
    try {
      const post = await post.create({  user_ID , content , post_ID})
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })


  route.post('/comment', async (req, res) => {
    const {  comment_content , post_ID  , comment_ID ,user_ID  } = req.body
  
    try {
      const comment = await comment.create({post_ID, comment_content ,  comment_ID   })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err) }
    }) 
 
  
  route.post('/reaction ', async (req, res) => {
    const {  reaction_type , post_ID  , reaction_ID ,user_ID  } = req.body
  
    try {
      const reaction = await reaction.create({ reaction_type , post_ID  , reaction_ID   })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })
  route.post('/friend', async (req, res) => {
    const { user_ID ,friend_ID ,status , action_user_id } = req.body
  
    try {
      const user = await User.create({user_ID ,friend_ID ,status , action_user_id  })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })


route.get('/user', async (req, res) => {
    try { 
        console.log("hi")
      const users = await User.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/user/:user_ID', async (req, res) => {
    const user_ID = req.params.user_ID
    try {
      const user = await User.findOne({   where: { user_ID },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  
 
  route.get('/post', async (req, res) => {
    try {
      const post = await post.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/post/:post_ID', async (req, res) => {
    const post_ID = req.params.post_ID
    try {
      const post = await post.findOne({where: { post_ID },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.get('/comment', async (req, res) => {
    try {
      const comment = await comment.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/comment/:comment_ID', async (req, res) => {
    const comment_ID = req.params.comment_ID
    try {
      const comment = await comment.findOne({ where: { comment_ID },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.get('/reaction', async (req, res) => {
    try {
      const reaction = await reaction.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/reaction/:reaction_ID', async (req, res) => {
    const reaction_ID = req.params.reaction_ID
    try {
      const reaction = await reaction.findOne({
        where: { reaction_ID },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.get('/friend', async (req, res) => {
    try {
      const friend = await friend.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  route.get('/friend/:friend_ID', async (req, res) => {
    const friend_ID = req.params.friend_ID
    try {
      const friend = await friend.findOne({ where: { friend_ID },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.put('/user/:user_ID', async (req, res) => {
    const {user_name, email, user_ID ,gender ,password  } = req.body
    try {
      const user = await User.findOne({ where: { user_ID } })
  
    user.user_name = name_name 
    user.email = email
    user.user_ID = id 
    user.gender = gender
    user.password =password
  
      await user.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  route.put('/post/:post_ID', async (req, res) => {
    const { user_ID ,content , post_ID  } = req.body
    try {
      const post = await post.findOne({ where: { Post_ID } })
  
      post.user_ID = id
      post.content = content
      await post.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  route.put('/comment/:comment_ID', async (req, res) => {
      const { user_ID , comment_content , comment_ID , post_ID  } = req.body
    try {
      const comment = await comment.findOne({ where: {  comment_ID} })
  
     comment.user_ID = id
     comment.comment_content = contant
     comment.comment_ID = comment_id 
     comment.post_ID = post_id  
      await comment.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.put('/reaction/:reaction_ID', async (req, res) => {
    const { user_ID, reaction_type , reaction_ID , post_ID  } = req.body
    try {
      const reaction = await reaction.findOne({ where: { reaction_ID } })
  
     reaction.user_ID = user_ID
     reaction.reaction_type = reaction_type 
     reaction.reaction_ID = reaction_id 
     reaction.post_ID = post_id  
      await reaction.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

route.delete('/user/:user_ID', async (req, res) => {
  const user_ID = req.params.user_ID
  try {
    const user = await User.findOne({ where: { User_ID } })

    await user.destroy()

    return res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

route.delete('/post/:post_ID', async (req, res) => {
  const post_ID = req.params.post_ID
  try {
    const post = await post.findOne({ where: { post_ID } })

    await post.destroy()

    return res.json({ message: 'post deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
route.delete('/comment/:comment_ID', async (req, res) => {
  const comment_ID = req.params.comment_ID
  try {
    const comment = await comment.findOne({ where: { comment_ID } })

    await comment.destroy()

    return res.json({ message: 'comment deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
route.delete('/reaction/:reaction_ID', async (req, res) => {
  const reaction_ID = req.params.reaction_ID
  try {
    const reaction = await reaction.findOne({ where: { reaction_ID } })

    await reaction.destroy()

    return res.json({ message: 'reaction deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}) 
route.delete('/friend/:friend_ID', async (req, res) => {
    const friend_ID = req.params.friend_ID
    try {
      const friend = await friend.findOne({ where: { friend_ID } })
  
      await reaction.destroy()
  
      return res.json({ message: 'reaction deleted!' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }) 
route.listen({ port: 3000 }, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database Connected!')
  })