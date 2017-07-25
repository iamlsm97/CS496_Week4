<template>
  <div class="mainpage">
    <div class="center">
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
  .mainpage {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url('../../static/egypt.jpg') no-repeat fixed center center;
    background-size: cover;
    padding: 0;
  }

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
    border: 1px solid white;
    background-color: rgba(238, 238, 238, 0.5);
    border-radius: 5px;
    min-width: 500px;
    padding: 40px;
  }

  #typo {
    /*margin-top: 50px;*/
    margin-bottom: 20px;
  }

  h2 {
    margin-bottom: 30px;
  }

  .input-group {
    width: 300px;
    margin: auto;
  }
</style>
