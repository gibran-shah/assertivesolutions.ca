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

    render() {
        let blogs = [];
        const length = this.state.blogs.length;
        if (length) {
          const maxBlogs = Math.min(length, 3);
          for (let i = 0; i < maxBlogs; i++) {
            const blog = this.state.blogs[i];
            blogs.push(
              <BlogPost
                key={blog.id}
                id={blog.id}
                blogImg={blog.imageUrl[0]}
                date={moment.unix(blog.updatedAt/1000).format('MMM DD, YYYY')}
                title={blog.title}
                blurb={blog.body}
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