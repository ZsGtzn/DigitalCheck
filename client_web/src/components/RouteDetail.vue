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
      </template>
      <template v-if="routeInfo.invoiceUrl && routeInfo.invoiceUrl.length > 0">
        <a :href="routeInfo.invoiceUrl" class="preview" target="_blank">查看票据</a><div style="height:10px;"/>
        <a :href="routeInfo.invoiceUrl" class="download" download="serialNum.pdf">下载</a>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "routeDetail",

  props: {
    item: {
      required: true
    }
  },

  data: function() {
    return {
      routeInfo: this.item
    };
  },

  methods: {
    longTouch() {
      
    }
  }
};
</script>

<style scoped lang="scss">

@mixin pdf {
  text-decoration: none;
  color: white;
  border: solid #26a2ff 1px;
  background-color: #26a2ff;
  border-radius: 5px;
  padding: 2px 5px 2px 5px;
}

.preview {
  @include pdf;
}

.download {
  @include pdf;
}

</style>