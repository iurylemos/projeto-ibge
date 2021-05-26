import axios, { AxiosResponse } from 'axios';
import { config } from '../config';

export class ApiService {

    async login(cpf: string, data_nascimento: string): Promise<AxiosResponse> {
        const response = await axios.post(`${config.API_URL}/usuario/login`, { cpf, data_nascimento })
        return response;
    }

    async register(nome: string, cpf: string, dt_nascimento: string, municipio: string): Promise<AxiosResponse> {
        const response = await axios.post(`${config.API_URL}/usuario/registrar`, { nome, cpf, dt_nascimento, municipio });
        return response;
    }

    async getCounty(municipio: string): Promise<AxiosResponse> {
        const response = await axios.get(`${config.API_URL}/municipios/${municipio}`);
        return response;
    }

    async getUsers(): Promise<AxiosResponse> {
        const response = await axios.get(`${config.API_URL}/usuario/todosUsuarios`);
        return response;
    }

    async getCountys(): Promise<AxiosResponse> {
        const response = await axios.get(`${config.API_URL}/municipios`);
        return response;
    }

    async getStates(): Promise<AxiosResponse> {
        const response = await axios.get(`${config.API_URL}/estados`);
        return response;
    }

    async getCountyForState(id_state: string): Promise<AxiosResponse> {
        const response = await axios.get(`${config.API_URL}/municipios/estado/${id_state}`);
        return response;
    }
}

