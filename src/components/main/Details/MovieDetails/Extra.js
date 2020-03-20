import React from 'react';
import { Link } from "react-router-dom";

import link_icon from '../../../../assets/bx_bx-link-external.svg';
import imdb_icon from '../../../../assets/bx_bxl-imdb.svg';
import placeholder from '../../../../assets/placeholder.svg';


class Extra extends React.Component {
    render() {
        return(
            <div className="extra">
                <div className="facts">
                    <div className="links">
                        <div className="title">
                            Information
                        </div>
                        {this.props.details.entry.homepage && <div className="homepage">
                            <a 
                                href={this.props.details.entry.homepage} 
                                target='_blank'
                                rel="noopener noreferrer">
                                <img alt='' src={link_icon}></img>
                            </a>
                        </div>}
                        {this.props.details.entry.imdb_id && <div className="imdb">
                            <a 
                                href={'https://www.imdb.com/title/' + this.props.details.entry.imdb_id} 
                                target='_blank'
                                rel="noopener noreferrer">
                                <img alt='' src={imdb_icon}></img>
                            </a>
                        </div>}
                    </div>
                    <div className="budget">
                        <div className='title'>
                            Budget:
                        </div>
                        <div className='value'>
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.props.details.entry.budget)}
                        </div>
                    </div>
                    <div className="revenue">
                        <div className='title'>
                            Revenue:
                        </div>
                        <div className='value'>
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.props.details.entry.revenue)}
                        </div>
                    </div>
                    <div className="og-lang">
                        <div className='title'>
                            Original language:
                        </div>
                        <div className='value'>
                            {this.props.details.entry.original_language}
                        </div>
                    </div>
                    <div className="og-title">
                        <div className='title'>
                            Original title:
                        </div>
                        <div className='value'>
                            {this.props.details.entry.original_title}
                        </div>
                    </div>
                    <div className="runtime">
                        <div className='title'>
                            Runtime:
                        </div>
                        <div className='value'>
                            {Math.floor(this.props.details.entry.runtime/60)}h {this.props.details.entry.runtime%60}m
                        </div>
                    </div>
                </div>
                <div className='cast'>
                    <div>Top billed Cast</div>
                    <div className="top-cast">
                        {this.props.details.credits.cast.map((entry, index) => {
                            if(index <5){
                                return(
                                    <Link to={`/details/person/${entry.id}`} key={entry.id} className="member">
                                        <img alt='' src={entry.profile_path ? `https://image.tmdb.org/t/p/w154${entry.profile_path}` : placeholder}></img>
                                        <div>{entry.name}</div>
                                        {entry.character ? <div>as {entry.character}</div> : null}
                                    </Link>
                                )
                            }
                            return null
                            
                        })}
                        <div>
                            <div>&#187;</div>
                            <div>Full cast & crew</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Extra