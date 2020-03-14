export const dailyReport = {
  dailyReport: {
    confirmed: 3675,
    recovered: 46,
    deaths: 8,
    lastUpdated: 'Mon, 14 Mar 2020 09:02:35 GMT',
  },
  series: [
    { date: '3/5/20', value: 349 },
    { date: '3/6/20', value: 534 },
    { date: '3/7/20', value: 684 },
    { date: '3/8/20', value: 847 },
    { date: '3/9/20', value: 1112 },
    { date: '3/10/20', value: 1565 },
    { date: '3/11/20', value: 1966 },
    { date: '3/12/20', value: 2745 },
    { date: '3/13/20', value: 3118 },
    { date: '3/14/20', value: 3675 },
  ],
  name: 'Germany',
};

const cities = [
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Nordrhein-Westfalen',
    'Latitude': '51.4332',
    'Longitude': '7.6616',
    'Confirmed': '1041'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Bayern',
    'Latitude': '48.7904',
    'Longitude': '11.4979',
    'Confirmed': '500'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Baden-Württemberg',
    'Latitude': '48.6616',
    'Longitude': '9.3501',
    'Confirmed': '454'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Berlin',
    'Latitude': '52.4938',
    'Longitude': '13.4553',
    'Confirmed': '137'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Niedersachsen',
    'Latitude': '52.6367',
    'Longitude': '9.8451',
    'Confirmed': '129'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Hessen',
    'Latitude': '50.6521',
    'Longitude': '9.1624',
    'Confirmed': '99'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Hamburg',
    'Latitude': '53.5363',
    'Longitude': '9.9945',
    'Confirmed': '88'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Rheinland-Pfalz',
    'Latitude': '50.1183',
    'Longitude': '7.3090',
    'Confirmed': '52'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Sachsen',
    'Latitude': '51.1045',
    'Longitude': '13.2017',
    'Confirmed': '49'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Bremen',
    'Latitude': '53.1334',
    'Longitude': '8.7585',
    'Confirmed': '38'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Schleswig-Holstein',
    'Latitude': '54.2194',
    'Longitude': '9.6961',
    'Confirmed': '31'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Brandenburg',
    'Latitude': '52.1314',
    'Longitude': '13.2162',
    'Confirmed': '30'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Saarland',
    'Latitude': '49.3964',
    'Longitude': '7.0230',
    'Confirmed': '29'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Sachsen-Anhalt',
    'Latitude': '51.9503',
    'Longitude': '11.6923',
    'Confirmed': '27'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Mecklenburg-Vorpommern',
    'Latitude': '53.6127',
    'Longitude': '12.4296',
    'Confirmed': '23'
  },
  {
    'Country/Region': 'Germany',
    'fontSize': '1',
    'Province/State': 'Thüringen',
    'Latitude': '51.0110',
    'Longitude': '7.6616',
    'Confirmed': '18'
  }
];

/*
https://interaktiv.morgenpost.de/corona-virus-karte-infektionen-deutschland-weltweit/?fbclid=IwAR04HlqzakGaNssQzbz4d8o8R3gz0C910U8tvfYlBT6P0lVJJvHfk9uS2rc
*/
const rawData = `Nordrhein-Westfalen	1.433	27	4	
Baden-Württemberg	569	2	3	
Bayern	558	14	1	
Niedersachsen	230	1	0	
Berlin	174	0	0	
Hessen	148	0	0	
Rheinland-Pfalz	102	1	0	
Hamburg	99	0	0	
Sachsen	83	0	0	
Schleswig-Holstein	48	0	0	
Brandenburg	44	0	0	
Bremen	42	1	0	
Sachsen-Anhalt	42	0	0	
Saarland	40	0	0	
Mecklenburg-Vorpommern	33	0	0	
Thüringen	30	0	0`;

const statesReports = rawData.split('\n');
statesReports.forEach(report => {
  const [ name, confirmed ] = report.split('\t');
  const city = cities.find(city => city['Province/State'] === name);
  if (city) {
    city.Confirmed = confirmed.toString();
  }
});

export { cities };
