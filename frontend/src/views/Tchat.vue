<template>
  <div class="Tchat">
        <div class="tchat_vue">
            <ul class="bubble">
                <li class="message" v-for="item in tchat" :key="item">
                    <p> {{item.userId}}</p>
                    <router-link
                        :to="`/onemsg/${item.id}`"
                    >
                      <p >
                          {{item.msg}}
                      </p>  
                    </router-link>
                </li>
            </ul>
            




        </div>
            <p>
                <input id="msg" v-model="msg"  @keyup.enter="get"  type="msg"  > <br>
                <input  type="submit" @click="get"  value="Envoyer Message">
            </p>

  </div>
</template>
<script>
import service_msg from "../services/fetch";
export default {
  name: 'Tchat',
  data() {
    return {
        tchat:"",
        msg:"",
        id_user:""
    }
    
  },
  mounted() {
/*         service_msg("http://localhost:3000/api/message/pseudo")
        .then(result=>{
          this.tchat=result
        })
        .catch(error=>{
          console.log(error)
        })  */
     
        service_msg("http://localhost:3000/api/message/")
        .then(result=>{
          this.tchat=result
        })
        .catch(error=>{
          console.log(error)
        }) 
 
  },
  methods: {
   get(){
     const token =JSON.parse(localStorage.getItem("token"))

      const message={
        id_user:token.userId,
        msg:this.msg,
      }
        service_msg("http://localhost:3000/api/message/post",message)
        .then(result=>{
            this.msg=""
            window.location.reload()
          console.log(result)
        })
        .catch(error=>{
          console.log(error)
        })
    },

  },
}
</script>
<style lang="scss">
    .tchat_vue {
        width: 100%;
        border:2px black solid;
        height: 500px;
        background:  #d3dfe4;
        overflow: auto;
        .bubble{
            list-style: none;
            .message{
                border: red dotted 3px solid;
                padding: 7px;
                margin:50px 30px;
                border-radius: 40px;

                &:nth-child(even) {background: rgb(216, 213, 200)}
                &:nth-child(odd) {background: rgb(190, 197, 191)}

            }
            .comment{
                border: rgb(69, 67, 70)  3px solid;
                padding: 7px;
                margin:50px 30px;
                border-radius: 40px;
                width: 50%;


                &:nth-child(even) {background: rgb(241, 92, 234)}
                &:nth-child(odd) {background: rgb(36, 183, 228)}
            }
        }
      
    }
    #msg{
    background: rgb(216, 216, 192);
    width: 60%;
    height: 80px;
    }  
</style>
