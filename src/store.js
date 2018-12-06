import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);
axios.defaults.baseURL = 'http://sovid.dk';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token' || null),
    websites: [],
  },
  getters: {
    loggedIn(state) {
      return state.token != null
    },
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    getWebsites(state, websites) {
      state.websites = websites;
    }
  },
  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/oauth/token', {
          grant_type: 'password',
          client_id: '2',
          client_secret: 'tMGzy0M2XBkPsrQQDGZSpJWuzqB1IuVVO9I6fOlV',
          username: credentials.email,
          password: credentials.password
        }).then(response => {
          const token = response.data.access_token
          localStorage.setItem('token', token);
          context.commit('retrieveToken', token);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getWebsites(context) {
      return new Promise((resolve, reject) => {
        axios.get('/api/websites', { headers: { Authorization: 'Bearer '.concat(this.state.token) } })
        .then(response => {
          context.commit('getWebsites', response.data);
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})
