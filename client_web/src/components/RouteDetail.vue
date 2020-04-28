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
      <div v-if="routeInfo.canInvoice">
        未开票
      </div>
      <div v-else>
        <mt-button type="primary" size="small">查看票据</mt-button>
      </div>
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

</style>