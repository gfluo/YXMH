;(function() {
    var barList = document.querySelectorAll('.slide-line'),
        coverList = document.querySelectorAll('.slide-cover'),
        photoList = document.querySelectorAll('.slide-photo'),
        menuBtn = document.querySelector('#menuBtn'),
        closeBtn = document.querySelector('#closeBtn'),
        menuBox = document.querySelector('#aside-menu');

    var index = 0;
    setActiveSheet(index);
    setInterval(function() {
        index++;
        if (index > barList.length -1) {
            index = 0
        }
        console.log('----', index)
        setActiveSheet(index);
    }, 5000);

    menuBtn.addEventListener('click', showMenu)
    closeBtn.addEventListener('click', hideMenu)
    
    function showMenu() {
        menuBtn.style.display = 'none'
        closeBtn.style.display = 'block'
        menuBox.className = 'active'
    }

    function hideMenu() {
        menuBtn.style.display = 'block'
        closeBtn.style.display = 'none'
        menuBox.className = ''
    }

    function setActiveSheet(index) {
        for(let i = 0; i < barList.length; i++) {
            barList[i].className = 'slide-line'
        }
        barList[index].className = 'slide-line active'
        for(let i = 0; i < barList.length; i++) {
            coverList[i].className = 'slide-cover'
        }
        coverList[index].className = 'slide-cover active'
        for(let i = 0; i < barList.length; i++) {
            photoList[i].className = 'slide-photo'
        }
        photoList[index].className = 'slide-photo active'
    }

})();