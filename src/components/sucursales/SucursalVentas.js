import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { loadGanancias } from '../../helpers/loadGanancias';
import moment from 'moment'

export const SucursalVentas = () => {

    const hoy = moment(new Date().getTime()).format('ll')
    console.log({ hoy })

    const { sucursalId } = useParams();

    const [ganancias, setGanancias] = useState([])

    useEffect(() => {
        loadGanancias().then((data) => {
            setGanancias(data.filter(ganancia => ganancia.sucursalId === sucursalId && ganancia.saleDate === hoy))
        })
    }, [sucursalId, hoy])

    let total = 0;

    ganancias.forEach((ganancia) => {
        total = total + +ganancia.amount
    })


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

    return (
        <div className="status">
            <h2>Ganancias del dia: ${total}</h2>
            <div className="menu-grid-item-data">
                <Table pagination={false} columns={columns} dataSource={ganancias}></Table>
            </div>
        </div>
    )
}
