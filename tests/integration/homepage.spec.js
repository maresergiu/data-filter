import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import { cloneDeep, wrap } from "lodash";
import flushPromises from "flush-promises";

import listStoreFile from "../../src/store/list";
import loaderStoreFile from "../../src/store/loader";
import searchFormStoreFile from "../../src/store/searchForm";
import mockedPeopleListList from "../../src/store/mocks/people-list";

import HomePage from "../../src/views/HomePage.vue";

describe("HomePage.vue", () => {
    let mockedList = mockedPeopleListList,
        store,
        localVue,
        wrapper;

    const simulateHttpSuccess = async () => {
        store.dispatch('list/setPeopleList', mockedList);
        store.dispatch('list/setPeopleFilteredList', mockedList);

        await wrapper.vm.$nextTick();
        await flushPromises();

        wrapper.vm.$data.httpState = "success";
    },
        checkDisplayedInfo = (collection, comparationArgument) => {
            for (let i = 0; i < collection.length; i += 1) {
                expect(comparationArgument.indexOf(collection.at(i).text()) > -1).toBe(true);
            }
        };

    beforeAll(() => {
        localVue = createLocalVue();
        localVue.use(Vuex);

        store = new Vuex.Store({
            modules: {
                list: cloneDeep(listStoreFile),
                loader: cloneDeep(loaderStoreFile),
                searchForm: cloneDeep(searchFormStoreFile),
            }
        });

        wrapper = mount(HomePage, {
            store,
            localVue
        });
    });

    it("should exist as a component ", async () => {
        simulateHttpSuccess();
        await flushPromises();

        expect(wrapper.exists()).toBeTruthy();
    });

    it("should display the SearchForm component", async () => {
        simulateHttpSuccess();
        await flushPromises();

        expect(wrapper.find("[data-test-scope=search-form]").exists()).toBeTruthy();
    });

    it("should display the List component", async () => {
        simulateHttpSuccess();
        await flushPromises();

        expect(wrapper.find("[ data-test-scope=list-count]").exists()).toBeTruthy();
    });

    it("should display the Pagination component", async () => {
        simulateHttpSuccess();
        await flushPromises();

        expect(wrapper.find("[ data-test-scope=pagination]").exists()).toBeTruthy();
    });

    it("should leave the list component with one element is a search is done with the parameter Stephens Townsend, pagination has no pages", async () => {
        simulateHttpSuccess();

        const searchBarInput = wrapper.find("[data-test-scope=input-element-name]");

        searchBarInput.trigger("keyup");
        searchBarInput.setValue("Stephens");
        searchBarInput.trigger("keyup");
        wrapper.find("[data-test-scope=search-form-search-cta]").trigger("click");

        // if method is not called twice the jest dom is not updated
        await flushPromises();
        await flushPromises();

        expect(wrapper.findAll("[data-test-scope=list-element]").length).toBe(1);
        expect(wrapper.find("[data-test-scope=list-element-name]").text()).toBe("Stephens Townsend");
        expect(wrapper.find("[data-test-scope=pagination-list]").exists()).toBeFalsy();
    });

    it("should leave the list component with 8 elements per page if a search is done with the parameter S, pagination has 3 pages", async () => {
        simulateHttpSuccess();

        const searchBarInput = wrapper.find("[data-test-scope=input-element-name]");

        searchBarInput.trigger("keyup");
        searchBarInput.setValue("S");
        searchBarInput.trigger("keyup");
        wrapper.find("[data-test-scope=search-form-search-cta]").trigger("click");

        // if method is not called twice the jest dom is not updated
        await flushPromises();
        await flushPromises();

        expect(wrapper.findAll("[data-test-scope=list-element]").length).toBe(8);

        wrapper.find("[data-test-scope=pagination-element-last] .cta").trigger("click");

        // if method is not called twice the jest dom is not updated
        await flushPromises();

        expect(wrapper.find("[data-test-scope=pagination-element-3] .cta").exists()).toBeTruthy();
        expect((wrapper.find("[data-test-scope=pagination-element-3]").attributes("class").indexOf("active") > -1)).toBe(true);
    });

    it("should show only users that have brown eyes if brown eye color is selected", async () => {
        simulateHttpSuccess();

        const brownEyeColorCheckBox = wrapper.find("#eyeColor-brown");

        brownEyeColorCheckBox.trigger("click");

        await wrapper.find("[data-test-scope=search-form-search-cta]").trigger("click");

        // if method is not called twice the jest dom is not updated
        await flushPromises();
        await flushPromises();

        const eyeColorListing = wrapper.findAll("[data-test-scope=list-element-eye-color]");

        checkDisplayedInfo(eyeColorListing, ["brown"]);
    });

    it("should show only users that have green eyes if green eye color is selected", async () => {
        simulateHttpSuccess();

        const brownEyeColorCheckBox = wrapper.find("#eyeColor-green");

        brownEyeColorCheckBox.trigger("click");

        await wrapper.find("[data-test-scope=search-form-search-cta]").trigger("click");

        // if method is not called twice the jest dom is not updated
        await flushPromises();
        await flushPromises();

        const eyeColorListing = wrapper.findAll("[data-test-scope=list-element-eye-color]");

        checkDisplayedInfo(eyeColorListing, ["green"]);
    });

    it("should show users that have green eyes and brown eyes if brown and green eyes color is selected", async () => {
        simulateHttpSuccess();

        wrapper.find("#eyeColor-brown").trigger("click");
        wrapper.find("#eyeColor-green").trigger("click");

        await wrapper.find("[data-test-scope=search-form-search-cta]").trigger("click");

        // if method is not called twice the jest dom is not updated
        await flushPromises();
        await flushPromises();

        const eyeColorListing = wrapper.findAll("[data-test-scope=list-element-eye-color]");

        checkDisplayedInfo(eyeColorListing, ["brown", "green"]);
    });

    it("should show users that have green eyes and prefered pet as cat if cat and brown checkboxes are selected", async () => {
        simulateHttpSuccess();

        wrapper.find("#eyeColor-brown").trigger("click");
        wrapper.find("#preferences-pet-cat").trigger("click");

        await wrapper.find("[data-test-scope=search-form-search-cta]").trigger("click");

        // if method is not called twice the jest dom is not updated
        await flushPromises();
        await flushPromises();

        const eyeColorListing = wrapper.findAll("[data-test-scope=list-element-eye-color]"),
            preferedPetListing = wrapper.findAll("[data-test-scope=list-element-prefered-pet]");

        checkDisplayedInfo(eyeColorListing, ["brown", "green"]);
        checkDisplayedInfo(preferedPetListing, ["cat"]);
    });
});