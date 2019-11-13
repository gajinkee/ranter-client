import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Problem from '../components/Problem';

export class home extends Component {
    state={
        problems: null
    }
    componentDidMount() {
        axios.get('/problems')
            .then(res=>{
                this.setState({
                    problems:res.data

                })
            })
            .catch(err => console.log(err));
      }
    render() {
        let recentProblemsMarkup = this.state.problems ?(
        this.state.problems.map(problem=> <Problem key={problem.problemId} problem={problem}/>)
        ) : (
        <p>Loading...</p>
        )
        return (
            <Grid container spacing = {10}>
                <Grid item sm={8} xs={12}>
                {recentProblemsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

export default home;
