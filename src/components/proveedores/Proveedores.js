import { Button, Col, Form, Input, message, Modal, Popconfirm, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig';
import moment from 'moment'
import { loadProveedores } from '../../helpers/loadProveedores';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export const Proveedores = () => {

    const { sucursalId } = useParams();

    const [proveedores, setProveedores] = useState([])

    useEffect(() => {
        loadProveedores().then((data) => {
            setProveedores(data.filter(proveedor => proveedor.sucursalId === sucursalId))
        })
    }, [sucursalId])

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false)

    const [selected, setSelected] = useState(false)
    const [currentRecorrd, setCurrentRecorrd] = useState({})

    const updateModal = (record) => {
        setSelected(true)
        setVisible(true)
        setCurrentRecorrd(record)
        form.setFieldsValue({
            concept: record.concept,
            status: record.status,
            paidAmount: record.paidAmount
        })
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
            title: 'Direccion',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Empresa',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Fecha de registro',
            dataIndex: 'registerDate',
            key: 'registerDate',
            render: text => <>{text ? moment(text).format('lll') : 'Desconocida'}</>
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (text, record) => {
                return (
                    <>
                        <Button onClick={() => {
                            updateModal(record)
                        }} style={{ marginRight: 10 }} icon={<EditOutlined />} type="primary" shape="circle"></Button>

                        <Popconfirm
                            title="¿Eliminar gasto?"
                            okText="Eliminar"
                            cancelText="Cancelar"
                            onConfirm={() => {
                                db.collection('proveedores').doc(record.id).delete().then(() => {
                                    setProveedores(proveedores.filter(proveedor => proveedor.id !== record.id))
                                    message.success('Se elimino al gasto de manera correcta')
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



    const handleCancel = () => {
        setVisible(false)
        form.resetFields();
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Proveedores</h2>
                <Button onClick={() => { setVisible(true) }} type='primary'>Nuevo proveedor</Button>
            </div>
            <Table columns={columns} dataSource={proveedores}></Table>

            <Modal
                visible={visible}
                centered
                onCancel={handleCancel}
                title='Registrar nuevo proveedor'
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
                                    const proveedor = {
                                        ...values,
                                        sucursalId: sucursalId,
                                        id: new Date().getTime().toString(),
                                        registerDate: new Date().getTime(),
                                    }

                                    db.collection('proveedores').doc(proveedor.id).set(proveedor).then(() => {
                                        form.resetFields();
                                        setProveedores([...proveedores, proveedor])
                                        setVisible(false)
                                        message.success('Se registro la nueva venta de manera correcta')
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
                                name="address"
                                label="Direccion"
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
                                name="phone"
                                label="Telefono"
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
                                name="company"
                                label="Empresa"
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
