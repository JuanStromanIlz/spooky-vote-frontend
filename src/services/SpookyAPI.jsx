import axios from 'axios';

const spookyAPI = axios.create({
  baseURL: 'https://spooky-vote.herokuapp.com/'
});

function handleError(err) {
  console.log(err.message);
}

export async function getAll() {
  try {
    let res = await spookyAPI.get('character');
    if(res.data.status !== 'success') {
      return handleError(res.data.message);
    }
    return res.data.data;
  }
  catch(err) {
    handleError(err);
  }
}

export async function vote(id) {
  try {
    let res = await spookyAPI.get(`character/vote?id=${id}`);
    if (res.data.status !== 'success') {
      return handleError(res.data.message);
    }
    return '¡Buen voto!';
  }
  catch(err) {
    handleError(err);
  }
}

export async function register(form) {
  try {
    let newFormData = new FormData();
    newFormData.append('name', form.name);
    newFormData.append('actor', form.actor);
    newFormData.append('avatar', form.avatar);
    let res = await spookyAPI.post('character/new', newFormData);
    if (res.data.status !== 'success') {
      return handleError(res.data.message);
    }
    return 'Ya estas participando.';
  }
  catch(err) {
    handleError(err);
  }
}

export async function winners() {
  try {
    let res = await spookyAPI.get('character/winners');
    if (res.data.status !== 'success') {
      return handleError(res.data.message);
    }
    return res.data.data;
  }
  catch(err) {
    handleError(err);
  }
}