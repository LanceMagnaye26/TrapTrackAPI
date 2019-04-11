var express = require('express')
var router = express.Router()
var db = require('../db/db')

router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM Floor'
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
  const floorID = req.params.id
  const queryString = 'SELECT * FROM Floor where Floor_ID = ?'
  db.query(queryString, [floorID], (err, rows, fields) => {
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

  const floorID = req.params.id
  const buildingID = req.body.Building_ID
  const floorName = req.body.Floor_Name

  const queryString = 'UPDATE Building SET Building_ID = ?, Floor_Name = ? WHERE Floor_ID = ?'

  db.query(queryString, [buildingID, floorName, floorID], (err, results, field) => {
    if (err) {
      console.log('Failed to update Trap: ' + err)
      res.sendStatus(500)
    }
    console.log('Updated Trap with id: ', floorID)
    res.end()
  })
  res.end()
})

router.post('/create', (req, res) => {
  console.log('Trying to create a new building')

  const buildingID = req.body.Building_ID
  const floorName = req.body.Floor_Name

  const queryString = 'INSERT INTO Floor (Building_ID, floorName) VALUES (?, ?)'

  db.query(queryString, [buildingID, floorName], (err, results, field) => {
    if (err) {
      console.log('Failed to insert new building: ' + err)
      res.sendStatus(500)
    }

    console.log('Inserted a new Building with id: ', results.insertId)
  })
  res.end()
})

router.delete('/delete/:id', (req, res) => {
  console.log('Trying to delete a Building')

  const floorID = req.params.id
  const queryString = 'DELETE Building WHERE Floor_ID = ?'

  db.query(queryString, [floorID], (err, results, field) => {
    if (err) {
      console.log('Failed to delete Trap: ' + err)
      res.sendStatus(500)
    }
  })
  res.end()
})

module.exports = router
