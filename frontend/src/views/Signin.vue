<template>
  <div class="Tchat">
      <p>
        <label for="email">Email</label>
        <input id="email" v-model="email"   type="email"  name="name"  >
      </p>
      <p>
        <label for="password">Mot de passe</label>
        <input id="password" v-model="password"   type="password"  >
      </p>

      <p>
        <button id="submit"  type="submit" @click="get"  
        >Envoyer</button>
      </p>

  </div>
</template>
<script>
import service_user from "../services/fetch";
export default {
  name: 'Tchat',
  data() {
    return {
        email:this.email,
        password:this.password,
    }
    
  },
  mounted() {
    console.log(JSON.parse(localStorage.getItem("token")))
    console.log("kemem")
 
  },
  methods: {
    get(){
   
        const login ={
            email:this.email,
            password:this.password
        }
        service_user("http://localhost:3000/api/user/login",login)
        .then(result=>{
          /* localStorage.clear() */
            localStorage.setItem("token",JSON.stringify(result))
            console.log("token : "+result.userId)
        })
        .catch(error=>{
  
          console.log(error)
        })
    }
  },
}
</script>
