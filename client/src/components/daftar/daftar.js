import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useMutation } from 'react-query';
import { API } from '../../config/api'

// import css modules
import cssModules from "../Form.module.css";

function FormDaftar() {
    const title = "Register";
    document.title = "Landtick | " + title;

    const [form, setForm] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        gender: "",
        no_hp: "",
        address: ""
    });

    const { fullname, username, email, password, gender, no_hp, address } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const response = await API.post("/register", form);

            console.log("Register success : ", response);



            setForm({
                fullname: "",
                username: "",
                email: "",
                password: "",
                gender: "",
                no_hp: "",
                address: ""
            });
        } catch (error) {

            console.log("Register failed : ", error);
        }
    });
    return (
        <Form className={cssModules.formGroup} onSubmit={(e) => handleSubmit.mutate(e)}>
            <h2 className={cssModules.judul}>Daftar</h2>
            <Form.Group as={Row} className="mb-4">
                <Col sm="5">
                    <Form.Control className={cssModules.formControl} type="text" placeholder="Nama Lengkap" value={fullname}
                        name="fullname"
                        onChange={handleChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
                <Col sm="5">
                    <Form.Control className={cssModules.formControl} type="text" placeholder="Username" value={username}
                        name="username"
                        onChange={handleChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
                <Col sm="5">
                    <Form.Control className={cssModules.formControl} type="email" placeholder="Email" value={email}
                        name="email"
                        onChange={handleChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
                <Col sm="5">
                    <Form.Control className={cssModules.formControl} type="password" placeholder="Password" value={password}
                        name="password"
                        onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-4">
                <Col sm="5">
                    <Form.Select className={cssModules.formControl} aria-label="Default select example" value={gender}
                        name="gender"
                        onChange={handleChange}>
                        <option hidden>Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-4" >
                <Col sm="5">
                    <Form.Control className={cssModules.formControl} type="number" placeholder="Telp" value={no_hp}
                        name="no_hp"
                        onChange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-4">
                <Col sm="5">
                    <Form.Control as="textarea" className={cssModules.formControl} rows={3} placeholder="Alamat" value={address}
                        name="address"
                        onChange={handleChange} />
                </Col>
            </Form.Group>


            <Button type="submit" className="mt-4  button-daftar" size="md">Daftar</Button>{' '}
        </Form >
    );
}

export default FormDaftar;