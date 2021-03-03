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
          backgroundSize: 'cover',
          backgroundColor: 'red'
        };

        return (
            <div className="blog-item flex-column-space-between">
                <div className="blog-img-and-date">
                    <div style={backgroundStyles}></div>
                    <div className="blog-date"><i className="far fa-calendar-alt">&nbsp;</i>{this.props.date}</div>
                </div>  
                <span className="blog-title">{this.props.title}</span>
                <span className="blog-blurb">{this.props.blurb}</span>
                <a className="read-more-link" href="#" onClick={(e) => {this.props.blogClicked(e, this.props.title)}}>read more</a>
            </div>
        );
    }
}

export default BlogPost;