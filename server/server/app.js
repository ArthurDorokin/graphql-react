const express = require(`express`)
const {graphqlHTTP} = require(`express-graphql`)
const schema = require('./schema/schema')

const app = express()
// можно запускать на любом порту
const PORT = 3005

//пакет позволяющий нашему express серверу использывать graphql API
app.use(`/graphql`, graphqlHTTP({
    schema,
    graphiql: true,
}));

// запускаем прослушивание на 3005 порту
app.listen(PORT, err => {
    err ? console.log(error) : console.log(`Server started!`)
})