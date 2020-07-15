<template>
    <div>
        <!-- <img :src="sanjiangImg" @click="jumpToSanjiang"/> -->
        <mt-button class="button" @click="jumpToSanjiang">三江开票</mt-button>
    </div>
</template>

<script>
// import sanjiangImg from "../assets/nav/sanjiang.png";

export default {
    name: "Nav",

    data() {
        return {
            // sanjiangImg: sanjiangImg,
        }
    },

    methods: {
        jumpToSanjiang: function() {
            this.$router.push({path: "scan/sanjiang"});
        }
    }
}
</script>

<style scoped>


.button {
    width: 90%;
    height: 100px;
    box-sizing: border-box;
    margin: 5%;
    font-weight: bold;
}

</style>