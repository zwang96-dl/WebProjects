<template>
    <div id="shipping_pending_table">
    <h2>Shipping Pending</h2>
      <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
    </div>
</template>

<script>

    import {alert} from 'vue-strap';
    import vClientTable from 'vue-tables';
    import moment from 'moment';
    import {clientShippingStatus} from '../vuex/actions';
    import {clientShippingFinishStatus} from '../vuex/actions';
    export default {

        components: {
            alert,
            vClientTable
        },

        vuex: {
            getters: {
                tableData: state => state.clientShippingFinishTable
            },
            actions: {
                clientShippingFinishStatus
            }
        },
    created() {
        this.clientShippingFinishStatus()
    },

        data() {
            return {
                columns: ['client_practice_name', 'client_id', 'time', 'req', 'shipping_method', 'processed_time', 'processed_by', 'comments'],
                options: {
                    // dateColumns: ['birth_date'],
                    headings: {
                        client_practice_name: 'Client Name',
                        client_id: 'Client ID',
                    },
                    filterable: ['client_practice_name', 'client_id']
                    // customFilters: [{
                    //         name: 'alphabet',
                    //         callback: function(row, query) {
                    //             return row.client_name[0] == query;
                    //         }
                    //     }]
                        //  orderBy: {
                        //        column:'age',
                        //        ascending:false
                        //    }
                }
            }
        }
    }

</script>
