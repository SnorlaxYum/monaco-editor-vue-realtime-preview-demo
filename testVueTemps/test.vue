<template>
    <div>Current user is: {{ user }}</div>
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
    body {
        background: black;
        font-size:15vw;
        white-space: pre-wrap;
        word-break: break-word;
    }
    div {
        color: white;
    }
</style>