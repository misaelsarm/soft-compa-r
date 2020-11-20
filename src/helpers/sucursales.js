import { db } from "../firebase/firebaseConfig"

export const loadSucursales = async () => {
    let sucursales = []
    const data = await db.collection('sucursales').get();
    data.forEach((sucursal) => {
        sucursales.push({
            id: sucursal.id,
            ...sucursal.data(),
        })
    })

    return sucursales;
}