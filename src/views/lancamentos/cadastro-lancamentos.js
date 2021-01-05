import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import LancamentoService from '../../app/service/lancamentoService'
import React from 'react'
import SelectMenu from '../../components/selectMenu'
import { withRouter } from 'react-router-dom'

class CadastroLancamentos extends React.Component {

    constructor(){
        super();
        this.lancamentoService = new LancamentoService()
    }

    render(){

        const tipos = this.lancamentoService.obterListaTipos()
        const meses = this.lancamentoService.obterListaMeses()

        return (
            <Card title="Cadastro de Lançamento">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text" className="form-control"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *" >
                            <input id="inputAno" type="text" className="form-control"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *" >
                            <SelectMenu id="inputMes" lista={meses} className="form-control" />
                        </FormGroup>
                    </div>  
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *" >
                            <input id="inputValor" type="text" className="form-control"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *" >
                            <SelectMenu id="inputTipo" lista={tipos} className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: " >
                           <input type="text" className="form-control" disabled />
                        </FormGroup>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success">Salvar</button>
                        <button className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)