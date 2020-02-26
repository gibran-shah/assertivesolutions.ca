import React, { Component } from 'react';
import './BlogPost.scss';

class BlogPost extends Component {
    render() {
        return (
            <div className="blog-item flex-column-space-between">
                <div className="blog-img-and-date">
                    <img className="blog-img" src={this.props.blogImg} alt={this.props.title} />
                    <div className="blog-date"><i className="far fa-calendar-alt">&nbsp;</i>{this.props.date}</div>
                </div>  
                <span className="blog-title">{this.props.title}</span>
                <span className="blog-blurb">{this.props.blurb}</span>
                {/* <span className="blog-blurb">blah blah blah</span> */}
                <a className="read-more-link" href="#" onClick={(e) => {this.props.blogClicked(e, this.props.title)}}>read more</a>
            </div>
        );
    }
}

export default BlogPost;