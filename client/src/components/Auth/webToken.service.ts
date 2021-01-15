
import { store } from '@/redux/store/rootStore';

function isAccessTokenExpired() {
  const accessTokenExpDate = store.getState().authUser.tokenExpDate - 10;
  const nowTime = Math.floor(new Date().getTime() / 1000);
  
  return accessTokenExpDate <= nowTime;
}
  
export const parseTokenData = (accessToken:string):any =>{
  let tokenData = {};
  
  try {
    const payloadArr = accessToken.split('.');
    
    tokenData = JSON.parse(atob(payloadArr[1]));
  } catch (error) {
    throw new Error(error);
  }

  console.log('tokenData=', tokenData);
  return tokenData;
};
  
