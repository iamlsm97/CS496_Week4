<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <div>
          <span>Egyptian Rat Screw +</span>
        </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="logout">
          <button class="btn btn-primary" @click="onClickLogout">Logout</button>
        </div>
        <div class="account-info">
          <div>Hello, {{nickname}}</div>
        </div>
      </div>
    </div>
    <div>
      <div class="col-md-9 col-sm-9">
        <slot></slot>
      </div>
      <div class="col-md-3 col-sm-3">
        <Chat></Chat>
      </div>
    </div>
  </div>
</template>

<script>
  import Chat from './Chat'
  import { mapState } from 'vuex'

  export default {
    components: {
      Chat,
    },
    computed: {
      ...mapState({
        nickname: 'nickname',
      }),
    },
    methods: {
      onClickLogout () {
        this.$router.push('/')
      },
    },
  }
</script>

<style scoped>
  .row {
    height: 10vh;
    background-color: lightblue;
  }

  .title {
    height: 100%;
  }

  .logout {
    display: inline-block;
    float: right;
    margin-left: 10px;
  }

  .account-info {
    display: inline-block;
    float: right;
  }
</style>
