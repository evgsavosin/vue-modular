<script>
export default {
    props: {
        content: {
            type: String,
            default: () => ''
        }
    }
};
</script>

<template>
    <div class="popup">
        <div class="popup__inner">
            {{ content }}
        </div>
    </div>    
</template>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';

.popup {
    color: $black-color;

    &__inner {
        background-color: $white-color;
        width: 50vh;
        height: 50vh;
        border-radius: 10px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>