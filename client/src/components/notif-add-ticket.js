import { Modal, ModalBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotifAddTicket({ showNotif, showModalNotif }) {
    const handleClose = () => showModalNotif(false);
    const navigate = useNavigate()

    function nav() {
        navigate("/ticket")
    }
    return (
        <>
            <Modal show={showNotif} onHide={handleClose}>
                <ModalBody>
                    <p className="text-center">
                        Tiket anda berhasil di tambahkan silahkan segera melakukan
                        pembayaran <span onClick={nav}>Klik <b style={{ cursor: "pointer" }}>disini</b></span></p>

                </ModalBody>
            </Modal >
        </>
    );
}
