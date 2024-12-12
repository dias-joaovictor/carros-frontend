import { CrudService } from './CrudService';
import { Carro } from '../models/Carro';

const baseURL = process.env.REACT_APP_BACKEND_URL;

export const carroService = new CrudService<Carro, number>(baseURL, 'api/carros');
