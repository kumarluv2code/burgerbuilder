import * as actionType from '../actions/actionTypes'
import axios from '../../../axios-order'
 
export const purchaseBurgerSuccess=(id,orderData)=>{
  return{
    type:actionType.PURCHASE_BURGER_SUCCESS,
    orderId:id,
    orderData:orderData,
  }
}

//sync task
export const purchaseBurgerFail=(error)=>{
  return{
    type:actionType.PURCHASE_BURGER_FAIL,
    error:error,
  }
}


export const purchaseBurgerStart=()=>{
  return{
    type:actionType.PURCHASE_BURGERSTART
  }
}

export const purchaseInit=()=>{
  return{
    type:actionType.PURCHASE_INIT
  }
}

//async task
export const purchaseBurger=(orderData,token)=>{
  return dispatch =>{
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json?auth='+token,orderData)
    .then(response=>{
      console.log(response.data)
      dispatch(purchaseBurgerSuccess(response.data.name,orderData))
      console.log(response.data.name, orderData)
    })
    .catch(error=>{
      dispatch(purchaseBurgerFail(error))
    })
  }
}


//FETCH ORDER
export const fetchOrderSuccess=(orders)=>{
  return{
    type:actionType.FETCH_ORDERS_SUCCESS,
    orders:orders,
  }
}

export const fetchOrderFail=(error)=>{
  return{
    type:actionType.PURCHASE_BURGER_FAIL,
    error:error,
  }
}

export const fetchOrderStart=()=>{
  return{
    type:actionType.FETCH_ORDERS_START
  }
}

export const fetchOrders=(token,userId)=>{
  //console.log('[order.js] fetchOrders userId = ',token)
  return dispatch=> {
    dispatch(fetchOrderStart());
    const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
    axios.get('/orders.json'+queryParams)
    .then((response)=>{
      console.log(response)
      const fetchedOrders = [];
      for(let key in response.data){
        fetchedOrders.push({
          ...response.data[key],
          id:key
        })
      }
      dispatch(fetchOrderSuccess(fetchedOrders))
    })
    .catch((error)=>{
      dispatch(fetchOrderFail(error))
    })
  }
}

export const deleteOrderSuccess=(orderId)=>{
  return{
    type:actionType.DELETE_ORDER_SUCCESS,
    orderId:orderId
  }
}


export const deleteOrderFail=(error)=>{
  return{
    type:actionType.DELETE_ORDER_FAIL,
    error:error
  }
}

export const deleteOrderStart=()=>{
  return{
    type:actionType.DELETE_ORDER_START
  }
}

export const deleteOrder=(orderId)=>{
  console.log('[order.js ] deleteOrder',orderId)
  return dispatch=>{
    dispatch(deleteOrderStart())
    axios.delete('')
    .then((response)=>{
      console.log(response)
      dispatch(deleteOrderSuccess())
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}

