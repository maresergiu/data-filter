import { shallowMount } from "@vue/test-utils";
import InputElement from "../../src/components/InputElement.vue";

describe("InputElement.vue", () => {
  let inputProps;

  beforeAll(() => {
    inputProps = {
      label: "full name",
      inputId: "name",
      inputName: "name",
      inputType: "text",
      placeholder: "Search by name",
      class: "search-form_search-input float-left",
      hideLabel: true,
      triggerValidation: 0,
      resetInput: 0,
      resetValidationObj: 0
    };
  });

  it("should exist as a component ", () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("should show the label if the hideLabel prop is not set", async () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    wrapper.setProps({ hideLabel: false });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(`label[for=${inputProps.inputId}]`).exists()).toBe(
      true
    );
  });

  it("should display the input type as passed in props", () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    expect(
      wrapper
        .find(`[data-test-scope=input-element-${inputProps.inputId}]`)
        .attributes("type")
    ).toBe(inputProps.inputType);
  });

  it("should display the input id as passed in props", () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    expect(
      wrapper
        .find(`[data-test-scope=input-element-${inputProps.inputId}]`)
        .attributes("id")
    ).toBe(inputProps.inputId);
  });

  it("should display the input name as passed in props", () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    expect(
      wrapper
        .find(`[data-test-scope=input-element-${inputProps.inputId}]`)
        .attributes("name")
    ).toBe(inputProps.inputName);
  });

  it("should display the input type as passed in props", () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    expect(
      wrapper
        .find(`[data-test-scope=input-element-${inputProps.inputId}]`)
        .attributes("type")
    ).toBe(inputProps.inputType);
  });

  it("should display the input placeholder as passed in props", () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    expect(
      wrapper
        .find(`[data-test-scope=input-element-${inputProps.inputId}]`)
        .attributes("placeholder")
    ).toBe(inputProps.placeholder);
  });

  it("should trigger the validation if triggerValidation increments", async () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(
      wrapper.findAll(".input-element_error .text").length
    ).toBeGreaterThanOrEqual(1);
  });

  it("should reset the input value and errors if resetInput is incremented", async () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(
      wrapper.findAll(".input-element_error .text").length
    ).toBeGreaterThanOrEqual(1);

    wrapper.setProps({ resetInput: 1 });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".input-element_error .text").exists()).toBe(false);
  });

  it("should reset the input errors if resetValidationObj is incremented", async () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(
      wrapper.findAll(".input-element_error .text").length
    ).toBeGreaterThanOrEqual(1);

    wrapper.setProps({ resetValidationObj: 1 });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".input-element_error .text").exists()).toBe(false);
  });

  it("should emit emittedValidInput if use has trigger a handleKeyUp event", async () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    const input = wrapper.find(
      `[data-test-scope=input-element-${inputProps.inputId}]`
    );

    input.setValue("input_test_value");
    input.trigger("keyup");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().emittedValidInput).toBeTruthy();
  });

  it(`should emit emittedErrorInput event if their is no selection in this group and the triggerValidation prop is incremented`, async () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().emittedErrorInput).toBeTruthy();
  });

  it("should generate an error if validation fails", async () => {
    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(`.input-element_error .text`).exists()).toBeTruthy();
  });

  it("should save an integer in the property inputValue if inputType is a number", async () => {
    inputProps.inputType = "number";

    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    const input = wrapper.find(
      `[data-test-scope=input-element-${inputProps.inputId}]`
    );

    input.setValue(4);
    input.trigger("keyup");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.inputValue).toBe(4);
  });

  it("should reset the input error if a keyup event has been triggered ", async () => {
    inputProps.inputType = "number";

    const wrapper = shallowMount(InputElement, {
      propsData: {
        ...inputProps
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(`.input-element_error .text`).exists()).toBeTruthy();

    const input = wrapper.find(
      `[data-test-scope=input-element-${inputProps.inputId}]`
    );

    input.setValue("input_value_test");
    input.trigger("keyup");

    await wrapper.vm.$nextTick();

    expect(wrapper.find(`.input-element_error .text`).exists()).toBeFalsy();
  });
});
