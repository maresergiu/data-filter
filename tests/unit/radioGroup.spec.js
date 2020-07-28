import { shallowMount } from "@vue/test-utils";
import RadioGroup from "../../src/components/RadioGroup.vue";

describe("RadioGroup.vue", () => {
  let radioBoxProps;

  beforeAll(() => {
    radioBoxProps = {
      inputName: "gender",
      radioBoxes: [
        {
          id: "gender-male",
          value: "male",
          label: "male"
        },
        {
          id: "gender-female",
          value: "female",
          label: "female"
        }
      ],
      triggerValidation: 0,
      resetInput: 0
    };
  });

  it("should exist as a component ", () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        ...radioBoxProps
      }
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it(`should render 2 radio boxes`, () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        ...radioBoxProps
      }
    });

    expect(
      wrapper.findAll("[data-test-scope=input-element-radio-input]").length
    ).toBe(radioBoxProps.radioBoxes.length);
  });

  it(`should have the properties name, value, id, and type populated`, () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        ...radioBoxProps
      }
    });

    const { value, id } = radioBoxProps.radioBoxes[0],
      attributes = wrapper.find(`#${id}`).attributes();

    expect(attributes.value).toBe(value);
    expect(attributes.name).toBe("gender");
    expect(attributes.type).toBe("radio");
    expect(attributes.id).toBe(id);
  });

  it(`should show the label if hideLabel is not set`, () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        ...radioBoxProps
      }
    });

    expect(
      wrapper.find(`[for=${radioBoxProps.radioBoxes[0].id}]`).exists()
    ).toBe(true);
  });

  it(`should hide the label if hideLabel is set to true`, () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        ...radioBoxProps,
        hideLabel: true
      }
    });

    expect(
      wrapper
        .find(`label[for=${radioBoxProps.radioBoxes[0].id}]`)
        .attributes("class")
        .indexOf("hidden") > -1
    ).toBe(true);
  });

  it(`should emit emittedValidInput event if radiobox is selected`, () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        ...radioBoxProps
      }
    });

    wrapper.find(`#${radioBoxProps.radioBoxes[0].id}`).trigger("click");

    expect(wrapper.emitted().emittedValidInput).toBeTruthy();
  });

  it(`should emit emittedErrorInput event if their is no selection in this group and the triggerValidation prop is incremented`, async () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        ...radioBoxProps
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().emittedErrorInput).toBeTruthy();
  });

  it(`should reset the input if resetInput prop is incremented`, async () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        ...radioBoxProps
      }
    });

    wrapper.find(`#${radioBoxProps.radioBoxes[0].id}`).trigger("click");

    expect(wrapper.vm.$data.inputValue).toBe(radioBoxProps.radioBoxes[0].value);

    wrapper.setProps({ resetInput: 1 });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.inputValue).toBe("");
  });

  it(`should validate if triggerValidation is incremented`, async () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        ...radioBoxProps
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(
      wrapper.findAll(".input-element_error .text").length
    ).toBeGreaterThanOrEqual(1);
  });

  it(`should reset error if a radiobox is selected`, async () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        ...radioBoxProps
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(
      wrapper.findAll(".input-element_error .text").length
    ).toBeGreaterThanOrEqual(1);

    wrapper.find(`#${radioBoxProps.radioBoxes[0].id}`).trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".input-element_error .text").length).toBe(0);
  });
});
