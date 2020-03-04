import React from 'react';
import { fetchDetails } from '../../../actions'
import { connect } from 'react-redux';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchDetails  
};

class MovieDetails extends React.Component{

    componentDidMount(){
        this.props.fetchDetails(this.props.match.params.id, 'movie');
    }

    render(){
        console.log(this.props.details)
        return(
            <div>
                {this.props.details.title}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)