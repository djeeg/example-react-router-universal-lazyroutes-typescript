import * as React from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

React.isValidElement(null); //needed so React references gets injected on client

export default class App extends React.Component<any, any> {

    drillToItem() {
        browserHistory.push("about");
    }

    render () {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About (lazy loaded)</Link></li>
                    <li><Link to="/about/subabout">SubAbout (lazy loaded)</Link></li>
                    <li><div onClick={() => this.drillToItem()}>About by history (lazy loaded)</div></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}


