const express = require(`express`)
const {graphqlHTTP} = require(`express-graphql`)
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()
// можно запускать на любом порту
const PORT = 3005

//987654321
mongoose.connect('mongodb+srv://artur:987654321@cluster0.kdrp8.mongodb.net/graph?retryWrites=true&w=majority')

//пакет позволяющий нашему express серверу использывать graphql API
app.use(`/graphql`, graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log(`Connection DB!`))

// запускаем прослушивание на 3005 порту
app.listen(PORT, err => {
    err ? console.log(error) : console.log(`Server started!`)
})