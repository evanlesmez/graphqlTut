import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';

class AddBook extends Component {
 constructor(props){
     super(props);
     this.state = {
        bookName: "",
        genre: "",
        authorId: ""
     };
 }

 displayAuthors(){
     let data = this.props.getAuthorsQuery;
     if(data.loading){
         return( <option disabled> Loading authors...</option>)
     } else
     {
         return data.authors.map(author => {
             return(
                 <option key={author.id} value={author.id}> {author.name} </option>
             );
         })
        }
 }

 submitForm = (e) => {
    e.preventDefault();
    this.props.addBookMutation({
        variables: {
            name: this.state.bookName,
            genre: this.state.genre,
            authorId: this.state.authorId
        },
        refetchQueries: [{query: getBooksQuery}]
    });
 }

 handleInputChange = (e) => {
     this.setState({[e.target.name]:e.target.value});
 }

    render() {
      return (
        <form id="add-book" onSubmit= {(e) => this.submitForm(e)}>


        <div className="field">
            <label> Book name: </label>
            <input name="bookName" type="text" onChange={(e) => this.handleInputChange(e)}/>
        </div>

        <div className="field">
            <label>Genre:</label>
            <select name="genre" label="genre" onChange={(e) => this.handleInputChange(e)}>
            <option value=''>Select Genre</option>
            <option value="sci-Fi">Sci-Fi</option>
            <option value="horror">Horror</option>
            <option value="biography">Biography</option>
            <option value="non-fiction">Non-fiction</option>
            <option value="children">Children</option>
            <option value="spiritual">Spiritual</option>
            </select>
        </div>

        <div className="field">
            <label>Author:</label>
            <select name='authorId' onChange={(e) => this.handleInputChange(e)}>
                <option> Select author </option>
                {this.displayAuthors()}
            </select>
        </div>


        <button>+</button>

        </form>

    );
    }
  }

  export default compose(
      graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
      graphql(addBookMutation, { name: "addBookMutation"})
  )(AddBook);
