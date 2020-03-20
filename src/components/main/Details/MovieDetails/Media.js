import React from 'react';

class Media extends React.Component {
    render() {
        return(
            <div className='media'>
                <div className='title'>
                    Media
                </div>
                <div className='container'>
                    {this.props.details.images ? 
                        <div className='images'>
                            <div className='title'>
                                Images
                            </div>
                            <div className='content'>
                                {this.props.details.images.backdrops.map(image => {
                                    return(
                                        <img alt='' key={image.file_path} src={'http://image.tmdb.org/t/p/w780' + image.file_path}>

                                        </img>
                                    )
                                })}
                                {this.props.details.images.posters.map(image => {
                                    return(
                                        <img alt='' key={image.file_path} src={'http://image.tmdb.org/t/p/w185' + image.file_path}>

                                        </img>
                                    )
                                })}
                            </div>
                        </div>
                    : null}

                    {this.props.details.videos ?
                        <div className='videos'>
                            <div className='title'>
                                Videos
                            </div>
                            <div className='content'>
                                {this.props.details.videos.results.map(video => {
                                        return(
                                            <div key={video.id}>
                                                <iframe 
                                                title={video.name}
                                                src={"https://www.youtube.com/embed/"+video.key}
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen
                                                >
                                                </iframe>
                                            </div>
                                        )
                                })}
                            </div>
                        </div>
                    : null}
                    </div>
            </div>
        )
    }
}


export default Media