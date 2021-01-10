import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import { AuthConsumer } from '../main/provedorAutenticacao'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import Home from '../views/home'
import Login from '../views/login'
import React from 'react'

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ){
    return <Route {...props} render = {(componentProps) => {
       if(isUsuarioAutenticado){
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

function Rotas(props){
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                
                {/* <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/" component={Home} /> */}
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Rotas isUsuarioAutenticado={context.isAutenticado} />
        )}
    </AuthConsumer>
);


