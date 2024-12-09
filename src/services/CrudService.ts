import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface CrudServiceOptions {
  baseURL?: string;
  headers?: Record<string, string>;
  axiosInstance?: AxiosInstance;
}

/**
 * A generic CRUD service class for interacting with a REST API endpoint.
 *
 * @template T The data type of the resource.
 * @template ID The type of the resource identifier (e.g., number or string).
 */
export class CrudService<T, ID = number> {
  protected axios: AxiosInstance;

  protected resource: string;

  constructor(resource: string, options?: CrudServiceOptions) {
    this.axios = options?.axiosInstance ?? axios.create({
      baseURL: options?.baseURL ?? '/api',
      headers: options?.headers ?? {}
    });
    this.resource = resource;
  }

  public async getAll(params?: Record<string, unknown>): Promise<T[]> {
    const response: AxiosResponse<T[]> = await this.axios.get(`/${this.resource}`, { params });
    return response.data;
  }

  public async getOne(id: ID): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(`/${this.resource}/${id}`);
    return response.data;
  }

  public async create(data: Partial<T>): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.post(`/${this.resource}`, data);
    return response.data;
  }

  public async update(id: ID, data: Partial<T>): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.put(`/${this.resource}/${id}`, data);
    return response.data;
  }

  public async delete(id: ID): Promise<void> {
    await this.axios.delete(`/${this.resource}/${id}`);
  }
}
