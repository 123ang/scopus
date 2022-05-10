<template>
  <div class="home">
    <div class="dashboard-bg"><div class="overlay"></div></div>
    <div class="container mt-5">
      <div class="row">

        <div class="col-12 col-md-6 col-xl-4">
          <div class="body-card">
            <h5><b>Total Researchers: {{ total_researchers }}</b></h5>
            <hr class="my-4">
            <apexchart type="bar" height="200px" :options="options" :series="series"></apexchart>
          </div>
        </div>

        <div class="col-12 col-md-6 col-xl-4">
          <div class="body-card">
            <h5><b>Total Documents: {{ total_documents }}</b></h5>
            <hr class="my-4">
            <apexchart type="bar" height="200px" :options="options" :series="series"></apexchart>
          </div>
        </div>

        <div class="col-12 col-md-6 col-xl-4">
          <div class="body-card">
            <h5><b>Average Documents: {{ average_documents }}</b></h5>
            <hr class="my-4">
            <apexchart type="bar" height="200px" :options="options" :series="series"></apexchart>
          </div>
        </div>

      </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'DashboardView',
  components: {
    'apexchart': VueApexCharts
  },
  data() {
    return {
      url: "",
      total_researchers: 0,
      total_documents: 0,
      average_documents: 0,
      research_position: {},
      total_documents_school:{},
      average_documents_school:{},
      dataset:[],
      options: {
        chart: {
          type: 'bar'
        },
          plotOptions: {
            bar: {
              horizontal: true
          },
         
        }
      },
      series: [{
        data: [{
          x: 'category A',
          y: 10
        }, {
          x: 'category B',
          y: 18
        }, {
          x: 'category C',
          y: 13
        }],
      }],
            
    }
   
  },
  methods: {
      getNumbers(){
        this.url = this.HostUrl + this.ScriptUrl + "get_numbers.php"
        axios.post(this.url)
          .then(response => {

              this.total_researchers = response.data['total_researchers']
              this.total_documents = response.data['total_documents']
              this.average_documents = response.data['average_documents']
              
              
          })
          .catch(function (error) {
              console.log(error);
          });
      },
      get_total_researchers_position(){
        var position = []
        var value = []
        this.research_position = {}
        this.url = this.HostUrl + this.ScriptUrl + "get_graph.php"
        axios.post(this.url, {      
          graph: 'total_researchers_position'
        })
        .then(response => {
            this.dataset = response.data
            console.log(response.data)
            this.dataset.forEach(function (data) {
                position.push(data.position);
                value.push(data.value);
            });
            
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
            console.log("error response :" + error.response)
            console.log("error status :" + error.status)
        });
      },
      get_total_documents_school(){
        
      },
      get_average_documents_school(){

      }
    },
      

 
  created() {
    this.getNumbers()
    this.get_total_researchers_position()
  },
  computed: {
    HostUrl() {
        return this.$store.state.host_url;
    },
    ScriptUrl() {
        return this.$store.state.script_url;
    },
  },
  mounted(){
      
  }

}

</script>
<style>

</style>