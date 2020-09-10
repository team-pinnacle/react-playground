import axios from 'axios';

const GET_USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const usersService = {
  getUsers: () => {
    return axios.get(GET_USERS_URL);
  }
};
