import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { loadProveedores } from '../../helpers/loadProveedores'
import moment from 'moment'

export const ProveedoresGlobal = () => {

    const [proveedores, setProveedores] = useState([])

    useEffect(() => {
        loadProveedores().then((data) => {
            setProveedores(data)
        })
    }, [])

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
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Empresa',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Fecha de registro',
            dataIndex: 'registerDate',
            key: 'registerDate',
            render: text => <>{text ? moment(text).format('lll') : 'Desconocida'}</>
        },
    ]

    return (
        <div>
            <h2>Proveedores | Global</h2>
            <Table columns={columns} dataSource={proveedores}></Table>
        </div>
    )
}
