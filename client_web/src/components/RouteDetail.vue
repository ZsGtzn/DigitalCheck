<template>
  <div style="display:flex;width:100%;">
    <div style="flex-grow:1;">
      <div style="margin-bottom:5px;">
        <span style="margin-right:5px;">{{routeInfo.endPort}}</span>
        <span style="margin-right:5px;">{{routeInfo.name}}</span>
        <span style="margin-right:5px;">{{routeInfo.date + routeInfo.time}}</span>
      </div>
      <span style="margin-right:5px;" v-if="routeInfo.invoiceType == 1">
          散客交通费
      </span>
      <span style="margin-right:5px;" v-if="routeInfo.invoiceType == 2">
          车渡交通费
      </span>
      <span style="margin-right:5px;" v-if="routeInfo.invoiceType == 3">
          退票手续费
      </span>
      <span>{{routeInfo.IDNum}}</span>
    </div>

    <div style="text-align:right;width:100px;">
      <div style="margin-bottom:5px;">{{`￥${routeInfo.invoiceAmount}`}}</div>
      <template v-if="routeInfo.canInvoice">
        <span>未开票</span>
        <div style="height:10px;"/>
      </template>
      <template v-if="routeInfo.invoiceUrl && routeInfo.invoiceUrl.length > 0">
            <div @click.capture="showOpenBrowserHint">
                <mt-button type="primary" class="preview" @click.capture="preview(routeInfo)">查看</mt-button><div style="height:10px;"/>
                <mt-button type="primary" class="download" @click.capture="download(routeInfo)">下载</mt-button>
            </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "routeDetail",

  props: {
    item: {
      required: true,
    }
  },

  data: function() {
    return {
      routeInfo: this.item,
    };
  },

  methods: {
    longTouch() {
      
    },

    showOpenBrowserHint(event)
    {
        if(window.gtzn.ifNeedToJumpOutBrowser)
        {
            event.stopPropagation();

            //
            return this.Toast("请点击右上角，选择从浏览器中打开");
        }
    },

    download(routeInfo)
    {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = `${routeInfo.serialNum}.pdf`;
        eleLink.style.display = 'none';

        // 
        if(window.gtzn.platform == 'android')
        {
            eleLink.href = routeInfo.invoiceUrl;
        }
        else
        {
            var blob = new Blob([routeInfo.invoiceUrl]);
            eleLink.href = URL.createObjectURL(blob);
        }
        

        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();

        // 然后移除
        document.body.removeChild(eleLink);
    },

    preview(routeInfo)
    {
        window.location.href = routeInfo.invoiceUrl;
    },
  }
};
</script>

<style scoped lang="scss">

@mixin pdf {
  font-size: 0.75em;
  width: 80px;
  height: 30px;
  padding: auto;
}

.preview {
  @include pdf;
}

.download {
  @include pdf;
}

</style>