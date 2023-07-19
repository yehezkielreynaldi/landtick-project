import { Card, Col, Container, Row } from "react-bootstrap";
import whitetrain from "../assets/img/train-facing-right 2.png"
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";



function UserPayment() {
    let param = useParams();
    let id = parseInt(param.id)

    let { data: transaction } = useQuery("myTicketCache", async () => {
        const response = await API.get(`/transaction/${id}`);
        console.log("ini log response", response);
        return response.data.data;
    });
    return (
        <div>
            <Card className="container-card-user">
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <div className="head-user-payment">
                                    <Container>
                                        <Row>
                                            <Col>
                                                <p className="user-head ms-2">LandTick</p>
                                            </Col>
                                            <Col><img src={whitetrain} className="white-train" alt="kereta-putih" width="40" height="40" /></Col>
                                        </Row>
                                    </Container>
                                </div>
                            </Col>
                        </Row>
                        <Row className="baris-user mt-5">
                            <Col><p>No. Tanda Pengenal</p></Col>
                            <Col><p>Nama Pemesan</p></Col>
                            <Col><p>No. Handphone</p></Col>
                            <Col><p>Email</p></Col>
                        </Row>
                        <Row>
                            <Col><hr className="line-user" /></Col>
                        </Row>
                        <Row className="baris-user1">
                            <Col><p>{transaction?.transaction.user.id}</p></Col>
                            <Col><p>{transaction?.transaction.user.name}</p></Col>
                            <Col><p>{transaction?.transaction.user.no_hp}</p></Col>
                            <Col><p>{transaction?.transaction.user.email}</p></Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
}

export default UserPayment;