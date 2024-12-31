import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { MinimumWage } from '../../models/minimumWage';
import { agent } from '../../api/agent';

interface Props {
  wage: MinimumWage;
  onClose: () => void;
}

const EditRateModal = ({ wage, onClose }: Props) => {
  const [rate, setRate] = useState(wage.rate);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await agent.MinimumWages.update(wage.id, rate);
      onClose();
    } catch (error) {
      console.error("Failed to update minimum wage", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Minimum Wage for {wage.stateName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formWageRate">
            <Form.Label>Minimum Wage Rate</Form.Label>
            <Form.Control
              type="number"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              min="0"
              step="0.01"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRateModal;
