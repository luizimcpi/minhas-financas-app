import { HashRouter, Route, Switch } from 'react-router-dom'

import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import Home from '../views/home'
import Login from '../views/login'
import React from 'react'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas
