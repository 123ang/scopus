<template>
<div>
    <div style="text-align:center">
        <h2>User List for Cendiakawan</h2>
    </div>
    <div v-if="datas != null">

        <v-simple-table>
            <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Name</th>
                    <th class="text-left" v-if="UserGroup == 'developer'">Password</th>
                    <th class="text-left" v-if="UserGroup == 'developer'">User Group</th>
                    <th>Action </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td><input type='email' v-model='email'></td>
                    <td><input type='text' v-model='name'></td>
                    <td v-if="UserGroup == 'developer'"><input type='text' v-model='password'></td>
                    <td v-if="UserGroup == 'developer'">
                        <select v-model='user_group'>
                            <option value="" disabled>
                                Please Select One
                            </option>
                            <option value="developer">
                                Developer
                            </option>
                            <option value="admin">
                                Admin
                            </option>
                            <option value="normal_user">
                                Normal User
                            </option>
                        </select>
                    </td>
                    <td>
                        <v-btn depressed color="green" dark @click="addUser">Add User</v-btn>
                    </td>

                </tr>
                <tr v-for="(data, index) in datas" :key="index">
                    <td>{{ data.ID }}</td>
                    <td><input type='email' v-model='data.email'></td>
                    <td><input type='text' v-model='data.name'></td>
                    <td v-if="UserGroup == 'developer'"><input type='text' v-model='data.password'></td>
                    <td v-if="UserGroup == 'developer'">
                        <select v-model='data.user_group'>
                            
                            <option value="developer">
                                Developer
                            </option>
                            <option value="admin">
                                Admin
                            </option>
                            <option value="normal_user">
                                Normal User
                            </option>
                        </select>
                    </td>
                    <td>
                        <v-btn depressed color="blue" dark @click="editUser(index,data.ID)">Update </v-btn>
                        <v-btn depressed color="red" dark @click="deleteUser(data.ID)">Delete </v-btn>
                    </td>
                </tr>

            </tbody>

        </v-simple-table>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import store from '../store'
export default {
    name: "UserList",
    components: {

    },
    data() {

        return {
            datas: [],
            show: false,
            email: "",
            name: "",
            password: "",
            url:"",
            user_group:"normal_user"
        };
    },
    methods: {
        addUser() {
             if(this.password == "") {
                this.password = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*())_+~[]<>/?,.").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
            }
            if (this.email != '' && this.password != '') {
                axios.post(this.url, {
                        request: 2,
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        user_group: this.user_group,
                        username: this.Username

                    })
                    .then(response => {
                        this.name = '';
                        this.email = '';
                        this.password = '';
                        this.user_group = 'normal_user'
                        this.show_user();
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                alert('Fill all fields.');
            }

        },
        editUser(index, id) {
            // update meetings in firestores
            var email = this.datas[index].email;
            var name = this.datas[index].name;
            var password = this.datas[index].password;
            var user_group = this.datas[index].user_group;

            axios.post(this.url, {
                    request: 3,
                    id: id,
                    name: name,
                    email: email,
                    password: password,
                    user_group: user_group,
                    username: this.Username
                })
                .then(response => {
                    console.log(response.data);
                    this.show_user();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        show_user() {
            axios.post(this.url, {
                    request: 1,
                })
                .then(response => {
                   // console.log(response.data)
                    this.datas = response.data;

                })
                .catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log("error response :" + error.response)
                    console.log("error status :" + error.status)
                });
        },
        deleteUser(id) {

            axios.post(this.url, {
                    request: 4,
                    id: id

                })
                .then(response => {
                    alert(response.data);
                    this.show_user();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        update_usergroup(){
            axios.post(this.url, {
                    request: 0,
                    username: this.Username

                })
                .then(response => {
                   
                   store.commit("UserGroup",response.data[0].user_group)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    created() {
     
 
        this.url = this.HostUrl + this.ScriptUrl + "userlist.php"
        this.update_usergroup()
        console.log(this.url)
        this.show_user()

    },

    computed: {
       
        HostUrl() {
            return this.$store.state.host_url;
        },
        ScriptUrl() {
            return this.$store.state.script_url;
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
select {
    display: grid;
}
</style>
