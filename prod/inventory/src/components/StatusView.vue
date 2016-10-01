<style>



</style>

<template>

<div id="people" class="container">
    <h2>Client Inventory Status</h2>
    <div class="alphabet-filter">
        <p>Client Name Filter:</p>
        <button class="btn btn-default" :class="{active:letter==selectedLetter}" v-for="letter in letters" @click="alphabetFilter(letter)">{{letter}}</button>
    </div>
    <v-client-table :data=tableData :columns="columns" :options="options"></v-client-table>
    <button class="btn btn-default" @click="clientInvStatus">refresh</button>
</div>

</template>

<script>

import {
    alert
}
from 'vue-strap'
import vClientTable from 'vue-tables'
import moment from 'moment'
import {
    clientInvStatus
}
from '../vuex/actions'

function randomOption() {
    return Math.floor(Math.random() * 5);
}

function randomDate(start, end) {
    return moment(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
export default {
    components: {
        alert,
        vClientTable
    },
    vuex: {
        getters: {
            // tableData: state => state.clientInvStatusTable
        },
        actions: {
            clientInvStatus
        }
    },
    methods: {
        deleteMe: function(id) {
            console.log("Delete " + id);
        },
        alphabetFilter: function(letter) {
            if (letter == this.selectedLetter) {
                this.selectedLetter = '';
                this.$broadcast('vue-tables.filter::alphabet', '')
            } else {
                this.selectedLetter = letter;
                this.$broadcast('vue-tables.filter::alphabet', letter);
            }
        },
    },
    created() {
        this.clientInvStatus('all')
    },
    data() {
        return {
            columns: ['client_name', 'client_id', 'EDTA', 'SST', 'ESR', 'Plasma', 'Urine', 'regular_box', 'big_box', 'req'],
            options: {
                // dateColumns: ['birth_date'],
                headings: {
                    client_name: 'Client Name',
                    client_id: 'Client ID',
                    // age: 'Age',
                    // edit: 'Edit',
                    // delete: 'Delete'
                },
                templates: {
                    // edit: "<a href='#!/{id}/edit'><i class='glyphicon glyphicon-edit'></i></a>",
                    delete: "<a href='javascript:void(0);' @click='$parent.deleteMe({id})'><i class='glyphicon glyphicon-erase'></i></a>"
                },
                filterable: ['client_name', 'client_id'],
                listColumns: {
                    // pet: [{
                    //     value: '0',
                    //     text: 'Guinea Pig'
                    // }, {
                    //     value: '1',
                    //     text: 'Dog'
                    // }, {
                    //     value: '2',
                    //     text: 'Cat'
                    // }, {
                    //     value: '3',
                    //     text: 'Goldfish'
                    // }, {
                    //     value: '4',
                    //     text: 'Hamster'
                    // }]
                },
                customFilters: [{
                        name: 'alphabet',
                        callback: function(row, query) {
                            return row.client_name[0] == query;
                        }
                    }]
                    //  orderBy: {
                    //        column:'age',
                    //        ascending:false
                    //    }
            },
            letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            selectedLetter: '',
            tableData: [{
                id: "1",
                name: "Sidney Brakus",
                pet: randomOption(),
            
                birth_date: randomDate(new Date(1925, 0, 1), new Date(2012, 0, 1))
            
            }, {
                id: "2",
                name: "Jovan Koepp",
                pet: randomOption(),
            
                birth_date: randomDate(new Date(1925, 0, 1), new Date(2012, 0, 1))
            
            }, {
                id: "3",
                name: "Shanie McCullough PhD",
                pet: randomOption(),
            
                birth_date: randomDate(new Date(1925, 0, 1), new Date(2012, 0, 1))
            
            }]
        }
    }
}

</script>
