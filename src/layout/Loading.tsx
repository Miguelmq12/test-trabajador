import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <Spinner animation="border" role="status" variant="primary" />
        <div className="mt-3">
          <h5>Loading, please wait...</h5>
        </div>
      </div>
    </div>
  );
};

export default Loading;