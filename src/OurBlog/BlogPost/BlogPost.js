import React, { Component } from 'react';
import './BlogPost.scss';
class BlogPost extends Component {
    render() {
        const backgroundStyles = {
          width: '100%',
          height: '15vw',
          marginBottom: '20px',
          backgroundImage: `url(${this.props.blogImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        };

        const blogLink = `/blog?id=${this.props.id}`;

        return (
            <div className="blog-item">
                <div className="blog-img-and-date">
                    <div style={backgroundStyles}></div>
                    <div className="blog-date"><i className="far fa-calendar-alt">&nbsp;</i>{this.props.date}</div>
                </div>
                <div className="blog-title">{this.props.title}</div>
                <div className="blog-blurb">{this.props.blurb}</div>
                <div className="read-more-link-container">
                    <a className="read-more-link" href={blogLink}>read more</a>
                </div>
            </div>
        );
    }
}

export default BlogPost;