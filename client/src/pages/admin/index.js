
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API } from "../../config/api";

import { useQuery, useMutation } from "react-query";
import DeleteData from "../../components/modal-delete";

import iconSearch from '../../assets/img/search 1.png';
import iconEdit from '../../assets/img/edit (1) 1.png';
import iconDelete from '../../assets/img/trash 1.png';
import barcode from '../../assets/img/qr-code 1.png'

import ModalDetail from '../../components/modal-detail';

// Import Gambar
import whitetrain from "../../assets/img/train-facing-right 2.png"

// Import Css Modules
import cssModules from "../../components/Form.module.css";

function PageAdmin() {
    // const navigate = useNavigate();

    // Modal Detail
    // const [showDetail, setShowDetail] = useState(false);
    // const handleCloseDetail = () => setShowDetail(false);
    // const handleShowDetail = () => setShowDetail(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Modal Delete
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);



    // Modal Tiket Detail Admin
    const [showDetail, setShowDetail] = useState(false);

    const [idTransaction, setIdTransaction] = useState();
    // const [showDetail, setShowDetail] = useState(false);
    // const handleCloseDetail = () => setShowDetail(false);
    // const handleShowDetail = () => setShowDetail(true);

    const navigate = useNavigate();
    const [state] = useContext(UserContext);

    // Variabel for delete product data
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShowDelete();
    };

    let { data: transactionList, refetch } = useQuery("allTansactionCache", async () => {
        const response = await API.get("/transactions");
        console.log("ini console response", response);
        return response.data.data.transaction;
    });
    console.log(transactionList);

    // If confirm is true, execute delete data
    const deleteById = useMutation(async (id) => {
        try {
            const response = await API.delete(`/transaction/${id}`);
            console.log(response);
            refetch();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        if (confirmDelete) {
            // Close modal confirm delete data
            handleCloseDelete();
            // execute delete data by id function
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
            // window.location.reload();
        }
    }, [confirmDelete]);




    return (
        <>
            <div style={{ height: '100%' }}>
                <h2 className='judul-list-transaksi'>List Transaksi</h2>
                <Container className='mb-5'>
                    <Row className='baris0-admin mt-5'>
                        <Col><p>No</p></Col>
                        <Col><p>Users</p></Col>
                        <Col><p>Tiket</p></Col>
                        <Col><p>Status Payment</p></Col>
                        <Col><p>Action</p></Col>
                    </Row>
                    {transactionList?.map((data, index) => (
                        <Row className="baris1-admin mt-3" key={data.id}>
                            <Col><p>{index + 1}</p></Col>
                            <Col><p>{data.user.name}</p></Col>
                            <Col><p>{data.ticket.start_station.name} - {data.ticket.destination_station.name}</p></Col>
                            <Col><p className="text-warning">{data.status === "pending" && <td style={{ color: "#FF9900" }}>{data.status}</td>}
                                {data.status === "success" && <td style={{ color: "#78A85A" }}>{data.status}</td>}
                                {data.status === "failed" && <td style={{ color: "#E83939" }}>{data.status}</td>}</p></Col>
                            <Col className='icon-sed'><img src={iconSearch} width="25" height="25" alt='icon-search' className='icon-search' onClick={() => { setShowDetail(true); setIdTransaction(data.id) }} />
                                <img src={iconEdit} width="25" height="25" alt='icon-edit' className='icon-edit ms-3' onClick={handleShow} />
                                <img onClick={() => handleDelete(data.id)} src={iconDelete} width="25" height="25" alt='icon-delete' className='icon-delete ms-3' />
                            </Col>
                        </Row>
                    ))}
                </Container>
                <Modal show={show} onHide={handleClose}>
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
                    <Modal.Body> <Form className={cssModules.formGroup}>
                        <Form.Group as={Row} className="mb-4">
                            <Col sm="5">
                                <Form.Control className={cssModules.formControl} type="text" placeholder="1" disabled />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4">
                            <Col sm="5">
                                <Form.Control className={cssModules.formControl} type="text" placeholder="Anto" disabled />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4">
                            <Col sm="5">
                                <Form.Control className={cssModules.formControl} type="text" placeholder="Surabaya - Jakarta" disabled />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4">
                            <Col sm="5">
                                <Form.Control className={cssModules.formControl} type="text" placeholder="bca.jpg" disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4">
                            <Col sm="5">
                                <Form.Select className={cssModules.formControl} type="text" placeholder="">
                                    <option>Approve</option>
                                    <option>Reject</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>


                        <Button className="mt-4  button-daftar button-save" size="md">Save</Button>{' '}
                    </Form ></Modal.Body>
                </Modal>



                {/* <Modal show={showDetail} onHide={handleCloseDetail} className='modal-admin'>
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
                                <Col><p className="text-secondary date-detail"><b>Saturday</b>, 21 Februari 2020</p></Col>
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

                            <hr className='garis-detail' />

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

                            <hr className='garis-detail' />

                            <Row className='invoice-price'>
                                <Col><h4>Total</h4></Col>
                                <Col><h4 className='text-danger text-end'>Rp.250.000</h4></Col>
                            </Row>
                        </Container>




                    </Modal.Body>
                </Modal>
 */}

            </div>
            <ModalDetail showModalDetail={showDetail} id={idTransaction} setShowModalDetail={setShowDetail} />
            <DeleteData setConfirmDelete={setConfirmDelete} showDelete={showDelete} handleCloseDelete={handleCloseDelete} />
        </>
    );
}

export default PageAdmin;