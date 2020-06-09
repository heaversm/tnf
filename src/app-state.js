const AppState = {
  state: {
    collectionIndex: 0,
  },
  setCollectionURLParams(collectionIndex) {
    const params = new URLSearchParams(location.search);
    params.set("collection", collectionIndex);
    window.history.pushState({}, "", `${location.pathname}?${params}`);
  },
  setCollectionIndex(collectionIndex) {
    if (collectionIndex !== this.state.collectionIndex) {
      this.state.collectionIndex = collectionIndex;
      this.setCollectionURLParams(collectionIndex);
    }
  },
};

export default AppState;
