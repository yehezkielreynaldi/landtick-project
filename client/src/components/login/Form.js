import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useMutation } from 'react-query';
import { API, setAuthToken } from '../../config/api';

// import css modules
import cssModules from "../Form.module.css";
import { useContext, useState } from "react";
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

function FormLogin({ panggilFormLogin }) {

    const handleClose = () => panggilFormLogin(false)

    const [_, dispatch] = useContext(UserContext);

    const [form, setForm] = useState({
        username: '',
        password: '',
    });


    const navigate = useNavigate();



    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
            const response = await API.post("/login", form);
            console.log("ini response", response)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data.user,
            });
            setAuthToken(localStorage.token);
            console.log("login success : ", response);

            // Status check
            console.log(response);
            if (response.data.data.user?.role === "admin") {
                // Send data to useContext
                alert("Selamat Datang Admin")
                navigate("/admin");

            } else {
                alert("Selamat Datang User")
                navigate("/");
            }

        } catch (error) {
            console.log("login failed : ", error);
            console.log("error bos")
        }
    });
    console.log(handleSubmit)


    return (
        <Form onSubmit={(e) => handleSubmit.mutate(e)} className={cssModules.formGroup}>
            <h2 className={cssModules.judul}>LOGIN</h2>
            <Form.Group as={Row} className="mb-4">
                <Col sm="5">
                    <Form.Control className={cssModules.formControl} type="text" placeholder="Username" value={form.username}
                        name="username"
                        onChange={handleChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
                <Col sm="5">
                    <Form.Control className={cssModules.formControl} type="password" placeholder="Password" value={form.password}
                        name="password"
                        onChange={handleChange} />
                </Col>
            </Form.Group>


            <Button className="mt-4  button-login" type="submit" size="md">Login</Button>


        </Form >
    );
}

export default FormLogin;