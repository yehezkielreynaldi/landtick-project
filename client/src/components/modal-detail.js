import { Col, Container, Modal, Row } from "react-bootstrap";
import whitetrain from "../assets/img/train-facing-right 2.png"
import barcode from '../assets/img/qr-code 1.png'
import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";


export default function ModalDetail({ showModalDetail, setShowModalDetail, id }) {
    const handleCloseDetail = () => setShowModalDetail(false);
    let { data: transaction } = useQuery(["transaction", id], async () => {
        const response = await API.get(`/transaction/${id}`);
        console.log("ini response t.id", response);
        return response.data.data;
    });

    const formatRupiah = (money) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(money);
    };


    return (
        <Modal show={showModalDetail} onHide={handleCloseDetail} className='modal-admin'>
            <Modal.Header closeButton>
                <Modal.Title><div className="head-user-payment">
                    <Container>
                        <Row>
                            <Col>
                                <p className="user-head ms-2">LandTick</p>
                            </Col>
                            <Col>
                                <img src={whitetrain} className="white-train mb-2" alt="kereta-putih" width="40" height="40" />
                            </Col>
                        </Row>
                    </Container>
                </div></Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Container>
                    <Row>
                        <Col> <h3>INVOICE</h3></Col>
                    </Row>
                    <Row>
                        <Col><p className="text-secondary">Kode Invoice : INV0101</p></Col>
                    </Row>
                    <Row>
                        <Col><h5 className='mt-4'>Kereta Api</h5></Col>
                        <Col><img src={barcode} alt='gambar-qr' width="50" height="50" className='gambar-qrdetail' />
                            <p className='kode-qr'>TCK0101</p></Col>
                    </Row>
                    <Row>
                        <Col><p className="text-secondary date-detail">{transaction?.transaction.ticket.start_date}</p></Col>
                    </Row>
                    <Row>
                        <Col><h5 className='mt-4'>{transaction?.transaction.ticket.name_train}</h5></Col>
                    </Row>
                    <Row><Col><p className="kelas-detail">{transaction?.transaction.ticket.type_train}</p></Col></Row>
                    <Row>
                        <Col><div className="icon-berangkat icon-scan icon-detail-ticket"></div></Col>
                        <Col><p className='fw-bold berangkat-detail'>{transaction?.transaction.ticket.start_time}</p></Col>
                        <Col><p className='fw-bold berangkat-detail'>{transaction?.transaction.ticket.start_station.kota}</p></Col>
                    </Row>
                    <Row>
                        <Col><div className="line-destination line-scan baris-detail"></div></Col>
                        <Col><p className='text-secondary berangkat-detail1'>{transaction?.transaction.ticket.start_date}</p></Col>
                        <Col><p className='text-secondary berangkat-detail1'>{transaction?.transaction.ticket.start_station.name}</p></Col>
                    </Row>
                    <Row>
                        <Col><div className="line-destination1 line-scan1 icon-detail-ticket"></div></Col>
                        <Col><p className='fw-bold sampai-detail'>{transaction?.transaction.ticket.arrival_time}</p></Col>
                        <Col><p className='fw-bold sampai-detail'>{transaction?.transaction.ticket.destination_station.kota}</p></Col>
                    </Row>
                    <Row>
                        <Col><p className='text-secondary sampai-detail1'>{transaction?.transaction.ticket.start_date}</p></Col>
                        <Col><p className='text-secondary sampai-detail1 detail2'>{transaction?.transaction.ticket.destination_station.name}</p></Col>
                    </Row>

                    <hr className='garis-detail' />

                    <Row className='invoice-detail'>
                        <Col><p>No. Tanda Pengenal</p></Col>
                        <Col><p>Nama Pemesan</p></Col>
                        <Col><p>No. Handphone</p></Col>
                        <Col><p>Email</p></Col>
                    </Row>
                    <Row className='isi-invoice-detail text-secondary'>
                        <Col><p>31175033003970001</p></Col>
                        <Col><p className='nama-admin'>{transaction?.transaction.user.name}</p></Col>
                        <Col><p className='phone-admin'>{transaction?.transaction.user.no_hp}</p></Col>
                        <Col><p className='email-admin'>{transaction?.transaction.user.email}</p></Col>
                    </Row>

                    <hr className='garis-detail' />

                    <Row className='invoice-price'>
                        <Col><h4>Total</h4></Col>
                        <Col><h4 className='text-danger text-end'>{formatRupiah(transaction?.transaction.ticket.price)}</h4></Col>
                    </Row>
                </Container>




            </Modal.Body>
        </Modal>


    )
}