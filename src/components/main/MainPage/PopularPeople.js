import React from 'react';

import { fetchPeople } from '../../../actions';
import { connect } from 'react-redux';


const mapStateToProps = state => state;
const mapDispatchToProps = {
    fetchPeople  
};

class PopularPeople extends React.Component {

    componentDidMount() {
        this.props.fetchPeople('', '1');
    }

    entries = () => {
        return this.props.people.entries.results.map((item, index) => {
            if(index < 5){
                return(
                    <div key={item.id}>
                        <img alt='' src={`https://image.tmdb.org/t/p/w154${item.profile_path}`}></img>
                        <div className="title">
                            {item.name}
                        </div>
                    </div>
                )
            }
            return null
       }
    )}

    render() {
        console.log(this.props.people)
        return(
            <div className="grid full">
               <div className='category'>
                    Popular People
               </div>
               <div>
                   {this.props.people && this.entries()}
               </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularPeople);