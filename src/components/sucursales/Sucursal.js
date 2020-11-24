import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadEmpleados } from '../../helpers/loadEmpleados';

export const Sucursal = ({ id, imageUrl, sucursal, administrador }) => {

    const [empleados, setEmpleados] = useState([])

    useEffect(() => {
        loadEmpleados().then(data => setEmpleados(data.filter(empleado => empleado.sucursal === sucursal)))
    }, [])


    return (
        <div className="sucursal">
            <div className="sucursal-img">
                <img alt="Sucursal" src={imageUrl} />
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
