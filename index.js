const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { serveClient: false })
const findcity = require('find-nearest-cities')

app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/sendPush', (req, res) => {
  let push = req.body
  console.log(push)
  const cities = findcity(
    req.body.location.gps.latitude,
    req.body.location.gps.longitude
  )
  push['cities'] = cities.reduce(
    (sum, city) => {
      sum.count++
      sum.text += city.name + ', '
      return sum
    },
    { count: 0, text: '' }
  ).text
  console.log(push)
  io.emit('wdw', push)
  setTimeout(() => io.emit('wdw', undefined), 5000)
  res.send()
})

server.listen(process.env.PORT || 4000)
