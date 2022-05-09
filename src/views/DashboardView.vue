<template>
  <div class="home">
    <div>
      Total Researchers: {{ total_researchers }}
      <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
    </div>
    <div>
      Total Documents: {{ total_documents }}
      <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
    </div>

    <div>
      Average Documents: {{ average_documents }}
      <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
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
        }]
      }]
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
