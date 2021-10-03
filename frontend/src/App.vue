<template>
<div>
    <div id="nav">
      <img src="./assets/icon-left-font-monochrome-black.png" alt="">
    <router-link v-if="token == ''" to="/signup">Inscription</router-link>
    <router-link v-if="token == ''" to="/signin">Connexion</router-link>
    <router-link v-if="token != ''" to="/tchat">Tchat</router-link>
    <router-link v-if="role == 'admin'" to="/Warn">Signalement</router-link>
    <router-link v-if="token != ''" to="/Profil">Profil</router-link>
    <router-link v-if="token != ''" @click="deconnexion" to="/signin">Deconnexion</router-link>
  </div>
  <router-view/>
  <footer>

  </footer>
</div>

</template>
<script>
export default {
  data() {
    return {
       token:"",
       role:"",
       id:""
    }
    
  },
  mounted() {
    
    let token_id =localStorage.getItem("token")
    if(!token_id){
      console.log("erreur")
      return ;
    }
    token_id=JSON.parse(token_id)
    if(token_id.token !=null){
      this.token=token_id.token
      this.role=token_id.role
      this.id=token_id.id
      console.log(token_id)
    }
    else{
      this.token=""
    }
    
  },
  methods: {
    deconnexion(){
      localStorage.setItem('token', '');
      window.location.replace("http://192.168.1.129:8080/signin");
    }

    
  }
}
</script>

<style lang="scss">

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
  text-decoration: none;
}


#nav {
  
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 0px 5px 0px black;
  background: cornflowerblue;
    img{
      width:80px ;
    }
    a{
      font-weight: bold;
      color: #2c3e50;
      line-height:80px;
      .router-link-exact-active {
        color: #42b983;
  }
    }
}
footer{
  height: 80px;
  margin-top:60px ;
  background: cornflowerblue;

}

</style>
