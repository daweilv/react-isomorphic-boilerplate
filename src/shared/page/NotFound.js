import React, { Component } from 'react';

class NotFound extends Component {
    componentWillMount() {
        const { staticContext } = this.props;
        if (staticContext) {
            staticContext.statusCode = 404;
        }
    }

    render() {
        console.log('404');
        return <div>404页面</div>;
    }
}

export default NotFound;
