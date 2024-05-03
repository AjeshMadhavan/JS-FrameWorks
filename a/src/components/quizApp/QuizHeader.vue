<template>
    <div id="quizHeader">
        <h3>QuizApp</h3>
        <button>Install App</button>
    </div>
</template>

<script > 
    // import {ref, } from 'vue'

    export default {}
</script>

<style scoped>
    #quizHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* padding: 13px; */
        background-color: #1b1c1d;
        color: snow;
        border-radius: 4px;
        padding: 13px 16px;
        margin-bottom: 14px;
    }
    #quizHeader h3{
        font-size: 28px; 
        font-weight: 700;
        color: rgba(255,255,255,0.9);
    }
    #quizHeader button{
        background-color: #00b5ad;
        border: none;
        padding:11px 25px;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        line-height: 14px;
        border-radius: 3px;
    }
</style>