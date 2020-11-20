import { db, firebase } from '../firebase/firebaseConfig'

import { types } from "../types/types"

import { message } from "antd";

//Acciones asincronas

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
            db.collection('users').doc(user.uid).get().then((data) => {
                const userData = data.data()
                dispatch(login(user.uid, userData.name, userData.userType))
                db.collection('users').doc(user.uid).update({
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
export const login = (uid, displayName, userType) => {

    return {
        type: types.login,
        payload: {
            uid,
            displayName,
            userType
        }
    }

}


export const logout = () => {
    return {
        type: types.logout
    }

}