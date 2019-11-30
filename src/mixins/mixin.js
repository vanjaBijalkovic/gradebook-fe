import moment from 'moment'
import { mapActions } from 'vuex'

export const dataMixin = {
    methods: {
        formatDate(str, outputFormat) {
            return moment(str).format(outputFormat)
        },
        humanFormat(str) {
            return moment(str).startOf('hour').fromNow();
        },
        ...mapActions({
            setError: 'setError'
        }),
    },

    watch: {
        '$route'(newValue, oldValue) {
            this.setError(null);
        }
    },
}