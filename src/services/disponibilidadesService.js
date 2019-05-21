import axios from 'axios';
import { url } from '../Utils';

export function DisponibilidadesService() {
    return axios.get(url+`services`);
}