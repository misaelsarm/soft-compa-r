import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { loadEmpleados } from '../../helpers/loadEmpleados';
import { loadGanancias } from '../../helpers/loadGanancias';
import { loadGastosMercancia } from '../../helpers/loadGastosMercancia';
import { loadGastosRenta } from '../../helpers/loadGastosRenta';
import { loadProveedores } from '../../helpers/loadProveedores';
import { loadSucursales } from '../../helpers/sucursales';

export const Inicio = () => {

    const [sucursales, setSucursales] = useState([]);
    const [empleados, setEmpleados] = useState([])
    const [proveedores, setProveedores] = useState([])
    const [gastosMercancia, setGastosMercancia] = useState([])
    const [gastosRenta, setGastosRenta] = useState([])
    const [ganancias, setGanancias] = useState([])

    useEffect(() => {
        loadSucursales().then((data) => { setSucursales(data) })
        loadEmpleados().then((data) => { setEmpleados(data) })
        loadProveedores().then((data) => { setProveedores(data) })
        loadGastosMercancia().then((data) => { setGastosMercancia(data) })
        loadGastosRenta().then((data) => { setGastosRenta(data) })
        loadGanancias().then((data) => { setGanancias(data) })
    }, [])

    let totalGastosMercancia = 0;
    let totalGastosRenta = 0
    let total = 0;

    ganancias.forEach((ganancia) => {
        total = total + +ganancia.amount
    })

    gastosMercancia.forEach((gasto) => {
        totalGastosMercancia = totalGastosMercancia + gasto.price
        console.log(totalGastosMercancia)
    })


    gastosRenta.forEach((gasto) => {
        totalGastosRenta = totalGastosRenta + +gasto.paidAmount
    })

    return (
        <div>
            <h1>Inicio | Resumen total</h1>

            <div className="grid">
                <div className="item">
                    <h2>Ganancias Globales</h2>
                    <h2>${total}</h2>
                </div>
                <div className="item">
                    <h2>Gastos de mercancia globales</h2>
                    <h2>${totalGastosMercancia}</h2>
                </div>
                <div className="item">
                    <h2>Gastos de renta globales</h2>
                    <h2>${totalGastosRenta}</h2>
                    <Link style={{ background: '#0065b8', color: 'white', padding: 10, borderRadius: 5 }} to="/gastos-renta">Ver detalles</Link>
                </div>
                <div className="item">
                    <h2>Total de empleados</h2>
                    <h2>{empleados.length} empleados</h2>
                    <Link style={{ background: '#0065b8', color: 'white', padding: 10, borderRadius: 5 }} to="/empleados">Ver empleados</Link>
                </div>
                <div className="item">
                    <h2>Total de proveedores</h2>
                    <h2>{proveedores.length} proveedores</h2>
                    <Link style={{ background: '#0065b8', color: 'white', padding: 10, borderRadius: 5 }} to="/proveedores">Ver proveedores</Link>
                </div>
                <div className="item">
                    <h2>Total de sucursales</h2>
                    <h2>{sucursales.length} sucursales</h2>
                    <Link style={{ background: '#0065b8', color: 'white', padding: 10, borderRadius: 5 }} to="/sucursales">Ver sucursales</Link>
                </div>
            </div>
        </div>
    )
}
