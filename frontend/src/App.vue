<template>
<div>
    <div id="nav">
    <router-link to="/signup">Inscription</router-link>
    <router-link to="/signin">Connexion</router-link>
    <router-link to="/tchat">Tchat</router-link>
    <router-link to="/Warn">Signalement</router-link>
  </div>
  <router-view/>
</div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
