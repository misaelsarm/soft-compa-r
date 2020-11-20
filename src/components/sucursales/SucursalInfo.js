import React from 'react'

export const SucursalInfo = ({ sucursal, empleados, administrador }) => {
    return (
        <div className="info">
            <h2>Informacion de sucursal</h2>
            <div className="menu-grid-item-data">
                <table>
                    <tbody>
                        <tr>
                            <td>Sucursal</td>
                            <td>{sucursal}</td>
                        </tr>
                        <tr>
                            <td>Empleados</td>
                            <td>{empleados}</td>
                        </tr>
                        <tr>
                            <td>Administrador</td>
                            <td>{administrador}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
