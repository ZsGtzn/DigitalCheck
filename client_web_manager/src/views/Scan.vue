<template>
    <div style="width:100%;height:100%;">
        <invoice-list></invoice-list>
    </div>
</template>

<script>

const InvoiceList = () => import("../components/InvoiceList.vue");

export default {
    name: "Scan",

    components: { InvoiceList },

    data() {
        return {
            
        };
    }
};
</script>

<style lang="scss" scoped>

</style>
