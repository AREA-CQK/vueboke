<template>
    <transition name="el-fade-in">
        <div class="loginBox">
            <div>
                <el-input placeholder="请输入用户名" v-model="name" type="text">
                    <template>用户名</template>
                </el-input>
            </div>
            <div>
                <el-input placeholder="请输入密码" v-model="password" type="password">
                    <template>密码</template>
                </el-input>
            </div>
        <el-button type="info" @click="login">登录</el-button>
        <el-button type="default" @click="register">注册</el-button>
        </div>
    </transition>
</template>
<script>
 import BScroll from 'better-scroll'
export default {
    data() {
        return {
            name: '',
            password:'',
        }
    },
    methods: {
        login(){
            let _this = this;
            if (this.name.length < 6) {
                this.$message({
                    message: '用户名不能少于6位',
                    type: 'error'
                });
                return
            }

            if (this.password.length < 6) {
                this.$message({
                    message: '密码不能少于6位',
                    type: 'error'
                });
                return
            }
            _this.$ajax.get('/api/admin/getUser/'+this.name).then(
               response => {
                   if(_this.password != response.data.password){
                       this.$message({
                            message: '用户名或密码错误',
                            type: 'error'
                        });
                   }else{
                        let user = {
                            name : _this.name,
                            password:_this.password
                        }
                         _this.$ajax.post('/api/admin/login',{userInfo:user}).then(
                            response => {
                                //存储登陆状态
                               if(response.data == 1){
                                   this.$message({
                                    message: '登录成功',
                                    type: 'success',
                                    onClose: function(){
                                        _this.$store.commit('login');
                                        _this.$router.push('/');
                                    }
                                }); 
                               }
                            },
                            response => {
                                console.log(response.body)
                            }
                         )
                   }
               },
               response => {
                   _this.$message({
                        message: '用户不存在',
                        type: 'error'
                    });
               }
            )
        },
        register(){
            let _this = this;
            if (this.name.length < 6) {
                this.$message({
                    message: '用户名不能少于6位',
                    type: 'error'
                });
                return
            }
            if (this.password.length < 6) {
                this.$message({
                    message: '密码不能少于6位',
                    type: 'error'
                });
                return
            }

            _this.$ajax.get('/api/admin/getUser/'+_this.name).then(
                response => {
                    if(_this.name == response.data.name){
                        _this.$message({
                            message : '用户已存在！',
                            type : 'error'
                        })
                        return;
                    }
                    _this.$ajax.post('/api/admin/signup',{
                        userInfo : {
                            name : _this.name,
                            password : _this.password
                        }
                    }).then(
                        response => {
                            _this.$message.success("注册成功！");
                            _this.login();
                        },
                        response => {
                            console.log(response)
                        }
                    )
                },
                response => {
                    console.log(response)
                }
            )
        }
    },
     watch: {
       
    }
}

</script>
<style >
    .loginBox{
        margin-top:100px;
    }
    .loginBox div{
        width:500px;
        margin:10px auto;
    }
    
</style>
