import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { API } from '../config/api';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
function AddTicket() {
    // const navigate = useNavigate();

    // Store Data Ticket

    const navigate = useNavigate();
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

    const { data: stations } = useQuery("ticketCache", async () => {
        try {
            const response = await API.get("/stations")
            return response.data.data.stations
        } catch (error) {
            console.log(error);
        }
    })

    console.log(stations)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // store data with formdata
            const formData = new FormData();
            formData.set("name_train", form.name_train);
            formData.set("type_train", form.type_train);
            formData.set("start_date", form.start_date);
            formData.set("start_station_id", form.start_station_id);
            formData.set("start_time", form.start_time);
            formData.set("destination_station_id", form.destination_station_id);
            formData.set("arrival_time", form.arrival_time);
            formData.set("price", form.price);
            formData.set("qty", form.qty);

            // insert ticket data
            const response = await API.post("/ticket", formData);
            console.log("Add Ticket Success : ", response);
            setForm({
                name_train: "",
                type_train: "",
                start_date: "",
                start_station_id: "",
                start_time: "",
                destination_station_id: "",
                arrival_time: "",
                price: "",
                qty: "",
            });

            navigate("/admin");
        } catch (error) {
            console.log("Add Ticket Failed : ", error);
        }
    });

    return (
        <div style={{ height: '90vh' }}>
            <h3 className="title-addticket">Tambah Tiket</h3>
            <Form className='form-add-ticket' onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group className="mb-3" controlId="formBasicTrainName">
                    <Form.Control type="text" placeholder="Nama Kereta" name="name_train" onChange={handleChange} value={form.name_train} />
                </Form.Group>

                <Form.Select aria-label="Default select example" className="mb-3" name="type_train" onChange={handleChange} value={form.type_train}>
                    <option hidden>Jenis Kereta</option>
                    <option value="Ekonomi">Ekonomi</option>
                    <option value="Bisnis">Bisnis</option>
                    <option value="Eksekutif">Eksekutif</option>
                </Form.Select>

                <Form.Group className="mb-3" controlId="formBasicDepartureDate">
                    <Form.Control type="text" placeholder="Tanggal Keberangkatan" name="start_date" onChange={handleChange} value={form.start_date} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDepartureStation">
                    <Form.Select name="start_station_id" onChange={handleChange} value={form.start_station_id}>
                        <option hidden>Stasiun Keberangkatan</option>
                        {stations?.map((item) => (
                            <option key={item.id} value={item?.id}>
                                {item.name}
                            </option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDepartureHour">
                    <Form.Control type="text" placeholder="Jam Keberangkatan" name="start_time" onChange={handleChange} value={form.start_time} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDestinationStation">
                    <Form.Select name="destination_station_id" onChange={handleChange} value={form.destination_station_id}>
                        <option hidden>Stasiun Tujuan</option>
                        {stations?.map((item) => (
                            <option key={item.id} value={item?.id}>
                                {item.name}
                            </option>))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicArrivedHour">
                    <Form.Control type="text" placeholder="Jam Tiba" name="arrival_time" onChange={handleChange} value={form.arrival_time} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDepartureStation">
                    <Form.Control type="text" placeholder="Harga Tiket" name="price" onChange={handleChange} value={form.price} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicQty">
                    <Form.Control type="text" placeholder="Qty" name="qty" onChange={handleChange} value={form.qty} />
                </Form.Group>

                <Button variant="success" type="submit" className="button-save-add">
                    Save
                </Button>
            </Form>
        </div>

    );
}

export default AddTicket;