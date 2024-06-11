import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectModal from '../components/ProjectModal';
import DonationForm from '../components/DonationForm';
import DonationHistory from '../components/DonationHistory';
import './css/personal_page.css';
import { DataTable } from '../components/DataTable';
import { getItemByName, getItems } from '../api';

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
  width: 100%;
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

  return (
    <DonationWrapper>
      <DonationHeader>Total Amount: {balance.toString()}</DonationHeader>
      <ProjectsWrapper>
        <ProjectModal title="Project 1" description="Description of Project 1" />
        <ProjectModal title="Project 2" description="Description of Project 2" />
        <ProjectModal title="Project 3" description="Description of Project 3" />
      </ProjectsWrapper>
      {/* <DonationForm onDonate={handleDonate} /> */}
      {/* <DataTable /> */}
    </DonationWrapper>
  );
};

export default PersonalPage;
