import React, { Component } from 'react';
import './blog.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from '../axios/axiosInstance';
import BlogCard from './blogCard';
import '../App.scss'
import Login from '../login/login';

class Blog extends Component {

    constructor() {
        super();

        this.state = {
            blogPosts: [],
            newPost: {
                title: null,
                body: null
            },
            editPostId: null,
            accessToken: null
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.clearForm = this.clearForm.bind(this);

        this.postTitleRef = React.createRef();
        this.postBodyRef = React.createRef();
    }

    createTable() {
        const rows = [];
        for (var index = 0; index < this.state.blogPosts.length; index++) {
            const post = this.state.blogPosts[index];
            rows.push(<Card key={index} variant="outlined">
                    <CardContent>
                        <BlogCard post={post} canEdit={!!this.state.accessToken} editPostHandler={this.editPost}/>
                    </CardContent>
                </Card>);
        }
        return rows;
    }

    editPost = (post) => {
        this.setState({editPostId: post.id});
        this.postTitleRef.current.value = post.title;
        this.postBodyRef.current.value = post.body;
    }

    changeHandler(event) {
        const newPost = this.state.newPost;
        newPost[event.target.name] = event.target.value;
        this.setState({newPost});
    }

    submitHandler(event) {
        event.preventDefault();

        if (this.state.editPostId) {
            axios.patch('/blogs', {
                    postId: this.state.editPostId,
                    post: this.state.newPost
                }, {
                    headers: {Authorization: this.state.accessToken}
                }).then(response => {
                    const updatedPost = this.state.newPost;
                    const existingPost = this.state.blogPosts.find(p => p.id === this.state.editPostId);
                    existingPost.title = updatedPost.title;
                    existingPost.body = updatedPost.body;
                    existingPost.updatedAt = updatedPost.updatedAt;
                    this.clearForm();
                }, err => {
                    console.log('err=', err);
                }); 
        } else {
            axios.post('/blogs', {
                    title: this.state.newPost.title,
                    body: this.state.newPost.body
                }, {
                    headers: {Authorization: this.state.accessToken}
                }).then(response => {
                    const newPostId = response.data.id;
                    const createdAt = response.data.createdAt;
                    const updatedAt = createdAt;
                    this.state.blogPosts.push({
                        id: newPostId,
                        title: this.state.newPost.title,
                        body: this.state.newPost.body,
                        createdAt: createdAt,
                        updatedAt: updatedAt
                    });
                    this.clearForm();
                }, err => {
                    console.log('err=', err);
                });
        }
    }

    clearForm(e) {
        if (e) e.preventDefault();
        this.setState({editPostId: null});
        this.postTitleRef.current.value = '';
        this.postBodyRef.current.value = '';
    }

    loginSuccess = accessToken => {
        localStorage.setItem('accessToken', accessToken);
        this.setState({accessToken: accessToken});
    }

    getWritePost = () => {
        let editPostBlurb = null;
        if (this.state.editPostId) {
            const editPost = this.state.blogPosts.find(p => p.id === this.state.editPostId);
            editPostBlurb = <span>Editing post <i>{editPost.title}</i>. <a href="#" onClick={this.clearForm}>New post.</a></span>
        }

        return (
            <div className="new-post-container">
                <form onSubmit={this.submitHandler}>
                    <div className="as-form">
                        {editPostBlurb}
                        <div className="new-post-title">
                            <input className="title-input"
                                ref={this.postTitleRef} 
                                type="text"
                                name="title"
                                placeholder="title for new blog post"
                                onChange={this.changeHandler}
                                required />
                        </div>
                        <div className="new-post-body">
                            <textarea className="body-input"
                                ref={this.postBodyRef}
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
        );
    }

    render() {
        let login = null;
        let writePost = null;
        if (!this.state.accessToken) {
            login = (
                <div className="login flex-row-end">
                    <Login loginSuccess={this.loginSuccess} />
                </div>
            );
        } else {
            writePost = this.getWritePost();
        }

        return (
            <div className="background-container">
                {login}
                <div className="foreground-container">
                    {this.createTable()}
                </div>
                {writePost}
            </div>
        );
    }

    componentDidMount() {
        this.setState({accessToken: localStorage.getItem('accessToken')});

        axios.get('/blogs').then(response => {
            if (response.data) {
                const entries = Object.entries(response.data);
                this.setState({blogPosts: entries.map(p => Object.assign({id: p[0]}, {...p[1]}))
                    .sort((p1, p2) => p1.updatedAt > p2.updatedAt ? 1 : -1)});
            }
        }, err => {
            console.log('err=', err);
        });
    }
}

export default Blog;

// https://material-ui.com/components/cards/#complex-interaction
// https://stackoverflow.com/questions/60538158/react-table-of-cards-instead-of-columns
// https://stackoverflow.com/questions/60942752/can-i-merge-data-when-sending-put-request-to-firebase-realtime-database-using-ax
// https://stackoverflow.com/questions/61046073/how-do-i-request-a-basic-authentication-token-from-my-firebase-realtime-database
