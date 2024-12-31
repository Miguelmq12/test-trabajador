import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Select from 'react-select';
import mockData from '../../core/mockData.json';

const CreateOrder: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hireDate, setHireDate] = useState<Date | null>(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(null);
  const [zip, setZip] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reNumber, setReNumber] = useState('');
  const [jobTitle, setJobTitle] = useState(null);
  const [workingStatus, setWorkingStatus] = useState('');
  const [reportsTo, setReportsTo] = useState('');
  const [department, setDepartment] = useState(null);
  const [compensation, setCompensation] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [offerLetter, setOfferLetter] = useState('');

  const [selectData, setSelectData] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setSelectData(mockData);
  }, []);

  const validateForm = () => {
    const newErrors: any = {};
    // Validaciones de todos los campos
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!address) newErrors.address = 'Address is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (!zip) newErrors.zip = 'Zip Code is required';
    if (!cellPhone) newErrors.cellPhone = 'Cell Phone is required';
    if (!email) newErrors.email = 'Email is required';
    if (!jobTitle) newErrors.jobTitle = 'Job Title is required';
    if (!workingStatus) newErrors.workingStatus = 'Working Status is required';
    if (!reportsTo) newErrors.reportsTo = 'Reports To is required';
    if (!department) newErrors.department = 'Department is required';
    if (!compensation) newErrors.compensation = 'Compensation is required';
    if (!hireDate) newErrors.hireDate = 'Hire Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setFormSubmitted(false);
      const formData = {
        firstName,
        middleName,
        lastName,
        hireDate,
        address,
        city,
        state,
        zip,
        cellPhone,
        email,
        reNumber,
        jobTitle,
        workingStatus,
        reportsTo,
        department,
        compensation,
        jobDescription,
        offerLetter,
      };
       //test= JSON.stringify(formData);
       alert('Form submitted successfully!');
    }
  };

  return (
    <Container>
      <h2 className="text-center mb-4">Create Order</h2>
      <Form>
        <Row className="g-4">
          <Col xs={12} md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="middleName">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Enter middle name"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="hireDate">
              <Form.Label>Hire Date</Form.Label>
              {/*me falta datapicker */}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Select
                options={selectData?.states || []}
                value={state}
                onChange={(selectedOption) => setState(selectedOption)}
                isInvalid={!!errors.state}
              />
              {errors.state && <div className="invalid-feedback d-block">{errors.state}</div>}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="zip">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter zip code"
                isInvalid={!!errors.zip}
              />
              <Form.Control.Feedback type="invalid">
                {errors.zip}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="cellPhone">
              <Form.Label>Cell Phone</Form.Label>
              <Form.Control
                type="text"
                value={cellPhone}
                onChange={(e) => setCellPhone(e.target.value)}
                placeholder="Enter cell phone"
                isInvalid={!!errors.cellPhone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cellPhone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="reNumber">
              <Form.Label>Re#</Form.Label>
              <Form.Control
                type="text"
                value={reNumber}
                onChange={(e) => setReNumber(e.target.value)}
                placeholder="Enter Re#"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Select
                options={selectData?.jobTitles || []}
                value={jobTitle}
                onChange={(selectedOption) => setJobTitle(selectedOption)}
                isInvalid={!!errors.jobTitle}
              />
              {errors.jobTitle && <div className="invalid-feedback d-block">{errors.jobTitle}</div>}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="workingStatus">
              <Form.Label>Working Status</Form.Label>
              <Form.Control
                as="select"
                value={workingStatus}
                onChange={(e) => setWorkingStatus(e.target.value)}
                isInvalid={!!errors.workingStatus}
              >
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
              </Form.Control>
              {errors.workingStatus && (
                <div className="invalid-feedback d-block">{errors.workingStatus}</div>
              )}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="reportsTo">
              <Form.Label>Reports To</Form.Label>
              <Form.Control
                as="select"
                value={reportsTo}
                onChange={(e) => setReportsTo(e.target.value)}
                isInvalid={!!errors.reportsTo}
              >
                <option value="manager1">Manager 1</option>
                <option value="manager2">Manager 2</option>
              </Form.Control>
              {errors.reportsTo && <div className="invalid-feedback d-block">{errors.reportsTo}</div>}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Select
                options={selectData?.departments || []}
                value={department}
                onChange={(selectedOption) => setDepartment(selectedOption)}
                isInvalid={!!errors.department}
              />
              {errors.department && <div className="invalid-feedback d-block">{errors.department}</div>}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="compensation">
              <Form.Label>Compensation</Form.Label>
              <Select
                options={selectData?.compensationOptions || []}
                value={compensation}
                onChange={(selectedOption) => setCompensation(selectedOption)}
                isInvalid={!!errors.compensation}
              />
              {errors.compensation && <div className="invalid-feedback d-block">{errors.compensation}</div>}
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Button variant="primary" onClick={handleSubmit} className="w-100">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateOrder;
