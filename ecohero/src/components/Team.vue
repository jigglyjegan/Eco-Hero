<template>
    <h1>Our Team</h1>
    <p>Meet the developers behind EcoHero</p>
  <div class= "team">
    <div class="images">
    <img class="image" src="../assets/jegan.jpg" alt="">
    <p>Jegan</p>
    </div>
    <br><br>
    <div class="images">
    <img class="image" src="../assets/ck.jpg" alt="">
    <p>Chee Kang</p>
    </div>
    <br><br>
    <div class="images">
    <img class="image" src="../assets/anthony.jpg" alt="">
    <p>Anthony</p>
    </div>
    <br><br>
    <div class="images">
    <img class ="image" src="../assets/ryan.jpg" alt="">
    <p>Ryan</p>
    </div>
    <br><br>
    <div class="images">
    <img class="image" src="../assets/mark.jpg" alt="">
    <p>Mark</p>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style>
.team{
    display: flex;

}

.images{
    flex: 33.33%;
    padding: 5px;
}

.image{
    height: 250px;
    width: 250px;
}
</style>