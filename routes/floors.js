var express = require('express')
var router = express.Router()
var db = require('../db/db')

router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM Trap'
  db.query(queryString, (err, rows, fields) => {
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

router.get('/:id', (req, res) => {
  const trapID = req.params.id
  const queryString = 'SELECT * FROM Trap where Trap_ID = ?'
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
  console.log('Trying to update a trap')

  const trapID = req.params.id
  const floorID = req.body.Floor_ID
  const trapType = req.body.Trap_type
  const baitLeft = req.body.Bait_left

  const queryString = 'UPDATE Trap SET Floor_ID = ?, Trap_type = ?, Bait_left = ? WHERE employee_id = ?'

  db.query(queryString, [floorID, trapType, baitLeft, trapID], (err, results, field) => {
    if (err) {
      console.log('Failed to update Trap: ' + err)
      res.sendStatus(500)
    }
    console.log('Updated Trap with id: ', trapID)
    res.end()
  })
  res.end()
})

router.post('/create', (req, res) => {
  console.log('Trying to create a new user')

  const floorID = req.body.Floor_ID
  const trapType = req.body.Trap_type
  const baitLeft = req.body.Bait_left

  const queryString = 'INSERT INTO Trap (Floor_ID, Trap_type, Time, Bait_left) VALUES (?, ?, CURRENT_TIME(), ?)'

  db.query(queryString, [floorID, trapType, baitLeft], (err, results, field) => {
    if (err) {
      console.log('Failed to insert new trap: ' + err)
      res.sendStatus(500)
    }

    console.log('Inserted a new trap with id: ', results.insertId)
    res.end()
  })
  res.end()
})

router.delete('/delete/:id', (req, res) => {
  console.log('Trying to delete a trap')

  const trapID = req.params.id

  const queryString = 'DELETE from Trap WHERE Trap_ID = ?'

  db.query(queryString, [trapID], (err, results, field) => {
    if (err) {
      console.log('Failed to delete Trap: ' + err)
      res.sendStatus(500)
    }
  })
  res.end()
})

module.exports = router
