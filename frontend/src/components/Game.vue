<template>
  <Layout>
    <div class="gameArea" :class="{disabled: !eventListener}" @click="playCard">
      <div class="direction">click to play a card, press space to get cards</div>
      <div class="rule">Rule: {{rule}}</div>
      <div class="deckCard">
        <img :src="imageCalculator"/>
      </div>
      <div class="playerArea">
        <div class="playerCard" :class="{myTurn: turn===0}">
          <div class="nickname">{{userList[0]}}</div>
          <div class="cardnum">{{player0CardList.length}}</div>
        </div>
        <div class="playerCard" :class="{myTurn: turn===1}">
          <div class="nickname">{{userList[1]}}</div>
          <div class="cardnum">{{player1CardList.length}}</div>
        </div>
        <div class="playerCard" :class="{myTurn: turn===2}">
          <div class="nickname">{{userList[2]}}</div>
          <div class="cardnum">{{player2CardList.length}}</div>
        </div>
        <div class="playerCard" :class="{myTurn: turn===3}">
          <div class="nickname">{{userList[3]}}</div>
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

  const COLORS = [
    '#e21400',
    '#91580f',
    '#f8a700',
    '#f78b00',
    '#58dc00',
    '#287b00',
    '#a8f07a',
    '#4ae8c4',
    '#3b88eb',
    '#3824aa',
    '#a700ff',
    '#d300e7',
  ]

  export default {
    components: {
      Layout,
    },
    data () {
      return {
        rooms: [],
        selected: null,
        eventListener: false,
        userList: [],
        player0CardList: [],
        player1CardList: [],
        player2CardList: [],
        player3CardList: [],
        gameCardList: [],
        rule: '',
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
        this.userList = data.userList
        this.player0CardList = data.player0CardList
        this.player1CardList = data.player1CardList
        this.player2CardList = data.player2CardList
        this.player3CardList = data.player3CardList
        this.gameCardList = data.gameCardList
        this.rule = data.rule
        this.eventListener = true
      },
      hitWin: function (data) {
        this.player0CardList = data.player0CardList
        this.player1CardList = data.player1CardList
        this.player2CardList = data.player2CardList
        this.player3CardList = data.player3CardList
        this.gameCardList = data.gameCardList

        const $nicknameDiv = $('<span class="nickname"/>')
          .text(data.player)
          .css('color', this.getnicknameColor(data.player))

        const $messageBodyDiv = $('<span class="messageBody">')
          .text(' took cards')

        const $messageDiv = $('<li class="message"/>')
          .data('nickname', data.nickname)
          .append($nicknameDiv, $messageBodyDiv)

        $('.messages').append($messageDiv)
        $('.messages').animate({ scrollTop: $('.messages').prop('scrollHeight') }, 300)
      },
      hitDraw: function () {
      },
      hitLoss: function (data) {
        this.player0CardList = data.player0CardList
        this.player1CardList = data.player1CardList
        this.player2CardList = data.player2CardList
        this.player3CardList = data.player3CardList
        this.gameCardList = data.gameCardList

        const $nicknameDiv = $('<span class="nickname"/>')
          .text(data.player)
          .css('color', this.getnicknameColor(data.player))

        const $messageBodyDiv = $('<span class="messageBody">')
          .text(' did mistake')

        const $messageDiv = $('<li class="message"/>')
          .data('nickname', data.nickname)
          .append($nicknameDiv, $messageBodyDiv)

        $('.messages').append($messageDiv)
        $('.messages').animate({ scrollTop: $('.messages').prop('scrollHeight') }, 300)
      },
      userLeftGame: function (data) {
        this.player0CardList = data.player0CardList
        this.player1CardList = data.player1CardList
        this.player2CardList = data.player2CardList
        this.player3CardList = data.player3CardList
        this.gameCardList = data.gameCardList
        this.changeTurn(data.turn)
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

        const $nicknameDiv = $('<span class="nickname"/>')
          .text(data.player)
          .css('color', this.getnicknameColor(data.player))

        const $messageBodyDiv = $('<span class="messageBody">')
          .text(' is dead')

        const $messageDiv = $('<li class="message"/>')
          .data('nickname', data.nickname)
          .append($nicknameDiv, $messageBodyDiv)

        $('.messages').append($messageDiv)
        $('.messages').animate({ scrollTop: $('.messages').prop('scrollHeight') }, 300)
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

        const $nicknameDiv = $('<span class="nickname"/>')
          .text(data.player)
          .css('color', this.getnicknameColor(data.player))

        const $messageBodyDiv = $('<span class="messageBody">')
          .text(' win the game!')

        const $messageDiv = $('<li class="message"/>')
          .append($nicknameDiv, $messageBodyDiv)

        $('.messages').append($($messageDiv))
        $('.messages').animate({ scrollTop: $('.messages').prop('scrollHeight') }, 300)
      },
      turnChange: function (data) {
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
          if (this.turn === this.userList.indexOf(this.nickname)) {
            this.$socket.emit('playCard')
          }
        }
      },
      getnicknameColor (nickname) {
        // Compute hash code
        let hash = 7
        for (let i = 0; i < nickname.length; i++) {
          hash = nickname.charCodeAt(i) + (hash << 5) - hash
        }
        // Calculate color
        const index = Math.abs(hash % COLORS.length)
        return COLORS[index]
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
    font-size: 20px;
  }

  .rule {
    margin: 0;
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
    margin: 3vh;
  }

</style>
