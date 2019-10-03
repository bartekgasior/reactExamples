import React from 'react';
import './AutoSuggestComponent.css';

export default class AutoSuggestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            filteredSuggestions: [],
            filteredSecondarySuggestions: [],
            showSuggestions: false,
            activeSuggestion: 0,
            id: 0,
            hoverSuggestion: [],
            /* how many symbols are being checked */
            charsToCheck: this.props.charsToCheck
        }
    }

    renderSuggestions = (suggestions, secondarySuggestions, hovered) => {
        if (this.state.showSuggestions && (this.state.filteredSuggestions.length > 0 || this.state.filteredSecondarySuggestions.length > 0)) {
            return (
                <ul className="suggestionsList" ref ="ulRef">
                    {suggestions.map((suggestion, index) => {
                        return (<li
                            className="liElement"
                            style={hovered[index] ? { backgroundColor: 'red' } : {}}
                            key={suggestion}
                            onClick={(e) => this.onElementClick(e)}>{suggestion}</li>)
                    })}
                    {secondarySuggestions.map((suggestion, index) => {
                        return (<li
                            className="liSecondaryElement"
                            style={hovered[index + (suggestions.length)] ? { backgroundColor: 'rgb(230,120,120)' } : {}}
                            key={suggestion}
                            onClick={(e) => this.onElementClick(e)}>{suggestion}</li>)
                    })}
                </ul>
            )
        } else {
            return null;
        }

    }

    filterSuggestions = (text, array, charsToCheck) => {
        let suggestions = [];
        array.map(node => {
            let flag = true;
            for (let i = 0; i < charsToCheck; i++) {
                if (node.toLowerCase().charAt(i) !== text.toLowerCase().charAt(i)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                suggestions.push(node);
            }
            return true;
        });
        return suggestions;
    }

    hoveredSuggestion = (suggestions, secondarySuggestions) => {
        let hovered = [];
        let hovered1 = suggestions.map((sug, index) => {
            if (index === 0) {
                return true;
            } else {
                return false;
            }
        });
        let hovered2 = secondarySuggestions.map(sug => {
            return false;
        })
        hovered = [...hovered1, ...hovered2];
        return hovered;
    }

    onInputChange = (e) => {
        let text = e.target.value;
        let show = false;
        let suggestions = this.props.suggestions;
        let secondarySuggestions = this.props.secondarySuggestions;

        let filteredSuggestions = this.filterSuggestions(text, suggestions, this.state.charsToCheck);
        let filteredSecondarySuggestions = this.filterSuggestions(text, secondarySuggestions, this.state.charsToCheck);
        let hovered = this.hoveredSuggestion(filteredSuggestions, filteredSecondarySuggestions);

        if (filteredSuggestions.length !== 0 || filteredSecondarySuggestions.length !== 0) {
            show = true;
        }

        this.setState({
            showSuggestions: show,
            userInput: text,
            filteredSuggestions: filteredSuggestions,
            filteredSecondarySuggestions: filteredSecondarySuggestions,
            hoverSuggestion: hovered
        });
    }

    onKeyDown = e => {
        let hovered = this.state.hoverSuggestion;
        hovered = hovered.map(h => { return false });

        const ul = this.refs.ulRef;
        const { showSuggestions, filteredSuggestions, filteredSecondarySuggestions, id } = this.state;

        let bothSuggestions = [...filteredSuggestions, ...filteredSecondarySuggestions];
        if (showSuggestions) {
            if (e.keyCode === 38) {
                if (id > 0) {
                    ul.children[id].scrollIntoView({block: 'end', behavior: 'smooth'});
                    hovered[id - 1] = true;
                    this.setState({
                        hoverSuggestion: hovered,
                        id: this.state.id - 1
                    });
                }
            } else if (e.keyCode === 40) {
                if (id < (bothSuggestions.length - 1)) {

                    ul.children[id + 1].scrollIntoView({block: 'end', behavior: 'smooth'});
                    hovered[id + 1] = true;
                    this.setState({
                        hoverSuggestion: hovered,
                        id: this.state.id + 1
                    });
                }
            } else if (e.keyCode === 13) {
                this.setState({ 
                    userInput: bothSuggestions[id],
                    showSuggestions: false
                });
            }
            else if (e.keyCode === 27) {
                this.setState({ 
                    showSuggestions: false
                });
            }
        }else{
            if(e.keyCode === 40){
                this.setState({
                    showSuggestions: true
                });
            }
        }
    }

    onElementClick = (e) => {
        this.setState({
            filteredSuggestions: [],
            filteredSecondarySuggestions: [],
            userInput: e.target.innerText
        });
    }

    render() {
        return (
            <div>
                <input type="text"
                    value={this.state.userInput}
                    onChange={(e) => this.onInputChange(e)}
                    onKeyDown={(e) => this.onKeyDown(e)}
                />
                {this.renderSuggestions(this.state.filteredSuggestions, this.state.filteredSecondarySuggestions, this.state.hoverSuggestion)}
            </div>
        )
    }
}