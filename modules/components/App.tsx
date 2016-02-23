import * as React from 'react';
import { Link } from 'react-router'

React.isValidElement(null); //needed so React references gets injected on client

export default class App extends React.Component<any, any> {
    render () {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About (lazy loaded)</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}
