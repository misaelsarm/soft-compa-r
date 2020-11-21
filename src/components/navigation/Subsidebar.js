import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { loadSucursales } from '../../helpers/sucursales'
import { menuLinks } from '../menu/menuLinks'
import { SubSidebarNavLink } from './SubSidebarNavLink';



export const Subsidebar = () => {

    const { sucursalId } = useParams();
    const [sucursal, setSucursal] = useState({});

    useEffect(() => {
        loadSucursales().then((sucursales) => {
            setSucursal(sucursales.find(sucursal => sucursal.id === sucursalId))
        })
    }, [sucursalId])

    return (
        <div className="subsidebar">
            <div className="sucursal-info">
                <div className="sucursal-info-img">
                    {
                        sucursal?.imageUrl &&
                        <img alt="sucursal" src={sucursal?.imageUrl} />
                    }
                </div>
                <div className="sucursal-info-data">
                    <div>
                        <span>Sucursal:</span> <span>{sucursal?.sucursal}</span>
                    </div>
                    <div>
                        <span>Empleados:</span><span>{sucursal?.empleados}</span>
                    </div>
                    <div>
                        <span>Administrador:</span> <span>{sucursal?.administrador}</span>
                    </div>
                </div>

            </div>
            <div className="links">
                {
                    menuLinks.map((link) =>
                        <SubSidebarNavLink key={new Date().getTime() * Math.random()} {...link}
                            id={sucursalId} />
                    )
                }
            </div>
        </div>
    )
}
