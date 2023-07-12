<template>
    <div class="container">
      <h1 style="text-align:center;">All Product</h1>
      <div class="row"> 
       <div class="card" style="width: 18rem;" v-for="item in products" :key="item.name">
          <img v-bind:src="item.img" class="card-img-top" >
          <div class="card-body">
            <h5 class="card-title">{{item.name}}</h5>
            <h5 class="card-title">{{item.prix}}</h5>
            <p class="card-text">{{item.desc}}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
         </div>
        
         
  
      </div>
    </div>
  </template>

  <script>
import firebase from '../Firebase';

export default{
    name:'ProDucts',
    data(){
      return{
     product:{
      Name:'',
      Price:0,
      Image:'',
      Description:''

     }
     ,
     ref:firebase.firestore().collection('Products'),
     products:[]
    }
    },
    created(){
      this.ref.onSnapshot(qr=>{
        this.products=[]
        qr.forEach(doc=>{
          this.products.push({
          name:doc.data().Name,
          prix:doc.data().Price,
          img:doc.data().Image,
          desc:doc.data().Description
          }
            
          )
                })
      })
    }
    
    
}
</script>