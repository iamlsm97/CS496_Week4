<template>
  <div class="chat">
    <div class="inout">
      <button @click="joinRoom">Join</button>
      <button @click="exitRoom">Exit</button>
      <button @click="test">Test</button>
    </div>
    <div class="chatSide">
      <div class="chatArea">
        <ul class="messages"></ul>
      </div>
      <input class="inputMessage" placeholder="Type here..." v-model="message"/>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: '',
      }
    },
    sockets: {
      testtest: function () {
        console.log('testtest received')
      },
    },
    methods: {
      joinRoom () {
      },
      exitRoom () {
      },
      test () {
        this.$socket.emit('test')
      },
    },
  }
</script>

<style scoped>
  .chatArea {
    height: 500px;
    background-color: coral;
  }
</style>
