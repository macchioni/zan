module.exports = function(eleventyConfig) {
  // Passa i file statici direttamente
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Shortcode per la data formattata
  eleventyConfig.addShortcode("formattedDate", function(date) {
    return new Date(date).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  
  // Filtro per limitare stringhe
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });
  
  // Filtro per troncare stringhe
  eleventyConfig.addFilter("truncate", function(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  });
  
  // Configura la directory per i template nunjucks
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};

module.exports = function(eleventyConfig) {
  // formatDate filter with English month names
  eleventyConfig.addFilter("formatDate", function(date, format) {
    const d = new Date(date);
    
    // Helper function to add leading zeros to numbers < 10
    const padZero = num => num < 10 ? `0${num}` : num;
    
    // Base values
    const day = padZero(d.getDate());
    const month = padZero(d.getMonth() + 1);
    const year = d.getFullYear();
    
    // Arrays with English month names
    const fullMonths = ["January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December"];
    
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Default format: dd/mm/yyyy
    if (!format || format === "dd/mm/yyyy") {
      return `${day}/${month}/${year}`;
    }
    
    // Support for various formats
    if (format === "yyyy-mm-dd") {
      return `${year}-${month}-${day}`;
    }
    
    if (format === "dd LLL yyyy") {
      return `${day} ${shortMonths[d.getMonth()]} ${year}`;
    }
    
    if (format === "dd MMMM yyyy") {
      return `${day} ${fullMonths[d.getMonth()]} ${year}`;
    }
    
    // Fallback to ISO format
    return d.toISOString().split('T')[0];
  });

  // The rest of your existing configuration
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};