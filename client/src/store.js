import Vue from 'vue'
import Vuex from 'vuex'
import './firebase'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    willdo:'',
    done:''
  },
  mutations: {
    readWillDo(state,payload){
      console.log("PAYLOAD",payload)
      state.willdo = payload
    },
    readDone(state,payload){
      state.done = payload
    }
  },
  actions: { 
    filterCategory({commit,dispatch},payload){
      if(payload == "All Categories"){
        window.location.reload()
      }
      firebase.database().ref('todo').child('/willdo').on("value",function(snapshot){
        let objValues = snapshot.val()
        let objResult = {}
        for(let key in objValues){
          if(key!== "zzzzzzzzzzzzzzzzzz" && objValues[key].category== payload){
            objResult[key] =  objValues[key].category
          }
        }
        commit('readWillDo',objResult)
      })
      firebase.database().ref('todo').child('/done').on("value",function(snapshot){
        let objValues = snapshot.val()
        let objResult = {}
        for(let key in objValues){
          if(key!== "zzzzzzzzzzzzzzzzz" && objValues[key].category== payload){
            objResult[key] =  objValues[key].category
          }
        }
        commit('readDone',objResult)
      })
    },
    getWilldo({commit},payload){
      firebase.database().ref('todo').child('/willdo').on("value",function(snapshot){
        let objValues = snapshot.val()
        let objResult = {}
        for(let key in objValues){
          if(key!== "zzzzzzzzzzzzzzzzz"){
            objResult[key] = objValues[key].category
          }
        }
        commit('readWillDo',objResult)
      })
    },
    getDone({commit}){
      firebase.database().ref('todo').child('/done').on("value",function(snapshot){
        let objValues = snapshot.val()
        let objResult = {}
        for(let key in objValues){
          if(key!== "zzzzzzzzzzzzzzzzz"){
            objResult[key] = objValues[key].category
          }
        }
        commit('readDone',objResult)
      })
    },
  }
})
