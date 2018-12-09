<template>
    <div class="hero-addTask">
        <section class="hero is-warning">
            <div class="hero-body">
                <div class="container">
                    <div class="card">
                        <div class="card-content">
                            <div class="content">
                                <div class="columns">
                                    <div class="column">
                                        <div class="control has-icons-left has-icons-right">
                                            <input v-model="newTask" class="input is-large" type="search" placeholder="Write new task here :)" /><br><br>
                                            <span class="icon is-medium is-left">
                                                <i class="fa fa-plus"></i>
                                            </span>
                                        </div>
                                    </div><br>
                                    <div class="column">
                                        <div class="control has-icons-left has-icons-right">
                                            <input v-model="category" class="input is-large" type="search" placeholder="Category" /><br><br>
                                            <span class="icon is-medium is-left">
                                                <i class="fa fa-home"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p v-if="this.warning == true">Please fill out both fields</p>
                                    <button @click="addNewTask" class="button">
                                    <i class="fa fa-plus"></i> 
                                        Add New Task
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    components:{

    },
    data:function(){
        return{
            newTask:'',
            category:'',
            warning:false
        }
    },
    methods:{
        addNewTask(){
            if(this.newTask == '' || this.category == ''){
                this.warning = true
            }else{
                firebase.database().ref('/todo').child('willdo/'+this.newTask).set({category:this.category})
                this.newTask =''
                this.category =''
                this.warning = false
            }
           
        },
    }
}
</script>

<style>

</style>
