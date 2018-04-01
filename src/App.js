import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import LineChart from './LineChart.js';
import Chair from './Chair.js';
import axios from 'axios';

const data = [
   { year: "9:30", value: 0 },
   { year: "10:00", value: 4 },
   { year: "10:30", value: 3.5 },
   { year: "11:00", value: 5 },
   { year: "11:30", value: 4.9 },
   { year: "12:00", value: 6 },
   { year: "12:30", value: 7 },
   { year: "13:00", value: 9 },
   { year: "13:30", value: 13 }
 ];

const apiClient = axios.create({
  baseURL: 'http://192.168.137.99:8000',
  timeout: 10000,
  headers: {},
  params: {},
});

class App extends Component {
  constructor() {
     super();
     this.state = {
        data: {"FSR1": 100 ,"FSR2": 100 ,"BSR": 5200}
     }
  }
  componentDidMount() {
    setInterval(() => {
      apiClient.get('/')
        .then((res)=>{
          let {data} = this.state;
          data = res.data;
          console.log(data);
          this.setState({data});
        })
        .catch((err)=>{
            console.error(err);
        }) 
    }, 1000);

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <h1 className="App-title">Smart Chair</h1>
          <Chair data={this.state.data}/>
        </header>
        <p className="App-intro">
          Analyze
        </p>
        <LineChart data={data} height={300} width={400} color="#6699CC"/>
        <LineChart data={data} height={300} width={400} color="#FF8C42"/>
        <LineChart data={data} height={300} width={400} color="#FF3C38"/>
      </div>
    );
  }
}

export default App;
