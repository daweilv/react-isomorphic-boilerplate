import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        console.log('Home constructor');
        console.log('Home props', this.props.initialStates);
    }

    componentWillMount() {
        console.log('Home componentWillMount');
        console.log('Home props', this.props.initialStates);
    }

    componentDidMount() {
        console.log('Home componentDidMount');
        const { home } = this.props;
        if (!home) {
            console.log('need load');
        }
    }

    render() {
        console.log('Home render');
        console.log('Home render', this.props);
        const { home } = this.props;
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/topic">Topic</Link>
                    </li>
                </ul>

                <div>home</div>
                <ul>
                    {home.data.map(item => (
                        <li key={item.id}><Link to={`/topic/${item.id}`}>{item.title}</Link></li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Home;
