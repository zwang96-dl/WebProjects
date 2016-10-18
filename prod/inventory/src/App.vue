<style>

    #app {
        color: #2c3e50;
        margin-top: 100px;
        text-align: center;
    }

</style>

<template>
    <div class="row">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li><a v-link="'/receive'">Receive</a></li>
                        <li><a v-link="'/order'">Place an Order</a></li>
                        <li><a v-link="'/shipingpending'">Shiping Pending</a></li>
                        <li><a v-link="'/status'">Client Inventory Status</a></li>
                    </ul>
                <form class="navbar-form navbar-right">
                    <div class="form-group active"><a href="/profile/" style="color:white;">Hi {{username}} !</a>&nbsp&nbsp&nbsp</div>
                    <button type="submit" class="btn btn-success" onlick="clearCookies()">Sign Out</button>
                </form>
            </div>
        </nav>

        <div class="container">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>

    import {userAuthentication} from './vuex/actions'

    export default {
        components: {},
        vuex: {
            getters: {
                username: state => state.username
            },
            actions: {
                userAuthentication
            }
        },
        created() {
            this.userAuthentication()
        },
    }

</script>
