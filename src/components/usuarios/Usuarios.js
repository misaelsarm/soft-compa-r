import { Table } from 'antd'
import React from 'react'

export const Usuarios = () => {


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
            title: 'Sucursal',
            dataIndex: 'sucursal',
            key: 'sucursal',
        },
        {
            title: 'Tipo de usuario',
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
            title: 'Fecha de registro',
            dataIndex: 'registerDate',
            key: 'registerDate',
            //render: text => <>{text ? moment(text).format('lll') : 'Unknown'}</>
        },
    ]


    return (
        <div>
            <h2>Usuarios</h2>
            <Table columns={columns}></Table>
        </div>
    )
}
