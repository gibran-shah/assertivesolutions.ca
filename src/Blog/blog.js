import React, { Component } from 'react';
import './blog.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BlogCard from './blogCard';
import '../App.scss'
import Login from '../login/login';
import axios from '../axios/axiosInstance';
import moment from 'moment';
import {
    useTable,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
} from 'react-table';
import Table from './Table';

// https://www.npmjs.com/package/react-table
// https://github.com/tannerlinsley/react-table
// https://github.com/tannerlinsley/react-table/blob/master/docs/quickstart.md
// https://stackoverflow.com/questions/56663785/invalid-hook-call-hooks-can-only-be-called-inside-of-the-body-of-a-function-com
// https://stackoverflow.com/questions/62462611/why-isnt-react-usememo-working-in-my-react-function
// https://stackoverflow.com/questions/62649055/why-does-my-react-table-say-that-columns-are-undefined
// https://chat.stackoverflow.com/rooms/17/javascript
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
            accessToken: null,
            file: null
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.clearForm = this.clearForm.bind(this);

        this.postTitleRef = React.createRef();
        this.postBodyRef = React.createRef();
        this.selectedFileRef = React.createRef();
    }

    createTable() {
        return this.state.blogPosts.length
            ? <Table
                posts={this.state.blogPosts}
                isLoggedIn={!!this.state.accessToken}
                editPost={this.editPost} />
            : null;
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
//const loggedOutToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg4ODQ4YjVhZmYyZDUyMDEzMzFhNTQ3ZDE5MDZlNWFhZGY2NTEzYzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXNzZXJ0aXZlc29sdXRpb25zMiIsImF1ZCI6ImFzc2VydGl2ZXNvbHV0aW9uczIiLCJhdXRoX3RpbWUiOjE1ODgzMDE5NDMsInVzZXJfaWQiOiJrV2hhZ2ZIano3WnpCZ25iUVNXektLd21WMjIyIiwic3ViIjoia1doYWdmSGp6N1p6QmduYlFTV3pLS3dtVjIyMiIsImlhdCI6MTU4ODMwMTk0MywiZXhwIjoxNTg4MzA1NTQzLCJlbWFpbCI6Imp1bmsubWFpbDI5MTI3NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsianVuay5tYWlsMjkxMjc2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.l25VzSftTWi8NNkxWkOHsAKNhlVt2irXPKw4f7EQIuhHutv_nLbj_TBwFQyNCFQ5DT1YpKXa2eCKfQl-8H1ZbrSiHRNjglLJZpdAUNVRn_fk8J4XRnVQuQLYfwQuSqFLE5aewmMYRQLzobGTG5DMhiQrEBmyvsD4xl27dOyA0IIBgpSOYI4ceOE3D3AV2PxF9xuYayJ4E3dkp_XrgbZp6bgx3-RdM5xfNPWtMSCWuB-HuoLNPMd3TPbv-RnKnhjtFrT7u9OEfFxKa4Ix961BuUQtiaIhssC9lTcNTQ-xUdZWhXEc_yaYBsJKaj6JumRr9zmWaoK9n8pvRmvYK3V_Bw';

        let formData = new FormData();
        formData.append('title', this.postTitleRef.current.value);
        formData.append('body', this.postBodyRef.current.value);
        if (this.state.file) {
            formData.append('image', this.state.file);
        }

        if (this.state.editPostId) {
            formData.append('postId', this.state.editPostId);
            const editPost = this.state.blogPosts.find(p => p.id === this.state.editPostId);
            if (editPost.filename) {
                formData.append('filename', editPost.filename);
            }
            axios.patch('/blogs', formData, {
                    headers: {
                        Authorization: this.state.accessToken,
                        'content-type': 'multipart/form-data'
                    }
                }).then(response => {
                    const existingPost = this.state.blogPosts.find(p => p.id === this.state.editPostId);
                    existingPost.title = this.postTitleRef.current.value;
                    existingPost.body = this.postBodyRef.current.value;
                    existingPost.updatedAt = response.data.updatedAt;
                    existingPost.filename = response.data.filename || existingPost.filename;
                    existingPost.imageUrl = response.data.imageUrl || existingPost.imageUrl;
                    this.state.blogPosts.sort((p1, p2) => p1.updatedAt > p2.updatedAt ? -1 : 1);
                    this.clearForm();
                }).catch(err => {
                    console.log('err=', err);
                });
        } else {
            axios.post('/blogs', formData, {
                headers: {
                    Authorization: this.state.accessToken,
                    'content-type': 'multipart/form-data'
                }
            }).then(response => {
                const newPost = {
                    id: response.data.id,
                    createdAt: response.data.createdAt,
                    updatedAt: response.data.createdAt,
                    filename: response.data.filename || null,
                    title: this.postTitleRef.current.value,
                    body: this.postBodyRef.current.value,
                    imageUrl: response.data.imageUrl || null
                };
                this.setState(state => ({
                    blogPosts: [newPost, ...state.blogPosts]
                }));
                this.clearForm();
            }).catch(err => {
                console.log('err=', err);
            });
        }
    }

    clearForm(e) {
        if (e) e.preventDefault();
        this.postTitleRef.current.value = '';
        this.postBodyRef.current.value = '';
        this.selectedFileRef.current.value = '';
        this.setState({
            editPostId: null,
            newPost: {
                title: null,
                body: null
            },
            file: null
        });
    }

    loginSuccess = (accessToken, expiryTime) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiryTime', expiryTime);
        this.setState({accessToken});
    }

    logoutSuccess = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiryTime');
        this.setState({accessToken: null});
    }

    fileSelected = (e) => {
        if (e.target.files.length) {
            this.setState({file: e.target.files[0]});
        }
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
                        <div className="image-upload-container">
                            <input className="image-upload"
                                ref={this.selectedFileRef}
                                type="file"
                                name="file"
                                id="file"
                                onChange={this.fileSelected}
                                accept=".jpg, .jpeg, .gif, .png, .bmp" />
                            <label htmlFor="file"
                                className="image-upload-label" >
                                    upload an image
                            </label>
                            <label className="filename-label" >
                                {this.state.file ? this.state.file.name : null}
                            </label>
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
        let writePost = null;
        if (!!this.state.accessToken) {
            writePost = this.getWritePost();
        }

        return (
            <div className="background-container">
                <div className="login flex-row-end">
                    <Login loginSuccess={this.loginSuccess}
                        logoutSuccess={this.logoutSuccess}
                        accessToken={this.state.accessToken} />
                </div>
                <div className="foreground-container">
                    {this.createTable()}
                </div>
                {writePost}
            </div>
        );
    }

    componentDidMount() {
        const expiryTime = localStorage.getItem('expiryTime');
        if (moment.unix(expiryTime/1000) > moment()) {
            this.setState({accessToken: localStorage.getItem('accessToken')});
        } else {
            this.setState({accessToken: null});
        }
        
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
// https://stackoverflow.com/questions/62907219/why-wont-react-component-rerender-when-state-is-updated
