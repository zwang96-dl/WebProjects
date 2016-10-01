<style>
</style>

<template>
    <div id="shipping_pending_table" class='container'>
    <tabset>
        <tab header="Pending">
            <div>
                <h2>Pending Orders</h2>
                    <v-client-table :data="pending_table_data" :columns="pending_table_columns" :options="pending_table_options"></v-client-table>
            </div>
        </tab>
        <tab header="Finish">
            <div>
                <h2>Completed Orders</h2>
                    <v-client-table :data="completed_table_data" :columns="completed_table_columns" :options="completed_table_options"></v-client-table>
            </div>
        </tab>
    </tabset>
</template>

<script>

    import {alert, tabset, tab} from 'vue-strap';
    import vClientTable from 'vue-tables';
    import moment from 'moment';
    import {clientShippingStatus} from '../vuex/actions';
    import {clientShippingFinishStatus} from '../vuex/actions';
    export default {

        components: {
            alert,
            vClientTable,
            tabset,
            tab
        },

        vuex: {
            getters: {
                pending_table_data: state => state.clientShippingPendingTable,
                completed_table_data: state => state.clientShippingFinishTable
            },
            actions: {
                clientShippingStatus,
                clientShippingFinishStatus
            }
        },

        events: {
            'vClientTable:onclick': function() {
                console.log("hhaha");
            }
        },

        methods: {
            deleteMe: function(id) {
                console.log("ID: ", this.$children[0].$children[0].$children[0]);
                // console.log(this.$parent.$parent);
                // for (let i in this.$parent.$parent) {
                //     if (this.hasOwnProperty(i)) {
                //         console.log(i);
                //     }
                // }
                // console.log("current this: ", this.pending_table_columns);
                // console.log("current that: ", that);
            }
        },

        created() {
            this.clientShippingStatus(),
            this.clientShippingFinishStatus()
        },

        data() {

            return {
                pending_table_columns: ['client_practice_name', 'client_id', 'time', 'req', 'shipping_method', 'comments'],
                completed_table_columns: ['client_practice_name', 'client_id', 'time', 'req', 'shipping_method', 'processed_time', 'processed_by', 'comments'],
                pending_table_options: {
                    compileTemplates: true,
                    headings: {
                        client_practice_name: 'Client Name',
                        client_id: 'Client ID',
                    },
                    filterable: ['client_practice_name', 'client_id'],
                    templates: {
                        delete: "<a href='javascript:void(0);' @click='this.$parent.$parent.$parent.deleteMe()'><i class='glyphicon glyphicon-erase'></i></a>"
                    }
                },
                completed_table_options: {
                    headings: {
                        client_practice_name: 'Client Name',
                        client_id: 'Client ID'
                    },
                    filterable: ['client_practice_name', 'client_id', 'processed_time']
                }
            }

        }

    }

</script>
