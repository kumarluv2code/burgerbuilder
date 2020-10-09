import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'
import classes from './withErrorHandler.module.css'
const withErrorHandler = (WrappedComponent,axios)=>{
  
    return class extends Component{
      constructor(props){
        super(props)
        this.state ={
          error:null
        }
        axios.interceptors.request.use(request =>{
            this.setState({error:null})
          return request
      })
        axios.interceptors.response.use(response=>response,error=>{
          this.setState({error:error})
        });
      }
      
      //global error handler using interceptors
      errorConfirmedHandler=()=>{
        this.setState({error:null})
      }
      
      render(){
        return(
          <Aux>
            <Modal 
              show={this.state.error}
              modalClosed={this.errorConfirmedHandler}>
              <span className={classes.WithErrorHandler}>
                {this.state.error ? this.state.error.message:null}
              </span>
            </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
        )
      }
    }
}
export default withErrorHandler