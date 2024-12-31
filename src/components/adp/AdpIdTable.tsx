import { EmployeeADP } from "../../models/adp";
import { useEffect, useState } from "react";
import { agent } from "../../api/agent";
import DataTable, { TableColumn } from "react-data-table-component";
import { Col, Row, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AdpIdTable = () => {
  const [data, setData] = useState<EmployeeADP[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (page: number, perPage: number, searchTerm = "") => {
    setLoading(true);
    const response = await agent.Adp.listPaginated(page, perPage, searchTerm);
    setData(response.data);
    setTotalRows(response.totalRecords);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page, perPage, searchTerm);
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

  const columns: TableColumn<EmployeeADP>[] = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Employee ID", selector: (row) => row.employeeId, sortable: true },
    { name: "ADP ID", selector: (row) => row.adpId, sortable: true },
    { name: "Full Name", selector: (row) => row.fullName, sortable: true },
    { name: "Timestamp", selector: (row) => row.stamp, sortable: true },
  ];

  return (
    <>
      <Row className="mb-3">
        <Col xs={6} className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search ADP IDs"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <NavLink to="/adp/add" className="btn btn-primary">
            Add New ADP
          </NavLink>
        </Col>
      </Row>
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        progressPending={loading}
      />
    </>
  );
};

export default AdpIdTable;
