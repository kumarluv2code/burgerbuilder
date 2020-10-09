import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../store/actions/index'
import axios from '../../axios-order'


class BurgerBuilder extends Component{
  state = {
    purchasing:false,
  }

  componentDidMount(){
    this.props.onInitIngredients()
  }
    updatePurchaseState = (ingredients)=>{
      const sum = Object.keys(ingredients)
      .map((igKey)=>{
          return ingredients[igKey]
      })
      .reduce((sum,el)=>{
        return sum + el
      },0);
      return sum > 0 ;
    }

  // addIngredientHandler = (type)=>{
  //     const oldCount = this.state.ingredients[type]
  //     const updatedCount = oldCount + 1;
  //     // if(this.state.ingredients[type]>=2){
  //     //   return
  //     // }
  //     const updatedIngredients = {
  //       ...this.state.ingredients
  //     }
  //     updatedIngredients[type] = updatedCount
  //     const priceAddition = INGREDIENT_PRICES[type]
  //     const oldPrice = this.state.totalPrice
  //     const newPrice = oldPrice + priceAddition
  //     this.setState({totalPrice:newPrice, ingredients : updatedIngredients})
  //     this.updatePurchaseState(updatedIngredients)
  // }

  // removeIngredientHandler = (type)=>{
  //   const oldCount = this.state.ingredients[type]
  //   if(oldCount <=0){
  //     return
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceDeduction = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice - priceDeduction
  //   this.setState({totalPrice:newPrice, ingredients : updatedIngredients})
  //   this.updatePurchaseState(updatedIngredients)
  // }

  purchaseHandler = ()=>{
    if(this.props.isAuthenticated){
      this.setState({purchasing : true})
    }else{
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = ()=>{
    this.setState({purchasing:false})
  }

  purchaseContinueHandler = ()=>{
    this.props.onInitPurchase();
    this.props.history.push('/checkout')
    //sending ingredients data to checkout-page using queryparams
    // const queryparams = [];
    // for(let i in this.state.ingredients){
    //   queryparams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryparams.push('price='+this.state.totalPrice)
    // const queryString = queryparams.join('&')
    // this.props.history.push({
    //   pathname:'/checkout',
    //   search:'?'+ queryString
    // })
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key]<= 0
    }
    let orderSummary = null;
    
    
    let burger = this.props.error? <p>Ingredients cant be loaded!</p>:<Spinner/>
    if(this.props.ings){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
            <BuildControls 
              isAuth={this.props.isAuthenticated}
              ingredientsAdded= {this.props.onIngredientAdded} 
              ingredientsRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              totalPrice={this.props.price}
              purchasable={this.updatePurchaseState(this.props.ings)}
              purchased={this.purchaseHandler}
              />
        </Aux>
      )
      orderSummary = <OrderSummary 
        totalPrice={this.props.price}
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
    />
    }
    // if(this.state.loading){
    //   orderSummary=<Spinner/>
    //  } 
    
    return(
        <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
            {burger}
          </Aux>
    )
  }
}

const mapStateToProps =(state)=> {
  return{
    ings: state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuthenticated:state.auth.token !==null,
  };
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
    onInitIngredients:()=>dispatch(actions.initIngredients()),
    onInitPurchase:()=>dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path)),
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios))