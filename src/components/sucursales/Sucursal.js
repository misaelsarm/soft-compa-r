import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export const Sucursal = ({id, imageUrl, sucursal, empleados, administrador }) => {

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
                    <span>Empleados:</span><span>{empleados}</span>
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
