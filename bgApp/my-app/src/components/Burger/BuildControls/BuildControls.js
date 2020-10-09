import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Salad',type:'salad'},
  {label: 'Bacon',type:'bacon'},
  {label: 'Meat',type:'meat'},
  {label: 'Cheese',type:'cheese'},
]
const buildControls = (props)=>{
  return(<div className={classes.BuildControls}>
      <p>Current Price : {props.totalPrice}</p>
      {
        controls.map((ctrl)=>(
          <BuildControl 
          key={ctrl.label} 
          label={ctrl.label} 
          added={()=>props.ingredientsAdded(ctrl.type)}
          removed={()=>props.ingredientsRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}/>
        ))
      }
      <button style={{marginBottom:'80px'}}
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchased}>
       {props.isAuth? 'ORDER NOW':'SIGNUP TO ORDER'}
      </button>
    </div>
    )
}
export default buildControls