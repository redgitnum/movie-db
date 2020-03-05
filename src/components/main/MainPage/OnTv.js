import React from 'react';

import { fetchTvshows } from '../../../actions';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchTvshows  
};

class OnTv extends React.Component {

    componentDidMount() {
        this.props.fetchTvshows('on_the_air', '1');
    }

    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }
    
    entries = () => {
        return this.props.tvshows.entries.results.map((item, index) => {
            if(index < 3){
                return(
                    <Link to={`/details/tv/${item.id}`} key={item.id}>
                        <div className="placeholder"></div>
                        <img onLoad={this.imageLoaded} alt='' src={`https://image.tmdb.org/t/p/w1000_and_h563_face${item.backdrop_path}`}></img>
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
            <div className="grid half">
               <div className='category'>
                    On Tv
               </div>
               <div className="thumbnails">
                   {this.props.tvshows ? this.entries() : null}
               </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnTv);