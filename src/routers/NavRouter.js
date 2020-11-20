import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Inicio } from '../components/inicio/Inicio'
import { MenuGrid } from '../components/navigation/MenuGrid'
import { NavBar } from '../components/navigation/NavBar'
import { SubsidebarRouter } from '../components/navigation/SubsidebarRouter'
import { Proveedores } from '../components/proveedores/Proveedores'
import { Sucursales } from '../components/sucursales/Sucursales'
import { Usuarios } from '../components/usuarios/Usuarios'

export const NavRouter = () => {
    return (
        <div>
            <NavBar />
            <div className="main-container">
                <Switch >
                    <Route exact path="/inicio" component={Inicio} />
                    <Route exact path="/sucursales" component={Sucursales} />
                    <Route exact path="/usuarios" component={Usuarios} />
                    <Route exact path="/proveedores" component={Proveedores} />
                    <Route exact path="/rentas" component={Usuarios} />
                    <Route exact path='/sucursales/menu/:sucursalId' component={MenuGrid} />
                    <Route path="/sucursales/menu/:sucursalId/:route" component={SubsidebarRouter} />
                    <Redirect to="/inicio" />
                </Switch>
            </div>
        </div>
    )
}
