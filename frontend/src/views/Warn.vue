<template>
  <div class="Tchat">
        <h1>Signalement</h1>
        <div class="warn">
            
                 <ul class="warn_post">
                   <h2>Post signalé</h2>
                    <li class="message" v-for="item in tchat" :key="item">
                        <p> {{item.user.pseudo}}</p>

                          <p >
                              {{item.msg}}
                          </p>  
                      <button @click="approve_msg(item.id)">Approuver</button>
                      <button @click="remove_msg(item.id)">Supprimer</button>
                    </li>
                    
            </ul>
            <ul class="warn_com">
              <h2>Commentaire signalé</h2>
              <li v-for="item in com" :key="item">
                <p> {{item.user.pseudo}}</p>

                    <p >
                        {{item.post}}
                    </p>  

                <button @click="approve_com(item.id)">Approuver</button>
                <button @click="remove_com(item.id)">Supprimer</button>

              </li>
            </ul>

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
       com:"",
       
    }
    
  },
  mounted() {
        service_msg("http://localhost:3000/api/message/signal")
        .then(result=>{
            this.tchat=result
            console.log(result)
          
        })
        .catch(error=>{
          console.log(error)
        }),
        service_msg("http://localhost:3000/api/comment/signal")
        .then(result=>{
            this.com=result
          console.log(this.com)
        })
        .catch(error=>{
          console.log(error)
        })
  },
  methods: {
      approve_com(id){
                
        const warn={
        likes:0,
      }      
      service_msg(`http://localhost:3000/api/comment/signal/${id}`,warn)
        .then(result=>{
          console.log(result)
          window.location.reload()
        })
        .catch(error=>{
          console.log(error)
        })
      },
      remove_com(id){
      
      service_msg(`http://localhost:3000/api/comment/destroy/${id}`)
        .then(result=>{
          console.log(result)
          window.location.reload()

        })
        .catch(error=>{
          console.log(error)
        }) 

      },
      approve_msg(id){
                
        const warn={
        likes:0,
      }      
      service_msg(`http://localhost:3000/api/message/signal/${id}`,warn)
        .then(result=>{
          console.log(result)
          window.location.reload()
        })
        .catch(error=>{
          console.log(error)
        })
      },
      remove_msg(id){
      
      service_msg(`http://localhost:3000/api/message/destroy/${id}`)
        .then(result=>{
          console.log(result)
          window.location.reload()

        })
        .catch(error=>{
          console.log(error)
        }) 

      }

    
  }
}
</script>