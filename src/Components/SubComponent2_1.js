import React from 'react';
import { Transition, animated } from 'react-spring/renderprops';

export default class SubComponent2_1 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Transition
                native
                items={this.props.show}
                from={{ overflow: 'hidden', width: '0%' }}
                enter={{ width: '100%' }}
                leave={{ width: '0%' }}
                config={{ duration: this.props.duration, delay: this.props.delay }}
            >
                {show => show && (props => <animated.div style={props}>{this.props.text}</animated.div>)}

            </Transition>
        )
    }
}