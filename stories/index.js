import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RangeSelector from '../app/components/range-selector';

storiesOf('RangeSelector', module)
  .add('default', () => (
    <RangeSelector
      onChange={action('Changed')}
    />
  ));
