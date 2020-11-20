import React from 'react'

export const SucursalVentas = () => {
    return (
        <div className="status">
            <h2>Ganancias del dia</h2>
            <div className="menu-grid-item-data">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cantidad</th>
                            <th>Articulos vendidos</th>
                            <th>Vendedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            currentStatus?.map((item, index) => (
                                <tr key={item.item}>
                                    <td>{item.item}</td>
                                    <td>{item.total}</td>
                                    <td>{item.cycles}</td>
                                    <td>{moment(item.lastUpdated).format('lll')}</td>
                                    <td>
                                        <Tooltip title={`Update ${item.item}`}>
                                            <EditTwoTone twoToneColor="#cf9100" style={{ fontSize: 25 }} onClick={() => { setCurrentItem(item, index) }} />
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
