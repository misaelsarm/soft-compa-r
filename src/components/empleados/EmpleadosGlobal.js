import { Button, Col, Form, Input, message, Modal, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import { loadEmpleados } from '../../helpers/loadEmpleados'
import { loadSucursales } from '../../helpers/sucursales'
import moment from 'moment'

export const EmpleadosGlobal = () => {

    const [empleados, setEmpleados] = useState([])


    useEffect(() => {
        loadEmpleados().then((users) => {
            setEmpleados(users)
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
            title: 'Sucursal',
            dataIndex: 'sucursal',
            key: 'sucursal',
        },
        {
            title: 'Fecha de registro',
            dataIndex: 'registerDate',
            key: 'registerDate',
            render: text => <>{text ? moment(text).format('lll') : 'Desconocida'}</>
            //render: text => <>{text ? moment(text).format('lll') : 'Unknown'}</>
        },
    ]


    return (
        <div>
            <h2>Empleados Global</h2>
            <Table columns={columns} dataSource={empleados}></Table>
        </div>
    )
}
