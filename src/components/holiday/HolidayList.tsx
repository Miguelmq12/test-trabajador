import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { Holiday } from "../../models/holiday";
import EditHolidayModal from "./EditHolidayModal";
import { holidaysService } from "../../api/holiday.service";
import { formatDateToYYYYMMDD } from "../../core/formatdate";


const HolidayList = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [holidayYear, setHolidayYear] = useState(2024); 
  const [showModal, setShowModal] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState<Holiday | null>(null);

  const fetchHolidays = async (page: number, perPage: number, searchTerm = "", holidayYear = 2024) => {
    setLoading(true);
    try {
      const response = await holidaysService.get(page, perPage, searchTerm, holidayYear);
      const formattedHolidays = response.data.map(holiday => ({
        ...holiday,
        date: formatDateToYYYYMMDD(holiday.date) 
      }));

      setHolidays(formattedHolidays);
      setTotalRows(response.data.length);
    } catch (error) {
      console.error("Error holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays(page, perPage, searchTerm, holidayYear);
  }, [page, perPage, searchTerm, holidayYear]);

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

  const handleEditClick = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setShowModal(true);
  };

  const handleNewHolidayClick = () => {
    setSelectedHoliday(null);
    setShowModal(true);
  };

  const handleDeleteClick = (holiday: Holiday) => {
    setHolidayToDelete(holiday);
    setShowConfirmDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (holidayToDelete) {
      try {
        await holidaysService.deleteHoliday(holidayToDelete.id);
        fetchHolidays(page, perPage, searchTerm, holidayYear);
        setShowConfirmDeleteModal(false);
      } catch (error) {
        console.error("Error deleting holiday:", error);
      }
    }
  };

  const columns: TableColumn<Holiday>[] = [
    { name: "Holiday Name", selector: (row) => row.name, sortable: true },
    { name: "Holiday Date", selector: (row) => row.date, sortable: true },
    { name: "Holiday Hours", selector: (row) => row.hours, sortable: true },
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
            placeholder="Search holidays"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleNewHolidayClick}>
            New Holiday
          </Button>
        </Col>
      </Row>

      <DataTable
        columns={columns}
        data={holidays}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        progressPending={loading}
      />

      {showModal && (
        <EditHolidayModal
          holiday={selectedHoliday}
          onClose={() => setShowModal(false)}
          onHolidaySaved={() => {
            fetchHolidays(page, perPage, searchTerm, holidayYear);
            setShowModal(false);
          }}
        />
      )}

      <Modal show={showConfirmDeleteModal} onHide={() => setShowConfirmDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this holiday?</p>
          <p>
            <strong>{holidayToDelete?.hName}</strong> on <strong>{holidayToDelete?.hDate}</strong>
          </p>
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

export default HolidayList;
