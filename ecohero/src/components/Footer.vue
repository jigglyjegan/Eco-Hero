<template>
  <footer class="footer">
    <div class="columns">
      <div class="title">
        <h1 class="title is-3">About Us</h1>
        <p>EcoHero is a web-based application that</p>
        <p>aims to tackle issue of climate change due to</p>
        <p>emissions from companies.</p>
        <br />
        <p>It provides a platform for companies <br>
             to track their emissions</p>
      </div>
      <div class="title" >
        <h1 class="title is-3">Support</h1>
        <p><b>Need Help:</b></p>
        <p>ecohero@gmail.com</p>
        <br /><br />
        <p><b>Talk to us:</b></p>
        <p>+65 6348 4933</p>
      </div>
        <br /><br />
        <span><i class="fab fa-instagram"></i></span>
        <a href="https://www.instagram.com/ecoheroofficial/"
          class = "link"><b><span class="padd">Follow us on Instagram!</span></b></a
        >
    
    </div>
  </footer>
</template>

<script>
export default {
};
</script>

<style scoped>
.footer {
  background-color: #fafafa;
  
}
span.padd {
  padding-left: 10px;
}

.columns {
  border: 1px ;
  margin: 1rem;
  padding: 2rem 2rem;
  text-align: center;
}
.title {
  display: inline-block;
  border: 1px ;
  padding: 1rem 1rem;
  vertical-align: middle;
}
.link{
  color: darkslategray
}






</style>