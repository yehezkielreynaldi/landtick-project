import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import jumbo1 from '../assets/img/jumbo1.jpeg'

function Jumbotron() {
    return (
        <Container fluid className="container-jumbo">
            <Row>
                <Col><h2 className="judul-jumbo jumbo-left">Selamat Pagi, Ticket Seekers !</h2>
                </Col>
                <Col><div className="gambar2-jumbo object-fit-cover"></div>
                    <div className="gambar1-jumbo object-fit-cover"></div>
                </Col>

            </Row>
            <Row> <Col><p className="paragraph1-jumbo jumbo-left">Ingin Pulkam dengan Good Deal ?</p></Col></Row>
            <Row> <Col><p className="paragraph2-jumbo jumbo-left">Masuk atau Daftar Sekarang ! !</p></Col></Row>
        </Container >



    );
}

export default Jumbotron;