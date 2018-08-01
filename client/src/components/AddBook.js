import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getAuthorsQuery} from '../queries/queries';


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
     let data = this.props.data;
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
    console.log(this.state);
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
            <input name="genre" type="text" onChange={(e) => this.handleInputChange(e)}/>
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
  
  export default graphql(getAuthorsQuery)(AddBook);
  