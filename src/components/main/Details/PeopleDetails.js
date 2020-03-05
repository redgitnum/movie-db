import React from 'react';
import { fetchDetails, resetStore } from '../../../actions'
import { connect } from 'react-redux';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchDetails,
    resetStore
};

class PeopleDetails extends React.Component{

    componentDidMount(){
        this.props.fetchDetails(this.props.match.params.id, 'person');
    }

    componentWillUnmount(){
        this.props.resetStore()
    }

    render(){
        console.log(this.props.details)
        return(
            <div>
                {this.props.details.name}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleDetails)