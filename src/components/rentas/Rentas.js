import { Button, Col, DatePicker, Form, Input, message, Modal, Popconfirm, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/firebaseConfig'
import { loadGastosRenta } from '../../helpers/loadGastosRenta'
import moment from "moment";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

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
    const handleCancel = () => {
        setVisible(false)
        form.resetFields();
        setSelected(false)
    }

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
                                db.collection('gastos-renta').doc(record.id).delete().then(() => {
                                    setGastos(gastos.filter(gasto => gasto.id !== record.id))
                                    // setEmpleados(empleados.filter(empleado => empleado.id !== record.id))
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
                title={selected ? 'Actualizar gasto de renta' : 'Registrar nuevo gasto de renta'}
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
                                    if (!selected) {
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
                                    } else {
                                        console.log(currentRecorrd.id)
                                        db.collection('gastos-renta').doc(currentRecorrd.id).update({
                                            concept: values.concept,
                                            status: values.status,
                                            paidAmount: values.paidAmount
                                        }).then(()=>{
                                            loadGastosRenta().then((data) => {
                                                setGastos(data.filter(gasto => gasto.sucursalId === sucursalId))
                                            })
                                            form.resetFields();
                                            setVisible(false)
                                            message.success('Se actualizo el gasto de manera correcta')
                                        })
                                    }
                                })
                                .catch((e) => {
                                    console.log(e)
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
                        {
                            !selected && <Col span={12} >
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
                        }

                    </Row>
                    <Row gutter={[24, 24]}>
                        {
                            !selected && <Col span={12} >
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
                        }
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
