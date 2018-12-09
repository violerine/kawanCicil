<template>
  <div class="home">
    <Navbar/>
    <Hero/><br><br>
    <div class="card container">
        <div class="card-content">
            <div class="category">
                <span v-for="(val,category,index) in categoryList" :key="index" class="tag is-link category-tag" @click="filterCategory(category)" >{{category}}</span>
            </div>
        </div>
    </div>
        <div class="content">
            <section class="container">
                <div class="columns  is-centered" id="sectioncontainer">
                    <div class="column">
                        <article class="message is-danger">
                            <div class="message-header">
                                <p>I'm going to do : </p>
                            </div>
                            <div class="message-body">
                                <div v-if="!willdo" class="lds-facebook"><div></div><div></div><div></div></div>
                                <WillDo v-for="(task,taskKey,index) in willdo" :key=index :taskKey=taskKey :task=task></WillDo>
                            </div>
                        </article>
                    </div>
                    <div class="column">
                        <article class="message is-success">
                            <div class="message-header">
                                <p>I have finished : </p>
                            </div>
                            <div class="message-body">
                                <div v-if="!done" class="lds-facebook2"><div></div><div></div><div></div></div>
                                <Done v-for="(done,doneKey,index) in done" :key="index" :doneKey="doneKey" :done="done"></Done>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        <div class="columns is-mobile is-centered">
            <div class="column is-half is-narrow"></div>
        </div>
        </div>
</div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
import '../firebase'
import firebase from 'firebase'
import WillDo from '@/components/WillDo.vue'
import Done from '@/components/Done.vue'
import Hero from '@/components/Hero.vue'
import { mapActions, mapState } from 'vuex'
import {Database}from  '../firebase'


export default {
  name: 'home',

  computed:{
      ...mapState([
          'willdo',
          'done'
      ])
  },
  beforeCreate:function(){
      this.loading = true
  },
  created:function(){
      this.loading = false
      this.getWilldo(),
      this.getDone(),
      this.getCategory()
  },
  components: {
    Navbar,
    WillDo,
    Done,
    Hero,
  },
  data:function(){
      return{
          categoryList:{},
          loading:true
      }
  },
  methods:{
    ...mapActions([
        'getWilldo',
        'getDone',
        'filterCategory'
    ]),
    getCategory(){
    let objResult = {}
    objResult['All Categories'] = ''
     firebase.database().ref('todo').child('/willdo').on("value",function(snapshot){
        let objValues = snapshot.val()
        for(let key in objValues){
          if(key !== "zzzzzzzzzzzzzzzzz"){
            objResult[objValues[key].category] = ''
          }
        }
    })
    firebase.database().ref('todo').child('/done').on("value",function(snapshot){
        let objValues = snapshot.val()
        for(let key in objValues){
          if(key !== "zzzzzzzzzzzzzzzzz"){
            objResult[objValues[key].category] = ''
          }
        }
      })
      this.categoryList = objResult
      console.log(this.categoryList)
    }
  }
}
</script>

<style scoped>
.category-tag{
    margin: 5px;
}
.card{
    margin-bottom: 30px;
}

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: rgb(255, 177, 190);
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
}


.lds-facebook2 {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-facebook2 div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: rgb(120, 216, 144);
  animation: lds-facebook2 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook2 div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}
.lds-facebook2 div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}
.lds-facebook2 div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
}
@keyframes lds-facebook2 {
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
}



</style>

