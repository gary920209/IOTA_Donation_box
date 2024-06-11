import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectModal from '../components/ProjectModal';
import DonationForm from '../components/DonationForm';
import DonationHistory from '../components/DonationHistory';
import './css/personal_page.css';
import { DataTable } from '../components/DataTable';

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

interface DonationRecord {
  amount: number;
  date: string;
}

const PersonalPage: React.FC = () => {
  const [donationRecords, setDonationRecords] = useState<DonationRecord[]>([]);

  const handleDonate = (amount: number) => {
    const newRecord: DonationRecord = {
      amount,
      date: new Date().toLocaleString(),
    };
    setDonationRecords([...donationRecords, newRecord]);
  };

  return (
    <DonationWrapper>
      {/* <DonationHeader>Personal Donation Website</DonationHeader>
      <div className="project-modals">
        <ProjectModal title="Project 1" description="Description of Project 1" />
        <ProjectModal title="Project 2" description="Description of Project 2" />
        <ProjectModal title="Project 3" description="Description of Project 3" />
      </div>
      <DonationForm onDonate={handleDonate} /> */}
      <DataTable />
      <DonationHistory records={donationRecords} />
    </DonationWrapper>
  );
};

export default PersonalPage;
