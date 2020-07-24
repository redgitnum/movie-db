import React from 'react';

import Basic from './MovieDetails/Basic';
import Extra from './MovieDetails/Extra';
import Reviews from './MovieDetails/Reviews';
import Media from './MovieDetails/Media';
import Recommended from './MovieDetails/Recommended';
import Similar from './MovieDetails/Similar';


import { fetchDetails, resetStore } from '../../../actions'
import { connect } from 'react-redux';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchDetails,
    resetStore
};

class MovieDetails extends React.Component{

    componentDidMount(){
        this.props.fetchDetails(this.props.match.params.id, 'movie');
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.props.resetStore()
            this.props.fetchDetails(this.props.match.params.id, 'movie');
        }
    }

    componentWillUnmount(){
        this.props.resetStore()
    }

    render(){
        console.log(this.props.details)
        return(
            <div className="details">
                {this.props.details.entry ? 
                    <Basic details={this.props.details} />
                : null}

                {this.props.details.credits ?
                    <Extra details={this.props.details} />
                : null}

                {(this.props.details.reviews && this.props.details.reviews.results.length) ? 
                    <Reviews  details={this.props.details} />
                : null}

                {(  (this.props.details.images && (this.props.details.images.backdrops.length || this.props.details.images.posters.length)) || 
                    (this.props.details.videos && this.props.details.videos.results.length) 
                )   ? 
                    <Media details={this.props.details} />
                : null}

                {(this.props.details.recommended && this.props.details.recommended.results.length) ? 
                    <Recommended details={this.props.details} />
                : null}

                {(this.props.details.similar && this.props.details.similar.results.length) ? 
                    <Similar details={this.props.details} />
                : null}
                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)