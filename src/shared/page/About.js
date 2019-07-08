import React, {Component} from 'react';
import TopicLayout from "@/shared/component/TopicLayout";

class About extends Component {
    render() {
        return (
            <TopicLayout className="page-topic">
                <div className="markdown-body">
                    <p>本项目使用 <a href="https://github.com/daweilv/react-isomorphic-boilerplate">react-isomorphic-boilerplate</a> 脚手架打造，用于演示服务端渲染场景（SSR）。</p>
                    <p>共有4个页面：</p>
                    <ol>
                        <li>首页</li>
                        <li>详情页</li>
                        <li>关于</li>
                        <li>404页</li>
                    </ol>
                    <p>

                    </p>
                </div>
            </TopicLayout>
        );
    }
}

export default About;