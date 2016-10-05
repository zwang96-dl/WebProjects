import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    clientInvStatusTable: [],
    clientInfo: [],
    clientNames: [],
    physicianNames: [],
    selectedClient: undefined,
    clientShippingPendingTable: [],
    clientShippingFinishTable: []
}

const mutations = {
    UPDATESHIPPINGPENDING (state, id) {
        // console.log(id);
        let obj = state.clientShippingPendingTable.find(function(i){
            return i.id == id;
        });
        // console.log(state.clientShippingPendingTable);
        obj.selected = (obj.selected == "Pending") ? "Completed": "Pending";
        // obj.selected = !obj.selected;
    },
    CLIENTSHIPPINGPENDINGSTATUS (state, table) {
        // console.log("1state: ", state);
        // console.log("1table: ", table);
        state.clientShippingPendingTable = table;
    },
    CLIENTSHIPPINGFINISHSTATUS (state, table) {
        // console.log("1state: ", state);
        // console.log("1table: ", table);
        state.clientShippingFinishTable = table;
    },
    CLIENTSTATUS (state, table) {
        // console.log("state: ", state);
        // console.log("table: ", table);
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
