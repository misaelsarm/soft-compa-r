import { db } from "../firebase/firebaseConfig"

export const loadGastosRenta = async () => {
    const gastosCollection = await db.collection('gastos-renta').get();

    let gastos = []

    gastosCollection.forEach((gasto) => {
        gastos.push({
            key: gasto.id,
            id: gasto.id,
            ...gasto.data()
        })
    })

    return gastos
}