const { response } = require('express')
const express = require ('express')
const app = express()

app.use(express.json())


let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]


  app.get('/api/persons', ( req, res ) => {
      res.json (persons)
  })

// Adding data to server
  app.get('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)
      const person = persons.find (person => person.id === id)
      
      if (person) {
        res.json(person)
      } else {
          res.status(404).end ()
      }
    })

//Deleting data feom server
  app.delete('/api/persons/:id', (req, res) => {
      const id = Number (req.params.id)
      persons = persons.filter(person => person.id !== id)

      res.status (204).end ("Entry deleted")
  })

//Adding data to server
  app.post('/api/persons', (req, res ) => {
      const person = req.body
      console.log(person);
      res.json(person)

  })


const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`);