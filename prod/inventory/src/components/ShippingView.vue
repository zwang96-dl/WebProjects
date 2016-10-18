<style>
</style>

<template>
    <div class="container">
        <tabset>

            <tab header="Pending">
                <div>
                    <h2>Pending Orders</h2>
                    <v-client-table :data=pendingTableData :columns="pending_table_columns" :options="pending_table_options"></v-client-table>
                </div>
                <button type="button" class="btn btn-primary" @click="submitCompletedOrders()" :disabled="completedOrder == 0">Submit</button>
            </tab>

            <tab header="Finish">
                <div>
                    <h2>Completed Orders</h2>
                    <v-client-table :data=completedTableData :columns="completed_table_columns" :options="completed_table_options">
                    </v-client-table>
                </div>
                <button type="button" class="btn btn-primary" @click="cancelCompletedOrders()" :disabled="cancelOrder == 0">Submit</button>
            </tab>

        </tabset>
    </div>
</template>

<script>

    import {alert, tabset, tab} from 'vue-strap';
    import vClientTable from 'vue-tables';
    import moment from 'moment';
    import {
        clientShippingPendingStatus,
        clientShippingFinishStatus, 
        updatePending,
        cancelCompleted,
        updateShippingTable
    } from '../vuex/actions';

    var that;
    export default {

        components: {
            alert,
            vClientTable,
            tabset,
            tab
        },

        vuex: {
            getters: {
                pendingTableData: state => state.clientShippingPendingTable,
                completedTableData: state => state.clientShippingFinishTable
            },
            actions: {
                clientShippingPendingStatus,
                clientShippingFinishStatus,
                updatePending,
                updateShippingTable,
                cancelCompleted
            }
        },

        created() {
            that = this;
            this.clientShippingPendingStatus();
            this.clientShippingFinishStatus();
        },

        events: {
            'update-pending-orders': function() {
                this.updateShippingTable(this.pendingTableData.filter(el=>el.selected == 'Completed'));
                this.clientShippingPendingStatus();
                this.clientShippingFinishStatus();
            }
        },

        methods: {

            submitCompletedOrders: function(){
                this.$dispatch('update-pending-orders')
                this.completedOrder = 0;
            },
            cancelOrders: function(){
                this.$dispatch('cancel-orders')
                this.cancelOrder = 0;
            }
        },

        data() {

            return {
                completedOrder: 0,
                cancelOrder: 0,

                selected: window.selected,

                pending_table_columns: [
                    'Select',
                    'client_practice_name',
                    'client_id',
                    'time',
                    'EDTA',
                    'SST',
                    'Plasma',
                    'Urine',
                    'ESR',
                    'patient_kit',
                    'regular_box',
                    'big_box',
                    'req',
                    'shipping_method',
                    'comments',
                ],

                completed_table_columns: [
                    'Cancel',
                    'client_practice_name',
                    'client_id',
                    'time',
                    'EDTA',
                    'SST',
                    'Plasma',
                    'Urine',
                    'ESR',
                    'patient_kit',
                    'regular_box',
                    'big_box',
                    'req',
                    'shipping_method',
                    'processed_time',
                    'processed_by',
                    'comments'
                ],

                pending_table_options: {

                    pagination:{
                        chunk:8
                    },

                    perPage: 8,

                    perPageValues: [8,20,40,80,160,320],

                    onRowClick: function(row) {
                        that.updatePending(row.id);
                        if (row.selected == "Completed") {
                            that.completedOrder += 1;
                        } else if (row.selected == "Pending") {
                            that.completedOrder -= 1;
                        }
                    },

                    headings: {
                        client_practice_name: 'Client',
                        client_id: 'Client ID',
                        time: 'Created Time'
                    },

                    filterable: ['client_practice_name', 'client_id'],

                    templates: {
                        Select: function(row){
                            if (row.selected == "Completed") {
                                return `<button type="button" class="btn btn-danger">Submit</button>`;
                            }else {
                                return `<button type="button" class="btn btn-default">Submit</button>`
                            }
                        }
                    },
                },

                completed_table_options: {

                    pagination:{
                        chunk:8
                    },

                    perPage: 8,

                    perPageValues: [8,20,40,80,160,320],

                    headings: {
                        client_practice_name: 'Client Name',
                        client_id: 'Client ID'
                    },
                    filterable: ['client_practice_name', 'client_id', 'processed_time'],
                    templates: {
                        Cancel: function(row){
                            if (row.cancel == "Cancel") {
                                return `<button type="button" class="btn btn-success">Cancel</button>`;
                            }else {
                                return `<button type="button" class="btn btn-default">Cancel</button>`
                            }
                        }
                    },
                    onRowClick: function(row) {
                        that.cancelCompleted(row.id);
                        if (row.cancel == "Cancel") {
                            that.cancelOrder += 1;
                        } else if (row.cancel == "") {
                            that.cancelOrder -= 1;
                        }
                    },
                }
            }

        }
    }

</script>
