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

//const expiredToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYWJiMjI0NDBkYTAzMmM1ZDAwNDJjZGFhOWQyODVjZjhkMjAyYzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXNzZXJ0aXZlc29sdXRpb25zMiIsImF1ZCI6ImFzc2VydGl2ZXNvbHV0aW9uczIiLCJhdXRoX3RpbWUiOjE1ODc0Mzg3ODYsInVzZXJfaWQiOiJrV2hhZ2ZIano3WnpCZ25iUVNXektLd21WMjIyIiwic3ViIjoia1doYWdmSGp6N1p6QmduYlFTV3pLS3dtVjIyMiIsImlhdCI6MTU4NzQzODc4NiwiZXhwIjoxNTg3NDQyMzg2LCJlbWFpbCI6Imp1bmsubWFpbDI5MTI3NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsianVuay5tYWlsMjkxMjc2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.HPTHr8u3sQyZZwnQ3QMGTfIzYKOxpnpXHcFPFkxLCFV1k_93FKMqk10cKLhxJi6cnYNYCI4taBLqBne6xTt171SkxXilfJQbSf6MJdSoG5fiB20smU9XgiB6vxbOfmnl3KJbcHUMZcHdXPdebPkOgB6A-IF8ZVywHXD4ORDNeUr1JpND6InEoJUGns191nn_7140krLDoaH-pTYl-1UBFoOJSB4TzjXNcxR99gvmjvZqlaz_pUDGYb1emAOUMtKykWFPf3tgD8mLxsWiOUsxToDH6YGPnZE2oglm172x3k63SzuEV9N4SX1sgIBCpGTZHEjCeYt_9pVsM3BrmO94iQ';

        if (this.state.editPostId) {
            axios.patch('/blogs', {
                    postId: this.state.editPostId,
                    post: {
                        title: this.postTitleRef.current.value,
                        body: this.postBodyRef.current.value
                    }
                }, {
                    headers: {Authorization: this.state.accessToken}
                }).then(response => {
                    const existingPost = this.state.blogPosts.find(p => p.id === this.state.editPostId);
                    existingPost.title = this.postTitleRef.current.value;
                    existingPost.body = this.postBodyRef.current.value;
                    existingPost.updatedAt = response.data.updatedAt;
                    this.state.blogPosts.sort((p1, p2) => p1.updatedAt > p2.updatedAt ? -1 : 1);
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
                    this.state.blogPosts.unshift({
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
                    .sort((p1, p2) => p1.updatedAt > p2.updatedAt ? -1 : 1)});
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
