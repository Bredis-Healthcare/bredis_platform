const ghpages = require('gh-pages');

function callback(err) {
  if (err) {
    console.error("Failed to deploy:", err);
  } else {
    console.log("Successfully deployed!");
  }
}

// Deploy to gh-pages   
ghpages.publish('build', {
  dotfiles: true
}, callback);