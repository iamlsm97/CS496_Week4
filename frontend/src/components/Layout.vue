<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <img src="../../static/typo.png"/>
      </div>
      <div class="col-md-6 col-sm-6 account">
        <div class="logout">
          <button class="btn btn-primary btn-logout" @click="onClickLogout">Logout</button>
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
    border-bottom: 1px solid;
  }

  img {
    width: 45%;
    height: 45%;
  }

  .account {
    margin-top: 2vh;
  }

  .logout {
    display: inline-block;
    float: right;
    margin-left: 10px;
  }

  .btn-logout {
    height: 6vh;
  }

  .account-info {
    display: inline-block;
    float: right;
    font-size: 25px;
  }
</style>
