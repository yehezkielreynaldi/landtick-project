import { Card, Col, Container, Row } from "react-bootstrap";
import qrscan from "../assets/img/qr-code 1.png"
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";




function ScanPayment() {
    let param = useParams();
    let id = parseInt(param.id)
    let { data: transaction } = useQuery("myTicketCache", async () => {
        const response = await API.get(`/transaction/${id}`);
        console.log("ini log response", response);
        return response.data.data;
    });
    return (
        <div>
            <Card className="container-tiket-scan">
                <Card.Body>
                    <Container>
                        <div className="baris1-scan">

                            <Row>
                                <Col><h2 className="ms-4 mt-4 fw-bold text-black">Kereta Api</h2></Col>
                                <Col><img src={qrscan} className="gambar-qrscan mt-3" alt="qrscan" width="60" height="60" /></Col>
                            </Row>
                            <Row>
                                <Col><p className="date-scan ms-4">{transaction?.transaction.ticket.start_date}</p></Col>
                                <Col><p className="codeqr-scan">INV0101</p></Col>
                            </Row>
                        </div>
                        <Row>
                            <Col><h4 className="nama-scan">{transaction?.transaction.ticket.name_train}</h4></Col>
                        </Row>
                        <Row>
                            <Col><p className="kelas-scan">{transaction?.transaction.ticket.type_train}</p></Col>
                        </Row>
                        <Row>
                            <Col xs={2}><div className="icon-berangkat icon-scan"></div></Col>
                            <Col xs={4}><p className="fw-bold">{transaction?.transaction.ticket.start_time}</p></Col>
                            <Col><p className="fw-bold">{transaction?.transaction.ticket.start_station.kota}</p></Col>
                        </Row>
                        <Row>
                            <Col xs={2}><div className="line-destination line-scan"></div></Col>
                            <Col xs={4}><p className="date1-scan">{transaction?.transaction.ticket.start_date}</p></Col>
                            <Col><p className="date1-scan">{transaction?.transaction.ticket.start_station.name}</p></Col>
                        </Row>
                        <Row>
                            <Col xs={2}><div className="line-destination1 line-scan1"></div></Col    >
                            <Col xs={4}><p className="baris3-scan fw-bold">{transaction?.transaction.ticket.arrival_time}</p></Col>
                            <Col><p className="baris3-scan fw-bold">{transaction?.transaction.ticket.destination_station.kota}</p></Col>
                        </Row>
                        <Row>
                            <Col xs={7}><p className="date2-scan">{transaction?.transaction.ticket.start_date}</p></Col>
                            <Col><p className="date3-scan">{transaction?.transaction.ticket.destination_station.name}</p></Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ScanPayment;