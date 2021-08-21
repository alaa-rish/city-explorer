
import React from 'react';
import {Card} from 'react-bootstrap/';


class Weather extends React.Component {

  render() {
  return (
      <div>
                 <Card style={{backgroundColor: '#F0F8FF', borderColor: 'black', borderWidth: '1px'}}>
                   <Card.Text>{this.props.description}</Card.Text>
                   <Card.Text>{this.props.date}</Card.Text>
                 </Card>
       </div>
  );
  }
}

export default Weather;