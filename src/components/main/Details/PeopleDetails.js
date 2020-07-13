import React from 'react';
import { fetchDetails, resetStore } from '../../../actions'
import { connect } from 'react-redux';
import placeholder from '../../../assets/placeholder.svg';


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

    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }

    render(){
        console.log(this.props.details)
        return(
            <div className="details">
                <div className='basic'>
                    <div className="poster">
                        <div className="placeholder"></div>
                        <img onLoad={this.imageLoaded} alt="" src={this.props.details.entry.profile_path ? "https://image.tmdb.org/t/p/w300" + this.props.details.entry.profile_path : placeholder}></img>
                    </div>
                    <div className="info">
                        <div className="name">
                            {this.props.details.entry.name}
                        </div>
                        <div className="dates">
                            <div className="birth">
                                Birthday: {this.props.details.entry.birthday}
                            </div>
                                {this.props.details.entry.deathday ? 
                                <div className="death"> Day of death: {this.props.details.entry.deathday}</div> 
                                : null}
                        </div>
                        <div className="overview">
                            <div className="title">
                                Biography
                            </div>
                            {this.props.details.entry.biography}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleDetails)