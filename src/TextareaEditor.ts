export default {
  name: 'TextareaEditor',
  props: ['value'],
  template: `
    <textarea v-model="internalValue" @input="updateValue"></textarea>
  `,
  data() {
    return {
      internalValue: this.value,
    };
  },
  methods: {
    updateValue() {
      this.$emit('update:value', this.internalValue);
    }
  }
}