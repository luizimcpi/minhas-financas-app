import * as messages from '../../components/toastr'

import { AuthContext } from '../../main/provedorAutenticacao'
import { Button } from 'primereact/button';
import Card from '../../components/card'
import { Dialog } from 'primereact/dialog';
import FormGroup from '../../components/form-group'
import LancamentoService from '../../app/service/lancamentoService'
import LancamentosTable from './lancamentosTable'
import React from 'react'
import SelectMenu from '../../components/selectMenu'
import { withRouter } from 'react-router-dom'

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
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
        
        const usuarioLogado = this.context.usuarioAutenticado
        
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao
        }

        this.service
        .consultar(lancamentoFiltro, usuarioLogado)
        .then( response => {
            const lista = response.data
            if(lista.length < 1){
                messages.mensagemAlerta('Nenhum resultado encontrado.')
            }
            this.setState({ lancamentos: lista })
        }).catch( error => {
            messages.mensagemErro('Erro ao consultar lançamentos.')
        })

    }

    cadastrar = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    alterarStatus = (lancamento, status) => {
        const usuarioLogado = this.context.usuarioAutenticado
        
        this.service
        .alterarStatus(lancamento.id, status, usuarioLogado)
        .then(response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(lancamento)

            if(index !== -1){
                lancamento['status'] = status
                lancamentos[index] = lancamento
                this.setState( { lancamentos })
            }
            messages.mensagemSucesso("Status atualizado com sucesso!")
        }).catch(error => {
            messages.mensagemErro('Erro ao tentar alterar status do lançamento.')
        })
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    deletar = () => {
        const usuarioLogado = this.context.usuarioAutenticado
        
        this.service.deletar(this.state.lancamentoDeletar.id, usuarioLogado)
        .then(response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(this.state.lancamentoDeletar)
            lancamentos.splice(index, 1);
            this.setState({lancamentos: lancamentos, showConfirmDialog: false})
            messages.mensagemSucesso('Lançamento deletado com sucesso!')
        }).catch( error => {
            messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento.')
        })
    }

    render(){

        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos()

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary"/>
            </div>
        );
        

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

                            <button type="button" onClick={this.buscar} className="btn btn-primary">
                                <i className="pi pi-search"></i> Buscar
                            </button>
                            <button type="button" onClick={this.cadastrar} className="btn btn-success">
                            <i className="pi pi-plus"></i> Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                                              deletarAction={this.abrirConfirmacao} 
                                              editarAction={this.editar}
                                              alterarStatus={this.alterarStatus}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Exclusão de Lançamento" 
                            visible={this.state.showConfirmDialog} 
                            style={{ width: '50vw' }} 
                            footer={confirmDialogFooter}
                            modal={true}
                            onHide={() => this.setState({showConfirmDialog: false})}>
                     Confirma a exclusão desse lançamento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

ConsultaLancamentos.contextType = AuthContext

export default withRouter(ConsultaLancamentos);