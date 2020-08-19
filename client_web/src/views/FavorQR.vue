<template>
    <div style="text-align:center;">
        <p>开票需要关注自游宝</p>
        <p>二维码长按进行关注</p>
        <img :src="ziubaoQRCode" />
    </div>
</template>

<script>
import ziubaoQRCode from "../assets/qr/ziubao.png";

export default {
    name: "FavorQR",
    data() {
        return {
            ziubaoQRCode: ziubaoQRCode,
        }
    },
}
</script>