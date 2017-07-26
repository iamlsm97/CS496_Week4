<template>
  <Layout>
    <div class="roomlist">
      <div class="room">
        <form @submit.prevent="makeNewRoom">
          <div>
            <h3>Make New Room</h3>
          </div>
          <div class="roomInputArea">
            <input class="form-control" id="roomName" name="roomName" v-model="roomName"
                   placeholder="title of room"/>
          </div>
          <button class="btn btn-primary" :disabled="roomName.length === 0 || !!joined">Make New Room</button>
        </form>
      </div>
      <div class="room" v-for="room in rooms">
        <div>
          <div class="information">title: {{room.title}} </div>
          <div class="information">maker: {{room.maker}}</div>
          <div class="information">status: {{room.currentUser}} / {{room.maxUser}}</div>
          <div class="information">userList:
            <span v-for="n in room.userList.length" v-if="n != room.userList.length">{{room.userList[n - 1]}}, </span>
            <span v-else>{{room.userList[n - 1]}}</span>
          </div>
        </div>
        <button class="btn btn-primary btn-join" :disabled="joined || room.full || !room.open" @click="joinRoom(room._id)">Join Room</button>
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
      login: function () {
        this.loadRoom()
      },
      userJoined: function () {
        this.loadRoom()
      },
      userLeft: function () {
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
        this.changeNumUsers(0)
        this.axios.post('/api/roomlist', {
          title: this.roomName,
          maker: this.nickname,
          open: true,
          maxUser: 4,
          currentUser: 0,
          rule: null,
          userList: [],
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
          console.log('fuck fuck')
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
        'changeNumUsers',
        'changeDestroyedState',
      ]),
    },
    created () {
      this.loadRoom()
    },
  }
</script>

<style scoped>
  .roomlist {
    height: 90vh;
    padding: 3vh;
    overflow-y: auto;
  }

  h3 {
    margin-top: 10px;
  }

  .roomInputArea {
    margin: 20px 0;
  }

  #roomName {
    width: 80%;
    text-align: center;
    margin: auto;
  }

  .information {
    margin: 5px 0;
  }

  .btn-join {
    margin: 5px 0;
  }

  .room {
    border: 1px solid;
    border-radius: 10px;
    width: 250px;
    height: 200px;
    margin: 10px;
    padding: 20px;
    display: inline-block;
  }

  .room:hover {
    background-color: #eeeeee;
  }

  button:disabled {
    background: #777777;
  }
</style>
