import React from 'react';

interface DonationRecord {
  amount: number;
  date: string;
}

interface DonationHistoryProps {
  records: DonationRecord[];
}

const DonationHistory: React.FC<DonationHistoryProps> = ({ records }) => {
  return (
    <div className="donation-history">
      <h3>Donation History</h3>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            ${record.amount} on {record.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationHistory;
