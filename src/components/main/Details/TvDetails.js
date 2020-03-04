import React from 'react';
import { fetchDetails } from '../../../actions'
import { connect } from 'react-redux';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchDetails  
};

class TvDetails extends React.Component{

    componentDidMount(){
        this.props.fetchDetails(this.props.match.params.id, 'tv');
    }

    render(){
        console.log(this.props.details)
        return(
            <div>
                {this.props.details.original_name}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TvDetails)