
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
      showData: false
    }
  }

  getLocation = async (event)=>{
    event.preventDefault();
   
    let resultData = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.f06c34f17ca6b04d7f4dae5995fa4ca1&q=${event.target.cityName.value}&format=json`);

    await this.setState({
      resultData: resultData.data[0],
      showData: true,
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
     </div>
   </div>
  );
  }
}

export default App;
