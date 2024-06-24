<template>
    <div>
        <div class="headerTodo">
            <input type="text" placeholder="Enter TODO" v-model="todoTitle">
            <button @click="addTodo">Add TODO</button>
        </div>
        <div v-for="todo in todoList" :key="todo.title">
            <ListTodo :todo="todo" @complete="complete" @editValue="changeVal" @deleteTodo="deleteTodo"/>
        </div>
    </div>
</template>
<script>
import {ref } from 'vue'
import ListTodo from './ListTodo'
export default {
    setup(){
        const todoTitle = ref('')
        let todoList = ref([])

        function addTodo(){
            if(todoTitle.value !== ''){
                todoList.value.push({
                    title: todoTitle.value,
                    isComplete: false,
                })
                console.log(todoList)
                todoTitle.value = ''
            }
            // context.emit('todoList', todoList.value)
        }
        
        function complete(val){
            todoList.value = todoList.value.map((x) => {
                if(x.title === val) {
                    return {title: val, isComplete: !x.isComplete}
                } else {
                    return x
                }
            })
            console.log(todoList.value)
        }

        function changeVal(nVal, oVal){
            todoList.value = todoList.value.map((x) => {
                if(x.title === oVal){
                    console.log('yeah it is equal', nVal)
                    return { title: nVal, isComplete: x.isComplete}
                } else {
                    console.log('no not equal')
                    return x
                }
            })
        }

        function deleteTodo(val){
            console.log(todoList.value)
           todoList.value = todoList.value.filter((x) => x.title !== val)
        }
        return { addTodo, todoTitle, todoList, complete, changeVal, deleteTodo }
    },
    components: {ListTodo, }
}
</script>

<style scoped >
.headerTodo{
    display: flex;
    column-gap: 20px;
    justify-content:center;
    margin: 20px 0;
} 
.headerTodo input{
    padding: 5px 5px;
    border-radius: 5px;
    outline: none;
    font-size: 18px;
}
.headerTodo button {
    font-size: 16px;
    border-radius: 5px;
    padding:  8px 10px;
    background-color: antiquewhite;
    color: brown;
    font-weight: 600;
}
</style>