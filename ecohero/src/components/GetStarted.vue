<template>
    <div class="get-started">
        <img class = "img-logo" src ="../assets/icon.png">
        <div class = "slogan">
            <h1>All your bills at the tip of your fingers</h1>
        </div>
        <button class="get-started-btn" @click.prevent="goToHome()">Get Started</button>    
    </div>
</template>

<script scoped>
export default {
methods: {
   goToHome() {
   this.$router.push('/login'); 
      }
  }
}
</script>

<style scoped>
    .get-started {
      background-color: white;
      height: 1000px;
      position: relative;
      text-align: center;

  }
  .img-logo{
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 1200px;
    width: auto;
    position: relative; /* Declared position allows for location changes */
    top: -350px; /* Moves the image 2px closer to the top of the page */
  }

  .slogan {
    position: absolute;
    text-align: center;
    top: 40%;
    left: 48%;
    transform: translate(-50%, -50%);
  }

  .get-started-btn {
    position: absolute;
    top: 50%;
    left: 48%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: green;
    color: white;
    font-size: 16px;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .get-started-btn:hover {
    background-color: black;
  }
</style>