import { dailyReport as GermanyReport, cities as GermanySeries } from './germany';

const TODAY = '03-13-2020';
export const DAILY_REPORT_URL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${TODAY}.csv`;
export const TIME_SERIES_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';
export const MAP_URL = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json';

const manualCollectList = {
  Germany: GermanyReport,
};

export const COUNTRY_EXCEPTIONS = ['Germany'];
export const EXTRA_MARKERS = [
  ...GermanySeries,
];

const sumReport = (arr) => {
  let confirmed = 0;
  let deaths = 0;
  let recovered = 0;
  const lastUpdated = arr[0] ? arr[0]['Last Update'] : '';

  for (let i = 0; i < arr.length; i += 1) {
    confirmed += +arr[i].Confirmed;
    deaths += +arr[i].Deaths;
    recovered += +arr[i].Recovered;
  }
  return { confirmed, deaths, recovered, lastUpdated };
};

const sumSeries = (arr) => {
  const sum = [];
  if (!arr.length) {
    return [];
  }

  const keys = Object.keys(arr[0]).filter(k => !'Province/StateCountry/RegionLatLong'.includes(k));
  for (let i = 0; i < keys.length; i += 1) {
    let count = 0;
    for (let j = 0; j < arr.length; j += 1) {
      count += +arr[j][keys[i]];
    }
    const item = { date: keys[i], value: count };
    sum.push(item);
  }

  return sum;
};

// TODO: Add more aliases, remove chart for country without cases, add World navigation
const COUNTRY_ALIAS = {
  US: 'United States of America',
  UK: 'United Kingdom',
  'Mainland China': 'China',
  "Cote d'Ivoire": "Côte d'Ivoire"
};

export const getCountryAlias = (region) => COUNTRY_ALIAS[region] || region;

export const ZOOM_EXCEPTIONS = {
  Russia: 2,
  France: 8,
  'United States of America': 4,
  Netherlands: 30,
};

export default (countryName, dailyReports, timeSeries) => {
  if (manualCollectList[countryName]) {
    return manualCollectList[countryName];
  }
  const countryReportsData = dailyReports.filter(item => getCountryAlias(item['Country/Region']) === countryName);
  const countrySeriesData = timeSeries.filter(item => getCountryAlias(item['Country/Region']) === countryName);
  return { name: countryName, dailyReport: sumReport(countryReportsData), series: sumSeries(countrySeriesData) };
};
// Datasource: https://github.com/CSSEGISandData/COVID-19
