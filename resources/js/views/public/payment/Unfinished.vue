<template>
    <div>

    </div>
</template>

<script>
export default {
    mounted(){
        localStorage.removeItem('order_id');
        this.$router.replace({name: "Orders"})
    }
}
</script>