import { db } from "../firebase/firebaseConfig"

export const loadGastosMercancia = async () => {
    const gastosCollection = await db.collection('gastos-mercancia').get();

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