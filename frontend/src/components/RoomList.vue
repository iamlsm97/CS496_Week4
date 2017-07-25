<template>
  <Layout>
    <div class="roomlist">
      <div class="room">
        <div>
          Make New Room
        </div>
        <form @submit.prevent="makeNewRoom">
          <div>
            <input class="form-control" id="roomName" name="roomName" v-model="roomName"
                   placeholder="title of room"/>
          </div>
          <button class="btn btn-primary" :disabled="roomName.length === 0">Make New Room</button>
        </form>
      </div>
      <div class="room" v-for="room in rooms">
        <div>
          <div>title: {{room.title}} </div>
          <div>maker: {{room.maker}}</div>
          <div>status: {{room.currentUser}} / {{room.maxUser}}</div>
          <div>userList:
            <span v-for="n in room.userList.length" v-if="n != room.userList.length">{{room.userList[n - 1]}}, </span>
            <span v-else>{{room.userList[n - 1]}}</span>
          </div>
        </div>
        <button class="btn btn-primary" :disabled="!!joined" @click="joinRoom(room._id)">Join Room</button>
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
        roomName: '',
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
      makeNewRoom () {
        console.log(this.roomName)
      },
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
  .roomlist {
    height: 90vh;
    padding: 3vh;
    overflow-y: auto;
    display: inline-block;
  }

  .room {
    height: 30vh;
    border: 1px solid;
    border-radius: 10px;
    width: 30%;
    margin: 10px;
    padding: 10px;
    display: inline-block;
  }

  .room:hover {
    background-color: #eeeeee;
  }

  button:disabled {
    background: #777777;
  }
</style>
