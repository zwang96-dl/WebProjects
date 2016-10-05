<style>

html {
    height: 100%;
}


/*body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}*/

#app {
    color: #2c3e50;
    /*color: #337ab7;*/
    margin-top: 100px;
    /*max-width: 600px;*/
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
}

#app a {
    color: #42b983;
    /*color: #337ab7;*/
    text-decoration: none;
}

.logo {
    width: 100px;
    height: 100px
}

</style>

<template>

<div class="container">
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a v-link="'/receive'">Receive</a></li>
                    <li><a v-link="'/order'">Place an Order</a></li>
                    <li><a v-link="'/shipingpending'">Shiping Pending</a></li>
                    <li><a v-link="'/status'">Client Inventory Status</a></li>
                </ul>
<!--                 <form id="my_login_form" class="navbar-form navbar-right" enctype="application/json" action="" method=post>
                    <div class="form-group">
                        <input type="text" placeholder="User Name" name="user" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="Password" name="password" class="form-control" required>
                    </div>
                    <button id="login_btn" type="submit" class="btn btn-success">Sign in 111{{currentUser.userId}}</button>
                </form> -->
                <form class="navbar-form navbar-right" enctype="application/json" action="{{ url_for('logout') }}" >

                    <div class="form-group active"><a href="/profile/" style="color:white;">Hi {{current_user.id}} !</a>&nbsp&nbsp&nbsp</div>
                    <button type="submit" class="btn btn-success" onlick="clearCookies()">Sign Out</button>
                </form>
            </div>
        </div>
    </nav>
    <router-view></router-view>
    <hr />
    <footer>
        <p>
            &copy; Vibrant-America 2016
        </p>
    </footer>
</div>

</template>

<script>

export default {
    components: {},
    data: function(){
        return {
            currentUser: {
                userId: ""
            }
        }
    },
    delimiters: ['${', '}'],
    ready: function(){
    this.currentUser = {
        userId: "zhe"
        // userId: window.sessionStorage.getItem('userId'),
        // username: window.sessionStorage.getItem('user'),
        // scope: window.sessionStorage.getItem('scope')
    }
},
}

</script>
