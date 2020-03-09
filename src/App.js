import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import './App.scss';

import MapChart from './MapChart';
import Chart from './chart';
import worldData from './data/world';

function App() {
  const [content, setContent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Germany');

  const onCountryClick = (name) => (event) => {
    setSelectedCountry(name);
  };

  let countryStats = worldData.objects.ne_110m_admin_0_countries.geometries.find(country => country.properties.NAME === 'Germany');
  
  if (selectedCountry) {
    countryStats = worldData.objects.ne_110m_admin_0_countries.geometries.find(country => country.properties.NAME === selectedCountry);
  } else {
    // Show world stats
  }

  const { properties } = countryStats;
  const { dailyReport, series, NAME: name } = properties;

  return (
    <div className='App'>
      <p>Last updated: {dailyReport.lastUpdated ? (new Date(dailyReport.lastUpdated)).toLocaleString() : 'Unknown'}</p>
      <h3 className='Title'>Coronavirus outbreak live stats in {name || 'The World'}</h3>
      <div className='Info'>
        <div className='Left'>
          <Chart series={series} />
        </div>
        <div className='Center'>
          <h1>{dailyReport.confirmed}</h1>
          <p>Confirmed cases in {name || 'The World'}</p>
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
      </div>
      <section className='Content'>
        <MapChart
          worldData={worldData}
          setTooltipContent={setContent}
          selectedCountry={selectedCountry}
          onCountryClick={onCountryClick}
        />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </div>
  );
}

export default App;
