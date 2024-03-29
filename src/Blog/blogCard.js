import React from 'react';
import '../App.scss';
import './blog.scss';
import moment from 'moment';

const BlogCard = props => {
    let editPost = null;
    if (props.canEdit) {
        editPost =  <i onClick={() => props.editPostHandler(props.post)} className="fas fa-edit edit-icon"></i>
    }

    return (
        <div className="flex-column-space-between">
            <div className="flex-row-space-between blog-card-header">
                <span className="blog-post-title">
                    {props.post.title}
                    {editPost}
                </span>
                <span className="blog-post-date">{moment(props.post.updatedAt).local().format('YYYY-MM-DD')}</span>
            </div>
            <div className="blog-post-body">
                {props.post.body}
            </div>
        </div>
    );
}

export default BlogCard;