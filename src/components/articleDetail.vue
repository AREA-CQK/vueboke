<template>
  <transition name="el-fade-in">
    <div id="content">
      <div class="article_wrap_detail">
        <div class="article_title article_detail_title">{{ article.title }}</div>
        <div class="article_info">
          <span class="article_info_date">发表于：{{ article.date }}</span>
        </div>
        <div class="article_detail_content" v-html="compiledMarkdown()"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  import marked from 'marked'
  import highlight from 'highlight.js'
  import '../assets/atom-one-light.css'
  marked.setOptions({
    highlight: function (code) {
      return highlight.highlightAuto(code).value
    }
  })
  export default {
    name: 'articleDetail',
    data() {
      return {
        article: {}
      }
    },
    mounted: function () {
      let id = this.$route.params.id
      this.$ajax.get('/api/articleDetail/' + id).then(
        response => this.article = response.data,
        response => console.log(response)
      )
    },
    methods: {
      compiledMarkdown: function () {
        return marked(this.article.content || '', {sanitize: true})
      }
    }
  }
</script>

<style>
  .article_detail_title {
    cursor: default;
    margin: 40px 0 0;
  }

  .article_detail_content {
    text-align: left;
    padding: 60px 0;
    font-size: 18px;
  }
</style>