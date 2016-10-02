<style>
</style>

<template>
    <div id="shipping_pending_table" class='container'>
    <tabset>
        <tab header="Pending">
            <div>
                <h2>Pending Orders</h2>
                    <v-client-table :data=tableData :columns="pending_table_columns" :options="pending_table_options"></v-client-table>
            </div>
        </tab>
        <tab header="Finish">
            <div>
                <h2>Completed Orders</h2>
                    <v-client-table :data=tableData :columns="completed_table_columns" :options="completed_table_options"></v-client-table>
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
                // pending_table_data: state => state.clientShippingPendingTable,
                completed_table_data: state => state.clientShippingFinishTable
            },
            actions: {
                // clientShippingStatus,
                clientShippingFinishStatus
            }
        },

        // events: {
        //     'vClientTable:onclick': function() {
        //         console.log("hhaha");
        //     }
        // },

        methods: {
            deleteMe: function(id) {
                console.log(id);
                console.log(this.pending_table_columns);
                console.log(this.tableData.find(function(el){return el.id==id}));
                // console.log($parent.$parent.tableData);
                // console.log(id);
                // console.log("ID: ", this.$children[0].$children[0].$children[0]);
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
            // this.clientShippingStatus(),
            this.clientShippingFinishStatus()
        },

        data() {

            return {

                tableData: [

                    {
                        "EDTA": null,
                        "ESR": null,
                        "Plasma": null,
                        "SST": 2,
                        "Urine": null,
                        "address": null,
                        "big_box": null,
                        "client_id": 5555,
                        "client_practice_name": "Research Gastroenterology",
                        "comments": null,
                        "id": "2",
                        "operator": null,
                        "patient_kit": null,
                        "processed_by": null,
                        "processed_time": "",
                        "regular_box": null,
                        "req": null,
                        "shipping_method": null,
                        "time": ""
                    },
                    {
                        "EDTA": null,
                        "ESR": null,
                        "Plasma": null,
                        "SST": 2,
                        "Urine": null,
                        "address": null,
                        "big_box": null,
                        "client_id": 1111,
                        "client_practice_name": "Research Gastroenterology",
                        "comments": null,
                        "id": "3",
                        "operator": null,
                        "patient_kit": null,
                        "processed_by": null,
                        "processed_time": "",
                        "regular_box": null,
                        "req": null,
                        "shipping_method": null,
                        "time": ""
                    },
                    {
                        "EDTA": null,
                        "ESR": null,
                        "Plasma": null,
                        "SST": 2,
                        "Urine": null,
                        "address": null,
                        "big_box": null,
                        "client_id": 1234,
                        "client_practice_name": "Shawn Michael Field MD PhD LLC",
                        "comments": null,
                        "id": "4",
                        "operator": null,
                        "patient_kit": null,
                        "processed_by": null,
                        "processed_time": "",
                        "regular_box": null,
                        "req": null,
                        "shipping_method": null,
                        "time": ""
                    }
                ],

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
                        delete: `<label class="btn btn-primary"><input type="checkbox" @click="$parent.$parent.$parent.deleteMe({id})" autocomplete="off">Complete</label>`
                        // "<a href='javascript:void(0);' @click='$parent.$parent.$parent.deleteMe({id})'><i class='glyphicon glyphicon-erase'></i></a>"
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
