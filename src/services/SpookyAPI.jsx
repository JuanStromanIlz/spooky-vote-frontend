import axios from 'axios';

const spookyAPI = axios.create({
  baseURL: 'https://spooky-vote.herokuapp.com/'
});

function handleError(err) {
  throw new Error(err.message);
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
    return {
      message: 'Ya estas participando.',
      user: res.data.user
    };
  }
  catch(err) {
    handleError(err);
  }
}

export async function getWinners() {
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