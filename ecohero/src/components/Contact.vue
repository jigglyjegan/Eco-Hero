<template>
  <NewTopBar/>
    <div class="big-image">
        <div class="overlay">
          <h1>Contact Us</h1>
          <br><br>
          <p>We will be happy to address any enquiries </p>
          <br><br>
          <div class="contact-info">
            <div class="card">
              <fa icon = "envelope" />
              <p>ecohero@gmail.com</p>
            </div>
            <div class="card">
              <fa icon = "phone" />
              <p>+65 6348 4933</p>
            </div>

            <div class="card">
              <fa icon = "map-marker-alt"/>
              <p>Computing Dr, Singapore 117417</p>
            </div>
          </div>
        </div>
      </div>
      <img src="../assets/ecohero.png" alt="" class="logo">
      <Mission/>
      <Team/>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NewTopBar from "@/components/NewTopBar.vue";
import Mission from "@/components/Mission.vue"
import Team from "@/components/Team.vue"

export default {
  name: "About",
  components: {
    NewTopBar,
    Mission,
    Team,

  },

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
body {
    margin: 0;
    font-family: "Roboto", sans-serif;
    overflow-x: hidden;
  }

   .logo{
    display: block;
    width: 25%;
    margin-left: auto;
    margin-right:auto;
  }

  .big-image {
    height: 100vh;
    width: 100vw;
    position: relative;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80");
  }
  
  .overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(5, 0, 0, 0.56);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  
  .overlay h1 {
    font-size: 65px;
    letter-spacing: 0px;
    margin: 0 0 5px;
  }
  
  .overlay p {
    margin: 0;
    font-size: 28px;
  }

  *{
  margin: 0;
  padding: 0;
  font-family: "montserrat",sans-serif;
  box-sizing: border-box;
}
body{
  background: #f1f1f1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact-info{
  display: flex;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}


.card{
  background: #254441;
  padding: 0 20px;
  margin: 0 10px;
  width: calc(33% - 100px);
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
}

.card-icon{
  font-size: 28px;
  background: #ff6348;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px !important;
  border-radius: 50%;
  transition: 0.3s linear;
}

.card:hover .card-icon{
  background: none;
  color: #ff6348;
  transform: scale(1.6);
}

.card p{
  margin-top: 20px;
  font-weight: 300;
  letter-spacing: 2px;
  max-height: 0;
  opacity: 0;
  transition: 0.3s linear;
}

.card:hover p{
  font-size: 20px;
  max-height: 40px;
  opacity: 1;
}


@media screen and (max-width:800px) {
  .contact-info{
    flex-direction: column;
  }
  .card{
    width: 100%;
    max-width: 300px;
    margin: 10px 0;
  }
}
</style>