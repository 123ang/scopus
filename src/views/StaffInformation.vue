<template>
  <div class="home">
    <div>
      Name: {{ name }}
      
    </div>
    <div>
      Staff ID: {{ staff_id }}
    
    </div>

    <div>
      School: {{ school }}
    </div>
    <div>
      Email: {{ email }}
    </div>
    <div>
      Phone: {{ phone }}
    </div>
    <div>
        Scopus ID: {{ scopus_id }}
    </div>
    <div>
        Number of Articles Produced: {{ documents }}
    </div>
    <div>
        Citations: {{ citations }}
    </div>
    <div>
        Cited By: {{ cited_by }}
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
