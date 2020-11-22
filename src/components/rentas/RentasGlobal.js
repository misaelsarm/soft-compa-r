import { Table } from 'antd'
import React from 'react'

export const RentasGlobal = () => {

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Concepto',
            dataIndex: 'concepto',
            key: 'concepto',
        },
        {
            title: 'Fecha de pago',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
        },
        {
            title: 'Vencimiento',
            dataIndex: 'userType',
            key: 'userType',
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
            //render: text => <>{text ? moment(text).format('lll') : 'Unknown'}</>
        },
    ]

    return (
        <div>
            <h2>Gastos de renta | Global</h2>
            <Table columns={columns}></Table>
        </div>
    )
}
