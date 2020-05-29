(function() {
  const connections = [
    "Church Tower-Sportsgrounds", "Church Tower-Big Maple", "Big Maple-Sportsgrounds",
    "Big Maple-Woods", "Big Maple-Fabienne's Garden", "Fabienne's Garden-Woods",
    "Fabienne's Garden-Cow Pasture", "Cow Pasture-Big Oak", "Big Oak-Butcher Shop",
    "Butcher Shop-Tall Poplar", "Tall Poplar-Sportsgrounds", "Tall Poplar-Chateau",
    "Chateau-Great Pine", "Great Pine-Jacques' Farm", "Jacques' Farm-Hawthorn",
    "Great Pine-Hawthorn", "Hawthorn-Gilles' Garden", "Great Pine-Gilles' Garden",
    "Gilles' Garden-Big Oak", "Gilles' Garden-Butcher Shop", "Chateau-Butcher Shop"
  ];

  function storageFor(name) {
    let storage = Object.create(null);
    storage["food caches"] = ["cache in the oak", "cache in the meadow", "cache under the hedge"];
    storage["cache in the oak"] = "A hollow above the third big branch from the bottom.\
    Several pieces of bread and a pile of acorns.";
    storage["cache in the meadow"] = ""
  }
})();
