import DataTable, { TableColumn } from 'react-data-table-component';
import { MinimumWage } from '../../models/minimumWage';
import { Button, Spinner } from 'react-bootstrap';

interface Props {
  data: MinimumWage[];
  onEditClick: (wage: MinimumWage) => void;
  loading: boolean;
}

const MinimumWageTable = ({ data, onEditClick, loading }: Props) => {
  
  const columns: TableColumn<MinimumWage>[] = [
    {
      name: 'State',
      selector: (row) => row.stateName,
      sortable: true,
    },
    {
      name: 'County',
      selector: (row) => row.stateCounty || 'N/A',
      sortable: true,
    },
    {
      name: 'Rate',
      selector: (row) => row.rate.toFixed(2),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Button variant="outline-primary" onClick={() => onEditClick(row)}>
          Edit
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      progressComponent={<Spinner animation="border" />}
      pagination
      highlightOnHover
      responsive
    />
  );
};

export default MinimumWageTable;
