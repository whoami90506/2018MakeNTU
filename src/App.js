import React, { Component } from 'react';
// import logo from './logo.svg';
import chair from './chair.png'
import './App.css';
import LineChart from './LineChart.js'
const data = [
   { year: "1991", value: 3 },
   { year: "1992", value: 4 },
   { year: "1993", value: 3.5 },
   { year: "1994", value: 5 },
   { year: "1995", value: 4.9 },
   { year: "1996", value: 6 },
   { year: "1997", value: 7 },
   { year: "1998", value: 9 },
   { year: "1999", value: 13 }
 ];
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Smart Chair</h1>
          <img src={chair} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <LineChart data={data} width='500'/>
        <LineChart data={data} width='500'/>
        <LineChart data={data} width='500'/>
      </div>
    );
  }
}

export default App;
