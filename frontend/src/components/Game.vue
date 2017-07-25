<template>
  <Layout>
    <div class="gameArea" :class="{disabled: !eventListener}" @click="playCard">
      <div class="direction">click to play a card, press space to get cards</div>
      <div class="deckCard">
        <img :src="imageCalculator"/>
      </div>
      <div class="playerArea">
        <div class="playerCard" :class="{myTurn: turn===0}">
          <div class="nickname">player0</div>
          <div class="cardnum">{{player0CardList.length}}</div>
        </div>
        <div class="playerCard" :class="{myTurn: turn===1}">
          <div class="nickname">player1</div>
          <div class="cardnum">{{player1CardList.length}}</div>
        </div>
        <div class="playerCard" :class="{myTurn: turn===2}">
          <div class="nickname">player2</div>
          <div class="cardnum">{{player2CardList.length}}</div>
        </div>
        <div class="playerCard" :class="{myTurn: turn===3}">
          <div class="nickname">player3</div>
          <div class="cardnum">{{player3CardList.length}}</div>
        </div>
      </div>
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
      imageCalculator: function () {
        console.log('fuck')
        console.log(this.gameCardList)
        console.log(this.gameCardList.length)
        if (this.gameCardList.length > 0) {
          return '../../static/cards/' + this.gameCardList[this.gameCardList.length - 1] + '.png'
        } else {
          return '../../static/cards/0.png'
        }
      },
    },
    methods: {
      ...mapActions([
        'changeTurn',
      ]),
      playCard () {
        if (this.eventListener) {
//          if () {
          this.$socket.emit('playCard')
//          }
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
    border-radius: 10px;
    margin: 2vh 0;
  }

  .direction {
    margin: 3vh 0;
    font-size: 30px;
  }

  .disabled {
    background-color: #A9A9A9;
    -webkit-filter: grayscale(80%);
    filter: grayscale(80%);
  }

  .deckCard {
    display: inline-block;
  }

  .playerArea {
    margin: 4vh;
  }

  .playerCard {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    display: inline-block;
    margin: 0 2vh;
  }

  .nickname {
    margin-top: 10px;
    font-size: 15px;
    display: block;
  }

  .cardnum {
    font-size: 40px;
    margin: auto;
    display: block;
  }

  .myTurn {
    background-color: lightcoral;
  }

  img {
    width: 30%;
    height: 30%;
    margin: 4vh;
  }

</style>
