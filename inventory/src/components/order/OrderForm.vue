<style>



</style>

<template>

<div class="container">

    <form class="form-horizontal">
        <div class="form-group">
            <legend>
                Tube sets
            </legend>
            <div class="row">
                <div class="col-lg-3">
                    <div class="input-group">
                        <input type="number" class="form-control" v-model="SST" /> <span class="input-group-addon">SST Only </span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <input type="number" class="form-control" v-model="SSTandEDTA" /> <span class="input-group-addon">SST and EDTA</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <input type="number" class="form-control" v-model="Standard" /> <span class="input-group-addon">Standard</span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="input-group">
                        <input type="number" class="form-control" v-model="All" />
                        <span class="input-group-addon">All</span>
                        <div class="input-group-addon">
                            <input type="checkbox" v-model="HA"/> <span>HA?</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="form-group">
            <legend>
                Box sets
            </legend>
            <div class="row">
                <div class="col-lg-4">
                    <div class="input-group">
                        <input type="number" class="form-control" v-model="Box" /> <span class="input-group-addon">Regular cooler </span>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="input-group">
                        <input type="number" class="form-control" v-model="Largebox" /> <span class="input-group-addon">Large cooler</span>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="input-group">
                        <input type="number" class="form-control" v-model="PatientKit" :disabled="!client" /> <span class="input-group-addon">Patient kit</span>
                    </div>
                </div>
            </div>

        </div>
        <div class="form-group">
            <legend>
                Requisition form
            </legend>
            <div class="col-lg-4 col-lg-offset-4">
                <div class="input-group">
                    <input type="number" class="form-control" v-model="Req" /> <span class="input-group-addon">Requisition forms </span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <legend>
                Comments
            </legend>
            <textarea class="form-control" rows="3" placeholder="Inlcuding any special shipping instructions and phlebotomy supplies" v-model="Comments"></textarea>
        </div>
        <div class="form-group">
            <legend>
                Shipping Method
            </legend>
            <v-select :value.sync="shippingMethod" :options="fruitOptions" :close-on-select="true"></v-select>
        </div>

        <button class="btn btn-success" @click="showModal = !showModal" :disabled="disablePlaceOrder">
            Place Order</button>

    </form>
    <alert :show.sync="showRight" :duration="3000" type="success" width="400px" placement="top-right" dismissable>
        <span class="icon-ok-circled alert-icon-float-left"></span>
        <strong>Success!</strong>
        <p>
            You succesfully placed the order for Client {{ clientID }}.
        </p>
    </alert>
    <alert :show.sync="showRightFail" :duration="3000" type="danger" width="400px" placement="top-right" dismissable>
        <span class="icon-ok-circled alert-icon-float-left"></span>
        <strong>Failed!</strong>
        <p>
            Please try it again, if the problem persists ask for assistant.
        </p>
    </alert>
    <modal :show.sync="showModal" :callback="order">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">Please Confirm the Order</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <div>
              <div v-if="client">
                <b>Patient Name:</b> {{patientName}}
                <br />
                <b>Patient Address:</b> {{ patientAddress }}
              </div>
              <div v-else>

                <b>Clinet ID:</b> {{ clientID }}
              </div>
                <br /> Shipping Method: {{ shippingMethod }}
                <div v-if="SST">
                    SST: {{SST}}
                </div>
                <div v-if="SSTandEDTA">
                    SST and EDTA: {{ SSTandEDTA }}
                </div>
                <div v-if="Standard">
                    Standard: {{Standard}}
                </div>
                <div v-if="All">
                    All: {{All}}
                </div>
                <div v-if="Box">
                    Regular Box: {{ Box }}
                </div>
                <div v-if="Largebox">
                    Large Box: {{ Largebox}}
                </div>
                <div v-if="PatientKit">
                    Patient Kits: {{ PatientKit }}
                </div>
                <div v-if="Req">
                    Requisition: {{ Req }}
                </div>
                <div v-if="Comments">
                    Comments: {{ Comments }}
                </div>
            </div>
        </div>
    </modal>
</div>

</template>

<script>

import {
    alert as Alert, modal as Modal, select as VSelect
}
from 'vue-strap'
import {
    updateClient, placeOrder
}
from '../../vuex/actions'

export default {
    props: {
        client: Number,
        patientName: String,
        patientAddress: String
    },
    components: {
        Alert,
        Modal,
        VSelect
    },
    vuex: {
        getters: {
            clientID: state => state.selectedClient
        },
        actions: {
            updateClient,
            placeOrder
        }
    },
    data() {
        return {
            showModal: false,
            showRight: false,
            showRightFail: false,
            SST: undefined,
            SSTandEDTA: undefined,
            Standard: undefined,
            All: undefined,
            Box: undefined,
            Largebox: undefined,
            PatientKit: undefined,
            Req: undefined,
            HA: false,
            Comments: '',
            fruitOptions: [{
                value: 'Ground',
                label: 'Ground'
            }, {
                value: '2day',
                label: '2-day'
            }, {
                value: 'overnight',
                label: 'Standard Overnight'
            }, {
                value: 'pr overnight',
                label: 'Priority Overnight'
            }],
            shippingMethod: []
        }
    },
    methods: {
        order() {
                this.$dispatch('order-confirmed');
            },
        parseOrder() {
                let sst, edta, urine, plasma, esr;
                sst = edta = urine = plasma = esr = 0;
                if (this.SST) {

                    sst = sst + this.SST * 1
                }
                if (this.SSTandEDTA) {
                    sst = sst + this.SSTandEDTA * 2;
                    edta = edta + this.SSTandEDTA * 1;
                }
                if (this.Standard) {
                    sst = sst + this.Standard * 2;
                    edta = edta + this.Standard * 1 ;
                    plasma = plasma + this.Standard* 1;
                }
                if (this.All) {
                    sst = sst + this.All * 2;
                    edta = edta + this.All * 1;
                    plasma = plasma + this.All * 1;
                    esr = esr + this.All * 1;
                    urine = urine + this.All * 1;
                }
                return {
                    ClientID: this.client? this.patientName: this.clientID,
                    Address: this.patientAddress,
                    SST: sst,
                    EDTA: edta,
                    Plasma: plasma,
                    urine: urine,
                    esr: esr,
                    Box: this.Box,
                    Largebox: this.Largebox,
                    Req: this.Req,
                    PatientKit: this.PatientKit,
                    ShippingMethod: this.shippingMethod[0],
                    Comments: this.Comments
                }
            }
    },
    computed: {
        disablePlaceOrder() {
            if (this.client == 0) {
                return !this.shippingMethod[0] || !this.clientID || !(this.SST || this.SSTandEDTA || this.Standard || this.All || this.Box || this.Largebox || this.Req)
            } else if (this.client == 1) {
                return !this.shippingMethod[0] || !(this.patientName && this.patientAddress) || !(this.SST || this.SSTandEDTA || this.Standard || this.All || this.Box || this.Largebox || this.PatientKit || this.Req)
            }
        }
    },
    events: {
        'order-confirmed': function() {
            this.placeOrder(this.parseOrder()).then((res) => {
                this.showModal = false;
                res ? this.showRight = true : this.showRightFail = true
            })

            this.$data = this.$options.data();
            this.$dispatch('order-submitted');
        }
    }
}

</script>
