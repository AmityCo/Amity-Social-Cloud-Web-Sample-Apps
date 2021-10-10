import Vue from 'vue'
import VueX from 'vuex'

import ASCClient, {
  FileRepository,
  PostRepository,
} from '@amityco/js-sdk'

const apiKey = "b0ecb95f6fd3a333493e8a1c540b158ad75c8de1bb333a2e";

const client = ASCClient.create({ apiKey });
Vue.use(VueX)

export default new VueX.Store({
  state: () => ({
    user: null,
  }),
  
  actions: {
    async login({ commit }, userId) {
      await new Promise(resolve => {
        client.once("connectionStatusChanged", resolve)
        client.registerSession({ userId })
      })
      Vue.$cookies.set('userId', userId)
      client.currentUser.on('dataUpdated', (model)=>{commit('setUser', model)})
      commit('setUser', client.currentUser.model)
    },
    async updateUserInfo({commit}, userInfo){
      client.updateCurrentUser(userInfo);
      // if(userInfo.displayName) client.setDisplayName(userInfo.displayName);
      // if(userInfo.description) client.setDescription(userInfo.description);
    },
    async createPost({ state, commit }, { text, file }) {
      const { fileId } = await FileRepository.uploadFile({ file })

      await new Promise(resolve => {
        const post = PostRepository.createPost({
          targetId: state.user.userId,
          targetType: 'user',
          data: { text, images:[fileId] }
        })

        post.once('dataUpdated', () => resolve())
      })
    },

  },

  mutations: {
    setUser(state, user) {
      Vue.$cookies.set('userId', user.userId)
      state.user = user
    }
  },
});
