import React from 'react';
import TvResults from './SearchResults/TvResults';
import PeopleResults from './SearchResults/PeopleResults';
import MovieResults from './SearchResults/MovieResults';

import { fetchSearch } from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchSearch  
};



class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieVisible: true,
            tvVisible: false,
            peopleVisible: false
        }
    }

    componentDidMount() {
        this.props.fetchSearch(this.props.match.params.query);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.query !== this.props.match.params.query) {
            this.props.fetchSearch(this.props.match.params.query);
        }
    }

    resetState = () => {
        this.setState({
            movieVisible: false,
            tvVisible: false,
            peopleVisible: false
        })
    }

    changeCategory = (e) => {
        this.resetState()
        switch(e.target.value) {
            case 'movies': 
                this.setState({movieVisible: true})
                break;
            case 'tv':  
                this.setState({tvVisible: true})
                break;
            case 'people': 
                this.setState({peopleVisible: true})
                break;
            default: 
                this.setState({movieVisible: true})
                
        }
    }
    

    render(){
        return(
            <div className="search-results">
                <div className="search-query">Search results for: {this.props.match.params.query}</div>
                <div className="category">
                    <button 
                    onClick={this.changeCategory} 
                    value="movies"
                    className={this.state.movieVisible ? 'active' : null}
                    >
                        {this.props.search.movies && this.props.search.movies.total_results}
                        &nbsp;Movies
                    </button>
                    <button 
                    onClick={this.changeCategory} 
                    value="tv"
                    className={this.state.tvVisible ? 'active' : null}
                    >
                        {this.props.search.tv && this.props.search.tv.total_results}
                        &nbsp;Tv Shows
                    </button>
                    <button 
                    onClick={this.changeCategory} 
                    value="people"
                    className={this.state.peopleVisible ? 'active' : null}
                    >
                        {this.props.search.people && this.props.search.people.total_results}
                        &nbsp;People
                    </button>
                </div>
                <div className="content">
                    <MovieResults visible={this.state.movieVisible}/> 
                    <TvResults visible={this.state.tvVisible}/>
                    <PeopleResults visible={this.state.peopleVisible}/>
                </div>
            </div>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);