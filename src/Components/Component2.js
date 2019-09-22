import React from 'react';
import { Transition, animated } from 'react-spring/renderprops';
import './css.css';
import Sub from './SubComponent2_1.js';

const divStyle = {
    backgroundColor: 'blue',
    color: 'red',
    width: '100%',
    height: '100%'
}

/*const c1style = {
    background: 'steelblue',
    color: 'white',
    padding: '1.5rem'
}*/

const duration = 200;

class Component2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            /* */
            colorRow: [false, false, false, false, false, false],
            delay: [0, 0, 0, 0, 0, 0],
            coloredRowNumber: 0,
            disabledInput: false,
            /* */
            inputChanged: [false, false, false, false, false, false],
            inputRow: [],
            stack: [],
            inputValues: ['', '', '', '', '', '']
        }
        this.toggleDiv = this.toggleDiv.bind(this);
        this.color = this.color.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderRowWithInputs = this.renderRowWithInputs.bind(this);
        this.setColoredRowNumber = this.setColoredRowNumber.bind(this);
        this.onInputTextChange = this.onInputTextChange.bind(this);
        this.save = this.save.bind(this);
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        this.renderRowWithInputs();
    }

    toggleDiv = e => {
  
        this.setState({ show: !this.state.show });
    }

    setColoredRowNumber = (e) => {
        var i = e.target.value;
        if (i !== '') {
            if (i > this.state.colorRow.length || i < 0) {
                console.log("input value is out of scope!");
            } else {
                this.setState({ coloredRowNumber: i }, () => {
                    this.color(this.state.coloredRowNumber);
                });
            }
        }
    }

    color = (id) => {

        this.setState({ disabledInput: true }, () => {
            let timeout = 0;
            var startingID = 0;
            var counter = 0;
            for (let i = (this.state.colorRow.length - 1); i > (id - 1); i--) {
                if (this.state.colorRow[i]) {
                    var tmp = this.state.colorRow;
                    var delays = this.state.delay;
                    delays[i] = counter * duration;
                    tmp[i] = false;
                    counter++;
                    timeout += duration;
                    this.setState({ colorRow: tmp });
                }
            }

            for (let i = 0; i < this.state.colorRow.length; i++) {
                if (this.state.colorRow[i]) {
                    startingID++;
                }
            }


            for (let i = startingID; i < id; i++) {
                let delays = this.state.delay;
                delays[i] = (i - startingID) * duration;
                let tmp = this.state.colorRow;
                tmp[i] = true;
                timeout += duration;
                this.setState({ colorRow: tmp });
            }
            setTimeout(function () {
                this.setState({ disabledInput: false });
            }.bind(this), timeout);
        });


    }

    onInputTextChange = (e, id) => {
        var text = e.target.value;
        var tmpStack = this.state.stack;
        var inputVals = this.state.inputValues;
        inputVals[id] = text;
        tmpStack.push([id, text]);

        var tmp = this.state.inputChanged;
        var tmpInputs = this.state.inputRow;
        tmp[id] = true;

        this.setState({
            inputChanged: tmp,
            stack: tmpStack,
            inputValues: inputVals
        }, () => {
            tmpInputs[id] = <td key={id}><input
                type="text"
                value = {text}
                onChange={(e) => { this.onInputTextChange(e, id) }}
                className={this.state.inputChanged[id] ? "inputChanged" : ""}
                style={{ width: '50px' }}></input>
            </td>;
            this.setState({ inputRow: tmpInputs });
        });
    }

    renderRow = e => {
        var row = [];
        for (var i = 0; i < 6; i++) {
            row.push(
                <td key={i}>
                    <Sub
                        show={this.state.colorRow[i]}
                        duration={duration}
                        delay={this.state.delay[i]}
                        text={i}
                    />
                </td>
            )
        }
        return row;
    }

    renderRowWithInputs = () => {
        var row = [];
        var tmpStack = [];
        for (let i = 0; i < 6; i++) {
            tmpStack.push([i, '']);
            row.push(<td key={i}>
                <input
                    type="text"
                    value = {this.state.inputValues[i]}
                    onChange={(e) => { this.onInputTextChange(e, i) }}
                    className={this.state.inputChanged[i] ? "inputChanged" : ""}
                    style={{ width: '50px' }}>
                </input>
            </td>);
        }
        this.setState({
            inputRow: row,
            stack: tmpStack
        });
    }

    save = () => {
        var tmp = this.state.inputChanged;
        var tmpInputs = this.state.inputRow;
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i] === true) {
                tmp[i] = false;
                tmpInputs[i] = <td key={i}>
                    <input
                        type="text"
                        value = {this.state.inputValues[i]}
                        onChange={(e) => { this.onInputTextChange(e, i) }}
                        className={tmp[i] ? "inputChanged" : ""}
                        style={{ width: '50px' }}>
                    </input>
                </td>
            }
        }
        this.setState({
            inputChanged: tmp,
            inputRow: tmpInputs,
            stack: [[0, ''], [1, ''], [2, ''], [3, ''], [4, ''], [5, '']]
        });
    }

    back = () => {
        var tmp = this.state.stack;

        var tmpInputChanged = this.state.inputChanged;
        var tmpInputs = this.state.inputRow;
        if (tmp.length > 6) {
            var tail = tmp.pop();
            var id = tail[0];
           // var value = tail[1];
            var x = null;
            for (let i = (tmp.length - 1); i >= 0; i--) {
                if (tmp[i][0] === id) {
                    x = tmp[i];
                    break;
                }
            }

            if (x !== null) {
                tmpInputChanged[id] = true;
                tmpInputs[id] = <td key={id}>
                    <input
                        type="text"
                        value = {x[1]}
                        onChange={(e) => { this.onInputTextChange(e, id) }}
                        className={tmpInputChanged[id] ? "inputChanged" : ""}
                        style={{ width: '50px' }}>
                    </input>
                </td>

                this.setState({
                    inputChanged: tmpInputChanged,
                    inputRow: tmpInputs,
                    stack: tmp
                });
            }
            else {
                console.log('no back available')
            }
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.toggleDiv()}>toggle</button>
                <Transition
                    native
                    items={this.state.show}
                    from={{ width: '0%', height: '150px', overflow: 'hidden' }}
                    enter={{ width: '100%', height: '150px' }}
                    leave={{ width: '0%', height: '150px' }}
                >
                    {show => show && (props => (<animated.div style={props}>
                        <div style={divStyle}>
                            <h1>Hi there</h1>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat numquam, nulla nostrum, officia soluta inventore repellendus, eaque nihil sed voluptas ea? Deserunt iure, suscipit exercitationem earum aliquam iusto nihil nulla!
                                Veniam perspiciatis enim accusamus, autem numquam qui inventore non labore totam id quaerat dolores quos suscipit reprehenderit harum excepturi esse? Laborum nisi commodi enim, adipisci provident rem nobis similique distinctio?
                                </p>
                        </div>
                    </animated.div>))}

                </Transition>
                <br />
                <br />
                <input type="text" disabled={this.state.disabledInput} defaultValue={0} onChange={(e) => this.setColoredRowNumber(e)} style={{ width: '50px' }}></input>
                <button onClick={() => this.color(this.state.coloredRowNumber)}>color row</button>
                <br />
                <button onClick={() => this.save()}>save inputs</button>
                <button onClick={() => this.back()} style={{ marginLeft: '15px' }}>back</button>
                <table className="tableBorder">
                    <thead>
                        <tr><th>x</th><th>y</th><th>z</th><th>x</th><th>y</th><th>z</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            {this.renderRow()}
                        </tr>
                        <tr>
                            {this.state.inputRow}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
//
export default Component2;