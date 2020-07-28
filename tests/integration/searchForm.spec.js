import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import SearchForm from "../../src/components/SearchForm.vue";
import searchFormStoreMock from "../../src/store/mocks/searchForm";

describe("RadioGroup.vue", () => {
  let localVue, store;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      modules: {
        searchForm: searchFormStoreMock
      }
    });
  });

  it("should exist as a component ", () => {
    const wrapper = mount(SearchForm, {
      store,
      localVue
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("should show a form error bellow the search input if no filter is selected and the search input has no value", async () => {
    const wrapper = mount(SearchForm, {
      store,
      localVue
    });

    wrapper.find("[data-test-scope=search-form-search-cta]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.formErrorState.length > 0).toBeTruthy();
  });

  it("should reset all the form errors if rest cta is clicked", async () => {
    const wrapper = mount(SearchForm, {
      store,
      localVue
    });

    wrapper.find("[data-test-scope=search-form-search-cta]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.formErrorState.length > 0).toBeTruthy();

    wrapper.find("[data-test-scope=search-form-reset-cta]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.formErrorState.length === 0).toBeTruthy();
  });

  it("should reset all the form errors if the user interacts with the checkbox form the filters area", async () => {
    const wrapper = mount(SearchForm, {
      store,
      localVue
    });

    wrapper.find("[data-test-scope=search-form-search-cta]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.formErrorState.length > 0).toBeTruthy();

    wrapper.find("[type=checkbox]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.formErrorState.length === 0).toBeTruthy();
    expect(
      wrapper.find("[data-test-scope=input-element-error] .text").exists()
    ).toBeFalsy();
  });

  it("should reset input type text value if the user clicks the reset cta", async () => {
    const wrapper = mount(SearchForm, {
        store,
        localVue
      }),
      inputValue = "input_test_text",
      inputText = wrapper.find("[data-test-scope=input-element-name]");

    inputText.setValue(inputValue);
    inputText.trigger("keyup");

    expect(inputText.element.value).toBe(inputValue);

    await wrapper.vm.$nextTick();

    wrapper.find("[data-test-scope=search-form-reset-cta]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(inputText.element.value).toBe("");
  });

  it("should reset the checked state of the input type checkbox if the user clicks the reset cta", async () => {
    const wrapper = mount(SearchForm, {
        store,
        localVue
      }),
      inputCheckBox = wrapper.find("[type=checkbox]");

    inputCheckBox.trigger("click");

    await wrapper.vm.$nextTick();

    wrapper.find("[data-test-scope=search-form-reset-cta]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(inputCheckBox.element.checked).toBe(false);
  });
});
