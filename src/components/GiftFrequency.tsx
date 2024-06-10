import React, { useEffect, useState } from 'react';
import classes from './css/GiftFrequency.module.css';

const GiftFrequency: React.FC = () => {
  const [selectedFrequency, setSelectedFrequency] = useState<'monthly' | 'one-time'>('monthly');
  useEffect(() => {
    console.log(`Selected frequency: ${selectedFrequency}`);
  }, [selectedFrequency]);

  return (
    <div className={classes.GiftFrequency}>
      <header className={classes.Title}>
        <h4>Gift frequency</h4>
      </header>
      <fieldset className={classes.Frequency}>
        <div
          className={`${classes.RadioWrapper} ${selectedFrequency === 'monthly' ? classes.Selected : ''}`}
          onClick={() => setSelectedFrequency('monthly')}
        >
          <input
            className={classes.Radio}
            id='monthly'
            type='radio'
            name='Frequency'
            checked={selectedFrequency === 'monthly'}
            onChange={() => setSelectedFrequency('monthly')}
          />
          <label htmlFor='monthly'>Monthly</label>
        </div>
        <div
          className={`${classes.RadioWrapper} ${selectedFrequency === 'one-time' ? classes.Selected : ''}`}
          onClick={() => setSelectedFrequency('one-time')}
        >
          <input
            className={classes.Radio}
            type='radio'
            id='one-time'
            name='Frequency'
            checked={selectedFrequency === 'one-time'}
            onChange={() => setSelectedFrequency('one-time')}
          />
          <label htmlFor='one-time'>One time</label>
        </div>
      </fieldset>
    </div>
  );
};

export default GiftFrequency;
