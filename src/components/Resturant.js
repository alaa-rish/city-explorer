
import React from 'react';
import {Card} from 'react-bootstrap/';


class Resturant extends React.Component {

  render() {
  return (
      <div>
                 <Card style={{backgroundColor: 'pink', borderColor: 'black', borderWidth: '1px'}}>
                   <Card.Text>Name: {this.props.name}</Card.Text>
                   <Card.Img src={this.props.image_url} style={{width:'100px'}}/>
                   <Card.Text>Price: {this.props.price}</Card.Text>
                   <Card.Text>Rating: {this.props.rating}</Card.Text>
                   <Card.Text>URL: {this.props.url}</Card.Text>
                 </Card>
       </div>
  );
  }
}

export default Resturant;