import React from 'react';
import './css.css';
import Select from './Select/CustomSelectComponent.js';
import Alert from './Alert/CustomAlert.js';
import AutoSuggest from './AutoSuggest/AutoSuggestComponent.js';
import DatePicker from './DatePicker/DatePicker';
import { PacmanSpinner, LoadingText } from './Spinner/Spinner';
import { FlipableCell } from '../FlipCard/FlipCard';

const status1 = {
    id: 1,
    namePL: 'st1_pl',
    nameDE: 'st1_de',
    nameEN: 'st1_en',
    red: 168,
    green: 50,
    blue: 86,
    type: 'm2'
}

const status3 = {
    id: 35,
    namePL: 'st3_pl',
    nameDE: 'st3_de',
    nameEN: 'st3_en',
    red: 50,
    green: 168,
    blue: 162,
    type: 'm2'
}

const status2 = {
    id: 21,
    namePL: 'st2_pl',
    nameDE: 'st2_de',
    nameEN: 'st2_en',
    red: 76,
    green: 168,
    blue: 50,
    type: 'm2'
}

export default class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statuses: [status1, status2, status3],
            statusesIDS: [-1, -1, -1, -1, -1],
            secondarySuggestions: ['oranges', 'tomatoes2', 'apples', 'tomatoes12', 'toto', 'bananas'],
            suggestions: ['tomatoes', 'tomatoes1', 'tom tom', 'tom', 'tom1', 'tom2', 'potatoes', 'kiwis'],
            showAlert: false,
            currentDate: new Date()
        };
    }

    renderRow = (list) => {
        var row = [];
        row.push(
            list.map((l, index) => {
                var statID = index % 3;
                return <td key={index}>
                    <Select
                        id={index}
                        setStatusID={this.setStatusID}
                        statuses={this.state.statuses}
                        language={"de"}
                        currentStatus={this.state.statuses[statID]}
                        buttonVisible={true}
                    />
                </td>
            })
        );
        return row;
    }

    setStatusID = (id, statusID) => {
        var tmpArray = this.state.statusesIDS;
        tmpArray[id] = statusID;
        this.setState({ statusesIDS: tmpArray });
    }

    toggleAlert = () => {
        this.setState({ showAlert: !this.state.showAlert });
    }

    alertOKClicked = () => {
        this.setState({}, () => {
            this.toggleAlert();
            console.log('ok clicked!!');
        });
    }

    forceFullScreen = () => {
        const ul = this.refs.fullscreen;
        ul.requestFullscreen();
    }

    render() {
        return (
            <div ref={"fullscreen"}>
                <table id="tableComponent">
                    <thead>
                        <tr>
                            <th>xx</th>
                            <th>xx</th>
                            <th>xx</th>
                            <th>xx</th>
                            <th>xx</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {this.renderRow(this.state.statusesIDS)}
                        </tr>
                    </tbody>
                </table>
                <button onClick={this.toggleAlert}>
                    Toggle alert
                </button>
                <Alert
                    show={this.state.showAlert}
                    toggleAlert={this.toggleAlert}
                    alertOKClicked={this.alertOKClicked}
                    from={"bottom"}
                    startingMarginValue={-600}
                    duration={250}
                />
                <AutoSuggest
                    suggestions={this.state.suggestions}
                    secondarySuggestions={this.state.secondarySuggestions}
                    charsToCheck={3}
                />
                <br />
                <br />
                <button onClick={this.forceFullScreen}> full screen </button>
                <br />
                <br />
                <br />
                <br />
                <DatePicker
                    locale={'pl'}
                    currentDate={this.state.currentDate}
                    year={2019}
                    week={43}
                    highlightDay={true}
                    highlightWeek={true}
                />

                <PacmanSpinner />

                <br />
                <br />
                <br />
                <br />
                <FlipableCell
                    textFront={'front'}
                    textBack={'back'}
                    isTooltipVisible={true}
                />
            </div>
        )
    }
}