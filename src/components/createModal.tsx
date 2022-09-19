import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BForm from "react-bootstrap/Form";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const styles = require('./createModal.module.css');


interface studentInfo {
    name: string,
    email: string,
    age: number,
}

function CreateModal(props) {
    console.log(props);
    const initialData: studentInfo = { name: "", email: "", age: 0 }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is Required!'),
        email: Yup.string()
            .email('Email is Required!')
            .required('email field is Required!'),
        age: Yup.number()
            .required('Age is Required!')
    });


    return (
        <div>
            <Modal
                show={props.showModal}
                onHide={() => props.setShowCreateModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Student Information
                    </Modal.Title>
                </Modal.Header>

                {/* <> */}
                <Modal.Body>
                    <Formik
                        initialValues={initialData}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            fetch(`/.netlify/functions/create`, {
                                method: "post",
                                body: JSON.stringify({ name: values.name, email: values.email, age: values.age }),
                            })
                            .then(response => response.json())
                            .then(data => {
                                props.setShowCreateModal(false)
                                props.setFetchData(val => !val)
                            })
                            .catch(e => {
                                alert("Could not add student")
                                props.setShowCreateModal(false);
                            })
                        }}
                    >
                            <Form className='form' autoComplete="off" >
                                <BForm.Group className="mb-2">
                                    <BForm.Label htmlFor="name" className="form-label">Name</BForm.Label>
                                    <Field className="form-control" id="exampleFormControlInput1" name="name" type="text"  as={BForm.Control} placeholder="Your Name..."/>
                                    <ErrorMessage name="name" >{(msg) => (
                                        <span className="text-danger">{msg}</span>
                                    )}</ErrorMessage>
                                </BForm.Group>
                                <BForm.Group className="mb-2">    
                                    <BForm.Label htmlFor="email" className="form-label">Email</BForm.Label>
                                    <Field className="form-control" id="exampleFormControlInput1" name="email" type="email" as={BForm.Control} placeholder="Email address..." />
                                    <ErrorMessage name="name" >{(msg) => (
                                        <span className="text-danger">{msg}</span>
                                    )}</ErrorMessage>
                                </BForm.Group>
                                <BForm.Group className="mb-2">
                                    <BForm.Label htmlFor="age" className="form-label">Age</BForm.Label>
                                    <Field className="form-control" id="exampleFormControlInput1" name="age" type="number" as={BForm.Control} />
                                    <ErrorMessage name="name" >{(msg) => (
                                        <span className="text-danger">{msg}</span>
                                    )}</ErrorMessage>
                                </BForm.Group>    
                                <Button type="submit" className={styles.submitButton}>Login</Button>
                            </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default CreateModal;