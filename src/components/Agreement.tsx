import './css/Agreement.css';

interface Agreement {
  amount: string;
}
const Agreement: React.FC<Agreement> = ({ amount }) => {
  return (
    <fieldset className={'Agreement'}>
      <input
        className={'CheckBox'}
        type='checkbox'
        id='agreement-checkbox'
      />
      <label htmlFor='agreement-checkbox'>
        Yes, I’ll generously add ${amount} each month to cover the transaction fees.
      </label>
    </fieldset>
  );
};

export default Agreement;