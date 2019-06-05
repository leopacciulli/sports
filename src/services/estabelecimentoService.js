import axios from 'axios';
import { url } from '../Utils';

export class EstabelecimentoService {
	getEstabelecimentos() {
		return axios.get(url+`getEstablishment`);
    }

    getServicoEstabelecimento(idEstabelecimento) {
		return axios.get(url+`getEstablishmentService?idEstabelecimento=${idEstabelecimento}`);
    }

    getProfissionalEstabelecimento(idTipoServico, idEstabelecimento) {
		return axios.get(url+`getEstablishmentProfessional?idTipoServico=${idTipoServico}&idEstabelecimento=${idEstabelecimento}`);
	}
	
	getAvaliacoes(idEstabelecimento) {
		return axios.get(url+`getRating?idEstabelecimento=${idEstabelecimento}`);
	}
	
	inserirAvaliacao(avaliacao) {
        return axios.post(url+`registerRating`, avaliacao);
    }
}