/**
 * Seed script — creates 10 Indian users and 50+ festival posts with comments.
 * Run once from the server directory:  node seed.js
 * Re-running it will wipe and recreate all seed data (emails ending in @memories.in).
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import PostMessage from './models/postMessage.js';
import User from './models/user.js';

// ── Users ────────────────────────────────────────────────────────────────────
const SEED_PASSWORD = 'memories@123';

const USERS_DATA = [
  { name: 'Priya Sharma',   email: 'priya.sharma@memories.in' },
  { name: 'Rahul Mehta',    email: 'rahul.mehta@memories.in' },
  { name: 'Ananya Patel',   email: 'ananya.patel@memories.in' },
  { name: 'Vikram Nair',    email: 'vikram.nair@memories.in' },
  { name: 'Kavya Reddy',    email: 'kavya.reddy@memories.in' },
  { name: 'Arjun Singh',    email: 'arjun.singh@memories.in' },
  { name: 'Meera Krishnan', email: 'meera.krishnan@memories.in' },
  { name: 'Rohan Gupta',    email: 'rohan.gupta@memories.in' },
  { name: 'Shreya Joshi',   email: 'shreya.joshi@memories.in' },
  { name: 'Aditya Kumar',   email: 'aditya.kumar@memories.in' },
];

// ── Images ───────────────────────────────────────────────────────────────────
const IMG = {
  diwali1:   'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
  diwali2:   'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
  diwali3:   'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80',
  holi1:     'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&w=800&q=80',
  holi2:     'https://images.unsplash.com/photo-1552255349-450c59a5c036?auto=format&fit=crop&w=800&q=80',
  holi3:     'https://images.unsplash.com/photo-1424097166725-a0bf7e2b1f73?auto=format&fit=crop&w=800&q=80',
  food1:     'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  food2:     'https://images.unsplash.com/photo-1565557623262-b51b62b4b1d9?auto=format&fit=crop&w=800&q=80',
  food3:     'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  mountains: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  beach:     'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  golden:    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
  family:    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
  road:      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
  fireworks: 'https://images.unsplash.com/photo-1509310202330-ee34a81b7898?auto=format&fit=crop&w=800&q=80',
  rajasthan: 'https://images.unsplash.com/photo-1524813618033-7c7d31cbdf4d?auto=format&fit=crop&w=800&q=80',
  kerala:    'https://images.unsplash.com/photo-1582461830888-3f28d79b5cdf?auto=format&fit=crop&w=800&q=80',
  garba:     'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  flowers:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  market:    'https://images.unsplash.com/photo-1562411052-105105232592?auto=format&fit=crop&w=800&q=80',
  temple:    'https://images.unsplash.com/photo-1561361058-c1b9e24d2166?auto=format&fit=crop&w=800&q=80',
  candles:   'https://images.unsplash.com/photo-1574717099851-8d14d2017d5f?auto=format&fit=crop&w=800&q=80',
};

// ── Comment bank ─────────────────────────────────────────────────────────────
const COMMENTS = {
  diwali: [
    'The lights here are absolutely magical, felt like I was right there!',
    'Wishing you and your whole family a year as bright as this night.',
    'Our lane looked exactly the same last Diwali — brought back so many memories.',
    'The rangoli detail in the background is so intricate, how long did that take?',
    'You have captured the warmth of Diwali perfectly in one frame.',
    'This is the photo I would put on a calendar. So beautiful.',
  ],
  holi: [
    'The colours are so vivid! What brand of gulal did you use?',
    'I was in Vrindavan for Holi once — nothing compares to that energy.',
    'Look at that smile — Holi really does bring out the child in all of us.',
    'This is my favourite festival and you have done it full justice here.',
    'Next year, count me in! This looks absolutely incredible.',
    'The joy on everyone\'s faces tells the whole story.',
  ],
  navratri: [
    'Nine nights of this and I still want more — Navratri is unmatched.',
    'The ghagra colours are stunning! Where did you get it from?',
    'Garba in Ahmedabad is on my bucket list after seeing this.',
    'The energy in this photo is electric. Must have been an unforgettable night.',
    'I practised for two weeks for Navratri this year too — so worth it!',
    'That lehenga is gorgeous — please share the details!',
  ],
  ganesh: [
    'Ganpati Bappa Morya! What a beautiful idol.',
    'The modaks look perfect — better than the ones I made, for sure.',
    'Visarjan always brings tears to my eyes. Beautiful capture.',
    'The pandal decoration must have taken weeks. Absolutely stunning.',
    'Bappa\'s presence fills the whole photo. Lovely memory.',
    'Our society\'s Ganesh looked similar — it felt like family throughout.',
  ],
  eid: [
    'Eid Mubarak! The food spread looks absolutely incredible.',
    'Jama Masjid at Eid is one of the most moving things I have ever witnessed.',
    'Your Nani\'s seviyan sounds exactly like the recipe I grew up with.',
    'Laad Bazaar during Eid is a dream — glad you captured it.',
    'That biryani is calling my name through the screen.',
    'The warm community spirit in your post is everything.',
  ],
  onam: [
    'The pookalam is so detailed — a true labour of love.',
    'Pongal morning in Thanjavur is a sound I will never forget — the pot overflowing!',
    'Kite flying memories flooded back seeing this. Best childhood sport.',
    'A proper sadya on banana leaf — pure happiness on a plate.',
    'The colours of Onam never get old. Kerala in September is magic.',
    'Uttarayan skies are unlike anything else in the world.',
  ],
  travel: [
    'The Himalayas at sunrise are something else entirely. Breathtaking.',
    'Kerala backwaters at dusk — I could stare at this all day.',
    'Six Rajasthan cities in ten days sounds like the perfect road trip.',
    'Coorg in monsoon is my dream destination. Adding it to the list now.',
    'Varanasi at dawn is the most spiritual I have ever felt.',
    'Valley of Flowers is the one place I always tell people about. Worth every step.',
  ],
  food: [
    'This idli sambar setup beats any five-star breakfast.',
    'The biryani Sunday tradition should be mandatory in every household.',
    'Old Delhi street food is in a league of its own. That chaat!',
    'Can you share the recipe or at least the restaurant name?',
    'My mouth is watering through the screen. Please invite me next time.',
    'Sunday biryani rituals are the glue that holds families together.',
  ],
  default: [
    'What a beautiful memory — thank you for sharing this with us.',
    'I can feel the joy through this photo. Truly lovely.',
    'This is exactly the kind of moment worth keeping forever.',
    'You have such a gift for capturing the soul of a moment.',
    'Saving this to my heart. Made my evening.',
    'The vibe here is absolutely immaculate.',
    'This made my day so much better — thank you.',
    'Please keep sharing. Your posts are always highlights.',
  ],
};

function pickComments(tag, count, commenters) {
  const bank = COMMENTS[tag] || COMMENTS.default;
  return commenters.slice(0, count).map((u, i) => `${u.name}: ${bank[i % bank.length]}`);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Posts data ────────────────────────────────────────────────────────────────
// [authorIndex, title, message, tags[], imageKey, daysAgo, commentTag]
const POSTS_DATA = [
  // DIWALI (8)
  [0, 'Diwali Night in Jaipur',
    'The Pink City glowed like a dream last night. Every rooftop had diyas and the sky was painted with fireworks. This is the one evening of the year that makes the whole city feel like family.',
    ['diwali', 'jaipur', 'festival', 'lights'], 'diwali1', 3, 'diwali'],

  [2, 'First Diwali in Our New Home',
    'We moved in just two weeks ago and the walls still smelled of fresh paint — but last night they glowed warm with diyas. Maa made kheer and the whole family sat on the terrace watching the lights across the city.',
    ['diwali', 'family', 'newbeginnings', 'home'], 'diwali2', 7, 'diwali'],

  [4, 'Rangoli at Dawn',
    'I woke up at 4 AM to make the rangoli before my sister could see it. Spent two hours getting the flower petals just right. Worth every sleepy minute when she stepped outside and gasped.',
    ['diwali', 'rangoli', 'tradition', 'sisters'], 'diwali3', 14, 'diwali'],

  [6, 'Laxmi Puja with the Whole Street',
    'Our entire lane came together for the puja tonight. Old Mrs. Menon from the corner house brought her legendary modaks, and even the children who usually fight were silent and reverent. These are the moments I want to hold onto forever.',
    ['diwali', 'puja', 'community', 'tradition'], 'diwali1', 21, 'diwali'],

  [1, 'Diya Making Workshop',
    'Taught fifteen kids at the local school how to make and decorate their own clay diyas. The way their faces lit up when they put the first flame to the wick — I will never forget that light.',
    ['diwali', 'kids', 'diy', 'workshop'], 'diwali2', 30, 'diwali'],

  [7, 'Sky Full of Fireworks over Mumbai',
    'Marine Drive was electric. Every colour imaginable bloomed overhead and the crowd erupted every few seconds. Baba squeezed my hand and said "remember this." I always will.',
    ['diwali', 'mumbai', 'fireworks', 'marinedrive'], 'fireworks', 40, 'diwali'],

  [3, 'The Sweets of Diwali',
    "Nani's recipe for besan ladoo has been in our family for four generations. This year I finally wrote it down. Along with chakli and sev, the kitchen was a festival of its own — before the lights even came on.",
    ['diwali', 'sweets', 'food', 'family'], 'food1', 5, 'diwali'],

  [8, 'Diyas on the Window Sill',
    'Twelve diyas on every window. The neighbours across the lane lit up exactly the same way. We have never spoken but every Diwali we mirror each other and I think of it as the warmest kind of conversation.',
    ['diwali', 'diyas', 'tradition', 'neighbourhood'], 'diwali3', 9, 'diwali'],

  // HOLI (7)
  [1, 'Holi in Vrindavan',
    'Nothing prepares you for Vrindavan on Holi. Flowers, gulal, and devotion all blended into one sacred chaos. I came home purple and completely at peace with the world.',
    ['holi', 'vrindavan', 'festival', 'colors'], 'holi1', 60, 'holi'],

  [5, 'First Holi with My College Gang',
    'We had planned it for months. Seven friends, three kilos of colour powder, two super-soakers, and zero regrets. The memory of Rohan falling into the puddle of pink will fuel our group chat for the next decade.',
    ['holi', 'college', 'friends', 'colors'], 'holi2', 65, 'holi'],

  [9, 'Holi Thandai Morning',
    'Made the thandai from scratch — rose petals, fennel, cardamom, chilled milk. Served it in clay cups and watched the sun rise while everyone slowly turned from sleepy to joyful.',
    ['holi', 'thandai', 'food', 'tradition'], 'holi3', 70, 'holi'],

  [3, 'Children Playing Holi',
    'The kids in our society woke up at 6 AM and started throwing colours before we adults had even had our tea. By 8 AM the entire parking lot was a rainbow. Pure chaos. I loved every second.',
    ['holi', 'children', 'fun', 'colours'], 'holi1', 75, 'holi'],

  [7, 'Eco-Friendly Holi This Year',
    'We switched to flower-based colours — marigold yellow, rose pink, indigo from butterfly pea flowers. Just as vibrant, and nothing hurt the skin or the earth. This is how we celebrate from now on.',
    ['holi', 'ecofriendly', 'sustainability', 'colors'], 'holi2', 78, 'holi'],

  [0, 'Lathmar Holi in Barsana',
    'The women chased the men with sticks and everyone laughed until their stomachs hurt. This 400-year-old tradition is the most joyful thing I have ever witnessed. Barsana, you have my heart forever.',
    ['holi', 'barsana', 'lathmar', 'tradition'], 'holi3', 80, 'holi'],

  [6, 'Still Finding Colour Three Days Later',
    'Six showers later and I am still finding traces of green behind my ears. No complaints at all. The day was worth every speck. See you next year, Holi.',
    ['holi', 'celebration', 'fun', 'memories'], 'holi1', 85, 'holi'],

  // NAVRATRI & GARBA (6)
  [2, 'Garba Night in Ahmedabad',
    'Nine nights. Thousands of swirling chaniya cholis. The ground trembled with dandiya sticks and the air smelled of jasmine and joy. Navratri in Ahmedabad is not an event, it is an experience that rewires you.',
    ['navratri', 'garba', 'ahmedabad', 'festival'], 'garba', 90, 'navratri'],

  [4, 'Dressed for Dandiya',
    'Three weeks of practice so I could keep up with the senior ladies at the community garba. I still tripped twice but they laughed along with me, not at me. That is why I love this celebration.',
    ['navratri', 'dandiya', 'dance', 'tradition'], 'garba', 95, 'navratri'],

  [8, "My Daughter's First Navratri",
    'She is only four but she insisted on the full outfit — ghagra, choli, dupatta, and tiny silver anklets. She stomped around more than she danced. It was the most perfect thing I have ever seen.',
    ['navratri', 'family', 'kids', 'garba'], 'garba', 100, 'navratri'],

  [1, 'Fasting and Feasting During Navratri',
    'Sabudana khichdi for nine mornings straight and I still do not tire of it. The simplicity of Navratri food is a reminder that real nourishment often comes through devotion and discipline.',
    ['navratri', 'food', 'tradition', 'fasting'], 'food3', 105, 'navratri'],

  [5, 'Mata Ki Aarti at Vaishno Devi',
    'We climbed thirteen kilometres in the dark, arrived at the temple just as the aarti began. The bells, the chanting, the first golden light hitting the shrine — I do not have words. I just wept.',
    ['navratri', 'vaishnodevi', 'pilgrimage', 'devotion'], 'mountains', 110, 'navratri'],

  [9, 'Garba Competition 2024',
    'Our team practised for six weeks. We came third. But standing on that stage with three hundred eyes watching us spin in perfect sync, every hour of rehearsal made complete sense.',
    ['navratri', 'garba', 'competition', 'dance'], 'garba', 115, 'navratri'],

  // GANESH CHATURTHI (5)
  [3, 'Bappa Has Arrived',
    'The moment the idol crossed our threshold, the whole house erupted in dhol and ululations. Ours is a modest clay Ganesh we made ourselves, but he fills every room with his presence.',
    ['ganeshchaturthi', 'bappa', 'festival', 'mumbai'], 'flowers', 120, 'ganesh'],

  [6, 'Modak-Making Marathon',
    'Four hours, forty modaks, two impatient cousins and one very patient grandmother. The ukadiche modak came out perfectly and Bappa accepted every single one.',
    ['ganeshchaturthi', 'modak', 'food', 'tradition'], 'food1', 125, 'ganesh'],

  [0, 'Visarjan at Chowpatty Beach',
    'The procession to the sea takes two hours but the moment Bappa enters the water belongs to a completely different kind of time. We cried. We sang. We promised to do better this year. Ganpati Bappa Morya.',
    ['ganeshchaturthi', 'visarjan', 'mumbai', 'bappa'], 'beach', 130, 'ganesh'],

  [4, 'Pandal Night',
    'Our colony spent three nights decorating the pandal with marigolds, mango leaves, and thermocol structures the children built by hand. When the spotlight hit it for the first time, the whole street fell silent.',
    ['ganeshchaturthi', 'pandal', 'decoration', 'community'], 'flowers', 135, 'ganesh'],

  [7, 'Drawing Ganesha with Fifty Kids',
    'An art session in the park where fifty children drew their own Ganesha. No two were the same. Every single one was the best one in the room.',
    ['ganeshchaturthi', 'art', 'kids', 'creativity'], 'family', 140, 'ganesh'],

  // EID (5)
  [8, 'Eid Morning at Jama Masjid',
    'The courtyard holds 25,000 people and today every inch was filled. The namaz began at the precise moment the sun cleared the minaret. I understood the word "congregation" for the very first time.',
    ['eid', 'jamaMasjid', 'prayer', 'delhi'], 'temple', 145, 'eid'],

  [2, "Seviyan at Nani's House",
    'Every Eid since I was three, Nani has made the same seviyan. The recipe lives in her hands, not on paper. She is 78 this year and I sat beside her, memorising every motion she made.',
    ['eid', 'food', 'family', 'tradition'], 'food2', 150, 'eid'],

  [5, "Eid Shopping in Hyderabad's Laad Bazaar",
    'Bangles, pearls, itr, sherwanis — the old market is a sensory overload in the best way. We went in for bangles and came out three hours later with bags we cannot explain to anyone.',
    ['eid', 'hyderabad', 'shopping', 'laadBazaar'], 'market', 155, 'eid'],

  [9, 'Our Eid Feast',
    'Biryani, haleem, sheer khurma, and my uncle\'s legendary nihari. The table was set for twenty but thirty showed up. Nobody went hungry and nobody left before midnight.',
    ['eid', 'biryani', 'food', 'feast'], 'food2', 160, 'eid'],

  [1, "Eid in Lucknow's Old City",
    'The narrow lanes of Aminabad were electric with light strings and the scent of attar. Strangers offered sweets at every door. This is what I mean when I say Ganga-Jamuni tehzeeb.',
    ['eid', 'lucknow', 'culture', 'community'], 'market', 165, 'eid'],

  // ONAM / PONGAL / MAKAR SANKRANTI (5)
  [3, 'Pookalam for Onam',
    'Ten days of waking before sunrise to arrange petals in a circle. The final day\'s pookalam had eleven rings and took the whole family to complete. Worth every early morning and every bent back.',
    ['onam', 'pookalam', 'kerala', 'flowers'], 'flowers', 170, 'onam'],

  [7, 'Pongal in Thanjavur',
    'The new rice bubbled over the pot and everyone cheered "Pongalo Pongal!" Sugarcane and turmeric on every threshold. The whole village smelled of jaggery and fresh earth.',
    ['pongal', 'thanjavur', 'harvest', 'tamilnadu'], 'food3', 175, 'onam'],

  [0, 'Makar Sankranti Kite Flying',
    'From 7 AM until sundown, our terrace was a battlefield of kites. Dad cut three of my strings before I finally cut his. We declared it a draw. Same time next year.',
    ['makarsankranti', 'kites', 'family', 'gujarat'], 'golden', 180, 'onam'],

  [4, 'Sadya Feast for Onam',
    'Twenty-six dishes on a banana leaf, served in the traditional order from pickle to payasam. I ate until I could not move, and then somehow found room for a second serving of olan.',
    ['onam', 'sadya', 'kerala', 'food'], 'food1', 185, 'onam'],

  [6, 'Uttarayan Evening in Surat',
    'The sky over Surat at sunset during Uttarayan is something painters attempt and fail. A thousand kites in the golden hour, cut strings falling like confetti over the rooftops.',
    ['uttarayan', 'surat', 'gujarat', 'kites'], 'golden', 190, 'onam'],

  // TRAVEL & NATURE (6)
  [1, 'Sunrise Trek to Triund',
    'Left base camp at 3 AM with headlamps and stubborn legs. Reached the ridge just as the Dhauladhar range turned rose-pink. No photograph does justice. Here is one anyway.',
    ['himachal', 'trek', 'sunrise', 'mountains'], 'mountains', 200, 'travel'],

  [5, 'Kerala Backwaters at Dusk',
    'A houseboat, a cup of chai, egrets flying low over still water. No network, no agenda — just time moving at the pace of the oar. Some holidays do not entertain you, they heal you.',
    ['kerala', 'backwaters', 'travel', 'peace'], 'kerala', 210, 'travel'],

  [8, 'Rajasthan Road Trip',
    'Six cities in ten days. Jodhpur blue, Jaipur pink, Jaisalmer gold. Every fort tells a story and every sunset is a different shade of impossible. Rajasthan, I will be back.',
    ['rajasthan', 'roadtrip', 'travel', 'forts'], 'rajasthan', 220, 'travel'],

  [2, 'Monsoon in Coorg',
    'The coffee estate in monsoon is a different world. Everything so green it almost hurts, mist rolling in from the valley, the smell of wet earth and cardamom everywhere you breathe.',
    ['coorg', 'monsoon', 'travel', 'nature'], 'road', 230, 'travel'],

  [9, 'Dawn at Varanasi Ghats',
    'I woke at 4:30 AM for the Ganga aarti. The river was copper in the early light, boats drifting past, bells ringing across the water. Some places are too ancient to describe. You have to go.',
    ['varanasi', 'ghats', 'spirituality', 'travel'], 'golden', 240, 'travel'],

  [3, 'Valley of Flowers, Uttarakhand',
    'You trek three days to get here, and on the fourth morning you step into a meadow that has no business being real. Fifty species of wildflower, no other people, just wind and the sound of your own breathing.',
    ['valleyOfFlowers', 'uttarakhand', 'nature', 'trek'], 'mountains', 250, 'travel'],

  // FOOD & CULTURE (5)
  [0, 'Sunday Breakfast: Idli Sambar',
    'Six different chutneys, three types of sambar, and soft idlis my aunt shapes by hand at dawn. We sat at the table for two hours because nobody wanted the morning to end.',
    ['food', 'idli', 'breakfast', 'southIndia'], 'food3', 260, 'food'],

  [4, 'Biryani Sunday Ritual',
    'Every Sunday since I can remember, the house smells of dum biryani by noon. Dad guards the pot. Nobody — not even Maa — can lift the lid until he says it is time. This tradition will outlive all of us.',
    ['food', 'biryani', 'family', 'ritual'], 'food2', 270, 'food'],

  [8, 'Street Food Walk in Old Delhi',
    'Paranthe wali gali, jalebi-fafda stalls, chaat so tangy it made my eyes water. Old Delhi eats with complete confidence. Every bite is a century of cooking compressed into one mouthful.',
    ['food', 'delhi', 'streetfood', 'oldDelhi'], 'market', 280, 'food'],

  [2, 'Raksha Bandhan Morning',
    'She flew in from Pune just to tie the rakhi. I made her favourite dal baati. We ate on the kitchen floor the way we did as children. Some bonds need no special occasion, but the occasion still matters.',
    ['rakshabandhan', 'siblings', 'family', 'love'], 'family', 290, 'default'],

  [5, 'Making Mango Pickle with Nani',
    'Three kilos of raw mango, fenugreek, mustard, and enough red chilli to make your eyes stream. Nani says the pickle is ready when it makes you sneeze. We will know in six weeks.',
    ['food', 'pickle', 'summer', 'tradition'], 'food1', 295, 'food'],

  // MISC (4)
  [6, 'Janmashtami at Mathura',
    'Mathura at midnight on Janmashtami is electricity in human form. The moment the clock struck twelve and the bells began across every temple, I understood why this festival has endured for four thousand years.',
    ['janmashtami', 'mathura', 'krishna', 'tradition'], 'temple', 300, 'default'],

  [1, 'Independence Day Flag Hoisting',
    'Our apartment society has held this flag hoisting every August 15th for thirty years. The children recited poems and sang the national anthem slightly off-key and completely from the heart. That is the point.',
    ['independenceday', 'patriotism', 'community', 'india'], 'golden', 310, 'default'],

  [7, 'Durga Puja Pandal Hopping',
    'We covered eleven pandals in one night across Kolkata. Themes ranged from climate change to ancient temples to pure cinema. There is no better city in the world at this particular time of year.',
    ['durgapuja', 'kolkata', 'pandal', 'festival'], 'flowers', 320, 'default'],

  [5, "New Year's Eve at Marine Drive",
    'The entire city of Mumbai showed up. We stood in a crowd of strangers who felt like friends by midnight. The countdown echoed off the Art Deco buildings, the sea agreed, and 2024 began beautifully.',
    ['newyear', 'mumbai', 'marinedrive', 'celebration'], 'beach', 330, 'default'],
];

// ── Main seed function ────────────────────────────────────────────────────────
async function seed() {
  console.log('Connecting to MongoDB…');
  await mongoose.connect(process.env.CONNECTION_URL);
  console.log('Connected.\n');

  // Wipe previous seed data
  const deletedPosts = await PostMessage.deleteMany({ tags: 'seeded' });
  const deletedUsers = await User.deleteMany({ email: /@memories\.in$/ });
  console.log(`Cleared ${deletedPosts.deletedCount} seed posts and ${deletedUsers.deletedCount} seed users.`);

  // Create users
  const hashedPw = await bcrypt.hash(SEED_PASSWORD, 12);
  const users = await User.insertMany(
    USERS_DATA.map((u) => ({ ...u, password: hashedPw, id: new mongoose.Types.ObjectId().toString() }))
  );
  console.log(`Created ${users.length} users.`);

  // Create posts
  const postDocs = POSTS_DATA.map(([authorIdx, title, message, tags, imgKey, daysAgo, commentTag]) => {
    const author = users[authorIdx];
    const others = shuffle(users.filter((u) => u.name !== author.name));

    // 3–7 likes from random other users
    const likeCount = 3 + Math.floor(Math.random() * 5);
    const likes = others.slice(0, likeCount).map((u) => u._id.toString());

    // 3–5 comments from random other users
    const commentCount = 3 + Math.floor(Math.random() * 3);
    const comments = pickComments(commentTag, commentCount, others);

    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);

    return {
      title,
      message,
      name: author.name,
      creator: author._id.toString(),
      tags: [...tags, 'seeded'],
      selectedFile: IMG[imgKey] || IMG.diwali2,
      likes,
      comments,
      createdAt,
    };
  });

  await PostMessage.insertMany(postDocs);
  console.log(`Created ${postDocs.length} posts.\n`);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Seed complete! Login credentials for all 10 users:');
  console.log(`Password: ${SEED_PASSWORD}\n`);
  USERS_DATA.forEach((u) => console.log(`  ${u.name.padEnd(18)}  ${u.email}`));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await mongoose.disconnect();
}

seed().catch((err) => { console.error(err); process.exit(1); });
