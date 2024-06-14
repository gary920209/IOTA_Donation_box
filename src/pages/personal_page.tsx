import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectModal from '../components/ProjectModal';
import DonationForm from '../components/DonationForm';
import DonationHistory from '../components/DonationHistory';
import './css/personal_page.css';
import { DataTable } from '../components/DataTable';
import { checkBalance, getItemByName, getItems } from '../api';
import { FaDonate } from 'react-icons/fa';
import { Button } from '../ui/button';

const DonationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  // background-color: #2E4053;
`;

const DonationHeader = styled.h1`
  color: white;
  margin-bottom: 20px;
`

const ProjectsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 80vw;
`;

interface DonationRecord {
  id: string
  status: 'Success' | 'Processing' | 'Pending' | 'Failed';
  amount: number;
  date: string;
}

const PersonalPage: React.FC = () => {
  const [balance, setBalance] = useState<Number>(0);
  const [donationRecords, setDonationRecords] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItemByName("Oscar");
        console.log(data);
        setBalance(Number(data.balance.total))
        // const findRecord: DonationRecord = {id: data._id as string, status: data.status, amount: data.balance, date: data.date}
        // setDonationRecords(findRecord);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDonate = (amount: number) => {
    const newRecord: DonationRecord = {
      id: '0',
      status: 'Success',
      amount,
      date: new Date().toLocaleString(),
      
    };
    setDonationRecords([...donationRecords, newRecord]);
  };

  const handleCheckBalance = async () => {
    await checkBalance('Cheesecake');
    const data = await getItemByName("Oscar");
    console.log(Number(data.balance.total))
    setBalance(Number(data.balance.total))
  }

  return (
    <DonationWrapper>
      <DonationHeader>Total Amount: {balance.toString()}</DonationHeader>
      <Button onClick={handleCheckBalance}>
        查看餘額
      </Button>
      <span style={{height:'5vh'}}></span>
      <ProjectsWrapper>
        <ProjectModal title="台大電機系學會" description="幫助可愛的學弟妹" route='/project'/>
        <ProjectModal title="青鳥東" description="沒有討論，不是民主" route='/project2'/>
        <ProjectModal title="廁所基金" description="你不掃廁所，就請外面的人來掃廁所" route='/project3'/>
      </ProjectsWrapper>
      {/* <DonationForm onDonate={handleDonate} /> */}
      {/* <DataTable /> */}
    </DonationWrapper>
  );
};

export default PersonalPage;
