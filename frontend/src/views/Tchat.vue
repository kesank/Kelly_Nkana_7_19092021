<template>
  <div class="Tchat" >
        <section class="send_msg">
            <!-- <input type="file" id="file" ref="file"/> -->

            <input id="msg" v-model="msg"  @keyup.enter="get"  type="msg"  > <br>
            <button :disabled="msg == ''"  @click="get">Envoyer Message</button> 
        </section>
        <section class="tchat_vue" v-if="token_id">
            <ul class="bubble">
                <li class="message" v-for="item in tchat" :key="item">

                    <h3> {{item.user.pseudo}}</h3>
                      <router-link
                        :to="`/onemsg/${item.id}`"
                       >
                      <p class="msg_tchat">

                          {{item.msg}}
                         
                      </p>  
                      </router-link> 
                    
                    <p >
                        {{format_date(item.createdAt)}}
                    </p> 

                </li>
            </ul>
            
        </section>
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
        id_user:"",
        token_id:this.token_id
    }
    
  },
  mounted() {
        this.token_id =localStorage.getItem("token")
        if(!this.token_id){
          console.log("erreur")
          window.location.replace("http://192.168.1.129:8080/signin");
          
        }
 
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
        min-height: 600px;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        .send_msg{
          display: flex;
          flex-direction: column;
          align-items: center;
          button{
            background: cornflowerblue;
            border-radius: 15px;
            color: red;
            font-size: x-large;
            box-shadow: 10px 5px 5px black;
          }
          #msg{
            background: rgb(216, 216, 192);
            width: 300px;
            height: 80px;
            border-radius: 20px;
            
          } 
        }
        .tchat_vue {
              width: 90%;
              border:2px black solid;
              min-height: 420px;
              background:  #d3dfe4;
              overflow: auto;
              margin: 50px 10px;
              border-radius: 50px;
              border:red 3px solid;
              .bubble{
                  list-style: none;
                  padding: 15px;
                  display: flex;
                  flex-direction: column;
                    button{
                          background: cornflowerblue;
                          border-radius: 15px;
                          color: red;
                          font-size: small;
                          box-shadow: 10px 5px 5px black;
                      }
                    .send_post{
                      font-size: x-large;
                      width: fit-content;
                    }
                  .message{
                      border: cornflowerblue  3px solid;
                      padding: 20px;
                      margin:50px 30px;
                      border-radius: 40px;
                      width: 70%;
                      text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;


                      &:nth-child(even) {background: rgb(216, 213, 200)}
                      &:nth-child(odd) {background: rgb(190, 197, 191)}
                      h3{
                        text-transform: uppercase;
                        color:rgb(230, 70, 70)
                      }
                      .msg_tchat{
                        display: flex;
                        flex-wrap: wrap;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        width: 90%;
                        }
                      

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

     }
</style>
