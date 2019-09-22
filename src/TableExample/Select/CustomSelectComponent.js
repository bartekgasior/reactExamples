/* 

###### status variable example ######
var status = {
    id: 25,
    name_pl: 'status_name_PL',
    name_de: 'status_name_DE',
    name_en: 'status_name_EN',
    red: 125,
    green: 200,
    blue: 36,
    type: 'm2Bestell',
    active: true
}

###### Component takes props: ######
* language - given language
* id - index in array of element containing select
* setStatusID - function which set statusID on given ID position
* statuses - array of available statuses
* currentStatus - current status
* buttonVisible - (true, false) - is button to open up select visible

*/

import React from 'react';
import './CustomSelectComponent.css';

const DropDownButton = ({ onClickFun, w, visible }) => {
    if (!visible) {
        return null;
    } else {
        return (
            <div className="selectContainerChild" style={{ width: w }}>
                <button className = "showDropdownButton" onClick={onClickFun}>v</button>
            </div>
        )
    }
}

const SelectedValue = ({ onClickFun, value, w, bckgColor }) =>
    <div onClick={onClickFun} className="selectContainerChild" style={{ width: w, backgroundColor: bckgColor }}>
        <label>{value}</label>
    </div>

const DropDown = ({ onClickFun, w, visible, statuses, lang }) => {
    if (!visible) {
        return null;
    } else {
        return (
            <div className="dropdown" style={{ width: w }}>
                <ul>
                    {statuses.map((status, index) => {
                        var name = '';
                        if (lang.toLowerCase() === 'pl') {
                            name = status.namePL;
                        } else if (lang.toLowerCase() === 'de') {
                            name = status.nameDE;
                        } else {
                            name = status.nameEN;
                        }
                        return <li key={index} onClick={() => onClickFun(status.id, name, status)}>{name}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default class CustomSelectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: '',
            dropdownWidth: '150px',
            isDropDownVisible: false,
            currentStatus: this.props.currentStatus
        }
    }

    componentDidMount = () => {
        document.addEventListener('click', this.handleClickOutside);
        var name;
        var status = this.props.currentStatus;
        var lang = this.props.language;
        if (lang.toLowerCase() === 'pl') {
            name = status.namePL;
        } else if (lang.toLowerCase() === 'de') {
            name = status.nameDE;
        } else {
            name = status.nameEN;
        }
        this.setState({ selectedValue: name }, () => {
            this.props.setStatusID(this.props.id, status.id);
        });
    }

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClickOutside);
    }

    onShowClick = () => {
        this.setState({ isDropDownVisible: !this.state.isDropDownVisible });
    }

    onSelectListClick = (statusID, liValue, status) => {
        this.props.setStatusID(this.props.id, statusID);
        this.setState({
            isDropDownVisible: false,
            selectedValue: liValue,
            currentStatus: status
        });
    }

    convertToRGB = (status) => {
        return ('rgb(' + status.red + ',' + status.green + ',' + status.blue + ')');
    }

    handleClickOutside = (e) => {
        if (this.containerRef && !this.containerRef.contains(e.target) && this.state.isDropDownVisible) {
            this.setState({isDropDownVisible: false});
        }
    }

    setContainerRef = (node) => {
        this.containerRef = node;
    }

    render() {
        var buttonWidth = '20%';
        var textWidth = '80%';
        if (!this.props.buttonVisible) {
            buttonWidth = '0%';
            textWidth = '100%';
        }
        return (
            <div className="selectContainer" ref={this.setContainerRef}>
                <SelectedValue
                    value={this.state.selectedValue}
                    onClickFun={this.onShowClick}
                    w={textWidth}
                    bckgColor={this.convertToRGB(this.state.currentStatus)}
                />
                <DropDownButton
                    onClickFun={this.onShowClick}
                    w={buttonWidth}
                    visible={this.props.buttonVisible}
                />
                <DropDown
                    onClickFun={this.onSelectListClick}
                    w={this.state.dropdownWidth}
                    visible={this.state.isDropDownVisible}
                    statuses={this.props.statuses}
                    lang={this.props.language}
                />
            </div>
        )
    }
}