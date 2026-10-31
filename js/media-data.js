/**
 * Jio STB Custom UI — Media Data Manifest
 * Fully configured metadata for 8 Apps Dock, Favourites Lineup,
 * 6 Mood Categories with Poster Decks, and Trending OTT Strip.
 * STRICTLY NO NETFLIX CONTENT.
 */

window.MEDIA_DATA = (function() {
  'use strict';

  // 1. MAIN APPS (8 DOCK APPS)
  var APPS = {
    jiotv: {
      id: 'jiotv',
      name: 'JioTV+',
      color: '#ff3366',
      logo: 'assets/logos/jiotv.svg',
      taglines: [
        '“India’s favourite live television and OTT aggregator.”',
        '“550+ Live Channels with 7-day catchup TV.”'
      ],
      sub: 'JioTV+ · Native Android TV App',
      uri: 'jiotvplus://',
      pkg: 'com.jio.media.jiotvplus',
      verified: true
    },
    hotstar: {
      id: 'hotstar',
      name: 'JioHotstar',
      color: '#5f9eff',
      logo: 'assets/logos/hotstar.svg',
      taglines: [
        '“Home of Live Cricket, Blockbusters and HBO Originals.”',
        '“The game is never over.”'
      ],
      sub: 'JioHotstar · Verified Direct Intent',
      uri: 'intent://www.hotstar.com/#Intent;scheme=https;package=in.startv.hotstar;action=android.intent.action.VIEW;end',
      pkg: 'in.startv.hotstar',
      verified: true
    },
    youtube: {
      id: 'youtube',
      name: 'YouTube',
      color: '#ff3333',
      logo: 'assets/logos/youtube.svg',
      taglines: [
        '“Stream 4K videos, creators, music and documentaries.”',
        '“Broaden your world with millions of creators.”'
      ],
      sub: 'YouTube · Verified Direct Intent',
      uri: 'intent://www.youtube.com/#Intent;scheme=https;package=com.google.android.youtube.tv;action=android.intent.action.VIEW;end',
      pkg: 'com.google.android.youtube.tv',
      verified: true
    },
    prime: {
      id: 'prime',
      name: 'Prime Video',
      color: '#00a8e1',
      logo: 'assets/logos/prime.svg',
      taglines: [
        '“Run, Barry, run. Watch Prime Originals and Exclusives.”',
        '“Award-winning Amazon Originals and Hollywood blockbusters.”'
      ],
      sub: 'Prime Video · Verified P10 Deep Link Intent',
      uri: 'intent://app.primevideo.com/#Intent;scheme=https;package=com.amazon.amazonvideo.livingroom;action=android.intent.action.VIEW;end',
      pkg: 'com.amazon.amazonvideo.livingroom',
      verified: true
    },
    hoichoi: {
      id: 'hoichoi',
      name: 'Hoichoi',
      color: '#ff1744',
      logo: 'assets/logos/hoichoi.svg',
      taglines: [
        '“Best of Bengali movies, web series and world premieres.”',
        '“Golpo shuru ebar — stories from Bengal to the world.”'
      ],
      sub: 'Hoichoi · Android TV Launcher',
      uri: 'intent:#Intent;action=android.intent.action.MAIN;category=android.intent.category.LEANBACK_LAUNCHER;package=com.viewlift.hoichoi;end',
      pkg: 'com.viewlift.hoichoi',
      verified: false
    },
    sonyliv: {
      id: 'sonyliv',
      name: 'SonyLIV',
      color: '#38ef7d',
      logo: 'assets/logos/sonyliv.svg',
      taglines: [
        '“Scam 1992, Gullak, Champions League and Live Sports.”',
        '“Captivating Indian series and world football tournaments.”'
      ],
      sub: 'SonyLIV · Android TV Launcher',
      uri: 'intent:#Intent;action=android.intent.action.MAIN;category=android.intent.category.LEANBACK_LAUNCHER;package=com.sonyliv;end',
      pkg: 'com.sonyliv',
      verified: false
    },
    zee5: {
      id: 'zee5',
      name: 'ZEE5',
      color: '#9b51e0',
      logo: 'assets/logos/zee5.svg',
      taglines: [
        '“Exclusive Indian originals, blockbusters and 12+ languages.”',
        '“Unlimited entertainment in your mother tongue.”'
      ],
      sub: 'ZEE5 · Android TV Launcher',
      uri: 'intent:#Intent;action=android.intent.action.MAIN;category=android.intent.category.LEANBACK_LAUNCHER;package=com.graymatrix.did;end',
      pkg: 'com.graymatrix.did',
      verified: false
    },
    lionsgate: {
      id: 'lionsgate',
      name: 'Lionsgate Play',
      color: '#ffb300',
      logo: 'assets/logos/lionsgate.svg',
      taglines: [
        '“John Wick, Hollywood blockbusters and prestige cinema.”',
        '“Play big with award-winning international cinema.”'
      ],
      sub: 'Lionsgate Play · Android TV Launcher',
      uri: 'intent:#Intent;action=android.intent.action.MAIN;category=android.intent.category.LEANBACK_LAUNCHER;package=com.lionsgateplay.videoapp;end',
      pkg: 'com.lionsgateplay.videoapp',
      verified: false
    }
  };

  // 2. MY FAVOURITES CHARACTER LINEUP
  var FAVOURITES = [
    {
      id: 'fav-jane',
      title: 'The Mentalist',
      characterName: 'Patrick Jane',
      app: 'prime',
      row: 'front',
      color: '#ff3366',
      characterImg: 'assets/characters/patrick_jane.png',
      sceneImg: 'assets/backdrops/cbi_bullpen.jpg',
      quote: '“A mentalist is a master manipulator of thought and behavior.”',
      specialTouch: 'redjohn'
    },
    {
      id: 'fav-walter',
      title: 'Breaking Bad',
      characterName: 'Walter White',
      app: 'sonyliv',
      row: 'back',
      color: '#38ef7d',
      characterImg: 'assets/characters/walter_white.png',
      sceneImg: 'assets/backdrops/desert_rv.jpg',
      quote: '“I am not in danger, Skyler. I am the danger.”'
    },
    {
      id: 'fav-spiderman',
      title: 'Spider-Man: No Way Home',
      characterName: 'Spider-Man',
      app: 'prime',
      row: 'back',
      color: '#ff3333',
      characterImg: 'assets/characters/spiderman.png',
      sceneImg: 'assets/backdrops/nyc_rooftop.jpg',
      quote: '“With great power comes great responsibility.”',
      specialTouch: 'spidersense'
    },
    {
      id: 'fav-sheldon',
      title: 'The Big Bang Theory',
      characterName: 'Sheldon Cooper',
      app: 'hotstar',
      row: 'back',
      color: '#ffcb05',
      characterImg: 'assets/characters/sheldon.png',
      sceneImg: 'assets/backdrops/apt_4a.jpg',
      quote: '“Bazinga!”'
    },
    {
      id: 'fav-master',
      title: 'Master',
      characterName: 'JD',
      app: 'zee5',
      row: 'front',
      color: '#9b51e0',
      characterImg: 'assets/characters/master_jd.png',
      sceneImg: 'assets/backdrops/metro_station.jpg',
      quote: '“Let the music play. Professor JD is in the house.”'
    },
    {
      id: 'fav-flash',
      title: 'The Flash',
      characterName: 'Barry Allen',
      app: 'prime',
      row: 'front',
      color: '#e5484d',
      characterImg: 'assets/characters/the_flash.png',
      sceneImg: 'assets/backdrops/action.jpg',
      quote: '“My name is Barry Allen, and I am the fastest man alive.”',
      specialTouch: 'speedster'
    }
  ];

  // 3. MOOD CATEGORIES DATA
  var MOODS = [
    {
      id: 'comfort',
      name: 'Comfort & Comedy',
      color: '#F2B84B',
      scene: 'assets/backdrops/comfort.jpg',
      badge: 'Feel Good',
      fanPosters: [
        'assets/posters/tbbt.jpg',
        'assets/posters/panchayat.jpg',
        'assets/posters/gullak.jpg'
      ],
      titles: [
        {
          id: 't-panchayat',
          title: 'Panchayat',
          app: 'prime',
          genre: 'Comedy · Rural Drama',
          rating: '★ 8.9',
          poster: 'assets/posters/panchayat.jpg',
          backdrop: 'assets/backdrops/comfort.jpg',
          overview: 'An engineering graduate takes up a job as a Panchayat secretary in a remote Indian village, encountering eccentric residents.'
        },
        {
          id: 't-tbbt',
          title: 'The Big Bang Theory',
          app: 'hotstar',
          genre: 'Sitcom · Comedy',
          rating: '★ 8.2',
          poster: 'assets/posters/tbbt.jpg',
          backdrop: 'assets/backdrops/apt_4a.jpg',
          overview: 'Brilliant physicists Leonard and Sheldon navigate social lives, love and pop culture with neighbour Penny.'
        },
        {
          id: 't-gullak',
          title: 'Gullak',
          app: 'sonyliv',
          genre: 'Family · Heartfelt Comedy',
          rating: '★ 9.1',
          poster: 'assets/posters/gullak.jpg',
          backdrop: 'assets/backdrops/comfort.jpg',
          overview: 'Set in a quaint North Indian town, the Mishra family navigates small moments, relatable quarrels and genuine warmth.'
        },
        {
          id: 't-office',
          title: 'The Office',
          app: 'prime',
          genre: 'Mockumentary · Comedy',
          rating: '★ 9.0',
          poster: 'assets/posters/office.jpg',
          backdrop: 'assets/backdrops/cbi_bullpen.jpg',
          overview: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes and inappropriate behavior.'
        },
        {
          id: 't-friends',
          title: 'Friends',
          app: 'hotstar',
          genre: 'Classic Sitcom',
          rating: '★ 8.9',
          poster: 'assets/posters/friends.jpg',
          backdrop: 'assets/backdrops/apt_4a.jpg',
          overview: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.'
        }
      ]
    },
    {
      id: 'action',
      name: 'Action & Adventure',
      color: '#E5484D',
      scene: 'assets/backdrops/action.jpg',
      badge: 'High Adrenaline',
      fanPosters: [
        'assets/posters/john_wick.jpg',
        'assets/posters/family_man.jpg',
        'assets/posters/special_ops.jpg'
      ],
      titles: [
        {
          id: 't-john-wick',
          title: 'John Wick: Chapter 4',
          app: 'lionsgate',
          genre: 'Neo-Noir · Action',
          rating: '★ 8.0',
          poster: 'assets/posters/john_wick.jpg',
          backdrop: 'assets/backdrops/action.jpg',
          overview: 'John Wick uncovers a path to defeating The High Table, facing a new enemy with powerful alliances across the globe.'
        },
        {
          id: 't-family-man',
          title: 'The Family Man',
          app: 'prime',
          genre: 'Spy Thriller · Action',
          rating: '★ 8.8',
          poster: 'assets/posters/family_man.jpg',
          backdrop: 'assets/backdrops/action.jpg',
          overview: 'A middle-class man working secretly for the National Investigation Agency balances family life with national security.'
        },
        {
          id: 't-special-ops',
          title: 'Special OPS',
          app: 'hotstar',
          genre: 'Espionage · Action',
          rating: '★ 8.6',
          poster: 'assets/posters/special_ops.jpg',
          backdrop: 'assets/backdrops/action.jpg',
          overview: 'Himmat Singh leads a covert RAW task force that tracks down the international mastermind behind terrorist attacks.'
        },
        {
          id: 't-avengers',
          title: 'Avengers: Infinity War',
          app: 'hotstar',
          genre: 'Superhero · Epic Action',
          rating: '★ 8.5',
          poster: 'assets/posters/avengers.jpg',
          backdrop: 'assets/backdrops/nyc_rooftop.jpg',
          overview: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos.'
        },
        {
          id: 't-master-action',
          title: 'Master',
          app: 'zee5',
          genre: 'Mass Action · Drama',
          rating: '★ 7.9',
          poster: 'assets/posters/master.jpg',
          backdrop: 'assets/backdrops/metro_station.jpg',
          overview: 'An alcoholic professor is sent to a juvenile school, where he clashes with a ruthless gangster using the children for crimes.'
        }
      ]
    },
    {
      id: 'thriller',
      name: 'Dark & Thriller',
      color: '#9b51e0',
      scene: 'assets/backdrops/thriller.jpg',
      badge: 'Edge of Seat',
      fanPosters: [
        'assets/posters/mirzapur.jpg',
        'assets/posters/scam1992.jpg',
        'assets/posters/paatal_lok.jpg'
      ],
      titles: [
        {
          id: 't-mirzapur',
          title: 'Mirzapur',
          app: 'prime',
          genre: 'Crime Drama · Gangland',
          rating: '★ 8.5',
          poster: 'assets/posters/mirzapur.jpg',
          backdrop: 'assets/backdrops/thriller.jpg',
          overview: 'A shocking incident at a wedding procession ignites a series of events entangling two families in the lawless city of Mirzapur.'
        },
        {
          id: 't-scam',
          title: 'Scam 1992: The Harshad Mehta Story',
          app: 'sonyliv',
          genre: 'Financial Crime · Biography',
          rating: '★ 9.3',
          poster: 'assets/posters/scam1992.jpg',
          backdrop: 'assets/backdrops/mindgames.jpg',
          overview: 'Set in 1980s and 90s Bombay, Harshad Mehta takes the stock market to dizzying heights and catastrophic fall.'
        },
        {
          id: 't-paatal-lok',
          title: 'Paatal Lok',
          app: 'prime',
          genre: 'Neo-Noir · Crime Thriller',
          rating: '★ 8.1',
          poster: 'assets/posters/paatal_lok.jpg',
          backdrop: 'assets/backdrops/thriller.jpg',
          overview: 'A cynical inspector is tasked with investigating a high-profile assassination attempt, leading into Delhi’s dark underworld.'
        },
        {
          id: 't-sacred',
          title: 'Sacred Games',
          app: 'hotstar',
          genre: 'Dark Thriller · Mystery',
          rating: '★ 8.6',
          poster: 'assets/posters/sacred_games.jpg',
          backdrop: 'assets/backdrops/thriller.jpg',
          overview: 'A link in their pasts leads an honest cop to a fugitive gang boss, whose cryptic warning spurs an urgent race against time.'
        },
        {
          id: 't-breaking-bad',
          title: 'Breaking Bad',
          app: 'sonyliv',
          genre: 'Prestige Crime Drama',
          rating: '★ 9.5',
          poster: 'assets/posters/breaking_bad.jpg',
          backdrop: 'assets/backdrops/desert_rv.jpg',
          overview: 'A chemistry teacher diagnosed with terminal lung cancer teams up with a former student to secure his family’s future.'
        }
      ]
    },
    {
      id: 'bengali',
      name: 'Bengali Favourites',
      color: '#00A896',
      scene: 'assets/backdrops/bengali.jpg',
      badge: 'Regional Cinema',
      fanPosters: [
        'assets/posters/byomkesh.jpg',
        'assets/posters/eken_babu.jpg',
        'assets/posters/feluda.jpg'
      ],
      titles: [
        {
          id: 't-byomkesh',
          title: 'Byomkesh O Durgo Rohosyo',
          app: 'hoichoi',
          genre: 'Period Mystery · Detective',
          rating: '★ 8.4',
          poster: 'assets/posters/byomkesh.jpg',
          backdrop: 'assets/backdrops/bengali.jpg',
          overview: 'Satyanweshi Byomkesh Bakshi and Ajit investigate an eerie mystery unfolding inside an ancient fort in Madhya Pradesh.'
        },
        {
          id: 't-eken',
          title: 'Eken Babu: The Movie',
          app: 'hoichoi',
          genre: 'Detective Comedy · Mystery',
          rating: '★ 8.1',
          poster: 'assets/posters/eken_babu.jpg',
          backdrop: 'assets/backdrops/bengali.jpg',
          overview: 'The eccentric, food-loving detective Ekendra Sen solves a complex murder case in the picturesque hills of Darjeeling.'
        },
        {
          id: 't-feluda',
          title: 'Feluda: Gangtokey Gondogol',
          app: 'zee5',
          genre: 'Satyajit Ray Classic · Adventure',
          rating: '★ 8.7',
          poster: 'assets/posters/feluda.jpg',
          backdrop: 'assets/backdrops/bengali.jpg',
          overview: 'Pradosh C. Mitter (Feluda), Topshe and Lalmohan Ganguly solve a theft and mystery in Sikkim.'
        },
        {
          id: 't-ballabhpur',
          title: 'Ballabhpurer Roopkotha',
          app: 'hoichoi',
          genre: 'Horror Comedy · Period Drama',
          rating: '★ 8.5',
          poster: 'assets/posters/ballabhpurer.jpg',
          backdrop: 'assets/backdrops/bengali.jpg',
          overview: 'The impoverished king of Ballabhpur plans to sell his royal palace to clear his debts, but the resident ghost has other plans.'
        },
        {
          id: 't-mukhosh',
          title: 'Mukhosh',
          app: 'hoichoi',
          genre: 'Psychological Crime Thriller',
          rating: '★ 7.8',
          poster: 'assets/posters/byomkesh.jpg',
          backdrop: 'assets/backdrops/bengali.jpg',
          overview: 'A criminologist aids Kolkata Police in hunting a terrifying serial killer targeting high-ranking officials.'
        }
      ]
    },
    {
      id: 'mindgames',
      name: 'Mind Games',
      color: '#3B8E88',
      scene: 'assets/backdrops/mindgames.jpg',
      badge: 'Clever & Gripping',
      fanPosters: [
        'assets/posters/mentalist.jpg',
        'assets/posters/sherlock.jpg',
        'assets/posters/severance.jpg'
      ],
      titles: [
        {
          id: 't-mentalist',
          title: 'The Mentalist',
          app: 'prime',
          genre: 'Psychological Mystery · Crime',
          rating: '★ 8.2',
          poster: 'assets/posters/mentalist.jpg',
          backdrop: 'assets/backdrops/cbi_bullpen.jpg',
          overview: 'Patrick Jane uses razor-sharp observation skills as a consultant for the California Bureau of Investigation while pursuing Red John.'
        },
        {
          id: 't-sherlock',
          title: 'Sherlock',
          app: 'hotstar',
          genre: 'Modern Detective · Drama',
          rating: '★ 9.1',
          poster: 'assets/posters/sherlock.jpg',
          backdrop: 'assets/backdrops/mindgames.jpg',
          overview: 'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.'
        },
        {
          id: 't-severance',
          title: 'Severance',
          app: 'prime',
          genre: 'Sci-Fi · Psychological Mystery',
          rating: '★ 8.7',
          poster: 'assets/posters/severance.jpg',
          backdrop: 'assets/backdrops/mindgames.jpg',
          overview: 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.'
        },
        {
          id: 't-scam-mind',
          title: 'Scam 1992',
          app: 'sonyliv',
          genre: 'Financial Strategy · Drama',
          rating: '★ 9.3',
          poster: 'assets/posters/scam1992.jpg',
          backdrop: 'assets/backdrops/mindgames.jpg',
          overview: 'The brilliant, audacious strategy and fall of the big bull of the Bombay Stock Exchange.'
        },
        {
          id: 't-byomkesh-mind',
          title: 'Byomkesh Bakshi',
          app: 'hoichoi',
          genre: 'Truth Seeker · Deduction',
          rating: '★ 8.4',
          poster: 'assets/posters/byomkesh.jpg',
          backdrop: 'assets/backdrops/bengali.jpg',
          overview: 'The truth seeker decodes intricate plots, forged wills and impossible locked-room murders.'
        }
      ]
    },
    {
      id: 'anything',
      name: 'Anything at All',
      color: '#B8C0CC',
      scene: 'assets/backdrops/anything.jpg',
      badge: 'Complete Shuffle',
      fanPosters: [
        'assets/posters/panchayat.jpg',
        'assets/posters/john_wick.jpg',
        'assets/posters/scam1992.jpg'
      ],
      titles: [] // Auto-populated below
    }
  ];

  // Auto-populate 'Anything at All' category with unique titles from other moods
  (function populateAnything() {
    var anything = MOODS[5];
    var seen = {};
    for (var i = 0; i < 5; i++) {
      var moodTitles = MOODS[i].titles;
      for (var j = 0; j < moodTitles.length; j++) {
        var t = moodTitles[j];
        if (!seen[t.id]) {
          seen[t.id] = true;
          anything.titles.push(t);
        }
      }
    }
  })();

  // 4. TRENDING OTT POSTER CAROUSEL (BROWSE STRIP)
  var CAROUSEL_ITEMS = [
    {
      id: 'c-panchayat',
      title: 'Panchayat',
      app: 'prime',
      genre: 'Comedy · Drama',
      year: '2024',
      rating: '★ 8.9',
      poster: 'assets/posters/panchayat.jpg',
      backdrop: 'assets/backdrops/comfort.jpg'
    },
    {
      id: 'c-scam',
      title: 'Scam 1992',
      app: 'sonyliv',
      genre: 'Financial Thriller',
      year: '2020',
      rating: '★ 9.3',
      poster: 'assets/posters/scam1992.jpg',
      backdrop: 'assets/backdrops/mindgames.jpg'
    },
    {
      id: 'c-john-wick',
      title: 'John Wick 4',
      app: 'lionsgate',
      genre: 'Action · Neo-Noir',
      year: '2023',
      rating: '★ 8.0',
      poster: 'assets/posters/john_wick.jpg',
      backdrop: 'assets/backdrops/action.jpg'
    },
    {
      id: 'c-byomkesh',
      title: 'Byomkesh Bakshi',
      app: 'hoichoi',
      genre: 'Period Mystery',
      year: '2023',
      rating: '★ 8.4',
      poster: 'assets/posters/byomkesh.jpg',
      backdrop: 'assets/backdrops/bengali.jpg'
    },
    {
      id: 'c-family-man',
      title: 'The Family Man',
      app: 'prime',
      genre: 'Spy Thriller',
      year: '2021',
      rating: '★ 8.8',
      poster: 'assets/posters/family_man.jpg',
      backdrop: 'assets/backdrops/action.jpg'
    },
    {
      id: 'c-gullak',
      title: 'Gullak',
      app: 'sonyliv',
      genre: 'Heartfelt Comedy',
      year: '2024',
      rating: '★ 9.1',
      poster: 'assets/posters/gullak.jpg',
      backdrop: 'assets/backdrops/comfort.jpg'
    },
    {
      id: 'c-cricket',
      title: 'Live Cricket',
      app: 'hotstar',
      genre: 'Live Sports · 4K',
      year: 'Live',
      rating: '★ 9.5',
      poster: 'assets/posters/cricket_live.jpg',
      backdrop: 'assets/backdrops/cricket_stadium.jpg'
    },
    {
      id: 'c-master',
      title: 'Master',
      app: 'zee5',
      genre: 'Action · Blockbuster',
      year: '2021',
      rating: '★ 7.9',
      poster: 'assets/posters/master.jpg',
      backdrop: 'assets/backdrops/metro_station.jpg'
    }
  ];

  return {
    APPS: APPS,
    FAVOURITES: FAVOURITES,
    MOODS: MOODS,
    CAROUSEL_ITEMS: CAROUSEL_ITEMS
  };
})();
