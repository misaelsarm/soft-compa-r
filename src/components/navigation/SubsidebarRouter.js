import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Empleados } from '../empleados/Empleados'
import { Ganancias } from '../ganancias/Ganancias'
import { Mercancia } from '../mercancia/Mercancia'
import { Proveedores } from '../proveedores/Proveedores'
import { Rentas } from '../rentas/Rentas'
import { Subsidebar } from './Subsidebar'


export const SubsidebarRouter = () => {
    return (
        <>
            <Subsidebar />
            <div className="menu-page-area-container">
                <Switch>
                    <Route exact path="/sucursales/menu/:sucursalId/gastos-renta" component={Rentas} />
                    <Route exact path="/sucursales/menu/:sucursalId/ganancias-diarias" component={Ganancias} />
                    <Route exact path="/sucursales/menu/:sucursalId/gastos-mercancia" component={Mercancia} />
                    <Route exact path="/sucursales/menu/:sucursalId/empleados" component={Empleados} />
                    <Route exact path="/sucursales/menu/:sucursalId/proveedores" component={Proveedores} />
                </Switch>
            </div>
        </>
    )
}
