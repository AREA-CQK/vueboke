<template>
    <transition name="el-fade-in">
        <div id="content">
            <div class="article_wrap"  v-for="item in articleList">
            <div @click="articleEdit(item._id)" class="article_title">{{ item.title }}</div>
            <div class="article_info">
                <span class="article_info_date">发表于：{{ item.date }}</span>
            </div>
            <div class="article_gist">{{ item.gist }}</div>
            <div>
                <div @click="articleEdit(item._id)" class="article_button edit">修改</div>
                <div @click="deleteArticle(item._id)" class="article_button delete">删除</div>
            </div>
            <div class="article_underline"></div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name : 'articleList',
        data (){
            return {
                articleList: [],
            } 
        },
        mounted : function(){
            this.updateData();
        },
        methods : {
            articleEdit : function(id){
                this.$router.push('/admin/articleEdit/' + id);
            },
            deleteArticle : function(id){
                var _this = this;
                this.$http.post('/api/articleDel',{_id:id}).then(
                response => {
                    _this.$message.success('删除成功');
                    _this.updateData();
                },
                response => console.log(response)
            )
            },
            updateData : function(){
                this.$http.get('/api/articleList').then(
                    response => this.articleList = response.body.reverse(),
                    response => console.log(response)
                )
            }
        }
    }
</script>
