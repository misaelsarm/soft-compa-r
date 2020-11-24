import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { loadGastosRenta } from '../../helpers/loadGastosRenta'

export const RentasGlobal = () => {

    const [gastos, setGastos] = useState([])

    useEffect(() => {
        loadGastosRenta().then((data) => {
            setGastos(data)
        })
    }, [])

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
            //render: text => <>{text ? moment(text).format('lll') : 'Unknown'}</>
        },
    ]

    return (
        <div>
            <h2>Gastos de renta | Global</h2>
            <Table columns={columns} dataSource={gastos}></Table>
        </div>
    )
}
