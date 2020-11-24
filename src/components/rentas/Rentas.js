import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/firebaseConfig'
import { loadGastosRenta } from '../../helpers/loadGastosRenta'
import moment from "moment";

export const Rentas = () => {

    const { sucursalId } = useParams();

    const [gastos, setGastos] = useState([])

    useEffect(() => {
        loadGastosRenta().then((data) => {
            setGastos(data.filter(gasto => gasto.sucursalId === sucursalId))
        })
    }, [sucursalId])

    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Concepto',
            dataIndex: 'concept',
            key: 'concept',
        },
        {
            title: 'Fecha de pago',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
        },
        {
            title: 'Vencimiento',
            dataIndex: 'due',
            key: 'due',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            // render: text => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'Cantidad pagada',
            dataIndex: 'paidAmount',
            key: 'paidAmount',
            render: (text) => <p>${text}</p>
        },
    ]

 

    const handleCancel = () => {
        setVisible(false)
        form.resetFields();
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Gastos de renta</h2>
                <Button onClick={() => { setVisible(true) }} type='primary'>Nuevo gasto</Button>
            </div>
            <Table columns={columns} dataSource={gastos}></Table>

            <Modal
                visible={visible}
                centered
                onCancel={handleCancel}
                title='Registrar nuevo gasto de renta'
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
                                    const gastoRenta = {
                                        ...values,
                                        sucursalId: sucursalId,
                                        id: new Date().getTime().toString(),
                                        due: moment(values.due).format('ll'),
                                        paymentDate: moment(values.paymentDate).format('ll')
                                    }

                                    console.log(gastoRenta)
                                    db.collection('gastos-renta').doc(gastoRenta.id).set(gastoRenta).then(() => {
                                        form.resetFields();
                                        // setSucursales([...sucursales, sucursal])
                                        setGastos([...gastos, gastoRenta])
                                        setVisible(false)
                                        message.success('Se registro el nuevo gasto de manera correcta')
                                    })
                                })
                                .catch((e) => {
                                    console.log(e)
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
                                name="concept"
                                label="Concepto"
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
                                name="paymentDate"
                                label="Fecha de pago"
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

                    </Row>
                    <Row gutter={[24, 24]}>
                        <Col span={12} >
                            <Form.Item
                                name="due"
                                label="Vencimiento"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    },
                                ]}
                            >
                                <DatePicker style={{ width: '100%' }}></DatePicker>
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Campo requerido',
                                    },
                                ]}
                            >
                                <Select>
                                    <Select.Option value='Pendiente'>Pendiente</Select.Option>
                                    <Select.Option value='Pagado'>Pagado</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[24, 24]}>
                        <Col span={12} >
                            <Form.Item
                                name="paidAmount"
                                label="Cantidad"
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
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
