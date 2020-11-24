import { db, firebase } from '../firebase/firebaseConfig'

import { types } from "../types/types"

import { message } from "antd";

//Acciones asincronas

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
            db.collection('empleados').doc(user.uid).get().then((data) => {
                const userData = data.data()
                dispatch(login(user.uid, userData.name))
                db.collection('empleados').doc(user.uid).update({
                    lastLogin: new Date().getTime()
                })
            })
        }).catch((e) => {
            message.error(e.message);
        })
    }
}

export const startLogout = () => {
    return (async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())
    })
}

//Acciones sincronas
export const login = (uid, name) => {

    return {
        type: types.login,
        payload: {
            uid,
            name
        }
    }

}


export const logout = () => {
    return {
        type: types.logout
    }

}