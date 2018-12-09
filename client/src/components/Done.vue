<template>
     <div class="board-item">
        <div class="board-item-content">
            <span>
              <p v-if="this.inputStatus == false">{{doneKey}}</p>
               <span class="tag is-link">{{done}}</span>
              <input v-model="updatingTask" v-if="this.inputStatus == true" class="input" :placeholder="doneKey">
            </span><br><br>
                <button v-if="this.inputStatus == false" @click="wantToUpdateTask()" class="button">
                    <p>Edit</p>
                </button>
                 <button v-if="this.inputStatus == true" @click="cancelUpdate()" class="button">
                    <p>Cancel</p>
                </button>
                 <button v-if="this.inputStatus == true" @click="updateTask(doneKey,done)" class="button">
                    <p>Confirm</p>
                </button>
                <button v-if="this.inputStatus == false" @click="moveToWilldo(doneKey,done)" class="button">
                    <span class="icon is-small">
                        <i class="fas fa-angle-double-left"></i>
                    </span>
                </button>
                <button v-if="this.inputStatus == false" @click="deleteDone(doneKey)" class="button">
                    <span class="icon">
                        <i class="fas fa-trash"></i>
                    </span>
                </button>
        </div>
    </div>
</template>

<script>

import {Database}from  '../firebase'
export default {
    data:function(){
        return{
            updatingTask:'',
            inputStatus:false
        }
    },
    props:['done','doneKey'],
    methods:{
        moveToWilldo(val,valKey){
            Database.ref('/todo').child('willdo/'+val).set({category:valKey})
            Database.ref('/todo').child('done/'+val).remove()
        },
        deleteDone(val){
            Database.ref('/todo').child('done/'+val).remove()
        },
        updateTask(val,valkey){
            let newtask = this.updatingTask
            Database.ref('/todo').child('done/'+ this.updatingTask).set({category:valkey})
            Database.ref('/todo').child('done/'+val).remove()
            this.inputStatus = false
            this.updatingTask = ''
        },
        wantToUpdateTask(){
            this.inputStatus = true
        },
        cancelUpdate(){
            this.inputStatus = false
        }
    }
}
</script>


<style>
.board-item {
  margin: 5px 0;
  will-change: transform;
}

.board-item-content {
  word-wrap: normal;
  position: relative;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  font-size: 17px;
  text-align: center;
  cursor: pointer;
  -webkit-box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
  box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
  margin: 5px;
}
</style>