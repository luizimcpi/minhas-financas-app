import * as messages from '../../components/toastr'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import LancamentoService from '../../app/service/lancamentoService'
import LancamentosTable from './lancamentosTable'
import LocalStorageService from '../../app/service/localstorageService'
import React from 'react'
import SelectMenu from '../../components/selectMenu'
import { withRouter } from 'react-router-dom'

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if(!this.state.ano){
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório.')
            return false
        }
        
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
        .consultar(lancamentoFiltro)
        .then( response => {
            this.setState({ lancamentos: response.data })
        }).catch( error => {
            messages.mensagemErro('Erro ao consultar lançamentos.')
        })

    }

    editar = (id) => {
        console.log('editar id ', id)
    }

    deletar = (id) => {
        console.log('deletar id', id)
    }

    render(){

        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos()

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={ e => this.setState({ano: e.target.value})}
                                    placeholder="Digite o Ano"/>
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu 
                                    value={this.state.mes}
                                    onChange={ e => this.setState({mes: e.target.value})}
                                    className="form-control" 
                                    lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Descrição: ">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputDesc"
                                    value={this.state.descricao}
                                    onChange={ e => this.setState({descricao: e.target.value})}
                                    placeholder="Digite a descrição"/>
                            </FormGroup>
                            
                            <FormGroup htmlFor="inputTipo" label="Tipo: ">
                                <SelectMenu 
                                    value={this.state.tipo}
                                    onChange={ e => this.setState({tipo: e.target.value})}
                                    className="form-control" 
                                    lista={tipos} />
                            </FormGroup>

                            <button type="button" onClick={this.buscar} className="btn btn-primary">Buscar</button>
                            <button type="button" className="btn btn-success">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} deletarAction={this.deletar} editarAction={this.editar}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);