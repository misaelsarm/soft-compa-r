import React from 'react'
import { NavLink } from 'react-router-dom'

export const SubSidebarNavLink = ({ id, route, routeName, icon }) => {
    return (
        <NavLink activeClassName="subsidebar-link-active" to={`/sucursales/menu/${id}/${route}`}>
            <div>
                <span className="material-icons-outlined">{icon}</span>
                <p>
                    {routeName}
                </p>
            </div>
        </NavLink>
    )
}
