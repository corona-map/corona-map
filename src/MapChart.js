import React, { memo, useEffect } from 'react';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from 'react-simple-maps';

import { scaleQuantize, scaleLinear } from 'd3-scale';

// const colorScale = scaleQuantize()
//   .domain([1, 1000])
//   .range([
//     "#ffedea",
//     "#ffcec5",
//     "#ffad9f",
//     "#ff8a75",
//     "#ff5533",
//     "#e2492d",
//     "#be3d26",
//     "#9a311f",
//     "#782618"
//   ]);

const colorScale = scaleLinear()
  .domain([1, 1000])
  .range(["#ffedea", "#ff5233"]);

const MapChart = ({ worldData, setTooltipContent, selectedCountry, onCountryClick }) => {
  // const [scale, setScale] = useState(200);
  // const handleWheel = (event) => {
  //   event.preventDefault();
  //   if (event.deltaY > 0) {
  //     setScale(oldScale => oldScale / 1.1)
  //   }
  //   if (event.deltaY < 0) {
  //     setScale(oldScale => oldScale * 1.1)
  //   }
  // };

  const getFillColor = (name, confirmed) => {
    if (name === selectedCountry) {
      return '#00AEF0';
    }

    if (confirmed < 1) {
      return '#D6D6DA';
    }

    return colorScale(confirmed);
  };

  return (
    <>
      <ComposableMap data-tip='' projectionConfig={{ scale: 100 }} >
        <ZoomableGroup>
          <Geographies geography={worldData}>
            {({ geographies }) =>
              (geographies).map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  // onWheel={handleWheel}
                  onClick={onCountryClick(geo.properties.NAME)}
                  onMouseEnter={() => {
                    const { NAME, dailyReport: { confirmed, deaths, recovered } } = geo.properties;
                    const content = <>
                      <h3>{NAME}</h3>
                      <p>Confirmed: {confirmed}</p>
                      <p style={{ color: 'red' }}>Deaths: {deaths}</p>
                      <p style={{ color: 'green' }}>Recovered: {recovered}</p>
                    </>;
                    setTooltipContent(content);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent(null);
                  }}
                  style={{
                    default: {
                      fill: getFillColor(geo.properties.NAME, geo.properties.dailyReport.confirmed),
                      outline: 'none',
                    },
                    hover: {
                      fill: geo.properties.NAME === selectedCountry ? '#00AEF0' : '#F53',
                      outline: 'none'
                    },
                    pressed: {
                      fill: geo.properties.NAME === selectedCountry ? '#00AEF0' : '#E42',
                      outline: 'none'
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
