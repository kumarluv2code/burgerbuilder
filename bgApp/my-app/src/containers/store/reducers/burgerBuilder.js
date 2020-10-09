import * as actionType from '../actions/actionTypes'

const initialState = {
  ingredients:null,
  totalPrice:40,
  error:false,
  building:false
}
const INGREDIENT_PRICES = {
  salad: 20,
  bacon: 50,
  meat:90,
  cheese:30,
}
const reducer=(state = initialState ,action)=>{
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return{
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
      }
      
      case actionType.REMOVE_INGREDIENT:
        return{
          ...state,
          ingredients:{
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
          building:true,
          }
        
       case actionType.SET_INGREDIENTS:
         return {
           ...state,
           ingredients: {
             salad : action.ingredients.salad,
             cheese:action.ingredients.cheese,
             bacon:action.ingredients.bacon,
             meat:action.ingredients.meat,
           },
           building:false,
           error:false,
           totalPrice:40,
         }
         case actionType.FETCHINGREDIENTS_FAILED:
         return {
           ...state,
           error:true
         }  
    default: return state
  }
}
export default reducer