import React from 'react';
import './blog.scss';
import moment from 'moment';

const BlogCard = props => (
    <div className="blog-card">
        <div className="blog-card-header">
            <span className="blog-post-title">{props.post.title}</span>
            <span className="blog-post-date">{moment(props.post.updatedat).local().format('YYYY-MM-DD')}</span>
        </div>
        <div className="blog-post-body">
            {props.post.body}
        </div>
    </div>
);

export default BlogCard;