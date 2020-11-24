import { db } from "../firebase/firebaseConfig"


export const loadEmpleados = async () => {
    const usersCollection = await db.collection('empleados').get();

    let users = []

    usersCollection.forEach((userDoc) => {
        users.push({
            key: userDoc.id,
            id: userDoc.id,
            ...userDoc.data()
        })
    })

    return users
}