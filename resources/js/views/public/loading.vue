<template>
  <div class="loading-wrap">
    <div class="loading">
      <div class="title grey--text font-weight-bold">Loading...</div>
      <div class="loading-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  </div>
</template>

<style>
.loading-wrap {
  height: 100vh;
  position: relative;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.title {
  margin-bottom: 50px;
  font-size: large;
}
.dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #bbb;
  display: inline-block;
  animation: blink 1.4s infinite;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.2;
  }
}

.dot:nth-child(1) {
  background-color: rgb(247, 111, 20);
}
.dot:nth-child(2) {
  background-color: rgb(231, 116, 21);
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  background-color: rgb(245, 121, 38);
  animation-delay: 0.4s;
}
.dot:nth-child(4) {
  background-color: rgb(245, 128, 18);
  animation-delay: 0.6s;
}
</style>