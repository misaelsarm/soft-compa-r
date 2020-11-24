import { db } from "../firebase/firebaseConfig"

export const loadProveedores = async () => {
    const proveedoresCollection = await db.collection('proveedores').get();

    let proveedores = []

    proveedoresCollection.forEach((proveedor) => {
        proveedores.push({
            key: proveedor.id,
            id: proveedor.id,
            ...proveedor.data()
        })
    })

    return proveedores
}