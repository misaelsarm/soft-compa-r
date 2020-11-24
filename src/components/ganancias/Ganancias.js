import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { loadGanancias } from '../../helpers/loadGanancias';
import moment from 'moment'
import { db } from '../../firebase/firebaseConfig';

export const Ganancias = () => {

    const { sucursalId } = useParams();

    const [ganancias, setGanancias] = useState([])

    useEffect(() => {
        loadGanancias().then((data) => {
            setGanancias(data.filter(ganancia => ganancia.sucursalId === sucursalId))
        })
    }, [sucursalId])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Fecha de venta',
            dataIndex: 'saleDate',
            key: 'saleDate',
        },
        {
            title: 'Articulos vendidos',
            dataIndex: 'soldItems',
            key: 'soldItems',
        },
        {
            title: 'Cantidad',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <p>${text}</p>
        },
        {
            title: 'Vendedor',
            dataIndex: 'salesman',
            key: 'salesman',
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
                <h2>Ganancias / Ventas</h2>
                <Button onClick={() => { setVisible(true) }} type='primary'>Nueva venta</Button>
            </div>
            <Table columns={columns} dataSource={ganancias}></Table>

            <Modal
                visible={visible}
                centered
                onCancel={handleCancel}
                title='Registrar nueva venta'
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

                                    //TODO agregar vendedor
                                    const venta = {
                                        ...values,
                                        sucursalId: sucursalId,
                                        id: new Date().getTime().toString(),
                                        saleDate: moment(values.saleDate).format('ll'),
                                    }

                                    db.collection('ganancias').doc(venta.id).set(venta).then(() => {
                                        form.resetFields();
                                        // setSucursales([...sucursales, sucursal])
                                        setGanancias([...ganancias, venta])
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
                        <Col span={8} >
                            <Form.Item
                                name="saleDate"
                                label="Fecha de venta"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    },
                                ]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item
                                name="soldItems"
                                label="Articulos vendidos"
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
                        <Col span={8} >
                            <Form.Item
                                name="amount"
                                label="Cantidad"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    },
                                ]}
                            >
                                <Input placeholder="$" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
