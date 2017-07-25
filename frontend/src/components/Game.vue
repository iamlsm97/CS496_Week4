<template>
  <Layout>
    <div class="gameArea" :class="{disabled: !eventListener}" @click="playCard">
      click to play a card, press space to get  cards
      <div class="deckArea">
        <div class="deckCard">deck</div>
      </div>
      <div class="playerArea">
        <div class="playerCard" :class="{myTurn: turn===0}">
          <div>player0</div>
          <div>{{player0CardList.length}}</div>
        </div>
        <div class="playerCard" :class="{myTurn: turn===1}">
          <div>player1</div>
          <div>{{player1CardList.length}}</div>
        </div>
        <div class="playerCard" :class="{myTurn: turn===2}">
          <div>player2</div>
          <div>{{player2CardList.length}}</div>
        </div>
        <div class="playerCard" :class="{myTurn: turn===3}">
          <div>player3</div>
          <div>{{player3CardList.length}}</div>
        </div>
      </div>
    </div>
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
            text: 'Doubles and Consecutives',
            value: 'DC',
          }, {
            text: 'Sandwiches',
            value: 'Sandwiches',
          }, {
            text: 'All',
            value: 'All',
          },
        ],
      }
    },
    sockets: {
      startError: function () {
        console.log('Could not start')
      },
      turnChangeError: () => {
        console.log('Could not change turn')
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
        $('.messages').append('<li>' + data.player + ' is dead</li>')
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
        $('.messages').append('<li>' + data.player + ' win the game!</li>')
      },
      turnChange: function (data) {
        console.log(data)
        this.changeTurn(data.turn)
        this.player0CardList = data.player0CardList
        this.player1CardList = data.player1CardList
        this.player2CardList = data.player2CardList
        this.player3CardList = data.player3CardList
        this.gameCardList = data.gameCardList
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
        if (this.eventListener) {
          this.$socket.emit('playCard')
        }
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

  .disabled {
    background-color: #A9A9A9;
    -webkit-filter: grayscale(70%);
    filter: grayscale(70%);
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
