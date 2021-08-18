
import React from 'react';
import axios from 'axios';

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
     <form onSubmit={this.getLocation}>
       <fieldset>
         <input type="text" placeholder="City" name="cityName"/>
       </fieldset>
       <fieldset>
         <button>Explor!</button>
       </fieldset>
     </form>
     <br/>
     <div showData={this.state.showData}>
       <p>display_name: {this.state.resultData.display_name}</p>
       <p>latitude: {this.state.resultData.lat}</p>
       <p>longitude: {this.state.resultData.lon}</p>
       <br/>
       <img src={this.state.mapLink} alt='map img' style={{width: '300px'}}/>
     </div>
   </div>
  );
  }
}

export default App;
