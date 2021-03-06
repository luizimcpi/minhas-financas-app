import * as messages from '../../components/toastr'

import { AuthContext } from '../../main/provedorAutenticacao'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import LancamentoService from '../../app/service/lancamentoService'
import React from 'react'
import SelectMenu from '../../components/selectMenu'
import { withRouter } from 'react-router-dom'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        atualizando: false
    }

    constructor(){
        super();
        this.lancamentoService = new LancamentoService()
    }

    componentDidMount(){
        const params = this.props.match.params
        const usuarioLogado = this.context.usuarioAutenticado
        if(params.id && usuarioLogado){
            
            this.lancamentoService
            .obterPorId(params.id, usuarioLogado)
            .then(response => {
                this.setState({ ...response.data, atualizando: true })
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
        }
    }

    submit = () => {
        const usuarioLogado = this.context.usuarioAutenticado
        
        const { descricao, valor, mes, ano, tipo} = this.state

        const lancamento = { descricao, valor, mes, ano, tipo }

        try {
            this.lancamentoService.validar(lancamento)
        }catch(erro){
            const mensagens = erro.mensagens
            mensagens.forEach(msg => messages.mensagemErro(msg))
            return false
        }

        this.lancamentoService
        .salvar(lancamento, usuarioLogado)
        .then( response => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso('Lançamento cadastrado com sucesso!')  
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })
    } 

    atualizar = () => {
        const usuarioLogado = this.context.usuarioAutenticado

        const { descricao, valor, mes, ano, tipo, status, id} = this.state
        const lancamento = { descricao, valor, mes, ano, tipo, status, id }

        this.lancamentoService
        .atualizar(lancamento, usuarioLogado)
        .then( response => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso('Lançamento atualizado com sucesso!')  
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })
    }

    cancelar = () => {
        this.props.history.push('/consulta-lancamentos')
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    render(){

        const tipos = this.lancamentoService.obterListaTipos()
        const meses = this.lancamentoService.obterListaMeses()

        return (
            <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" 
                                type="text" 
                                className="form-control"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *" >
                            <input id="inputAno" 
                                type="text" 
                                className="form-control"
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *" >
                            <SelectMenu id="inputMes" 
                            lista={meses} 
                            className="form-control" 
                            name="mes"
                            value={this.state.mes}
                            onChange={this.handleChange}    
                        />
                        </FormGroup>
                    </div>  
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *" >
                            <input id="inputValor" 
                                type="text" 
                                className="form-control"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange} 
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *" >
                            <SelectMenu id="inputTipo" 
                                lista={tipos} 
                                className="form-control" 
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange} 
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: " >
                           <input type="text" 
                                className="form-control" 
                                name="status"
                                value={this.state.status}
                                disabled 
                            />
                        </FormGroup>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        { this.state.atualizando ?
                            (
                                <button onClick={this.atualizar} 
                                        className="btn btn-success">
                                        <i className="pi pi-refresh"></i> Salvar
                                </button>        
                            ) : (
                                <button onClick={this.submit} 
                                        className="btn btn-success">
                                        <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                        <button onClick={this.cancelar} 
                                className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}


CadastroLancamentos.contextType = AuthContext

export default withRouter(CadastroLancamentos)