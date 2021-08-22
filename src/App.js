import React from 'react';
import axios from 'axios';
import {Form, Card} from 'react-bootstrap/';
import Weather from './components/Weather';
import Movie from './components/Movie';
import Resturant from './components/Resturant';


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
      weatherData: [],
      movieData: [],
      resturantData: []
    }
  }

  getLocation = async (event)=>{
    event.preventDefault();
   
    let resultData = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${event.target.cityName.value}&format=json`);
    let weatherData = {data: null};
    let movieData = {data: null};
    let resturantData = {data: null};
    try {

      let cityName = this.getCityName(resultData.data[0].display_name);

      weatherData = await axios.get(`https://alacityexplorerapi.herokuapp.com/weather?lat=${resultData.data[0].lat}&lon=${resultData.data[0].lon}&searchQuery=${cityName}`);
      movieData = await axios.get(`https://alacityexplorerapi.herokuapp.com/movies?searchQuery=${cityName}`);
      resturantData = await axios.get(`https://alacityexplorerapi.herokuapp.com/yelp?searchQuery=${cityName}`);
    } catch(e) {
      weatherData.data = 'error 500';
      movieData.data = 'error 500';
      resturantData.data = 'error 500';
    }

    this.setState({
      resultData: resultData.data[0],
      mapLink: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${resultData.data[0].lat},${resultData.data[0].lon}&zoom=18`,
      weatherData: weatherData.data,
      movieData: movieData.data,
      resturantData: resturantData.data
    });
  }

  getCityName = display_name => {
    let cityName = '';
    let arr = display_name.split(',');
    for(let i = 0; i < arr.length; i++) {
      if (arr[i].charAt(0) === ' ')
        arr[i] = arr[i].substring(1, arr[i].length());
      if ((arr[i].charAt(0) >= 'a' && arr[i].charAt(0) <= 'z') || (arr[i].charAt(0) >= 'A' && arr[i].charAt(0) <= 'Z')) {
        cityName = arr[i];
        break;
      }
    }
    return cityName;
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
       this.state.weatherData !== undefined && this.state.weatherData !== null && typeof this.state.weatherData === 'object' && this.state.weatherData.map((item, i) =>  {
         return (
          <Weather key={i} description={item.description} date={item.date}></Weather>
         );
       })
     }
     <Card hidden={this.state.weatherData === undefined || this.state.weatherData === null || typeof this.state.weatherData === 'object' }>
       <Card.Text>Error: Something went wrong.</Card.Text>
     </Card>
     {
       this.state.movieData !== undefined && this.state.movieData !== null && typeof this.state.movieData === 'object' && this.state.movieData.map((item, i) =>  {
         return (
          <Movie key={i} title={item.title} overview={item.overview} average_votes={item.average_votes} total_votes={item.total_votes} image_url={item.image_url} popularity={item.popularity} released_on={item.released_on}></Movie>
         );
       })
     }
     <Card hidden={this.state.movieData === undefined || this.state.movieData === null || typeof this.state.movieData === 'object' }>
       <Card.Text>Error: No movies found or error occured.</Card.Text>
     </Card>
     {
       this.state.resturantData !== undefined && this.state.resturantData !== null && typeof this.state.resturantData === 'object' && this.state.resturantData.map((item, i) =>  {
        return (
         <Resturant key={i} name={item.name} image_url={item.image_url} price={item.price} rating={item.rating} url={item.url}></Resturant>
        );
      })
     }
     <Card hidden={this.state.resturantData === undefined || this.state.resturantData === null || typeof this.state.resturantData === 'object' }>
       <Card.Text>Error: No resturant found or error occured.</Card.Text>
     </Card>
   </div>
  );
  }
}

export default App;