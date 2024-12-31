import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { Employee } from "../../models/employee";
import EditEmployeeModal from "./EditEmployeeModal";
import { employeesService } from "../../api/employee.service";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const fetchEmployees = async (page: number, perPage: number, searchTerm = "") => {
    setLoading(true);
    try {
      const response = await employeesService.get(page, perPage, searchTerm); 
      setEmployees(response.data);
      setTotalRows(response.data.length);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(page, perPage, searchTerm);
  }, [page, perPage, searchTerm]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    setPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); 
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee); 
    setShowModal(true); 
  };

  const handleNewEmployeeClick = () => {
    setSelectedEmployee(null); 
    setShowModal(true); 
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee); 
    setShowConfirmDeleteModal(true); 
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        await employeesService.deleteAdp(employeeToDelete.id); 
        fetchEmployees(page, perPage, searchTerm);
        setShowConfirmDeleteModal(false); 
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const columns: TableColumn<Employee>[] = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Employee ID", selector: (row) => row.employeeId, sortable: true },
    { name: "Full Name", selector: (row) => row.fullName, sortable: true },
    { name: "Timestamp", selector: (row) => row.stamp, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button variant="warning" onClick={() => handleEditClick(row)} className="me-2">
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDeleteClick(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Row className="mb-3">
        <Col xs={6} className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search employees"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleNewEmployeeClick}>
            New Employee
          </Button>
        </Col>
      </Row>

      <DataTable
        columns={columns}
        data={employees}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        progressPending={loading}
      />

      {showModal && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowModal(false)}
          onEmployeeSaved={() => {
            fetchEmployees(page, perPage, searchTerm); 
            setShowModal(false); 
          }}
        />
      )}

      <Modal show={showConfirmDeleteModal} onHide={() => setShowConfirmDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this employee?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeList;
