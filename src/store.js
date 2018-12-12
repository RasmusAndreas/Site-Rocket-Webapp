import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);
axios.defaults.baseURL = 'http://sovid.dk';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token' || null),
    websites: [],
    user: null,
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
    },
    destroyToken(state) {
      state.token = null;
      state.websites = null;
      state.user = null;
    },
    addWebsite(state, website) {
      state.websites.push(website);
    },
    saveUser(state, user) {
      state.user = user;
    },
    updateUser(state, user) {
      state.user = user;
    },
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
    saveUser(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
      axios.get('/api/user').then(user => {
        context.commit('saveUser', user.data);
      }).catch(error => {
        // eslint-disable-next-line
        console.log(error);
      })
    },
    getWebsites(context) {
      return new Promise((resolve, reject) => {
        axios.get('/api/everything', { headers: { Authorization: 'Bearer '.concat(this.state.token) } })
        .then(response => {
          context.commit('getWebsites', response.data);
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    signup(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/api/register', {
          grant_type: 'password',
          client_id: '2',
          client_secret: 'tMGzy0M2XBkPsrQQDGZSpJWuzqB1IuVVO9I6fOlV',
          email: credentials.email,
          password: credentials.password,
          name: credentials.name,
        }).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateUser(context, credentials) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
      return new Promise((resolve, reject) => {
        axios.patch('/api/user/update', {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          passwordRepeat: credentials.passwordRepeat,
          oldPassword: credentials.oldPassword,
        }).then(response => {
          context.commit('updateUser', response.data);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    destroyToken(context) {
      if (context.getters.loggedIn) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

        return new Promise((resolve, reject) => {
          axios.post('/api/logout', {

          })
          .then((response) => {
            localStorage.removeItem('token');
            context.commit('destroyToken');
            resolve(response);
          }).catch(error => {
            localStorage.removeItem('token');
            context.commit('destroyToken');
            reject(error);
          })
        })
      }
    },
    addWebsite(context, websitedata) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

      return new Promise((resolve, reject) => {
        axios.post('/api/websites', {
          websiteName: websitedata.websiteName,
          domain: websitedata.domain,
          featureSettings: websitedata.featureSettings,
          reportLink: websitedata.reportLink
        }).then(response => {
          context.commit('addWebsite', response.data);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      });
    },
    getWebsite(context, id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

      return new Promise((resolve, reject) => {
        axios.post('/api/getAllWebsite', {
          websiteid: id
        }).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
})
