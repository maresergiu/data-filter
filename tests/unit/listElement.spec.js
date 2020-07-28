import { shallowMount } from "@vue/test-utils";
import ListElement from "../../src/components/ListElement.vue";

describe("InputElement.vue", () => {
  let listElemObj = {
      _id: "5d5d7ad6f60ac61d13c605d8",
      age: 20,
      eyeColor: "brown",
      name: "Daphne Mcdowell",
      gender: "female",
      location: {
        latitude: -55.331803,
        longitude: -96.369261
      },
      preferences: {
        pet: "none",
        fruit: "strawberry"
      }
    },
    listElementProps;

  beforeAll(() => {
    listElementProps = {
      listElem: listElemObj,
      activeListElem: "-1"
    };
  });

  it("should exist as a component ", () => {
    const wrapper = shallowMount(ListElement, {
      propsData: {
        ...listElementProps
      }
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("should display the listElem property gender", () => {
    const wrapper = shallowMount(ListElement, {
      propsData: {
        ...listElementProps
      }
    });

    expect(wrapper.find("[data-test-scope=list-element-gender]").text()).toBe(
      listElemObj.gender
    );
  });

  it("should display the listElem property age", () => {
    const wrapper = shallowMount(ListElement, {
      propsData: {
        ...listElementProps
      }
    });

    expect(
      parseInt(wrapper.find("[data-test-scope=list-element-age]").text())
    ).toBe(listElemObj.age);
  });

  it("should display the listElem property eye-color", () => {
    const wrapper = shallowMount(ListElement, {
      propsData: {
        ...listElementProps
      }
    });

    expect(
      wrapper.find("[data-test-scope=list-element-eye-color]").text()
    ).toBe(listElemObj.eyeColor);
  });

  it("should display the listElem property name", () => {
    const wrapper = shallowMount(ListElement, {
      propsData: {
        ...listElementProps
      }
    });

    expect(wrapper.find("[data-test-scope=list-element-name]").text()).toBe(
      listElemObj.name
    );
  });

  it("should display the listElem property preferences.pet", () => {
    const wrapper = shallowMount(ListElement, {
      propsData: {
        ...listElementProps
      }
    });

    expect(wrapper.find("[data-test-scope=list-element-pet]").text()).toBe(
      listElemObj.preferences.pet
    );
  });

  it("should display the listElem property preferences.fruit", () => {
    const wrapper = shallowMount(ListElement, {
      propsData: {
        ...listElementProps
      }
    });

    expect(wrapper.find("[data-test-scope=list-element-fruit]").text()).toBe(
      listElemObj.preferences.fruit
    );
  });

  it("should hide the listElem details list if activeListElem is not equal with the _id", () => {
    const wrapper = shallowMount(ListElement, {
      propsData: {
        ...listElementProps
      }
    });

    expect(
      wrapper
        .find("[data-test-scope=list-element-details]")
        .attributes("active")
    ).toBeFalsy();
  });

  it("should show the listElem details list if activeListElem is equal with the _id", async () => {
    listElementProps.activeListElem = listElemObj._id;

    const wrapper = shallowMount(ListElement, {
      propsData: {
        ...listElementProps
      }
    });

    wrapper
      .find("[data-test-scope=list-element-dropd-down-cta]")
      .trigger("click");

    await wrapper.vm.$nextTick();

    expect(
      wrapper
        .find("[data-test-scope=list-element-details]")
        .attributes("active")
    ).toBeTruthy();
  });
});
