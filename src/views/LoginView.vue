<template>
<div>
    <div>
        <div>
            <label>Username</label>
            <input type="text" id="username" v-model="username" placeholder="Username">
        </div>       
        <div>
            <label style="font-weight:bold" for="password">Password:</label>            
            <input type="password" id="password" v-model="password" v-on:keyup.enter="login(username,password)" placeholder="Password">
        </div>   
        <div>
            <v-checkbox  label="Remember me" v-model="remember"></v-checkbox>   
        </div>                               
    </div>
    <div>
        <div>
            <p v-if="feedback" class="red-text">{{ feedback }}</p>

            <button @click="login(username,password)" type="submit">
                <span style="font-size:smaller;">Sign In </span>         
            </button>

            <button @click="forget">
                <span style="font-size:smaller;"> Forget Password </span>          
            </button>
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
                    password: password
                }
                )
                .then(response => {
                    this.result = response.data;
                    if(this.result[0].login_status == "success") {
                        store.commit("IsLogin", true);
                        store.commit("Username", username);
                        store.commit("UserID", this.result[0].ID);
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
                        this.$router.push("/");
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
        }
    }
};
</script>
<style>

</style>
