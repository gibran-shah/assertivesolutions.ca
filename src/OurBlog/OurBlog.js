import React, { Component } from 'react';
import './OurBlog.scss';
import BlogPost from './BlogPost/BlogPost';
import axios from '../axios/axiosInstance';
import moment from 'moment';

class OurBlog extends Component {

    constructor() {
      super();

      this.state = {
        blogs: []
      };
    }

    blogClicked(e, blogId) {
        e.preventDefault();
    }

    render() {
        let blogs = [];
        if (this.state.blogs.length) {
          for (let i = 0; i < 3; i++) {
            const blog = this.state.blogs[i];
            blogs.push(
              <BlogPost
                key={blog.id}
                blogImg={blog.imageUrl[0]}
                date={moment.unix(blog.updatedAt/1000).format('MMM DD, YYYY')}
                title={blog.title}
                blurb={blog.body}
                blogClicked={(e) => { this.blogClicked(e, blog.id) }}
              />
            );
          }
        }

        return (
            <section>
                <a name="our-blog" />
                <div className="our-blog-main flex-column-center">
                    <div className="section-heading">
                        <span className="heading-text our-blog-heading">our <span className="primary-text">blog</span></span>
                    </div>
                    <div className="our-blog-content">
                      {blogs}
                    </div>
                </div>
            </section>
        );
    }

    componentDidMount() {    
      axios.get('/blogs').then(response => {
          if (response.data) {
              const entries = Object.entries(response.data);
              const allPosts = entries.map(p => Object.assign({id: p[0]}, {...p[1]}))
                .sort((p1, p2) => p1.updatedAt > p2.updatedAt ? -1 : 1)
                .slice(0, 3);
              this.setState({
                  blogs: allPosts
              });
          }
      }, err => {
          console.log('err=', err);
      });
  }
}

export default OurBlog;