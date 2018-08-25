import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getAuthorsWithBooksQuery} from '../queries/queries';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack,
 VictoryLegend } from 'victory';

// Dummies
// const stub = [
//   {name: "Evan", id:1, bookCount: 3, genres: [{genre: "horror", genreCount: 2}, {genre: "biography", "genreCount": 3}]},
//   {name: "Paulo Coehlo", id: 2, bookCount: 0},
//   {name: "Homer", id: 3, bookCount: 5},
//   {name: "Ghibli", id: 4, bookCount: 6}
// ];

const styles = {
  axis: {
    axis: {stroke: "#756f6a"},
    axisLabel: {fontSize: 15, padding: 30},
    tickLabels: {fontSize: 7},
  }
};


// Current fix because data.loading returning false on re-render even though
// authors are returning undefined on update. If I have time try to fix this
let xLabels = [];
let bookCountData = [];
let recentCount = 0;
let authorRecentData = [];
let oldCount = 0;

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
        let authorRecentBookCount = 0;

        author.books.forEach(book => {
          if (this.checkRecentlyCreated(book.dateCreated)){
            recentCount += 1;
            authorRecentBookCount += 1;
          } else {
            oldCount += 1;
          }
        });
        authorRecentData.push({name: author.name, bookCount: authorRecentBookCount})
        xLabels.push(author.name);
        let authorObject = {name:author.name, id: author.id, bookCount: author.books.length - authorRecentBookCount};
        return bookCountData.push(authorObject);
      });

      // Add the recent count to the end of book count array
      xLabels.push("Total");
      bookCountData.push({name:"Total", bookCount: oldCount})
      authorRecentData.push({name:"Total", bookCount: recentCount});
      break;
    default:
      console.log("Data is loading");
  };
  return(
    <div style={{display: 'block', justifyContent:'center', width:'100%'}}>
      <h1 style={{marginBottom:0}}>Book Count Table!</h1>
      <div>

      <VictoryChart domainPadding={20} theme={VictoryTheme.material} height= {200} width={400}>
        <VictoryLegend x={125} y={10}
        	title="Legend"
          centerTitle
          orientation="horizontal"
          style={{ border: { stroke: "black" }, title: { fontSize: 9 }}}
          data={[
            { name: "Old", symbol: { fill: '#e75480' }, labels:{fontSize: 9}},
            { name: "Recently Added (1 day)", symbol: { fill: "gold" }, labels:{fontSize: 9}}
          ]}
        />
        <VictoryAxis  tickFormat={xLabels} style={styles.axis}/>
        {data.loading? <VictoryAxis dependentAxis label="loading" tickCount={1}/> :
          <VictoryAxis dependentAxis  tickFormat={(y)=> (y*10)/10} tickCount={4}
          label="Books"
          style={styles.axis}/>}
        <VictoryStack colorScale={['#e75480', 'gold']}>
          {data.loading ? null:<VictoryBar data={bookCountData} x="name" y="bookCount"/>}
          {data.loading ? null:<VictoryBar data={authorRecentData} x="name" y="bookCount"/>}
        </VictoryStack>
      </VictoryChart>
      </div>
    </div>
  );
  }
}
  export default graphql(getAuthorsWithBooksQuery)(DataTable);
