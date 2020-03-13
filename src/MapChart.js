import React, { memo, useState, useEffect } from 'react';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

import { scaleLinear, scaleQuantile } from 'd3-scale';
import { geoPath, geoCentroid, geoEqualEarth } from 'd3-geo';

import { getCountryAlias, ZOOM_EXCEPTIONS } from './data/world';

const BLUE_COLOR = '#413ea0';
const colorScale = scaleLinear()
  .domain([1, 200000])
  .range(['#ccc', '#bbb']);

const radiusScale = scaleQuantile()
  .domain([1, 10, 50, 100, 1000, 5000, 10000, 50000, 100000])
  .range([1, 1.5, 1.7, 1.8, 2, 2.2, 2.5, 3, 5]);

const getFillColor = (name, selectedCountry, confirmed) => {
  if (name === selectedCountry) {
    return BLUE_COLOR;
  }

  if (confirmed < 1) {
    return '#D6D6DA';
  }

  return colorScale(confirmed);
};

const MapChart = (props) => {
  const { features = [], markers, setTooltipContent, selectedCountry, setSelectedCountry } = props;
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 0]);
  const [lastClick, setLastClick] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom(oldScale => oldScale * 1.1);
  const handleZoomOut = () => setZoom(oldScale => oldScale / 1.1);

  const onGeographyClick = (name) => (event) => {
    if (Math.abs(event.pageX - lastClick.x) + Math.abs(event.pageY - lastClick.y) > 10) {
      return;
    }

    setSelectedCountry(name);
  };

  const onMarkerClick = (name) => {
    setSelectedCountry(name);
  };

  useEffect(() => {
    // Add ZOOM_EXCEPTIONS: Russia, France
    const selectedGeography = features.find(feature => feature.properties.NAME === selectedCountry);
    if (!selectedGeography) {
      setCenter([0, 0]);
      setZoom(1);
      return;
    }

    if (ZOOM_EXCEPTIONS[selectedCountry]) {
      setZoom(ZOOM_EXCEPTIONS[selectedCountry]);
    } else {
      const path = geoPath().projection(geoEqualEarth());
      const bounds = path.bounds(selectedGeography);
      const dx = bounds[1][0] - bounds[0][0];
      const dy = bounds[1][1] - bounds[0][1];
      const z = 0.8 / Math.max(dx / 800, dy / 600); // width and height
      setZoom(z);
    }
    setCenter(geoCentroid(selectedGeography));
  }, [features, selectedCountry]);

  return (
    <div className='Maps'>
      <div className='Navigation'>
        <button onClick={() => setSelectedCountry('')}>Global</button>
        <span>{selectedCountry ? `/ ${selectedCountry}` : ''}</span>
      </div>
      <div className='ButtonsWrapper'>
        <button onClick={handleZoomIn}>{ 'Zoom in' }</button>
        <button onClick={handleZoomOut}>{ 'Zoom out' }</button>
      </div>
      <ComposableMap data-tip='' width={800} height={600} projectionConfig={{ scale: 200 }} >
        <ZoomableGroup
          zoom={zoom}
          center={center}
        >
          {features.length &&
            <Geographies geography={features}>
              {({ geographies }) =>
                (geographies).map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseDown={(event) => setLastClick({ x: event.pageX, y: event.pageY })}
                    onMouseUp={onGeographyClick(geo.properties.NAME)}
                    onMouseEnter={() => {
                      setTooltipContent(geo.properties.NAME);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    style={{
                      default: {
                        fill: getFillColor(geo.properties.NAME, selectedCountry, 1),
                        outline: 'none',
                      },
                      hover: {
                        fill: geo.properties.NAME === selectedCountry ? BLUE_COLOR : '#eee',
                        outline: 'none'
                      },
                      pressed: {
                        fill: geo.properties.NAME === selectedCountry ? BLUE_COLOR : '#ddd',
                        outline: 'none'
                      }
                    }}
                  />
                ))
              }
            </Geographies>
          }
          {markers.map((marker, idx) => (
            <Marker key={`marker-${idx + 1}`} coordinates={[marker.Longitude, marker.Latitude]}>
              <circle
                r={selectedCountry ? radiusScale(marker.Confirmed) / 2 : radiusScale(marker.Confirmed)}
                fill="#00AEF0"
                stroke="#fff"
                strokeWidth={0.2}
                onClick={() => onMarkerClick(getCountryAlias(marker['Country/Region']))} // Alias
                onMouseEnter={() => {
                  setTooltipContent(`${marker.Confirmed} – confirmed cases`);
                }}
                onMouseLeave={() => {
                  setTooltipContent('');
                }}
              />
              {getCountryAlias(marker['Country/Region']) === selectedCountry &&
                <text
                  textAnchor="middle"
                  y={radiusScale(marker.Confirmed) + 4}
                  fontSize={2}
                  style={{ fontFamily: "system-ui", fill: "#fff" }}
                >
                  {marker['Province/State']}
                </text>
              }
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
