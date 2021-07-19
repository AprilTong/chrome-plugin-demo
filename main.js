// query

function httpRequest(callback) {
    var stocks = localStorage.stocks || 'sh000001'
    var url = 'http://hq.sinajs.cn/list=' + stocks

    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseText)
        }
    }
    xhr.send()
}
function test(callback) {
    let xhr = new XMLHttpRequest()
    let url = 'http://data.365you.com:8889/api/1/user/login'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseText)
        }
    }

    let atag = document.getElementsByClassName('down-resume')
    let params = {
        username: 'admin',
        password: '123456',
    }
    // alert(params)
    xhr.send(JSON.stringify(params))
}
function showTest(result) {
    alert(result)
}
// render

function showResult(result) {
    // var table = '<table><thead><tr><th>股票</th><th>最新价</th><th>涨跌幅</th></tr></thead><tbody>'

    // var arr = result.split(';').slice(0, -1)

    // arr.forEach(function (item) {
    //     var itemArr = item.split('=')[1].split('"')[1].split(','),
    //         name = itemArr[0]
    //     curr = Number(itemArr[3]).toFixed(2)
    //     yest = Number(itemArr[2]).toFixed(2)
    //     range = (((curr - yest) / yest) * 100).toFixed(2)

    //     table += '<tr>'
    //     table += '<td>' + name + '</td>'
    //     table += '<td>' + curr + '</td>'
    //     table += '<td>' + range + '</td>'
    //     table += '</tr>'
    // })

    // table += '</tbody></table>'

    document.getElementById('stock').innerHTML = table
}

// add

document.getElementById('addBtn').onclick = function () {
    // test()
    var add = document.getElementById('add'),
        addBtn = document.getElementById('addBtn')

    var input = document.createElement('input')
    input.type = 'text'
    input.id = 'newStock'

    var saveBtn = document.createElement('input')
    saveBtn.type = 'button'
    saveBtn.id = 'saveBtn'
    saveBtn.value = 'save'

    add.removeChild(addBtn)
    add.appendChild(input)
    add.appendChild(saveBtn)

    document.getElementById('saveBtn').onclick = function () {
        var newStock = document.getElementById('newStock').value
        var stocks = (localStorage.stocks && localStorage.stocks.split(',')) || ['sh000001']
        stocks.push(newStock)
        localStorage.stocks = stocks
        httpRequest(showResult)

        add.removeChild(input)
        add.removeChild(saveBtn)
        add.appendChild(addBtn)
    }
}
// 导入按钮事件
document.getElementById('getSume').onclick = function () {
    sendMessageToContentScript({ cmd: 'update_font_size', size: 42 }, function (response) {
        alert(response)
    })
}
// 向content-script发送信息
function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response)
        })
    })
}
// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null)
    })
}

httpRequest(showResult)
myEvent()
// test(showTest)
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：')
    console.log(request, sender, sendResponse)
    // alert(request)
    sendResponse('我是popup，我已收到你的消息：' + JSON.stringify(request))
})
