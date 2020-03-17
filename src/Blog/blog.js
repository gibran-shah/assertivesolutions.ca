import React, { Component } from 'react';
import './blog.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//import axios from 'axios';
import axios from '../axios/axiosInstance';

class Blog extends Component {
    // useStyles = makeStyles(theme => ({
    //     root: {
    //       maxWidth: 345,
    //     }
    // }));

    createTable() {
        const rows = [];
        for (var index = 0; index < 10; index++) {
            rows.push(<Card key={index} variant="outlined"><CardContent>Hi, this is card # {index+1}.</CardContent></Card>);
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

        // const post = {
        //     createdat: Date.now(),
        //     updatedat: Date.now(),
        //     title: 'strong bo',
        //     body: 'do you have strong bo? well, sucks to be you.'
        // };

        // axios.post('/blogposts.json', post).then(response => {
        //     console.log('point 1; response=', response);
        // }).catch(err => {
        //     console.log('point 1; err=', err);
        // });


        const config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };
        axios.get('http://35.184.181.105:3000/blogs', config).then(response => {
            console.log('response=', response);
        }, err => {
            console.log('err=', err);
        })
    }
}

export default Blog;

// https://material-ui.com/components/cards/#complex-interaction
// https://stackoverflow.com/questions/60538158/react-table-of-cards-instead-of-columns
