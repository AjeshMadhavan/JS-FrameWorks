<template>
    <div>
    <div class="quizMain" v-if="!showQuestions">
        <div class="quizMainImg">
            <img src="../../assets/img/quiz.svg">
        </div>
        <div class="quizMainContent">
            <h1>The Ultimate Trivia Quiz</h1>
            <hr class="divider"/>
            <div>
                <ul class="quizMainUl">
                    <li>
                        <p>In Which category do you want to play quiz?</p>
                        <select v-model="params.category">
                            <option value="">Any Category</option>
                            <option value="9">Genaral Knowledge</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="17">Science & Nature</option>
                        </select>
                    </li>
                    <li>
                        <p>How Many Questions do you want in quiz?</p>
                        <select v-model="params.amount">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </li>
                    <li>
                        <p>How difficult do you want your quiz to be?</p>
                        <select v-model="params.difficulty">
                            <option value="">Any Difficult</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </li>
                    <li>
                        <p>Which type of questions do you want in quiz?</p>
                        <select v-model="params.type">
                            <option value="">Any type</option>
                            <option value="multiple">Multiple Choice</option>
                            <option value="boolean">True / False</option>
                        </select>
                    </li>
                    <li class="timer">
                        <p>Please select the countdown time for your quiz.</p>
                        <div class="timer">
                            <select v-model="timer.hour">
                                <option>SELECT HOURS</option>
                                <option value="0">00</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                            </select>
                            <select v-model="timer.minute"> 
                                <option>SELECT MINUTES</option>
                                <option value="0">00</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                            </select>
                            <select v-model="timer.second">
                                <option>SELECT SECONDS</option>
                                <option value="0">00</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">06</option>
                            </select>
                        </div>
                    </li>
                </ul>
            </div>           
            <hr class="divider"/>     
            <button @click="apiGet" class="">Play Now</button>
        </div>
    </div>
    <!-- <div v-for="(val, index) in datas" :key="val.id"> -->
        <QuestionsListing  v-if="showQuestions" :timer="timer" :value="currentQuestion" :len="index+1" :length="questionLength" @nextQuestion="nextQuestion" @goHome="goHome" @playAgain="playAgain"/>
        
    <!-- </div> --> 
</div>    
</template>

<script>
import axios from 'axios'
import {ref,} from 'vue'
import  QuestionsListing from './QuestionsListing'

    export default {
        components: {QuestionsListing,},
        setup(){
            const baseURL = ref('https://opentdb.com/api.php?')
            const params = ref({amount: '5', category: '', difficulty: '', type: ''})
            const urlVal = ref('')
            const showQuestions = ref(false)
            const datas = ref([])
            const questionLength = ref(0)
            const index = ref(0)
            const currentQuestion = ref({})
            const timer = ref({hour: 0, minute: 10, second: 0})

            // function apiGet(){

            //     console.log('timer', timer.value)
            //     // console.log(params.value)
            //     let url = [];
            //     for(let i in params.value) {
            //         // console.log(params.value[i])
            //         if(params.value[i] !== ''){
            //             url.push(`${i}=${params.value[i]}`)
            //         }
            //     }
            //     urlVal.value = `${baseURL.value}${url.join('&')}`
            //     // console.log(urlVal.value)
                
            //     axios.get(urlVal.value)
            //     .then((response) => {
            //         // console.log(response)
            //         if(response.data.results.length > 0) {
            //             index.value= 0;
            //             datas.value = response.data.results 
            //             showQuestions.value = true
            //             questionLength.value = response.data.results.length
            //             currentQuestion.value = response.data.results[index.value]
            //             console.log(datas.value)
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error)  
            //     })
            // }

            function apiGet(){
                return new Promise((resolve, reject) => {
              
                console.log('timer', timer.value)
                // console.log(params.value)
                let url = [];
                for(let i in params.value) {
                    // console.log(params.value[i])
                    if(params.value[i] !== ''){
                        url.push(`${i}=${params.value[i]}`)
                    }
                }
                urlVal.value = `${baseURL.value}${url.join('&')}`
                // console.log(urlVal.value)
                
                axios.get(urlVal.value)
                .then((response) => {
                    // console.log(response)
                    if(response.data.results.length > 0) {
                        index.value= 0;
                        datas.value = response.data.results 
                        showQuestions.value = true
                        questionLength.value = response.data.results.length
                        currentQuestion.value = response.data.results[index.value]
                        console.log(datas.value)
                        resolve(response.data.results)
                    }
                })
                .catch((error) => {
                    console.log(error)  
                    reject('its an reject error') 
                })
                })
            }

            function nextQuestion(){
                index.value = index.value + 1;
                currentQuestion.value = datas.value[index.value]
                // console.log('current Question', currentQuestion.value)
            }

            function goHome(){
                showQuestions.value = false;
            }
            
            function playAgain(){
                apiGet()
            }
            
            return {apiGet, params, showQuestions, datas, questionLength, currentQuestion, index, nextQuestion, goHome, playAgain, timer}
        }
    }
</script>

<style scoped>
.quizMain {
    border: 1px solid rgba(34,36,38,.15);
    display:flex;
    margin: 0 auto;
    width: 70%;
    column-gap: 21px;
    padding: 14px;
}
.quizMainImg img{
    width: 175px;
}
.quizMainContent{
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: start;
    text-align: left;
    width: 100%;
}
.quizMainContent h1{
    font-size: 28px;
    font-weight: 700;
    color: rgba(0,0,0,0.85);
}
.divider{
    margin: 14px 0;
    /* color: rgba(0,0,0,0.6); */
    color: red;
}
.quizMainContent ul{
    list-style-type: none;
}
.quizMain li{
    margin-bottom: 10px;
}
.quizMainUl p{
    margin-bottom: 7px;
    color: rgba(0,0,0,0.6);
    font-size: 14px;
}
.quizMainUl select{
    padding: 8px 14px;
    font-size: 14px;
    font-weight: 400;
    border: 1px solid rgba(34,36,38,.15);
    background-color: #FFF;
    border-radius: 4px;
    width: 100%;
}
.timer select{
    width: 30%;
    margin-right: 10px;
}
.quizMainContent button { 
    background-color: rgb(33, 133, 208);
    padding: 10px 27px ;
    border-radius: 4px;
    font-size: 18px;
    font-weight: 700;
    border: none;
    color: snow;
    cursor: pointer;
}
</style>