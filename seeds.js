const mongoose = require('mongoose');
const Item = require('./models/item');

const data = [
  {
    title: 'Harris County Intellectual Disability and Autism Services',
    description:
      'Services provided for individuals with intellectual disability and autism.',
    categories: ['Autism Services', 'Spanish', 'Adolescent Issues', 'Low-cost'],
    content:
      'Phasellus nec enim rutrum, egestas arcu ac, luctus velit. In suscipit mauris tincidunt nisl mattis, a malesuada risus tincidunt. Morbi interdum, velit eget pellentesque rutrum, justo turpis porta enim, sed tempus tellus orci et libero. Duis non enim ut turpis cursus ultrices malesuada in urna. Vestibulum est ante, mattis eu urna et, finibus accumsan sem. Pellentesque in vehicula mi. Curabitur et scelerisque augue, ac viverra leo. Cras pretium ultrices fringilla. Proin vitae nibh sit amet erat iaculis posuere ac ac mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue varius feugiat. Praesent vel nunc in metus pulvinar aliquam.'
  },
  {
    title: 'MHMRA STARS Program',
    description:
      'Proin in velit a neque ornare commodo. Mauris cursus mauris non eros sagittis facilisis.',
    categories: ['Autism Services', 'Spanish', 'Disability', 'Low-cost'],
    content:
      'Mauris quis justo velit. Pellentesque vitae orci nec nunc ultrices volutpat et nec lectus. Fusce iaculis ligula ac enim dictum pulvinar. Nulla porttitor, nisi ac molestie condimentum, erat sapien interdum ligula, ac euismod orci risus vel quam. Sed id purus velit. Aenean mauris arcu, blandit pharetra enim at, malesuada commodo urna. Nunc a urna ac nunc sollicitudin elementum. Proin quis lacinia lacus. Fusce diam nulla, laoreet vitae nisl sed, interdum molestie orci. Sed facilisis lectus magna, non sodales dolor pharetra vitae. Aenean facilisis nunc eu nisl vehicula, non blandit eros dapibus. Nunc suscipit mi vitae sem consequat, non tincidunt purus commodo. Integer nec viverra enim, quis tempus quam. Pellentesque sit amet feugiat magna. Maecenas a nisi consectetur, ornare velit non, laoreet erat.'
  },
  {
    title: 'Crisis Intervention of Houston',
    description:
      'Nulla porttitor, nisi ac molestie condimentum, erat sapien interdum ligula, ac euismod orci risus vel quam.',
    categories: ['Human Trafficking', 'Spanish', 'Homeless'],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eros metus, dignissim nec efficitur et, luctus non justo. Vivamus justo nibh, posuere vel odio in, ornare cursus tellus. Pellentesque dignissim dui a dui efficitur, ac mollis massa commodo. Quisque interdum metus eu odio tempor aliquam. Suspendisse id ante lobortis, tempor erat gravida, rhoncus magna. Proin pharetra, neque ac tempor vestibulum, ligula lorem elementum metus, et scelerisque nulla leo nec eros. Nam vel est quam. Donec pellentesque ultrices orci ac suscipit. Vivamus vulputate felis quis est ultricies, a sollicitudin nulla finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque at varius arcu. Duis pulvinar interdum massa pharetra tristique. Aenean et elementum justo.'
  },
  {
    title: 'National Human Trafficking Resource',
    description: 'Lorem ipsum dolor sit amet insert description here.',
    categories: ['Human Trafficking', 'Adolescent Issues', 'Low-cost'],
    content:
      'Aenean et nulla quis libero suscipit fringilla non non odio. Integer interdum maximus viverra. Suspendisse potenti. Vivamus est sapien, blandit eu tincidunt quis, mattis sed augue. Pellentesque quis ligula ornare, pretium turpis id, tempor urna. Pellentesque viverra, nulla quis vestibulum auctor, lorem elit viverra ante, sed consequat mauris libero malesuada purus. Integer tincidunt odio at fermentum dapibus. Vivamus ac velit eget urna posuere fringilla. Nunc hendrerit nulla neque, sed euismod nibh commodo eu. In hac habitasse platea dictumst. Nam risus justo, eleifend ac fermentum ut, convallis imperdiet nibh.'
  }
];

function seedDatabase() {
  Item.remove({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Removed all existing items');

      data.forEach(seed => {
        Item.create(seed, (err, item) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Created a new item:');
            console.log(item);
          }
        });
      });
    }
  });
}

module.exports = seedDatabase;
