<template>
  <div class="big-image">
    <div class="overlay">
      <h1>About Us</h1>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
body {
  margin: 0;
  font-family: "Roboto", sans-serif;
  overflow-x: hidden;
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
</style>