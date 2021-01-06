import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import Home from '../views/home'
import Login from '../views/login'
import React from 'react'
import AuthService from '../app/service/authService'


function RotaAutenticada( { component: Component, ...props } ){
    return <Route {...props} render = {(componentProps) => {
       if(AuthService.isUsuarioAutenticado()){
           return (
                <Component {...componentProps} />
           )
       } else {
           return (
               <Redirect to={ { pathname: '/login', state: { from: componentProps.location} } } />
           )
       }
    }} />

}

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                
                <RotaAutenticada path="/home" component={Home} />
                <RotaAutenticada path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas
