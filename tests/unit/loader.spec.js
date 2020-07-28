import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Loader from "../../src/components/Loader.vue";
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
    const wrapper = shallowMount(Loader, {
      store,
      localVue
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("should add the active class if vuex state property loaderVisibility is set to true", () => {
    loaderStoreMock.state.loaderVisibility = true;
    store = new Vuex.Store({
      modules: {
        loader: loaderStoreMock
      }
    });

    const wrapper = shallowMount(Loader, {
      store,
      localVue
    });

    expect(wrapper.attributes("class").indexOf("active") > -1).toBeTruthy();
  });
});
