import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/img/train.png'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import avauser from '../../assets/img/boy 1.png'
import picticket from '../../assets/img/ticket 1.png'
import bill from '../../assets/img/bill 1.png'
import piclogout from '../../assets/img/logout 1.png'
// import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


function NavBarUser() {
    return (
        <>
            <Navbar className="bg-body-black bg-white navbar ">
                <Container>
                    <Navbar.Brand href="#home">
                        <Row>
                            <Col>
                                <h3 className="judul-logo-user">LandTick</h3>
                            </Col>
                            <Col><img
                                alt="woi"
                                src={logo}
                                width="60"
                                height="40"
                                className="d-inline-block align-top logo-nav-user object-fit-cover"
                            />{' '}</Col>

                            <Col><p className="username-nav">Anto</p></Col>
                            <Col> <Dropdown as={ButtonGroup} className="dropdown-user">


                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="dropdown-toggle-user" />

                                <Dropdown.Menu className="menu-dropdown-user">
                                    <Dropdown.Item href="#/action-1"><img src={picticket} alt="logo-tiket" width="30" height="30" className="logo-tiket" /> Tiket Saya</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2"><img src={bill} alt="logo-bill" width="30" height="30" className="logo-bill" /> Payment</Dropdown.Item>
                                    <Dropdown.Divider className="divider-line" />
                                    <Dropdown.Item href="#/action-3"><img src={piclogout} alt="logo-logout" width="27" height="27" className="logo-logout ms-1" /> Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> <div className="avauser"><img src={avauser} className="foto-user object-fit-cover" alt="foto-user" id="dropdown-split-basic" /></div></Col>
                        </Row>


                    </Navbar.Brand>
                </Container>
            </Navbar >
        </>
    );
}

export default NavBarUser;