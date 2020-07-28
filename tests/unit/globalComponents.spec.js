import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import GlobalComponents from "../../src/components/GlobalComponents.vue";
import loaderStoreMock from "../../src/store/mocks/loader";

describe("InputElement.vue", () => {
  let localVue, store;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      modules: {
        loader: loaderStoreMock
      }
    });
  });

  it("should exist as a component ", () => {
    const wrapper = mount(GlobalComponents, {
      store,
      localVue
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("should include the Loader component", () => {
    const wrapper = mount(GlobalComponents, {
      store,
      localVue
    });

    expect(wrapper.find(".loader").exists()).toBeTruthy();
  });
});
