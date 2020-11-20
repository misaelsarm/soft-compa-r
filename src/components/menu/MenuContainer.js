import React from 'react'
import { SucursalInfo } from '../sucursales/SucursalInfo'
import { SucursalVentas } from '../sucursales/SucursalVentas'
import { MenuLink } from './MenuLink'
import { menuLinks } from './menuLinks'


export const MenuContainer = ({ id, administrador, sucursal, empleados, ventas, }) => {

    return (
        <div className="menu-container" >
            <div className="menu-grid">
                <SucursalInfo
                    sucursal={sucursal}
                    empleados={empleados}
                    administrador={administrador}
                />
                <SucursalVentas ventas={ventas} />
                {
                    menuLinks.map((link) =>
                        <MenuLink key={new Date().getTime() * Math.random()} {...link} id={id} />
                    )
                }
            </div>
        </div>
    )
}
