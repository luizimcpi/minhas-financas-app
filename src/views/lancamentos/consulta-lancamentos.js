import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import LancamentosTable from './lancamentosTable'
import React from 'react'
import SelectMenu from '../../components/selectMenu'
import { withRouter } from 'react-router-dom'

class ConsultaLancamentos extends React.Component{

    render(){

        const meses = [
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12},
        ]

        const tipos = [
            {label: 'Selecione...', value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'},
        ]

        const lancamentos = [
            {id: 1, descricao: 'Salário', valor: 5000, mes: 1, tipo: 'Receita', status: 'Efetivado'}
        ]

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputAno"
                                    aria-describedby="anoHelp"
                                    placeholder="Digite o Ano"/>
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu className="form-control" lista={meses} />
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo: ">
                                <SelectMenu className="form-control" lista={tipos} />
                            </FormGroup>

                            <button type="button" className="btn btn-primary">Buscar</button>
                            <button type="button" className="btn btn-success">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={lancamentos}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);