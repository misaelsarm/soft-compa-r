import { Button, Col, DatePicker, Form, Input, message, Modal, Popconfirm, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { loadGanancias } from '../../helpers/loadGanancias';
import moment from 'moment'
import { db } from '../../firebase/firebaseConfig';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
export const Ganancias = () => {

    const { sucursalId } = useParams();

    const [ganancias, setGanancias] = useState([])

    useEffect(() => {
        loadGanancias().then((data) => {
            setGanancias(data.filter(ganancia => ganancia.sucursalId === sucursalId))
        })
    }, [sucursalId])

    const [selected, setSelected] = useState(false)
    const [currentRecorrd, setCurrentRecorrd] = useState({})

    const updateModal = (record) => {
        setSelected(true)
        setVisible(true)
        setCurrentRecorrd(record)
        form.setFieldsValue({
            soldItems: record.soldItems,
            amount: record.amount,
        })
    }

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
                            title="¿Eliminar ganancia?"
                            okText="Eliminar"
                            cancelText="Cancelar"
                            onConfirm={() => {
                                db.collection('ganancias').doc(record.id).delete().then(() => {
                                    setGanancias(ganancias.filter(ganancia=>ganancia.id!==record.id))
                                    // setGastos(gastos.filter(gasto => gasto.id !== record.id))
                                    // setEmpleados(empleados.filter(empleado => empleado.id !== record.id))
                                    message.success('Se elimino el registro de manera correcta')
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
                <h2>Ganancias / Ventas</h2>
                <Button onClick={() => { setVisible(true) }} type='primary'>Nueva venta</Button>
            </div>
            <Table columns={columns} dataSource={ganancias}></Table>

            <Modal
                visible={visible}
                centered
                onCancel={handleCancel}
                title={selected ? 'Actualizar ganancia' : 'Registrar nueva venta'}
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
                                    if (!selected) {
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
                                    } else {
                                        console.log(currentRecorrd.id)
                                        db.collection('ganancias').doc(currentRecorrd.id).update({
                                            soldItems: values.soldItems,
                                            amount: values.amount,
                                        }).then(() => {
                                            loadGanancias().then((data) => {
                                                setGanancias(data.filter(ganancia => ganancia.sucursalId === sucursalId))
                                            })
                                            form.resetFields();
                                            setVisible(false)
                                            message.success('Se actualizo el registro de manera correcta')
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
                        {!selected &&
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
                        }
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
