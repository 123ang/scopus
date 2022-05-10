<template>
  <div class="home">
      <div class="dashboard-bg"><div class="overlay"></div></div>
      <div class="container mt-5">
          <div class="row">
              <div class="col-12">
                  <div class="body-card">
                    <div class="row m-0">

                        <div class="col-12 col-md-4">
                            <div class="profile-picture mx-auto">
                                <div class="img-border">
                                    <img src="../assets/profile/default.png" alt="profile picture" draggable="false">
                                </div>
                            </div>                                
                        </div>    
                        <div class="col-12 col-md-8 p-4 staff-info">
                            <h4><b>{{ name }}</b></h4>
                            <hr>
                            <p><b>Staff ID: </b>{{ staff_id }}</p>
                            <p><b>School :</b>{{ school }}</p>
                            <p><b>Email :</b>{{ email }}</p>
                            <p><b>Phone :</b>{{ phone }}</p>
                            <p><b>Scopus ID :</b>{{ scopus_id }}</p>
                            <p><b>Number of Articles Produced :</b>{{ documents }}</p>
                            <p><b>Citations :</b>{{ citations }}</p>
                            <p><b>Cited By :</b>{{ cited_by }}</p>
                        </div>

                    </div>
                  </div>                  
              </div>
          </div>

      </div>
    
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store'

export default {
    name: 'StaffInformation',
    components: {

    },
    data() {
        return {
            url: "",
            name: "",
            staff_id: "",
            school: "",
            email: "",
            phone: "",
            documents: "",
            citations: "",
            cited_by: "",
            h_index: "",
            scopus_id: ""
        }
   
    },
    methods: {
        get_staff_info(){
            axios.post(this.url,{
                staff_id: this.StaffID,
               
            })
                .then(response => {
                    console.log(response.data)
                    this.name = response.data['name']
                    this.staff_id = response.data['staff_id']
                    this.school = response.data['school']
                    this.email = response.data['email']
                    this.phone = response.data['phone']
                    this.documents = response.data['documents']
                    this.citations = response.data['citations']
                    this.cited_by = response.data['cited_by']
                    this.h_index = response.data['h_index']
                    this.scopus_id = response.data['scopus_id']
                    
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
      

 
    created() {
        store.commit("StaffID",this.$route.params.staff_id)
        this.url = this.HostUrl + this.ScriptUrl + "get_staff_info.php"
        this.get_staff_info()
    },
    computed: {
        HostUrl() {
            return this.$store.state.host_url;
        },
        ScriptUrl() {
            return this.$store.state.script_url;
        },
        StaffID(){
            return this.$store.state.staff_id;
        }
    },
    mounted(){
        
    }

}

</script>
<style>
    .profile-picture{
        height: 350px;
        width: 275px;
        border: 1px solid rgba(0,0,0,.25);
        border-radius: 4px;
        padding: 7px;
        overflow: hidden;
    }
    .profile-picture .img-border{
        position: relative;
        height: 100%;
        width: auto;   
        z-index: 1;
        background-color: grey !important;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .profile-picture .img-border img{
        max-height: 350px;        
        max-width: 275px;
    }
    .staff-info p{
        margin: 10px 0;
    }
    .staff-info p b{
        margin: 0 10px 0 0;
    }
</style>
