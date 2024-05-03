<template>
    <div>
        <HeaderTodo @todoList="todoList"/>
        <!-- <BodyTodo :todoList="listItems"/> -->
    </div>
</template>
<script>
import HeaderTodo from './HeaderTodo.vue'
// import BodyTodo from './BodyTodo.vue'
import {   ref,  } from  'vue'
export default {
    components: {HeaderTodo},
    setup(){
        let listItems = ref([])
        function todoList(list){
            listItems.value = list
        }                                                                                                                                                      

        return {todoList, listItems}
    }
}
</script>