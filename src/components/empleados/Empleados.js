import { Button, Col, Form, Input, message, Modal, Popconfirm, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { db, secondaryApp } from '../../firebase/firebaseConfig';
import { loadEmpleados } from '../../helpers/loadEmpleados';
import { loadSucursales } from '../../helpers/sucursales';
import moment from 'moment'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';

export const Empleados = () => {

    const {uid} = useSelector(state => state.auth)

    const [empleados, setEmpleados] = useState([])

    useEffect(() => {

        loadEmpleados().then((users) => {
            setEmpleados(users.filter(user=>user.id!==uid))
        })
        loadSucursales().then((sucursales) => {
            setSucursales(sucursales)
        })
    }, [])

    const [form] = Form.useForm();

    const [sucursales, setSucursales] = useState([])
    const [visible, setVisible] = useState(false)

    const handleCancel = () => {
        setVisible(false)
        form.resetFields();
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Sucursal',
            dataIndex: 'sucursal',
            key: 'sucursal',
        },
        {
            title: 'Fecha de registro',
            dataIndex: 'registerDate',
            key: 'registerDate',
            render: text => <>{text ? moment(text).format('lll') : 'Desconocida'}</>
            //render: text => <>{text ? moment(text).format('lll') : 'Unknown'}</>
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (text,record) => {
                return (
                    <>
                        <Popconfirm
                            title="¿Eliminar empleado?"
                            okText="Eliminar"
                            cancelText="Cancelar"
                            onConfirm={() => {
                                db.collection('empleados').doc(record.id).delete().then(() => {
                                    setEmpleados(empleados.filter(empleado => empleado.id !== record.id))
                                    message.success('Se elimino al empleado de manera correcta')
                                }).catch(() => {
                                    message.error('Ocurrio un problema')
                                })
                            }}
                        >
                            <Button danger shape="circle" type="primary" icon={<DeleteOutlined />}>
                            </Button>
                        </Popconfirm>
                    </>
                )
            }
        }
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Empleados de sucursal</h2>
                <Button onClick={() => { setVisible(true) }} type='primary'>Nuevo empleado</Button>
            </div>

            <Table columns={columns} dataSource={empleados}></Table>

            <Modal
                visible={visible}
                centered
                onCancel={handleCancel}
                title='Registrar nuevo empleado'
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
                                    console.log(values)

                                    secondaryApp.auth().createUserWithEmailAndPassword(values.email, 'softcompar2020').then(user => {
                                        const empleado = {
                                            ...values,
                                            registerDate: new Date().getTime(),
                                            id: user.user.uid,
                                        }
                                        console.log(user.user)
                                        db.collection('empleados').doc(empleado.id).set(empleado)
                                        setVisible(false)
                                        message.success('Se registro el empleado de de manera correcta')
                                        loadEmpleados().then((users) => {
                                            setEmpleados(users)
                                        })
                                    })
                                })
                                .catch(({ errorFields }) => {
                                    if (!errorFields) {
                                        message.error('Ocurrio un problema')
                                    }
                                });
                        }}>
                            Registrar
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
                                name="name"
                                label="Nombre"
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
                                name="email"
                                label="Correo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    },
                                ]}
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col>

                    </Row>
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
                                <Select>
                                    {
                                        sucursales.map((sucursal) => (
                                            <Select.Option
                                                value={sucursal.sucursal}
                                            >
                                                {
                                                    sucursal.sucursal
                                                }
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item
                                name="phone"
                                label="Telefono"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    },
                                ]}
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

        </div>
    )
}
