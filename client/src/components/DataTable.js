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

// Current fix because data.loading returning false on re-render even though
// authors are returning undefined on update. If I have time try to fix this
let xLabels = [];
let bookCountData = [];
let recentCount = 0;

class DataTable extends Component {

// state = {bookCountData: []};

// Compare stored dates to current date and return true or false if book within time frame
checkRecentlyCreated = (bookDate) => {
  let now = new Date();
  bookDate = new Date(bookDate);

  // Date offset in milis
  let dayOffset = 1000 * 60 * 60 * 24;
  return (now-dayOffset)<=bookDate;
}
render(){
  let {data} = this.props;

  switch(data.loading){
    case false:
      data.authors && data.authors.map(author => {
        author.books.forEach(book => {
          this.checkRecentlyCreated(book.dateCreated) ? recentCount += 1 :
          console.log("Old book");
        });

        xLabels.push(author.name);
        let authorObject = {name:author.name, id: author.id, bookCount: author.books.length};
        return bookCountData.push(authorObject);
      });

      // Add the recent count to the end of book count array
      xLabels.push("Added within 1 day");
      bookCountData.push({name:"Added within 1 day", bookCount: recentCount});
      break;
    default:
      console.log("Data is loading");
  };
  return(
    <div style={{display: 'block', justifyContent:'center', width:'100%'}}>
      <div>
        <h1>Tables!</h1>
      </div>
      <div>
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis  tickFormat={xLabels}/>
        {data.loading? <VictoryAxis dependentAxis label="loading" tickCount={1}/> :
          <VictoryAxis dependentAxis  tickFormat={(y)=> (y*10)/10} tickCount={4}/>}
        <VictoryStack colorScale={"warm"}>
          {data.loading ? null:<VictoryBar data={bookCountData} x="name" y="bookCount"/>}
        </VictoryStack>
      </VictoryChart>
      </div>
    </div>
  );
  }
}
  export default graphql(getAuthorsWithBooksQuery)(DataTable);
