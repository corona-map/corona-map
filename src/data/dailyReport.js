import { csvParse } from 'd3-dsv';

const DATA = `Province/State,Country/Region,Last Update,Confirmed,Deaths,Recovered,Latitude,Longitude
Hubei,Mainland China,2020-03-08T14:43:03,67707,2986,45235,30.9756,112.2707
,Italy,2020-03-08T18:03:04,7375,366,622,43.0000,12.0000
,South Korea,2020-03-08T12:53:03,7314,50,118,36.0000,128.0000
,Iran,2020-03-08T11:03:30,6566,194,2134,32.0000,53.0000
Guangdong,Mainland China,2020-03-08T14:43:03,1352,7,1256,23.3417,113.4244
Henan,Mainland China,2020-03-08T05:03:02,1272,22,1247,33.8820,113.6140
Zhejiang,Mainland China,2020-03-08T09:03:04,1215,1,1161,29.1832,120.0934
,France,2020-03-08T18:03:04,1126,19,12,47.0000,2.0000
,Germany,2020-03-08T21:03:03,1040,0,18,51.0000,9.0000
Hunan,Mainland China,2020-03-08T12:53:03,1018,4,968,27.6104,111.7088
Anhui,Mainland China,2020-03-08T05:13:06,990,6,984,31.8257,117.2264
Jiangxi,Mainland China,2020-03-08T06:53:04,935,1,919,27.6140,115.7221
Shandong,Mainland China,2020-03-08T10:03:11,758,6,642,36.3427,118.1498
Diamond Princess cruise ship,Others,2020-03-06T01:29:39,696,6,40,35.4437,139.6380
,Spain,2020-03-08T20:33:02,673,17,30,40.0000,-4.0000
Jiangsu,Mainland China,2020-03-08T09:23:05,631,0,612,32.9711,119.4550
Chongqing,Mainland China,2020-03-08T23:23:03,576,6,527,30.0572,107.8740
Sichuan,Mainland China,2020-03-08T12:53:03,539,3,464,30.6171,102.7103
,Japan,2020-03-08T14:53:11,502,6,76,36.0000,138.0000
Heilongjiang,Mainland China,2020-03-08T14:43:03,481,13,412,47.8620,127.7615
Beijing,Mainland China,2020-03-08T01:23:07,428,8,308,40.1824,116.4142
Shanghai,Mainland China,2020-03-08T04:33:02,342,3,314,31.2020,121.4491
,Switzerland,2020-03-08T17:23:07,337,2,3,46.8182,8.2275
Hebei,Mainland China,2020-03-07T13:03:05,318,6,307,38.0428,114.5149
Fujian,Mainland China,2020-03-07T13:03:05,296,1,295,26.0789,117.9874
,UK,2020-03-08T22:03:10,273,3,18,55.0000,-3.0000
,Netherlands,2020-03-08T13:43:02,265,3,0,52.1326,5.2913
Guangxi,Mainland China,2020-03-08T00:23:02,252,2,223,23.8298,108.7881
Shaanxi,Mainland China,2020-03-08T14:43:03,245,1,227,35.1917,108.8701
,Sweden,2020-03-08T14:03:12,203,0,0,63.0000,16.0000
,Belgium,2020-03-08T17:23:07,200,0,1,50.8333,4.0000
,Norway,2020-03-08T21:03:03,176,0,0,60.4720,8.4689
Yunnan,Mainland China,2020-03-06T03:23:06,174,2,170,24.9740,101.4870
Hainan,Mainland China,2020-03-08T04:33:02,168,6,159,19.1959,109.7453
,Singapore,2020-03-08T13:33:13,150,0,78,1.2833,103.8333
Guizhou,Mainland China,2020-03-08T01:13:11,146,2,117,26.8154,106.8748
Tianjin,Mainland China,2020-03-05T03:33:27,136,3,128,39.3054,117.3230
Shanxi,Mainland China,2020-03-05T14:53:03,133,0,126,37.5777,112.2922
Liaoning,Mainland China,2020-03-08T05:13:06,125,1,109,41.2956,122.6085
Gansu,Mainland China,2020-03-08T14:33:06,124,2,87,36.0611,103.8343
Hong Kong,Hong Kong,2020-03-08T14:43:03,114,3,58,22.3000,114.2000
,Austria,2020-03-08T09:13:14,104,0,0,47.5162,14.5501
,Malaysia,2020-03-08T14:43:03,99,0,24,2.5000,112.5000
Jilin,Mainland China,2020-03-06T10:23:03,93,1,90,43.6661,126.1923
,Bahrain,2020-03-07T18:13:26,85,0,4,26.0275,50.5500
"King County, WA",US,2020-03-08T20:23:09,83,17,1,47.5480,-121.9836
"Westchester County, NY",US,2020-03-08T18:03:07,83,0,0,41.1220,-73.7949
Xinjiang,Mainland China,2020-03-08T05:33:02,76,3,73,41.1129,85.2401
Inner Mongolia,Mainland China,2020-03-08T05:13:06,75,1,70,44.0935,113.9448
Ningxia,Mainland China,2020-03-06T12:53:03,75,0,71,37.2692,106.1655
,Greece,2020-03-08T17:23:07,73,0,0,39.0742,21.8243
,Kuwait,2020-03-08T15:33:04,64,0,1,29.5000,47.7500
,Iraq,2020-03-08T21:03:03,60,6,0,33.0000,44.0000
,Iceland,2020-03-07T18:13:27,50,0,0,64.9631,-19.0208
,Thailand,2020-03-07T10:13:23,50,1,31,15.0000,101.0000
,Egypt,2020-03-08T19:03:11,49,1,1,26.0000,30.0000
Taiwan,Taiwan,2020-03-08T03:13:13,45,1,13,23.7000,121.0000
Unassigned Location (From Diamond Princess),US,2020-03-02T19:53:03,45,0,0,35.4437,139.6380
,United Arab Emirates,2020-03-07T10:13:22,45,0,7,24.0000,54.0000
,India,2020-03-08T09:23:05,39,0,3,21.0000,78.0000
,Israel,2020-03-08T21:03:03,39,0,2,31.0000,35.0000
New South Wales,Australia,2020-03-08T05:13:07,38,3,4,-33.8688,151.2093
"Santa Clara County, CA",US,2020-03-08T21:23:03,38,0,1,37.3541,-121.9552
,San Marino,2020-03-08T14:23:10,36,1,0,43.9424,12.4578
,Denmark,2020-03-08T14:53:11,35,0,1,56.2639,9.5018
,Lebanon,2020-03-08T18:13:19,32,0,1,33.8547,35.8623
,Czech Republic,2020-03-08T19:53:03,31,0,0,49.8175,15.4730
"Snohomish County, WA",US,2020-03-08T21:43:03,31,1,0,48.0330,-121.8339
,Portugal,2020-03-08T19:53:03,30,0,0,39.3999,-8.2245
,Vietnam,2020-03-08T19:53:03,30,0,16,16.0000,108.0000
"Toronto, ON",Canada,2020-03-08T21:33:02,28,0,3,43.6532,-79.3832
British Columbia,Canada,2020-03-08T05:13:07,27,0,4,49.2827,-123.1207
,Finland,2020-03-08T10:03:13,23,0,1,64.0000,26.0000
,Palestine,2020-03-07T02:23:06,22,0,0,31.9522,35.2332
,Republic of Ireland,2020-03-08T21:03:03,21,0,0,53.1424,-7.6921
Grand Princess Cruise Ship,US,2020-03-07T01:33:02,21,0,0,37.6489,-122.6655
,Brazil,2020-03-08T17:23:07,20,0,0,-14.2350,-51.9253
,Algeria,2020-03-08T05:23:03,19,0,0,28.0339,1.6596
,Ireland,2020-03-08T21:03:03,19,0,0,53.4167,-8.0000
Qinghai,Mainland China,2020-02-21T04:43:02,18,0,18,35.7452,95.9956
,Russia,2020-03-08T21:03:03,17,0,3,60.0000,90.0000
,Oman,2020-03-05T17:53:02,16,0,2,21.0000,57.0000
,Slovenia,2020-03-08T17:03:16,16,0,0,46.1512,14.9955
Queensland,Australia,2020-03-08T05:43:04,15,0,8,-28.0167,153.4000
,Qatar,2020-03-08T17:03:16,15,0,0,25.3548,51.1839
,Romania,2020-03-08T17:23:07,15,0,3,46.0000,25.0000
,Ecuador,2020-03-08T05:23:03,14,0,0,-1.8312,-78.1834
"Los Angeles, CA",US,2020-03-08T01:13:48,14,0,0,34.0522,-118.2437
,Georgia,2020-03-08T05:23:03,13,0,0,42.3154,43.3569
,Argentina,2020-03-08T22:03:11,12,1,0,-38.4161,-63.6167
,Croatia,2020-03-07T10:13:23,12,0,0,45.1667,15.5000
"Contra Costa County, CA",US,2020-03-08T21:43:03,12,0,0,37.8534,-121.9018
"New York County, NY",US,2020-03-08T04:13:22,12,0,0,40.7128,-74.0060
Victoria,Australia,2020-03-07T02:03:30,11,0,7,-37.8136,144.9631
,Poland,2020-03-08T21:13:10,11,0,0,51.9194,19.1451
,Saudi Arabia,2020-03-08T10:13:19,11,0,0,24.0000,45.0000
,Estonia,2020-03-06T13:03:13,10,0,0,58.5953,25.0136
Macau,Macau,2020-03-06T10:23:03,10,0,10,22.1667,113.5500
,Philippines,2020-03-08T17:13:06,10,1,1,13.0000,122.0000
,Azerbaijan,2020-03-07T02:13:09,9,0,0,40.1431,47.5769
"San Francisco County, CA",US,2020-03-08T01:23:12,9,0,0,37.7749,-122.4194
,Chile,2020-03-08T15:43:03,8,0,0,-35.6751,-71.5430
"Suffolk County, MA",US,2020-03-08T21:13:14,8,0,1,42.3601,-71.0589
"Washington County, OR",US,2020-03-08T19:43:03,8,0,0,45.5470,-123.1386
South Australia,Australia,2020-03-06T04:23:08,7,0,2,-34.9285,138.6007
,Hungary,2020-03-08T15:03:02,7,0,0,47.1625,19.5033
,Mexico,2020-03-08T05:13:06,7,0,1,23.0000,-102.0000
"Cook County, IL",US,2020-03-08T20:23:09,7,0,2,41.7377,-87.6976
"Middlesex County, MA",US,2020-03-08T21:13:12,7,0,0,42.4672,-71.2874
,Belarus,2020-03-04T12:43:03,6,0,0,53.7098,27.9534
,Indonesia,2020-03-08T10:03:13,6,0,0,-0.7893,113.9213
,Pakistan,2020-03-08T04:53:02,6,0,1,30.3753,69.3451
,Peru,2020-03-08T05:23:03,6,0,0,-9.1900,-75.0152
"Fort Bend County, TX",US,2020-03-08T17:33:03,6,0,0,29.5693,-95.8143
"Norfolk County, MA",US,2020-03-08T21:13:14,6,0,0,42.1767,-71.1449
,Costa Rica,2020-03-08T05:13:07,5,0,0,9.7489,-83.7534
,Dominican Republic,2020-03-08T17:23:08,5,0,0,18.7357,-70.1627
,French Guiana,2020-03-07T03:23:05,5,0,0,3.9339,-53.1258
,New Zealand,2020-03-07T02:03:29,5,0,0,-40.9006,174.8860
"Harris County, TX",US,2020-03-07T05:13:03,5,0,0,29.7752,-95.3103
"Nassau County, NY",US,2020-03-08T16:03:05,5,0,0,40.6546,-73.5594
"Placer County, CA",US,2020-03-06T23:13:07,5,1,0,39.0916,-120.8039
"Unassigned Location, WA",US,2020-03-06T00:33:03,5,0,0,47.7511,-120.7401
,Afghanistan,2020-03-08T04:53:03,4,0,0,33.0000,65.0000
,Bulgaria,2020-03-08T11:13:17,4,0,0,42.7339,25.4858
" Montreal, QC",Canada,2020-03-08T16:03:05,4,0,0,45.5017,-73.5673
,Maldives,2020-03-08T21:13:10,4,0,0,3.2028,73.2207
,Senegal,2020-03-08T20:23:08,4,0,1,14.4974,-14.4524
"Bergen County, NJ",US,2020-03-08T21:23:03,4,0,0,40.9263,-74.0770
"Grafton County, NH",US,2020-03-08T17:53:03,4,0,0,43.9088,-71.8260
"Montgomery County, MD",US,2020-03-08T21:53:04,4,0,0,39.1547,-77.2405
"Montgomery County, PA",US,2020-03-08T21:43:03,4,0,0,40.2290,-75.3879
"Pierce County, WA",US,2020-03-08T21:43:03,4,0,0,47.0676,-122.1295
Western Australia,Australia,2020-03-05T17:13:35,3,1,0,-31.9505,115.8605
,Bangladesh,2020-03-08T10:53:02,3,0,0,23.6850,90.3563
,Bosnia and Herzegovina,2020-03-07T02:13:09,3,0,0,43.9159,17.6791
"Edmonton, Alberta",Canada,2020-03-08T16:23:07,3,0,0,53.5461,-113.4938
,Luxembourg,2020-03-08T05:13:06,3,0,0,49.8144,6.1317
,Malta,2020-03-08T09:13:16,3,0,0,35.9375,14.3754
,North Macedonia,2020-03-06T20:23:11,3,0,0,41.6086,21.7453
,Saint Barthelemy,2020-03-04T02:43:03,3,0,0,17.9000,-62.8333
,Slovakia,2020-03-08T09:13:15,3,0,0,48.6690,19.6990
,South Africa,2020-03-08T10:23:04,3,0,0,-30.5595,22.9375
"Douglas County, CO",US,2020-03-07T01:53:03,3,0,0,39.2587,-104.9389
"Fulton County, GA",US,2020-03-07T16:53:03,3,0,0,33.8034,-84.3963
"Maricopa County, AZ",US,2020-03-07T19:53:02,3,0,1,33.2918,-112.4291
"Orange County, CA",US,2020-03-04T02:13:11,3,0,0,33.7879,-117.8531
"Providence County, RI",US,2020-03-07T02:23:08,3,0,0,41.8882,-71.4774
"San Diego County, CA",US,2020-03-05T20:33:03,3,0,1,32.7157,-117.1611
Tasmania,Australia,2020-03-08T05:43:04,2,0,0,-41.4545,145.9707
,Cambodia,2020-03-08T04:53:03,2,0,1,11.5500,104.9167
,Cameroon,2020-03-08T05:23:03,2,0,0,3.8480,11.5021
,Faroe Islands,2020-03-08T05:13:07,2,0,0,61.8926,-6.9118
,Latvia,2020-03-08T10:33:03,2,0,0,56.8796,24.6032
,Martinique,2020-03-07T03:23:05,2,0,0,14.6415,-61.0242
,Morocco,2020-03-05T13:53:03,2,0,0,31.7917,-7.0926
,Tunisia,2020-03-08T21:13:10,2,0,0,33.8869,9.5375
"Alameda County, CA",US,2020-03-07T13:13:14,2,0,0,37.6017,-121.7195
"Broward County, FL",US,2020-03-07T04:43:02,2,0,0,26.1901,-80.3659
"Clark County, NV",US,2020-03-08T21:43:03,2,0,0,36.0796,-115.0940
"Denver County, CO",US,2020-03-06T23:33:02,2,0,0,39.7392,-104.9903
"Fairfax County, VA",US,2020-03-08T21:33:02,2,0,0,38.9085,-77.2405
"Hillsborough, FL",US,2020-03-03T18:33:02,2,0,0,27.9904,-82.3018
"Jackson County, OR ",US,2020-03-08T00:13:16,2,0,0,42.3345,-122.7647
"Lee County, FL",US,2020-03-08T15:33:04,2,1,0,26.6630,-81.9535
"Pinal County, AZ",US,2020-03-07T17:13:23,2,0,0,32.8162,-111.2845
"Rockingham County, NH",US,2020-03-08T17:53:03,2,0,0,42.9931,-71.0498
"Rockland County, NY",US,2020-03-07T16:43:02,2,0,0,41.1489,-73.9830
"Sacramento County, CA",US,2020-02-27T20:33:02,2,0,0,38.4747,-121.3542
"San Benito, CA",US,2020-02-03T03:53:02,2,0,0,36.5761,-120.9876
"San Mateo, CA",US,2020-03-03T00:43:02,2,0,0,37.5630,-122.3255
"Saratoga County, NY",US,2020-03-07T18:23:05,2,0,0,43.0324,-73.9360
"Summit County, CO",US,2020-03-06T01:29:39,2,0,0,39.5912,-106.0640
"Washington, D.C.",US,2020-03-08T13:53:03,2,0,0,38.9072,-77.0369
"Washoe County, NV",US,2020-03-08T21:43:03,2,0,0,40.5608,-119.6035
,Andorra,2020-03-02T20:23:16,1,0,0,42.5063,1.5218
,Armenia,2020-03-01T19:53:02,1,0,0,40.0691,45.0382
,Bhutan,2020-03-06T15:43:02,1,0,0,27.5142,90.4336
"Calgary, Alberta",Canada,2020-03-06T13:13:34,1,0,0,51.0447,-114.0719
"London, ON",Canada,2020-02-12T18:53:03,1,0,1,42.9849,-81.2453
,Colombia,2020-03-07T00:43:02,1,0,0,4.5709,-74.2973
,Gibraltar,2020-03-04T13:03:13,1,0,0,36.1408,-5.3536
,Jordan,2020-03-03T15:33:02,1,0,0,31.2400,36.5100
,Liechtenstein,2020-03-04T01:33:07,1,0,0,47.1400,9.5500
,Lithuania,2020-02-28T16:23:03,1,0,0,55.1694,23.8813
Tibet,Mainland China,2020-02-12T06:43:02,1,0,1,31.6927,88.0924
,Moldova,2020-03-08T05:13:07,1,0,0,47.4116,28.3699
,Monaco,2020-02-29T00:33:01,1,0,0,43.7333,7.4167
,Nepal,2020-02-12T14:43:03,1,0,1,28.1667,84.2500
,Nigeria,2020-02-28T16:23:03,1,0,0,9.0820,8.6753
,Paraguay,2020-03-08T09:13:16,1,0,0,-23.4425,-58.4438
,Serbia,2020-03-06T15:43:02,1,0,0,44.0165,21.0059
,Sri Lanka,2020-02-08T03:43:03,1,0,1,7.0000,81.0000
,Togo,2020-03-07T02:13:09,1,0,0,8.6195,0.8248
"Berkshire County, MA",US,2020-03-08T00:43:03,1,0,0,42.3118,-73.1822
"Charleston County, SC",US,2020-03-07T01:53:03,1,0,0,32.7957,-79.7848
"Chatham County, NC",US,2020-03-06T16:13:15,1,0,0,35.7211,-79.1781
"Clark County, WA",US,2020-03-07T20:03:07,1,0,0,45.7466,-122.5194
"Cobb County, GA",US,2020-03-07T16:53:03,1,0,0,33.8999,-84.5641
"Davidson County, TN",US,2020-03-08T18:03:06,1,0,0,36.1343,-86.8220
"Davis County, UT",US,2020-03-07T04:43:02,1,0,0,40.9629,-112.0953
"Delaware County, PA",US,2020-03-06T15:33:03,1,0,0,39.9078,-75.3879
"Douglas County, NE",US,2020-03-06T23:33:02,1,0,0,41.3148,-96.1951
"Douglas County, OR",US,2020-03-08T19:53:03,1,0,0,43.1261,-123.2492
"El Paso County, CO",US,2020-03-07T01:13:21,1,0,0,38.9108,-104.4723
"Fairfield County, CT",US,2020-03-08T21:23:03,1,0,0,41.2560,-73.3709
"Fayette County, KY",US,2020-03-06T23:23:03,1,0,0,38.0606,-84.4803
"Fresno County, CA",US,2020-03-08T04:23:15,1,0,0,36.9859,-119.2321
"Grant County, WA",US,2020-03-05T20:23:07,1,0,0,47.1981,-119.3732
"Harford County, MD",US,2020-03-08T21:53:03,1,0,0,39.5839,-76.3637
"Hendricks County, IN",US,2020-03-08T19:33:03,1,0,0,39.8065,-86.5401
"Honolulu County, HI",US,2020-03-07T02:03:30,1,0,0,21.3070,-157.8584
"Hudson County, NJ",US,2020-03-08T19:43:03,1,0,0,40.7453,-74.0535
"Humboldt County, CA",US,2020-02-21T05:13:09,1,0,0,40.7450,-123.8695
"Jefferson County, WA",US,2020-03-07T16:43:02,1,0,0,47.7425,-123.3040
"Johnson County, KS",US,2020-03-08T00:33:02,1,0,0,38.8454,-94.8521
"Kershaw County, SC",US,2020-03-07T02:03:30,1,0,0,34.3672,-80.5883
"Kittitas County, WA",US,2020-03-08T00:43:03,1,0,0,47.1750,-120.9319
"Klamath County, OR",US,2020-03-07T20:13:14,1,0,0,42.6953,-121.6142
"Madera County, CA",US,2020-03-07T20:13:14,1,0,0,37.2519,-119.6963
"Madison, WI",US,2020-03-03T15:53:03,1,0,1,43.0731,-89.4012
"Manatee County, FL",US,2020-03-08T06:23:05,1,0,0,27.4799,-82.3452
"Marion County, IN",US,2020-03-06T17:13:12,1,0,0,39.8362,-86.1752
"Marion County, OR",US,2020-03-08T19:43:03,1,0,0,44.8446,-122.5927
"Okaloosa County, FL",US,2020-03-08T03:03:08,1,0,0,30.5773,-86.6611
"Plymouth County, MA",US,2020-03-07T03:53:03,1,0,0,42.1615,-70.7928
"Polk County, GA",US,2020-03-08T04:13:22,1,0,0,34.0132,-85.1479
"Ramsey County, MN",US,2020-03-06T23:23:03,1,0,0,44.9964,-93.0616
"Riverside County, CA",US,2020-03-08T10:33:03,1,0,0,33.9533,-117.3961
"San Antonio, TX",US,2020-02-13T18:53:02,1,0,0,29.4241,-98.4936
"Santa Rosa County, FL",US,2020-03-08T15:33:04,1,1,0,30.7690,-86.9824
"Sarasota, FL",US,2020-03-02T03:23:06,1,0,0,27.3364,-82.5307
"Shelby County, TN",US,2020-03-08T16:13:36,1,0,0,35.1269,-89.9253
"Sonoma County, CA",US,2020-03-02T20:53:02,1,0,0,38.5780,-122.9888
"Spokane County, WA",US,2020-03-08T21:53:04,1,0,0,47.6587,-117.4225
"St. Louis County, MO",US,2020-03-08T11:23:08,1,0,0,38.6103,-90.4125
"Suffolk County, NY",US,2020-03-08T16:03:05,1,0,0,40.9849,-72.6151
"Tulsa County, OK",US,2020-03-07T04:43:02,1,0,0,36.1593,-95.9410
"Ulster County, NY",US,2020-03-08T16:23:07,1,0,0,41.8586,-74.3118
"Umatilla, OR",US,2020-03-02T20:23:16,1,0,0,45.7750,-118.7606
"Unassigned Location, VT",US,2020-03-08T06:23:05,1,0,0,44.3378,-72.7563
"Unknown Location, MA",US,2020-03-08T21:23:03,1,0,0,42.4072,-71.3824
"Volusia County, FL",US,2020-03-08T03:03:08,1,0,0,29.0280,-81.0755
"Wake County, NC",US,2020-03-03T20:53:02,1,0,0,35.8032,-78.5661
"Wayne County, PA",US,2020-03-06T16:13:15,1,0,0,41.6739,-75.2479
"Williamson County, TN",US,2020-03-05T23:33:03,1,0,0,35.9179,-86.8622
"Yolo County, CA",US,2020-03-06T20:13:14,1,0,0,38.7646,-121.9018
,Ukraine,2020-03-03T15:33:02,1,0,0,48.3794,31.1656
,Vatican City,2020-03-06T15:43:02,1,0,0,41.9029,12.4534
From Diamond Princess,Australia,2020-02-29T02:03:10,0,0,0,35.4437,139.6380
Northern Territory,Australia,2020-03-06T04:33:03,0,0,0,-12.4634,130.8456
"Lackland, TX (From Diamond Princess)",US,2020-02-24T23:33:02,0,0,0,29.3829,-98.6134
"Montgomery County, TX",US,2020-03-07T19:53:02,0,0,0,30.3213,-95.4778
"Omaha, NE (From Diamond Princess)",US,2020-02-24T23:33:02,0,0,0,41.2545,-95.9758
"Travis, CA (From Diamond Princess)",US,2020-02-24T23:33:02,0,0,0,38.2721,-121.9399`;

export default csvParse(DATA);
