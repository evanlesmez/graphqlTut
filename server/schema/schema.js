const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

// Dummy Data
let books = [
    {name: 'Alchemist', genre: 'good', id: '1', authorId: '1'},
    {name: 'Ranger', genre: 'youngins', id: '2', authorId: '2'},
    {name: 'Ender Game', genre: 'noice', id: '3', authorId: '3'},   
    {name: 'Swaggy D', genre: 'hip hop', id: '4', authorId: '3'}, 
];

var authors = [
    {name: 'Jiblez', age: 78, id: '1'},
    {name: 'Ghibli', age: 34, id: '2'},
    {name: 'Stango', age: 60, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({  // In a function becaust cyclical dependency
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}, 
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent)
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}, 
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book: {
            type: BookType,
            args: {id: {type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID} },
            resolve(parent, args){
                return _.find(authors, {id: args.id});
        }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            } 
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
    
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
