import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { Login } from '../components/auth/Login';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>

                    <Route path="/login" component={Login} exact></Route>
                </Switch>
            </div>
        </Router>
    )
}
