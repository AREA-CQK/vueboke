<template>
  <transition name="el-fade-in">
    <div>
    <el-row :gutter="20">
      <el-col :span="6"  v-for="item in articleList">
        <div class="article_wrap grid-content bg-purple" >
          <div class="article_title" @click="articleDetail( item._id )">{{ item.title }}</div>
          <div class="article_info">
            <span class="article_info_date">发表于：{{ item.date }}</span>
          </div>
          <div class="article_gist">{{ item.gist }}</div>
          <div @click="articleDetail( item._id )" class="article_button article_all">阅读全文 ></div>
        </div>
      </el-col>
    </el-row>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'article',
    data() {
      return {
        articleList: []
      }
    },
    mounted: function () {
      // this.$http.get('/api/articleList').then(
      //   response => {this.articleList = response.body.reverse();console.log(response.body)},
      //   response => console.log(response.body)
      // )
      var _self = this;
      _self.$ajax.get('/api/articleList')
      .then(
        response => {_self.articleList = response.data.reverse();}
      )
      .catch(
        err => console.log(err)
      )

    },
    methods: {
      articleDetail: function(id){
        this.$router.push('/articleDetail/'+id);
      }
    }
  }
</script>

<style scoped>

  .article_wrap {
    padding: 30px;
    border-radius: 10px;
    margin-top: 30px;
    transition: all .5s;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
    border: 1px solid #EEE;
  }
  .article_wrap:hover{
    box-shadow: 0 0 0 4px rgba(66,185,131,.4);
    transform: scale(1.2);

  }
  .article_title {
    display: inline-block;
    color: #222;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid white;
    cursor: pointer;
  }

  .article_title:hover {
    border-bottom: 1px solid #222;
  }

  .article_info {
    color: #999;
    font-size: 12px;
    padding-top: 8px;
  }

  .tag_margin {
    margin: 3px;
  }

  .article_gist {
    text-align: left;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 12px;
    height: 12px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .article_button {
    display: inline-block;
    padding: 2px 9px;
    border: 1px solid #42b983;
    color: #42b983;
    font-size: 12px;
    cursor: pointer;
  }

  .article_all:hover {
    color: white;
    background: #42b983;
    font-weight: 600;
  }
</style>