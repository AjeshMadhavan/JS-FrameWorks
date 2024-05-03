<template>
    <div class="quizResult">
        <div class="qResultHeader">
            <button @click="showStats = true" :class="showStats && 'selected'">Stats</button>
            <button @click="showStats = false" :class="!showStats && 'selected'">QNA</button> 
        </div>
        <div class="qResultBody">  
            <div class="qStats" v-if="showStats === true">
                <div class="qStatsBody">
                    <h1>Learning is a journey. Keep going, and you'll get there.</h1>
                    <h2>Grade: {{ grade }}</h2>
                    <h3>Total Questions: {{ totalQ }}</h3>
                    <h3>Correct Answers: {{ score }}</h3>
                    <h3>Your Score: {{percent}}%</h3>
                    <h3>Passing Store: 60%</h3>
                    <h3>Time Taken: {{hourVal ? '0' : ''}}{{timeTaken.hour}}h {{minuteVal ? '0' : ''}}{{timeTaken.minute}}m {{secondVal ? '0' : ''}}{{timeTaken.second}}s</h3>
                </div>
                <div class="qStatsFooter">
                    <button class="playAgain" @click="playAgain">Play Again</button>
                    <button class="home" @click="goHome">Back to Home</button>
                </div>
            </div>
            <div class="qa" v-else>
                <table >
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Questions</th>
                            <th>Your Answer</th>
                            <th>Correct Answer</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="(res, index) in result" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ res.question }}</td>
                            <td>{{ res.ans }}</td>
                            <td>{{ res.correctAns }}</td>
                            <td>{{ res.score }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue'
export default{
    props: ['data', 'totQ', 'totTimeTaken'],
    setup(props, context) {
        const showStats = ref(true);
        const result = ref(props.data)
        const score = ref(0)
        const totalQ = ref(props.totQ)
        // const totCorrect = ref(0)
        const percent = ref(0)
        const grade = ref('')
        const timeTaken = ref(props.totTimeTaken)

        result.value.map(x => {
            if(x.score == 1){
                // totCorrect += 1
                score.value += 1
            }

        })

        percent.value = Math.round((score.value*100) / totalQ.value)

        if(percent.value >= 90){
            grade.value = 'A'
        } else if(percent.value >= 80 && percent.value < 90 ){
            grade.value = 'B'
        } else if(percent.value >= 70 && percent.value < 80) {
            grade.value = 'C'
        } else if(percent.value >= 60 && percent.value < 70){
            grade.value = 'D'
        } else if(percent.value >= 40 && percent.value < 60){
            grade.value = 'E'
        } else {
            grade.value = 'F'
        }

        const hourVal = computed(() => {
            return timeTaken.value.hour <= 9
        })
        const minuteVal = computed(() => {
            return timeTaken.value.minute <= 9
        })
        const secondVal = computed(() => {
            return  timeTaken.value.second <= 9
        })

        function goHome() {
            context.emit('goHome', '')
        }

        function playAgain() {
            context.emit('playAgain', '')
        }

        return {showStats, result, grade, totalQ, score, percent, timeTaken, hourVal, minuteVal, secondVal, goHome, playAgain}
    }
}
</script>

<style scoped>
.quizResult {
    width: 80%;
    margin: 0 auto;
}
.qResultHeader {
    display: flex;
    border: 1px solid rgba(34, 36, 38, 0.15);
    /* background-color: #fff; */
    border-radius: 4px;
    margin-bottom: 14px;
}
.qResultHeader button{
    width: 50%;
    padding: 13px 0;
    font-size: 14px;
    border: none;
    cursor: pointer;
    background-color: #fff;
    border-right: 1px solid rgba(34,36,38,0.15);
}
.selected{
    background-color: rgba(0,0,0,0.05) !important;
}
.qResultHeader button:last-child{
    border-right: none;
}
.qStats {
    padding: 14px;
    border-radius: 4px;
    border: 1px solid rgba(34,36,38,0.15);
}
.qStatsBody h1, .qStatsBody h2, .qStatsBody h3{
    background-color: #f3f4f5;
    border: 1px solid #d4d4d5;
    border-radius: 4px;
    padding: 11px 14px;
    margin-top: 25px;
    margin-bottom: 14px;
}
.qStatsBody h1{
    font-size: 28px;
    margin-top: 0;
}
.qStatsFooter{
    text-align: left;
    margin-bottom: 8px;
}
.qStatsFooter button{
    border: none;
    color: snow;
    padding: 15px 30px;
    border-radius: 4px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    background-color: #00b5ad;
}
.playAgain{
    background-color: #2185d0 !important;
    margin-right: 15px;
}


table{
    border: 1px solid rgba(34,36,38,0.15);
    border-radius: 4px;
}
thead tr{
    background-color: #f9fafb;
}
th{
    padding: 14.3px 12.1px;
    font-size: 15.4px;
    border-left: 1px solid rgba(34, 36, 38, 0.15);
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
}
th:first-child{
    border-left: none;
}
tbody tr{
    text-align: left;
}
td{
    padding: 12.1px;
    font-size: 15.4px;
    border-left: 1px solid rgba(34, 36, 38, 0.15);
}
tbody td{
    border-top: 1px solid rgba(34, 36, 38, 0.15);
    border-left: 1px solid rgba(34, 36, 38, 0.15);
}

tbody tr td:first-child{
    border-left: none;
}

tbody tr:first-child td{
    border-top: none;
}

tbody tr:nth-child(even){
    background-color: #f9fafb;
}

tbody tr:hover{
    background-color: rgba(0,0,0,0.05) !important;
}
</style>    