<template>
  <div class="px-2 relative">
    <div class="w-full flex flex-col items-center justify-center">
      <div class="bg-components rounded-[25px] p-5 w-full">
        <h1 class="text-5xl text-center">🤳</h1>
        <h1 class="text-3xl text-center font-bold mt-5">TODO Tips</h1>
      </div>
    </div>
    <div class="steps mt-5">
      <div class="step">
        <div class="circle"></div>
        <div class="step-text">
          <strong class="text-xl">Be more active</strong>
          <p class="text-sm">
            The more experience you get, the more you get on airdrop
          </p>
        </div>
      </div>

      <div class="step">
        <div class="circle"></div>
        <div class="step-text">
          <strong class="text-xl">Passive income</strong>
          <p class="text-sm">Get your passive income every 3 hours</p>
        </div>
      </div>

      <div class="step">
        <div class="circle"></div>
        <div class="step-text">
          <strong class="text-xl">Invite your friends</strong>
          <p class="text-sm">You will also get more $YAMS on airdrop</p>
        </div>
      </div>

      <div class="step">
        <div class="circle"></div>
        <div class="step-text">
          <strong class="text-xl">Gifts drop</strong>
          <p class="text-sm">
            Don't forget to get free $YAMS in the bonuses section
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.steps {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.step {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #161616;
  margin-right: 20px;
}

.step-text {
  text-align: left;
}

.step-text strong {
  display: block;
}

.step-text p {
  color: #404040;
  margin: 0;
}

.step:before {
  content: "";
  position: absolute;
  left: 5px;
  top: 25px;
  height: calc(100% - 70px);
  width: 2px;
  background-color: #161616;
}
</style>
