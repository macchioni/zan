const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Aggiungi il plugin RSS qui, all'interno della funzione
  eleventyConfig.addPlugin(pluginRss);
  
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("formatDate", (dateObj, format = "yyyy-MM-dd") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Collezioni per i feed RSS
  eleventyConfig.addCollection("journal", function(collection) {
    return collection.getFilteredByGlob("src/journal/*.md").reverse();
  });

  eleventyConfig.addCollection("links", function(collection) {
    return collection.getFilteredByGlob("src/links/*.md").reverse();
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

  // Filtri necessari per i feed RSS
  eleventyConfig.addFilter("htmlToAbsoluteUrls", require("@11ty/eleventy-plugin-rss").htmlToAbsoluteUrls);
  eleventyConfig.addFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addFilter("getNewestCollectionItemDate", pluginRss.getNewestCollectionItemDate);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};

// Aggiungi questo dopo gli altri addFilter/addPlugin
eleventyConfig.addShortcode("buildTime", () => {
  return new Date().toLocaleString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
});