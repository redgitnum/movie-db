import React from 'react';

import { fetchDiscover, fetchKeywords } from '../../actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { genres } from '../../constants/genres'

const mapStateToProps = state => state;
const mapDispatchToProps = {
  fetchDiscover,
  fetchKeywords
};






class Discover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            year: '',
            sort: 'popularity.desc',
            keywords: [],
            genres: []
        }
    }

    componentDidMount() {
        this.props.fetchDiscover(this.props.match.params.type, this.props.match.params.page, this.state.year, this.state.sort, '', '');
    }

    componentDidUpdate(prevProps, prevState) {
        if(
            prevProps.match.params.page !== this.props.match.params.page || 
            prevProps.match.params.type !== this.props.match.params.type ||
            prevState.year !== this.state.year ||
            prevState.sort !== this.state.sort ||
            prevState.keywords.length !== this.state.keywords.length ||
            prevState.genres.length !== this.state.genres.length
        ) {
            this.props.fetchDiscover(this.props.match.params.type, this.props.match.params.page, this.state.year, this.state.sort, this.state.genres, this.state.keywords);
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
            case 'tv':
                return 'Tv Shows';
            default:
                return 'Movies'
        }
    }

    filterOptions = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addKeyword = (e) => {
        if(e.keyCode === 13 || e.target.name === 'keywords') {
            if(this.props.keywords.entries.results) {
                let result = this.props.keywords.entries.results.find(item => {
                    return (item.name === e.target.value && !this.state.keywords.find(item => item.name === e.target.value))
                })
                if(result) {
                    this.setState({
                        keywords: [...this.state.keywords, result]
                    })
                    document.getElementById('keywords-input').value = '';
                    this.props.fetchKeywords('')
                }
            }
            
        }
    }

    addGenre = (e) => {
        if(e.target.value) {
            let result = genres.find(item => {
                return item.name === e.target.value
            })
            if(!this.state.genres.find(item => (item.id === result.id))){
                this.setState({
                    genres: [...this.state.genres, result]
                })
            }
            let list = document.getElementById('genres-list');
            list[0].selected = true;
        }
        
    }

    removeGenre = (e) => {
        let result = this.state.genres.filter(item => (item.id !== Number(e.target.value)))
        this.setState({
            genres: [...result]
        })
    }

    removeKeyword = (e) => {
        let result = this.state.keywords.filter(item => (item.id !== Number(e.target.value)))
        this.setState({
            keywords: [...result]
        })
    }

    populateKeywords = () => {
        let result = []
        if(this.props.keywords.entries.results){
                this.props.keywords.entries.results.map(item => {
                    return result.push(<option key={item.id} name={item.id} value={item.name}>{item.name}</option>)
                })
        }
        return result;
    }

    populateGenres = () => {
        let result = []
        genres.map((item, index) => {
            return result.push(<option key={item.id} name={item.id} value={item.name}>{item.name}</option>)
        })
        return result
    }

    populateYears = () => {
        let result = []
        for(let i = 2020; i > 1919; i--) {
            result.push(<option value={i}>{i}</option>)
        }
        return result
    }

    selectedGenres = (list) => {
        return list.map(item => <option onClick={this.removeGenre} key={item.id} value={item.id}>{item.name}</option>)
    }
    
    selectedKeywords = (list) => {
        return list.map(item => <option onClick={this.removeKeyword} key={item.id} value={item.id}>{item.name}</option>)
    }
    
    
    render() {
        return(
            <div className="section">
                <h1 className="section-title">Discover {this.getSortName(this.props.match.params.type)}</h1>
                <div className="filters">
                    <div className="filter-item">
                        <label>Year:</label>
                        <select name="year" onChange={this.filterOptions}>
                            <option value="">none</option>
                            {this.populateYears()}
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Sort by:</label>
                        <select name="sort" onChange={this.filterOptions}>
                            <option value="popularity.desc">Popularity Descending</option>
                            <option value="popularity.asc">Popularity Ascending</option>
                            <option value="vote_average.desc">Rating Descending</option>
                            <option value="vote_average.asc">Rating Ascending</option>
                            <option value="first_air_date.desc">Release Date Descending</option>
                            <option value="first_air_date.asc">Release Date Ascending</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Genres:</label>
                        <select onChange={this.addGenre} id='genres-list'>
                            <option></option>
                            {this.populateGenres()}
                        </select>
                        <div className="selected-genres">
                            {this.selectedGenres(this.state.genres)}
                        </div>
                    </div>
                    <div className="filter-item">
                        <label>Keywords:</label>
                        <input onChange={(e) => this.props.fetchKeywords(e.target.value)} onKeyDown={this.addKeyword} id='keywords-input'></input>
                        {!this.props.keywords.entries.total_results 
                            ?   null 
                            :   <select id="options" size={this.props.keywords.entries.results.length} name="keywords" onChange={this.addKeyword}>
                                    {this.populateKeywords()}
                                </select>
                        }
                        <div className="selected-keywords">
                            {this.selectedKeywords(this.state.keywords)}
                        </div>
                    </div>
                    
                </div>
                <div className="entries">
                    {this.props.discover.entries && this.props.discover.entries.results.map(entry => {
                        return(
                        <div className="entry" key={entry.id}>
                            <div className="poster">
                                <div className="placeholder"></div>
                                <img onLoad={this.imageLoaded} alt="" src={"https://image.tmdb.org/t/p/w342" + entry.poster_path || "https://image.tmdb.org/t/p/w342/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"}></img>
                            </div>
                            <div className="info">
                                <div className="name">
                                    {entry.title || entry.name}
                                </div>
                                <div className="year">
                                    {entry.release_date || entry.first_air_date}
                                </div>
                                <div className="overview">
                                {entry.overview}
                                </div>
                                <div className="rating">Rating: {entry.vote_average}</div>
                                <h3>More info</h3>
                            </div>
                        </div>
                        )
                    })}
                    
                </div>
                <div className="page-nav">
                    {this.props.match.params.page <= '1' 
                        ?   null
                        :   <Link to={`/discover/movie/${this.props.match.params.page - 1}`}>previous</Link>
                    }
                    {this.props.discover.entries && this.props.match.params.page >= this.props.discover.entries.total_pages
                        ?   null
                        :   <Link to={`/discover/movie/${Number(this.props.match.params.page) + 1}`}>next</Link>
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover);