<style>
</style>

<template>
    <div class="container">
        <h2>Client Inventory Status</h2>
        <div class="alphabet-filter">
            <p>Client Name Filter:</p>
            <div>
                <button class="btn btn-default" :class="{active:letter==selectedLetter}" v-for="letter in numbers" @click="alphabetFilter(letter)">{{letter}}</button>
            </div>
            <div>
                <button class="btn btn-default" :class="{active:letter==selectedLetter}" v-for="letter in letters" @click="alphabetFilter(letter)">{{letter}}
                </button>
            </div>
        </div>
        <v-client-table :data=tableData :columns="columns" :options="options"></v-client-table>
        <button class="btn btn-default" @click="clientInvStatus">refresh</button>
    </div>
</template>

<script>

    import {alert} from 'vue-strap';
    import vClientTable from 'vue-tables';
    import moment from 'moment'
    import {clientInvStatus} from '../vuex/actions'

    export default {
        components: {
            alert,
            vClientTable
        },
        vuex: {
            getters: {
                tableData: state => state.clientInvStatusTable
            },
            actions: {
                clientInvStatus
            }
        },
        methods: {
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
                columns: [
                    'client_name',
                    'client_id',
                    'EDTA',
                    'SST',
                    'ESR',
                    'Plasma',
                    'Urine',
                    'regular_box',
                    'big_box',
                    'req'
                ],
                options: {
                    headings: {
                        client_name: 'Client Name',
                        client_id: 'Client ID',
                    },
                // templates: {
                //     // edit: "<a href='#!/{id}/edit'><i class='glyphicon glyphicon-edit'></i></a>",
                //     delete: "<a href='javascript:void(0);' @click='$parent.deleteMe({id})'><i class='glyphicon glyphicon-erase'></i></a>"
                // },
                    filterable: ['client_name', 'client_id'],
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
            numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            selectedLetter: ''
        }
    }
}

</script>
