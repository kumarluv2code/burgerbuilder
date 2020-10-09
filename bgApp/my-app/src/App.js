import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckOut from  './containers/Checkout/Checkout'
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Logout/Logout'
import {connect} from 'react-redux'
import * as actions from './containers/store/actions/index'

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp()
  }
render(){

  let routes=(  
    <Switch>
      <Route path="/" exact component={BurgerBuilder}/>  
      <Route path="/auth" exact component={Auth}/>
     
      <Redirect to="/"/>  
    </Switch>
  );

  if(this.props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" component={CheckOut}/>
        <Route path="/orders" exact component={Orders}/>  
        <Route path="/logout" exact component={Logout}/> 
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/auth" exact component={Auth}/>
        <Redirect to="/"/>  
      </Switch>
    )
  }
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onTryAutoSignUp: ()=>dispatch(actions.authCheckState())
  }
}

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
