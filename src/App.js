
import React from 'react';
import axios from 'axios';
import {Form, Card} from 'react-bootstrap/';
import Weather from './components/Weather';


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
      mapLink: '',
      weatherData: []
    }
  }

  getLocation = async (event)=>{
    event.preventDefault();
   
    let resultData = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${event.target.cityName.value}&format=json`);
    let weatherData = await axios.get(`http://localhost:3001/weather?lat=${resultData.data[0].lat}&lon=${resultData.data[0].lon}&searchQuery=${resultData.data[0].display_name}`);
    
    this.setState({
      resultData: resultData.data[0],
      mapLink: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${resultData.data[0].lat},${resultData.data[0].lon}&zoom=18`,
      weatherData: weatherData.data
    });
    console.log(this.state.weatherData);
    
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
     <div>
       <Card.Text>display_name: {this.state.resultData.display_name}</Card.Text>
       <Card.Text>latitude: {this.state.resultData.lat}</Card.Text>
       <Card.Text>longitude: {this.state.resultData.lon}</Card.Text>
       <br/>
       <Card.Img src={this.state.mapLink} alt='map img' style={{width: '300px'}}/>
     </div>
     </Card>
     {
       this.state.weatherData.map((item, i) =>  {
         return (
          <Weather key={i} description={item.description} date={item.date}></Weather>
         );
       })
     }
   </div>
  );
  }
}

export default App;