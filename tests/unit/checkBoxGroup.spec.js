import { shallowMount } from "@vue/test-utils";
import CheckboxGroup from "../../src/components/CheckboxGroup.vue";

describe("CheckboxGroup.vue", () => {
  let checkBoxProp;

  beforeAll(() => {
    checkBoxProp = {
      inputName: "prefered-pet",
      checkBoxes: [
        {
          id: "check-box-cat",
          value: "cat",
          label: "cat"
        },
        {
          id: "check-box-dog",
          value: "dog",
          label: "dog"
        }
      ],
      triggerValidation: 0,
      resetInput: 0
    };
  });

  it("should exist as a component ", () => {
    const wrapper = shallowMount(CheckboxGroup, {
      propsData: {
        ...checkBoxProp
      }
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it(`should render 2 checkboxes`, () => {
    const wrapper = shallowMount(CheckboxGroup, {
      propsData: {
        ...checkBoxProp
      }
    });

    expect(wrapper.findAll("div.input-element_checkbox").length).toBe(
      checkBoxProp.checkBoxes.length
    );
  });

  it(`should have the properties name, value, id, and type populated`, () => {
    const wrapper = shallowMount(CheckboxGroup, {
      propsData: {
        ...checkBoxProp
      }
    });

    const { value, id } = checkBoxProp.checkBoxes[0],
      attributes = wrapper.find(`#${id}`).attributes();

    expect(attributes.value).toBe(value);
    expect(attributes.name).toBe("prefered-pet");
    expect(attributes.type).toBe("checkbox");
    expect(attributes.id).toBe(id);
  });

  it(`should show the label if hideLabel is not set`, () => {
    const wrapper = shallowMount(CheckboxGroup, {
      propsData: {
        ...checkBoxProp
      }
    });

    expect(
      wrapper.find(`[for=${checkBoxProp.checkBoxes[0].id}]`).exists()
    ).toBe(true);
  });

  it(`should hide the label if hideLabel is set to true`, () => {
    const wrapper = shallowMount(CheckboxGroup, {
      propsData: {
        ...checkBoxProp,
        hideLabel: true
      }
    });

    expect(
      wrapper
        .find(`label[for=${checkBoxProp.checkBoxes[0].id}]`)
        .attributes("class")
        .indexOf("hidden") > -1
    ).toBe(true);
  });

  it(`should emit emittedValidInput event if checkbox is selected`, () => {
    const wrapper = shallowMount(CheckboxGroup, {
      propsData: {
        ...checkBoxProp
      }
    });

    wrapper.find(`#${checkBoxProp.checkBoxes[0].id}`).trigger("click");

    expect(wrapper.emitted().emittedValidInput).toBeTruthy();
  });

  it(`should reset the input if resetInput prop is incremented`, async () => {
    const wrapper = shallowMount(CheckboxGroup, {
      propsData: {
        ...checkBoxProp
      }
    });

    wrapper.find(`#${checkBoxProp.checkBoxes[0].id}`).trigger("click");

    expect(wrapper.vm.$data.inputValue).toBe(checkBoxProp.checkBoxes[0].value);

    wrapper.setProps({ resetInput: 1 });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.inputValue).toBe("");
    expect(wrapper.vm.$data.activeCheckBoxes.length).toBe(0);
  });

  it(`should validate if triggerValidation is incremented`, async () => {
    const wrapper = shallowMount(CheckboxGroup, {
      propsData: {
        ...checkBoxProp
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(
      wrapper.findAll(".input-element_error .text").length
    ).toBeGreaterThanOrEqual(1);
  });

  it(`should reset error if a checkbox is selected`, async () => {
    const wrapper = shallowMount(CheckboxGroup, {
      propsData: {
        ...checkBoxProp
      }
    });

    wrapper.setProps({ triggerValidation: 1 });

    await wrapper.vm.$nextTick();

    expect(
      wrapper.findAll(".input-element_error .text").length
    ).toBeGreaterThanOrEqual(1);

    wrapper.find(`#${checkBoxProp.checkBoxes[0].id}`).trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".input-element_error .text").length).toBe(0);
  });
});
