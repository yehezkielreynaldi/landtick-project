import { Button, Card } from "react-bootstrap";
import logotiket from "../assets/img/train-facing-right 2.png"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useQuery } from "react-query";
// import moment from "moment";

function Ticket() {
    const navigate = useNavigate();
    const [state] = useContext(UserContext);

    let { data: myTicket } = useQuery("myTicketCachee", async () => {
        const response = await API.get("/order-user");
        return response.data.data;
    });
    console.log(myTicket);

    const handlePayment = async (id) => {
        try {
            const response = await API.get(`/get-idpayment/${id}`, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            })
            navigate(`/payment/${id}`)
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="ticket-warpper mb-5">
            <h3 className="judul-tiket">Tiket Saya</h3>
            {myTicket?.map((item, index) => (
                <Card key={index} className="kartu-tiket" style={{ cursor: "default" }}>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <div className="head-tiket">
                                        <Container>
                                            <Row>
                                                <Col><p className="tiket-land">LandTick</p>
                                                </Col>
                                                <Col> <img src={logotiket} width="40" height="40" className="logo-ticket" alt="logo-tiket" /></Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </Col>
                                <Col className="text-end"><h2 className="train-head">Kereta Api</h2>
                                    <p className="train-par text-secondary">{item?.ticket.start_date}</p></Col>
                            </Row>
                            <Row className="baris-tiket-1">
                                <Col><h5 className="kereta-tiket fw-bold ms-3">{item?.ticket.name_train}</h5></Col>
                                <Col><div className="icon-berangkat"></div></Col>
                                <Col><p className="jam-tiket">{item?.ticket.start_time}</p></Col>
                                <Col><p className="dari-tiket">{item?.ticket.start_station.kota}</p></Col>
                            </Row>
                            <Row>
                                <Col><p className="kelas-tiket ms-3">{item?.ticket.type_train}</p></Col>
                                <Col><div className="line-destination"></div></Col>
                                <Col><p className="tanggal-dari">{item?.ticket.start_date}</p></Col>
                                <Col><p className="lokasi-dari">{item?.ticket.start_station.name}</p></Col>
                            </Row>
                            <Row>
                                <Col>
                                    {item.status === "success" ? <Button variant="success" className="ms-3" style={{ cursor: "default" }}>{item?.status}</Button>
                                        : item.status === "pending" ? <Button variant="warning" className=" ms-3" style={{ cursor: "default" }}>{item?.status}</Button>
                                            : <Button variant="danger" className="ms-3" style={{ cursor: "default" }}>{item?.status}</Button>
                                    }
                                </Col>
                                <Col><div className="line-destination1"></div></Col>
                                <Col><p className="jam-sampai-tiket">{item?.ticket.arrival_time}</p></Col>
                                <Col><p className="sampai-tiket">{item?.ticket.destination_station.kota}</p></Col>
                            </Row>
                            <Row>
                                <Col><p className="tanggal-sampai">{item?.ticket.start_date}</p></Col>
                                <Col><p className="lokasi-sampai">{item?.ticket.destination_station.name}</p></Col>
                            </Row>
                            <Row>
                                <Col><p className="id-cust ms-3 mt-4">No. Tanda Pengenal</p></Col>
                                <Col><p className="name-cust mt-4">Nama Pemesan</p></Col>
                                <Col><p className="phone-cust mt-4">No. Handphone</p></Col>
                                <Col><p className="mail-cust mt-4">Email</p></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr className="line-card-ticket"></hr>
                                </Col>
                            </Row>
                            <Row>
                                <Col><p className="id-cust-p ms-3">{item?.id}</p></Col>
                                <Col><p className="name-cust-p">{state.user.username}</p></Col>
                                <Col><p className="phone-cust-p">{item?.user.no_hp}</p></Col>
                                <Col><p className="mail-cust-p">{item?.user.email}</p></Col>
                                <Col>
                                    {item.status === "success" ? <div></div>
                                        :
                                        (<Button variant="dark" className="btn-bayar-tiket" onClick={() => handlePayment(item.id)}>Bayar Sekarang</Button>)}
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            ))}
        </div>

    );
}

export default Ticket;