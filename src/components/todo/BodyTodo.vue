<template>
    <div>
        <div v-for="todo in todoList" :key="todo.title" id="todoItem">
            <!-- <h3 v-if="!isEditable">{{ todo.title }}</h3>
            <h3 v-else>Else part</h3>
            <input v-else type="text" placeholder="edit value" />
            <div>
                <button @click="isEditable =true">Edit</button>
                <button>Delete</button>
            </div> -->
            <ListTodo :todo="todo"/>
        </div>
    </div>
</template>

<script>
    import {ref} from 'vue'
    import ListTodo from './ListTodo.vue'
    export default {
        setup(props){
            let isEditable = ref(false)
            console.log(props)
            return {isEditable, }
        },
        props: ['todoList'],
        components: {ListTodo}
    }
</script>

