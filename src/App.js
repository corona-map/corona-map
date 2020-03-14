import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { csv, json }from 'd3-fetch';
import { feature } from 'topojson-client';
import './App.scss';

import MapChart from './MapChart';
import Chart from './chart';
import generateData, { DAILY_REPORT_URL, TIME_SERIES_URL, MAP_URL } from './data/helpers';
import WORLD_DATA from './data/world';

function App() {
  const [tooltipContent, setTooltipContent] = useState('');
  const defaultCountry = decodeURIComponent(window.location.hash).slice(1);
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [geographies, setGeographies] = useState();
  const [dailyReports, setDailyReports] = useState([]);
  const [timeSeries, setTimeSeries] = useState([]);
  const [displayData, setDisplayData] = useState({
    dailyReport: {},
    series: [],
    name: '',
  });

  useEffect(() => {
    const fetchMapData = async () => {
      const response = await json(MAP_URL);
      const features = feature(response, response.objects[Object.keys(response.objects)[0]]).features;
      setGeographies(features);
    };
    const fetchDailyReports = async () => {
      const response = await csv(DAILY_REPORT_URL);
      setDailyReports(response);
    };
    const fetchTimeSeries = async () => {
      const response = await csv(TIME_SERIES_URL);
      setTimeSeries(response);
    };

    fetchMapData();
    fetchDailyReports();
    fetchTimeSeries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setDisplayData(WORLD_DATA);
      return;
    }
    if (dailyReports.length && timeSeries.length) {
      setDisplayData(generateData(selectedCountry, dailyReports, timeSeries));
    }
  }, [dailyReports, timeSeries, selectedCountry]);

  useEffect(() => {
    window.location.hash = encodeURIComponent(selectedCountry);
  }, [selectedCountry]);

  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value);
  };
  
  const { dailyReport = {}, series = [], name } = displayData;

  return (
    <div className='App'>
      <select className='Selections' value={selectedCountry} onChange={handleCountrySelect}>
        <option value=''>The World</option>
        {(geographies || []).map(geography => geography.properties.NAME).sort().map(countryName =>
          <option key={countryName} value={countryName}>{countryName}</option>
        )}
      </select>
      <p>Last updated: {dailyReport.lastUpdated ? (new Date(dailyReport.lastUpdated)).toLocaleString() : 'Unknown'}</p>
      <h3 className='Title'>CORONAVIRUS OUTBREAK LIVE STATS</h3>
      <section className='Content'>
        <MapChart
          features={geographies}
          dailyReports={dailyReports}
          setTooltipContent={setTooltipContent}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <ReactTooltip>{tooltipContent}</ReactTooltip>
      </section>
      <section className='Info'>
        {series.length > 0 &&
          <div className='Left'>
            <Chart series={series} />
          </div>
        }
        <div className='Center'>
          <h1>{dailyReport.confirmed}</h1>
          <p>Confirmed cases in {name}</p>
        </div>
        <div className='Right'>
          <div>
            <h2>{dailyReport.recovered}</h2>
            <h2>{dailyReport.deaths}</h2>
          </div>
          <div>
            <p>
              <span>Recovered</span>
              <span>{((dailyReport.recovered / dailyReport.confirmed) * 100).toFixed(2)}%</span>
            </p>
            <p>
              <span>Deaths</span>
              <span>{((dailyReport.deaths / dailyReport.confirmed) * 100).toFixed(2)}%</span>
            </p>
          </div>
        </div>
      </section>
      <section className='Footer'>
        <p>From Munich with ❤︎</p>
        <span>Data sources: </span>
        <a href='https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports' rel='noopener noreferrer' target='_blank'>WHO</a>
        {', '}
        <a href='https://github.com/CSSEGISandData/COVID-19' rel='noopener noreferrer' target='_blank'>CSSEGISandData</a>
        {', '}
        <a href='https://www.arcgis.com/' rel='noopener noreferrer' target='_blank'>arcgis.com/</a>
        {', '}
        <a href='https://www.morgenpost.de/' rel='noopener noreferrer' target='_blank'>Berliner Morgenpost/</a>
        <p>This project is open-sourced here: <a href='https://github.com/corona-map/corona-map.github.io' rel='noopener noreferrer' target='_blank'>Github</a></p>
      </section>
    </div>
  );
}

export default App;
 // csv(`${process.env.PUBLIC_URL}/03-12-2020.csv`).then(res => console.log(res));
