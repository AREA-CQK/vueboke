const express = require('express')
const router = express.Router()
const path = require('path');
const db = require('./db');
const check = require('./check')
const checkLogin = check.checkLogin
const checkNotLogin = check.checkNotLogin

//根据用户名获取用户

router.get('/api/admin/getUser/:name',function(req, res){
   db.User.findOne({ name: req.params.name }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})
//登陆
router.post('/api/admin/login', function(req, res){
    res.send('1');
})
//注册
router.post('/api/admin/signup', function (req, res) {
  new db.User(req.body.userInfo).save(function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})

//保存文章
router.get('/api/articleList',function(req, res){
  db.Article.find({},function(err, result){
    if(err){
      console.log(err)
    }else{
      res.json(result)
    }
  })
})
router.post('/api/articleDel',function(req, res){
  db.Article.remove(req.body,function(err, result){
    if(err){
      res.status(500).send();
      console.log(err)
    }else{
      res.send();
    }
  })
})
router.post('/api/admin/saveArticle',function(req, res){
  new db.Article(req.body.articleInfo).save(function(err, result){
    if(err){
      res.status(500).send()
      return;
    }
    res.send('1');
  })
})
//查询文章详情
router.get('/api/articleDetail/:id', function(req ,res){
  db.Article.findOne({_id : req.params.id},function(err, result){
    if(err) {
      res.status(500).send();
      return;
    }
    res.send(result);
  })
})


module.exports = router
