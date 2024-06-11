import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectModal from '../components/ProjectModal';
import DonationForm from '../components/DonationForm';
import DonationHistory from '../components/DonationHistory';
import './css/personal_page.css';
import { DataTable } from '../components/DataTable';
import { Transactions } from '../components/DataTable';
import { getItems, createItem, modifyItem, getItemByName } from '../api';

const DonationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  // background-color: #2E4053;
`;

const DonationHeader = styled.h1`
  color: white;
`

const data: Transactions[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    address: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    address: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    address: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    address: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    address: "carmella@hotmail.com",
  },
]

const PersonalPage: React.FC = () => {
  const [donationRecords, setDonationRecords] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        console.log(data);
        setDonationRecords(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDonate = (amount: number) => {
    const newRecord: Transactions = {
      id: '0',
      status: 'success',
      amount,
      address: '',
      date: new Date().toLocaleString(),
    };
    setDonationRecords([...donationRecords, newRecord]);
  };
  console.log(donationRecords);
  return (
    <DonationWrapper>
      {/* <DonationHeader>Personal Donation Website</DonationHeader>
      <div className="project-modals">
        <ProjectModal title="Project 1" description="Description of Project 1" />
        <ProjectModal title="Project 2" description="Description of Project 2" />
        <ProjectModal title="Project 3" description="Description of Project 3" />
      </div>
      <DonationForm onDonate={handleDonate} /> */}
      <DataTable data={donationRecords}/>
      {/* <DonationHistory records={donationRecords} /> */}
    </DonationWrapper>
  );
};

export default PersonalPage;
