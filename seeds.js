const mongoose = require('mongoose');
const Item = require('./models/item');
const Category = require('./models/category');
const Guide = require('./models/Guide');
const Topic = require('./models/Topic');
const faker = require('faker');
const _ = require('lodash');

async function seedDB() {
  // Remove all items
  // Remove all categories
  // Remove all guides
  // Remove all topics
}

function removeType(type) {
  return type.remove ? type.remove({}) : console.log('Invalid type:', type);
}

function generateCategories(num) {
  // use lodash util method to create array of length num with undefined values
  // return array mapped to Category.create using faker values
}

function generateItems(num) {
  // use lodash util method to create array of length num with undefined values
  // return array mapped to Item.create using faker values
  // assign each item to a random category and push to category items array
}

function generateTopics(num) {}

function generateGuides(num) {}

// function seedDB() {
//   Item.remove({}, err => {
//     if (err) {
//       console.log(err);
//     } else {
//       for (let j = 0; j < 100; j++) {
//         Category.count().exec((err, count) => {
//           let random = Math.floor(Math.random() * count);

//           Category.findOne()
//             .skip(random)
//             .exec((err, category) => {
//               let tags = [];
//               for (i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
//                 tags.push(faker.company.bsNoun());
//               }
//               let item = {
//                 title: faker.company.companyName(),
//                 description: faker.lorem.sentences(),
//                 tags: tags,
//                 content: faker.lorem.paragraph(),
//                 category: category
//               };

//               Item.create(item, (err, createdItem) => {
//                 if (err) {
//                   console.log(err);
//                 } else {
//                   console.log('Item created:', createdItem);

//                   category.items.push(createdItem);
//                   category.save();
//                 }
//               });
//             });
//         });
//       }
//     }
//   });
// }

module.exports = seedDB;
