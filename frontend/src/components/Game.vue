<template>
  <Layout>
    <div class="gameArea" @click="playCard">
      Main Game Area
      <div class="deckArea">
        <div class="deckCard"></div>
      </div>
      <div class="playerArea">
        <div class="playerCard" :class="{myTurn: turn===0}">player0</div>
        <div class="playerCard" :class="{myTurn: turn===1}">player1</div>
        <div class="playerCard" :class="{myTurn: turn===2}">player2</div>
        <div class="playerCard" :class="{myTurn: turn===3}">player3</div>
      </div>
    </div>
    <b-form-select v-model="selected" :options="options" class="mb-3">
    </b-form-select>
    <div>Selected: <strong>{{ selected }}</strong></div>
    <button @click="gameStart">Start Game</button>
    <div>{{ player0CardList }} {{ player1CardList }} {{ player2CardList }} {{ player3CardList }} {{ gameCardList }}
    </div>

  </Layout>
</template>

<script>
  import $ from 'jquery'
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'
  import Layout from './Layout'

  export default {
    components: {
      Layout,
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
          }, {
            text: 'Both',
            value: 'Both',
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
      userDead: function (data) {
        console.log('you lost')
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
      gameOver: function (data) {
        console.log('game over')
        this.player0CardList = data.player0CardList
        this.player1CardList = data.player1CardList
        this.player2CardList = data.player2CardList
        this.player3CardList = data.player3CardList
        this.gameCardList = data.gameCardList
        console.log('game disabled')
        this.eventListener = false
      },
      turnChange: function (turn) {
        this.changeTurn(turn)
      },
    },
    computed: {
      ...mapState({
        nickname: 'nickname',
        roomID: 'roomID',
        turn: 'turn',
      }),
    },
    methods: {
      ...mapActions([
        'changeTurn',
      ]),
      playCard () {
        this.$socket.emit('turnChange', this.turn)
      },
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
    mounted () {
      $('.messages').append('<li>Game Start!</li>')
    },
  }
</script>

<style scoped>
  .gameArea {
    border: 1px solid;
    font-size: 30px;
  }

  .deckCard {
    width: 100px;
    height: 100px;
    background-color: #00B7FF;
    display: inline-block;
  }

  .playerCard {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    display: inline-block;
  }

  .myTurn {
    background-color: crimson;
  }

</style>
