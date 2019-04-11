var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var bodyParser = require('body-parser')
var fs = require('fs')

var indexRouter = require('./routes/index')
var trapRouter = require('./routes/traps')
var buildingRouter = require('./routes/buildings')
var floorRouter = require('./routes/floors')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, XRequested-With, Content-Type,  Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,  POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/api', indexRouter)
app.use('/api/traps', trapRouter)
app.use('/api/traps', buildingRouter)
app.use('/api/floors', floorRouter)
app.use('/api/buildings', buildingRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
