<template>
    <div>
        <QuizHeader/>
        <QuizMain/>
        
    </div>
</template>
<script>
import QuizHeader from './QuizHeader'
import QuizMain from './QuizMain'
// import QuizResult from './QuizResult'
export default {
    components: {QuizHeader, 
        QuizMain}
}
</script>