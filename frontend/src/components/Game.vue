<template>
  <Layout>
    <div>
      <div class="gameArea">
        Main Game Area
      </div>
      <b-form-select v-model="selected" :options="options" class="mb-3">
      </b-form-select>
      <div>Selected: <strong>{{ selected }}</strong></div>
      <button @click="gameStart">Start Game</button>
      <div>{{ player0CardList }} {{ player1CardList }} {{ player2CardList }} {{ player3CardList }} {{ gameCardList }}</div>
    </div>
  </Layout>
</template>

<script>
  import $ from 'jquery'
  import Layout from './Layout'
  import { mapState } from 'vuex'

  export default {
    components: {
      Layout,
    },
    mounted () {
      $('.messages').append('<li>Game Start!</li>')
    },
    data () {
      return {
        rooms: [],
        selected: null,
        eventListener: false,
        player0CardList: [],
        player1CardList: [],
        player2CardList: [],
        player3CardList: [],
        gameCardList: [],
        options: [
          {
            text: 'Select a rule',
            value: null,
          }, {
            text: 'Doubles',
            value: 'Doubles',
          }, {
            text: 'Consecutives',
            value: 'Consecutives',
          }],
      }
    },
    sockets: {
      startError: function () {
        console.log('Could not start')
      },
      gameStarted: function (data) {
        this.player0CardList = data.player0CardList
        this.player1CardList = data.player1CardList
        this.player2CardList = data.player2CardList
        this.player3CardList = data.player3CardList
        this.gameCardList = data.gameCardList
        this.eventListener = true
      },
      hitWin: function (data) {
        this.player0CardList = data.player0CardList
        this.player1CardList = data.player1CardList
        this.player2CardList = data.player2CardList
        this.player3CardList = data.player3CardList
        this.gameCardList = data.gameCardList
      },
      hitDraw: function () {
      },
      hitLoss: function (data) {
        this.player0CardList = data.player0CardList
        this.player1CardList = data.player1CardList
        this.player2CardList = data.player2CardList
        this.player3CardList = data.player3CardList
        this.gameCardList = data.gameCardList
      },
      gameOver: function (data) {
        console.log('game over')
        this.player0CardList = data.player0CardList
        this.player1CardList = data.player1CardList
        this.player2CardList = data.player2CardList
        this.player3CardList = data.player3CardList
        this.gameCardList = data.gameCardList
        if (data.player === this.nickname) {
          console.log('game disabled')
          this.eventListener = false
        }
      },
    },
    methods: {
      gameStart: function () {
        this.axios.put('/api/roomlist/' + this.roomID, {
          rule: this.selected,
        })
          .then((response) => {
            console.log('Success!')
          })
          .catch(function (error) {
            console.log(error)
          })
        this.$socket.emit('gameStart', {
          roomID: this.roomID,
        })
      },
    },
    created () {
      window.addEventListener('keyup', function (event) {
        if (event.keyCode === 32 && this.eventListener) {
          this.$socket.emit('hit', {
            roomID: this.roomID,
          })
          console.log('game enabled!')
        }
      }.bind(this))
    },
    computed: {
      ...mapState({
        nickname: 'nickname',
        roomID: 'roomID',
      }),
    },
  }
</script>

<style scoped>
  .gameArea {
    margin: auto;
    font-size: 30px;
  }
</style>
