import axios from 'axios';
import { url } from '../Utils';

export class AutenticacaoService {
    registerUser(user) {
        return axios.post(url+`registerUser`, user);
    }

    registerEstablishment(establishment) {
        return axios.post(url+`registerEstablishment`, establishment);
    }

    login(email, senha) {
        return axios.get(url+`login?email=${email}&senha=${senha}`);
    }
}