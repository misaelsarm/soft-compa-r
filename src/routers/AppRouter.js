import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { Login } from '../components/auth/Login';
import { firebase, db } from '../firebase/firebaseConfig';
import { NavRouter } from './NavRouter';
import { login } from "../actions/auth";

export const AppRouter = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                db.collection('empleados').doc(user.uid).get().then((userData) => {
                    dispatch(login(user.uid, userData.data().name))
                }).catch((e) => {
                    //setError(true)
                })
            }
        })
    }, [dispatch])

    return (
        <Router>
            <div>
                <Switch>

                    <Route path="/login" component={Login} exact></Route>
                    <Route path="/" component={NavRouter}></Route>
                </Switch>
            </div>
        </Router>
    )
}
