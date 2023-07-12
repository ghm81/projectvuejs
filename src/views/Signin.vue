<template>
    <div class="container">
        <form @submit.prevent="login()">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" v-model="user.email">
    
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" v-model="user.psw">
  </div>
  
  <button type="submit" class="btn btn-primary">Login</button>
</form>
    </div>
  </template>

  <script>
import firebase from '@/Firebase.js';
import router from '../router';
export default{
name:'SignIn',
data(){
    return{
        user:{
            email:'',
            psw:''
        },
        messageError:''
    }
},

methods:{
    login(){
        firebase.auth().signInWithEmailAndPassword(this.user.email,this.user.psw).then((datauser)=>{
           localStorage.setItem('userid',datauser.user.uid)
            router.push('/');
        }).catch(()=>{
            alert('invalid mail or password');
        })
    }
}



}
</script>