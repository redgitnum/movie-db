import React from 'react';

import { fetchMovies } from '../../../actions';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchMovies
};

class InTheaters extends React.Component {

    componentDidMount() {
        this.props.fetchMovies('now_playing', '1');
    }

    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }

    entries = () => {
        return this.props.movies.entries.results.map((item, index) => {
            if(index < 3){
                return(
                    <Link to={`/details/movie/${item.id}`} key={item.id}>
                        <div className="placeholder"></div>
                        <img onLoad={this.imageLoaded} alt='' src={`https://image.tmdb.org/t/p/w1000_and_h563_face${item.backdrop_path}`}></img>
                        <div className="title">
                            {item.title}
                        </div>
                    </Link>
                )
            }
            return null
       }
    )}

    render() {
        return(
            <div className="grid half">
               <div className='category'>
                    In Theaters
               </div>
               <div className="thumbnails">
                   {this.props.movies ? this.entries() : null}
               </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InTheaters);