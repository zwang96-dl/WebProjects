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
        <button type="button" class="btn btn-primary" @click="submitCompletedOrders()" :disabled="completedOrder == 0">Submit</button>
        <tab header="Finish">
            <div>
                <h2>Completed Orders</h2>
                <v-client-table :data=completedTableData :columns="completed_table_columns" :options="completed_table_options"></v-client-table>
            </div>
        </tab>
    </tabset>
</template>

<script>

    import {alert, tabset, tab} from 'vue-strap';
    import vClientTable from 'vue-tables';
    import moment from 'moment';
    import {clientShippingPendingStatus, clientShippingFinishStatus, updatePending, updateShippingTable} from '../vuex/actions';
    // console.log("clientShippingPendingStatus: ", clientShippingPendingStatus);
    // console.log("clientShippingFinishStatus: ", clientShippingFinishStatus);

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
                updateShippingTable
            }
        },

        created() {
            that = this;
            this.clientShippingPendingStatus();
            this.clientShippingFinishStatus();
        },

        events: {
            'update-pending-orders': function() {
                // this.placeOrder(this.parseOrder()).then((res) => {
                //     this.showModal = false;
                //     res ? this.showRight = true : this.showRightFail = true
                // })

                // this.$data = this.$options.data();
                // this.$dispatch('update-pending-orders');
                // this.$data = this.pendingTableData.filter(el=>el.selected == 'Completed');
                // this.$dispatch('update-pending-orders');
                this.updateShippingTable(this.pendingTableData.filter(el=>el.selected == 'Completed'));
                // console.log(this.pendingTableData.filter(el=>el.selected == 'Completed'));
            this.clientShippingPendingStatus();
            this.clientShippingFinishStatus();
                // console.log("HAHAHAHA", this);
                // console.log("HAHAHAHA", this.$data);
                // console.log("HAHAHAHA", this.$options.data());
            }
        },

        methods: {

            // selectMe: function(id) {
            //     console.log(this);
            //     console.log(Math.random());
            //     // console.log("Before  this.completedOrder: ", this.completedOrder);
            //     let selected_order_index = this.pendingTableData.findIndex(function(el){return el.id==id});
            //     // console.log(selected_order_index);
            //     // console.log("Before true or false: ", this.pendingTableData[selected_order_index].selected);
            //     // if (this.pendingTableData[selected_order_index].selected){
            //     //     this.pendingTableData[selected_order_index].selected = false;
            //     // } else {
            //     //     this.pendingTableData[selected_order_index].selected = true;
            //     // }
            //     this.pendingTableData[selected_order_index].selected = !this.pendingTableData[selected_order_index].selected;
            //     // console.log("After true or false: ", this.pendingTableData[selected_order_index].selected);
            //     // if (this.pendingTableData[selected_order_index].selected) {
            //     //     console.log("In if");
            //     //     this.completedOrder += 1;
            //     // } else {
            //     //     console.log("In else");
            //     //     this.completedOrder -= 1;
            //     // }
            //     // console.log("After: ", this.completedOrder);
            // },


            submitCompletedOrders: function(){
                this.$dispatch('update-pending-orders')
                // console.log();

                // console.log("this.$options.data().pendingTableData",this.pendingTableData.filter(el=>el.selected == "Completed"));
                // this.$data = this.pendingTableData.filter(el=>el.selected == "Completed");
                // this.$dispatch('update-pending-orders');
                // console.log("submitCompletedOrders");
                // this.updateShippingTable();
                // console.log(this.$store);

                // let scope = {
                //     completedTableData: this.completedTableData,
                //     pendingTableData: this.pendingTableData
                // }; // reserve these two table data for 'forEach' scope usage

                // let completedOrder = [];
                // let selected_order_ids= [];

                // scope.pendingTableData.forEach(function(row_data) {
                //     if (row_data.selected) {
                //         selected_order_ids.push(row_data.id);
                //         completedOrder.push(row_data);
                //     }
                // });
                // this.completedTableData = this.completedTableData.concat(completedOrder);

                // if (selected_order_ids.length > 0) {
                //     this.pendingTableData = this.pendingTableData.filter(function(ele) {
                //         return selected_order_ids.indexOf(ele.id) == -1;
                //     });
                // }

                // if (selected_order_ids.length > 0) {
                //     console.log("completedTableData: ", this.completedTableData);
                // }
            }
        },

        // computed: {

        //     completedOrder: function () {
        //         let count = this.pendingTableData.filter(el=>el.selected).length;
        //         console.log("count: ", count);
        //         return count;
        //     }

        // },

        data() {

            return {
                completedOrder: 0,
                selected: window.selected,
                pending_table_columns: ['Select', 'client_practice_name', 'client_id', 'time', 'req', 'shipping_method', 'comments'],
                completed_table_columns: ['client_practice_name', 'client_id', 'time', 'req', 'shipping_method', 'processed_time', 'processed_by', 'comments'],
                pending_table_options: {



                    onRowClick: function(row) {
                        // console.log(row.id);
                        that.updatePending(row.id);
                        // console.log(row.selected);
                        // console.log(that.completedOrder);
                        if (row.selected == "Completed") {
                            that.completedOrder += 1;
                        } else if (row.selected == "Pending") {
                            that.completedOrder -= 1;
                        }
                        // row.selected = !row.selected;
                        // console.log(this.skin);
                        // console.log(row.selected);

                        // // console.log("this: ", $parent);
                        // console.log("row: ", row);
                        // console.log("current that: ", that.pendingTableData);
                        // console.log("that.css: ", that.class)

                    },
                    headings: {
                        client_practice_name: 'Client Name',
                        client_id: 'Client ID',
                    },
                    filterable: ['client_practice_name', 'client_id'],
                    templates: {
                        Select: function(row){
                            // console.log(row.selected)
                            if (row.selected == "Completed") {
                                // console.log("haha");
                                return `<button type="button" class="btn btn-danger">Submit</button>`
                                // return `<input type="checkbox" class="btn btn-default" style="width: 30px; height: 30px;" :checked="{selected}"></input>`
                            }else {
                                return `<button type="button" class="btn btn-default">Submit</button>`
                            }
                            // return `<input type="checkbox" class="btn btn-default" style="width: 30px; height: 30px;" :checked="{selected}"></input>`
                        }
                        // $parent.$parent.$parent.selectMe({id})
                        // @click="$parent.$parent.$parent.selectMe({id})"
                        
                        // `<div v-if="$parent.$parent.$parent.tableData.find(function(el){return el.id=='3'}).selected">Now you see me</div>
                        // <div v-else>Now you don't</div>`
                        // `<input type="checkbox" @click="$parent.$parent.$parent.selectMe({id})" autocomplete="off">`
                        // "<a href='javascript:void(0);' @click='$parent.$parent.$parent.deleteMe({id})'><i class='glyphicon glyphicon-erase'></i></a>"
                    },
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
