import React, { useState } from 'react';
import GiftFrequency from './GiftFrequency';
import classes from './css/DonationForm.module.css';
import SelectAmount from './SelectAmount';
import Agreement from './Agreement';
import NameInput from './NameInput';
import SubmitButton from './SubmitButton';

interface DonationFormProps {
    onDonate: (amount: number) => void;
}

// const DonationForm: React.FC<DonationFormProps> = ({ onDonate }) => {
//   const [amount, setAmount] = useState<string>('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (value === '' || Number(value) >= 0) {
//       setAmount(value); 
//     }
//   };

//   const handleDonate = () => {
//     const numericAmount = Number(amount); 
//     onDonate(numericAmount);
//     if (numericAmount > 0) {
//         console.log(`Donated: ${numericAmount}`);
//         setAmount(''); 
//     }
//   };

//   return (
//     <div className="donation-form">
//       <input 
//         type="number" 
//         value={amount === '0' ? '' : amount}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleDonate}>Donate</button>
//     </div>
//   );

// };

// export default DonationForm;


const DonationForm: React.FC<DonationFormProps> = ({ onDonate }) => {
    const [amount, setAmount] = useState<string>('');
    const handleAmountSelection = (selectedAmount: string) => {
        setAmount(selectedAmount);
    };

    const handleDonate = () => {
        const numericAmount = Number(amount);
        onDonate(numericAmount);
        if (numericAmount > 0) {
            console.log(`Donated: ${numericAmount}`);
            setAmount('');
        }
    };

    return (
        <form className={classes.DonationForm} onSubmit={e => e.preventDefault()}>
            <GiftFrequency />
            <SelectAmount onAmountSelect={handleAmountSelection} />
            <Agreement amount={amount} />
            <NameInput />
            <SubmitButton handleDonate={handleDonate}/>
        </form>
    );
};

export default DonationForm;