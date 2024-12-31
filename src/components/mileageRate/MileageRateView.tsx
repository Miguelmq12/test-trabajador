import { useEffect, useState } from "react";
import { agent } from "../../api/agent";
import { Col, Row, Form, Button } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import './MileageRateView.css';

const MileageRateView = () => {
  const [loading, setLoading] = useState(false);
  const [mileageRate, setMileageRate] = useState(0);

  
  const fetchMileageRate = async () => {
    setLoading(true);
    const response = await agent.MileageRateServices.get();
    setMileageRate(response.mileageRate);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchMileageRate();
  }, []);

  const handleMileageRateChange: React.MouseEventHandler<HTMLButtonElement> = () => {
    setLoading(true);
    agent.MileageRateServices.put(mileageRate);
    // setMileageRate(mileageRate);
    setLoading(false);
  };

  const handleMileageRateUIChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setMileageRate(parseFloat(event.target.value));
    }
  };


//   const handlePageChange = (page: number) => {
//     setPage(page);
//   };

//   const handlePerRowsChange = (newPerPage: number, page: number) => {
//     setPerPage(newPerPage);
//     setPage(page);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//     setPage(1);
//   };

  return (
      <Row className="mb-3">
        <Col xs={12} className="d-flex">
          
          <Form className="mileage-rate-form">
            <Row>
              <Col xs={2}>
                <Form.Group className="mb-3" controlId="formMileageRate">
                  <Form.Label>Mileage Rate</Form.Label>
                  <Form.Control type="number" onChange={handleMileageRateUIChange} value={mileageRate} />
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>
              </Col>

              <Col xs={1}>
                <Button 
                  variant="primary" 
                  disabled={loading}
                  onClick={handleMileageRateChange}>
                  {loading ? 'Loading...' : 'Update'}
                </Button>
              </Col>
            </Row>
          </Form>

        </Col>
      </Row>
  );
};

export default MileageRateView;
