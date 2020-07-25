// this function extends the functionality of the holder of the pagination component
// this function has to be placed in the mixin property width two arguments ex:  mixins: [paginationParent("paginationListArray", "enablePagination")]
function paginationParent(listName, enablePagination) {
  const paginationParent = {
    data: () => {
      return {
        paginationElemPerPage: 8, // elements displayed per page
        paginationActivePage: 1, // the active page
        paginationTotalPages: 0, // the total number of pages
        paginationTotalPagesArray: [], // the total number of pages
        listToBeDisplayed: [], // will be populated if pagination is enabled
        paginatedList: [] // list of elements that will be displayed
      };
    },
    watch: {
      // the displayed list changes when the active page changes
      paginationActivePage() {
        this.calcUnitsPerPage(this.list);
      },
      list() {
        // reset the starting point to 1 when the list changes
        this.setActivePage(1);

        if (this.enablePagination) {
          this.calcUnitsPerPage(this.list);
          this.updatePagination(this.list);
        }
      }
    },
    computed: {
      // props are not accesible here, usage of computed propperty to retrieve the values
      listArray() {
        return this[listName];
      },
      enablePaginationCheck() {
        return this[enablePagination];
      }
    },
    methods: {
      // update the ctas from the pagination component
      updatePagination(filteredList) {
        if (Array.isArray(filteredList)) {
          this.paginationTotalPages = Math.ceil(
            filteredList.length / this.paginationElemPerPage
          );

          this.paginationTotalPagesArray = Array.from(
            Array(this.paginationTotalPages),
            (_, i) => i + 1
          );
        }
      },
      setListTodisplay(list) {
        this.paginatedList = list;
      },
      setActivePage(page) {
        this.paginationActivePage = page;
      },
      // show the custom page of the list
      generateCustomPage(filteredList) {
        const list = [],
          end = this.paginationActivePage * this.paginationElemPerPage,
          start = end - this.paginationElemPerPage;

        for (let x = start; x < end; x += 1) {
          filteredList[x] && list.push(filteredList[x]);
        }

        return list;
      },
      calcUnitsPerPage(filteredList) {
        let list = this.enablePaginationCheck
          ? this.generateCustomPage(filteredList)
          : this.listArray;

        this.setListTodisplay(list);
      }
    },
    mounted() {
      // update the pagination module
      this.updatePagination(this.listArray);

      // extract which elements to display based on number of page
      this.calcUnitsPerPage(this.listArray);
    }
  };

  return enablePagination ? paginationParent : {};
}

export default paginationParent;
