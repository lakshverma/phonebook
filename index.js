const { request, response } = require('express')
const express = require('express')
var morgan = require('morgan')

const app = express()
app.use(morgan('tiny'))

app.use(express.json())

let people = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/people', (request, response) => {
  response.json(people)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${people.length} people </p>
  <p>${new Date()}</p>`)
})

app.get('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(person => person.id === id)
  response.json(person)
})

app.post('/api/people/', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if (people.find(person => person.name === body.name)) {
    return response.status(422).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: (Math.floor(Math.random()*100000) + 1),
    name: body.name,
    number: body.number
  }

  people = people.concat(person)

  response.json(person)

})

app.delete('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(person => person.id != id);

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
