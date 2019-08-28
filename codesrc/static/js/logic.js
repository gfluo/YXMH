$(document).ready(() => {
    $('.nav-li').click(function(self) {
        let fid = $(this).attr("id");

        window.location.href = `/api/${fid}`;
    })
})