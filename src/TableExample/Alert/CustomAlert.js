import React from 'react';
import { Transition, animated } from 'react-spring/renderprops';
import './CustomAlert.css';

const CloseAlert = ({ onClickFun }) =>
    <div className="alertXButton" >
        <div onClick={onClickFun}><label>&times;</label></div>
    </div>

const Main = ({ onClickFun, text }) =>
    <div className="main">
        <div className = "textContainer">
            {text}
        </div>
        <div className ="mainButtonContainer">
            <button onClick = {onClickFun} className = "mainButton">ok</button>
        </div>
    </div>

export default class CustomAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            duration: 0,
            translate: 'translate3d(0,0px,0)'
        }
    }

    componentDidMount = () => {
        var f = this.props.from;
        var value = this.props.startingMarginValue;
        var x, y, z;
        var margin;
        if (f.toLowerCase() === 'top') {
            x = 0;
            y = value;
            z = 0;
        }
        else if (f.toLowerCase() === 'bottom') {
            x = 0;
            y = (-1) * value;
            z = 0;
        }
        else if (f.toLowerCase() === 'left') {
            x = value;
            y = 0;
            z = 0;
        }
        else if (f.toLowerCase() === 'right') {
            x = (-1) * value;
            y = 0;
            z = 0;
        }
        else if (f.toLowerCase() === 'top_left') {
            x = value;
            y = value;
            z = 0;
        }
        else if (f.toLowerCase() === 'top_right') {
            x = (-1) * value;
            y = value;
            z = 0;
        }
        else if (f.toLowerCase() === 'bottom_right') {
            x = (-1) * value;
            y = (-1) * value;
            z = 0;
        }
        else if (f.toLowerCase() === 'bottom_left') {
            x = value;
            y = (-1) * value;
            z = 0;
        }

        var trans = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
        console.log(trans);
        this.setState({
            from: f,
            duration: this.props.duration,
            translate: trans
        });
    }

    render() {
        return (
            <div>
                <Transition
                    native
                    items={this.props.show}
                    from={{ width: '0px', height: '0px'}}
                    enter={{ width: '100px', height: '100px'}}
                    leave={{ width: '0px', height: '0px' }}
                    config = {{duration: 0}}

                >
                    {show => show && (props => (<animated.div style={props}>
                        <div className = "background" onClick={ () => this.props.toggleAlert()}>

                        </div>
                            
                    </animated.div>))}
                </Transition>

                <Transition
                    native
                    items={this.props.show}
                    from={{ transform: this.state.translate, opacity: '0' }}
                    enter={{ transform: 'translate3d(0,0px,0)', opacity: '1' }}
                    leave={{ transform: this.state.translate, opacity: '0' }}
                    config={{ duration: this.state.duration }}
                >
                    {show => show && (props => (<animated.div style={props}>
                        <div className="alert">
                            <CloseAlert
                                onClickFun={this.props.toggleAlert}
                            />
                            <Main
                                text={'abc'}
                                onClickFun={this.props.alertOKClicked}
                            />
                        </div>
                    </animated.div>))}
                </Transition>
            </div>
        )
    }
}