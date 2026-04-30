import axios from "axios";

const BASE_URL = "http://localhost:8080/api/students";

export const getAllStudents = () => axios.get(BASE_URL);
export const getStudentById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createStudent = (data) => axios.post(BASE_URL, data);
export const updateStudent = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${BASE_URL}/${id}`);