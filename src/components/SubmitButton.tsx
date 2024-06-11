import { FaDonate } from 'react-icons/fa';
import './css/SubmitButton.css';

interface SubmitButtonProps {
    handleDonate: () => void;
}
const SubmitButton: React.FC<SubmitButtonProps> = ({ handleDonate }) => (
    <button className='DonateButton' onClick={handleDonate}>
        <FaDonate/>
        我要捐款
    </button>
);

export default SubmitButton;