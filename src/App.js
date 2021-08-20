
import React from 'react';
import axios from 'axios';
import {Form, Card} from 'react-bootstrap/';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      resultData: [
        {
          display_name: '',
          lat: '',
          lon:''
        }
      ],
      showData: false,
      mapLink: ''
    }
  }

  getLocation = async (event)=>{
    event.preventDefault();
   
    let resultData = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${event.target.cityName.value}&format=json`);

    await this.setState({
      resultData: resultData.data[0],
      showData: true,
      mapLink: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${resultData.data[0].lat},${resultData.data[0].lon}&zoom=18`
    })
  }

  render() {
  return (
   <div>
     <Form onSubmit={this.getLocation} style={{backgroundColor: 'orange', width:'250px' }}>
       <fieldset>
         <input type="text" placeholder="City" name="cityName"/>
       </fieldset>
       <fieldset>
         <button>Explor!</button>
       </fieldset>
     </Form>
     <br/>
     <Card style={{backgroundColor: 'lightGray'}}>
     <div showData={this.state.showData}>
       <Card.Text>display_name: {this.state.resultData.display_name}</Card.Text>
       <Card.Text>latitude: {this.state.resultData.lat}</Card.Text>
       <Card.Text>longitude: {this.state.resultData.lon}</Card.Text>
       <br/>
       <Card.Img src={this.state.mapLink} alt='map img' style={{width: '300px'}}/>
     </div>
     </Card>
   </div>
  );
  }
}

export default App;