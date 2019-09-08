import React from 'react';
import { slideInLeft } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import './css.css';
const bounceAnimation = keyframes`${slideInLeft}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

const FComp = (id) =>
    <div>hi {id}</div>


const functionalComponent_1 = (text, over, fun, fun1, fun2) => (
    <div>
        <input type="text"
            className={over ? "class1" : ""}
            onChange={fun}
            defaultValue={text}
            onMouseOver={fun1}
            onMouseLeave={fun2} />
    </div>
);

function ProgressBar(progress) {
    return (
        <div className="progressbar">
            <div className="progress" style={{ width: `${progress}%` }}>
            </div>
        </div>
    )
}

class Component1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseOver: false,
            progress: [0, 0]
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onMouseOn = this.onMouseOn.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.changeProgress = this.changeProgress.bind(this);
    }

    onTextChange(e) {
        console.log(e.target.value);
    }

    onMouseOn(e) {
        this.setState({ mouseOver: true }, () => console.log(this.state.mouseOver));
    }

    onMouseOut(e) {
        this.setState({ mouseOver: false }, () => console.log(this.state.mouseOver));

    }

    changeProgress(i) {
        console.log(i);
        console.log("A");
        if (i < 2) {
            var array = this.state.progress;
            array[i] = 100;
            this.setState({ progress: array }, () => {
                setTimeout(() => {
                    this.changeProgress(i + 1);
                }, 1000);
            });
        }
    }

    render() {
        return (
            <div>
                iii
                {FComp(111)}
                {functionalComponent_1('Bartosz',
                    this.state.mouseOver,
                    (e) => this.onTextChange(e),
                    (e) => this.onMouseOn(e),
                    (e) => this.onMouseOut(e))}

                <button onClick={() => this.changeProgress(0)} >xxx</button>
                <div className="inline">
                    {ProgressBar(this.state.progress[0])}
                </div>
                <div className="inline">
                    {ProgressBar(this.state.progress[1])}
                </div>
            </div>
        )
    }
}

export default Component1;
