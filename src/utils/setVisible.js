const setTabStyleVisibility = (shouldBeVisible) => {
  var elem;
  shouldBeVisible
    ? (elem = {
        tabBarStyle: { display: "flex" },
      })
    : (elem = {
        tabBarStyle: { display: "none" },
      });
  return elem;
};

export default setTabStyleVisibility;
