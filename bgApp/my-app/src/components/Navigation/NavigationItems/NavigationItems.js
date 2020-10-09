import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';

const navigationItems=(props)=>(
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact active>Burger Builder</NavigationItem>  
   {props.isAuthenticated? <NavigationItem link="/orders">Orders</NavigationItem>:null}  
    {!props.isAuthenticated? 
      <NavigationItem link="/auth">Authenticate</NavigationItem>
      :<NavigationItem link="/logout">Logout</NavigationItem>  
    }
  </ul>
)
export default navigationItems