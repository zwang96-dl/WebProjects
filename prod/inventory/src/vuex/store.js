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
    clientShippingFinishTable: [],
    username: null
}

const mutations = {

     AUTHENTICATION (state, username) {
        state.username = username;
     },

    UPDATESHIPPINGPENDING (state, id) {
        let obj = state.clientShippingPendingTable.find(function(i){
            return i.id == id;
        });
        obj.selected = (obj.selected == "Pending") ? "Completed": "Pending";
    },

    CANCELCOMPLETED (state, id) {
        let obj = state.clientShippingFinishTable.find(function(i){
            return i.id == id;
        });
        obj.cancel = (obj.cancel == "Cancel") ? "Cancel": "";
        if (obj.cancel == "") {
            obj.cancel = "Cancel";
        } else if (obj.cancel == "Cancel") {
            obj.cancel = "";
        } else {
            return null;
        }
    },

    CLIENTSHIPPINGPENDINGSTATUS (state, table) {
        state.clientShippingPendingTable = table;
    },
    CLIENTSHIPPINGFINISHSTATUS (state, table) {
        state.clientShippingFinishTable = table;
    },
    CLIENTSTATUS (state, table) {
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
