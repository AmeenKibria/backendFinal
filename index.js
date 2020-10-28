const express = require ('express')
const bodyParser = require ('body-parser')
const morgan = require('morgan')
const app = express()



app.use(express.json())
app.use(bodyParser.json())


morgan.token('body', function getBody (req){
    return JSON.stringify(req.body)
})
app.use(morgan (':method :url :response-time :body'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
] 

// Event handler for geting the personlist 
  app.get('/api/persons', ( req, res ) => {
      res.json (persons)
  })
//Database info
app.get('/info', (req, res) =>{
    const numOfPersons = persons.length
    const timestap = new Date()
    res.send(
    `<p>Phonebook has info for ${numOfPersons} people</p>
    <p>${timestap}</p>`
    )
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

  // Generating new id
  const generateId = () => {  
    const maxId = persons.length > 0
        ? Math.max (...persons.map(n => n.id))
        :0
        return maxID + 1
  }

//Adding data to server

app.post("/api/persons", (request, response) => {
    const body = request.body;
  
    // Check if posted data is complete
    if (!body.name || !body.number) {
      console.log("--> NOT OK: Dataset incomplete");
      return response
        .status(400)
        .json({ error: "Number and name are required!" });
    }
  




    // Check if name isn't already in phonebook
  
    if (persons.find((person) => person.name === body.name)) {
      return response.status(400).json({ error: "Name is already in phonebook" });
    }
    // Create new Person based on posted data
    const newPerson = {
      id: getRandomID(),  
      name: body.name,
      number: body.number
    };
    // Add new person to phonebook
    persons = persons.concat(newPerson);
    // Respond with person object
    response.json(newPerson);
  });

//Handling unknow route
  const unknowEndPoint = (req, res ) =>{
      res.status(404).send ({error: "Unknown end point"})
  }
  app.use(unknowEndPoint)


const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`);