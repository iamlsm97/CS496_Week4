<template>
  <Layout>
    <div class="roomlist">
      <div>
        <div class="room" v-for="room in rooms">
          <p>title: {{room.title}} </p>
          <p>maker: {{room.maker}}</p>
          <p>status: {{room.currentUser}} / {{room.maxUser}}</p>
          <p>userList: <span v-for="n in room.userList.length">{{room.userList[n - 1]}}, </span></p>
          <button :disabled="!!joined" @click="joinRoom(room._id)">Join Room</button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
  import Layout from './Layout'
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    components: {
      Layout,
    },
    data () {
      return {
        rooms: [],
      }
    },
    computed: {
      ...mapState({
        nickname: 'nickname',
        roomID: 'roomID',
        joined: 'joined',
      }),
    },
    methods: {
      joinRoom (roomID) {
        console.log(roomID)
        this.changeRoomID(roomID)
        this.changeJoined(true)
        this.$socket.emit('addUser', {
          roomID: this.roomID,
        })
      },
      ...mapActions([
        'changeRoomID',
        'changeJoined',
      ]),
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
  }
</script>

<style scoped>
  .room:hover {
    background-color: #eeeeee;
  }

  button:disabled {
    background: #777777;
  }
</style>
