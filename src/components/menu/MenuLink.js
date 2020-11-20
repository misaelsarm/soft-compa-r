import React from 'react'
import { Link } from 'react-router-dom'

export const MenuLink = ({ id, route, routeName, icon }) => {
    return (
        <Link to={`/sucursales/menu/${id}/${route}`}>
            <div className="documents menu-grid-item">
                <span className="material-icons-outlined">{icon}</span>
                <h3>{routeName}</h3>
            </div>
        </Link>
    )
}
