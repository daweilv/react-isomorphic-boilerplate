import moment from 'moment';

export const fromNow = (date)=>{
    return moment(date).fromNow()
}

export const publishDateFormatter = (date)=>{
    return moment(date).format('MMM DD')
}