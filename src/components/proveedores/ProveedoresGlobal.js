import { Table } from 'antd'
import React from 'react'

export const ProveedoresGlobal = () => {

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
            dataIndex: 'direccion',
            key: 'direccion',
        },
        {
            title: 'Empresa',
            dataIndex: 'empresa',
            key: 'empresa',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            // render: text => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'Fecha de registro',
            dataIndex: 'registerDate',
            key: 'registerDate',
            //render: text => <>{text ? moment(text).format('lll') : 'Unknown'}</>
        },
    ]

    return (
        <div>
            <h2>Proveedores | Global</h2>
            <Table columns={columns}></Table>
        </div>
    )
}
