import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useStores } from '../stores/store';
import { observer } from 'mobx-react-lite';

const Sidebar = () => {
    const {userStore} = useStores();

    return (
        <div className="d-flex flex-column vh-100 bg-dark text-light p-3 position-fixed" style={{ width: '250px' }}>
            <h4 className="text-center text-light">Billing Application</h4>
            <Nav className="flex-column mt-4" variant="pills" defaultActiveKey="/home">
                <LinkContainer to="/adp">
                    <Nav.Link className="text-light">Adp Ids</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/minimum-wages">
                    <Nav.Link className="text-light">Minimum Wages</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/mileage-rate">
                    <Nav.Link className="text-light">Mileage rate</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/employee">
                    <Nav.Link className="text-light">Employee</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/holiday">
                    <Nav.Link className="text-light">Holiday</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/order-new">
                    <Nav.Link className="text-light">New Order</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/information">
                    <Nav.Link className="text-light">Checklist Information</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/personal-information">
                    <Nav.Link className="text-light">Personal Information</Nav.Link>
                </LinkContainer>
                
                
                <LinkContainer to="/login">
                    <Nav.Link className="text-light" onClick={userStore.logout}>Logout</Nav.Link>
                </LinkContainer>
            </Nav>
        </div>
    );
};

export default observer(Sidebar);
