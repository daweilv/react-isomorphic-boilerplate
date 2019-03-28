import React, {Component} from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        console.log('Home constructor');
    }

    componentWillMount() {
        console.log('Home componentWillMount');
    }

    componentDidMount() {
        console.log('Home componentDidMount');
    }

    render() {
        console.log('Home render');
        return (
            <div>
                home
            </div>
        );
    }
}

export default Home;