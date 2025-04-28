const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");
const slugify = require("slugify");

module.exports = function (eleventyConfig) {
  // Aggiungi il plugin RSS
  eleventyConfig.addPlugin(pluginRss);

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("smartApostrophe", function(value) {
    if (!value) return value;
    return value.replace(/'/g, "’");
  });

  // Filtro per slug URL-friendly
  eleventyConfig.addFilter("slug", (input) => {
    return slugify(input, { lower: true, remove: /[*+~.()'"!:@]/g });
  });

  // Filtro per data leggibile
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Filtro per formattazione date
  eleventyConfig.addFilter("formatDate", (dateObj, format = "yyyy-MM-dd") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Collezione journal
  eleventyConfig.addCollection("journal", function (collection) {
    return collection.getFilteredByGlob("src/journal/*.md").reverse();
  });

  // Collezione links
  eleventyConfig.addCollection("links", function (collection) {
    return collection.getFilteredByGlob("src/links/*.md").reverse();
  });

  // Collezione posts
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md").reverse();
  });

  // Collezione dei tag filtrando quelli "falsi"
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = {};

    collection.getAll().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags.filter(tag => !["all", "posts", "tagList", "journal", "links"].includes(tag))
            .forEach(tag => {
              if (!tagSet[tag]) {
                tagSet[tag] = [];
              }
              tagSet[tag].push(item);
            });
      }
    });

    return tagSet;
  });

  // Filtro per affettare gli array
  eleventyConfig.addFilter("slice", function (array, start, end) {
    return array.slice(start, end);
  });

  // Filtro per eliminare "all" da una collezione
  eleventyConfig.addFilter("dichotomize", function (collection) {
    let result = {};

    for (let key in collection) {
      if (key !== "all") {
        result[key] = collection[key];
      }
    }

    return result;
  });

  // Filtri RSS
  eleventyConfig.addFilter("htmlToAbsoluteUrls", pluginRss.htmlToAbsoluteUrls);
  eleventyConfig.addFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addFilter("getNewestCollectionItemDate", pluginRss.getNewestCollectionItemDate);

  // Shortcode per la buildTime
  eleventyConfig.addShortcode("buildTime", () => {
    return new Date().toLocaleString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  });

  // Copia statica degli assets
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Configurazione finale
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
