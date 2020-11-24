import { Button, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadEmpleados } from '../../helpers/loadEmpleados';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { db } from '../../firebase/firebaseConfig';

export const Sucursal = ({ form, setCurrent, selected, setSelected, visible, setVisible, id, imageUrl, sucursal, sucursalRecord, administrador, setSucursales, sucursales }) => {

    const [empleados, setEmpleados] = useState([])

    useEffect(() => {
        console.log('object')
        loadEmpleados().then(data => setEmpleados(data.filter(empleado => empleado.sucursal === sucursal)))
    }, [sucursal])

    const updateModal = () => {
        console.log(sucursalRecord)
        form.setFieldsValue({
            administrador: sucursalRecord.administrador,
            sucursal: sucursalRecord.sucursal
        })
        setVisible(true)
        setSelected(true)
        setCurrent(sucursalRecord)
    }


    return (
        <div className="sucursal">
            <div style={{ position: 'relative' }} className="sucursal-img">
                <img alt="Sucursal" src={imageUrl} />
                <Button onClick={updateModal} style={{ position: 'absolute', right: 10, top: 10 }} shape="circle" type="primary" icon={<EditOutlined />}>
                </Button>
                <Popconfirm
                    title="¿Eliminar  la sucursal?"
                    okText="Eliminar"
                    cancelText="Cancelar"

                    onConfirm={() => {
                        console.log(id)
                        db.collection('sucursales').doc(id).delete().then(() => {
                            setSucursales(sucursales.filter(sucursal => sucursal.id !== id))
                            message.success('Se elimino la sucursal de manera correcta')
                        }).catch(() => {
                            message.error('Ocurrio un problema')
                        })

                    }}

                >
                    <Button danger style={{ position: 'absolute', right: 10, top: 50 }} shape="circle" type="primary" icon={<DeleteOutlined />}>
                    </Button>
                </Popconfirm>
            </div>
            <div className="sucursal-data">
                <div>
                    <span>Sucursal:</span> <span>{sucursal}</span>
                </div>
                <div>
                    <span>Empleados:</span><span>{empleados?.length}</span>
                </div>
                <div>
                    <span>Administrador:</span> <span>{administrador}</span>
                </div>

            </div>
            <div className="sucursal-link">
                <Link to={`/sucursales/menu/${id}`} > Ver sucursal</Link>
            </div>
        </div>
    )
}
