import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Holiday } from "../../models/holiday";
import { holidaysService } from "../../api/holiday.service";

interface EditHolidayModalProps {
  holiday: Holiday | null;
  onClose: () => void;
  onHolidaySaved: () => void;
}

const EditHolidayModal: React.FC<EditHolidayModalProps> = ({
  holiday,
  onClose,
  onHolidaySaved,
}) => {
  const [holidayName, setHolidayName] = useState<string>("");
  const [holidayDate, setHolidayDate] = useState<string>(""); 
  const [holidayHours, setHolidayHours] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (holiday) {
      setHolidayName(holiday.name);
      setHolidayDate(holiday.date.toString().split("T")[0]); 
      setHolidayHours(holiday.hours);
    } else {
      setHolidayName("");
      setHolidayDate("");
      setHolidayHours(8);
    }
  }, [holiday]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (holiday) {
        await holidaysService.updateHoliday(holiday.id, holidayDate,holidayName, holidayHours);
      } else {
        await holidaysService.createHoliday(holidayDate,holidayName, holidayHours);
      }
      onHolidaySaved(); 
      onClose(); 
    } catch (error) {
      console.error("Error saving holiday:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{holiday ? "Edit Holiday" : "New Holiday"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="holidayName">
            <Form.Label>Holiday Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter holiday name"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="holidayDate">
            <Form.Label>Holiday Date</Form.Label>
            <Form.Control
              type="date"
              value={holidayDate}
              onChange={(e) => setHolidayDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="holidayHours">
            <Form.Label>Holiday Hours</Form.Label>
            <Form.Control
              type="number"
              value={holidayHours}
              onChange={(e) => setHolidayHours(Number(e.target.value))}
              min={1}
              max={24}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : holiday ? "Update Holiday" : "Save Holiday"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditHolidayModal;
