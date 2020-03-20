import React from 'react';

class Reviews extends React.Component {
    
    toggleReview = (e) => {
        if(e.target.classList.contains('review')){
            e.target.classList.toggle('hide')
        }
        else {
            e.target.parentNode.classList.toggle('hide')
        }
    }
    
    render() {
        return(
            <div className='reviews'>
                <div className='title'>
                    Reviews
                </div>
                <div className='container'>
                    {this.props.details.reviews.results.map(entry => {
                        return(
                            <div 
                            onClick={this.toggleReview} 
                            key={entry.id} 
                            id={entry.id}
                            className="review hide"
                            >
                                <div className='author'>
                                    A Review by <div style={{display: 'inline', color: '#45A29E'}}>{entry.author}</div>
                                </div>
                                <div className='content'>
                                    {entry.content}
                                </div>
                                <div className='original-url'>
                                    {entry.url}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


export default Reviews