$(document).ready(() => {
    $('.nav-li').click(function(self) {
        let fid = $(this).attr("id");

        window.location.href = `/api/${fid}`;
    })

    $('.info').click(function() {
        let tid = $(this).attr("id");

        window.location.href = `/article/${tid}`;
    })
})