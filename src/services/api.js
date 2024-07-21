import axios from 'axios'

const API_URL = 'https://dewantara-api.vercel.app/api/v1'

const getToken = () => localStorage.getItem('token')

export const getArticles = async () => {
  return await axios.get(`${API_URL}/articles/all`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const createArticle = async (articleData) => {
  const formData = new FormData()
  formData.append('title', articleData.title)
  formData.append('content', articleData.content)
  if (articleData.file) {
    formData.append('file', articleData.file)
  }
  const token = getToken()
  const response = await axios.post(`${API_URL}/article`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}


export const updateArticle = async (id, articleData) => {
  const formData = new FormData()
  formData.append('title', articleData.title)
  formData.append('content', articleData.content)
  if (articleData.file) {
    formData.append('file', articleData.file)
  }
  const token = getToken()
  const response = await axios.put(`${API_URL}/articles/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}

export const deleteArticle = async (id) => {
  return await axios.delete(`${API_URL}/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}


export const getEvents = async () => {
  return await axios.get(`${API_URL}/events/all`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const createEvent = async (eventData) => {
  const formData = new FormData()
  formData.append('name', eventData.name)
  formData.append('start_date', eventData.start_date)
  formData.append('end_date', eventData.start_date)
  formData.append('location', eventData.location)
  if (eventData.files) {
    formData.append('files', eventData.files)
  }
  const token = getToken()
  const response = await axios.post(`${API_URL}/event`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}


export const updateEvent = async (id, eventData) => {
  const formData = new FormData()
  formData.append('name', eventData.name)
  formData.append('description', eventData.description)
  if (eventData.file) {
    formData.append('file', eventData.file)
  }
  const token = getToken()
  const response = await axios.put(`${API_URL}/events/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}

export const deleteEvent = async (id) => {
  return await axios.delete(`${API_URL}/events/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}



export const getPuppets = async () => {
  return await axios.get(`${API_URL}/puppets/all`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const createPuppet = async (puppetData) => {
  const formData = new FormData()
  formData.append('name', puppetData.name)
  formData.append('description', puppetData.description)
  if (puppetData.file) {
    formData.append('file', puppetData.file)
  }
  const token = getToken()
  const response = await axios.post(`${API_URL}/puppet`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}


export const updatePuppet = async (id, puppetData) => {
  const formData = new FormData()
  formData.append('name', puppetData.name)
  formData.append('description', puppetData.description)
  if (puppetData.file) {
    formData.append('file', puppetData.file)
  }
  const token = getToken()
  const response = await axios.put(`${API_URL}/puppets/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  })
  return response.data
}

export const deletePuppet = async (id) => {
  return await axios.delete(`${API_URL}/puppets/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}


export const getMuseums = async () => {
  return await axios.get(`${API_URL}/museums/all`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}


export const createMuseum = async (museumData, operatingHours, tickets, collections) => {
  const formData = new FormData();
  formData.append('name', museumData.name);
  formData.append('description', museumData.description);
  if (museumData.file) {
    formData.append('file', museumData.file);
  }

  const token = getToken();
  const museumResponse = await axios.post(`${API_URL}/museum`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  const museumId = museumResponse.data.data.id;

  await axios.post(`${API_URL}/operating_hours?museum_id=${museumId}`, operatingHours, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await axios.post(`${API_URL}/tickets?museum_id=${museumId}`, tickets, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await axios.post(`${API_URL}/collections?museum_id=${museumId}`, collections, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return museumResponse.data;
};

export const updateMuseum = async (id, museumData, operatingHours, tickets, collections) => {
  const formData = new FormData();
  formData.append('name', museumData.name);
  formData.append('description', museumData.description);
  if (museumData.file) {
    formData.append('file', museumData.file);
  }

  const token = getToken();
  const museumResponse = await axios.put(`${API_URL}/museums/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  await axios.put(`${API_URL}/operating_hours?museum_id=${id}`, operatingHours, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await axios.put(`${API_URL}/tickets?museum_id=${id}`, tickets, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await axios.put(`${API_URL}/collections?museum_id=${id}`, collections, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return museumResponse.data;
};
