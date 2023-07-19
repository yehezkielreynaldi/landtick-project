import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";



function PricePayment() {
    let param = useParams();
    let id = parseInt(param.id)

    const formatRupiah = (money) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(money);
    };

    let { data: transaction } = useQuery("myTicketCache", async () => {
        const response = await API.get(`/transaction/${id}`);
        console.log("ini log response", response);
        return response.data.data;
    });
    const navigate = useNavigate();
    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);
    const handleBuy = useMutation(async () => {
        try {
            const response = await API.get(`/payments/${id}`);
            console.log("transaction success :", response)

            const token = response.data.data.token;
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/ticketApprove");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/ticket");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/ticket");
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log("transaction failed : ", error);
        }
    });

    return (
        <div>
            <p className="judul-payment judul-rincian">Rincian Harga</p>

            <Card className="container-card-attention card-harga">
                <Card.Body>
                    <Container>
                        <Row className="baris1-harga mt-3">
                            <Col>
                                <p>{transaction?.transaction.ticket.name_train} (Dewasa) x1</p>
                            </Col>
                            <Col><p className="ms-5">{formatRupiah(transaction?.transaction.ticket.price)}</p></Col>
                        </Row>
                        <Row className="baris2-harga">

                            <Col><p className="fw-bold ms-3 mt-2">Total</p></Col>
                            <Col><p className="fw-bolder ms-5 mt-2">{formatRupiah(transaction?.transaction.ticket.price)}</p></Col>
                        </Row>
                        <Row>
                            <Col><Button variant="dark" className="btn-bayar-tiket tiket-harga" onClick={() => handleBuy.mutate(id)}>Bayar Sekarang</Button>{' '}</Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
}

export default PricePayment;