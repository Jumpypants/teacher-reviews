// Test file for capitalization
const capitalizeWords = (str) => {
  if (!str) return str;
  return str.replace(/\b\w+/g, (word) => {
    // If the word is already all uppercase (like APLAC, AP, etc.), keep it as is
    if (word === word.toUpperCase()) {
      return word;
    }
    // If the word has mixed case, preserve it (like McDonald, iPhone, etc.)
    if (word !== word.toLowerCase()) {
      return word;
    }
    // Only capitalize if the word is all lowercase
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
};

// Test cases
console.log('Testing smart capitalization:');
console.log('john smith ->', capitalizeWords('john smith'));
console.log('APLAC ->', capitalizeWords('APLAC'));
console.log('AP chemistry ->', capitalizeWords('AP chemistry'));
console.log('McDonald ->', capitalizeWords('McDonald'));
console.log('iPhone programming ->', capitalizeWords('iPhone programming'));
console.log('math, APLAC, biology ->', capitalizeWords('math, APLAC, biology'));
console.log('UCLA physics ->', capitalizeWords('UCLA physics'));
console.log('harvard university ->', capitalizeWords('harvard university'));

module.exports = { capitalizeWords };
