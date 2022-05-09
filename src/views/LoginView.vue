<template>
<div class="login-bg">
    <div class="overlay"></div>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="login-body-card text-center">
                    <h2><b>Login</b></h2>
                    <div>
                        <input type="text" id="username" v-model="username" placeholder="Username">
                    </div>       
                    <div class="position-relative remember-me">          
                        <input type="password" id="password" v-model="password" v-on:keyup.enter="login(username,password)" placeholder="Password">
                        <v-checkbox label="Remember me" v-model="remember"></v-checkbox>   
                    </div>           
                    <div class="remember-me-spacing"></div>
                    <div>
                        <p v-if="feedback" class="red-text">{{ feedback }}</p>

                        <button class="btn btn-custom-primary" @click="login(username,password)" type="submit">
                            <b>Login</b>
                        </button>
                        <hr class="my-4">
                        <a href="#" @click="forget" style="text-decoration: none;">
                            <span>Forget Password</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import store from "../store";
import axios from 'axios';

export default {
    components: {
       
    },
    data() {
        return {
            username: "",
            password: "",
            feedback: "",
            result: '',
            remember: false,
            url: ''
        };
    },
    methods: {

        login: function (username, password) {
            this.show = true;
            
            this.feedback = ''
            axios.post(this.url, 
                {
                    username: username,
                    password: password,
                }
                )
                .then(response => {
                    this.result = response.data;
                    console.log(response.data)
                    
                    if(this.result[0].login_status == "success") {
                        store.commit("IsLogin", true);
                        store.commit("Username", username);
                        store.commit("UserGroup", this.result[0].user_group);
                        if(this.remember == true) {
                            store.commit("RememberUsername", username)
                            store.commit("RememberPassword", password)
                            store.commit("RememberBoolean", true)
                        }
                        else {
                            store.commit("RememberUsername", '')
                            store.commit("RememberPassword", '')
                            store.commit("RememberBoolean", false)
                        }
                        this.$router.push("/dashboard");
                    }
                    else {
                        this.feedback = this.result
                    }
                    this.show = false
                    
                })
                
                .catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log("error response :" + error.response)
                    console.log("error status :" + error.status)
                });
           

        },
        forget() {
            this.$router.push("/forget-password");
        }

    },
    created() {
        store.commit("HostUrl","https://analysisbursa.com/")
        store.commit("ScriptUrl","php_script/scopus/scopus/")
        this.url = this.HostUrl + this.ScriptUrl + "login.php"
        this.remember = this.RememberBoolean
        if(this.remember){
            this.username = this.RememberUsername
            this.password = this.RememberPassword
        }
       

    },

    computed: {
        HostUrl() {
            return this.$store.state.host_url;
        },
        ScriptUrl() {
            return this.$store.state.script_url;
        },
        RememberBoolean(){
            return this.$store.state.remember_boolean;
        },
        RememberUsername(){
            return this.$store.state.remember_username;
        },
        RememberPassword(){
            return this.$store.state.remember_password;
        }, 
        Username(){
            return this.$store.state.username;
        },
        UserGroup(){
            return this.$store.state.user_group;
        }
    }
};
</script>
<style>
.login-bg{
    position: relative;
    background-color: var(--uum-grey);   
    background: url(../assets/login-bg.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh !important;
    width: 100%;
}
.login-bg .overlay{
    background-color: var(--uum-blue);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: .35;
}
.login-body-card{
    position: absolute;
    background-color: rgba(255,255,255,.85);
    padding: 25px 50px;
    border-radius: 4px;
    z-index: 100;
    width: 75%;
    max-width: 750px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 3px 3px 10px 3px rgba(0,0,0,.15);
}
.login-body-card input{
    border: 1px solid rgba(0,0,0,.15) !important;
    padding: 0px 10px !important;
    border-radius: 4px !important;
    max-width: 500px;
    margin-top: 10px !important;
}
.login-body-card input::placeholder{
    color: rgba(0,0,0,.5);
}
.remember-me .v-input--checkbox{
    position: absolute;
    top: 55px;
    left: 10%;
}
.remember-me-spacing{
    margin: 50px 0;
}
</style>
