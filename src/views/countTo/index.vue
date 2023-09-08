<template>
  <div class="countTo">
    <div class="countTo-box">
      <countTo :endVal="5000" color="red" ref="oneRef"/>
    </div>
    <div class="countTo-box">
      <countTo :endVal="15000" color="blue"/>
    </div>
    <div class="countTo-box">
      <countTo :endVal="25000" color="green"/>
    </div>
    <div class="countTo-box">
      <countTo :endVal="35000" color="yellow"/>
    </div>
  </div>
  <!-- <button @click="handler">点击</button> -->
</template>

<script setup>
import {ref} from 'vue'
import countTo from '@/components/countTo/index.vue'

const oneRef = ref(null)

const handler = ()=>{
  oneRef.value.start()
}

</script>

<style lang="scss" scoped>
.countTo{
  display: flex;
  flex-wrap: wrap;
  &-box{
    width: 50%;
    border: 1px solid #eee;
    padding: 40px;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;
    vertical-align: middle;
  }
}
</style>
