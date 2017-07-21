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
          <div>{{nickname}}</div>
        </div>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
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
