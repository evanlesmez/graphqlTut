import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getAuthorsWithBooksQuery} from '../queries/queries';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

// Dummies
// const stub = [
//   {name: "Evan", id:1, bookCount: 3, genres: [{genre: "horror", genreCount: 2}, {genre: "biography", "genreCount": 3}]},
//   {name: "Paulo Coehlo", id: 2, bookCount: 0},
//   {name: "Homer", id: 3, bookCount: 5},
//   {name: "Ghibli", id: 4, bookCount: 6}
// ];

class DataTable extends Component {
// state = {authorBookCountData: []};

// Compare stored dates to current date
checkRecentlyCreated = (bookDate) => {
  let now = new Date();
  bookDate = new Date(bookDate);
  console.log(bookDate);
}
render(){
  let {data} = this.props;

  let xLabels = [];
  let authorBookCountData = [];
  // stub.map(author => {
  //   return names.push(author.name);
  // });
  switch(data.loading){
    case false:
      data.authors.map(author => {
        console.log(author.books);
        this.checkRecentlyCreated(author.books[0].dateCreated);
        xLabels.push(author.name);
        let authorObject = {name:author.name, id: author.id, bookCount: author.books.length};
        return authorBookCountData.push(authorObject);
      });
      break;
    default:
      console.log("Data is loading");
  };
  console.log(authorBookCountData);
  return(
    <div style={{display: 'flex', justifyContent:'center', width:'80%'}}>
      <h1>Tables!</h1>
      <div>
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis  tickFormat={xLabels}/>
        <VictoryAxis dependentAxis tickFormat={(y)=> (y*10)/10} tickCount={3}/>
        <VictoryStack colorScale={"warm"}>
          {data.loading ? null:<VictoryBar data={authorBookCountData} x="name" y="bookCount"/>}
        </VictoryStack>
      </VictoryChart>
      </div>
    </div>
  );
  }
}
  export default graphql(getAuthorsWithBooksQuery)(DataTable);
