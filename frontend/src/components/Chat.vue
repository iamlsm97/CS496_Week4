<template>
  <div class="chat">
    <div class="buttons">

      <button class="btn btn-primary btn-buttons" @click="exitRoom" :disabled="!joined">Exit Room</button>
      <button class="btn btn-primary btn-buttons" @click="startGame"
              :disabled="!joined || numUsers != 3 || ruleOption == null">Game Start
      </button>
      <div v-if="roomOwner">
        <b-input-group left="Rule">
          <b-form-select v-model="selected" :options="options" @change.native="optionSelected" class="mb-3">
          </b-form-select>
        </b-input-group>
      </div>
      <div v-else>
        Rule: <strong>{{ ruleOption }}</strong>
      </div>
    </div>
    <div class="chatSide">
      <div class="chatArea">
        <ul class="messages"></ul>
      </div>
      <div class="input-group">
        <input class="form-control inputMessage" placeholder="Type here..." v-model="message" @keydown.13="hitEnter"
               @input="onType" :disabled="!joined"/>
        <div class="input-group-btn">
          <button class="btn btn-primary" @click="sendMessage" :disabled="!joined">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'

  const FADE_TIME = 150 // ms
  const TYPING_TIMER_LENGTH = 1000 // ms
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
    data () {
      return {
        connected: true,
        message: '',
        typing: false,
        lastTypingTime: '',
        selected: null,
        ruleOption: null,
        options: [
          {
            text: 'Select a rule',
            value: null,
            disabled: true,
          }, {
            text: 'Doubles',
            value: 'Doubles',
          }, {
            text: 'Consecutives',
            value: 'Consecutives',
          }, {
            text: 'Doubles and Consecutives',
            value: 'Doubles and Consecutives',
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
    computed: {
      ...mapState({
        nickname: 'nickname',
        roomID: 'roomID',
        roomTitle: 'roomTitle',
        joined: 'joined',
        roomOwner: 'roomOwner',
        numUsers: 'numUsers',
        destroyedState: 'destroyedState',
      }),
    },
    sockets: {
      // Whenever the server emits 'login', log the login message
      login: function (data) {
        this.connected = true
        $('.messages').empty()
        if (data.rule) {
          this.ruleOption = data.rule
        }
        // Display the welcome message
        const message = 'Welcome to ERS+ Chat – '
        this.log(message, {
          prepend: true,
        })
        this.addParticipantsMessage(data)
      },

      moveToGame: function () {
        if (this.roomOwner) {
          this.$socket.emit('gameStart', {
            roomID: this.roomID,
          })
        }
        this.$router.push('/game/' + this.roomID)
      },

      // Whenever the server emits 'new message', update the chat body
      newMessage: function (data) {
        this.addChatMessage(data)
      },

      // Whenever the server emits 'user joined', log it in the chat body
      userJoined: function (data) {
        this.log(data.nickname + ' joined')
        this.addParticipantsMessage(data)
        this.changeNumUsers(this.numUsers + 1)
      },

      // Whenever the server emits 'user left', log it in the chat body
      userLeft: function (data) {
        this.log(data.nickname + ' left')
        this.addParticipantsMessage(data)
        this.removeChatTyping(data)
        this.changeNumUsers(this.numUsers - 1)
      },
      // if room destroyed
      roomDestroyed: function () {
        this.changeJoined(false)
        this.changeRoomID('')
        this.changeNumUsers(0)
        this.$socket.emit('exitRoom', {
          roomOwner: false,
          roomID: this.roomID,
        })
        this.changeDestroyedState(true)
        this.$router.push('/roomlist')
      },
      // Whenever the server emits 'typing', show the typing message
      typing: function (data) {
        this.addChatTyping(data)
      },

      // Whenever the server emits 'stop typing', kill the typing message
      stopTyping: function (data) {
        this.removeChatTyping(data)
      },

      ruleSelected: function (rule) {
        this.ruleOption = rule
      },

      disconnect: function () {
        this.log('you have been disconnected')
      },

      reconnect: function () {
        this.log('you have been reconnected')
        if (this.nickname) {
          this.$socket.emit('register', {
            nickname: this.nickname,
          })
          this.$socket.emit('addUser', this.nickname)
        }
      },

      reconnectError: function () {
        this.log('attempt to reconnect has failed')
      },
    },
    methods: {
      ...mapActions([
        'changeRoomID',
        'changeJoined',
        'changeNumUsers',
        'changeRoomOwner',
        'changeDestroyedState',
      ]),
      exitRoom () {
        this.$socket.emit('exitRoom', {
          roomOwner: this.roomOwner,
          roomID: this.roomID,
        })
        this.changeJoined(false)
        $('.messages').empty()

        this.changeNumUsers(0)
        if (this.roomOwner) {
          this.changeRoomOwner(false)
          this.axios.delete('/api/roomlist/' + this.roomID).then((response) => {
            console.log('room deleted')
          })
            .catch(function (error) {
              console.log(error)
            })
        }
        this.changeRoomID('')
        this.$router.push('/roomlist')
      },
      optionSelected (event) {
        this.$socket.emit('ruleSelected', event.target.value)
      },
      startGame () {
        this.axios.put('/api/roomlist/' + this.roomID, {
          rule: this.ruleOption,
          open: false,
        })
          .then((response) => {
            console.log('Success!')
          })
          .catch(function (error) {
            console.log(error)
          })
        this.$socket.emit('gS', {
          roomID: this.roomID,
        })
      },
      addParticipantsMessage (data) {
        let message = ''
        if (data.numUsers === 1) {
          message += "there's 1 participant"
        } else {
          message += 'there are ' + data.numUsers + ' participants'
        }
        this.log(message)
      },

      // Sets the client's nickname
      setnickname () {
        // Tell the server your nickname
        this.$socket.emit('addUser', this.nickname)
      },

      // Sends a chat message
      sendMessage () {
        let message = this.message
        // Prevent markup from being injected into the message
        message = this.cleanInput(message)
        // if there is a non-empty message and a socket connection
        if (message && this.connected) {
          this.message = ''
          this.addChatMessage({
            nickname: this.nickname,
            message: message,
          })
          // tell server to execute 'new message' and send along one parameter
          this.$socket.emit('newMessage', message)
        }
      },

      // Log a message
      log (message, options) {
        const $el = $('<li>').addClass('log').text(message)
        this.addMessageElement($el, options)
      },

      // Adds the visual chat message to the message list
      addChatMessage (data, options) {
        // Don't fade the message in if there is an 'X was typing'
        const $typingMessages = this.getTypingMessages(data)
        options = options || {}
        if ($typingMessages.length !== 0) {
          options.fade = false
          $typingMessages.remove()
        }

        const $nicknameDiv = $('<div class="nickname"/>')
          .text(data.nickname)
          .css('color', this.getnicknameColor(data.nickname))
          .css('margin-top', '8px')
          .css('margin-bottom', '5px')
          .css('display', 'block')

        const $messageBodyDiv = $('<span class="messageBody">')
          .text(data.message)
          .css('background-color', '#E0EDFF')
          .css('border-radius', '5px')
          .css('padding', '5px 12px')

        const typingClass = data.typing ? 'typing' : ''
        const $messageDiv = $('<li class="message"/>')
          .data('nickname', data.nickname)
          .addClass(typingClass)
          .append($nicknameDiv, $messageBodyDiv)
          .css('text-align', 'left')

        this.addMessageElement($messageDiv, options)
      },

      // Adds the visual chat typing message
      addChatTyping (data) {
        data.typing = true
        data.message = 'is typing'
        this.addChatMessage(data)
      },

      // Removes the visual chat typing message
      removeChatTyping (data) {
        this.getTypingMessages(data).fadeOut(function () {
          $(this).remove()
        })
      },

      // Adds a message element to the messages and scrolls to the bottom
      // el - The element to add as a message
      // options.fade - If the element should fade-in (default = true)
      // options.prepend - If the element should prepend
      //   all other messages (default = false)
      addMessageElement (el, options) {
        const $el = $(el)

        // Setup default options
        if (!options) {
          options = {}
        }
        if (typeof options.fade === 'undefined') {
          options.fade = true
        }
        if (typeof options.prepend === 'undefined') {
          options.prepend = false
        }

//         Apply options
        if (options.fade) {
          $el.hide().fadeIn(FADE_TIME)
        }
        if (options.prepend) {
          $('.messages').prepend($el)
        } else {
          $('.messages').append($el)
        }
        $('.messages').animate({ scrollTop: $('.messages').prop('scrollHeight') }, 300)
      },

      // Prevents input from having injected markup
      cleanInput (input) {
        return $('<div/>').text(input).text()
      },

      // Updates the typing event
      updateTyping () {
        if (this.connected) {
          if (!this.typing) {
            this.typing = true
            this.$socket.emit('typing')
          }
          this.lastTypingTime = (new Date()).getTime()

          setTimeout(function () {
            const typingTimer = (new Date()).getTime()
            const timeDiff = typingTimer - this.lastTypingTime
            if (timeDiff >= TYPING_TIMER_LENGTH && this.typing) {
              this.$socket.emit('stopTyping')
              this.typing = false
            }
          }.bind(this), TYPING_TIMER_LENGTH)
        }
      },

      // Gets the 'X is typing' messages of a user
      getTypingMessages (data) {
        return $('.typing.message').filter(function (i) {
          return $(this).data('nickname') === data.nickname
        })
      },

//       Gets the color of a nickname through our hash function
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

      hitEnter () {
        if (this.nickname) {
          this.sendMessage()
          this.$socket.emit('stopTyping')
          this.typing = false
        } else {
          this.setnickname()
        }
      },
      onType () {
        this.updateTyping()
      },
    },
  }
</script>

<style scoped>
  .chatArea {
    border: 1px solid;
    border-radius: 10px;
  }

  .buttons {
    margin: 2vh 0;
  }

  .btn-buttons {
    width: 49%;
  }

  .input-group {
    margin: 2vh 0;
  }

  .messages {
    list-style-type: none;
    padding: 10px;
    height: 350px;
    overflow-y: auto;
  }

  button:disabled, input:disabled {
    background: #777777;
  }
</style>
