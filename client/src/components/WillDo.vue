<template>
     <div class="board-item">
        <div class="board-item-content">
            <span>
                <p v-if="this.inputStatus == false">{{taskKey}}</p>
                 <span class="tag is-link">{{task}}</span>
                <input v-model="updatingTask" v-if="this.inputStatus == true" class="input" :placeholder="taskKey">
            </span><br><br>
                <button v-if="this.inputStatus == false" @click="wantToUpdateTask()" class="button">
                    <p>Edit</p>
                </button>
                 <button v-if="this.inputStatus == true" @click="cancelUpdate()" class="button">
                    <p>Cancel</p>
                </button>
                 <button v-if="this.inputStatus == true" @click="updateTask(task,taskKey)" class="button">
                    <p>Confirm</p>
                </button>
                <button v-if="this.inputStatus == false" @click="moveToDone(task,taskKey)" class="button">
                    <span class="icon is-small">
                        <i class="fas fa-angle-double-right"></i>
                    </span>
                </button>
                 <button v-if="this.inputStatus == false" @click="deleteWillDo(taskKey)" class="button">
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
    props:[
        'task',
        'taskKey'
    ],
    methods:{
        moveToDone(task,taskKey){
            Database.ref('/todo').child('done/'+taskKey).set({category:task})
            Database.ref('/todo').child('willdo/'+taskKey).remove()
        },
        updateTask(task,taskKey){
            let newtask = this.updatingTask
            Database.ref('/todo').child('willdo/'+this.updatingTask).set({category:task})
            Database.ref('/todo').child('willdo/'+taskKey).remove()
            this.inputStatus = false
            this.updatingTask = ''
        },
        wantToUpdateTask(){
            this.inputStatus = true
        },
        cancelUpdate(){
            this.inputStatus = false
        },
        deleteWillDo(val){
            Database.ref('/todo').child('willdo/'+val).remove()
        },
    }
}
</script>


<style scoped>



</style>
