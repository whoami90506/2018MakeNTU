import React from 'react';
import {Chart, Axis, Tooltip, Geom} from "bizcharts";


const cols = {
   'value': { min: 0 },
   'year': {range: [ 0 , 1] }
};

const LineChart = ({data, height, width, color}) => (
   <Chart style={{display:'inline-block'}} height={height} width={width} data={data} scale={cols}>
      <Axis name="year" />
      <Axis name="value" />
      <Tooltip crosshairs={{type : "y"}}/>
      <Geom type="line" position="year*value" size={3} shape="smooth" color={color} />
      <Geom type='point' position="year*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} color={color} />
   </Chart>
)
export default LineChart;