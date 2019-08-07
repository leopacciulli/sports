import axios from 'axios';
import { url } from '../Utils';

export class AgendamentoService {
    getAgendamento(idEstabelecimento, idProfissional) {
		return axios.get(url+`getAgendamento?idEstabelecimento=${idEstabelecimento}&idProfissional=${idProfissional}`);
    }
    
    inserirAgendamento(agendamento) {
        return axios.post(url+`inserirAgendamento`, agendamento);
    }

    cancelarAgendamento(idAgendamento) {
        return axios.post(url+`cancelarAgendamento`, idAgendamento);
    }
}