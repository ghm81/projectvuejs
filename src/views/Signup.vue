<template>
    <div class="container">
        <form @submit.prevent="registre()">
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control" v-model="user.name">
    
  </div>
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
name:'SignUp',
data(){
    return{
        user:{
            name:'',
            email:'',
            psw:'',
           
            uid:''
        },
   
    }
},

methods:{
    registre(){
        firebase.auth().createUserWithEmailAndPassword(this.user.email,this.user.psw).then((datauser)=>{
            firebase.firestore().collection('Users').add({
                Name:this.user.name,
                Email:this.user.email,
                UserId:datauser.user.uid
            });
            
            router.push('/');
        })
    }
}



}
</script>