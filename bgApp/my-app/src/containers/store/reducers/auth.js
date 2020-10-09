import * as actionType from '../actions/actionTypes'
import updatedObject from '../utility'

const initialState = {
  token:null,
  error:null,
  loading:false,
  userId:null,
  authRedirect: '/'
}

const authStart=(state,action)=>{
  return updatedObject(state,{error:null,loading:true,})
}

const authSuccess=(state,action)=>{
  return updatedObject(state,{
    token:action.token,
    userId:action.userId,
    error:null,
    loading:false,
  })
}
const authFail=(state,action)=>{
  return updatedObject(state,{
    error:action.error,
    loading:false,
  })
}
const authLogOut=(state,action)=>{
  return updatedObject(state,{token: null,userId:null})
}

const authRedirectPath=(state,action)=>{
  return updatedObject(state,{authRedirect:action.path})
}
const reducer=(state = initialState,action)=>{
  switch(action.type){
    case actionType.AUTH_START: return authStart(state,action);
    case actionType.AUTH_SUCCESS: return authSuccess(state,action)
    case actionType.AUTH_FAIL: return authFail(state,action)
    case actionType.AUTH_LOGOUT : return authLogOut(state,action)
    case actionType.SET_AUTH_REDIRECT_PATH:return authRedirectPath(state,action)
    default : return state
  }
}

export default reducer