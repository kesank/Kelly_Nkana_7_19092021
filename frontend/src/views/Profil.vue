<template>
  <div class="Tchat">
      <div class="profil">
          <h1>Bienvenue sur votre page Profil {{pseudo2}}</h1>
          <label for="pseudo">Pseudo :</label>
          <br>
          <input type="text" v-model="pseudo">
          
          <br>
          
          <label for="pseudo">Email :</label>
          <br>
          <input type="text" v-model="email">
          <br>
          <button @click="update">Sauvegarder</button>
          <button @click="destroy" >Supprimer Profil</button>
      </div>
      

  </div>
</template>
<script>
import service_user from "../services/fetch";
export default {
  name: 'Tchat',
  data() {
    return {
        pseudo:this.pseudo,
        pseudo2:this.pseudo2,
        email:this.email,
        id:this.id

    }
    
  },
  mounted() {
      let token=JSON.parse(localStorage.getItem("token"))
       service_user(`http://localhost:3000/api/user/profil/${token.userId}`)
        .then(result=>{
          
            this.pseudo=result.pseudo
            this.pseudo2=result.pseudo
            this.email=result.email
            this.id=result.id
            console.log(result.id)
        })
        .catch(error=>{
  
          console.log(error)
        })
 
  },
  methods: {
     update(){
   
        const login ={
            email:this.email,
            pseudo:this.pseudo,
            id:this.id
        }
        service_user("http://localhost:3000/api/user/update",login)
        .then(result=>{
          
            console.log(result)
            window.location.reload()
        })
        .catch(error=>{
  
          console.log(error)
        })
    },
      destroy(){
      console.log(this.id)
      localStorage.setItem('token', '');
      service_user(`http://localhost:3000/api/user/destroy/${this.id}`)
        .then(result=>{
          console.log(result)
          
          window.location.replace("http://192.168.1.129:8080/signup");

        })
        .catch(error=>{
          console.log(error)
        }) 

    }
  }, 

}
</script>
<style lang="scss" >
    .profil{
        background: rgb(71, 227, 255);
        width: 100%;
        min-height: 200px;

    }
</style>
