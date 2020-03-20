import React, { Component } from 'react';
import './blog.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from '../axios/axiosInstance';
import BlogCard from './blogCard';
import '../App.scss'

class Blog extends Component {

    constructor() {
        super();
        this.state = {
            blogPosts: [],
            newPost: {
                title: null,
                body: null
            }
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    createTable() {
        const rows = [];
        for (var index = 0; index < this.state.blogPosts.length; index++) {
            const post = this.state.blogPosts[index];
            rows.push(<Card key={index} variant="outlined">
                    <CardContent><BlogCard post={post} /></CardContent>
                </Card>);
        }
        return rows;
    }

    changeHandler(event) {
        const newPost = this.state.newPost;
        newPost[event.target.name] = event.target.value;
        this.setState({newPost});
    }

    submitHandler(event) {
        event.preventDefault();

        axios.post('/blogs', this.state.newPost).then(response => {
            const newPostId = response.data.name;
            console.log('newPostId=', newPostId);
        }, err => {
            console.log('err=', err);
        });
    }

    render() {
        return (
            <div className="background-container">
                <div className="foreground-container">
                    {this.createTable()}
                </div>
                <div className="new-post-container">
                    <form onSubmit={this.submitHandler}>
                        <div className="as-form">
                            <div className="new-post-title">
                                <input className="title-input" 
                                    type="text"
                                    name="title"
                                    placeholder="title for new blog post"
                                    onChange={this.changeHandler}
                                    required />
                            </div>
                            <div className="new-post-body">
                                <textarea className="body-input"
                                    name="body"
                                    placeholder="body for new blog post"
                                    onChange={this.changeHandler}
                                    required>
                                </textarea>
                            </div>
                            <div className="new-post-submit">
                                <button className="submit-button button-center" type="submit"><i className="fas fa-paper-plane">&nbsp;</i>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
        axios.get('/blogs').then(response => {
            if (response.data) {
                const entries = Object.entries(response.data);
                this.setState({blogPosts: entries.map(p => p[1]).sort((p1, p2) => p1.updatedat > p2.updatedat ? 1 : -1)});
            }
        }, err => {
            console.log('err=', err);
        });
    }
}

export default Blog;

// https://material-ui.com/components/cards/#complex-interaction
// https://stackoverflow.com/questions/60538158/react-table-of-cards-instead-of-columns
