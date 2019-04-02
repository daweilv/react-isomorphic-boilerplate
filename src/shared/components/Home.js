import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        const { topics } = this.props;
        console.log('topics===>',topics);
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
                    {topics.map(item => (
                        <li key={item.id}>
                            <Link to={`/topic/${item.id}`}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Home;
