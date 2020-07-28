<template>
  <div class="input-element">
    <div
      v-for="radioBox in radioBoxes"
      :key="radioBox.id"
      class="input-element_radio inline-bl"
    >
      <input
        type="radio"
        :id="radioBox.id"
        :name="inputName"
        :value="radioBox.value"
        v-model="inputValue"
        class="input-element_radio-input"
        data-test-scope="input-element-radio-input"
        @change="handleChange"
      />
      <label :for="radioBox.id" :class="{ hidden: hideLabel }" class="label">{{
        radioBox.label
      }}</label>
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
    radioBoxes: {
      // stores the radioBox object
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
    resetValidationError() {
      this.inputErrors = [];
    },
    resetInputValue() {
      this.inputValue = "";
    },
    // emits the validation error obj to parent
    emitError() {
      if (this.validationObj.error)
        this.$emit("emittedErrorInput", {
          name: this.inputName,
          value: this.inputValue
        });
    },
    // emit the data of the input
    emitData() {
      this.$emit("emittedValidInput", {
        name: this.inputName,
        value: this.inputValue
      });
    },
    handleChange(event) {
      this.inputValue = event.target.value.trim();

      this.resetValidationError();
      this.emitData();
    }
  }
};
</script>
