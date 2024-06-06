import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaDonate } from 'react-icons/fa';
import './App.css';

Modal.setAppElement('#root');

const App: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleDonate = () => {
    setTotalDonations(totalDonations + donationAmount);
    setDonationAmount(0);
    closeModal();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>捐款網站</h1>
        <div className="Project-info">
          <h2>捐款支持台大電機系學會</h2>
          <p>幫助可愛的學弟妹們</p>
        </div>
        <div className="Progress-bar">
          <div className="Progress" style={{ width: `${(totalDonations / 1000) * 100}%` }}></div>
          <span>{`$${totalDonations} / $1000`}</span>
        </div>
        <button className="Donate-button" onClick={openModal}>
          <FaDonate /> 我要捐款
        </button>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal" overlayClassName="Overlay">
          <h2>輸入捐款金額</h2>
          <label>
            捐款金額:
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value))}
            />
          </label>
          <button onClick={handleDonate}>捐款</button>
          <button onClick={closeModal}>取消</button>
        </Modal>
      </header>
    </div>
  );
};

export default App;
