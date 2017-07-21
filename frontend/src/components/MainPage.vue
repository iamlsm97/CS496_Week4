<template>
  <div class="mainpage">
    <h1>Welcome to ERS+</h1>
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label>nickname</label>
        <input id="nickname" name="nickname" v-model="nickname" placeholder="Write your nickname"/>
      </div>
      <div>
        <button class="btn btn-primary" :disabled="nickname.length === 0">Login</button>
      </div>
    </form>
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
        ).then(() => this.$router.push('/roomlist'))
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

</style>
