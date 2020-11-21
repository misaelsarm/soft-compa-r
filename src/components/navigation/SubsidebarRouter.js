import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Rentas } from '../rentas/Rentas'
import { Usuarios } from '../usuarios/Usuarios'
import { Subsidebar } from './Subsidebar'


export const SubsidebarRouter = () => {
    return (
        <>
            <Subsidebar />
            <div className="menu-page-area-container">
                <Switch>
                    <Route exact path="/sucursales/menu/:sucursalId/pagos-renta" component={Rentas} />
                    <Route exact path="/sucursales/menu/:sucursalId/ganancias-diarias" component={Rentas} />
                    <Route exact path="/sucursales/menu/:sucursalId/mercancia" component={Rentas} />
                    <Route exact path="/sucursales/menu/:sucursalId/empleados" component={Usuarios} />
                    <Route exact path="/sucursales/menu/:sucursalId/proveedores" component={Usuarios} />
                </Switch>
            </div>
        </>
    )
}
