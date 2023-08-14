import React from 'react';
import './die.css';


const Die = (props) => {
   const styles={
        backgroundColor: props.isHeld ? '#59E391' : 'transparent'
    }
    return (
        <div className="dieFace" style={styles} onClick={props.holding}>
            <h1 className='number'>{props.value}</h1>
        </div>
        
    );
}

export default Die;