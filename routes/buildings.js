var express = require('express')
var router = express.Router()
var db = require('../db/db')

router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM Building'
  db.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for Buildings: ' + err)
      res.sendStatus(500)
      res.end()
      return
    }

    console.log('I think we fetched it')
    res.json(rows)
  })
})

router.get('/:id', (req, res) => {
  const trapID = req.params.id
  const queryString = 'SELECT * FROM Building where Building_ID = ?'
  db.query(queryString, [trapID], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for employees: ' + err)
      res.sendStatus(500)
      res.end()
      return
    }
    console.log('I think we fetched it')
    res.json(rows)
  })
})

router.put('/update/:id', (req, res) => {
  console.log('Trying to update a Building')

  const buildingID = req.params.id
  const buildingName = req.body.Building_name
  const location = req.body.Location

  const queryString = 'UPDATE Building SET Building_name = ?, Location = ? WHERE Building_ID = ?'

  db.query(queryString, [buildingName, location, buildingID], (err, results, field) => {
    if (err) {
      console.log('Failed to update Trap: ' + err)
      res.sendStatus(500)
    }
    console.log('Updated Trap with id: ', buildingID)
    res.end()
  })
  res.end()
})

router.post('/create', (req, res) => {
  console.log('Trying to create a new building')

  const buildingName = req.body.Building_name
  const location = req.body.Location

  const queryString = 'INSERT INTO Building (Building_name, Location) VALUES (?, ?)'

  db.query(queryString, [buildingName, location], (err, results, field) => {
    if (err) {
      console.log('Failed to insert new building: ' + err)
      res.sendStatus(500)
    }

    console.log('Inserted a new Building with id: ', results.insertId)
    res.end()
  })
  res.end()
})

router.delete('/delete/:id', (req, res) => {
  console.log('Trying to delete a Building')

  const buildingID = req.params.id
  const queryString = 'DELETE Building WHERE Trap_ID = ?'

  db.query(queryString, [buildingID], (err, results, field) => {
    if (err) {
      console.log('Failed to delete Trap: ' + err)
      res.sendStatus(500)
    }
  })
  res.end()
})

module.exports = router
