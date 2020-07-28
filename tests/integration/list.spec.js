import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import { cloneDeep } from "lodash";

import mockedPeopleListList from "../../src/store/mocks/people-list";
import listStoreMock from "../../src/store/mocks/list";
import listStoreFile from "../../src/store/list";
import List from "../../src/components/List.vue";

describe("InputElement.vue", () => {
  let peopleList = mockedPeopleListList,
    listProps,
    fakeStore,
    validStore,
    localVue;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    fakeStore = new Vuex.Store({
      modules: {
        list: listStoreMock
      }
    });

    validStore = new Vuex.Store({
      modules: {
        list: cloneDeep(listStoreFile)
      }
    });

    listProps = {
      list: peopleList,
      enablePagination: true
    };
  });

  it("should exist as a component ", () => {
    const wrapper = mount(List, {
      propsData: {
        ...listProps
      },
      store: fakeStore,
      localVue
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("should display the full length of the list if enablePagination prop is set to false", () => {
    const wrapper = mount(List, {
      propsData: {
        ...listProps,
        enablePagination: false
      }
    });

    expect(
      wrapper
        .find("[data-test-scope=list-count]")
        .text()
        .indexOf(listProps.list.length)
    ).toBeTruthy();
  });

  it("should display number 8 for the list length if enablePagination prop is true", async () => {
    const wrapper = mount(List, {
      propsData: {
        ...listProps
      },
      store: fakeStore,
      localVue
    });

    await wrapper.vm.$nextTick();

    expect(
      wrapper
        .find("[data-test-scope=list-count]")
        .text()
        .indexOf("8") > -1
    ).toBe(true);
  });

  it("should display the Pagination vue component if enablePagination is set to true", () => {
    const wrapper = mount(List, {
      propsData: {
        ...listProps
      },
      store: fakeStore,
      localVue
    });

    expect(wrapper.find("[data-test-scope=pagination]").exists()).toBe(true);
  });

  it("should update the displayed list if the active page changes", async () => {
    const wrapper = mount(List, {
      propsData: {
        ...listProps
      },
      store: validStore,
      localVue
    });

    await wrapper.vm.$nextTick();

    const pageOneName = wrapper.find("[data-test-scope=list-element-name]");

    wrapper
      .find("[data-test-scope=pagination-element-2] .cta")
      .trigger("click");

    await wrapper.vm.$nextTick();

    const pageTwoName = wrapper
      .find("[data-test-scope=list-element-name]")
      .text();

    expect(pageOneName !== pageTwoName).toBe(true);
  });
});
