import React from 'react';

import { fetchDiscover, fetchKeywords } from '../../actions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

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
            keywords: []
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
            prevState.keywords !== this.state.keywords
        ) {
            this.props.fetchDiscover(this.props.match.params.type, this.props.match.params.page, this.state.year, this.state.sort, 'genres', this.state.keywords);
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

    addOption = (e) => {
        if(e.keyCode === 13 || e.target.name === 'keywords'){  
            let datalist = document.getElementById('options');
            if(datalist){
                for(let i = 0; i < datalist.options.length; i++){
                    if(e.target.value === datalist.options[i].value){
                        let container = document.querySelector('.selected-keywords');
    
                        let checkExist = () => {
                            let exist = false;
                            for(let x = 0; x< container.children.length;x++){
                                let text = container.children[x].childNodes[0].nodeValue;
                                if(e.target.value === text){
                                    exist = true;
                                    break
                                }
                            }
                            return exist
                        }
                        if(!checkExist()){
                            let element = document.createElement('LI');
                            let text = document.createTextNode(e.target.value)
                            element.appendChild(text);
                            container.appendChild(element);
                            this.setState({
                                keywords: [...this.state.keywords, datalist[e.target.options.selectedIndex].attributes[0].nodeValue], 
                            })
                            if(e.target.name !== 'keywords'){
                                e.target.value = ''
                            } else {
                                let box = document.getElementById('keywords-input');
                                box.value = '';
                                this.props.fetchKeywords('')
                                
                            }
                            
                        }
                        
                    }
                    
                }
            }
            
        }  
    }

    getKeywords = (e) => {
        this.props.fetchKeywords(e.target.value)
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
    
    render() {
        console.log(this.state.keywords)
        return(
            <div className="section">
                <h1 className="section-title">Discover {this.getSortName(this.props.match.params.type)}</h1>
                <div className="filters">
                    <select name="year" onChange={this.filterOptions}>
                        <option value="">none</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                    </select>
                    <select name="sort" onChange={this.filterOptions}>
                        <option value="popularity.desc">Popularity Descending</option>
                        <option value="popularity.asc">Popularity Ascending</option>
                        <option value="vote_average.desc">Rating Descending</option>
                        <option value="vote_average.asc">Rating Ascending</option>
                        <option value="first_air_date.desc">Release Date Descending</option>
                        <option value="first_air_date.asc">Release Date Ascending</option>
                    </select>
                        <input onChange={this.getKeywords} onKeyDown={this.addOption} id="keywords-input"></input>
                        {!this.props.keywords.entries.total_results 
                            ?   null 
                            :   <select id="options" size={this.props.keywords.entries.results.length} name="keywords" onChange={this.addOption}>
                                    {this.populateKeywords()}
                                </select>
                        }
                        <div className="selected-keywords">

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