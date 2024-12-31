import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Employee } from "../../models/employee";
import { employeesService } from "../../api/employee.service";

interface Props {
  employee: Employee | null;
  onClose: () => void;
  onEmployeeSaved: () => void;
}

const EditEmployeeModal = ({ employee, onClose, onEmployeeSaved }: Props) => {
  const [employeeId, setEmployeeId] = useState<number | undefined>(undefined);
  const [adpId, setAdpId] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (employee) {
      setEmployeeId(employee.employeeId);
      setAdpId(employee.adpId);
      setName(employee.fullName);
    } else {
      setEmployeeId(undefined);
      setAdpId(undefined);
      setName("");
    }
  }, [employee]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (employee) {
        await employeesService.updateAdp(employee.id, employeeId!, adpId!, name);
      } else {
        await employeesService.registerAdp(employeeId!, adpId!, name);
      }
      onEmployeeSaved(); 
      onClose();
    } catch (error) {
      console.error("Failed to save employee", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{employee ? `Edit Employee: ${employee.fullName}` : "New Employee"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmployeeId">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="number"
              value={employeeId}
              onChange={(e) => setEmployeeId(Number(e.target.value))}
              placeholder="Enter Employee ID"
            />
          </Form.Group>

          <Form.Group controlId="formAdpId">
            <Form.Label>ADP ID</Form.Label>
            <Form.Control
              type="number"
              value={adpId}
              onChange={(e) => setAdpId(Number(e.target.value))}
              placeholder="Enter ADP ID"
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Full Name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEmployeeModal;
