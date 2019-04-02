import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Topic extends Component {
    render() {
        console.log('topic');
        const { topic } = this.props;
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
                <h1>{topic.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: topic.content }} />
            </div>
        );
    }
}

export default Topic;
