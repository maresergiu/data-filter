<template>
  <div class="input-element">
    <div
      v-for="checkBox in checkBoxes"
      :key="checkBox.id"
      class="input-element_radio inline-bl"
    >
      <input
        type="radio"
        :id="checkBox.id"
        :name="inputName"
        :value="checkBox.value"
        v-model="inputValue"
        class="input-element_radio-input"
        @change="handleChange"
      />
      <label :for="checkBox.id" :class="{ hidden: hideLabel }" class="label">
        {{ checkBox.label }}
      </label>
    </div>
    <div class="input-element_error">
      <p
        v-for="(error, index) in this.inputErrors"
        :key="error.key + index"
        class="text"
      >
        {{ validatorErrorMsg[inputName][error.type] }}
      </p>
    </div>
  </div>
</template>

<script>
import Validator from "../helpers/jsValidationSchema.js";

export default {
  name: "RadioGroup",
  props: {
    inputName: {
      // the input name
      type: String,
      required: true
    },
    hideLabel: {
      // toggle the label visibility
      type: Boolean,
      default: false
    },
    checkBoxes: {
      // stores the checkbox object
      type: Array,
      required: true
    },
    triggerValidation: {
      // trigger input validation based on the current value
      type: Number,
      required: true
    },
    resetInput: {
      // resets the input
      type: Number,
      required: true
    }
  },
  data() {
    return {
      inputErrors: [], // holds the errors after the input validated
      validatorErrorMsg: { ...Validator.customErrorMessages }, // custom validation messages
      validationObj: {}, // joi validation object
      inputValue: "" // input value
    };
  },
  watch: {
    // triggers the input validation when it's incremented
    triggerValidation() {
      this.validateInput();
    },
    resetInput() {
      this.resetInputValue();
      this.resetValidationError();
    }
  },
  methods: {
    // validate input
    validateInput() {
      const objToValidate = {};
      objToValidate[this.inputName] = this.inputValue;

      this.validationObj = Validator.jsValidationSchema.validate(objToValidate);
      this.inputErrors = this.validationObj.error
        ? [...this.validationObj.error.details]
        : [];
    },
    resetValidationError() {
      this.inputErrors = [];
    },
    resetInputValue() {
      this.inputValue = "";
    },
    emitData() {
      const objToEmit = {
        name: this.inputName,
        value: this.inputValue
      };

      if (this.validationObj.error) {
        this.$emit("emittedErrorInput", objToEmit);
      }

      this.$emit("emittedValidInput", objToEmit);
    },
    handleChange(event) {
      this.inputValue = event.target.value.trim();

      this.resetValidationError();
      this.emitData();
    }
  }
};
</script>
