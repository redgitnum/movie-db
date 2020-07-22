const User = require('../models/Users');


updateRecords = (req) => {
    return(
        User.findOne({username: req.body.username})
        .then( async user => {
            let message = ''
            switch(req.body.dataType){
                case 'rate_form' : 
                    for(let record in user.records.ratings) {
                        if(user.records.ratings[record].id === req.body.mediaId) {
                            return ('Your already rated this entry')
                        }
                    }
                    user.records.ratings.push({
                        id: req.body.mediaId, 
                        thumbnailImage: req.body.thumbnailImage,
                        title: req.body.title,
                        rating: req.body.data, 
                        media: req.body.entryType
                    });
                    message = 'Entry rated successfully'
                    break;
                case 'review_form':
                    for(let record in user.records.reviews) {
                        if(user.records.reviews[record].id === req.body.mediaId) {
                            return ('Your already reviewed this entry')
                        }
                    }
                    user.records.reviews.push({
                        id: req.body.mediaId, 
                        thumbnailImage: req.body.thumbnailImage,
                        title: req.body.title,
                        review: req.body.data, 
                        media: req.body.entryType
                    });
                    message = 'Entry reviewed successfully'
                    break;
                default: 
                    for(let record in user.records.watchlist) {
                        if(user.records.watchlist[record].id === req.body.mediaId) {
                            return ('This entry is already in your watchlist')
                        }
                    }
                    user.records.watchlist.push({
                        id: req.body.mediaId,
                        thumbnailImage: req.body.thumbnailImage,
                        title: req.body.title, 
                        media: req.body.entryType
                    });
                    message = 'Entry added to watchlist successfully'
                    break;
            }
            await user.save()
            return message
        }).catch(e => console.log(e))
    ) 
}

module.exports = updateRecords