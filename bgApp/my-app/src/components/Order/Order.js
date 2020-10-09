import React, { Component } from 'react'
import classes from './Order.module.css'
import Button from '../UI/Button/Button'
import {connect } from 'react-redux'
import * as actions from '../../containers/store/actions/index'
class Order extends Component {

  orderDeleteClickHandler=(orderId)=>{
    console.log(orderId)
    this.props.onDeleteOrder(orderId)
  }
render(){
  const ingredients = [];
  for(let ingredientName in this.props.ingredients){
      ingredients.push({
          name: ingredientName,
          quantity: this.props.ingredients[ingredientName]
      }) 
  }
  const ingredientsOutput = ingredients.map((ig)=>{
    return <span
              style={{
              textTransform  :"capitalize",
              display:'inline-block',
              margin:'0 8px',
              border:'1px solid #ccc',
              padding:'5px'
            }} 
              key={ig.name}> 
              {ig.name} ({ig.quantity}) 
            </span>
  })


  return(
    <div className={classes.Order}>
      <p>Ingredients : {ingredientsOutput}</p>
      <p>Price : <strong>USD {this.props.price}</strong></p>
      <Button btnType="Success" clicked={()=>this.orderDeleteClickHandler(this.props.orderId)}>Delete Order</Button>
      </div>
  )
}
}
const mapStateToProps = state=>{
 return{
   orders: state.order.orders
 }
}

const mapDispatchToProps=dispatch=>{
  return{
    onDeleteOrder:(orderId)=>dispatch(actions.deleteOrder(orderId))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Order);