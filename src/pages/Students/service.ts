import { request } from 'umi';

export async function queryStudents(params) {
  return request('/api/students/query', {
    params,
  });
}

export async function addStudents(params) {
  return request('/api/students/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteStudents(params) {
  return request('/api/students/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getStudents(params) {
  return request('/api/students/get', {
    params,
  });
}

export async function updateStudents(params) {
  return request('/api/students/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
