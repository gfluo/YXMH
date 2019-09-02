$(document).ready(() => {
    $('.nav-li').click(function (self) {
        let fid = $(this).attr("id");
        if (fid == 'allShow') {
            window.location.href = '/';
        } else
            window.location.href = `/list/${fid}`;
    })

    $('.nav-li-sub').click(function (self) {
        let tid = $(this).attr("id");
        window.location.href = `/article/${tid}`;
    })

    $('.info').click(function () {
        let tid = $(this).attr("id");
        let fid = $('.nav-li.active').attr("id");
        sessionStorage.setItem('fid', fid);

        window.location.href = `/article/${tid}`;
    });

    let fid = sessionStorage.getItem('fid');
    if (fid) {
        $(`#${fid}`).addClass('active');
    }

    sessionStorage.removeItem('fid');
})