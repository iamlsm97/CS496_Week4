<template>
  <Layout>
    <div>
      <b-form-select v-model="selected" :options="options" class="mb-3">
      </b-form-select>
      <div>Selected: <strong>{{ selected }}</strong></div>
    </div>

    <div @keyup.space="sendRequest"></div>

  </Layout>
</template>

<script>
  import Layout from './Layout'
  import { mapState } from 'vuex'

  export default {
    components: {
      Layout,
    },
    data () {
      return {
        rooms: [],
        selected: null,
        options: [
          {
            text: 'Please select some item',
            value: null,
          },
          {
            text: 'Royals',
            value: 'Royals',
          }, {
            text: 'Doubles',
            value: 'Doubles',
          }, {
            text: 'Consecutives',
            value: 'Consecutives',
          }, {
            text: 'This one is disabled',
            value: 'd',
            disabled: true,
          }],
      }
    },
    methods: {
      sendRequest: function () {
        this.axios.get('/api/roomlist')
          .then((response) => {
            this.rooms = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
    },
    created () {
      /* this.axios.get('/api/roomlist')
        .then((response) => {
          this.rooms = response.data
        })
        .catch(function (error) {
          console.log(error)
        })*/
    },
    computed: {
//      rooms: () => {
//        this.axios.get('/api/roomlist')
//          .then((response) => {
//            return response.data
//          })
//          .catch(function (error) {
//            console.log(error)
//          })
//      },
      ...mapState({
        nickname: 'nickname',
      }),
    },
  }
</script>

<style scoped>

</style>
