import React from 'react'
import { storiesOf } from '@storybook/react';
import Map from '../app/components/map';

/*
DATA:
- SY > FR : 25.000
- SY > ES :  5.000
- MA > ES : 10.000
- ES > FR :  2.500

TOTAL:
- FR: +27.500
- ES: +12.500
- SY: -30.000
- MA: -10.000

------------------------------------

FILTERED:
- SY (poor) > FR (rich): 25.000
- SY (poor) > ES (rich):  5.000
- MA (poor) > ES (rich): 10.000

TOTAL:
- FR: +25.000
- ES: +15.000
- SY: -30.000
- MA: -10.000
*/


// BEFORE PROCESSING
const series1 = [
  ['sy', 'fr', 25000],
  ['sy', 'es', 5000],
  ['ma', 'es', 10000],
  ['es', 'fr', 2500]
];

// AFTER PROCESSING
const series2 = [
  ['fr',  27500],
  ['es',  12500],
  ['sy', -30000],
  ['ma', -10000]
];


storiesOf('Highcharts', module)
  .add('default', () => (
    <Map series={series2} />
  ));
