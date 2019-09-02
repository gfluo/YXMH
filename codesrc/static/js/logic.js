$(document).ready(() => {
    $('.nav-li').click(function (self) {
        let fid = $(this).attr("id");
        if (fid == 'allShow') {
            window.location.href = '/';
        } else
            window.location.href = `/api/${fid}`;
    })

    $('.nav-li-sub').click(function (self) {
        let tid = $(this).attr("id");
        window.location.href = `/article/${tid}`;
    })

    $('.info').click(function () {
        let tid = $(this).attr("id");

        window.location.href = `/article/${tid}`;
    })
})