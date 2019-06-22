//NOTE : (修改)表示之後討論修正 ，(刪除)表示之後討論刪除

//data1 放第一張圖的內部值 外部值 美觀值 依此類推
//之後可以算出真實值 利用refreshData() 更新
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];
var data6 = [];
//ps1 代表第一張圖片的price跟size
var ps1 = [];
var ps2 = [];
var ps3 = [];
var ps4 = [];
var ps5 = [];
var ps6 = [];
var isChoose = [false, false, false, false, false, false]; // 紀錄哪幾張圖片被選取(預設都沒被選)
var chooseNum = 0;
var chart = [];
var currentHouse = [1, 2, 3, 4, 5, 6]; //紀錄當前依序是第幾間房子 (預設第1,2,3,4,5,6間)


//show出圖表 因為不用window.onload有問題 所以上網查必須用 
//我猜是模板的問題 所以很多錯誤訊息null之類的都必須放在裡面用
window.onload = function() {
    //document.getElementById("h1Title").innerHTML = "標題"; //之後依照各個房子改

    //顯示圖表
    displayChart1();
    displayChart2();
    displayChart3();
    displayChart4();
    displayChart5();
    displayChart6();

    //價錢跟坪數
    displayps();
}


//先給初始值 之後如果處理邏輯要改 這段可以刪掉 (刪除)
initialData()
initialps() // 給價錢跟坪數初始值

function initialData() {
    data1 = [2, 4, 6];
    data2 = [3, 5, 7];
    data3 = [1, 5, 9];
    data4 = [2.5, 1, 7.4];
    data5 = [8, 4, 1];
    data6 = [9.8, 2, 6];
}

function initialps() {
    ps1 = [9000, 7];
    ps2 = [6000, 5];
    ps3 = [12000, 7];
    ps4 = [20000, 16];
    ps5 = [8500, 9];
    ps6 = [7000, 8];
}

//當圖片被點後 傳她是第幾張圖片 然後更新isChoose
function choose(index) {
    //如果第index已經被選過 又再點了一次 那麼代表使用者改變心意 所以改成false
    if (isChoose[index]) {
        isChoose[index] = false;
        chooseNum--;
    } else { //預設只能選三張圖片 
        if (chooseNum == 3) {
            alert("已經選了三張了"); //可以換成更好的顯示方式(修改)
        } else {
            isChoose[index] = true;
            chooseNum++;
        }
    }
}

function sending() {
    //隨機產生六張圖片
    refreshImage();
    //隨機產生六張圖片的barchart的資料
    refreshData();
}

//-----以下為隨機製造資料 (之後可能配合kmeans) (修改)
function refreshImage() {
    //path = "houseImage/h4.jpg"
    image = [];
    while (true) {
        if (image.length == 6) {
            break;
        }
        temp = Math.round(Math.random() * 3006 + 1);
        isrepeat = false;
        if (image.length >= 1) {
            //做檢查
            for (var i = 0; i < image.length; i++) {
                if (temp == image[i]) {
                    isrepeat = true;
                    break;
                }
            }
            if (isrepeat == false) {
                image.push(temp);
            }
        } else {
            image.push(temp);
        }
    }
    for (var i = 1; i <= 6; i++) {
        document.getElementById("h" + i + "Image").src = "houseImage/h" + image[i - 1] + ".jpg"
    }
    currentHouse = image; //更新當前顯示的房子
}

function refreshData() { //預設資料都在0~6之間 (修改)
    for (var i = 1; i <= 6; i++) {
        for (var u = 0; u < 3; u++) {
            eval("data" + i)[u] = Math.random() * 6;
        }
        //更新chart
        chart[i - 1].data.datasets.data = eval("data" + i);
        chart[i - 1].update();
        console.log(chart[i - 1].data.datasets.data);
    }
}

//-------------以下為顯示(display)區
//坪數跟價錢 eval用法跟VBA的ME一樣
function displayps() {
    for (var i = 1; i <= 6; i++) {
        document.getElementById("ps" + i).innerHTML = "每月 : " + eval("ps" + i)[0] + " 元 &nbsp &nbsp坪數 : " + eval("ps" + i)[1];
    }
}

//-------------以下為六張重複的圖表 唯一目前參數是global var 的data1~6
function displayChart1() {
    var ctx_bar = document.getElementById('canvas1').getContext('2d');
    var temp = new Chart(ctx_bar, {
        type: 'horizontalBar',
        data: {
            labels: ["內部", "外部", "美觀"],
            datasets: [{
                label: '沒特別設定',
                data: data1,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    categoryPercentage: 0.8, //柱子寬度(類別比例)                            
                    gridLines: {
                        offsetGridLines: true
                    },
                    ticks: {
                        beginAtZero: true //從零開始
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        //steps: 10,//每一格刻度間距10
                        //stepValue: 10,
                        max: 6, //設定最大值
                        min: 0
                    },
                    categoryPercentage: 0.01, //刻度寬度
                }],
            }
        }
    });
    chart.push(temp);
}

function displayChart2() {
    var ctx_bar = document.getElementById('canvas2').getContext('2d');
    var temp = new Chart(ctx_bar, {
        type: 'horizontalBar',
        data: {
            labels: ["內部", "外部", "美觀"],
            datasets: [{
                label: '沒特別設定',
                data: data2,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    categoryPercentage: 0.8, //柱子寬度(類別比例)                            
                    gridLines: {
                        offsetGridLines: true
                    },
                    ticks: {
                        beginAtZero: true //從零開始
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        //steps: 10,//每一格刻度間距10
                        //stepValue: 10,
                        max: 6, //設定最大值
                        min: 0
                    },
                    categoryPercentage: 0.01, //刻度寬度
                }],
            }
        }
    });
    chart.push(temp);
}

function displayChart3() {
    var ctx_bar = document.getElementById('canvas3').getContext('2d');
    var temp = new Chart(ctx_bar, {
        type: 'horizontalBar',
        data: {
            labels: ["內部", "外部", "美觀"],
            datasets: [{
                label: '沒特別設定',
                data: data3,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    categoryPercentage: 0.8, //柱子寬度(類別比例)                            
                    gridLines: {
                        offsetGridLines: true
                    },
                    ticks: {
                        beginAtZero: true //從零開始
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        //steps: 10,//每一格刻度間距10
                        //stepValue: 10,
                        max: 6, //設定最大值
                        min: 0
                    },
                    categoryPercentage: 0.01, //刻度寬度
                }],
            }
        }
    });
    chart.push(temp);
}

function displayChart4() {
    var ctx_bar = document.getElementById('canvas4').getContext('2d');
    var temp = new Chart(ctx_bar, {
        type: 'horizontalBar',
        data: {
            labels: ["內部", "外部", "美觀"],
            datasets: [{
                label: '沒特別設定',
                data: data4,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    categoryPercentage: 0.8, //柱子寬度(類別比例)                            
                    gridLines: {
                        offsetGridLines: true
                    },
                    ticks: {
                        beginAtZero: true //從零開始
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        //steps: 10,//每一格刻度間距10
                        //stepValue: 10,
                        max: 6, //設定最大值
                        min: 0
                    },
                    categoryPercentage: 0.01, //刻度寬度
                }],
            }
        }
    });
    chart.push(temp);
}

function displayChart5() {
    var ctx_bar = document.getElementById('canvas5').getContext('2d');
    var temp = new Chart(ctx_bar, {
        type: 'horizontalBar',
        data: {
            labels: ["內部", "外部", "美觀"],
            datasets: [{
                label: '沒特別設定',
                data: data5,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    categoryPercentage: 0.8, //柱子寬度(類別比例)                            
                    gridLines: {
                        offsetGridLines: true
                    },
                    ticks: {
                        beginAtZero: true //從零開始
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        //steps: 10,//每一格刻度間距10
                        //stepValue: 10,
                        max: 6, //設定最大值
                        min: 0
                    },
                    categoryPercentage: 0.01, //刻度寬度
                }],
            }
        }
    });
    chart.push(temp);
}

function displayChart6() {
    var ctx_bar = document.getElementById('canvas6').getContext('2d');
    var temp = new Chart(ctx_bar, {
        type: 'horizontalBar',
        data: {
            labels: ["內部", "外部", "美觀"],
            datasets: [{
                label: '沒特別設定',
                data: data6,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    categoryPercentage: 0.8, //柱子寬度(類別比例)                            
                    gridLines: {
                        offsetGridLines: true
                    },
                    ticks: {
                        beginAtZero: true //從零開始
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        //steps: 10,//每一格刻度間距10
                        //stepValue: 10,
                        max: 6, //設定最大值
                        min: 0
                    },
                    categoryPercentage: 0.01, //刻度寬度
                }],
            }
        }
    });
    chart.push(temp);
}