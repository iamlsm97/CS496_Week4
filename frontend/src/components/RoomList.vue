<template>
  <div class="roomlist">
    <h2>Welcome, {{ nickname }}</h2>
    <div>
      <div class="room" v-for="room in rooms">
        <p>title: {{room.title}} </p>
        <p>maker: {{room.maker}}</p>
        <p>status: {{room.currentUser}} / {{room.maxUser}}</p>
        <p>userList: <span v-for="n in room.userList.length">{{room.userList[n - 1]}}, </span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        rooms: [],
      }
    },
    created () {
      this.axios.get('/api/roomlist')
        .then((response) => {
          this.rooms = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    computed: {
//      rooms: () => {
//        this.axios.get('/api/roomlist')
//          .then((response) => {
//            return response.data
//          })
//          .catch(function (error) {
//            console.log(error)
//          })
//      },
      ...mapState({
        nickname: 'nickname',
      }),
    },
  }
</script>

<style scoped>
  .room:hover {
    background-color: #eeeeee;
  }
</style>
