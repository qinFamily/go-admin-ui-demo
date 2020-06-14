import request from '@/utils/request'
// import remoteLoad from '@/assets/remoteload'

// 获取验证码
export function getCodeImg() {
  /*
  Promise.all([remoteLoad('https://ssl.captcha.qq.com/TCaptcha.js')]).then(() => {

    let langtion = 'zh-hk';
    let captchaId = '2078016841'; //腾讯滑块验证码appid
    //生成一个滑块验证码对象
    var captcha = new TencentCaptcha(captchaId, function (res) {
      console.log(res);
      if (res.ret === 0) {
        //成功
        return request({
          url: '/api/v1/getCaptcha',
          method: 'get'
        })
      }
    });
    //  滑块多语言调用
    captcha.initOpts.forceLang = langtion;
    captcha.langFun();
    // 滑块显示
    captcha.show();
  })
*/
  return request({
    url: '/api/v1/getCaptcha',
    method: 'get'
  })
}

