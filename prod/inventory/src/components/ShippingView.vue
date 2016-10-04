<style>
</style>

<template>
    <div id="shipping_pending_table" class='container'>
    <tabset>
        <tab header="Pending">
            <div>
                <h2>Pending Orders</h2>
                    <v-client-table :data=pendingTableData :columns="pending_table_columns" :options="pending_table_options"></v-client-table>
            </div>
        </tab>
        <tab header="Finish">
            <div>
                <h2>Completed Orders</h2>
                    <v-client-table :data=completedTableData :columns="completed_table_columns" :options="completed_table_options"></v-client-table>
            </div>
        </tab>
    </tabset>
    <button type="button" class="btn btn-primary" @click="submitCompletedOrders()" :disabled="completedOrder.length == 0">Submit</button>
</template>

<script>

    import {alert, tabset, tab} from 'vue-strap';
    import vClientTable from 'vue-tables';
    import moment from 'moment';
    import {clientShippingStatus} from '../vuex/actions';
    import {clientShippingFinishStatus} from '../vuex/actions';

    import 'element-ui/lib/theme-default/index.css';
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
            selectMe: function(id) {
                // this.completedOrder = [...new Set(this.completedOrder.map(item => item.id))];
                // console
                // this.completedOrder.add({"a": 1, "b":2});
                // console.log("after: ", this.completedOrder);


// function containsObject(obj, list) {
//     var x;
//     for (x in list) {
//         if (list.hasOwnProperty(x) && list[x] === obj) {
//             return true;
//         }
//     }

//     return false;
// }






                let selected_order_index = this.pendingTableData.findIndex(function(el){return el.id==id});
                this.pendingTableData[selected_order_index].selected = !this.pendingTableData[selected_order_index].selected;
                let selected_order = this.pendingTableData.find(function(el){return el.id==id});
                if (selected_order.selected) {


                } else {
                    let inx = this.completedOrder.findIndex(function(el){
                        if ((el) && (el.hasOwnProperty("id"))) {
                            return el.id == id;
                        } else {
                            return false;
                        }
                    });
                    console.log("111inx: ", inx);
                    if (inx > -1) {
                        // this.completedOrder.remove(function(el) { return el.id === id; });
                        delete this.completedOrder[inx];
                    }
                }
                console.log("this.completedOrder: ", this.completedOrder.length);
            },

            submitCompletedOrders: function(){

                let scope = {
                    completedTableData: this.completedTableData,
                    pendingTableData: this.pendingTableData,
                    completedOrder: this.completedOrder
                }; // reserve these two table data for 'forEach' scope usage

                let selected_order_ids= [];

                scope.pendingTableData.forEach(function(row_data) {
                    if (row_data.selected) {
                        selected_order_ids.push(row_data.id);
                        scope.completedOrder.push(row_data);
                    }
                });
                this.completedTableData = this.completedTableData.concat(scope.completedOrder);

                if (selected_order_ids.length > 0) {
                    this.pendingTableData = this.pendingTableData.filter(function(ele) {
                        return selected_order_ids.indexOf(ele.id) == -1;
                    });
                }

                if (selected_order_ids.length > 0) {
                    console.log("completedTableData: ", this.completedTableData);
                }
            }
        },

        data() {

            return {

                completedOrder: [],

                pendingTableData: [

                    {
                        "EDTA": null,
                        "ESR": null,
                        "Plasma": null,
                        "SST": 2,
                        "Urine": null,
                        "address": null,
                        "big_box": null,
                        "client_id": "0001",
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
                        "time": "",
                        "selected": false
                    },
                    {
                        "EDTA": null,
                        "ESR": null,
                        "Plasma": null,
                        "SST": 2,
                        "Urine": null,
                        "address": null,
                        "big_box": null,
                        "client_id": "0002",
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
                        "time": "",
                        "selected": false
                    },
                    {
                        "EDTA": null,
                        "ESR": null,
                        "Plasma": null,
                        "SST": 2,
                        "Urine": null,
                        "address": null,
                        "big_box": null,
                        "client_id": "0003",
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
                        "time": "",
                        "selected": false
                    }
                ],

                completedTableData: [

                    {
                        "EDTA": null,
                        "ESR": null,
                        "Plasma": null,
                        "SST": 2,
                        "Urine": null,
                        "address": null,
                        "big_box": null,
                        "client_id": 1001,
                        "client_practice_name": "aaaaaResearch Gastroenterology",
                        "comments": null,
                        "id": "2",
                        "operator": null,
                        "patient_kit": null,
                        "processed_by": null,
                        "processed_time": "",
                        "regular_box": null,
                        "req": null,
                        "shipping_method": null,
                        "time": "",
                        "selected": false
                    },
                    {
                        "EDTA": null,
                        "ESR": null,
                        "Plasma": null,
                        "SST": 2,
                        "Urine": null,
                        "address": null,
                        "big_box": null,
                        "client_id": 1002,
                        "client_practice_name": "bbbbbResearch Gastroenterology",
                        "comments": null,
                        "id": "3",
                        "operator": null,
                        "patient_kit": null,
                        "processed_by": null,
                        "processed_time": "",
                        "regular_box": null,
                        "req": null,
                        "shipping_method": null,
                        "time": "",
                        "selected": false
                    },
                    {
                        "EDTA": null,
                        "ESR": null,
                        "Plasma": null,
                        "SST": 2,
                        "Urine": null,
                        "address": null,
                        "big_box": null,
                        "client_id": 1003,
                        "client_practice_name": "ccccShawn Michael Field MD PhD LLC",
                        "comments": null,
                        "id": "4",
                        "operator": null,
                        "patient_kit": null,
                        "processed_by": null,
                        "processed_time": "",
                        "regular_box": null,
                        "req": null,
                        "shipping_method": null,
                        "time": "",
                        "selected": false
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
                        delete: 
                        // `<div v-if="$parent.$parent.$parent.tableData.find(function(el){return el.id=='3'}).selected">Now you see me</div>
                        // <div v-else>Now you don't</div>`
                        `<input type="checkbox" @click="$parent.$parent.$parent.selectMe({id})" autocomplete="off">`
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
