import React, { useState } from 'react';
import classes from './css/SelectAmount.module.css';

interface SelectAmountProps {
    onAmountSelect: (selectedAmount: string) => void;
  }

const SelectAmount: React.FC<SelectAmountProps> = ({ onAmountSelect }) => {
  const [selectedAmount, setSelectedAmount] = useState<string>('10');

  const handleAmountSelection = (amount: string) => {
    setSelectedAmount(amount);
    onAmountSelect(amount);
  };

  return (
    <div className={classes.SelectAmount}>
      <header className={classes.Title}>
        <h4>Select amount (in US dollar)</h4>
      </header>
      <fieldset className={classes.Amounts}>
        <div
          className={`${classes.RadioWrapper} ${selectedAmount === '10' ? classes.Selected : ''}`}
          onClick={() => handleAmountSelection('10')}
        >
          <input
            defaultChecked
            className={classes.Radio}
            type='radio'
            name='amount'
            id='10'
          />
          <label htmlFor='10'>$10</label>
        </div>
        <div
          className={`${classes.RadioWrapper} ${selectedAmount === '20' ? classes.Selected : ''}`}
          onClick={() => handleAmountSelection('20')}
        >
          <input className={classes.Radio} type='radio' name='amount' id='20' />
          <label htmlFor='20'>$20</label>
        </div>
        <div
          className={`${classes.RadioWrapper} ${selectedAmount === '30' ? classes.Selected : ''}`}
          onClick={() => handleAmountSelection('30')}
        >
          <input className={classes.Radio} type='radio' name='amount' id='30' />
          <label htmlFor='30'>$30</label>
        </div>
        <div
          className={`${classes.RadioWrapper} ${selectedAmount === '40' ? classes.Selected : ''}`}
          onClick={() => handleAmountSelection('40')}
        >
          <input className={classes.Radio} type='radio' name='amount' id='40' />
          <label htmlFor='40'>$40</label>
        </div>
        <div
          className={`${classes.RadioWrapper} ${selectedAmount === 'other' ? classes.Selected : ''}`}
          onClick={() => handleAmountSelection('other')}
        >
          <input
            className={classes.Radio}
            type='radio'
            name='amount'
            id='other'
          />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>
    </div>
  );
};

export default SelectAmount;
