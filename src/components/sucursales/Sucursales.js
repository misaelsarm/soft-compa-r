import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig';
import { loadEmpleados } from '../../helpers/loadEmpleados';
import { loadSucursales } from '../../helpers/sucursales';
import { Sucursal } from './Sucursal';

export const Sucursales = () => {

    const [visible, setVisible] = useState(false)
    const [admins, setAdmins] = useState([])
    const [selected, setSelected] = useState(false)
    const [current, setCurrent] = useState({})


    const [form] = Form.useForm()

    const handleCancel = () => {
        setVisible(false)
        form.resetFields();
        setSelected(false)
    }

    console.log('sucursales')
    const [sucursales, setSucursales] = useState([])
    useEffect(() => {
        loadSucursales().then((data) => {
            setSucursales(data)
            console.log(data)
        })

        loadEmpleados().then((data) => {
            setAdmins(data)
        })

    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Sucursales</h2>
                <Button onClick={() => { setVisible(true) }} type="primary">Agregar sucursal</Button>
            </div>
            <div className="sucursales-grid">
                {
                    sucursales.map((sucursal) => (
                        <Sucursal

                            setCurrent={setCurrent}
                            setSelected={setSelected}
                            sucursalRecord={sucursal}
                            form={form}
                            visible={visible}
                            setVisible={setVisible}
                            setSucursales={setSucursales}
                            sucursales={sucursales}
                            {...sucursal} />
                    ))
                }
            </div>

            <Modal
                visible={visible}
                centered
                onCancel={handleCancel}
                title='Registrar nueva sucursal'
                width='50%'
                footer={
                    [
                        <Button key="back" onClick={handleCancel}>
                            Cancelar
                            </Button>,
                        <Button key="submit" type="primary" onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    // handleRegisterAircraft(values);
                                    if (!selected) {
                                        console.log(values)
                                        const sucursal = {
                                            ...values,
                                            empleados: [],
                                            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/soft-compa-r.appspot.com/o/restaurante.jpg?alt=media&token=f2a7b898-0160-40c2-91c3-d3096ed4d235'
                                        }
                                        db.collection('sucursales').add(sucursal).then(() => {
                                            form.resetFields();
                                            loadSucursales().then((data) => {
                                                setSucursales(data)
                                                console.log(data)
                                            })
                                            setVisible(false)
                                            message.success('Se registro la sucursal nueva de manera correcta')
                                        })
                                    } else {
                                        console.log(current)
                                        db.collection('sucursales').doc(current.id).update({
                                            sucursal: values.sucursal,
                                            administrador: values.administrador
                                        }).then(() => {
                                            message.success('Se actualizo la sucursal de manera correcta')
                                            setVisible(false)
                                            loadSucursales().then((data) => {
                                                setSucursales(data)
                                                console.log(data)
                                            })
                                        })
                                    }
                                })
                                .catch(({ errorFields }) => {
                                    if (!errorFields) {
                                        message.error('Ocurrio un problema')
                                    }
                                });
                        }}>
                            {
                                selected ? 'Actualizar' : 'Registrar'
                            }
                        </Button>,
                    ]
                }
            >

                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >

                    <Row gutter={[24, 24]}>
                        <Col span={12} >
                            <Form.Item
                                name="sucursal"
                                label="Sucursal"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item
                                name="administrador"
                                label="Administrador"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    },
                                ]}
                            >
                                <Select>

                                    {
                                        admins.map(admin => (
                                            <Select.Option value={admin.name}>{admin.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>

                </Form>
            </Modal>
        </div>
    )
}
