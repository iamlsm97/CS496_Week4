<template>
  <div class="mainpage">
    <img id="typo" src="../../static/typo.png"/>
    <div>
      <h2>Login with nickname</h2>
      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <div>
            <input class="form-control" id="nickname" name="nickname" v-model="nickname"
                   placeholder="your nickname here!"/>
          </div>
          <div class="input-group-btn">
            <button class="btn btn-primary" :disabled="nickname.length === 0">Login</button>
          </div>
        </div><!-- /input-group -->
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        nickname: '',
      }
    },
    methods: {
      onSubmit () {
        this.changeNickname(
          this.nickname,
        ).then(() => {
          this.$socket.emit('register', {
            nickname: this.nickname,
          })
          this.$router.push('/roomlist')
        })
      },
      ...mapActions([
        'changeNickname',
      ]),
    },
    mounted () {
      this.changeNickname(null)
    },
  }
</script>

<style scoped>
  #typo {
    margin-bottom: 50px;
  }

  form {
    margin-left: 100px;
    margin-right: 100px;
  }
</style>
