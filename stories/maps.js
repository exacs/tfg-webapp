import React from 'react'
import { storiesOf } from '@storybook/react';
import Map from '../app/components/map';

storiesOf('Highcharts', module)
  .add('default', () => (
    <Map />
  ));
