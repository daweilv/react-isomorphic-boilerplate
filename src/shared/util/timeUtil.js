import moment from 'moment';
moment.locale('zh-cn')

export const fromNow = (date)=>{
    return moment(date).fromNow()
}

export const publishDateFormatter = (date)=>{
    return moment(date).format('YY-MM-DD')
}