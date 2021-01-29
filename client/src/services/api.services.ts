import { HEADER_JSON, BASE_HTTP_URL } from '@/constants/constants';
import { store } from '@/redux/store/rootStore';

export const API_INFO_URLS = {
  users: `${<string>BASE_HTTP_URL}/users`,
  cards: `${<string>BASE_HTTP_URL}/cards`,
  userDeck: `${<string>BASE_HTTP_URL}/decks`,
  level: `${<string>BASE_HTTP_URL}/level`,
};

export const getRequestInit = (method = 'GET'): RequestInit => {
  const { accessToken } = store.getState().authUser;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    ...HEADER_JSON,
  };
  return {
    method,
    headers,
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
  };
};
