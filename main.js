// 调接口查询
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
function showTest(result) {
    alert(result)
}
// render

function showResult(result) {
    console.log('result', result)
}

// 测试通讯事件
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
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：')
    console.log(request, sender, sendResponse)
    // alert(request)
    sendResponse('我是popup，我已收到你的消息：' + JSON.stringify(request))
})
