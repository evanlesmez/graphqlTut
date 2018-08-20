import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getAuthorsWithBooksQuery} from '../queries/queries';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

// Dummies
const data = [
  {name: "Evan", id:1, bookCount: 3, genres: [{genre: "horror", genreCount: 2}, {genre: "biography", "genreCount": 3}]},
  {name: "Paulo Coehlo", id: 2, bookCount: 4},
  {name: "Homer", id: 3, bookCount: 5},
  {name: "Ghibli", id: 4, bookCount: 6}
];

class DataTable extends Component {

render(){
  let names = [];
  data.map(author => {
    return names.push(author.name);
  });
  // let data = this.props.data;
  // console.log(data);
  return(
    <div>
      <h1>Tables!</h1>
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis  tickFormat={names}/>
        <VictoryAxis dependentAxis tickFormat={(y)=> (y/10)*10}/>
        <VictoryStack colorScale={"warm"}>
          <VictoryBar data ={data} x="name" y="bookCount"/>
          <VictoryBar data={data} x="name" y="bookCount"/>
        </VictoryStack>
      </VictoryChart>
    </div>
  );
  }
}
  export default graphql(getAuthorsWithBooksQuery)(DataTable);
