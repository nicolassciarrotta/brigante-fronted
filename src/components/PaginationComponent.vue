<template>
    <section>
        <b-pagination
            :total="total"
            v-model="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            :page-input="hasInput"
            :page-input-position="inputPosition"
            :debounce-page-input="inputDebounce"
            @change="handleClick()"
            class="mb-5"
        />
    </section>
</template>

<script>
export default {
    data() {
        return {
            current: 1,
            rangeBefore: 1,
            rangeAfter: 3,
            order: '',
            size: '',
            isSimple: false,
            isRounded: false,
            hasInput: false,
            prevIcon: 'chevron-left',
            nextIcon: 'chevron-right',
            inputPosition: '',
            inputDebounce: ''
        }
    },
    props: {
      total: { type: Number },
      perPage: { type: Number },
    },
    methods: {
      handleClick() {
        this.$emit('pageChange', this.current);
      }
    },
}
</script>