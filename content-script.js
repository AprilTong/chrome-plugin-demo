;(function () {
    document.addEventListener('DOMContentLoaded', function () {
        console.log(document.body.html)
    })
})()
// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(
        '收到来自 ' + (sender.tab ? 'content-script(' + sender.tab.url + ')' : 'popup或者background') + ' 的消息：',
        request
    )
    sendResponse('我收到你的消息了：' + JSON.stringify(request))
})
