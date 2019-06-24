import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';

class TopicShell extends Component {
    render() {
        return (
            <div className="topic">
                <ContentLoader height={560} width={350}>
                    <rect x="0" y="14" rx="2" ry="2" width="100%" height="36" />
                    <circle cx="14" cy="71" r="14" />
                    <rect x="33" y="61" rx="2" ry="2" width="173" height="20" />
                    <rect x="40" y="100" rx="2" ry="2" width="300" height="22"/>
                    <rect x="0" y="130" rx="2" ry="2" width="320" height="22"/>
                    <rect x="0" y="160" rx="2" ry="2" width="340" height="22"/>
                    <rect x="0" y="190" rx="2" ry="2" width="345" height="22"/>
                    <rect x="0" y="220" rx="2" ry="2" width="100" height="22"/>

                    <rect x="40" y="250" rx="2" ry="2" width="300" height="22"/>
                    <rect x="0" y="280" rx="2" ry="2" width="320" height="22"/>
                    <rect x="0" y="310" rx="2" ry="2" width="340" height="22"/>
                    <rect x="0" y="340" rx="2" ry="2" width="345" height="22"/>
                    <rect x="0" y="370" rx="2" ry="2" width="200" height="22"/>
                </ContentLoader>
            </div>
        );
    }
}

export default TopicShell;
