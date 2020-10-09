import * as actionType from '../actions/actionTypes'
import axios from 'axios'

export const authStart=()=>{
  return{
    type:actionType.AUTH_START
  }
}

export const authSuccess=(token,userId)=>{
  return{
    type:actionType.AUTH_SUCCESS,
    token:token,
    userId:userId,
  }
}

export const authFail=(error)=>{
  return{
    type:actionType.AUTH_FAIL,
    error:error,
  }
}

export const logOut=()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return{
    type:actionType.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
      setTimeout(()=>{
        dispatch(logOut())
      },expirationTime * 1000)
    }
}
export const auth=(email,password,isSignUp)=>{
  return dispatch=>{
    dispatch(authStart())
    const authData={
      email:email,
      password:password,
      returnSecureToken : true,
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBK_7A7WlzEYK_5ZgforRFTCNmL1dyzyk'
      if(!isSignUp){
        url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBK_7A7WlzEYK_5ZgforRFTCNmL1dyzyk'
      }
    axios.post(url,authData)
    .then((response)=>{
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
      localStorage.setItem('token',response.data.idToken)
      localStorage.setItem('expirationDate',expirationDate)
      localStorage.setItem('userId',response.data.localId)
      dispatch(authSuccess(response.data.idToken,response.data.localId))
      dispatch(checkAuthTimeout(response.data.expiresIn))
    })
    .catch((err)=>{
      console.log(err)
      dispatch(authFail(err.response.data.error))
    })
  }
}
export const setAuthRedirectPath=(path)=>{
  console.log('[auth.js setAuthRedirect]',path)
  return{
    type:actionType.SET_AUTH_REDIRECT_PATH,
    path:path
  }
}

export const authCheckState=()=>{
  return dispatch=>{
    const token = localStorage.getItem('token');
    if(!token){
      dispatch(logOut())
    } else{
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if(expirationDate <= new Date()){
          dispatch(logOut())
        }else{
          const userId = localStorage.getItem('userId')
          dispatch(authSuccess(token,userId))
          dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
        }
    } 
  }
}