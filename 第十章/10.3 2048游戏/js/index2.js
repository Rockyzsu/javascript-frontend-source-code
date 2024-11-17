window.onload = function() {

    var imgs = document.querySelectorAll('img');  
    document.onkeydown = function (e) {

        switch (e.keyCode) {    // 当前按下的键对应的键值
            case 37:
                // ←
                console.log('←');

                run([0,1,2,3]);
                run([4,5,6,7]);
                run([8,9,10,11]);
                run([12,13,14,15]);

                break;
            case 38:
                // ↑
                console.log('↑');
                run([0,4,8,12]);
                run([1,5,9,13]);
                run([2,6,10,14]);
                run([3,7,11,15]);
                break;
            case 39:
                // →
                console.log('→');
                run([3,2,1,0]);
                run([7,6,5,4]);
                run([11,10,9,8]);
                run([15,14,13,12]);
                break;
            case 40:
                // ↓
                console.log('↓');
                run([12,8,4,0]);
                run([13,9,5,1]);
                run([14,10,6,2]);
                run([15,11,7,3]);
                break;
        }

        create();

    }
    create();
    function create() {
        var random = Math.floor(Math.random() * imgs.length);
        // console.log(random);
        if (imgs[random].getAttribute('value') == 0) {
            // 如果当前位置为0，表示可以放新的图片
            imgs[random].setAttribute('value', 2);
            imgs[random].src = 'img/2.png';
        } else {
            // 否则重新计算
            create();
        }
    }
    
    function run(arr) { 
        var newValue = dataTransfer([
            Number(imgs[arr[0]].getAttribute('value')),
            Number(imgs[arr[1]].getAttribute('value')),
            Number(imgs[arr[2]].getAttribute('value')),
            Number(imgs[arr[3]].getAttribute('value'))
        ]);
        for (var i=0; i<arr.length; i++) {
            imgs[arr[i]].setAttribute('value', newValue[i]);
            imgs[arr[i]].src = 'img/'+ newValue[i] +'.png';
        }      
    }

    function dataTransfer(arr) {
        /**
         * 根据arr得到一个newArr
         * 
         * 设置一个指针i，默认为0
         * 获取i的值
         *  当i的值为空，进入下一轮
         *  当i的值不为空
         *      设置j=i+1
         *      获取j的值
         *      比较i和j的值
         *          如果i的值不等于j的值
         *              把i的值添加到newArr中
         *              进入下一轮
         *          如果i的值等于j的值
         *              把i+j的值相加，添加到newArr
         *              i=j+1
         */
        let newArr = [];

        for (let i=0; i<arr.length; i++) {

            if (arr[i] != 0) {
                // 判断j的值是不是0
                for (var j=i+1; j<arr.length; j++) {
                    if (arr[j] != 0) break;
                }
                if (arr[i] != arr[j]) {
                    newArr.push(arr[i]);
                } else {
                    newArr.push(arr[i] + arr[j]);
                    i = j;
                }
            }

        }

        for (let i=0; i<arr.length; i++) {
            if (!newArr[i]) newArr[i] = 0;
        }
        
        return newArr;
    }
}