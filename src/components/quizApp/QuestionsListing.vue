<template>
    <div>
       <div class="qBox" v-if="!showResult">
        <div class="qHeader">
            <h1>Question No.{{ cQuestion }} of {{ qLength }}</h1>
            <div>
                <button>{{ hourVal ? '0' : '' }}{{ countDown.hour }}</button>
                <button>{{ minuteVal ? '0' : '' }}{{ countDown.minute }}</button>
                <button>{{ secondVal ? '0' : '' }}{{ countDown.second }}</button>
            </div>
        </div>
        <div class="qBody">
            <h1>Q. {{ questions }}</h1>
            <h3>Please choose one of the following answers:</h3>
            <hr class="divider">
            <div v-if="qType==='multiple'">
                <div class="options" v-for="(opt, index) in options" :key="index">
                    <a @click="addAnswer(opt, index, $event)">
                        <b>{{ optionName[index] }}. </b> {{ opt }}
                    </a>
                </div>
            </div>
            <div v-else>
                <div class="options">
                    <a @click="addAnswer('True', 0, $event)">
                        <b>A. </b> True
                    </a>
                    <a @click="addAnswer('False', 1, $event)">
                        <b>B. </b> False
                    </a>
                </div>
            </div>
            <hr class="divider">
        </div>
        <div class="qFoot">
            <button @click="nextQuestion" :disabled="isDisabled">Next</button>
        </div>
        
    </div>
    <QuizResult v-if="showResult" :data="answered" :totQ="qLength" :totTimeTaken="totTimeTaken" @goHome="goHome" @playAgain="playAgain" />
</div>
</template>

<script>
import {ref, watch, computed} from 'vue'
import QuizResult from './QuizResult'
    export default {
        components: {QuizResult,},
        props: ['value', 'len', 'length', 'timer'],
        setup(props, context){
            const optIndex =  ref(Math.floor(Math.random()*4))
            const questions = ref(props.value.question)
            const options = ref(props.value.incorrect_answers)
            const qLength = ref(props.length)
            const cQuestion = ref(props.len)
            const optionName = ref(['A', 'B', 'C', 'D'])
            const answered = ref([])
            const showResult = ref(false)
            const isDisabled = ref(true)
            const countDown = ref(props.timer)
            const totalTime = ref({...props.timer})
            const totTimeTaken = ref({hours:0, minutes: 0, seconds: 0})

            const qType = ref(props.value.type)
            options.value.splice(optIndex.value, 0, props.value.correct_answer)
            
            let timerId = setInterval(() => {
                if(countDown.value.second - 1 <= 0 ){
                    if(countDown.value.minute - 1 === 0){
                        if(countDown.value.hour > 0){
                            if (countDown.value.hour - 1 === 0){
                                countDown.value.hour = 0;
                                countDown.value.minute = 59;
                                countDown.value.second = 59
                            } else {
                                countDown.value.hour = countDown.value.hour - 1
                                countDown.value.minute = 59;
                                countDown.value.second = 59
                            }
                        } else {
                            countDown.value.minute = 0;
                            countDown.value.second = 59;
                        }
                    } else {
                        if(countDown.value.minute -1 < 0){
                            countDown.value.second = 0;
                            // alert('time over')
                            publishResult();
                        } else {

                            countDown.value.minute = countDown.value.minute - 1
                            countDown.value.second = 59;
                        }
                    }
                } else {
                    countDown.value.second = countDown.value.second - 1
                }
            },1000)

            function timeTaken(){
                console.log(totalTime.value)
                let totConsumedSec = Number(countDown.value.hour * 3600) + Number(countDown.value.minute * 60) + Number(countDown.value.second)
                let totGivenSec = Number(totalTime.value.hour * 3600) + Number(totalTime.value.minute * 60) + Number(totalTime.value.second)

                let seconds = totGivenSec - totConsumedSec

                let totMinutes = Math.trunc(seconds/60)
                let totSeconds = seconds % 60
                let totHours = 0
                if(totMinutes > 59){
                    totHours = totMinutes / 60  
                    totMinutes = totMinutes % 60
                }

                console.log('tot given time', totalTime.value, totGivenSec, 's')
                console.log('total consumed time', countDown.value, totConsumedSec, 's')

                console.log({totHours,  totMinutes, totSeconds})
                totTimeTaken.value = {hour: totHours, minute: totMinutes, second: totSeconds}
            }

            function publishResult() {
                // let totConsumedSec = (countDown.value.hour * 3600) + (countDown.value.minute * 60) + countDown.value.second
                // let totGivenSec = (totalTime.value.hour * 3600) + (totalTime.value.minute * 60) + totalTime.value.second
              
                timeTaken()
                showResult.value = true
                clearInterval(timerId)
            }

            function nextQuestion(){
                // let classList = document.getElementsByClassName('bgColor');
                for(let x of document.getElementsByClassName('bgColor')){
                    x.classList.remove('bgColor')
                }

                isDisabled.value = true
                if(cQuestion.value === qLength.value){
                    publishResult()
                } else {
                    context.emit('nextQuestion', 'kjk')
                }
            }

            // const data = computed(() => {
            //     return props.value
            // })
            
            watch(() => props.value, (nVal) => {
                console.log('re renderes at watch')
                questions.value = nVal.question
                options.value = nVal.incorrect_answers
                let index = Math.floor(Math.random()*4);
                options.value.splice(index, 0, nVal.correct_answer)
                qType.value = nVal.type
                
            })

            const hourVal = computed(() => {
                return countDown.value.hour <= 9
            })

            const minuteVal = computed(() => {
                return  countDown.value.minute <= 9
            })

            const secondVal = computed(() => {
                return countDown.value.second <= 9
            })
            
            console.log(countDown.value.minute, hourVal , 'val ')


            const lenChange = computed(() => {
                return props.len
            })

            watch(lenChange, (nVal) => {
                cQuestion.value = nVal
                // if(nVal === qLength.value){
                //     showSubmit.value = true
                // }
            })

            function addAnswer(ans, index, event) {
                isDisabled.value = false
                // console.log('your Answer', ans)
                // console.log('question', questions.value)
                // console.log('correct ans', props.value.correct_answer)
                
                let classList = document.getElementsByClassName('bgColor');
                for(let x of classList){
                    x.classList.remove('bgColor')
                }
                
                event.target.classList.add('bgColor')

                let score = 0
                let updated = false
                console.log(index)

                if(ans === props.value.correct_answer){
                    score = 1
                }

                let val = {ans, question: questions.value, correctAns: props.value.correct_answer, score, countDown}

                answered.value = answered.value.map((x) => {
                        if(x.question === questions.value ){
                            updated = true
                            return val
                        } else {
                            return x
                        }
                })

                if(!updated) {
                    answered.value.push(val)
                }
                
                console.log(answered.value)
            }


            function goHome() {
                showResult.value = false
                context.emit('goHome', '')
            }

            function playAgain() {
                showResult.value = false
                answered.value = []
                context.emit('playAgain', '')
            }

            return { questions, options, cQuestion, qLength, optionName, nextQuestion, qType, addAnswer, showResult, answered, goHome, playAgain, isDisabled, countDown, totTimeTaken, hourVal, minuteVal, secondVal}
        }
    }
</script>
<style scoped>
    .qBox{
        border: 1px solid rgba(34,36,38,.15);
        border-radius: 4px;
        width: 70%;
        margin: 0 auto;
        padding: 14px;
    }
    .qHeader{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    .qHeader h1{
        padding: 11px 14px;
        font-size: 28px;
        font-weight: 700;
        border-radius: 4px;
        border: 1px solid #d4d4d5;
        background-color: rgb(243, 244, 245);
    }
    .qHeader div{
        display: flex;
        align-items: center;
        border: 1px solid rgba(34, 36, 38, 0.15);
        border-radius: 4px;
    }
    .qHeader div button{
        background-color: rgba(0,0,0,0.05);
        font-size: 24px;
        border: none;
        padding: 18px 36px;
        flex: 1 0 auto; 
        border-right: 1px solid rgba(34, 36, 38, 0.15);
    }
    .qHeader div button:last-child{
        border-right: 0;
    }
    .qBody{
        margin-top: 20px;
        text-align: left;
        display: flex;
        flex-direction: column;
    }
    .qBody h1{
        padding: 20px 30px;
        font-size: 20px;
        margin-bottom: 20px;
        background-color: #f8f8f9;
        text-align: left;
        border-radius: 4px;
        box-shadow: inset 0 0 0 1px rgba(34,36,38,.22),0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.15);
    }
    .qBody h3{
        margin-top: 20px;
        color: rgba(0,0,0,0.6);
    }
    .divider {
        margin: 14px 0;
        color: rgba(0,0,0,0.6);
    }
    .options{
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(34, 36, 38, 0.15)
    }
    .options a{
        padding: 16px 20px;
        font-size: 18px;
        font-weight: 400;
        cursor: pointer;
        border-bottom: 1px solid rgba(34, 36, 38, 0.15);
    }
    .options a:active{
        background-color: rgba(0,0,0,0.05);
    }
    .options a:last-child{
        border-bottom: none;
    }
    .qFoot{
        margin-top: 7px;
        text-align: right;
    }
    .qFoot button{
        padding: 10px 25px;
        background-color: #2185d0;
        border: none;
        color: snow;
        font-size: 18px;
        font-weight: 700;
        border-radius: 4px;
        cursor: pointer;
    }

    .qFoot button:disabled{
        background-color: #cce2f2;
        cursor: not-allowed;
    }

    .bgColor{
        background-color: rgba(0,0,0,0.05);
    }
</style>