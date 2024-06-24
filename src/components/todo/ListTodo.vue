<template>
    <div id="todoItem">
        <div class="todoTitle">
            <h3 v-if="!isEditable" :id="todo.isComplete ? 'overline' : ''">{{ val }}</h3>
            <input v-else type="text" placeholder="Edit Todo" v-model="nValue"/>
        </div>
        <div class="listItems">
            <button @click="complete" :disabled="isEditable">{{ todo.isComplete ? 'Un-Complete' : 'Complete' }}</button>
            <button @click=" changeEditable(); saveValue();" v-if="isEditable">Save</button>
            <button @click="changeEditable" :disabled="todo.isComplete" v-else>Edit</button>
            <button @click="deleteTodo">delete</button>
        </div>
    </div>
</template>
<script>
    import {ref} from 'vue'
    export default {
        props: ['todo'],

        setup(props, context){
            let isEditable = ref(false)
            let val = ref(props.todo.title)
            let nValue = ref(props.todo.title)

            function complete() {
                if(isEditable.value === false){

                    context.emit('complete', val.value)
                }
            }
            function changeEditable(){
                isEditable.value = !isEditable.value
                console.log(props.todo)
            }
            function saveValue(){
                console.log(nValue.value)
                context.emit('editValue', nValue.value, val.value)
            }
            function deleteTodo(){
                context.emit('deleteTodo', val.value)
            }
            return {isEditable, changeEditable, saveValue, val, nValue, deleteTodo, complete}
        }
    }
</script>

<style scoped>
#todoItem{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-top: 40px;
    height: 40px;
    width: 50%;
}
.todoTitle h3{
    font-size: 24px;
}
.todoTitle input {
    font-size: 18px;
    padding: 6px 3px;
}
#overline{
    text-decoration: line-through;
}
.listItems{
    display: flex;
    column-gap: 10px;
}
.listItems button{
    font-size: 16px;
    padding: 5px ;
    border-radius: 5px;
    cursor: pointer;
}
.listItems button:disabled{
    cursor: not-allowed;
}
</style>