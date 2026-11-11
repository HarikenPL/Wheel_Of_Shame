import json
from pathlib import Path
root=Path(__file__).parent

def opts(en,pl,weights=None):
    es=en.split('|'); ps=pl.split('|'); assert len(es)==len(ps),(es,ps)
    weights=weights or [1]*len(es); total=sum(weights); out=[]
    for i,(e,p,w) in enumerate(zip(es,ps,weights)):
        out.append(dict(id=e.lower().replace(' ','_').replace('/','_'),en=e,pl=p,chance=round(w/total*100,6),enabled=True))
    out[-1]['chance']=round(100-sum(x['chance'] for x in out[:-1]),6)
    return out
wheels=[]
def wheel(id,en,pl,color,options,mode='main',source='',triggers=None):
    w=dict(id=id,en=en,pl=pl,color=color,enabled=True,options=options,mode=mode,source=source,triggers=triggers or [])
    wheels.append(w); return w
wheel('race','Race','Rasa','#16afd8',opts('Human|Elf|Dark Elf|Dwarf|Orc|Goblin|Giant|Vampire|Werewolf|Undead|Skeleton|Spirit|Demon|Angel|Dragon|Elemental|Fae|Robot|Android|Cyborg|Alien|Saiyan|Demi God|God|Primordial|Hybrid','Człowiek|Elf|Mroczny elf|Krasnolud|Ork|Goblin|Gigant|Wampir|Wilkołak|Nieumarły|Szkielet|Duch|Demon|Anioł|Smok|Żywiołak|Faerie|Robot|Android|Cyborg|Obcy|Saiyanin|Półbóg|Bóg|Pradawny|Hybryda',[17,9,5,7,7,7,4,5,5,4,4,3,3,2,2,3,2,4,3,3,3,2,1,.4,.2,3]))
wheel('dragon_type','Dragon type','Rodzaj smoka','#168ea8',opts('Fire|Frost|Storm|Earth|Shadow|Celestial|Void','Ognisty|Lodowy|Burzowy|Ziemny|Cienia|Niebiański|Pustki',[25,22,20,15,10,5,3]),'branch','race',['dragon'])
for o in wheels[-1]['options']:o['grant']={'fire':'fire','frost':'ice','storm':'lightning','earth':'earth','shadow':'darkness','celestial':'light','void':'space_manipulation'}[o['id']]
wheel('demon_rank','Demon rank','Ranga demona','#a33f91',opts('Lesser Demon|Demon Warrior|Greater Demon|Archdemon|Demon Lord','Pomniejszy demon|Demon wojownik|Większy demon|Arcydemon|Władca demonów',[40,30,18,9,3]),'branch','race',['demon'])
wheel('angel_rank','Angel rank','Ranga anioła','#bcaa66',opts('Guardian|Warrior|Archangel|Seraph|Fallen Angel','Strażnik|Wojownik|Archanioł|Serafin|Upadły anioł',[35,30,15,5,15]),'branch','race',['angel'])
wheel('core','Core','Rdzeń','#5688cc',opts('Standard|Military|Experimental|Alien|Quantum|Ancient','Standardowy|Wojskowy|Eksperymentalny|Obcy|Kwantowy|Pradawny',[40,25,15,10,7,3]),'branch','race',['robot','android'])
wheel('element','Element','Żywioł','#218ac4',opts('Fire|Water|Earth|Wind|Ice|Lightning|Light|Darkness','Ogień|Woda|Ziemia|Wiatr|Lód|Błyskawice|Światło|Ciemność',[20,18,18,16,12,10,3,3]),'branch','race',['elemental'])
for o in wheels[-1]['options']:o['grant']=o['id']
wheel('alignment','You are a…','Jesteś…','#90909c',opts('Hero|Anti Hero|Villain','Bohater|Antybohater|Złoczyńca',[45,15,40]))
wheel('size','Size','Wzrost','#70ad42',opts('4 ft|4.5 ft|5 ft|5.5 ft|6 ft|6.5 ft|7 ft|7.5 ft|8 ft|8.5 ft|9 ft|10 ft','1,22 m|1,37 m|1,52 m|1,68 m|1,83 m|1,98 m|2,13 m|2,29 m|2,44 m|2,59 m|2,74 m|3,05 m',[5,7,15,23,25,12,5,3,2,1.5,1,.5]))
wheel('size_large','Giant size','Wzrost olbrzyma','#70ad42',opts('10 ft|15 ft|20 ft|30 ft|50 ft|75 ft|100 ft|Colossal','3,05 m|4,57 m|6,10 m|9,14 m|15,24 m|22,86 m|30,48 m|Kolosalny',[25,25,20,13,8,5,3,1]),'pool')
levels=[18,26,22,16,9,5,2.5,1,.4,.1]
wheel('strength','Strength','Siła','#b832e8',opts('Weak|Mid|Peak Human|Superhuman|Mighty|Herculean|Titanic|Cosmic|Universal|Boundless','Słaby|Przeciętny|Szczyt ludzkich możliwości|Nadludzki|Potężny|Herkulesowy|Tytaniczny|Kosmiczny|Uniwersalny|Bezgraniczny',levels))
wheel('speed','Speed','Szybkość','#e5ae32',opts('Sluggish|Average|Athletic|Peak Human|Superhuman|Supersonic|Hypersonic|Light Speed|Faster Than Light|Immeasurable','Powolny|Przeciętny|Atletyczny|Szczyt ludzkich możliwości|Nadludzki|Ponaddźwiękowy|Hipersoniczny|Prędkość światła|Szybszy od światła|Niemierzalny',levels))
wheel('durability','Durability','Wytrzymałość','#e47a42',opts('Fragile|Average|Tough|Peak Human|Superhuman|Armored|Unbreakable|Cosmic|Universal|Boundless','Kruchy|Przeciętny|Twardy|Szczyt ludzkich możliwości|Nadludzki|Opancerzony|Niezłomny|Kosmiczny|Uniwersalny|Bezgraniczny',levels))
wheel('iq','IQ','Inteligencja','#5f78e8',opts('Mindless|Slow Thinker|Average|Clever|Gifted|Genius|Super Genius|Supercomputer|Cosmic Mind|Omniscient','Bezmyślny|Powolny umysł|Przeciętny|Bystry|Uzdolniony|Geniusz|Supergeniusz|Superkomputer|Kosmiczny umysł|Wszechwiedzący',[3,12,32,23,15,8,4,2,.9,.1]))
wheel('combat','Combat skill','Umiejętności walki','#d45b77',opts('Untrained|Beginner|Brawler|Trained|Skilled|Expert|Master|Grandmaster|Legendary|Transcendent','Niewyszkolony|Początkujący|Zabijaka|Wyszkolony|Biegły|Ekspert|Mistrz|Arcymistrz|Legendarny|Transcendentny',levels))
wheel('weapon','Weapon','Broń','#af7151',opts('Unarmed|Sword|Greatsword|Dual Blades|Dagger|Katana|Axe|War Hammer|Spear|Scythe|Bow|Crossbow|Staff|Wand|Shield|Chains|Pistol|Rifle|Energy Blade|Random Artifact','Bez broni|Miecz|Wielki miecz|Dwa ostrza|Sztylet|Katana|Topór|Młot wojenny|Włócznia|Kosa|Łuk|Kusza|Kostur|Różdżka|Tarcza|Łańcuchy|Pistolet|Karabin|Ostrze energii|Losowy artefakt',[15,12,7,6,6,6,6,4,5,3,5,4,5,3,3,2,3,2,2,1]))
wheel('artifact','Artifact','Artefakt','#bb9c53',opts('Soul Blade|Storm Hammer|Void Scythe|Celestial Bow|Timekeeper’s Staff|Cursed Chains|Living Weapon|Sealed Relic','Ostrze dusz|Młot burzy|Kosa pustki|Niebiański łuk|Kostur strażnika czasu|Przeklęte łańcuchy|Żywa broń|Zapieczętowana relikwia'),'branch','weapon',['random_artifact'])
wheel('power_count','Additional powers','Dodatkowe moce','#3da999',opts('No extra powers|One Power|Two Powers|Three Powers','Brak dodatkowych mocy|Jedna moc|Dwie moce|Trzy moce',[20,55,20,5]))
for i,o in enumerate(wheels[-1]['options']):o['count']=i
wheel('powers','Power','Moc','#2caeb4',opts('Fire|Ice|Water|Earth|Wind|Lightning|Nature|Metal|Light|Darkness|Gravity|Magnetism|Sound|Energy Absorption|Portals|Regeneration|Shapeshifting|Invisibility|Cloning|Size Manipulation|Telepathy|Telekinesis|Illusions|Mind Control|Precognition|Time Manipulation|Space Manipulation|Soul Manipulation|Power Mimicry|Probability Manipulation|Reality Warping','Ogień|Lód|Woda|Ziemia|Wiatr|Błyskawice|Natura|Metal|Światło|Ciemność|Grawitacja|Magnetyzm|Dźwięk|Pochłanianie energii|Portale|Regeneracja|Zmiana kształtu|Niewidzialność|Klonowanie|Zmiana rozmiaru|Telepatia|Telekineza|Iluzje|Kontrola umysłu|Przewidywanie przyszłości|Manipulacja czasem|Manipulacja przestrzenią|Manipulacja duszą|Kopiowanie mocy|Manipulacja prawdopodobieństwem|Zmiana rzeczywistości',[9,8,8,8,8,8,7,6,4,4,3,3,3,3,2,5,3,3,2,2,3,3,3,1,1,.5,.5,.5,.5,.3,.2]))
wheel('mastery','Power mastery','Opanowanie mocy','#3e8da8',opts('Uncontrolled|Novice|Developing|Skilled|Expert|Master|Awakened|Absolute','Brak kontroli|Nowicjusz|Rozwijający się|Biegły|Ekspert|Mistrz|Przebudzony|Absolutne',[10,20,26,22,12,6,3,1]))
wheel('trait','Special trait','Cecha specjalna','#ba8b3e',opts('No Special Trait|Lucky|Unlucky|Battle Instinct|Iron Will|Photographic Memory|Sixth Sense|Natural Leader|Berserker|Adaptation|Fast Learner|Ancient Knowledge|Chosen One|Cursed|Divine Blessing|Sealed Potential','Brak szczególnej cechy|Szczęściarz|Pechowiec|Instynkt walki|Żelazna wola|Pamięć fotograficzna|Szósty zmysł|Urodzony przywódca|Berserker|Adaptacja|Szybka nauka|Pradawna wiedza|Wybraniec|Przeklęty|Boskie błogosławieństwo|Ukryty potencjał',[30,8,6,7,7,6,5,5,4,4,6,3,1,4,1,3]))
weak=opts('No Weakness|Silver|Iron|Sunlight|Darkness|Fire|Ice|Water|Lightning|Poison|Magic|Holy Power|Dark Energy|Psychic Attacks|Loud Sounds|Overconfidence|Blind Rage|Fragile Body|Low Stamina|Slow Recovery|Power Exhaustion|Unstable Powers|Requires a Catalyst|Limited Range|Bound to an Object|Full Moon Dependency|Cannot Harm the Innocent','Brak słabości|Srebro|Żelazo|Światło słoneczne|Ciemność|Ogień|Lód|Woda|Błyskawice|Trucizna|Magia|Święta moc|Mroczna energia|Ataki psychiczne|Głośne dźwięki|Zbytnia pewność siebie|Ślepa furia|Kruche ciało|Niska kondycja|Powolna regeneracja|Wyczerpanie mocy|Niestabilne moce|Wymagany katalizator|Ograniczony zasięg|Więź z przedmiotem|Zależność od pełni|Nie może krzywdzić niewinnych',[26]+[1]*26)
for o in weak:
    if o['id'] in ['power_exhaustion','unstable_powers','requires_a_catalyst','limited_range']:o['requiresPower']=True
wheel('weakness','Weakness','Słabość','#218fa7',weak)
season=dict(id='season-1',pl='Sezon 1 · Początek',en='Season 1 · Origins',revision=1,wheels=wheels)
data=dict(schema=2,appVersion='0.2.5',activeSeason='season-1',seasons=[season],settings=dict(limit=3,cooldown=0,sound=False))
(root/'app'/'data.js').write_text('/* Season defaults. Edit through the admin panel or this file. */\nglobalThis.WL_DEFAULTS = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n')
