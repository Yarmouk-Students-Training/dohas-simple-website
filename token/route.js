const express = require('express')
const { contant } = require('lodash')
const posts = require('./route/post');
const comment = require('./route/comment');
const friend = require('./route/friend');
const user = require('./route/user');
const reaction  = require('./route/reaction');
const { sequelize } = require('./models')
const jwt = require('jsonwebtoken');
const  {verifyToken}  = require('./verify');
const  {reIssueTokens}  = require('./verify');
let refreshTokens = []

const dotenv = require('dotenv')
const route = express()
route.use(express.json())
dotenv.config()

route.post('/api/login', async(req, res) => {
  // Authenticate User
   const user = {
    id: 1, 
    username:'doha',
    email:'doha.khasawneh22@gmail.com' }

  const accessToken = signAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.SECRET_KEY_2)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function signAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '60s' })
}

route.listen({ port: 3000 }, async () => {
    console.log('Server up on http://localhost:3000')
    await sequelize.authenticate()
    console.log('Database Connected!')
  })

route.use(posts)
route.use(comment)
route.use(friend)
route.use(user),
route.use(reaction)