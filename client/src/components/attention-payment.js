import { Card, Col, Container, Row } from "react-bootstrap";
import logoattention from "../assets/img/error 1.png"


function Attention() {
    return (
        <div>
            <p className="judul-payment">Invoice</p>

            <Card className="container-card-attention">
                <Card.Body>
                    <Container>
                        <Row>
                            <Col><img src={logoattention} className="logo-attention" width="40" height="40" alt="attention-logo" /></Col>
                            <Col><div className="isi-attention">
                                <p>Silakan melakukan pembayaran melalui Payment Gateway dengan credit card dengan cara :</p>
                                <p>Klik Button Bayar Sekarang</p>
                            </div></Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>

        </div>

    );
}

export default Attention;