<template>
  <div class="Tchat">
      <section class="sign">
        <p v-if="err_sign !=0">Veuillez renseigner tous les champs requis</p>
        <label for="email">Email</label><br>
        <input id="email" v-model="email"   type="email"  name="name"  >
        <p v-if="err_email !=0">Veuillez renseigner une Adresse email valide</p>
        <br>
        <label for="password">Mot de passe</label><br>
        <input id="password" v-model="password"   type="password"  >
        <br>
        <p v-if="err_carr !=0">Veuillez renseigner un mot de passe sans caractères spéciaux</p>
        <p v-if="err_id !=0">Les identifiants entrer sont incorrect</p>
        <button  :disabled="email == ''"   @click="get"  
        >Se connecter</button>
      </section>

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
        err_sign:0,
        err_email:0,
        err_carr:0,
        err_id:0,
        reg: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
        reg_all:/[a-zA-Z_0-9]/
    }
    
  },
  mounted() {
    
  },
  methods: {
    get(){
   
        const login ={
            email:this.email,
            password:this.password
        }
      if(this.email=="" ||  this.password==""){
        this.err_sign=1
      }
      else{
        if(this.reg.test(this.email)){
          this.err_email=0
          if( this.reg_all.test(this.password)){
            this.err_carr=0
              service_user("http://localhost:3000/api/user/login",login)
              .then(result=>{
                
                  localStorage.setItem("token",JSON.stringify(result))
                  window.location.replace("http://192.168.1.129:8080/tchat");
                  console.log("token : "+result.userId)
              })
              .catch(error=>{
                this.err_id=1
                console.log(error)
              })
          }
          else{
            this.err_carr=1
          }


        }
        else{
          this.err_email=1

        }

      }

    }
  },
}
</script>
<style lang="scss">
  .sign{
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
      color: red;
      font-size: xx-large;
    }
    button{
      border-radius: 40px;
      font-size: xx-large;
      background: cornflowerblue;
      color: red;
      box-shadow: 10px 5px 5px black;
    }
    label{
      font-size: large;
      color: rgb(71, 66, 66);
      font-weight: bolder;
    }
    input{
      border-radius: 20px;
      background-color: cadetblue;
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      color: rgb(248, 247, 240);
      font-size: xx-large;
    }
  }
</style>
