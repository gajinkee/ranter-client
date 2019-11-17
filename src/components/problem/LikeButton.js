import React, { Component } from 'react'
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likeProblem, unlikeProblem } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
    likedProblem =() =>{
        if(this.props.user.likes && this.props.user.likes.find(like => like.problemId ===  this.props.problemId))
            return true;
        else return false;
    };
    likeProblem =()=>{
    this.props.likeProblem(this.props.problemId);
    }
    unlikeProblem =()=>{
    this.props.unlikeProblem(this.props.problemId);
    }
    render() {
        const{ authenticated} = this.props.user;
        const likeButton= !authenticated ? (
            <Link to='/login'>
            <MyButton tip="Like">               
                    <FavoriteBorder colour='primary'/>              
            </MyButton>
            </Link>
        ) : (
            this.likedProblem() ?(
                <MyButton tip="Unlike" onClick={this.unlikeProblem}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeProblem}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        )
        return likeButton;
            
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    
    likeProblem: PropTypes.func.isRequired,
    unlikeProblem: PropTypes.func.isRequired
  };
  
const mapStateToProps = (state) => ({
    user: state.user
  });
  
const mapActionsToProps = {
    likeProblem,
    unlikeProblem
  };
  
export default connect(
    mapStateToProps,
    mapActionsToProps
  )(LikeButton);


