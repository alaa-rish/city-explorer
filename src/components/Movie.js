
import React from 'react';
import {Card} from 'react-bootstrap/';


class Movie extends React.Component {

  render() {
  return (
      <div>
                 <Card style={{backgroundColor: 'orange', borderColor: 'black', borderWidth: '1px'}}>
                   <Card.Text>Title: {this.props.title}</Card.Text>
                   <Card.Text>Overview: {this.props.overview}</Card.Text>
                   <Card.Text>Average Votes: {this.props.average_votes}</Card.Text>
                   <Card.Text>Total Votes: {this.props.total_votes}</Card.Text>
                   <Card.Img src={this.props.image_url} style={{width:'100px'}}/>
                   <Card.Text>Popularity: {this.props.popularity}</Card.Text>
                   <Card.Text>Released on: {this.props.released_on}</Card.Text>
                 </Card>
       </div>
  );
  }
}

export default Movie;