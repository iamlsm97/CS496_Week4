<template>
  <Layout>
    <div class="roomlist">
      <div class="room">
        <form @submit.prevent="makeNewRoom">
          <div>
            Make New Room
          </div>
          <div>
            <input class="form-control" id="roomName" name="roomName" v-model="roomName"
                   placeholder="title of room"/>
          </div>
          <button class="btn btn-primary" :disabled="roomName.length === 0 || !!joined">Make New Room</button>
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
  import $ from 'jquery'

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
    sockets: {
      loadRoom: function () {
        this.loadRoom()
      },
    },
    computed: {
      ...mapState({
        nickname: 'nickname',
        roomID: 'roomID',
        joined: 'joined',
        destroyedState: 'destroyedState',
      }),
    },
    methods: {
      loadRoom () {
        this.axios.get('/api/roomlist')
          .then((response) => {
            this.rooms = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      makeNewRoom () {
        this.axios.post('/api/roomlist', {
          title: this.roomName,
          maker: this.nickname,
          open: true,
          maxUser: 4,
          currentUser: 1,
          rule: null,
          userList: [this.nickname],
          turn: 0,
        }).then((response) => {
          console.log('Made new room!')
          this.changeRoomOwner(true)
          console.log(response.data._id)
          this.joinRoom(response.data._id)
          this.$socket.emit('makeNewRoom')
          this.roomName = ''
          $('#roomName').blur()
        }).catch(function (error) {
          console.log(error)
        })
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
        'changeRoomOwner',
        'changeDestroyedState',
      ]),
    },
    created () {
      this.loadRoom()
      console.log(this.destroyedState)
      if (this.destroyedState) {
        $('.messages').append('<li>Room owner destroyed the room.</li>')
        this.changeDestroyedState(false)
      }
    },
    mounted () {
      if (this.destroyedState) {
        $('.messages').append('<li>Room owner destroyed the room.</li>')
        $('.messages').append('<li>Game Start!</li>')
        this.log('Room owner destroyed the room.')
        this.changeDestroyedState(false)
      }
    },
  }
</script>

<style scoped>
  .roomlist {
    height: 90vh;
    padding: 3vh;
    overflow-y: auto;
  }

  .room {
    border: 1px solid;
    border-radius: 10px;
    width: 250px;
    height: 200px;
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
