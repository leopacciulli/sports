import axios from 'axios';
import { url } from '../Utils';

export function EstabelecimentoService() {
    return axios.get(url+`getEstablishment`);
}