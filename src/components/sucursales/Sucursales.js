import React, { useEffect, useState } from 'react'
import { loadSucursales } from '../../helpers/sucursales';
import { Sucursal } from './Sucursal';

export const Sucursales = () => {

    console.log('sucursales')
    const [sucursales, setSucursales] = useState([])
    useEffect(() => {
        loadSucursales().then((data) => {
            setSucursales(data)
            console.log(data)
        })

    }, []);

    return (
        <div>
            <h2>Sucursales</h2>
            <div className="sucursales-grid">
                {
                    sucursales.map((sucursal) => (
                        <Sucursal {...sucursal} />
                    ))
                }
            </div>
        </div>
    )
}
