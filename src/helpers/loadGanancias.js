import { db } from "../firebase/firebaseConfig"

export const loadGanancias = async () => {
    const gananciasCollection = await db.collection('ganancias').get();

    let ganancias = []
    gananciasCollection.forEach((ganancia) => {
        ganancias.push({
            key: ganancia.id,
            id: ganancia.id,
            ...ganancia.data()
        })
    })

    return ganancias
}