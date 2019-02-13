// 楼梯
class Stair{
    constructor(){

    }     

    init(){
        this.stairs = $(".first-floor-wrap");
        this.btn_wrap = $(".stairs");
        this.btns = $(".stairs li");

        // 显示高度的临界值;
        this.showTop = 300;
        // 计算初始数据;
        this.stairsArray = [];
        for(var i = 0 ; i < this.stairs.length ; i ++){
                var ele = this.stairs.eq(i)
                this.stairsArray.push({
                    min : ele.offset().top,
                    max : ele.offset().top + ele.height()
                })
        }
        // console.log(stairsArray);
        this.bindEvent();
    }

    bindEvent(){
        $(window).on("scroll",this.toggleBtn.bind(this));
        $(window).on("scroll",this.changeBtnIndex.bind(this));
        
        
        this.btns.eq(this.btns.length - 1).on("click",this.goTop.bind(this));
        this.btns.on("click",this.changeStairs.bind(this));
        
    }

    toggleBtn(){
        // console.log(1);
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        if(scrollTop > this.showTop){
                this.btn_wrap.show();
        }else{
                this.btn_wrap.hide();
        }
    }     

    changeBtnIndex(){

        if(this.animate){
                return false;
        }

        // 判定值的区间;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        
        this.stairsArray.some((item,index)=>{
                if(scrollTop >= item.min && scrollTop < item.max){

                    this.btns.removeClass("active")
                    .eq(index).addClass("active");
                    return true;
                }
        })
    }
    changeStairs(e){
        var target = e.currentTarget;
        // console.log($(target).index());
        var index = $(target).index();

        if(index === this.stairs.length) return false;

        this.btns.removeClass("active")
                    .eq(index).addClass("active");
        $("html,body").animate({
                "scrollTop" : this.stairsArray[index].min
        },()=>{
                this.animate = false;
        })
        this.animate = true;
    }     
    goTop(){
        
        // $("html,body").animate({
        //       "scrollTop" : 0
        // })
        $("html,body").scrollTop(0);
    }
}

var stair = new Stair();
stair.init();
// 二级菜单
// 图片移动
$(".first-floor-right1 img,.first-floor-right2 img,.first-floor-right3 img,.first-floor-right-ul li img,.three-floor-right-ul li img").hover(function(){
    $(this).stop().animate({
          position:"absolute",
            left:-5
        })
        .parent().siblings().children()
            .stop()
            .animate({
                left:0
        })

},function(){
    $(this).stop().animate({left:0});
})
// 注册
// 登录
var submit = document.getElementById("submit");
console.log(submit);
submit.addEventListener("click",login);
var username = document.getElementById("username");
var password = document.getElementById("password");
// function login(){
//     var usr_str = username.value;
//     var pass_str = password.value;
//     var data = {
//         username :usr_str,
//         password :pass_str
//     }
//     ajaxpost("http://localhost/bl/interface/login.php",data)
//     .then(function(res){  // res => xhr.response;
//         console.log(res);
//     })
// }
function login(){
    var user = username.value;
    var pass = password.value;
 //    console.log(user,pass);
 // ajax技术发送；
     var data = {
         username : user,
         password : pass
     }
     ajaxPost("http://localhost/bl/interface/login.php",data)
     .then(function(res){
         alert(res)
        //  console.log(res);
     })
 }

 // 封装：

 function ajaxPost(url,data){

     return new Promise(function(resolve,reject){
         var xhr = new XMLHttpRequest();
         xhr.open("POST",url);
         console.log(1)
         xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
         var data_str="";
         for(var arr in data){
             if(data_str.length !==0){
                 data_str += "&";
             }
             data_str +=arr+"="+data[arr];
         }

         xhr.send(data_str)
         xhr.onreadystatechange = function(){
             if(xhr.readyState ===4 &xhr.status ===200){
                resolve(xhr.response);
                //  console.log(JSON.parse(xhr.response))
             }
         }
     })

 }


$(".vip").on("click",function(){
    
        $(".right-nav-wrap").animate({
            right:0,
        })
    })
$(".vip").on("mouseover",function(){
        $width = $(".right-nav .vip span").css("width")
        $(".right-nav .vip span").css("display","block").animate({
            left:$width,
        })
       
        console.log($width)
        
})    
// 右侧导航
// $(".vip").click(function(){
//     $(".right-nav").css({
//         right:200,
//     })
// })   