import { Button, Modal } from 'react-bootstrap'

export default function DeleteData({ showDelete, handleCloseDelete, setConfirmDelete }) {

    const handleDelete = () => {
        setConfirmDelete(true)
    }

    return (
        <Modal show={showDelete} onHide={handleCloseDelete} centered>
            <Modal.Body className="text-dark">
                <div style={{ fontSize: '20px', fontWeight: '900' }}>
                    Delete Transaction
                </div>
                <div style={{ fontSize: '16px', fontWeight: '500' }} className="mt-2">
                    Are you sure you want to delete this Transaction?
                </div>
                <div className="text-end mt-5">
                    <Button onClick={handleDelete} size="sm" className="btn-success me-2" style={{ width: '135px' }}>Yes, Delete</Button>
                    <Button onClick={handleCloseDelete} size="sm" className="btn-danger" style={{ width: '135px' }}>No, Keep it</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
