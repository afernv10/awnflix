<template>
  <div class="diveo">
    <v-layout justify-center class="px-10">
      <h1 class="display-1 px-4 mt-2 font-weight-regular font-italic">
        ¿Ya estás procastinando {{ username }}?
      </h1>
    </v-layout>
    <v-layout justify-center>
      <h1 class="px-2 mt-2 font-weight-regular font-italic">
        No me toques las narices que me enfado...
      </h1>
    </v-layout>

    <div class="hit-area">
      <div class="hitbox" id="a-1"></div>
      <div class="hitbox" id="a-2"></div>
      <div class="hitbox" id="a-3"></div>
      <div class="hitbox" id="a-4"></div>
      <div class="hitbox" id="a-5"></div>
      <div class="hitbox" id="b-1"></div>
      <div class="hitbox" id="b-2"></div>
      <div class="hitbox" id="b-3"></div>
      <div class="hitbox" id="b-4"></div>
      <div class="hitbox" id="b-5"></div>
      <div class="hitbox" id="c-1"></div>
      <div class="hitbox" id="c-2"></div>
      <div class="hitbox" id="c-3"></div>
      <div class="hitbox" id="c-4"></div>
      <div class="hitbox" id="c-5"></div>
      <div class="eye">
        <div class="pupil"></div>
      </div>
      <div class="eye">
        <div class="pupil"></div>
      </div>
      <div class="eyelid"></div>
      <div class="eyelid"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["username"]
};
</script>

<style>
.diveo {
  background: rgb(40, 35, 110);
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.hit-area {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
}

.hitbox {
  width: 100px;
  height: 100px;
  float: left;
}

.eye {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  left: 25%;
  top: 40%;
  background-color: white;
  pointer-events: none;
}

.eye + .eye {
  left: 55%;
}

.pupil {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  left: 50%;
  top: 50%;
  margin-left: -10px;
  margin-top: -10px;
  transition: all 0.5s ease;
}

.eyelid {
  width: 150px;
  height: 85px;
  background-color: rgb(40, 35, 110);
  position: absolute;
  left: 20%;
  top: 25%;
  pointer-events: none;
  -webkit-animation-name: blink;
  -webkit-animation-duration: 4.5s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -webkit-animation-direction: alternate;
  -webkit-animation-delay: 1s;
  -webkit-transition: all 0.5s ease;
}

.eyelid + .eyelid {
  left: 50%;
}

@-webkit-keyframes blink {
  0% {
    top: 25%;
  }
  95% {
    top: 25%;
  }
  100% {
    top: 40%;
  }
}

.hitbox:hover ~ .eyelid {
  -webkit-transform: rotate(-10deg);
}

.hitbox:hover ~ .eyelid:nth-of-type(2n + 1) {
  -webkit-transform: rotate(10deg);
}

#c-3:hover ~ .eyelid {
  -webkit-transform: rotate(15deg);
}

#c-3:hover ~ .eyelid:nth-of-type(2n + 1) {
  -webkit-transform: rotate(-15deg);
}

#c-3:hover ~ .eye .pupil {
  background-color: red;
}

#a-1:hover ~ .eye > .pupil {
  -webkit-transform: rotate(60deg) translate(-30px);
}

#a-2:hover ~ .eye > .pupil {
  -webkit-transform: rotate(80deg) translate(-30px);
}

#a-3:hover ~ .eye > .pupil {
  -webkit-transform: rotate(90deg) translate(-30px);
}

#a-4:hover ~ .eye > .pupil {
  -webkit-transform: rotate(100deg) translate(-30px);
}

#a-5:hover ~ .eye > .pupil {
  -webkit-transform: rotate(120deg) translate(-30px);
}

#b-1:hover ~ .eye > .pupil {
  -webkit-transform: rotate(50deg) translate(-25px);
}

#b-2:hover ~ .eye > .pupil {
  -webkit-transform: rotate(70deg) translate(-25px);
}

#b-3:hover ~ .eye > .pupil {
  -webkit-transform: rotate(90deg) translate(-25px);
}

#b-4:hover ~ .eye > .pupil {
  -webkit-transform: rotate(110deg) translate(-25px);
}

#b-5:hover ~ .eye > .pupil {
  -webkit-transform: rotate(130deg) translate(-25px);
}

#c-1:hover ~ .eye > .pupil {
  -webkit-transform: rotate(0deg) translate(-25px);
}

#c-2:hover ~ .eye > .pupil {
  -webkit-transform: rotate(0deg) translate(-10px);
}

#c-3:hover ~ .eye > .pupil {
  -webkit-transform: rotate(0deg) translate(20px);
}

#c-3:hover ~ .eye:nth-of-type(2n + 1) > .pupil {
  -webkit-transform: rotate(0deg) translate(-20px);
}

#c-4:hover ~ .eye > .pupil {
  -webkit-transform: rotate(0deg) translate(10px);
}

#c-5:hover ~ .eye > .pupil {
  -webkit-transform: rotate(0deg) translate(25px);
}

#d-1:hover ~ .eye > .pupil {
  -webkit-transform: rotate(-50deg) translate(-25px);
}

#d-2:hover ~ .eye > .pupil {
  -webkit-transform: rotate(-70deg) translate(-25px);
}

#d-3:hover ~ .eye > .pupil {
  -webkit-transform: rotate(-90deg) translate(-25px);
}

#d-4:hover ~ .eye > .pupil {
  -webkit-transform: rotate(-110deg) translate(-25px);
}

#d-5:hover ~ .eye > .pupil {
  -webkit-transform: rotate(-130deg) translate(-25px);
}

#e-1:hover ~ .eye > .pupil {
  -webkit-transform: rotate(-40deg) translate(-30px);
}

#e-2:hover ~ .eye > .pupil {
  -webkit-transform: rotate(-60deg) translate(-30px);
}

#e-3:hover ~ .eye > .pupil {
  -webkit-transform: rotate(-80deg) translate(-30px);
}

#e-4:hover ~ .eye > .pupil {
  -webkit-transform: rotate(-100deg) translate(-30px);
}

#e-5:hover ~ .eye > .pupil {
  -webkit-transform: rotate(-120deg) translate(-30px);
}
</style>
