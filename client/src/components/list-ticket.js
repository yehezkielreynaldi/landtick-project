import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router';
import { UserContext } from '../context/userContext';
import { useContext, useEffect, useState } from 'react';
import NotifAddTicket from './notif-add-ticket';
import FormLogin from './login/Form';
import { API } from '../config/api';
import { useQuery } from "react-query"
import { useNavigate } from 'react-router-dom';



function ListTicket({ startStation, destinationStation, search }) {
    const [state] = useContext(UserContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const [show1, setShow1] = useState(false);

    // const handleClose1 = () => setShow1(false);
    // const handleShow1 = () => setShow1(true);

    const navigate = useNavigate();

    const [showModalNotif, setModalShowNotif] = useState(false);

    let { data: Tickets, refetch } = useQuery('ticketCache', async () => {
        const response = search ? (await API.get(`/filter-ticket?start_station_id=${startStation}&destination_station_id=${destinationStation}`)) :
            (await API.get("/tickets"))
        return response.data.data;
    });
    console.log(Tickets);

    const formatRupiah = (money) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,

        }).format(money);
    };

    const HandleBuy = async (id) => {


        try {
            if (state.isLogin) {
                setModalShowNotif(true);
                const response = await API.post(`/create-trans/${id}`);
                console.log(response);
                return response.data.data;
            } else {
                setShow(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refetch();
    }, [search]);

    return (
        <Container fluid style={{ height: "100%" }}>
            <Row className="list-judul-tiket">
                <Col><p className="judul1">Nama Kereta</p></Col>
                <Col><p className="judul2">Berangkat</p></Col>
                <Col><p className="judul3">Tiba</p></Col>
                <Col><p className="judul4">Durasi</p></Col>
                <Col><p className="judul5">Harga Per Orang</p></Col>
            </Row>
            <Row>
                {Tickets?.length === 0 ? (
                    <h1 className='text-center'>Tiket Kosong</h1>
                ) : (
                    Tickets?.map((item, index) => {
                        return (<Row>
                            <Card className="card-ticket" key={index} onClick={() => {
                                state.user.role === "admin" ? navigate("/") : HandleBuy(item.id)
                            }}>
                                <Card.Body>
                                    <Row className="baris1-ticket">

                                        <Col><p className="isi1"> {item?.name_train}</p></Col>

                                        <Col><p className="isi2">{item?.start_time}</p></Col>
                                        <Col><FontAwesomeIcon icon={faArrowRight} className="isi3" style={{ color: "#000000", }} /></Col>
                                        <Col><p className="isi4">{item?.arrival_time}</p></Col>
                                        <Col><p className="isi5">{(parseInt(item?.arrival_time) <= parseInt(item?.start_time)) ? (parseInt(item?.start_time) - parseInt(item?.arrival_time)) : (parseInt(item?.arrival_time) - parseInt(item?.start_time))} Jam</p></Col>
                                        <Col><p className="isi6">{formatRupiah(item?.price)}</p></Col>
                                    </Row>
                                    <Row>
                                        <Col><p className="detail-isi1">{item?.type_train}</p></Col>
                                        <Col><p className="detail-isi2">{item?.start_station?.name}</p></Col>
                                        <Col className="detail-isi3"></Col>
                                        <Col><p className="detail-isi4">{item?.destination_station?.name}</p></Col>
                                    </Row>
                                </Card.Body>
                            </Card></Row>)
                    }
                    )
                )
                }
            </Row>

            <Modal show={show} showLogin={setShow} onHide={handleClose}>
                {/* <Modal.Header closeButton> */}
                <Modal.Body> <FormLogin setShow={setShow} /></Modal.Body>

            </Modal>
            <NotifAddTicket showNotif={showModalNotif} showModalNotif={setModalShowNotif} />
        </Container>

    );
}

export default ListTicket;