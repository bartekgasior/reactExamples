import React from 'react';

class Functional1 extends React.Component{

    functionalComponent_1 = ({ text, onTextChange }) => {
        return <div>
            <input type = "text" onChange = { (e) => onTextChange(e)} defaultValue = {text}/>
        </div>
    }

}

export default Functional1;