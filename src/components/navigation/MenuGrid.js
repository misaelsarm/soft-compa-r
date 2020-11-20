import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { loadSucursales } from '../../helpers/sucursales';
import { MenuContainer } from '../menu/MenuContainer';


export const MenuGrid = () => {
    console.log('menu')
    const { sucursalId } = useParams();
    const [sucursal, setSucursal] = useState({})

    useEffect(() => {
        loadSucursales().then((sucursales) => {
            setSucursal(sucursales.find(sucursal => sucursal.id === sucursalId))
        })
    }, [sucursalId])

    return (
        <MenuContainer {...sucursal} />
    )
}
