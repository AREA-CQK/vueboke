
<template>
  <div class="navBox">
    <ul class="nav">
        <router-link tag="li" :to="{path:'/', activeClass: 'nav-active'}" exact>首页</router-link>
        <router-link tag="li" to="/admin/articleEdit" >写文章</router-link>
        <router-link tag="li" :to="{path:'/admin/login' }" exact>登录</router-link>
        <router-link tag="li" to="/admin/articleList">管理</router-link>
        <router-link tag="li" to="/admin/about">关于</router-link>
        <router-link tag="li" to="/chat">聊天</router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
      return {
          
      }
  }
}
</script>
<style>
    body{
      margin:0;
    }
    .navBox{
      height:60px;
      line-height: 60px;
      width:100%;
      min-width: 900px;
      font-size:26px;
      border-bottom:5px solid #EEEEEE;
    }
    .navBox ul{
      text-align: right;
      list-style-type: none;
      margin:0;
      padding: 0;
    }
    .navBox ul li{
      display: inline-block;
      margin: 0 10px;
      border-radius: 71px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 18px;
    }
    .navBox ul li{
      transition: all .5s;
      color: #A9A9A9;
    }
     .navBox ul li:hover,.navBox ul li:active{
      
      color: rgba(66,185,131,.7);
    } 
    .navBox ul .router-link-active{
      
      color: rgba(66,185,131,.7);
    }
</style>
