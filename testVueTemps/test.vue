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
    div {
        color: white;
        background: black;
    }
</style>