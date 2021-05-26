import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/header/header';
import { AuthContext } from '../context/user-provider';
import Dashboard from '../view/Dashboard';
import Fila from '../view/Fila';
import Login from '../view/Login';
import Register from '../view/Register/Register';

export const Routes: React.FC<React.ReactNode> = () => {
    const value = useContext(AuthContext);
    const auth = value?.auth;

    return (
        <Switch>
            {
                !auth ?
                    <>
                        <Route path="/" exact={true} component={Login} />
                        <Route path="/registro" component={Register} />
                        <Route path="*" render={() => <Redirect to='/' />} />
                    </>
                    :
                    <>
                        <Header />
                        <Route path="/" exact={true} component={Dashboard} />
                        <Route path="/fila" component={Fila} />
                        <Route path="*" render={() => <Redirect to='/' />} />
                    </>
            }
        </Switch>
    )
}