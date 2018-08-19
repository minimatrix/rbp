import React, { Component, Fragment} from 'react';
import {InputField, DatePicker} from './components/elements';


class App extends Component {
  render() {
    return (
      <div className="App"style={{margin:"30px"}}>
      <h2>Component ShowCase</h2>
        <Fragment style={{margin:"30px"}}>
         
          <DatePicker 
            label="Select Date: "
            format="DD/MM/YYYY H:m"  
            type="datetime"  
            value="03/02/1989 14:30" 
            onSelect={(date) => {console.log("OUT", date)}}
          />
          <DatePicker 
            label="Select Date: "
            outFormat="yyyy-mm-dd"  
            type="date"   
          />
        </Fragment>
      </div>
    );
  }
}

export default App;
