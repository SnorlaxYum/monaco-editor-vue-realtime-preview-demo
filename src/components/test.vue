<template>
    <div id='user'>Current user is: {{ user }}</div>
</template>
<script>
export default {
    data() {
        return {
            user: 'John Doe'
        }
    }
}
</script>
<style>
    div#user {
        color: white;
        background: black;
    }
</style>