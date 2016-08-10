import React, {Component} from 'react';

export default class App extends Component {
    render() {
        return (
            <div className ="addDiv">
                {this.props.children}
                </div>
        )
    }
}