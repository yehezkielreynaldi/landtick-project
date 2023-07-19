import { Button, Card } from "react-bootstrap";
import logotiket from "../assets/img/train-facing-right 2.png"
import barcodeapprove from "../assets/img/qr-code 1.png"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

// Import Gambar
import barcode from '../assets/img/qr-code 1.png'
import whitetrain from "../assets/img/train-facing-right 2.png"
import card from "../assets/img/pass 1.png"
import clock from "../assets/img/clock 1.png"
import warning from "../assets/img/warning 1.png"


function TicketApprove() {
    // Modal Tiket Detail Admin
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);
    return (
        <div style={{ height: '90vh' }}>
            <h3 className="judul-tiket">Tiket Saya</h3>
            <Card className="kartu-tiket" style={{ cursor: "pointer" }} onClick={handleShowDetail}>
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
                                <p className="train-par text-secondary"><span className="fw-bold text-secondary">Saturday</span>, 21 Febuari 2020</p></Col>
                        </Row>
                        <Row className="baris-tiket-1">
                            <Col><h5 className="kereta-tiket fw-bold ms-3">Argo Wilis</h5></Col>
                            <Col><div className="icon-berangkat"></div></Col>
                            <Col><p className="jam-tiket">05.00</p></Col>
                            <Col><p className="dari-tiket">Jakarta (GMR)</p></Col>
                        </Row>
                        <Row>
                            <Col><p className="kelas-tiket ms-3">Eksekutif (H)</p></Col>
                            <Col><div className="line-destination"></div></Col>
                            <Col><p className="tanggal-dari">21 Febuari 2020</p></Col>
                            <Col><p className="lokasi-dari">Stasiun Gambir</p></Col>
                            <Col className="barisqr"><img src={barcodeapprove} className="qrcode-approve" width="100" height="100" alt="qrcode-approve" /></Col>
                        </Row>
                        <Row>
                            <Col><Button variant="success" className="btn-status-approve ms-3" style={{ cursor: "default" }}>Approve</Button>{' '}</Col>
                            <Col><div className="line-destination1"></div></Col>
                            <Col><p className="jam-sampai-tiket">10.05</p></Col>
                            <Col><p className="sampai-tiket">Surabaya (SBY)</p></Col>
                        </Row>
                        <Row>
                            <Col><p className="tanggal-sampai">21 Febuari 2020</p></Col>
                            <Col><p className="lokasi-sampai">Stasiun Surabaya</p></Col>
                        </Row>
                        <Row>
                            <Col className="baris-kodeqr"><p className="kodeqr">TCK0101</p></Col>
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
                            <Col><p className="id-cust-p ms-3">31175033003970001</p></Col>
                            <Col><p className="name-cust-p">Anto</p></Col>
                            <Col><p className="phone-cust-p">083896833112</p></Col>
                            <Col><p className="mail-cust-p">anto@gmail.com</p></Col>
                            <Col><Button variant="dark" className="btn-bayar-tiket bayar-approve">Bayar Sekarang</Button>{' '}</Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>


            <Modal show={showDetail} onHide={handleCloseDetail} className='modal-admin'>

                <div className="head-user-payment head-modal-tiket">
                    <Container>
                        <Row>
                            <Col>
                                <p className="user-head ms-4">LandTick</p>
                            </Col>
                            <Col>
                                <img src={whitetrain} className="white-train mb-2" alt="kereta-putih" width="40" height="40" />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Modal.Body>

                    <Container>
                        <Row>
                            <Col> <h3 className="fw-bold">E-TICKET</h3></Col>
                        </Row>
                        <Row>
                            <Col><p className="text-secondary kode-invoice">Kode Invoice : INV0101</p></Col>
                        </Row>
                        <Row>
                            <Col><h5 className='mt-4'>Kereta Api</h5></Col>
                            <Col><img src={barcode} alt='gambar-qr' width="130" height="130" className='gambar-qrdetail qr-modal' />
                                <p className='kode-qr kode-qr-modal'>TCK0101</p></Col>
                        </Row>
                        <Row>
                            <Col><p className="text-secondary date-detail date-detail-modal"><b>Saturday</b>, 21 Februari 2020</p></Col>
                        </Row>
                        <Row>
                            <Col><h5 className='mt-4'>Argo Wilis</h5></Col>
                        </Row>
                        <Row><Col><p className="kelas-detail">Eksekutif(H)</p></Col></Row>
                        <Row>
                            <Col><div className="icon-berangkat icon-scan icon-detail-ticket"></div></Col>
                            <Col><p className='fw-bold berangkat-detail'>05.00</p></Col>
                            <Col><p className='fw-bold berangkat-detail'>Jakarta (GMR)</p></Col>
                        </Row>
                        <Row>
                            <Col><div className="line-destination line-scan baris-detail"></div></Col>
                            <Col><p className='text-secondary berangkat-detail1'>21 Februari 2020</p></Col>
                            <Col><p className='text-secondary berangkat-detail1'>Stasiun Gambir</p></Col>
                        </Row>
                        <Row>
                            <Col><div className="line-destination1 line-scan1 icon-detail-ticket"></div></Col>
                            <Col><p className='fw-bold sampai-detail'>10.05</p></Col>
                            <Col><p className='fw-bold sampai-detail'>Surabaya (SBY)</p></Col>
                        </Row>
                        <Row>
                            <Col><p className='text-secondary sampai-detail1'>21 Februari 2020</p></Col>
                            <Col><p className='text-secondary sampai-detail1 detail2'>Stasiun Surabaya</p></Col>
                        </Row>


                        <hr className="garisb-modalt" />
                        <Row>
                            <Col><img src={card} alt="icon-pass" width="30" height="30" className="icon-pass" /></Col>
                            <Col><p className="desc-pass">Tunjukkan e-ticket dan identitas para penumpang saat checkin</p></Col>
                            <Col><img src={clock} alt="icon-clock" width="30" height="30" className="icon-clock" /></Col>
                            <Col><p className="desc-clock">Check-in paling lambat 90 menit sebelum keberangkatan</p></Col>
                            <Col><img src={warning} alt="icon-warning" width="30" height="30" className="icon-warning" /></Col>
                            <Col><p className="desc-warning">Waktu tertera adalah waktu stasiun setempat</p></Col>
                        </Row>

                        <hr className="garisb-modalt1" />


                        <Row className='invoice-detail'>
                            <Col><p>No. Tanda Pengenal</p></Col>
                            <Col><p>Nama Pemesan</p></Col>
                            <Col><p>No. Handphone</p></Col>
                            <Col><p>Email</p></Col>
                        </Row>


                        <Row className='isi-invoice-detail text-secondary'>
                            <Col><p>31175033003970001</p></Col>
                            <Col><p className='nama-admin'>Anto</p></Col>
                            <Col><p className='phone-admin'>083896833112</p></Col>
                            <Col><p className='email-admin'>anto@gmail.com</p></Col>
                        </Row>
                    </Container>




                </Modal.Body>
            </Modal>
        </div>

    );
}

export default TicketApprove;