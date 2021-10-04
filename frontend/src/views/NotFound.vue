<template >
    <div class="not_found">
        <p id="not">404</p>
        <p class="p_not_found">L'adresse que vous essayez d'entrer dans l'url est incorrect, veuillez réessayez où servez vous du menu</p>
    </div>
    
</template>
<script>
export default {
    name:'NotFound',
    data(){
    return{

    }
    },
    mounted() {
 
    },
}

</script>
<style lang="scss">
.not_found{
    min-height: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px;
    .p_not_found{
        border-radius: 60px ;
        border: 5px solid rgb(218, 165, 165);
        box-shadow: 8px 6px 15px red ;
        background: cyan;
        color: rgb(75, 12, 12);
        font-size: xx-large;
        margin-top: 100px;
        padding: 10px;
        text-align: center;
    }
    #not{
        transition: transform 1s ease-in-out;
        font-size: 200px;
        color: tomato;
        :hover > &  {
        transform: rotateZ(360deg);
        }
    }

}

</style>
