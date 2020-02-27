import React from 'react';
import star from '../../assets/star-icon.svg';
import tv from '../../assets/tv-icon.svg';
import ufo from '../../assets/ufo-icon.svg';
import camera from '../../assets/camera-icon.svg';

import { Link } from "react-router-dom";

class Navigation extends React.Component {
    render() {
        return(
            <div className="nav">
                <ul className="navbar">
                    <li>
                        <div className="nav-container">
                            <Link to="/discover/movie/1" className="main-link">
                                <img alt="ufo" src={ufo}></img>
                                <div className="nav-text">DISCOVER</div>
                            </Link>
                            <div className="menu">  
                                <div className="nav-sort">
                                    <Link to="/discover/movie/1">MOVIES</Link>
                                    <Link to="/discover/tv/1">TV SHOWS</Link>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="nav-container">
                            <Link to="/movies/popular/1" className="main-link">
                                <img alt="camera" src={camera}></img>
                                <div className="nav-text">MOVIES</div>
                            </Link>
                            <div className="menu">  
                                <div className="nav-sort">
                                    <Link to="/movies/popular/1">POPULAR</Link>
                                    <Link to="/movies/top_rated/1">TOP RATED</Link>
                                    <Link to="/movies/upcoming/1">UPCOMING</Link>
                                    <Link to="/movies/now_playing/1">NOW PLAYING</Link>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="nav-container">
                            <Link to="/tvshows/popular/1" className="main-link">
                                <img alt="tv" src={tv}></img>
                                <div className="nav-text">TV SHOWS</div>
                            </Link>
                            <div className="menu">  
                                <div className="nav-sort">
                                    <Link to="/tvshows/popular/1">POPULAR</Link>
                                    <Link to="/tvshows/top_rated/1">TOP RATED</Link>
                                    <Link to="/tvshows/on_the_air/1">ON THE AIR</Link>
                                    <Link to="/tvshows/airing_today/1">AIRING TODAY</Link>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="nav-container">
                            <Link to="/people/1" className="main-link">
                                <img alt="star" src={star}></img>
                                <div className="nav-text">PEOPLE</div>
                            </Link>
                        </div>
                    </li>

                </ul>
                <div className="searchbar">
                    <input type="text" placeholder="SEARCH MOVIES, TV SHOWS OR PEOPLE"></input>
                </div>
            </div>
        )
    }
}


export default Navigation