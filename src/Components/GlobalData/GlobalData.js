import React, {useState, useEffect} from "react";
import {values, isEmpty, map, sortBy, prop, reverse, reject} from "ramda";
import NumberFormat from 'react-number-format';
import GlobalMap from "../GlobalMap/GlobalMap";
import "./GlobalData.css";

const GlobalData = () => {
  const [globalData, setGlobalData] = useState([])
  useEffect(() => {
  fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL")
    .then(res => res.json())
    .then(data => values(data.countryitems[0]))
    .then(data => reject(item => !item.title, data))
    .then(data => setGlobalData(reverse(sortBy(prop("total_cases"), data))))
    .catch(err => console.log(err))
}, [])
if(!globalData) {
  return <></>
}
  return (
    <div>
      <GlobalMap />
<div className="stats-table">
  <div className="table-header">
  <h2>Statistics</h2>
  </div>
  <table>
    <tbody>
      <tr className="column-headers">
      <th className="location-header">Location</th>
      <th>Confirmed Cases</th>
      <th>Recovered</th>
      <th>Deaths</th>
    </tr>
    {!isEmpty(globalData) && (
      <React.Fragment>
        {map((item, i) => (
        <tr className="table-data" key={i}>
          <td className="location">{item.code !== 'DP' ? <img src={`https://www.countryflags.io/${item.code}/flat/24.png`} alt="Country Flag"/>
           : <img src="https://www.countryflags.io/GB/flat/24.png" alt="Country Flag"/>}&nbsp;&nbsp;{item.title}</td>
          <td><NumberFormat value={item.total_cases} displayType={'text'} thousandSeparator={true} /></td>
          <td><NumberFormat value={item.total_recovered} displayType={'text'} thousandSeparator={true} /></td>
          <td><NumberFormat value={item.total_deaths} displayType={'text'} thousandSeparator={true} /></td>
        </tr>
        ), globalData)}
      </React.Fragment>
    )}
    </tbody>
    </table>
    </div>
    </div>
) 
}
export default GlobalData;