<template>
  <div>
    <div style="display:flex;" v-long-touch="longTouch">
      <div id="timeAndPosition" class="timeAndPosition">
          <span class="routePosition">{{routeInfo.endPort}}</span>
          <span class="routePosition">{{routeInfo.name}}</span>
          <span class="routePosition">{{routeInfo.date + routeInfo.time}}</span>
          <span v-if="routeInfo.invoiceType == 1">
                散客交通费
          </span>
          <span v-if="routeInfo.invoiceType == 2">
              车渡交通费
          </span>
          <span v-if="routeInfo.invoiceType == 3">
              退票手续费
          </span>
      </div>

      <div id="price" style="margin-left:2em;text-align:right;width:10em;">
        <span class="chargePrice">{{`￥${routeInfo.invoiceAmount}`}}</span>
        <div v-if="routeInfo.canInvoice">
          <mt-button type="primary" size="small">查看票据</mt-button>
        </div>
        <div v-else>
            未开票
        </div>
      </div>
    </div>
    <div style="text-align:left;">
        <span class="tip"></span>
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