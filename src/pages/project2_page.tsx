import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaDonate } from 'react-icons/fa';
import './css/project_page.css';
import styled from 'styled-components';
import { DataTable } from '../components/DataTable';
import { Transactions } from '../components/DataTable';
import { checkBalance, getItemByName, sendTransaction } from '../api';
import { Wallet, CoinType, WalletOptions, Event, WalletEventType, RegularTransactionEssence, BasicOutput, CommonOutput, AddressUnlockCondition, Balance } from '@iota/sdk';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

Modal.setAppElement('#root');

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  overflow: visible;
  // background-color: #2E4053;
`;

const ProjectHeader = styled.div`
  color: white;
  h2{
    font-size: 2rem;
  }
  p{
    font-size: 1rem;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

// export type Transactions = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   address: string
//   date?: string
// }

const ProjectPage: React.FC = () => {
  const [balance, setBalance] = useState<Number>(0);
  const [donationRecords, setDonationRecords] = useState<Transactions[]>([]);
  const [incomingDonationRecords, setIncomingDonationRecords] = useState<Transactions[]>([]);
  const [donationAmount, setDonationAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const Donation_Address = 'tst1qqz77tjqklk6eruxurxt73z8pdut5gvv43pj0j2nem9m8l0yzyl2w4qppef'
  const handleDonate = () => {
    sendTransaction("Cheesecake", donationAmount*1000000, Donation_Address)
    console.log('Donation sent successfully!');
    setTotalDonations(totalDonations + donationAmount);
    setDonationAmount(0);
    closeModal();
  };
  const handleCheckBalance = async () => {
    await checkBalance('project2');
    const data = await getItemByName("Project 2");
    console.log(Number(data.balance.total))
    setBalance(Number(data.balance.total))
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItemByName("Project 2");
        console.log(data);
        setBalance(Number(data.balance.total))
        // id: string
        // amount: number
        // status: "pending" | "processing" | "success" | "failed"
        // address: string
        // date ?: string
        const transactionsData = data.transactions.map((transaction: any) => ({
          transactionId: transaction.transactionId,
          date: transaction.timestamp,
          status: 'success',
          address: transaction.address,
          amount: transaction.amount,
          // Add other fields as needed
        }));
        setDonationRecords(transactionsData);

        const incomingTransactionsData = data.incomingTransactions.map((transaction: any) => ({
          id: transaction.transactionId,
          date: transaction.timestamp,
          status: 'success',
          address: transaction.address,
          amount: transaction.amount,
          // Add other fields as needed
        }));
        setIncomingDonationRecords(incomingTransactionsData);

        console.log(donationRecords);
        console.log(balance)
        setTotalDonations(Number(balance) / 1000000)
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [balance]);

  return (
    <PageWrapper>
      <HeaderWrapper>
        <ProjectHeader>
          <h2>捐款支持青鳥行動</h2>
          <p>幫助為我們挺身而出的人們</p>
          <p>目前募資進度</p>
        </ProjectHeader>
      </HeaderWrapper>
      <div className="Progress-bar" style={{ height: '5vh' }}>
        <div className="Progress" style={{ width: `${(totalDonations / 10000) * 100}%` }}></div>
        <div className="Money">{`$${totalDonations} / $10,000`}</div>
      </div>
      <button className="Donate-button" onClick={openModal}>
        <FaDonate /> 我要捐款
      </button>
      <button className="Donate-button" onClick={handleCheckBalance}>
        <FaDonate /> 查看餘額
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
      {/* <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal" overlayClassName="Overlay">
        <h2>已超出捐款金額</h2>
        <button onClick={closeModal}>取消</button>
      </Modal> */}
      <Tabs defaultValue="account" className="w-[80vw]">
        <TabsList>
          <TabsTrigger value="sending">Sending</TabsTrigger>
          <TabsTrigger value="incoming">Incoming</TabsTrigger>
        </TabsList>
        <TabsContent value="sending"><DataTable data={donationRecords} /></TabsContent>
        <TabsContent value="incoming"><DataTable data={incomingDonationRecords} /></TabsContent>
      </Tabs>
    </PageWrapper>
  );
}

export default ProjectPage;