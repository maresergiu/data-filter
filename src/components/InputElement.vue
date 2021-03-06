<template>
  <div>
    <label :for="inputId" :class="{ hidden: hideLabel }" class="label">
      {{ label }}
    </label>
    <input
      :type="inputType"
      :id="inputId"
      :name="inputName"
      :placeholder="placeholder"
      class="input-element_input"
      :data-test-scope="`input-element-${inputId}`"
      :value="inputValue"
      @keyup="handleKeyUp"
    />
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
  name: "InputElement",
  props: {
    label: {
      // the label of the input
      type: String,
      required: true
    },
    hideLabel: {
      // toggle the label visibility
      type: Boolean,
      default: false
    },
    inputId: {
      // the input ID
      type: String,
      required: true
    },
    inputName: {
      // the input name
      type: String,
      required: true
    },
    inputType: {
      // the input name
      type: String,
      required: true
    },
    placeholder: {
      // the input placeholder
      type: String,
      default: ""
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
    },
    resetValidationObj: {
      // resets the input
      type: Number,
      required: false,
      default: 0
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
    },
    resetValidationObj() {
      this.resetValidationError();
    },
    inputErrors() {
      this.inputErrors.length && this.emitError();
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
    // hides the visible error
    resetValidationError() {
      this.inputErrors = [];
    },
    // resets the value to an empty string
    resetInputValue() {
      this.inputValue = "";
    },
    emitError() {
      if (this.validationObj.error)
        this.$emit("emittedErrorInput", {
          name: this.inputName,
          value: this.inputValue
        });
    },
    // emit the result of validation
    emitData() {
      this.$emit("emittedValidInput", {
        name: this.inputName,
        value: this.inputValue
      });
    },
    handleKeyUp(event) {
      const eventValue = event.target.value.trim();
      this.inputValue =
        this.inputType === "number" ? parseFloat(eventValue) : eventValue;

      this.resetValidationError();
      this.emitData();
    }
  }
};
</script>
