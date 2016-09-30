import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    clientInvStatusTable: [],
    clientInfo: [],
    clientNames: [],
    physicianNames: [],
    selectedClient: undefined,
    clientShippingPendingTable: []
}

const mutations = {
    CLIENTSHIPPINGSTATUS (state, table) {
        console.log("1state: ", state);
        console.log("1table: ", table);
        state.clientShippingPendingTable = table;
    },
    CLIENTSTATUS (state, table) {
        console.log("state: ", state);
        console.log("table: ", table);
        state.clientInvStatusTable = table;
    },
    TYPEAHEADCLIENTINFO (state, names) {
        state.clientInfo = names;
        for (let value of names) {
            if (state.clientNames.indexOf(value.client_name) === -1) {
                state.clientNames.push(value.client_name);
            }
            if (state.physicianNames.indexOf(value.physician_name) === -1) {
                state.physicianNames.push(value.physician_name);
            }
        }

    },
    UPDATECLIENTID (state, clientID) {
        state.selectedClient = clientID;
    }
}

export default new Vuex.Store({
    state,
    mutations
})
