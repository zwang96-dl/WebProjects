<style>

div[role=alert] {
    margin-top: 50px;
}

footer {
    text-align: left;
}

#warningMessage {
    color: red
}

</style>

<template>

<div class="container">
  <tabs :active.sync="active">
    <tab header="Client">

      <form class="form-horizontal" @submit="search">
        <div class="form-group">
            <label for="inputClientID" class="col-sm-2 control-label">Client ID</label>
            <div class="col-sm-3">
                <input type="text" class="form-control" id="inputClientID" placeholder="1234" v-model="clientID" />
            </div>
        </div>
        <strong>-- OR --</strong>
        <br />
        <br />
        <div class="form-group">
            <label for="inputPhysicianName" class="col-sm-2 control-label">Physician Name</label>
            <div class="col-sm-3">
                <typeahead :data="physicianNames" placeholder="Physician Name" v-ref:physicianname>
                </typeahead>
            </div>
            <label for="inputClientName" class="col-sm-2 control-label">Client Name</label>

            <div class="col-sm-3">

                <typeahead :data="clientNames" placeholder="Client Practice Name" v-ref:clientname>
                </typeahead>
            </div>
        </div>
        <div class="form-group" id="warningMessage">
            <strong>{{ warningMessage }}</strong>

        </div>

        <div class="form-group row">
            <button type="submit" class="btn btn-primary">Search</button>
        </div>
        <template v-if="clientID">
            <h3>Client Inventory Status</h3>
            <v-client-table :data=searchResult :columns="columns" :options="options"></v-client-table>

        </template>

    </form>
    </tab>
    <tab header="Patient">
      <form class="form-horizontal">
        <div class="form-group">
            <label for="inputPatientName" class="col-sm-2 control-label">Patient Name</label>
            <div class="col-sm-3">
                <input type="text" class="form-control" id="inputPatientName" placeholder="" v-model="PatientName" />
            </div>
        </div>

        <div class="form-group">
            <label for="inputPatientAddress" class="col-sm-2 control-label">Shipping Address</label>
            <div class="col-sm-6">
              <input type="text" class="form-control" id="inputPatientAddress" placeholder="" v-model="PatientAddress" />

            </div>
        </div>

    </form>
    </tab>
  </tabs>

    <order-form :client="active" :patient-name="PatientName" :patient-address="PatientAddress"></order-form>

</div>

</template>

<script>

import {
    alert as Alert,
    typeahead as Typeahead,
    tabset as Tabs,
    tab as Tab
}
from 'vue-strap'
import {
    typeaheadClientInfo,
    searchClient,
    updateClient
}
from '../../vuex/actions'

import vClientTable from 'vue-tables'
import orderForm from './OrderForm.vue'

export default {
    components: {
        Alert,
        Typeahead,
        vClientTable,
        orderForm,
        Tabs,
        Tab
    },
    vuex: {
        getters: {
            clientNames: state => state.clientNames,
            physicianNames: state => state.physicianNames,
            clientInfo: state => state.clientInfo
        },
        actions: {
            typeaheadClientInfo,
            searchClient,
            updateClient
        }
    },
    created() {
        this.typeaheadClientInfo();
    },
    data: function() {
        return {
            PatientName: "",
            PatientAddress: "",
            active: 0,
            showRight: false,
            showRightFail: false,
            searchResult: [],
            clientID: '',
            physicianName: '',
            clientName: '',
            warningMessage: '',
            columns: ['client_name', 'client_id', 'EDTA', 'SST', 'ESR', 'Plasma', 'Urine', 'regular_box', 'big_box', 'req'],
            options: {
                // dateColumns: ['birth_date'],
                headings: {
                    client_name: 'Client Name',
                    client_id: 'Client ID',
                },
                templates: {
                    // edit: "<a href='#!/{id}/edit'><i class='glyphicon glyphicon-edit'></i></a>",
                    // delete: "<a href='javascript:void(0);' @click='$parent.deleteMe({id})'><i class='glyphicon glyphicon-erase'></i></a>"
                },
                filterable: []
            }
        }
    },
    methods: {
        search() {
            if (this.clientID) {
                this.searchClient(this.clientID).then((res) => {
                    this.searchResult = res ? [res] : [];
                });
                let searchClient = this.clientInfo.find(x => x.client_id == this.clientID);
                if (searchClient) {
                    this.$refs.clientname.query = searchClient.client_name;
                    this.$refs.physicianname.query = searchClient.physician_name;
                    this.warningMessage = '';
                    this.updateClient(this.clientID);
                } else {
                    this.warningMessage = 'No Such Client ID';
                    this.$refs.clientname.query = '';
                    this.$refs.physicianname.query = '';
                    this.updateClient(undefined);
                }
            } else {
                this.clientName = this.$refs.clientname.query;
                this.physicianName = this.$refs.physicianname.query;
                if (this.clientName && this.physicianName) {
                    let searchClient = this.clientInfo.find(x => x.client_name === this.clientName && x.physician_name === this.physicianName)
                    if (searchClient) {
                        this.clientID = searchClient.client_id;
                        this.warningMessage = '';
                        this.updateClient(this.clientID);
                    } else {
                        this.clientID = undefined;
                        this.warningMessage = 'No client found from names you provided';
                        this.updateClient(undefined);
                    }
                } else {
                    this.warningMessage = 'Please Provide Both Client name and Physician name';
                    this.updateClient(undefined);
                }
            }
        }
    },
    events: {
      'order-submitted': function () {
        this.$data = this.$options.data();
        this.$refs.clientname.query = '';
        this.$refs.physicianname.query = '';
      }
    }
}

</script>
