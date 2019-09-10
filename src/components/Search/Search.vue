<template>
    <div>
        <div class="search-box">
            <div class="search-box2">
                搜索历史：
            </div>
            <div v-if="this.SearchHistory1.length === 0">暂无历史</div>
             <div v-for="(item1,index1) in SearchHistory1" :key="index1" class="search-loop2">
                    {{item1}}
             </div>
        </div>
        <div class="search-box1">
         <div v-for="(item,index) in searchAll" :key="index" class="search-loop" v-html="item.name"@click="searchItem(item)">
         </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Search",
        components: {},
        props: {
            searchAll:{
                query:Array
            }
        },
        data() {
            return {
                SearchHistory1:[]
            }
        },
        methods: {
            searchItem (item) {
                this.$router.push({ name:"detailsPage",
                query:{
                    goodsId6:item.id
                }
                })
            }
        },
        mounted() {
            this.SearchHistory1 = JSON.parse(localStorage.getItem("SearchHistory"))
            console.log(this.SearchHistory1);
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
.search-box {
    margin-top: 100px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.search-box2 {
    font-size: 40px;
    color: skyblue;
    display: flex;
}
.search-box1 {
    margin-top: 20px;
    font-size: 30px;
}
.search-loop {
     margin-top: 10px;
    font-weight: bold;
}
.search-loop2 {
    margin-left: 20px;
    font-size: 30px;
}
</style>
