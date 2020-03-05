import React from 'react';

import { fetchPeople } from '../../../actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import placeholder from '../../../assets/placeholder.svg';



const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchPeople  
};

class PopularPeople extends React.Component {

    componentDidMount() {
        this.props.fetchPeople('', '1');
    }

    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }

    entries = () => {
        return this.props.people.entries.results.map((item, index) => {
            if(index < 5){
                return(
                    <Link to={`/details/person/${item.id}`} key={item.id}>
                        <div className="placeholder"></div>
                        <img onLoad={this.imageLoaded} alt='' src={item.profile_path ? `https://image.tmdb.org/t/p/w154${item.profile_path}` : placeholder}></img>
                        <div className="title">
                            {item.name}
                        </div>
                    </Link>
                )
            }
            return null
       }
    )}

    render() {
        return(
            <div className="grid full">
               <div className='category'>
                    Popular People
               </div>
               <div>
                   {this.props.people ? this.entries() : null}
               </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularPeople);