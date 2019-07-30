import moment from 'moment'

export const dataMixin = {
    methods: {
        formatDate(str,outputFormat){
            return moment(str).format(outputFormat)
        },
        humanFormat(str) {
            return moment(str).startOf('hour').fromNow();
        }
    },
}