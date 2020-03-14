/*
There are 3 things need to be updated:
 - Date in helpers.js for dailyReports.
 - Here: number (confirmed, deaths, recovered), lastUpdated + series
 - germany.js: Same as above + rawData for cities
*/

export default {
  dailyReport: {
    confirmed: 145369,
    deaths: 5429,
    recovered: 71688,
    lastUpdated: 'Mon, 14 Mar 2020 09:02:35 GMT',
  },
  series: [
    { date: '3/6/20', value: 101648 },
    { date: '3/7/20', value: 105706 },
    { date: '3/8/20', value: 109602 },
    { date: '3/9/20', value: 113497 },
    { date: '3/10/20', value: 118700 },
    { date: '3/11/20', value: 125923 },
    { date: '3/12/20', value: 129010 },
    { date: '3/13/20', value: 135310 },
    { date: '3/14/20', value: 145369 },
  ],
  name: 'The World',
};
