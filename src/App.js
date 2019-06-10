import React from 'react';
import axios from 'axios';
import './App.css';
import CityResult from './cityResult';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zipArr: [],
      found: false
    
  }
}

searchCity = (evt) => {
  let userInput = evt.target.value;
  userInput = userInput.toUpperCase();
  // console.log(userInput);

  axios.get('http://ctp-zip-api.herokuapp.com/city/' + userInput)
    .then((res) => {
      // console.log(res))
      this.setState({ zipArr: res.data, found: true });
    })
    .catch((err) => {
      // console.log("Didnt work :( ==>" + err);
      this.setState({ found: false });
    });
}

render() {
  let comp;
  if (this.state.found)
    comp = <CityResult key='something' zipcodes={(this.state.zipArr)} />;
  else
    comp = <h2 className="h2">No results</h2>

    return (
      <div className="App">
        <h1 className='title'>City Search</h1>
        <p className="e-city"> Enter city:</p>
        <input className="input" type="text" onChange={this.searchCity} />

        {/* <CityResult zipcodes={(...this.state.zipArr)}/> */}
        {comp}
      </div>
    );
  }
}


export default App;
