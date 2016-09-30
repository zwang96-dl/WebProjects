import Vue from 'vue'

export const clientInvStatus = ({dispatch}, client_id) => {
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

export const clientShippingStatus = ({dispatch}) => {
  Vue.http.get("/client-shipping-pending-table/").then(
    (res) => {
      let table = res.json();
      dispatch('CLIENTSHIPPINGSTATUS', table);
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
      console.log("haha res is: ", res);
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
