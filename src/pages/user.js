import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Problem from '../components/problem/Problem';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import ProblemSkeleton from '../util/ProblemSkeleton.js';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    problemIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const problemId = this.props.match.params.problemId;

    if (problemId) this.setState({ problemIdParam: problemId });


    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { problems, loading } = this.props.data;
    const { problemIdParam} = this.state;

    const problemsMarkup = loading ? (
        <ProblemSkeleton/>
      ) : problems === null ? (
        <p>No problems from this user</p>
      ) : !problemIdParam ? (
        problems.map((problem) => <Problem key={problem.problemId} problem={problem} />)
      ) : (
        problems.map(problem =>{
          if(problem.problemId !== problemIdParam)
            return <Problem key={problem.problemId} problem={problem} />;
          else return <Problem key={problem.problemId} problem={problem} openDialog />;
        })
      )

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {problemsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
        {this.state.profile === null ? (
            <ProfileSkeleton/>
          ) : (
          <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
    }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);