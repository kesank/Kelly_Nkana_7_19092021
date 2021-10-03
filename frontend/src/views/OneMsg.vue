<template>
  <div class="Tchat">
        <div class="tchat_vue">
          <div class="bubble">
              <div class="message" >
                    <!-- <p> {{tchat.user.pseudo}}</p>     -->

                      <p >
                          {{tchat.msg}}
                      </p>  
                      <p >
                        {{format_date(tchat.createdAt)}}
                    </p> 
                    <button @click="destroy"  v-if="tchat.userId == id_user"> Supprimer</button>
                    
                    <button @click="signal"  v-if="tchat.userId != id_user">Signaler</button>
                </div>
                <input type="text" @keyup.enter="send" class="msg" v-model="post">
                <button @click="send" :disabled="post == ''" class="send_post"> Poster</button>
                <p class="comment" v-for="item in get_post" :key="item">
                  <span>{{item.user.pseudo}} :</span> {{item.post}} <br>
                  <span >
                        {{format_date(item.createdAt)}}
                    </span> <br>
                  <button @click="destroy_com(item.id)"  v-if="item.userId == id_user"> Supprimer</button>
                  <button @click="signal_com(item.id)" v-if="item.userId != id_user">Signaler</button>
                </p>

          </div>

         </div>
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
       post:"",
       get_post:"",
       id_user:""
    }
    
  },
  mounted() {
    let token_id =localStorage.getItem("token")
    token_id=JSON.parse(token_id)
    this.id_user=token_id.userId
    console.log(token_id)
    console.log(this.id_user)

    let href=window.location.href
    let url=href.split('/onemsg/')
    let id =url[1]
      console.log(id)
        service_msg(`http://localhost:3000/api/message/${id}`)
        .then(result=>{
          this.tchat=result
          console.log(result)
        })
        .catch(error=>{
          console.log(error)
        }) 
        
        
        service_msg(`http://localhost:3000/api/comment/${id}`)
        .then(result=>{
          console.log(result)
          this.get_post=result
        })
        .catch(error=>{
          console.log(error)
        }) 
 
 
  },
  methods: {
    send(){
    let href=window.location.href
    let url=href.split('/onemsg/')
    let id =url[1]
    console.log(id)
    const token =JSON.parse(localStorage.getItem("token"))
    const id_user=token.userId
    console.log(id_user)
    console.log(this.post)

    const post={
      id_user:id_user,
      id_message:id,
      post:this.post
    }
        service_msg("http://localhost:3000/api/comment",post)
        .then(result=>{
            this.msg=""
            window.location.reload()
          console.log(result)
        })
        .catch(error=>{
          console.log(error)
        })

    },
    signal(){
      let href=window.location.href
      let url=href.split('/onemsg/')
      let id =url[1]
      const warn={
        likes:1,
      }      
      console.log("signaler :"+id)
      service_msg(`http://localhost:3000/api/message/signal/${id}`,warn)
        .then(result=>{
          console.log(result)
/*           this.tchat=result */
        })
        .catch(error=>{
          console.log(error)
        }) 
    },
    signal_com(value){

      const warn={
        likes:1,
      }     
      console.log(value)
      service_msg(`http://localhost:3000/api/comment/signal/${value}`,warn)
        .then(result=>{
          console.log(result)

        })
        .catch(error=>{
          console.log(error)
        }) 
    },

    destroy(){
    let href=window.location.href
    let url=href.split('/onemsg/')
    let id =url[1]
      console.log(id)
      
        service_msg(`http://localhost:3000/api/message/destroy/${id}`)
        .then(result=>{
          console.log(result)
          window.location.replace("http://192.168.1.129:8080/tchat");

        })
        .catch(error=>{
          console.log(error)
        }) 
        
 
 
    },
    destroy_com(value){
 
      
        service_msg(`http://localhost:3000/api/comment/destroy/${value}`)
        .then(result=>{
          console.log(result)
          window.location.reload()

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

  }
}
</script>
<style lang="scss">
  .msg{
            background: rgb(216, 216, 192);
            width: 300px;
            height: 80px;
            border-radius: 20px;
  }
</style>
