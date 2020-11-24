import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { EmpleadosGlobal } from '../components/empleados/EmpleadosGlobal'
import { Inicio } from '../components/inicio/Inicio'
import { MenuGrid } from '../components/navigation/MenuGrid'
import { NavBar } from '../components/navigation/NavBar'
import { SubsidebarRouter } from '../components/navigation/SubsidebarRouter'
import { ProveedoresGlobal } from '../components/proveedores/ProveedoresGlobal'
import { RentasGlobal } from '../components/rentas/RentasGlobal'
import { Sucursales } from '../components/sucursales/Sucursales'

export const NavRouter = () => {
    return (
        <div>
            <NavBar />
            <div className="main-container">
                <Switch >
                    <Route exact path="/inicio" component={Inicio} />
                    <Route exact path="/sucursales" component={Sucursales} />
                    <Route exact path="/empleados" component={EmpleadosGlobal} />
                    <Route exact path="/proveedores" component={ProveedoresGlobal} />
                    <Route exact path="/gastos-renta" component={RentasGlobal} />
                    <Route exact path='/sucursales/menu/:sucursalId' component={MenuGrid} />
                    <Route path="/sucursales/menu/:sucursalId/:route" component={SubsidebarRouter} />
                    <Redirect to="/inicio" />
                </Switch>
            </div>
        </div>
    )
}
