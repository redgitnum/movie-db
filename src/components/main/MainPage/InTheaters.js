import React from 'react';

import { fetchMovies } from '../../../actions';
import { connect } from 'react-redux';


const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchMovies  
};

class InTheaters extends React.Component {

    componentDidMount() {
        this.props.fetchMovies('now_playing', '1');
    }

    entries = () => {
        return this.props.movies.entries.results.map((item, index) => {
            if(index < 3){
                return(
                    <div key={item.id}>
                        <img alt='' src={`https://image.tmdb.org/t/p/w1000_and_h563_face${item.backdrop_path}`}></img>
                        <div className="title">
                            {item.title}
                        </div>
                    </div>
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
                   {this.props.movies && this.entries()}
               </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InTheaters);