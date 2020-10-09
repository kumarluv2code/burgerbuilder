import React,{Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import classes from './Layout.module.css'
import ToolBar from '../../components/Navigation/ToolBar/ToolBar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component {

  state = {
    showSideDrawer : false,
  }

  sideDrawerCloseHandler = ()=>{
    this.setState({showSideDrawer : false})
  }

  sideDrawerToggleHandler=()=>{
    this.setState((prevState)=>{
      return({showSideDrawer:!prevState.showSideDrawer})
    });
  }
  render() {
    return(
      <Aux>
          <ToolBar
            isAuth={this.props.isAuthenticated} 
            drawerToggleClicked={this.sideDrawerToggleHandler}/>
          <SideDrawer 
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerCloseHandler}
          open={this.state.showSideDrawer}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    )
  }
}
const mapDispatchToProps=state=>{
  return{
    isAuthenticated:state.auth.token !==null
  }
}
export default connect(mapDispatchToProps)(Layout)