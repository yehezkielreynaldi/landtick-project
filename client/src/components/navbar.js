import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/img/train.png'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

import FormLogin from "./login/Form";
import FormDaftar from "./daftar/daftar";
import { UserContext } from '../context/userContext';

import addicon from '../assets/img/more 1.png'
import avauser from '../assets/img/boy 1.png'
import picticket from '../assets/img/ticket 1.png'
import bill from '../assets/img/bill 1.png'
import piclogout from '../assets/img/logout 1.png'
// import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function NavBar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);


    // Untuk Close Login dan munculkan signup
    const changeModalToSignUp = () => {
        handleClose();
        handleShow1(true);
    }

    // Untuk Close signup dan munculkan Login
    const changeModalToLogIn = () => {
        handleClose1();
        handleShow(true);
    }



    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    const logout = () => {
        dispatch({
            type: "LOGOUT_SUCCESS",
        });
    };

    return (
        <>
            <Navbar className="bg-body-black bg-white navbar ">
                <Container>
                    <Navbar.Brand>
                        <Row>
                            {state.isLogin === true ? (
                                state.user?.role === "admin" ? (
                                    <>
                                        <Col>
                                            <h3 className="judul-logo mt-2" onClick={() => { navigate("/admin") }}>LandTick</h3>
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <Col>
                                            <h3 className="judul-logo mt-2" onClick={() => { navigate("/admin") }}>LandTick</h3>
                                        </Col>
                                    </>
                                )) : (
                                <Col>
                                    <h3 className="judul-logo mt-2" onClick={() => { navigate("/") }}>LandTick</h3>
                                </Col>
                            )}

                            {state.isLogin === true ? (
                                state.user?.role === "admin" ? (
                                    <>
                                        <Col><img
                                            alt="woi"
                                            src={logo}
                                            width="60"
                                            height="40"
                                            className="d-inline-block align-top logo-nav object-fit-cover mt-2" onClick={() => { navigate("/admin") }}
                                        /></Col>
                                    </>
                                ) : (
                                    <>
                                        <Col><img
                                            alt="woi"
                                            src={logo}
                                            width="60"
                                            height="40"
                                            className="d-inline-block align-top logo-nav object-fit-cover mt-2" onClick={() => { navigate("/admin") }}
                                        /></Col>
                                    </>
                                )) : (
                                <>
                                    <Col><img
                                        alt="woi"
                                        src={logo}
                                        width="60"
                                        height="40"
                                        className="d-inline-block align-top logo-nav object-fit-cover mt-2" onClick={() => { navigate("/admin") }}
                                    /></Col>
                                </>
                            )
                            }

                            {/* condition login when admin : user : not logged in */}

                            {state.isLogin === true ? (
                                state.user?.role === "admin" ? (
                                    <>
                                        <Col><p className="username-nav">{state.user.username}</p></Col>
                                        <Col> <Dropdown as={ButtonGroup} className="dropdown-user">


                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="dropdown-toggle-user" />

                                            <Dropdown.Menu className="menu-dropdown-user">
                                                <Dropdown.Item onClick={() => { navigate("/add-ticket-admin") }}><img src={addicon} alt="logo-tiket" width="25" height="25" className="logo-tiket me-1" /> Tambah Tiket</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { navigate("/add-station") }}><img src={addicon} alt="logo-tiket" width="25" height="25" className="logo-tiket me-1" /> Tambah Stasiun</Dropdown.Item>
                                                <Dropdown.Divider className="divider-line" />
                                                <Dropdown.Item onClick={logout} href="/"><img src={piclogout} alt="logo-logout" width="27" height="27" className="logo-logout ms-1" /> Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> <div className="avauser"><img src={avauser} className="foto-user object-fit-cover" alt="foto-user" id="dropdown-split-basic" /></div></Col>
                                    </>

                                ) : (
                                    <>
                                        {/* <p className="mt-3 me-2"></p> */}
                                        <Col><p className="username-nav">{state.user.username}</p></Col>
                                        <Col> <Dropdown as={ButtonGroup} className="dropdown-user">


                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="dropdown-toggle-user" />

                                            <Dropdown.Menu className="menu-dropdown-user">
                                                <Dropdown.Item onClick={() => { navigate("/ticket") }} href="#/action-1"><img src={picticket} alt="logo-tiket" width="30" height="30" className="logo-tiket" /> Tiket Saya</Dropdown.Item>
                                                {/* <Dropdown.Item onClick={() => { navigate("/payment") }} href="#/action-2"><img src={bill} alt="logo-bill" width="30" height="30" className="logo-bill" /> Payment</Dropdown.Item> */}
                                                <Dropdown.Divider className="divider-line" />
                                                <Dropdown.Item onClick={logout} href="#/action-3"><img src={piclogout} alt="logo-logout" width="27" height="27" className="logo-logout ms-1" /> Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> <div className="avauser"><img src={avauser} className="foto-user object-fit-cover" alt="foto-user" id="dropdown-split-basic" /></div></Col>
                                    </>
                                )
                            ) : (
                                <><Col>
                                    <Button variant="outline-danger" className="button-regist right mt-1" onClick={handleShow1}>Daftar</Button>
                                </Col>
                                    <Col>
                                        <Button variant="light" className="button-log-in right mt-1" onClick={handleShow}>Login</Button>
                                    </Col></>
                            )

                            }
                        </Row>






                        <Modal show={show} onHide={handleClose}>
                            {/* <Modal.Header closeButton> */}
                            <Modal.Body> <FormLogin setShow={setShow} />
                                <p className="text-center mt-3 text-body-secondary">Belum Punya Akun ? Klik <b style={{ cursor: "pointer" }} onClick={changeModalToSignUp}>disini</b></p>
                            </Modal.Body>

                        </Modal>

                        <Modal show={show1} onHide={handleClose1}>
                            <Modal.Body><FormDaftar />
                                <p className="text-center mt-3 text-body-secondary">Sudah Punya Akun ? Klik <b style={{ cursor: "pointer" }} onClick={changeModalToLogIn}>disini</b></p>
                            </Modal.Body>

                        </Modal>

                    </Navbar.Brand>
                </Container>
            </Navbar >
        </>
    );
}

export default NavBar;