const express = require('express')
const { constant } = require('lodash')
const { post } = require('request')
const { sequelize } = require('./models')
const app = express()
app.use(express.json())

app.post('/user', async (req, res) => {
    const { U_name, email, U_ID ,gender ,passwoed  } = req.body
  
    try {
      const user = await User.create({U_name, email, U_ID ,gender ,passwoed   })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  app.post('/post', async (req, res) => {
    const { U_ID,content , P_ID   } = req.body
  
    try {
      const user = await User.create({U_ID,content , U_ID})
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })


  app.post('/comment', async (req, res) => {
    const { U_ID,comment_content , P_ID  , C_ID  } = req.body
  
    try {
      const user = await User.create({U_ID,comment_content , U_ID  , C_ID   })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err) }
    }) 
 
  
  app.post('/reaction ', async (req, res) => {
    const { U_ID,reaction_type , P_ID  , R_ID   } = req.body
  
    try {
      const user = await User.create({U_ID,reaction_type , P_ID  , R_ID   })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  app.post('/friend', async (req, res) => {
    const { F_id, U_ID ,action_users_id ,status  } = req.body
  
    try {
      const user = await User.create({F_id, U_ID ,action_users_id ,status    })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  
app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({
        where: { uuid },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.get('/friend', async (req, res) => {
    try {
      const users = await User.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.get('/friend/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({
        where: { uuid },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  app.get('/post', async (req, res) => {
    try {
      const users = await User.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.get('/post/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({
        where: { uuid },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  app.get('/comment', async (req, res) => {
    try {
      const users = await User.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.get('/comment/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({
        where: { uuid },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  app.get('/reaction', async (req, res) => {
    try {
      const users = await User.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.get('/reaction/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({
        where: { uuid },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  app.put('/user/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const {U_name, email, U_ID ,gender ,passwoed  } = req.body
    try {
      const user = await User.findOne({ where: { uuid } })
  
    user.U_name=nane 
    user.email=email
    user.U_ID = id 
    user.gender= gender
    user.passwoed=pass
  
      await user.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  app.put('/post/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { U_ID,content , P_ID  } = req.body
    try {
      const user = await User.findOne({ where: { uuid } })
  
      post.U_ID = id
      post.content = content
      await user.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  app.put('/comment/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { U_ID,comment_content,C_ID , P_ID  } = req.body
    try {
      const user = await User.findOne({ where: { uuid } })
  
     comment.U_ID = id
     comment.comment_content = constant
     comment.C_ID = c_id 
     comment.P_ID = p_id  
      await user.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  app.put('/reaction/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { U_ID,reaction_type,R_ID , P_ID  } = req.body
    try {
      const user = await User.findOne({ where: { uuid } })
  
     reaction.U_ID = id
     reaction.reaction_type = type
     reaction.R_ID = r_id 
     reaction.P_ID = p_id  
      await user.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  app.put('/friend/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { U_ID,action_users_id,F_ID , status  } = req.body
    try {
      const user = await User.findOne({ where: { uuid } })
  
     friend.U_ID = id
     friend.F_ID = f_id 
     friend.status = statu
     friend.action_users_id = action
      await user.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  

app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.sync({force : true})
  //await sequelize.authenticate()
  console.log('Database Connected!')
})
  
