import { http } from './HttpService'

export function getAllNests() {
    return http().get('/nest');
}

export function getNestById(id) {
    return http().get(`/nest/${id}`);
}

export function createNest(nest) {
    return http().post('/nest', nest);
}

export function deleteNest(id) {
    return http().delete(`/nest/${id}`);
}

export function updateNest(nest) {
    return http().put('/nest', nest);
}