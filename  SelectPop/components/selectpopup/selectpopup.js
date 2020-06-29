// components/selectpopup/selectpopup.js

//上次按钮点击时间
var lasttime = 0;
//按键防抖时间
var clickTime = 200;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemHeight: {
      type: Number,
      value:100
    },
    padding: {
      type: Number,
      value:15
    },
    radius: {
      type: Number,
      value:15
    },
    showExit: {
      type: Boolean,
      value:true
    },
    exitText: {
      type: String,
      value:"取消"
    },
    exitColor: {
      type: String,
      value:"#666666"
    },
    selectItemText: {
      type: Array,
      value: ["测试1", "测试2"]
    },
    selectItemTextColor: {
      type: Array,
      value: ["#576B95", "#576B95"],
    },
    outExit: {
      type: Boolean,
      value:false
    },
    mark: {
      type: String,
      value:"selectPopup"
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    //item高度，单位rpx
    itemHeight: 100,
    //padding
    padding: 15,
    //圆角
    radius: 15,
    //是否显示取消按钮
    showExit: true,
    //取消按钮文字
    exitText: "取消",
    //取消按钮文字颜色
    exitColor: "#666666",
    //item内容，数组
    selectItemText: ["测试1", "测试2"],
    //item文字颜色，数组，不设置默认#576B95
    selectItemTextColor: ["#576B95", "#ff0000"],
    popupSelectDisplay: "hidden",
    //点击空白区域是否取消显示
    outExit:false,
    //组件标识
    mark:"selectPopup",



  },

  /**
   * 组件的方法列表
   */
  methods: {

    click: function (e) {
      //获取点击时间
      let d = new Date();
      let nowtime = d.getTime();
      if (nowtime - lasttime > clickTime) {
        lasttime = nowtime;
        let index = parseInt(e.currentTarget.id.replace("list_", ""));
        console.log(index)
        this.closePopup('selectPopupItemClick', [ index,this.data.mark ])
      }
    },
    exitClick: function (e) {
      //获取点击时间
      let d = new Date();
      let nowtime = d.getTime();
      if (nowtime - lasttime > clickTime) {
        lasttime = nowtime;
        switch (e.currentTarget.id) {
          case "out":
            if(this.data.outExit){
              this.closePopup('selectPopupExit', [ -1,this.data.mark ])
            }
            break;
            case "cancel":
              this.closePopup('selectPopupExit', [ -1,this.data.mark ])
            
            break;
        }
        
      }
    },
    show(selectItemText,selectItemTextColor){
      var that = this
      that.setData({
        selectItemText: selectItemText,
        selectItemTextColor:selectItemTextColor,
      })
      this.openPopup() 
    },

    //打开弹窗
    openPopup() {
      var query = this.createSelectorQuery()
      var that = this

      query.select('#popup_select_content').boundingClientRect(function (res) {

        var screenH = res.height;
        that.setData({
          popupSelectDisplay: "visible",
        })
        that.animation_select = wx.createAnimation({
          duration: 300,
          timingFunction: 'ease',
          delay: 0,
          transformOrigin: 'left top 0',
        })
        that.animation_select.translate(0, -screenH).step()
        that.setData({
          //输出动画
          animation_select: that.animation_select.export()
        })
      }).exec();

    },
    //关闭弹窗
    closePopup(event,detail) {
      //实例化一个动画
      var that = this
      that.animation_select = wx.createAnimation({
        // 动画持续时间，单位ms，默认值 400
        duration: 300,
        timingFunction: 'ease',
        // 延迟多长时间开始
        delay: 0,
        transformOrigin: 'left top 0',
      })
      that.animation_select.translate(0, 0).step()
      that.setData({
        //输出动画
        animation_select: that.animation_select.export()
      })
      setTimeout(function () {
        that.setData({
          popupSelectDisplay: "hidden",
        })
        this.triggerEvent(event,detail,{}) 

      }.bind(this), 300)
    }

  }
})