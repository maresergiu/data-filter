import { shallowMount } from "@vue/test-utils";
import Pagination from "../../src/components/Pagination.vue";

describe("InputElement.vue", () => {
  let paginationProps;

  beforeAll(() => {
    paginationProps = {
      pages: [1, 2, 3, 4, 5, 6, 7],
      activePage: 1
    };
  });

  it("should exist as a component ", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...paginationProps
      }
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("should display page 1 as active if activePage prop is equal to 1", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...paginationProps
      }
    });

    expect(
      wrapper
        .find("[data-test-scope=pagination-element-1]")
        .attributes("class")
        .indexOf("active") > -1
    ).toBeTruthy();
  });

  it("should display page 2 as not active if activePage prop is equal to 1", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...paginationProps
      }
    });

    expect(
      wrapper
        .find("[data-test-scope=pagination-element-2]")
        .attributes("class")
        .indexOf("active") > -1
    ).toBeFalsy();
  });

  it("should display page 1 and 2 if activePage prop is equal to 1", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...paginationProps
      }
    });

    expect(
      wrapper.find("[data-test-scope=pagination-element-1] .cta").exists()
    ).toBeTruthy();
    expect(
      wrapper.find("[data-test-scope=pagination-element-2] .cta").exists()
    ).toBeTruthy();
    expect(
      wrapper.find("[data-test-scope=pagination-element-3] .cta").exists()
    ).toBeFalsy();
  });

  it("should display page 2, 3 and 4 if activePage prop is equal to 3", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...paginationProps,
        activePage: 3
      }
    });

    expect(
      wrapper.find("[data-test-scope=pagination-element-1] .cta").exists()
    ).toBeFalsy();
    expect(
      wrapper.find("[data-test-scope=pagination-element-2] .cta").exists()
    ).toBeTruthy();
    expect(
      wrapper.find("[data-test-scope=pagination-element-3] .cta").exists()
    ).toBeTruthy();
    expect(
      wrapper.find("[data-test-scope=pagination-element-4] .cta").exists()
    ).toBeTruthy();
    expect(
      wrapper.find("[data-test-scope=pagination-element-5] .cta").exists()
    ).toBeFalsy();
  });

  it("should disable first cta is activePage prop is 1", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...paginationProps
      }
    });

    expect(
      wrapper
        .find("[data-test-scope=pagination-element-first] .cta")
        .attributes("class")
        .indexOf("disabled") > -1
    ).toBeTruthy();
  });

  it("should disable first cta is activePage prop is 7", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...paginationProps,
        activePage: 7
      }
    });

    expect(
      wrapper
        .find("[data-test-scope=pagination-element-last] .cta")
        .attributes("class")
        .indexOf("disabled") > -1
    ).toBeTruthy();
  });

  it("should emit emittedActivePage if a page is selected", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...paginationProps,
        activePage: 7
      }
    });

    wrapper
      .find("[data-test-scope=pagination-element-6] .cta")
      .trigger("click");

    expect(wrapper.emitted().emittedActivePage).toBeTruthy();
  });

  it("should emit emittedActivePage with calue of 6 if page 6 was selected", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...paginationProps,
        activePage: 7
      }
    });

    wrapper
      .find("[data-test-scope=pagination-element-6] .cta")
      .trigger("click");

    expect(wrapper.emitted().emittedActivePage[0][0]).toBe(6);
  });
});
