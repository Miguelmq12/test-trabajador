import React, { useState } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './Information.css';

const InformationList: React.FC = () => {
  const [activities, setActivities] = useState([
    { id: 1, name: 'Personal Information', status: 'completed' },
    { id: 2, name: 'Digital Signature Content', status: 'pending' },
    { id: 3, name: 'Social Security card', status: 'completed' },
    { id: 4, name: 'Direct Deposit', status: 'pending' },
  ]);

  return (
    <Container>
      <h3 className="text-center mb-4">New Hire Check List</h3>
      <Row className="g-4">
        {activities.map((activity) => (
          <Col xs={12} md={6} key={activity.id}>
            <Card
              className={`activity-card ${activity.status}`}
              style={{
                backgroundColor: activity.status === 'completed' ? '#28a745' : '#ffffff',
                color: activity.status === 'completed' ? '#ffffff' : '#000000'
              }}
            >
              <Card.Body>
                <div className="activity-header">
                  <h5>{activity.name}</h5>
                  <div className="status-icon-container">
                    {activity.status === 'completed' ? (
                      <FaCheckCircle className="status-icon-ok" />
                    ) : (
                      <FaExclamationCircle className="status-icon-warning" />
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default InformationList;
