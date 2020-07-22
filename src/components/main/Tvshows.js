import React from 'react';

import { fetchTvshows, resetStore } from '../../actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchTvshows,
    resetStore
};

class Tvshows extends React.Component {

    componentDidMount() {
        this.props.fetchTvshows(this.props.match.params.sort, this.props.match.params.page);
    }

    componentWillUnmount(){
        this.props.resetStore()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.page !== this.props.match.params.page || prevProps.match.params.sort !== this.props.match.params.sort) {
            this.props.fetchTvshows(this.props.match.params.sort, this.props.match.params.page);
        }
    }

    imageLoaded = (e) => {
        let placeholder = e.target.parentNode.childNodes[0];
        let img = e.target;
        placeholder.style.display = 'none';
        img.style.display = 'block'
    }

    getSortName = (e) => {
        switch(e) {
            case 'airing_today':
                return 'Airing Today';
            case 'on_the_air':
                return 'On the Air';
            case 'top_rated':
                return 'Top Rated';
            default:
                return 'Popular'
        }
    }

    render() {
        
        return(
            <div className="section">
                <h1 className="section-title">{this.getSortName(this.props.match.params.sort)} Tv Shows</h1>
                <div className="entries">
                    {this.props.tvshows && this.props.tvshows.entries.results.map(entry => {
                        return(
                        <div className="entry" key={entry.id}>
                            <Link to={`/details/tv/${entry.id}`} className="poster">
                                <div className="placeholder"></div>
                                <img onLoad={this.imageLoaded} alt="" src={"https://image.tmdb.org/t/p/w342" + entry.poster_path || "https://image.tmdb.org/t/p/w342/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"}></img>
                            </Link>
                            <div className="info">
                                <Link to={`/details/tv/${entry.id}`} className="name">
                                    {entry.name}
                                </Link>
                                <div className="year">
                                    First air date: {entry.first_air_date}
                                </div>
                                <div className="overview">
                                {entry.overview}
                                </div>
                                <div className="rating">Rating: {entry.vote_average}</div>
                                <h3><Link to={`/details/tv/${entry.id}`}>More info</Link></h3>
                            </div>
                        </div>
                        )
                    })}
                    
                </div>
                <div className="page-nav">
                    {this.props.match.params.page <= '1' 
                        ?   null
                        :   <Link to={`/tvshows/${this.props.match.params.sort}/${this.props.match.params.page - 1}`}>previous</Link>
                    }
                    {this.props.tvshows && this.props.match.params.page >= this.props.tvshows.entries.total_pages
                        ?   null
                        :   <Link to={`/tvshows/${this.props.match.params.sort}/${Number(this.props.match.params.page) + 1}`}>next</Link>
                    }
                </div>
            </div>
        
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tvshows);