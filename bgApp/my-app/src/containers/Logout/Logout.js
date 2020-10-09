import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import * as actions from '../store/actions/index'
import {connect} from 'react-redux'

class Logout extends Component{
componentDidMount(){
  this.props.onLogOut()
}

  render(){
    console.log("[Logout.js] loading = ",this.props.loading)
    return <Redirect to="/"/>
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onLogOut: ()=>dispatch(actions.logOut())
  }
}
const mapStateToProps = state=>{
  return{
    loading:state.auth.loading
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Logout)