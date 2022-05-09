<template>
  <div id="app">
    <div id="navbar">
      <div class="nav-container">  <!-- available class: mobile -->   
        <div class="overlay"></div>
        <div class="d-block d-md-none">
          <div class="mobile-nav-icon">
            <i class="bi bi-list"></i>
          </div>
        </div>
        <a id="nav-logo" href="/dashboard"><img src="./assets/uum-logo.png" alt="logo"></a>
        <div id="nav-options">
          <div class="close-icon">
            <i class="bi bi-x-circle"></i>
          </div>
          <div class="search-bar">  <!-- available class: active -->            
            <input type="text" style="transition: all .4s ease;" placeholder="Search...">
            <div class="search-icon"><i class="bi bi-search"></i></div>
            <div class="search-result-box">
              <a href="#">
                <p>Result 1</p>
              </a>
              <a href="#">
                <p>Result 2</p>
              </a>
            </div>
          </div>
          <b class="logout-btn"><span class="logout-text">Logout</span> <i class="ms-2 bi bi-box-arrow-right"></i></b>
        </div>
      </div>
    </div>

    <router-view style="min-height:100vh; height: 100%; padding-top: 75px; position:relative"/>
 
  </div>
</template>

<script>
export default {
  methods: {
    async showFilterResult() {
      const div = await document.querySelector('.search-bar');
      const input = await div.querySelector('input');
      if(input) {
        input.addEventListener('input',()=>{
          if (!input.value.trim()) {
            div.classList.remove('active');
          } else {
            if (!div.classList.contains('active')){
              div.classList.add('active');
            }
          }
        })
      }      
    },
    async setupMobileNav() {
      const container = await document.querySelector('.nav-container');
      const navBtn = await container.querySelector('.mobile-nav-icon');
      const overlay = await container.querySelector('.overlay');
      const closeBtn = await container.querySelector('.close-icon');
      if (navBtn) {
        navBtn.addEventListener('click', ()=> {
          if (container.classList.contains('mobile')) {
            container.classList.toggle('active');
          } else {
            container.classList.add('mobile');
              setTimeout(() => {
                container.classList.toggle('active');
              }, 10);
          }
          
        })
      }
      if (closeBtn) {
        container.addEventListener('click',(e)=>{
          if (closeBtn.contains(e.target) || overlay.contains(e.target)) {
            this.closeNav();          
          }
        })
      }
    },
    async closeNav() {
      const container = await document.querySelector('.nav-container');
      container.classList.remove('active');
    },
  },
  mounted(){
    this.showFilterResult();
    this.setupMobileNav();
  },
}
</script>


<style>
body{
  background-color: rgb(230, 230, 230);
}
/* === Navbar === */
#navbar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 75px;
    z-index: 1000;
    background-color: var(--uum-grey);    
    color: #fff;
}
.nav-container{
  /* overflow: hidden; */
  position: relative;
  padding: 10px 10em;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}
#nav-logo img{
  max-height: 62px;
}
#nav-options{
  position: relative;
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;  
}
.logout-btn{
  padding: 15px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color .4s ease;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.logout-btn:hover{
  background-color: rgba(255,255,255,.25);  
}
.logout-btn i{
  font-size: 20px;
}
.search-bar{
  display: flex;
  align-items: center;
  max-height: 50px;
  padding: 10px 5px;
  position: relative;
  transition: all .4s ease;
}
.search-bar input{
  margin: 0 !important;
  padding: 0 10px 0 15px !important;
  height: 35px !important;
  max-width: 20px;
  color: #fff;
  border: 0px solid #000 !important;
  background-color: rgb(43, 43, 43) !important;
  border-radius: 18px 0 0 18px !important;  
  z-index: 1002;
}
.search-bar input:focus{
  max-width: 120px;
  box-shadow: 2px 1px 5px 2px rgba(0,0,0,.1) inset !important;
  background-color: rgb(38, 38, 38) !important;
}
.search-bar input::placeholder{
  opacity: 0;
  transition: opacity .4s ease;
}
.search-bar input:focus::placeholder{
  opacity: 1;
}
.search-icon{
  padding: 0 15px 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgb(38, 38, 38);
  background-color: #3d3d3d;
  height: 35px ;
  border-radius: 0 18px 18px 0;
  z-index: 1002;
}
.search-result-box{
  position: absolute;
  background-color: #fff;
  color: #000;
  box-shadow: 2px 2px 5px 3px rgba(0,0,0,.1);
  z-index: 1001;
  border-radius: 4px;
  left: 15px;
  top: 48px;
  width: 170px;
  border: 1px solid rgba(0,0,0,.1);
  overflow: hidden;
  transform: translate(0, 50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease,
              transform .4s ease;
}
.search-result-box p {
  margin: 0 !important;
  font-size: 12px;    
  padding: 10px 15px;
  border-bottom: 1px solid rgba(0,0,0,.1) !important; 
  transition: background-color .4s ease;
}
.search-result-box a{
  text-decoration: none ;
  color: #000;    
}
.search-result-box a:hover > p{
  background-color: rgba(0,0,0,.1) !important;
}
.search-bar.active input:focus ~ .search-result-box {
  transform: translate(0, 0);
  opacity: 1;
  pointer-events: auto;
}
.mobile-nav-icon{
  font-size: 36px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,.5);
  height: 75px;
  width: 75px;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
}
.nav-container .close-icon{
  display: none;
}

/* +++ Mobile Version +++ */
@media (max-width: 768px) {
  #nav-options{
    display: none;
  }
  .nav-container{
    justify-content: center;
  }
}
.nav-container.mobile.active #nav-options{
  transform: translate(0,0);
  opacity: 1;
  pointer-events: auto;
}
.nav-container.mobile #nav-options{
  position: fixed;
  background: var(--uum-grey);
  width: 260px;
  left: 0;
  top: 0;
  height: 100vh;
  display: block;
  padding: 100px 20px 100px 20px;
  box-shadow: 3px 3px 5px 3px rgba(0,0,0,.1);
  opacity: 0;
  pointer-events: none;
  transform: translate(-100%,0);
  transition: transform .4s ease,
              opacity .2s ease;
}
.nav-container.mobile .search-bar{
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 50px;
  padding: 10px 5px;
  position: relative;
  transition: all .4s ease;
}
.nav-container .overlay{
  opacity: 0;
  pointer-events: none;
}
.nav-container.mobile.active > .overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,.75);
  backdrop-filter: blur(3px);
  transition: opacity .2s ease;
  pointer-events: auto;
  opacity: 1;
}
.nav-container.mobile .search-bar input{
  max-width: 100px;
}
.nav-container.mobile .search-bar input::placeholder{
  opacity: .25;
}
.nav-container.mobile .search-bar input:focus::placeholder{
  opacity: 1;
}
.nav-container.mobile .logout-btn{
  justify-content: center;
  background-color: rgba(0,0,0,.5);
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 80px;
}
.nav-container.mobile .close-icon{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 75px;
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,.5);
  cursor: pointer;
  transition: background-color .4s ease;
}
.nav-container.mobile .close-icon:hover {
  background-color: rgba(0,0,0,.25);
}
.nav-container.mobile .close-icon i{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 40px;
  opacity: .5;
}
.nav-container.mobile .search-result-box{
  position: absolute;
  background-color: #fff;
  color: #000;
  box-shadow: 2px 2px 5px 3px rgba(0,0,0,.1);
  z-index: 1001;
  border-radius: 4px;
  left: 15px;
  top: 48px;
  width: 170px;
  border: 1px solid rgba(0,0,0,.1);
  overflow: hidden;
  transform: translate(115%, 50%);
}
.nav-container.mobile .search-bar.active input:focus ~ .search-result-box {
  transform: translate(115%, -50%);
  opacity: 1;
  pointer-events: auto;
}

.body-card{
  background-color: rgba(255,255,255,.9);
  backdrop-filter: blur(10px);
  padding: 25px;
  border-radius: 4px;
  box-shadow: 3px 3px 6px 2px rgba(0,0,0,.1);
}
</style>
