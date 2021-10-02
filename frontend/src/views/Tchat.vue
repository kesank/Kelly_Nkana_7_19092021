<template>
  <div class="Tchat">
        <div class="tchat_vue">
            <ul class="bubble">
                <li class="message" v-for="item in tchat" :key="item">
                    <p> {{item.user.pseudo}}</p>
                    <router-link
                        :to="`/onemsg/${item.id}`"
                    >
                      <p >
                          {{item.msg}}
                      </p>  

                    </router-link>
                    <p >
                        {{format_date(item.createdAt)}}
                    </p>  
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
import moment from 'moment'
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
          console.log(result)
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
    format_date(value){
         if (value) {
           return moment(String(value)).format('DD/MM/YYYY à hh:mm')
          }
      },


  },
}
</script>
<style lang="scss">
   .Tchat{ 
     
        
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;

        .tchat_vue {
              width: 80%;
              border:2px black solid;
              height: 500px;
              background:  #d3dfe4;
              overflow: auto;
              margin: 10px;
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
                      span{
                        font-weight: bolder;
                        text-transform: capitalize;
                      }
                  }
              }
            
          }
          .warn{
              width: 80%;
              border:2px black solid;
              height: 500px;
              background:  #f5d5d5;
              overflow: auto;
              margin: 10px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
/*               .bubble_warn{

              }      */       
          }
          #msg{
          background: rgb(216, 216, 192);
          width: 100%;
          height: 80px;
          } 
     }
</style>
