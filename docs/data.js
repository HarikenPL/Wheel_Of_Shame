/* Season defaults. Edit through the admin panel or this file. */
globalThis.WL_DEFAULTS = {
  "schema": 2,
  "appVersion": "0.2.6",
  "activeSeason": "season-1",
  "seasons": [
    {
      "id": "season-1",
      "pl": "Sezon 1 · Początek",
      "en": "Season 1 · Origins",
      "revision": 1,
      "wheels": [
        {
          "id": "race",
          "en": "Race",
          "pl": "Rasa",
          "color": "#16afd8",
          "enabled": true,
          "options": [
            {
              "id": "human",
              "en": "Human",
              "pl": "Człowiek",
              "chance": 15.653775,
              "enabled": true
            },
            {
              "id": "elf",
              "en": "Elf",
              "pl": "Elf",
              "chance": 8.287293,
              "enabled": true
            },
            {
              "id": "dark_elf",
              "en": "Dark Elf",
              "pl": "Mroczny elf",
              "chance": 4.604052,
              "enabled": true
            },
            {
              "id": "dwarf",
              "en": "Dwarf",
              "pl": "Krasnolud",
              "chance": 6.445672,
              "enabled": true
            },
            {
              "id": "orc",
              "en": "Orc",
              "pl": "Ork",
              "chance": 6.445672,
              "enabled": true
            },
            {
              "id": "goblin",
              "en": "Goblin",
              "pl": "Goblin",
              "chance": 6.445672,
              "enabled": true
            },
            {
              "id": "giant",
              "en": "Giant",
              "pl": "Gigant",
              "chance": 3.683241,
              "enabled": true
            },
            {
              "id": "vampire",
              "en": "Vampire",
              "pl": "Wampir",
              "chance": 4.604052,
              "enabled": true
            },
            {
              "id": "werewolf",
              "en": "Werewolf",
              "pl": "Wilkołak",
              "chance": 4.604052,
              "enabled": true
            },
            {
              "id": "undead",
              "en": "Undead",
              "pl": "Nieumarły",
              "chance": 3.683241,
              "enabled": true
            },
            {
              "id": "skeleton",
              "en": "Skeleton",
              "pl": "Szkielet",
              "chance": 3.683241,
              "enabled": true
            },
            {
              "id": "spirit",
              "en": "Spirit",
              "pl": "Duch",
              "chance": 2.762431,
              "enabled": true
            },
            {
              "id": "demon",
              "en": "Demon",
              "pl": "Demon",
              "chance": 2.762431,
              "enabled": true
            },
            {
              "id": "angel",
              "en": "Angel",
              "pl": "Anioł",
              "chance": 1.841621,
              "enabled": true
            },
            {
              "id": "dragon",
              "en": "Dragon",
              "pl": "Smok",
              "chance": 1.841621,
              "enabled": true
            },
            {
              "id": "elemental",
              "en": "Elemental",
              "pl": "Żywiołak",
              "chance": 2.762431,
              "enabled": true
            },
            {
              "id": "fae",
              "en": "Fae",
              "pl": "Faerie",
              "chance": 1.841621,
              "enabled": true
            },
            {
              "id": "robot",
              "en": "Robot",
              "pl": "Robot",
              "chance": 3.683241,
              "enabled": true
            },
            {
              "id": "android",
              "en": "Android",
              "pl": "Android",
              "chance": 2.762431,
              "enabled": true
            },
            {
              "id": "cyborg",
              "en": "Cyborg",
              "pl": "Cyborg",
              "chance": 2.762431,
              "enabled": true
            },
            {
              "id": "alien",
              "en": "Alien",
              "pl": "Obcy",
              "chance": 2.762431,
              "enabled": true
            },
            {
              "id": "saiyan",
              "en": "Saiyan",
              "pl": "Saiyanin",
              "chance": 1.841621,
              "enabled": true
            },
            {
              "id": "demi_god",
              "en": "Demi God",
              "pl": "Półbóg",
              "chance": 0.92081,
              "enabled": true
            },
            {
              "id": "god",
              "en": "God",
              "pl": "Bóg",
              "chance": 0.368324,
              "enabled": true
            },
            {
              "id": "primordial",
              "en": "Primordial",
              "pl": "Pradawny",
              "chance": 0.184162,
              "enabled": true
            },
            {
              "id": "hybrid",
              "en": "Hybrid",
              "pl": "Hybryda",
              "chance": 2.76243,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "dragon_type",
          "en": "Dragon type",
          "pl": "Rodzaj smoka",
          "color": "#168ea8",
          "enabled": true,
          "options": [
            {
              "id": "fire",
              "en": "Fire",
              "pl": "Ognisty",
              "chance": 25.0,
              "enabled": true,
              "grant": "fire"
            },
            {
              "id": "frost",
              "en": "Frost",
              "pl": "Lodowy",
              "chance": 22.0,
              "enabled": true,
              "grant": "ice"
            },
            {
              "id": "storm",
              "en": "Storm",
              "pl": "Burzowy",
              "chance": 20.0,
              "enabled": true,
              "grant": "lightning"
            },
            {
              "id": "earth",
              "en": "Earth",
              "pl": "Ziemny",
              "chance": 15.0,
              "enabled": true,
              "grant": "earth"
            },
            {
              "id": "shadow",
              "en": "Shadow",
              "pl": "Cienia",
              "chance": 10.0,
              "enabled": true,
              "grant": "darkness"
            },
            {
              "id": "celestial",
              "en": "Celestial",
              "pl": "Niebiański",
              "chance": 5.0,
              "enabled": true,
              "grant": "light"
            },
            {
              "id": "void",
              "en": "Void",
              "pl": "Pustki",
              "chance": 3.0,
              "enabled": true,
              "grant": "space_manipulation"
            }
          ],
          "mode": "branch",
          "source": "race",
          "triggers": [
            "dragon"
          ]
        },
        {
          "id": "demon_rank",
          "en": "Demon rank",
          "pl": "Ranga demona",
          "color": "#a33f91",
          "enabled": true,
          "options": [
            {
              "id": "lesser_demon",
              "en": "Lesser Demon",
              "pl": "Pomniejszy demon",
              "chance": 40.0,
              "enabled": true
            },
            {
              "id": "demon_warrior",
              "en": "Demon Warrior",
              "pl": "Demon wojownik",
              "chance": 30.0,
              "enabled": true
            },
            {
              "id": "greater_demon",
              "en": "Greater Demon",
              "pl": "Większy demon",
              "chance": 18.0,
              "enabled": true
            },
            {
              "id": "archdemon",
              "en": "Archdemon",
              "pl": "Arcydemon",
              "chance": 9.0,
              "enabled": true
            },
            {
              "id": "demon_lord",
              "en": "Demon Lord",
              "pl": "Władca demonów",
              "chance": 3.0,
              "enabled": true
            }
          ],
          "mode": "branch",
          "source": "race",
          "triggers": [
            "demon"
          ]
        },
        {
          "id": "angel_rank",
          "en": "Angel rank",
          "pl": "Ranga anioła",
          "color": "#bcaa66",
          "enabled": true,
          "options": [
            {
              "id": "guardian",
              "en": "Guardian",
              "pl": "Strażnik",
              "chance": 35.0,
              "enabled": true
            },
            {
              "id": "warrior",
              "en": "Warrior",
              "pl": "Wojownik",
              "chance": 30.0,
              "enabled": true
            },
            {
              "id": "archangel",
              "en": "Archangel",
              "pl": "Archanioł",
              "chance": 15.0,
              "enabled": true
            },
            {
              "id": "seraph",
              "en": "Seraph",
              "pl": "Serafin",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "fallen_angel",
              "en": "Fallen Angel",
              "pl": "Upadły anioł",
              "chance": 15.0,
              "enabled": true
            }
          ],
          "mode": "branch",
          "source": "race",
          "triggers": [
            "angel"
          ]
        },
        {
          "id": "core",
          "en": "Core",
          "pl": "Rdzeń",
          "color": "#5688cc",
          "enabled": true,
          "options": [
            {
              "id": "standard",
              "en": "Standard",
              "pl": "Standardowy",
              "chance": 40.0,
              "enabled": true
            },
            {
              "id": "military",
              "en": "Military",
              "pl": "Wojskowy",
              "chance": 25.0,
              "enabled": true
            },
            {
              "id": "experimental",
              "en": "Experimental",
              "pl": "Eksperymentalny",
              "chance": 15.0,
              "enabled": true
            },
            {
              "id": "alien",
              "en": "Alien",
              "pl": "Obcy",
              "chance": 10.0,
              "enabled": true
            },
            {
              "id": "quantum",
              "en": "Quantum",
              "pl": "Kwantowy",
              "chance": 7.0,
              "enabled": true
            },
            {
              "id": "ancient",
              "en": "Ancient",
              "pl": "Pradawny",
              "chance": 3.0,
              "enabled": true
            }
          ],
          "mode": "branch",
          "source": "race",
          "triggers": [
            "robot",
            "android"
          ]
        },
        {
          "id": "element",
          "en": "Element",
          "pl": "Żywioł",
          "color": "#218ac4",
          "enabled": true,
          "options": [
            {
              "id": "fire",
              "en": "Fire",
              "pl": "Ogień",
              "chance": 20.0,
              "enabled": true,
              "grant": "fire"
            },
            {
              "id": "water",
              "en": "Water",
              "pl": "Woda",
              "chance": 18.0,
              "enabled": true,
              "grant": "water"
            },
            {
              "id": "earth",
              "en": "Earth",
              "pl": "Ziemia",
              "chance": 18.0,
              "enabled": true,
              "grant": "earth"
            },
            {
              "id": "wind",
              "en": "Wind",
              "pl": "Wiatr",
              "chance": 16.0,
              "enabled": true,
              "grant": "wind"
            },
            {
              "id": "ice",
              "en": "Ice",
              "pl": "Lód",
              "chance": 12.0,
              "enabled": true,
              "grant": "ice"
            },
            {
              "id": "lightning",
              "en": "Lightning",
              "pl": "Błyskawice",
              "chance": 10.0,
              "enabled": true,
              "grant": "lightning"
            },
            {
              "id": "light",
              "en": "Light",
              "pl": "Światło",
              "chance": 3.0,
              "enabled": true,
              "grant": "light"
            },
            {
              "id": "darkness",
              "en": "Darkness",
              "pl": "Ciemność",
              "chance": 3.0,
              "enabled": true,
              "grant": "darkness"
            }
          ],
          "mode": "branch",
          "source": "race",
          "triggers": [
            "elemental"
          ]
        },
        {
          "id": "alignment",
          "en": "You are a…",
          "pl": "Jesteś…",
          "color": "#90909c",
          "enabled": true,
          "options": [
            {
              "id": "hero",
              "en": "Hero",
              "pl": "Bohater",
              "chance": 45.0,
              "enabled": true
            },
            {
              "id": "anti_hero",
              "en": "Anti Hero",
              "pl": "Antybohater",
              "chance": 15.0,
              "enabled": true
            },
            {
              "id": "villain",
              "en": "Villain",
              "pl": "Złoczyńca",
              "chance": 40.0,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "size",
          "en": "Size",
          "pl": "Wzrost",
          "color": "#70ad42",
          "enabled": true,
          "options": [
            {
              "id": "4_ft",
              "en": "4 ft",
              "pl": "1,22 m",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "4.5_ft",
              "en": "4.5 ft",
              "pl": "1,37 m",
              "chance": 7.0,
              "enabled": true
            },
            {
              "id": "5_ft",
              "en": "5 ft",
              "pl": "1,52 m",
              "chance": 15.0,
              "enabled": true
            },
            {
              "id": "5.5_ft",
              "en": "5.5 ft",
              "pl": "1,68 m",
              "chance": 23.0,
              "enabled": true
            },
            {
              "id": "6_ft",
              "en": "6 ft",
              "pl": "1,83 m",
              "chance": 25.0,
              "enabled": true
            },
            {
              "id": "6.5_ft",
              "en": "6.5 ft",
              "pl": "1,98 m",
              "chance": 12.0,
              "enabled": true
            },
            {
              "id": "7_ft",
              "en": "7 ft",
              "pl": "2,13 m",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "7.5_ft",
              "en": "7.5 ft",
              "pl": "2,29 m",
              "chance": 3.0,
              "enabled": true
            },
            {
              "id": "8_ft",
              "en": "8 ft",
              "pl": "2,44 m",
              "chance": 2.0,
              "enabled": true
            },
            {
              "id": "8.5_ft",
              "en": "8.5 ft",
              "pl": "2,59 m",
              "chance": 1.5,
              "enabled": true
            },
            {
              "id": "9_ft",
              "en": "9 ft",
              "pl": "2,74 m",
              "chance": 1.0,
              "enabled": true
            },
            {
              "id": "10_ft",
              "en": "10 ft",
              "pl": "3,05 m",
              "chance": 0.5,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "size_large",
          "en": "Giant size",
          "pl": "Wzrost olbrzyma",
          "color": "#70ad42",
          "enabled": true,
          "options": [
            {
              "id": "10_ft",
              "en": "10 ft",
              "pl": "3,05 m",
              "chance": 25.0,
              "enabled": true
            },
            {
              "id": "15_ft",
              "en": "15 ft",
              "pl": "4,57 m",
              "chance": 25.0,
              "enabled": true
            },
            {
              "id": "20_ft",
              "en": "20 ft",
              "pl": "6,10 m",
              "chance": 20.0,
              "enabled": true
            },
            {
              "id": "30_ft",
              "en": "30 ft",
              "pl": "9,14 m",
              "chance": 13.0,
              "enabled": true
            },
            {
              "id": "50_ft",
              "en": "50 ft",
              "pl": "15,24 m",
              "chance": 8.0,
              "enabled": true
            },
            {
              "id": "75_ft",
              "en": "75 ft",
              "pl": "22,86 m",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "100_ft",
              "en": "100 ft",
              "pl": "30,48 m",
              "chance": 3.0,
              "enabled": true
            },
            {
              "id": "colossal",
              "en": "Colossal",
              "pl": "Kolosalny",
              "chance": 1.0,
              "enabled": true
            }
          ],
          "mode": "pool",
          "source": "",
          "triggers": []
        },
        {
          "id": "strength",
          "en": "Strength",
          "pl": "Siła",
          "color": "#b832e8",
          "enabled": true,
          "options": [
            {
              "id": "weak",
              "en": "Weak",
              "pl": "Słaby",
              "chance": 18.0,
              "enabled": true
            },
            {
              "id": "mid",
              "en": "Mid",
              "pl": "Przeciętny",
              "chance": 26.0,
              "enabled": true
            },
            {
              "id": "peak_human",
              "en": "Peak Human",
              "pl": "Szczyt ludzkich możliwości",
              "chance": 22.0,
              "enabled": true
            },
            {
              "id": "superhuman",
              "en": "Superhuman",
              "pl": "Nadludzki",
              "chance": 16.0,
              "enabled": true
            },
            {
              "id": "mighty",
              "en": "Mighty",
              "pl": "Potężny",
              "chance": 9.0,
              "enabled": true
            },
            {
              "id": "herculean",
              "en": "Herculean",
              "pl": "Herkulesowy",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "titanic",
              "en": "Titanic",
              "pl": "Tytaniczny",
              "chance": 2.5,
              "enabled": true
            },
            {
              "id": "cosmic",
              "en": "Cosmic",
              "pl": "Kosmiczny",
              "chance": 1.0,
              "enabled": true
            },
            {
              "id": "universal",
              "en": "Universal",
              "pl": "Uniwersalny",
              "chance": 0.4,
              "enabled": true
            },
            {
              "id": "boundless",
              "en": "Boundless",
              "pl": "Bezgraniczny",
              "chance": 0.1,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "speed",
          "en": "Speed",
          "pl": "Szybkość",
          "color": "#e5ae32",
          "enabled": true,
          "options": [
            {
              "id": "sluggish",
              "en": "Sluggish",
              "pl": "Powolny",
              "chance": 18.0,
              "enabled": true
            },
            {
              "id": "average",
              "en": "Average",
              "pl": "Przeciętny",
              "chance": 26.0,
              "enabled": true
            },
            {
              "id": "athletic",
              "en": "Athletic",
              "pl": "Atletyczny",
              "chance": 22.0,
              "enabled": true
            },
            {
              "id": "peak_human",
              "en": "Peak Human",
              "pl": "Szczyt ludzkich możliwości",
              "chance": 16.0,
              "enabled": true
            },
            {
              "id": "superhuman",
              "en": "Superhuman",
              "pl": "Nadludzki",
              "chance": 9.0,
              "enabled": true
            },
            {
              "id": "supersonic",
              "en": "Supersonic",
              "pl": "Ponaddźwiękowy",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "hypersonic",
              "en": "Hypersonic",
              "pl": "Hipersoniczny",
              "chance": 2.5,
              "enabled": true
            },
            {
              "id": "light_speed",
              "en": "Light Speed",
              "pl": "Prędkość światła",
              "chance": 1.0,
              "enabled": true
            },
            {
              "id": "faster_than_light",
              "en": "Faster Than Light",
              "pl": "Szybszy od światła",
              "chance": 0.4,
              "enabled": true
            },
            {
              "id": "immeasurable",
              "en": "Immeasurable",
              "pl": "Niemierzalny",
              "chance": 0.1,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "durability",
          "en": "Durability",
          "pl": "Wytrzymałość",
          "color": "#e47a42",
          "enabled": true,
          "options": [
            {
              "id": "fragile",
              "en": "Fragile",
              "pl": "Kruchy",
              "chance": 18.0,
              "enabled": true
            },
            {
              "id": "average",
              "en": "Average",
              "pl": "Przeciętny",
              "chance": 26.0,
              "enabled": true
            },
            {
              "id": "tough",
              "en": "Tough",
              "pl": "Twardy",
              "chance": 22.0,
              "enabled": true
            },
            {
              "id": "peak_human",
              "en": "Peak Human",
              "pl": "Szczyt ludzkich możliwości",
              "chance": 16.0,
              "enabled": true
            },
            {
              "id": "superhuman",
              "en": "Superhuman",
              "pl": "Nadludzki",
              "chance": 9.0,
              "enabled": true
            },
            {
              "id": "armored",
              "en": "Armored",
              "pl": "Opancerzony",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "unbreakable",
              "en": "Unbreakable",
              "pl": "Niezłomny",
              "chance": 2.5,
              "enabled": true
            },
            {
              "id": "cosmic",
              "en": "Cosmic",
              "pl": "Kosmiczny",
              "chance": 1.0,
              "enabled": true
            },
            {
              "id": "universal",
              "en": "Universal",
              "pl": "Uniwersalny",
              "chance": 0.4,
              "enabled": true
            },
            {
              "id": "boundless",
              "en": "Boundless",
              "pl": "Bezgraniczny",
              "chance": 0.1,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "iq",
          "en": "IQ",
          "pl": "Inteligencja",
          "color": "#5f78e8",
          "enabled": true,
          "options": [
            {
              "id": "mindless",
              "en": "Mindless",
              "pl": "Bezmyślny",
              "chance": 3.0,
              "enabled": true
            },
            {
              "id": "slow_thinker",
              "en": "Slow Thinker",
              "pl": "Powolny umysł",
              "chance": 12.0,
              "enabled": true
            },
            {
              "id": "average",
              "en": "Average",
              "pl": "Przeciętny",
              "chance": 32.0,
              "enabled": true
            },
            {
              "id": "clever",
              "en": "Clever",
              "pl": "Bystry",
              "chance": 23.0,
              "enabled": true
            },
            {
              "id": "gifted",
              "en": "Gifted",
              "pl": "Uzdolniony",
              "chance": 15.0,
              "enabled": true
            },
            {
              "id": "genius",
              "en": "Genius",
              "pl": "Geniusz",
              "chance": 8.0,
              "enabled": true
            },
            {
              "id": "super_genius",
              "en": "Super Genius",
              "pl": "Supergeniusz",
              "chance": 4.0,
              "enabled": true
            },
            {
              "id": "supercomputer",
              "en": "Supercomputer",
              "pl": "Superkomputer",
              "chance": 2.0,
              "enabled": true
            },
            {
              "id": "cosmic_mind",
              "en": "Cosmic Mind",
              "pl": "Kosmiczny umysł",
              "chance": 0.9,
              "enabled": true
            },
            {
              "id": "omniscient",
              "en": "Omniscient",
              "pl": "Wszechwiedzący",
              "chance": 0.1,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "combat",
          "en": "Combat skill",
          "pl": "Umiejętności walki",
          "color": "#d45b77",
          "enabled": true,
          "options": [
            {
              "id": "untrained",
              "en": "Untrained",
              "pl": "Niewyszkolony",
              "chance": 18.0,
              "enabled": true
            },
            {
              "id": "beginner",
              "en": "Beginner",
              "pl": "Początkujący",
              "chance": 26.0,
              "enabled": true
            },
            {
              "id": "brawler",
              "en": "Brawler",
              "pl": "Zabijaka",
              "chance": 22.0,
              "enabled": true
            },
            {
              "id": "trained",
              "en": "Trained",
              "pl": "Wyszkolony",
              "chance": 16.0,
              "enabled": true
            },
            {
              "id": "skilled",
              "en": "Skilled",
              "pl": "Biegły",
              "chance": 9.0,
              "enabled": true
            },
            {
              "id": "expert",
              "en": "Expert",
              "pl": "Ekspert",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "master",
              "en": "Master",
              "pl": "Mistrz",
              "chance": 2.5,
              "enabled": true
            },
            {
              "id": "grandmaster",
              "en": "Grandmaster",
              "pl": "Arcymistrz",
              "chance": 1.0,
              "enabled": true
            },
            {
              "id": "legendary",
              "en": "Legendary",
              "pl": "Legendarny",
              "chance": 0.4,
              "enabled": true
            },
            {
              "id": "transcendent",
              "en": "Transcendent",
              "pl": "Transcendentny",
              "chance": 0.1,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "weapon",
          "en": "Weapon",
          "pl": "Broń",
          "color": "#af7151",
          "enabled": true,
          "options": [
            {
              "id": "unarmed",
              "en": "Unarmed",
              "pl": "Bez broni",
              "chance": 15.0,
              "enabled": true
            },
            {
              "id": "sword",
              "en": "Sword",
              "pl": "Miecz",
              "chance": 12.0,
              "enabled": true
            },
            {
              "id": "greatsword",
              "en": "Greatsword",
              "pl": "Wielki miecz",
              "chance": 7.0,
              "enabled": true
            },
            {
              "id": "dual_blades",
              "en": "Dual Blades",
              "pl": "Dwa ostrza",
              "chance": 6.0,
              "enabled": true
            },
            {
              "id": "dagger",
              "en": "Dagger",
              "pl": "Sztylet",
              "chance": 6.0,
              "enabled": true
            },
            {
              "id": "katana",
              "en": "Katana",
              "pl": "Katana",
              "chance": 6.0,
              "enabled": true
            },
            {
              "id": "axe",
              "en": "Axe",
              "pl": "Topór",
              "chance": 6.0,
              "enabled": true
            },
            {
              "id": "war_hammer",
              "en": "War Hammer",
              "pl": "Młot wojenny",
              "chance": 4.0,
              "enabled": true
            },
            {
              "id": "spear",
              "en": "Spear",
              "pl": "Włócznia",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "scythe",
              "en": "Scythe",
              "pl": "Kosa",
              "chance": 3.0,
              "enabled": true
            },
            {
              "id": "bow",
              "en": "Bow",
              "pl": "Łuk",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "crossbow",
              "en": "Crossbow",
              "pl": "Kusza",
              "chance": 4.0,
              "enabled": true
            },
            {
              "id": "staff",
              "en": "Staff",
              "pl": "Kostur",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "wand",
              "en": "Wand",
              "pl": "Różdżka",
              "chance": 3.0,
              "enabled": true
            },
            {
              "id": "shield",
              "en": "Shield",
              "pl": "Tarcza",
              "chance": 3.0,
              "enabled": true
            },
            {
              "id": "chains",
              "en": "Chains",
              "pl": "Łańcuchy",
              "chance": 2.0,
              "enabled": true
            },
            {
              "id": "pistol",
              "en": "Pistol",
              "pl": "Pistolet",
              "chance": 3.0,
              "enabled": true
            },
            {
              "id": "rifle",
              "en": "Rifle",
              "pl": "Karabin",
              "chance": 2.0,
              "enabled": true
            },
            {
              "id": "energy_blade",
              "en": "Energy Blade",
              "pl": "Ostrze energii",
              "chance": 2.0,
              "enabled": true
            },
            {
              "id": "random_artifact",
              "en": "Random Artifact",
              "pl": "Losowy artefakt",
              "chance": 1.0,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "artifact",
          "en": "Artifact",
          "pl": "Artefakt",
          "color": "#bb9c53",
          "enabled": true,
          "options": [
            {
              "id": "soul_blade",
              "en": "Soul Blade",
              "pl": "Ostrze dusz",
              "chance": 12.5,
              "enabled": true
            },
            {
              "id": "storm_hammer",
              "en": "Storm Hammer",
              "pl": "Młot burzy",
              "chance": 12.5,
              "enabled": true
            },
            {
              "id": "void_scythe",
              "en": "Void Scythe",
              "pl": "Kosa pustki",
              "chance": 12.5,
              "enabled": true
            },
            {
              "id": "celestial_bow",
              "en": "Celestial Bow",
              "pl": "Niebiański łuk",
              "chance": 12.5,
              "enabled": true
            },
            {
              "id": "timekeeper’s_staff",
              "en": "Timekeeper’s Staff",
              "pl": "Kostur strażnika czasu",
              "chance": 12.5,
              "enabled": true
            },
            {
              "id": "cursed_chains",
              "en": "Cursed Chains",
              "pl": "Przeklęte łańcuchy",
              "chance": 12.5,
              "enabled": true
            },
            {
              "id": "living_weapon",
              "en": "Living Weapon",
              "pl": "Żywa broń",
              "chance": 12.5,
              "enabled": true
            },
            {
              "id": "sealed_relic",
              "en": "Sealed Relic",
              "pl": "Zapieczętowana relikwia",
              "chance": 12.5,
              "enabled": true
            }
          ],
          "mode": "branch",
          "source": "weapon",
          "triggers": [
            "random_artifact"
          ]
        },
        {
          "id": "power_count",
          "en": "Additional powers",
          "pl": "Dodatkowe moce",
          "color": "#3da999",
          "enabled": true,
          "options": [
            {
              "id": "no_extra_powers",
              "en": "No extra powers",
              "pl": "Brak dodatkowych mocy",
              "chance": 20.0,
              "enabled": true,
              "count": 0
            },
            {
              "id": "one_power",
              "en": "One Power",
              "pl": "Jedna moc",
              "chance": 55.0,
              "enabled": true,
              "count": 1
            },
            {
              "id": "two_powers",
              "en": "Two Powers",
              "pl": "Dwie moce",
              "chance": 20.0,
              "enabled": true,
              "count": 2
            },
            {
              "id": "three_powers",
              "en": "Three Powers",
              "pl": "Trzy moce",
              "chance": 5.0,
              "enabled": true,
              "count": 3
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "powers",
          "en": "Power",
          "pl": "Moc",
          "color": "#2caeb4",
          "enabled": true,
          "options": [
            {
              "id": "fire",
              "en": "Fire",
              "pl": "Ogień",
              "chance": 8.0,
              "enabled": true
            },
            {
              "id": "ice",
              "en": "Ice",
              "pl": "Lód",
              "chance": 7.111111,
              "enabled": true
            },
            {
              "id": "water",
              "en": "Water",
              "pl": "Woda",
              "chance": 7.111111,
              "enabled": true
            },
            {
              "id": "earth",
              "en": "Earth",
              "pl": "Ziemia",
              "chance": 7.111111,
              "enabled": true
            },
            {
              "id": "wind",
              "en": "Wind",
              "pl": "Wiatr",
              "chance": 7.111111,
              "enabled": true
            },
            {
              "id": "lightning",
              "en": "Lightning",
              "pl": "Błyskawice",
              "chance": 7.111111,
              "enabled": true
            },
            {
              "id": "nature",
              "en": "Nature",
              "pl": "Natura",
              "chance": 6.222222,
              "enabled": true
            },
            {
              "id": "metal",
              "en": "Metal",
              "pl": "Metal",
              "chance": 5.333333,
              "enabled": true
            },
            {
              "id": "light",
              "en": "Light",
              "pl": "Światło",
              "chance": 3.555556,
              "enabled": true
            },
            {
              "id": "darkness",
              "en": "Darkness",
              "pl": "Ciemność",
              "chance": 3.555556,
              "enabled": true
            },
            {
              "id": "gravity",
              "en": "Gravity",
              "pl": "Grawitacja",
              "chance": 2.666667,
              "enabled": true
            },
            {
              "id": "magnetism",
              "en": "Magnetism",
              "pl": "Magnetyzm",
              "chance": 2.666667,
              "enabled": true
            },
            {
              "id": "sound",
              "en": "Sound",
              "pl": "Dźwięk",
              "chance": 2.666667,
              "enabled": true
            },
            {
              "id": "energy_absorption",
              "en": "Energy Absorption",
              "pl": "Pochłanianie energii",
              "chance": 2.666667,
              "enabled": true
            },
            {
              "id": "portals",
              "en": "Portals",
              "pl": "Portale",
              "chance": 1.777778,
              "enabled": true
            },
            {
              "id": "regeneration",
              "en": "Regeneration",
              "pl": "Regeneracja",
              "chance": 4.444444,
              "enabled": true
            },
            {
              "id": "shapeshifting",
              "en": "Shapeshifting",
              "pl": "Zmiana kształtu",
              "chance": 2.666667,
              "enabled": true
            },
            {
              "id": "invisibility",
              "en": "Invisibility",
              "pl": "Niewidzialność",
              "chance": 2.666667,
              "enabled": true
            },
            {
              "id": "cloning",
              "en": "Cloning",
              "pl": "Klonowanie",
              "chance": 1.777778,
              "enabled": true
            },
            {
              "id": "size_manipulation",
              "en": "Size Manipulation",
              "pl": "Zmiana rozmiaru",
              "chance": 1.777778,
              "enabled": true
            },
            {
              "id": "telepathy",
              "en": "Telepathy",
              "pl": "Telepatia",
              "chance": 2.666667,
              "enabled": true
            },
            {
              "id": "telekinesis",
              "en": "Telekinesis",
              "pl": "Telekineza",
              "chance": 2.666667,
              "enabled": true
            },
            {
              "id": "illusions",
              "en": "Illusions",
              "pl": "Iluzje",
              "chance": 2.666667,
              "enabled": true
            },
            {
              "id": "mind_control",
              "en": "Mind Control",
              "pl": "Kontrola umysłu",
              "chance": 0.888889,
              "enabled": true
            },
            {
              "id": "precognition",
              "en": "Precognition",
              "pl": "Przewidywanie przyszłości",
              "chance": 0.888889,
              "enabled": true
            },
            {
              "id": "time_manipulation",
              "en": "Time Manipulation",
              "pl": "Manipulacja czasem",
              "chance": 0.444444,
              "enabled": true
            },
            {
              "id": "space_manipulation",
              "en": "Space Manipulation",
              "pl": "Manipulacja przestrzenią",
              "chance": 0.444444,
              "enabled": true
            },
            {
              "id": "soul_manipulation",
              "en": "Soul Manipulation",
              "pl": "Manipulacja duszą",
              "chance": 0.444444,
              "enabled": true
            },
            {
              "id": "power_mimicry",
              "en": "Power Mimicry",
              "pl": "Kopiowanie mocy",
              "chance": 0.444444,
              "enabled": true
            },
            {
              "id": "probability_manipulation",
              "en": "Probability Manipulation",
              "pl": "Manipulacja prawdopodobieństwem",
              "chance": 0.266667,
              "enabled": true
            },
            {
              "id": "reality_warping",
              "en": "Reality Warping",
              "pl": "Zmiana rzeczywistości",
              "chance": 0.177776,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "mastery",
          "en": "Power mastery",
          "pl": "Opanowanie mocy",
          "color": "#3e8da8",
          "enabled": true,
          "options": [
            {
              "id": "uncontrolled",
              "en": "Uncontrolled",
              "pl": "Brak kontroli",
              "chance": 10.0,
              "enabled": true
            },
            {
              "id": "novice",
              "en": "Novice",
              "pl": "Nowicjusz",
              "chance": 20.0,
              "enabled": true
            },
            {
              "id": "developing",
              "en": "Developing",
              "pl": "Rozwijający się",
              "chance": 26.0,
              "enabled": true
            },
            {
              "id": "skilled",
              "en": "Skilled",
              "pl": "Biegły",
              "chance": 22.0,
              "enabled": true
            },
            {
              "id": "expert",
              "en": "Expert",
              "pl": "Ekspert",
              "chance": 12.0,
              "enabled": true
            },
            {
              "id": "master",
              "en": "Master",
              "pl": "Mistrz",
              "chance": 6.0,
              "enabled": true
            },
            {
              "id": "awakened",
              "en": "Awakened",
              "pl": "Przebudzony",
              "chance": 3.0,
              "enabled": true
            },
            {
              "id": "absolute",
              "en": "Absolute",
              "pl": "Absolutne",
              "chance": 1.0,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "trait",
          "en": "Special trait",
          "pl": "Cecha specjalna",
          "color": "#ba8b3e",
          "enabled": true,
          "options": [
            {
              "id": "no_special_trait",
              "en": "No Special Trait",
              "pl": "Brak szczególnej cechy",
              "chance": 30.0,
              "enabled": true
            },
            {
              "id": "lucky",
              "en": "Lucky",
              "pl": "Szczęściarz",
              "chance": 8.0,
              "enabled": true
            },
            {
              "id": "unlucky",
              "en": "Unlucky",
              "pl": "Pechowiec",
              "chance": 6.0,
              "enabled": true
            },
            {
              "id": "battle_instinct",
              "en": "Battle Instinct",
              "pl": "Instynkt walki",
              "chance": 7.0,
              "enabled": true
            },
            {
              "id": "iron_will",
              "en": "Iron Will",
              "pl": "Żelazna wola",
              "chance": 7.0,
              "enabled": true
            },
            {
              "id": "photographic_memory",
              "en": "Photographic Memory",
              "pl": "Pamięć fotograficzna",
              "chance": 6.0,
              "enabled": true
            },
            {
              "id": "sixth_sense",
              "en": "Sixth Sense",
              "pl": "Szósty zmysł",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "natural_leader",
              "en": "Natural Leader",
              "pl": "Urodzony przywódca",
              "chance": 5.0,
              "enabled": true
            },
            {
              "id": "berserker",
              "en": "Berserker",
              "pl": "Berserker",
              "chance": 4.0,
              "enabled": true
            },
            {
              "id": "adaptation",
              "en": "Adaptation",
              "pl": "Adaptacja",
              "chance": 4.0,
              "enabled": true
            },
            {
              "id": "fast_learner",
              "en": "Fast Learner",
              "pl": "Szybka nauka",
              "chance": 6.0,
              "enabled": true
            },
            {
              "id": "ancient_knowledge",
              "en": "Ancient Knowledge",
              "pl": "Pradawna wiedza",
              "chance": 3.0,
              "enabled": true
            },
            {
              "id": "chosen_one",
              "en": "Chosen One",
              "pl": "Wybraniec",
              "chance": 1.0,
              "enabled": true
            },
            {
              "id": "cursed",
              "en": "Cursed",
              "pl": "Przeklęty",
              "chance": 4.0,
              "enabled": true
            },
            {
              "id": "divine_blessing",
              "en": "Divine Blessing",
              "pl": "Boskie błogosławieństwo",
              "chance": 1.0,
              "enabled": true
            },
            {
              "id": "sealed_potential",
              "en": "Sealed Potential",
              "pl": "Ukryty potencjał",
              "chance": 3.0,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        },
        {
          "id": "weakness",
          "en": "Weakness",
          "pl": "Słabość",
          "color": "#218fa7",
          "enabled": true,
          "options": [
            {
              "id": "no_weakness",
              "en": "No Weakness",
              "pl": "Brak słabości",
              "chance": 50.0,
              "enabled": true
            },
            {
              "id": "silver",
              "en": "Silver",
              "pl": "Srebro",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "iron",
              "en": "Iron",
              "pl": "Żelazo",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "sunlight",
              "en": "Sunlight",
              "pl": "Światło słoneczne",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "darkness",
              "en": "Darkness",
              "pl": "Ciemność",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "fire",
              "en": "Fire",
              "pl": "Ogień",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "ice",
              "en": "Ice",
              "pl": "Lód",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "water",
              "en": "Water",
              "pl": "Woda",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "lightning",
              "en": "Lightning",
              "pl": "Błyskawice",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "poison",
              "en": "Poison",
              "pl": "Trucizna",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "magic",
              "en": "Magic",
              "pl": "Magia",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "holy_power",
              "en": "Holy Power",
              "pl": "Święta moc",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "dark_energy",
              "en": "Dark Energy",
              "pl": "Mroczna energia",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "psychic_attacks",
              "en": "Psychic Attacks",
              "pl": "Ataki psychiczne",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "loud_sounds",
              "en": "Loud Sounds",
              "pl": "Głośne dźwięki",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "overconfidence",
              "en": "Overconfidence",
              "pl": "Zbytnia pewność siebie",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "blind_rage",
              "en": "Blind Rage",
              "pl": "Ślepa furia",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "fragile_body",
              "en": "Fragile Body",
              "pl": "Kruche ciało",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "low_stamina",
              "en": "Low Stamina",
              "pl": "Niska kondycja",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "slow_recovery",
              "en": "Slow Recovery",
              "pl": "Powolna regeneracja",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "power_exhaustion",
              "en": "Power Exhaustion",
              "pl": "Wyczerpanie mocy",
              "chance": 1.923077,
              "enabled": true,
              "requiresPower": true
            },
            {
              "id": "unstable_powers",
              "en": "Unstable Powers",
              "pl": "Niestabilne moce",
              "chance": 1.923077,
              "enabled": true,
              "requiresPower": true
            },
            {
              "id": "requires_a_catalyst",
              "en": "Requires a Catalyst",
              "pl": "Wymagany katalizator",
              "chance": 1.923077,
              "enabled": true,
              "requiresPower": true
            },
            {
              "id": "limited_range",
              "en": "Limited Range",
              "pl": "Ograniczony zasięg",
              "chance": 1.923077,
              "enabled": true,
              "requiresPower": true
            },
            {
              "id": "bound_to_an_object",
              "en": "Bound to an Object",
              "pl": "Więź z przedmiotem",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "full_moon_dependency",
              "en": "Full Moon Dependency",
              "pl": "Zależność od pełni",
              "chance": 1.923077,
              "enabled": true
            },
            {
              "id": "cannot_harm_the_innocent",
              "en": "Cannot Harm the Innocent",
              "pl": "Nie może krzywdzić niewinnych",
              "chance": 1.923075,
              "enabled": true
            }
          ],
          "mode": "main",
          "source": "",
          "triggers": []
        }
      ]
    }
  ],
  "settings": {
    "limit": 3,
    "cooldown": 0,
    "sound": false
  }
};
