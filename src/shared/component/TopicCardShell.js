import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';

class Shell extends Component {
    render() {
        return (
            <div className="topic-card">
                <ContentLoader width={334} height={115}>
                    <rect x="0" y="0" height="25" width="100%" rx="2" ry="2" />
                    <circle r="20" cx="20" cy="62" />

                    <rect x="50" y="45" height="16" width="220" rx="2" ry="2" />
                    <rect x="50" y="65" height="14" width="45" />

                    <rect x="0" y="100" height="16" width="70" />
                    <rect x="270" y="100" height="16" width="60" />
                </ContentLoader>
            </div>
        );
    }
}

class TopicCardShell extends Component {
    render() {
        const arr = [1, 2, 3, 4, 5, 6];
        return arr.map(o => <Shell key={o} />);
    }
}

export default TopicCardShell;
