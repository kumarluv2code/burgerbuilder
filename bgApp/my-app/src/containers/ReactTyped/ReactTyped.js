import React,{ Component } from 'react';
import Typed from 'react-typed';
import classes from './ReactTyped.module.css'
class MyComponent extends Component {
    render() {
        return (
            <div className={classes.ReactTyped}>
                <Typed
                strings={[
                    'We provide Excellent service',
                    'Burger with Special Ingredients',
                    'We Hope it tastes well!']}
                    typeSpeed={40}
                    backSpeed={30}
                    loop
                    showCursor={false}
                    autoInsertCss={true}
                    smartBackspace={true}
                />
                <br/>
            </div>
        );
    }
}
export default MyComponent