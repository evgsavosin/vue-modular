<script>
export default {
    props: {
        foo: String,
        password: String,
    }
};
</script>

<template>
    <div class="example">
        <div class="example__inner">
            {{ foo }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';

.example {
    width: 100%;
    height: 100%;
    color: $black-color;

    &__inner {
        font-weight: bold;
    }
}
</style>