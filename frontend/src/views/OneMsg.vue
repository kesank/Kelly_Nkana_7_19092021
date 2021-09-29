<template>
  <div class="Tchat">
        <div class="tchat_vue">
          <div class="bubble">
              <div class="message" >
                    <p> {{tchat.id}}</p>

                      <p >
                          {{tchat.msg}}
                      </p>  
                    <button @click="destroy"> Supprimer</button>
                    
                    <button @click="signal">Signaler</button>
                </div>
                <input type="text" v-model="post">
                <button @click="send"> Poster</button>
                <p class="comment" v-for="item in get_post" :key="item">{{item.post}}</p>

          </div>

         </div>
  </div>
</template>
<script>
import service_msg from "../services/fetch";
export default {
  name: 'Tchat',
  data() {
    return {
       tchat:"",
       post:"",
       get_post:""
    }
    
  },
  mounted() {
    let href=window.location.href
    let url=href.split('/onemsg/')
    let id =url[1]
      console.log(id)
        service_msg(`http://localhost:3000/api/message/${id}`)
        .then(result=>{
          this.tchat=result
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

    destroy(){
    let href=window.location.href
    let url=href.split('/onemsg/')
    let id =url[1]
      console.log(id)
      
        service_msg(`http://localhost:3000/api/message/destroy/${id}`)
        .then(result=>{
          console.log(result)

        })
        .catch(error=>{
          console.log(error)
        }) 
        window.location.replace("http://192.168.1.129:8080/tchat");
 
 
    }
  }
}
</script>
<style lang="scss">

</style>
