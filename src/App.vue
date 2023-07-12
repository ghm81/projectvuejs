<template>
  <div id="app">
    
      
      <NavBar/>
  
    <router-view/>
  </div>
</template>
<script>
import NavBar from './views/Navbar.vue'
export default{
  components :{
  NavBar
  }
}
</script>
