import Vue from 'vue'
// import client_pending_table from '../local_db/client_pending_table'
// import client_finish_table from '../local_db/client_finish_table'


export const userAuthentication = ({dispatch}) => {

  dispatch('AUTHENTICATION', 'zhe');


  // console.log("in actions , userAuthentication: ");
  // Vue.http.get("/auth-user/").then(
  //   (res) => {
  //     let username = res.data;
  //     console.log("who am i?", `'${username}'`, username.length);
  //     dispatch('AUTHENTICATION', username);
  //   },
  //   (err) => {
  //     console.log("this is a err1", err);
  //   }
  // );
}



export const clientInvStatus = ({dispatch}, client_id) => {
  console.log("frontend: here");
  console.log("client_id: ", client_id);
  Vue.http.get(`/client_inventory/${client_id}`).then(
    (res) => {
      let table = res.json();
      dispatch('CLIENTSTATUS', table);
    },
    (err) => {
      console.error(err);
    }
  );
};




export const updateShippingTable = ({ dispatch }, orders) => {
   let orders_json = JSON.stringify(orders);
    return Vue.http.post('/client-update-shipping-table/', orders_json).then(
        (res) => {return 'success'}
    ).catch((err) => {
        console.log(err);
    })
}



export const clientShippingPendingStatus = ({dispatch}) => {
  // console.log("hahahah");
  // dispatch("CLIENTSHIPPINGSTATUS", client_pending_table)
  Vue.http.get("/client-shipping-pending-table/").then(
    (res) => {
      let table = res.json();
      dispatch('CLIENTSHIPPINGPENDINGSTATUS', table);
    },
    (err) => {
      console.log("this is a err", err);
    }
  )
}

export const updatePending = ({dispatch}, id) => {
  dispatch('UPDATESHIPPINGPENDING', id);
}

export const cancelCompleted = ({dispatch}, id) => {
  dispatch('CANCELCOMPLETED', id);
}


export const clientShippingFinishStatus = ({dispatch}) => {
  // console.log("hehehehehe");
  // dispatch("CLIENTSHIPPINGFINISHSTATUS", client_finish_table)
  Vue.http.get("/client-shipping-finish-table/").then(
    (res) => {
      let table = res.json();
      dispatch('CLIENTSHIPPINGFINISHSTATUS', table);
    },
    (err) => {
      console.log("this is a err", err);
    }
  )
}


export const typeaheadClientInfo = ({dispatch}) => {
  Vue.http.get('/client_info_typeahead').then(
    (res) => {
      let names = res.json();
      dispatch('TYPEAHEADCLIENTINFO', names)
    },
    (err) => {
      console.error(err);
    }
  );
}


export const searchClient = ({dispatch}, client_id) => {
  return Vue.http.get(`/client_inventory/${client_id}`).then(
    (res) => {
      // console.log("haha res is: ", res);
      return res.json();
    },
    (err) => {
      console.log(err);
    }
  )
}

export const updateClient = ({
    dispatch
}, clientID) => {
    dispatch('UPDATECLIENTID', clientID)
}

export const placeOrder = ({ dispatch }, order) => {
    return Vue.http.post('/client_order/', order).then(
        (res) => {return 'success'}
    ).catch((err) => {
        console.log(err);
    })
}
