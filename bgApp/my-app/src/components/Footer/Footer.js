import React from 'react'
import classes from './Footer.module.css'
import {Link} from 'react-router-dom'
const footer=(props)=>{
  return(
    <footer className={classes.Footer}>
        <p>Author : &copy;
          <Link to="/" style={{color:'black',
        letterSpacing:'2px',
      textDecoration:'none'}}> kumarRahul@gmail.com</Link>
        </p>
    </footer>
  )
}
export default footer