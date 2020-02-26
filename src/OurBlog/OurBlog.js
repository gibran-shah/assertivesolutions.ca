import React, { Component } from 'react';
import './OurBlog.scss';
import BlogPost from './BlogPost/BlogPost';
import BlogImg1 from '../assets/images/blog img 1.png'
import BlogImg2 from '../assets/images/blog img 2.png'
import BlogImg3 from '../assets/images/blog img 3.png'

class OurBlog extends Component {

    blogClicked(e, blogTitle) {
        e.preventDefault();
    }

    render() {
        return (
            <section>
                <a name="our-blog" />
                <div className="our-blog-main flex-column-center">
                    <div className="section-heading">
                        <span className="heading-text our-blog-heading">our <span className="primary-text">blog</span></span>
                    </div>
                    <div className="our-blog-content">
                        <BlogPost
                            blogImg={BlogImg1}
                            date="Aug 1 2019"
                            title="blog 1"
                            blurb="blah blah blah"
                            blogClicked={this.blogClicked} />
                        <BlogPost
                            blogImg={BlogImg2}
                            date="Aug 2 2019"
                            title="blog 2"
                            blurb="blah blah blah blah"
                            blogClicked={this.blogClicked} />
                        <BlogPost
                            blogImg={BlogImg3}
                            date="Aug 3 2019"
                            title="blog 3"
                            blurb="blah blah blah blah blah blah blah blah blah blah blah blah"
                            blogClicked={this.blogClicked} />
                    </div>
                </div>
            </section>
        );
    }
}

export default OurBlog;