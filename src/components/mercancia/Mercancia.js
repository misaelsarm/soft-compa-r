import { Button, Col, DatePicker, Form, Input, InputNumber, message, Modal, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { loadGastosMercancia } from '../../helpers/loadGastosMercancia';
import moment from 'moment'
import { db } from '../../firebase/firebaseConfig';

export const Mercancia = () => {

    const { sucursalId } = useParams();

    const [gastos, setGastos] = useState([])

    useEffect(() => {
        loadGastosMercancia().then((data) => {
            setGastos(data.filter(gasto => gasto.sucursalId === sucursalId))
        })
    }, [sucursalId])

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
    ]

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false)

    const handleCancel = () => {
        setVisible(false)
        form.resetFields();
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
                title='Registrar nuevo gasto de mercancia'
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
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
