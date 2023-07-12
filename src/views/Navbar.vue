<template>
    <div id="app">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about" v-if="user==null">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/signin" v-if="user==null">Signin</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/signup" v-if="user==null">Signup</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products" v-if="user">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/myproducts" v-if="user">My Products</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-on:click="logout()" style="cursor: pointer;" v-if="user">logout</a>
        </li>
       
      </ul>
      
    </div>
  </div>
</nav>
      
    </div>
  </template>

  <script>
  import firebase  from '../Firebase';
  import router from '@/router';
export default{
name:'NavBar',
created(){
  firebase.auth().onAuthStateChanged(userauth=>{
    if (userauth)
    this.user=userauth
    else
    this.user=null
  })
},
data(){
  return{
    user:null
  }
},
methods:{
  logout(){

    firebase.auth().signOut().then(()=>{
     localStorage.removeItem('userid')
      router.push({name:'SignIn'
      })
    })

  }
}

}

</script>