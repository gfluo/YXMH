$(document).ready(() => {
    $('.nav-li').click(function(self) {
        let fid = $(this).attr("id");

        window.location.href = `/api/${fid}`;
    })

    $(window).scroll(function(){
 
        var scrollH = document.documentElement.scrollHeight;

        var clientH = document.documentElement.clientHeight;
        if (scrollH == (document.documentElement.scrollTop | document.body.scrollTop) + clientH){
            //加载新数据

            alert("加载新数据");

        }
    });
})