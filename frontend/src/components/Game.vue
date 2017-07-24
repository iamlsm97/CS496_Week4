<template>
  <Layout>
    <div>
      <div class="gameArea">
        Main Game Area
      </div>
    </div>
  </Layout>
</template>

<script>
  import $ from 'jquery'
  import Layout from './Layout'

  export default {
    components: {
      Layout,
    },
    mounted () {
      $('.messages').append('<li>Game Start!</li>')
    },
  }

</script>

<style scoped>
  .gameArea {
    margin: auto;
    font-size: 30px;
  }
</style>
