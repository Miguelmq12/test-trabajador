import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MinimumWageTable from './MinimumWageTable';
import { MinimumWage } from '../../models/minimumWage';
import { agent } from '../../api/agent';
import EditRateModal from './EditRateModal';

const MinimumWageDashboard = () => {
  const [minimumWages, setMinimumWages] = useState<MinimumWage[]>([]);
  const [selectedWage, setSelectedWage] = useState<MinimumWage | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMinimumWages = async () => {
    setLoading(true);
    try {
      const data = await agent.MinimumWages.list();
      setMinimumWages(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMinimumWages();
  }, []);

  const handleEditClick = (wage: MinimumWage) => {
    setSelectedWage(wage);
  };

  const handleCloseModal = () => {
    setSelectedWage(null);
    fetchMinimumWages();
  };

  return (
    <Container>
      <h2 className="mb-4">Minimum Wage by State</h2>
      <MinimumWageTable data={minimumWages} onEditClick={handleEditClick} loading={loading} />
      {selectedWage && (
        <EditRateModal wage={selectedWage} onClose={handleCloseModal} />
      )}
    </Container>
  );
};

export default MinimumWageDashboard;
