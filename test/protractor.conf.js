exports.config = {
  capabilities: {
    'browserName': 'chrome'
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/end2end/carousel.js']
};
