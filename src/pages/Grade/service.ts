import { request } from 'umi';

export async function queryGrade(params) {
  return request('/api/grade/query', {
    params,
  });
}

export async function addGrade(params) {
  return request('/api/grade/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteGrade(params) {
  return request('/api/grade/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getGrade(params) {
  return request('/api/grade/get', {
    params,
  });
}

export async function updateGrade(params) {
  return request('/api/grade/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
