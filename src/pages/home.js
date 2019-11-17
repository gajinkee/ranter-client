import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Problem from '../components/problem/Problem';
import Profile from '../components/profile/Profile';
import ProblemSkeleton from '../util/ProblemSkeleton.js'


import {connect} from 'react-redux';
import {getProblems} from '../redux/actions/dataActions';

class home extends Component {
    componentDidMount() {
        this.props.getProblems();
    }
    render() {
        const {problems,loading}= this.props.data;
        let recentProblemsMarkup = !loading ?(
        problems.map(problem=> <Problem key={problem.problemId} problem={problem}/>)
        ) : 
        <ProblemSkeleton/>
        return (
            <Grid container spacing = {10}>
                <Grid item sm={8} xs={12}>
                {recentProblemsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                <Profile/>
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    getProblems: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps,{getProblems })(home);
