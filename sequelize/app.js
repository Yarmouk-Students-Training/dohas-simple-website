const express = require('express')
const { sequelize } = require('./models')
const app = express()
app.use(express.json())

app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.sync({force : true})
  //await sequelize.authenticate()
  console.log('Database Connected!')
})
  
