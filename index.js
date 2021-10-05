require('dotenv').config()
const { request, response } = require("express");
const express = require("express");
const Person = require('./models/person')
const morgan = require("morgan");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('build'))

morgan.token("bodyObject", (request) => JSON.stringify(request.body));

// Logging sensitive data not a great practice, this is just for testing tokens
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :bodyObject"
  )
);

app.use(express.json());

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

app.get("/api/people", (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  });
});

app.get("/info", (request, response) => {
  Person.countDocuments()
    .then(count => {
      response.send(`<p>Phonebook has info for ${count} people </p>
      <p>${new Date()}</p>`)
    })
});

app.get("/api/people/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
     if (person) {
      response.json(person);
     } else {
       response.status(404).end()
     }
  })
  .catch(error => next(error))
});

app.post("/api/people/", (request, response, next) => {
  const body = request.body;

  // if (body.content === undefined) {
  //   return response.status(400).json({
  //     error: "content missing",
  //   });
  // }

  // if (people.find((person) => person.name === body.name)) {
  //   return response.status(422).json({
  //     error: "name must be unique",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
});

app.put("/api/people/:id", (request, response, next) => {
  const body = request.body
  if(!body.number) {
    return response.status(400).json({
      error: "content missing"
    })
  }
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {returnOriginal: false, runValidators: true, context: 'query'})
    .then(updatedPerson => {
      if(updatedPerson) {
        response.json(updatedPerson)
      } else {
        return response.status(404).json({
          error: "content already deleted"
        })
      }
    })
    .catch(error => next(error))
})

app.delete("/api/people/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end()
    )
    .catch(error => next(error))
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({error: error.message})
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
