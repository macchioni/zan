const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("formatDate", (dateObj, format = "yyyy-MM-dd") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Crea una collezione di tag con conteggi
eleventyConfig.addCollection("tagList", function(collection) {
  let tagSet = {};
  
  collection.getAll().forEach(function(item) {
    if ("tags" in item.data) {
      let tags = item.data.tags;
      
      tags.filter(tag => tag !== "posts" && tag !== "all").forEach(tag => {
        if (!tagSet[tag]) {
          tagSet[tag] = [];
        }
        tagSet[tag].push(item);
      });
    }
  });
  
  return tagSet;
});
  
  // Aggiungi questo nuovo filtro
  eleventyConfig.addFilter("slice", function(array, start, end) {
    return array.slice(start, end);
  });

  eleventyConfig.addPassthroughCopy("./src/assets");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md").reverse();
  });

  eleventyConfig.addFilter("dichotomize", function(collection) {
    let result = {};
    
    // Itera su tutte le collezioni
    for (let key in collection) {
      // Salta la collezione "all"
      if (key !== "all") {
        result[key] = collection[key];
      }
    }
    
    return result;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};