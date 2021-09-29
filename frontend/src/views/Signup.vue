<template>
  <div class="signup">
        <form  id="app"  >
      <p>
        <label for="email">Email</label>
        <input id="email" v-model="email"   type="email"  name="name"  >
      </p>

      <p>
        <label for="pseudo">Pseudo</label>
        <input id="pseudo" v-model="pseudo"  type="text"  >
      </p>
      <p>
        <label for="password">Mot de passe</label>
        <input id="password" v-model="password"   type="password"  >
      </p>

      <p>
        <input  type="submit" @click="get"  value="Submit"
        >
      </p>

    </form>
  </div>
</template>
<script>
import service_user from "../services/fetch";
export default {
  name: 'Signup',
  data() {
    return {
       email:'',
      pseudo:'' ,
      password:'' ,
      role:"reader"
    }
    
  },
  mounted() {
    console.log("kelly")
 
  },
  methods: {
    get(){
      const id_user={
        email:this.email,
        pseudo: this.pseudo,
        password:this.password,
        role:this.role,
      }
        service_user("http://localhost:3000/api/user/post",id_user)
        .then(result=>{
          console.log(result)
        })
        .catch(error=>{
          console.log(error)
        })
    }
  },
}
</script>
