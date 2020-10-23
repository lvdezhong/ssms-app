import { request } from 'umi';

export async function queryCourse(params) {
  return request('/api/course/query', {
    params,
  });
}

export async function addCourse(params) {
  return request('/api/course/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteCourse(params) {
  return request('/api/course/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getCourse(params) {
  return request('/api/course/get', {
    params,
  });
}

export async function updateCourse(params) {
  return request('/api/course/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
