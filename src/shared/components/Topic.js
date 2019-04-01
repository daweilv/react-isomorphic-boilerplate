import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Topic extends Component {
    componentDidMount() {

    }

    render() {
        console.log('topic');
        const {match,initialStates} = this.props;
        console.log(match,initialStates);
        const id = match.params.id;
        const item = initialStates[0].data.find(o=>o.id===id)
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

                <div dangerouslySetInnerHTML={{__html:item.content}}>
                </div>
            </div>
        );
    }
}

export default Topic;
