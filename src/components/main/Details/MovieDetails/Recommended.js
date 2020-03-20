import React from 'react';
import { Link } from "react-router-dom";

import placeholder from '../../../../assets/placeholder.svg';


class Recommended extends React.Component {
    render() {
        return(
            <div className='recommended'>
                <div className='title'>
                    Recommended
                </div>
                <div className='content'>
                    {this.props.details.recommended.results.map((entry, index) => {
                        if(index < 5 && entry.release_date){
                            return(
                            <Link to={`/details/movie/${entry.id}`} key={entry.id}>
                                <img alt='' src={entry.poster_path ? 'http://image.tmdb.org/t/p/w185' + entry.poster_path : placeholder}></img>
                                <div className='name'>
                                    {entry.title}{entry.release_date ? ' - ' + entry.release_date.slice(0,4) : null}
                                </div>
                            </Link>
                            )
                        }
                        else if(index < 5 && entry.first_air_date) {
                            return(
                                <Link to={`/details/tv/${entry.id}`} key={entry.id}>
                                    <img alt='' src={entry.poster_path ? 'http://image.tmdb.org/t/p/w185' + entry.poster_path : placeholder}></img>
                                    <div className='name'>
                                        {entry.name}{entry.first_air_date ? ' - ' + entry.first_air_date.slice(0,4) : null}
                                    </div>
                                </Link>
                                )
                        }
                        return null
                    })}
                </div>
            </div>
        )
    }
}


export default Recommended