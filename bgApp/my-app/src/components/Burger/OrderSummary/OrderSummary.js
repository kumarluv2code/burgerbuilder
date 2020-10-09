import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{
  render(){
    const ingredientsSummary = Object.keys(this.props.ingredients)
    .map((igKey)=>{
      return  <li key={igKey}><span style={{textTransform : "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}</li> 
    })
    return(
      <div>
          <Aux>
            <h1>Your Order</h1>
            <p>A delicious burger with the following ingredients!</p>
              <ul>
                {ingredientsSummary}
              </ul>
              <p><strong> Total Price: ${this.props.totalPrice}</strong></p>
              <p>Continue to checkout ?</p>
              </Aux>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </div>
      )
  }
} 
export default OrderSummary