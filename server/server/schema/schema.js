const graphql = require(`graphql`)

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql

const Movies = require('../models/movie')
const Directors = require('../models/director')

// const movies = [
//     {id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1',},
//     {id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2',},
//     {id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3',},
//     {id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4',},
//     {id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1',},
//     {id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '1',},
//     {id: '7', name: 'Inglourious Basterds', genre: 'Crime', directorId: '1',},
//     {id: '8', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4',},
// ]
// const moviesJson  = [
//     {id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '6106c7fc5d47e7c71e18d820'}
//     {id: '2', name: '1984', genre: 'Sci-Fi', directorId: '6106cea65d47e7c71e18d822'}
//     {id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '6106cec85d47e7c71e18d823'}
//     {id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '6106cee15d47e7c71e18d824'}
//     {id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '6106c7fc5d47e7c71e18d820'}
//     {id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '6106c7fc5d47e7c71e18d820'}
//     {id: '7', name: 'Inglourious Basterds', genre: 'Crime', directorId: '6106c7fc5d47e7c71e18d820'}
//     {id: '8', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '6106cee15d47e7c71e18d824'}
// ]
//
// const directorsJson = [
//     {id: '1', name: 'Quentin Tarantino', age: 55}, //6106c7fc5d47e7c71e18d820
//     {id: '2', name: 'Michael Radford', age: 72}, // 6106cea65d47e7c71e18d822
//     {id: '3', name: 'Quentin Tarantino', age: 51}, // 6106cec85d47e7c71e18d823
//     {id: '4', name: 'Guy Ritchie', age: 50}, // 6106cee15d47e7c71e18d824
// ]
//
// const directors = [
//     {id: '1', name: 'Quentin Tarantino', age: 55},
//     {id: '2', name: 'Michael Radford', age: 72},
//     {id: '3', name: 'Quentin Tarantino', age: 51},
//     {id: '4', name: 'Guy Ritchie', age: 50},
// ]

// Описали схему данных
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, args) {
                //return directors.find(director => director.id === parent.id)
                return Directors.findById(parent.directorId)
            }
        }
    }),
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                //return movies.filter(movie => movie.directorId === parent.id)
                return Movies.find({directorId: parent.id})
            }
        }
    }),
})

// запрос одного фильма
// в муви - то что он должен содержать
// args какие аргументы принимает запрос ( id тип которого строка)
// resolve принимает 2ва аргумента, внутри описываем какие данные должен вернуть
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                //return movies.find(movie => movie.id == args.id)
                return Movies.findById(args.id)
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                //return directors.find(director => director.id == args.id)
                return Directors.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (parent, args) => {
                //return movies
                return Movies.find({})
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve: (parent, args) => {
                //return directors
                return Directors.find({})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query
})

