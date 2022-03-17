import React from 'react';
import '../App.scss';
import './noBlogs.scss';

const NoBlogs = props => {
    return (
        <div className="flex-row-center no-blogs-text">
            <strong>There are no blogs at this time. Please check back later.</strong>
        </div>
    );
}

export default NoBlogs;