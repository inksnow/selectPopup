// pages/index/index.js

var selectPopup;

var textArray = ["测试1","测试2","测试3","测试4","测试5","测试6","测试7"];
var textArrayColor = ["#576B95","#576B95","#576B95","#576B95","#576B95","#666666","#ff0000"];
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    selectPopup = this.selectComponent("#selectpopup");
  },

  showPopup(){
    selectPopup.show(textArray,textArrayColor);
    },
    

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 

  },
  selectPopupItemClick:function(e){
    console.log(e)
    console.log("选择的item下标："+e.detail[0])
    console.log("组件标识："+e.detail[1])
  },

  selectPopupExit:function(e){
    console.log(e)
    console.log("点击了取消或空白区域取消")
    console.log("组件标识："+e.detail[1])
  }

})