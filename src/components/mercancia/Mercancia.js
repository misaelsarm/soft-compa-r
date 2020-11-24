import { Button, Col, DatePicker, Form, Input, InputNumber, message, Modal, Popconfirm, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { loadGastosMercancia } from '../../helpers/loadGastosMercancia';
import moment from 'moment'
import { db } from '../../firebase/firebaseConfig';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export const Mercancia = () => {

    const { sucursalId } = useParams();

    const [gastos, setGastos] = useState([])

    useEffect(() => {
        loadGastosMercancia().then((data) => {
            setGastos(data.filter(gasto => gasto.sucursalId === sucursalId))
        })
    }, [sucursalId])

    const [selected, setSelected] = useState(false)
    const [currentRecorrd, setCurrentRecorrd] = useState({})

    const updateModal = (record) => {
        setSelected(true)
        setVisible(true)
        setCurrentRecorrd(record)
        form.setFieldsValue({
            productName: record.productName,
            price: record.price,
            quantity: record.quantity
        })
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Producto',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <p>${text}</p>
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Fecha de compra',
            dataIndex: 'purchaseDate',
            key: 'purchaseDate',
            // render: text => <Tag color="blue">{text}</Tag>
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
                                db.collection('gastos-mercancia').doc(record.id).delete().then(() => {
                                    setGastos(gastos.filter(gasto => gasto.id !== record.id))
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

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false)

    const handleCancel = () => {
        setVisible(false)
        form.resetFields();
        setSelected(false)
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Gastos de mercancia</h2>
                <Button onClick={() => { setVisible(true) }} type='primary'>Nuevo gasto</Button>
            </div>
            <Table columns={columns} dataSource={gastos}></Table>

            <Modal
                visible={visible}
                centered
                onCancel={handleCancel}
                title={selected ? 'Actualizar gasto de mercancia' : 'Registrar nuevo gasto de mercancia'}
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
                                    if (!selected) {
                                        console.log(values)
                                        const gasto = {
                                            ...values,
                                            sucursalId: sucursalId,
                                            id: new Date().getTime().toString(),
                                            purchaseDate: moment(values.purchaseDate).format('ll'),
                                        }
                                        db.collection('gastos-mercancia').doc(gasto.id).set(gasto).then(() => {
                                            form.resetFields();
                                            setGastos([...gastos, gasto])
                                            setVisible(false)
                                            message.success('Se registro el nuevo gasto de manera correcta')
                                        })
                                    } else {
                                        console.log(currentRecorrd.id)
                                        db.collection('gastos-mercancia').doc(currentRecorrd.id).update({
                                            concept: values.concept,
                                            status: values.status,
                                            paidAmount: values.paidAmount
                                        }).then(() => {
                                            loadGastosMercancia().then((data) => {
                                                setGastos(data.filter(gasto => gasto.sucursalId === sucursalId))
                                            })
                                            form.resetFields();
                                            setVisible(false)
                                            message.success('Se actualizo el gasto de manera correcta')
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
                                !selected ? 'Registrar' : 'Actualizar'
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
                                name="productName"
                                label="Producto"
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
                                name="price"
                                label="Precio"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={[24, 24]}>
                        <Col span={12} >
                            <Form.Item
                                name="quantity"
                                label="Cantidad"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        {
                            !selected &&
                            <Col span={12} >
                                <Form.Item
                                    name="purchaseDate"
                                    label="Fecha de compra"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Campo requerido',
                                        },
                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} ></DatePicker>
                                </Form.Item>
                            </Col>
                        }
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
