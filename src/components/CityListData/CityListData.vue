<template>
    <div>
        <div v-for="(item,index) in cityData2" :key="index">
            {{item.name}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "CityListData",
        components: {},
        props: {
            cityData2:{
                query:Array
            }
        },
        data() {
            return {}
        },
        methods: {},
        mounted() {

        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
</style>
