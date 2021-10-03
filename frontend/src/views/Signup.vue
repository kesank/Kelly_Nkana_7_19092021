<template>
  <div class="signup">
        
          <section class="sign">
              <p v-if="err_sign !=0">Veuillez renseigner tous les champs requis</p>
              <label for="email">Email</label><br>
              <input id="email" v-model="email"   type="email"  name="name"  ><br>
              <p v-if="err_email !=0">Veuillez renseigner une Adresse email valide</p>
  
              <label for="pseudo">Pseudo</label><br>
              <input id="pseudo" v-model="pseudo"  type="text"  ><br>

              <label for="password">Mot de passe</label><br>
              <input id="password" v-model="password"   type="password"  ><br>
              <p v-if="err_carr !=0">Veuillez renseigner un pseudo et un mot de passe sans caractères spéciaux</p>
              <button @click="get"  
              >
              S'inscrire
              </button>

          </section>

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
      role:"reader",
      err_sign:0,
      err_email:0,
      err_carr:0,
      reg: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
      reg_all:/[a-zA-Z_0-9]/
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
      if(this.email=="" || this.pseudo=="" || this.password==""){
        this.err_sign=1
      }
      else{
        if(this.reg.test(this.email)){
          this.err_email=0
          if(this.reg_all.test(this.pseudo) || this.reg_all.test(this.password)){
            this.err_carr=0
          service_user("http://localhost:3000/api/user/post",id_user)
            .then(result=>{
              
              console.log(result)
            })
            .catch(error=>{
              console.log(error)
            })
            window.location.replace("http://192.168.1.129:8080/signin");
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
