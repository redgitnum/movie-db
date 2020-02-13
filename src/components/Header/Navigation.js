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
                    <Link to="/discover" className="list-item"><li><img alt="ufo" src={ufo}></img><div className="nav-text">DISCOVER</div></li></Link>
                    <Link to="/movies/popular/1" className="list-item"><li><img alt="camera" src={camera}></img><div className="nav-text">MOVIES</div></li></Link>
                    <Link to="/tvshows/popular/1" className="list-item"><li><img alt="tv" src={tv}></img><div className="nav-text">TV SHOWS</div></li></Link>
                    <Link to="/people/1" className="list-item"><li><img alt="star" src={star}></img><div className="nav-text">PEOPLE</div></li></Link>
                </ul>
                <div className="searchbar">
                    <input type="text" placeholder="SEARCH MOVIES, TV SHOWS OR PEOPLE"></input>
                </div>
            </div>
        )
    }
}


export default Navigation