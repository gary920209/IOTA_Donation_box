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

// const data: Transactions[] = [
//   {
//     id: "m5gr84i9",
//     amount: 316,
//     status: "success",
//     address: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     amount: 242,
//     status: "success",
//     address: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     amount: 837,
//     status: "processing",
//     address: "Monserrat44@gmail.com",
//   },
//   {
//     id: "5kma53ae",
//     amount: 874,
//     status: "success",
//     address: "Silas22@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     address: "carmella@hotmail.com",
//   },
// ]

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
  const Donation_Address = 'tst1qzwavrdmn8hlxj8us6fhn3k93wdd9depptvl8fzvl7qcg430s2thytd0xsk'
  const handleDonate = () => {
    sendTransaction("Cheesecake", donationAmount, Donation_Address)
    setTotalDonations(totalDonations + donationAmount);
    setDonationAmount(0);
    closeModal();
  };
  const handleCheckBalance = () => {
    checkBalance();
    console.log(balance)
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItemByName("Alice");
        console.log(data);
        setBalance(Number(data.balance.total))
        // id: string
        // amount: number
        // status: "pending" | "processing" | "success" | "failed"
        // address: string
        // date ?: string
        const transactionsData = data.transactions.map((transaction: any) => ({
          id: transaction.transactionId,
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
          <h2>捐款支持台大電機系學會</h2>
          <p>幫助可愛的學弟妹們</p>
          <p>目前募資進度</p>
        </ProjectHeader>
      </HeaderWrapper>
      <div className="Progress-bar" style={{ height: '5vh' }}>
        <div className="Progress" style={{ width: `${(totalDonations / 1000000) * 100}%` }}></div>
        <div className="Money">{`$${totalDonations} / $1,000,000`}</div>
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