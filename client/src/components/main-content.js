import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Card from 'react-bootstrap/Card';
import train from '../assets/img/train-menu.png'
import datatf from '../assets/img/icons8-data-transfer-100 1.png'
import { API } from '../config/api';
import { useEffect, useState } from 'react';
import ListTicket from './list-ticket';


function MainContent() {
    const [stations, setStations] = useState([])
    const getStations = async () => {
        try {
            const response = await API.get("/stations")
            setStations(response.data.data.stations)
        } catch (error) {
            console.log(error);
        }
    }

    const [form, setForm] = useState({
        name_train: "",
        type_train: "",
        start_date: "",
        start_station_id: "",
        start_time: "",
        destination_station_id: "",
        arrival_time: "",
        price: "",
        qty: "",
    })
    console.log(form);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    // Filter
    const [search, setSearch] = useState(false)
    const handleClick = (e) => {
        e.preventDefault()
        form.start_station_id === '' && form.destination_station_id === '' ? setSearch(false) : setSearch(true)
    }

    useEffect(() => {
        getStations();
    }, []);
    return (
        <Container className="container-main-content">

            <Row>


                <Col>
                    <div className="left-content-container">
                        <Row className="menu-train">
                            <Col><div className="garis-menu"></div></Col>
                            <Col>
                                <img src={train} width="30"
                                    height="30" alt="menu-train" className="gambar-kereta" />
                                <p className="desc-menu">Tiket Kereta Api</p>
                            </Col>



                        </Row>
                    </div>
                </Col>
                <Col><div className="right-content-container">
                    <Row>
                        <p className="judul-right mt-3">Tiket Kereta Api</p>
                    </Row>
                    <Row className="asal-tujuan">
                        <Col><p>Asal</p></Col>
                        <Col><p className="tujuan">Tujuan</p></Col>
                    </Row>

                    <Row className="input-asal-tujuan">
                        <Col><Form.Select name="start_station_id" className='control-asal' onChange={handleChange} value={form.start_station_id}>
                            <option hidden>Stasiun Keberangkatan</option>
                            {stations?.map((item) => (
                                <option key={item.id} value={item?.id}>
                                    {item.name}
                                </option>))}
                        </Form.Select></Col>
                        <Col><Button variant="dark" className="btn-data-tf"><img width="30"
                            height="30" src={datatf} alt="icon-data-tf" className="icon-datatf" /></Button>{' '}</Col>
                        <Col><Form.Select name="destination_station_id" className='control-tujuan' onChange={handleChange} value={form.destination_station_id}>
                            <option hidden>Stasiun Tujuan</option>
                            {stations?.map((item) => (
                                <option key={item.id} value={item?.id}>
                                    {item.name}
                                </option>))}
                        </Form.Select>
                        </Col>
                    </Row>

                    <Row className="label-content2">
                        <Col><p className="label-berangkat">Tanggal Berangkat</p></Col>

                        <Col> <Form>
                            {['checkbox'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                    <Form.Check // prettier-ignore
                                        type={type}
                                        id={`default-${type}`}
                                        label={`Pulang Pergi`}
                                        className="check-pp"
                                    />
                                </div>
                            ))}
                        </Form></Col>
                        <Col><p className="label-dewasa">Dewasa</p></Col>
                        <Col><p className="label-bayi">Bayi</p></Col>
                    </Row>

                    <Row className="input-content2">
                        <Col><Form.Control type="date" placeholder="Input Date Please" className="date-content" /></Col>
                        <Col></Col>
                        <Col>
                            <Form.Select className='select-dewasa'>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Form.Select></Col>

                        <Col>
                            <Form.Select className='select-dewasa select-bayi'>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Form.Select></Col>
                        <Col><Button type="submit" variant="dark" className="btn-cari-tiket" onClick={handleClick}>Cari Tiket</Button>{' '}</Col>
                    </Row>


                </div>
                </Col>



            </Row >
            <ListTicket startStation={form.start_station_id} destinationStation={form.destination_station_id} search={search} />
        </Container >



    );
}

export default MainContent;