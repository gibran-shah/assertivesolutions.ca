import React, { Component } from 'react';
import './blog.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from '../axios/axiosInstance';
import BlogCard from './blogCard';

class Blog extends Component {
    state = {
        blogPosts: []
    };

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

    render() {
        return (
            <div className="background-container">
                <div className="foreground-container">
                    {this.createTable()}
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
        })
    }
}

export default Blog;

// https://material-ui.com/components/cards/#complex-interaction
// https://stackoverflow.com/questions/60538158/react-table-of-cards-instead-of-columns
