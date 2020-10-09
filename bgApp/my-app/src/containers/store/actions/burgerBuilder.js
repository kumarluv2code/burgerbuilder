import * as actionType from './actionTypes'
import axios from '../../../axios-order'
export const addIngredient=(name)=>{
  return{
    type:actionType.ADD_INGREDIENT,
    ingredientName:name,
  }
}


export const removeIngredient=(name)=>{
  return{
    type:actionType.REMOVE_INGREDIENT,
    ingredientName:name,
  }
}

export const setIngredients=(ingredients)=>{
  return{
    type: actionType.SET_INGREDIENTS,
    ingredients:ingredients
  }
}

export const fetchIngredientsFailed=()=>{
  return{
    type:actionType.FETCHINGREDIENTS_FAILED
  }
}
export const initIngredients=()=>{
  return (dispatch)=>{
    axios.get('https://makemyburger-8a096.firebaseio.com/ingredients.json')
    .then(response=>{
      dispatch(setIngredients(response.data))
    })
    .catch(error=>{
      dispatch(fetchIngredientsFailed())
    })
  }
}