<template>
    <div class="container">
      <h1 style="text-align:center; color: blue;">My Product</h1>
      <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Add New Product
  </button>
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">New Product</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form  @submit.prevent="addproduct()">
            <input class="form-control" type="text" placeholder="Name" aria-label="default input example" v-model="product.Name">
            <input class="form-control" type="number" placeholder="Price" aria-label="default input example" v-model="product.Price">
<input class="form-control" type="file" placeholder="Image" accept=".jpg,.png" @change="previewImage" aria-label="default input example">            <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Description" rows="3" v-model="product.Description"></textarea>
              <div class="alert alert-success" v-if="MessageError">{{MessageError }}</div>
               <progress id="js-progressbar" class="uk-progress" :value="uploadValue" max="100"></progress>
            <button type="submit" class="btn btn-success">Add</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div>
      </div>
    </div>
  </div>
      <div class="row"> 
       <div class="card" style="width: 18rem;" v-for="item in Myproducts" :key="item.key">
          <img :src="item.image" class="card-img-top" >
          <div class="card-body">
            <h5 class="card-title">{{item.name}}</h5>
            <h5 class="card-title">{{item.price}} DA</h5>
            <p class="card-text">{{item.desc}}</p>
           
            <a href="#" class="btn btn-primary">Buy</a>
            <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#update" v-on:click="getdata(item.name,item.price,item.image,item.desc,item.key)">
                 Update</button>
            <button class="btn btn-danger" v-on:click="deleteproduct(item.key)">Delete</button>
          </div>
         </div>
         
         
  
      </div>
      <div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Update Product</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
        <form  @submit.prevent="update()" >
        <input class="form-control" type="text" placeholder="Name" aria-label="default input example" v-model="dataproduct.name">
        <input class="form-control" type="text" placeholder="Price" aria-label="default input example" v-model="dataproduct.prix">
        <input class="form-control" type="text" placeholder="Image" aria-label="default input example" v-model="dataproduct.img">
        <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Description" rows="3" v-model="dataproduct.desc"></textarea>
         <button class="btn btn-success" type="submit">Update now</button>
        </form>
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
      
    </div>
  </div>
</div>
    </div>
  </template>
  
  
    <script>
    import firebase from '../Firebase';
  export default{
      name:'MyProducts',
      data(){
        return {
            product:{
                Name:'',
                Price:0,
                Image:'',
                Description:'',
                uid:localStorage.getItem('userid')
            },
            uploadValue:0,
      picture:null,
      imageData : null,
      imageName:'',
            dataproduct:{
                   name:'',
                   prix:0,
                   img:'',
                   desc:'',
                   key:''
                   
            },
            ref:firebase.firestore().collection('Products'),
            MessageError:'',
            Myproducts:[]
        }
      },
      methods:{

        getdata(name,price,image,desc,key){
        this.dataproduct.name=name
        this.dataproduct.prix=price
        this.dataproduct.img=image
        this.dataproduct.desc=desc
        this.dataproduct.key=key

        },
        update(){
          console.log(this.dataproduct.key);
          this.ref.doc(this.dataproduct.key).update({
           
            Name:this.dataproduct.name,
            Price:this.dataproduct.prix,
            Image:this.dataproduct.img,
            Description:this.dataproduct.desc,
          })





        },
        deleteproduct(key){
               this.ref.doc(key).delete();
        },
         addproduct(){
        //  upload image start here
          this.picture=null;
      const storageRef=firebase.storage().ref(`images/${this.imageName}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          console.log(url)
          this.product.Image=url
           this.ref.add(this.product).then(()=>{
         this.messageSuccess='Added'
        }).then(()=>{
          this.product.Name=''
          this.product.Price=''
          this.product.Image=''
          this.product.Description=''
        })
        });
      }
      );

        //  upload image end here


       
      },

      previewImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
      this.imageName=event.target.files[0].name

    }, 
  },
  created(){
    this.ref.onSnapshot(query=>{
       this.Myproducts=[]
        query.forEach(doc=>{
          if (localStorage.getItem("userid")==doc.data().uid){
         //   console.log(doc)
          this.Myproducts.push({
          key:doc.id,
          name:doc.data().Name,
          image:doc.data().Image,
          price:doc.data().Price,
          desc:doc.data().Description

          })
        }
          
        })


    })
  }
}
  </script>