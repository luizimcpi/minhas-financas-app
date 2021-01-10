import ApiService from '../apiservice'
import ErroValidacao from '../exception/erroValidacao'

export default class LancamentoService extends ApiService {
    
    constructor(){
        super('/api/lancamentos')
    }

    obterListaMeses(){
        return [
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
    }

    obterListaTipos(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'},
        ]
    }

    obterPorId(id, usuarioLogado){
        return this.getWithAuthorization(`/${id}`, usuarioLogado)
    }

    salvar(lancamento, usuarioLogado){
        return this.postWithAuthorization('/', lancamento, usuarioLogado)
    }

    atualizar(lancamento, usuarioLogado){
        return this.putWithAuthorization(`/${lancamento.id}`, lancamento, usuarioLogado)
    }

    alterarStatus(id, status, usuarioLogado){
        return this.putWithAuthorization(`/${id}/status`, { status }, usuarioLogado)
    }

    consultar(lancamentoFiltro, usuarioLogado){
        let params = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }
        
        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }
        
        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }

        return this.getWithAuthorization(params, usuarioLogado)
    }

    deletar(id, usuarioLogado){
        return this.deleteWithAuthorization(`/${id}`, usuarioLogado)
    }

    validar(lancamento){
        const erros = []

        if(!lancamento.ano){
            erros.push("Informe o Ano.")
        }

        if(!lancamento.mes){
            erros.push("Informe o Mês.")
        }

        if(!lancamento.descricao){
            erros.push("Informe a Descrição.")
        }

        if(!lancamento.valor){
            erros.push("Informe o Valor.")
        }

        if(!lancamento.tipo){
            erros.push("Informe o Tipo.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }
}