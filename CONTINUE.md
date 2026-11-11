# Punkt kontynuacji — Wheel Lab 0.2.5 / Beta 0.1

## Intencja użytkownika

Generator inspirowany The Wheel of Faith. Gracz: nazwa, postać i pojedyncze ręczne obroty, prosty czarny ekran, kolorowe koła, podświetlenie wyniku. Nie dodawać automatycznych losowań ani liczbowych HP/ataku. Walki odłożone. PL/EN. Duża swoboda autorskich wariantów przy zachowaniu klimatu screenów.

Admin: lokalne admin/admin, wymagane nazwy obu języków, edycja opcji i procentów, sezony. Limit to ochrona przed spamem, nie koniecznie tożsamość po nicku. Docelowo GitHub Pages + instalowalna PWA i aktualizacje. Użytkownik prosi o oszczędne użycie zasobów i łatwą kontynuację po limitach.

## Dostarczony stan

Kompletna lokalna implementacja w archiwum. Jednoplikowy HTML do dwukliku oraz osobny katalog PWA. Nie ma repozytorium ani wdrożenia zewnętrznego. Nie ma zależności npm ani frameworka. Wersja 0.1 nie jest bazą danych wersji 0.2; stary plik pozostaje osobno.

- `app/data.js`: sezon startowy, 21 katalogów, PL/EN, szanse w procentach, `grant`, `count`, `requiresPower`.
- `app/engine.js`: czysty silnik, global `WLEngine`, także CommonJS do testów. `steps`, `next`, `roll`, `powers`, `validateSeason`, `normalize`. Race hybrid, podtypy, pomocniczy wzrost, moce bez duplikatów, mastery każdej mocy.
- `app/app.js`: UI, tłumaczenia interfejsu, zapis, panel admina, CRUD, sezony, limity, backup/import oraz PWA. Prywatna funkcja IIFE. Testy wstrzykują dostęp tylko do swojego egzemplarza kodu, nie do produkcyjnego pliku.
- `app/index.html`, `style.css`: interfejs.
- `app/sw.js`, `manifest.webmanifest`, `version.json`, ikony: PWA.
- `build.py`: generuje `Wheel_Lab_LOCAL.html` ze źródeł.
- `serve.py`, `START_LOCAL.bat`: localhost:8765, Python stdlib.
- `tests/*.cjs`: Node stdlib, bez instalacji zależności.

## Schemat zapisu

LocalStorage `wheel_lab_v2`, schema 2. `rev` do kontroli konfliktów między kartami, `config` (activeSeason/seasons/settings), characters, guests, guestId, currentId, lang, sound. Postać zawiera własny snapshot całego sezonu i historię wyników wraz z pulami. Przy imporcie odtwarzamy sekwencję silnikiem i sprawdzamy wynik oraz pulę przeciw kopii sezonu. Wynik zapisywany jest PRZED animacją. Odsłonięty wynik utrzymuje się po reloadzie przez `reveal`.

## Znane ograniczenia / następne etapy

- Auth i limity są demonstracyjne i lokalne. Prawdziwa administracja, zaproszenia i wspólna baza wymagają backendu obok GitHub Pages. Nie przedstawiać admin/admin jako ochrony danych.
- Publikacja sezonów: eksport data.js i wdrożenie; aktualizacja kodu nie nadpisuje lokalnej konfiguracji. Admin ma przycisk wczytania sezonów z wydania. Można w kolejnym etapie dodać zdalny wersjonowany katalog sezonów.
- Klasyczne locale i dane w file://, localhost i GitHub Pages są rozdzielone. Transfer przez pełną kopię.
- Przechowywanie pełnych snapshotów jest proste, ale przy większej kolekcji warto przenieść dane do IndexedDB i współdzielić niezmienne snapshots. Przy błędzie zapisu operacja zostaje cofnięta; nie usuwać zapisów automatycznie.
- Ilość mocy 0–5; jeśli admin ograniczy katalog tak, że zabraknie unikalnych mocy, puste losowania są pomijane. Można dodać ostrzejszy konfigurator pokrycia wszystkich gałęzi.
- Edytor blokuje usunięcie wskazywanej opcji/koła, dopóki istnieje odwołanie w regułach; wyłączenie jest alternatywą.
- Warianty na kołach są mieszanką odczytów screenów i własnych propozycji, nie wierną kopią kompletnego katalogu oryginału.
- Długie polskie nazwy na małych segmentach: pod kołem dostępna jest pełna lista opcji i rzeczywistych szans.
- Brak opisów fabularnych każdej mocy i reguł bitewnych; to kolejny etap, nie błąd gotowego losowania.
- Instalacji do systemu operacyjnego i szczegółowej interakcji dotykowej na telefonie nie przetestowano.

## Walidacja

README opisuje sprawdzone ścieżki. Testy silnika i aplikacji przeszły po zmianach do 0.2.3. W przeglądarce potwierdzono update 0.2.0 → 0.2.1 z zachowaniem danych, gałąź robota i pracę offline po zatrzymaniu serwera. Użytkownik otrzymuje czyste domyślne katalogi; dane QA nie są zapisane w archiwum.

## Kolejna sesja

1. Przeczytać feedback użytkownika i aktualne źródła z najnowszego ZIP-u.
2. Wprowadzać zmiany w `app/`, nie ręcznie w zbudowanym HTML.
3. Testować odpowiednie ścieżki, podnieść numer wydania w 3 plikach i uruchomić `build.py`.
4. Zachować tożsamość pliku archiwum przy jego zastępowaniu. Przed wdrożeniem na GitHub uzgodnić repozytorium i architekturę centralnych danych.

## Poprawka 0.2.3

Odwrócono animację koła: pod wskaźnikiem opcje przechodzą w kolejności listy, na skalach od słabszych do mocniejszych. Procenty i wybór wyniku bez zmian. Test geometrii sprawdza kierunek oraz zatrzymanie w każdym polu, w tym przy różnych początkowych kątach. Użytkownik testuje pojedynczy HTML, nie instaluje Pythona. Chce po poprawkach pierwszą publiczną betę na GitHubie (nazwa wydania Beta 0.1; techniczna wersja może pozostać 0.2.3). Repozytorium jeszcze nie wskazane. Krótki film z pełnym tworzeniem postaci pomoże odtworzyć dalsze reguły, screeny do drobnych napisów.


## Kontynuacja czatu „Kontynuacja aplikacji losującej” — 0.2.4

Użytkownik przeszedł z drugiego czatu. Pracować etapami; przy niepewności zapytać, nie rozbudowywać mechanik na domysł. Muzyka TYLKO w menu głównym, a podczas losowania same efekty. Bez wstawek wideo i końcówki. Dodano informacje o autorze projektu (nick Hariken PL), ChatGPT/OpenAI, inspiracji i źródłach audio. Nazwa autora projektu jest przyjęta z nicku — można ją później zmienić.

Materiał: `wheel of faith - wyniki wyszukiwania Facebook.mp4`, Library `libfile_f128ec7197ec8191bcbfedeb1133dcaa`; 138.90 s. Wycięto menu dokładnie 0–6 s (MP3 96 kbps stereo, krótkie 15 ms wygaszenia na krawędziach) oraz próbkę kliku 8.195–8.255 s (WAV 24 kHz mono, normalizacja szczytu 0.45, fade 2 ms). Model nie miał odsłuchu audio, więc brzmienie i pętla wymagają oceny użytkownika, nie deklarować perfekcyjnej kopii. Analiza obrazu i przebiegu audio potwierdziła miejsce kliku przy losowaniu.

Źródła wyciętego audio w `audio-source/`; `build_audio.py` generuje `app/audio-assets.js` z data URI; `build.py` buduje pojedynczy HTML wraz z tymi zasobami. `app/audio.js` steruje muzyką menu, obsługuje odmowę autoplay, zmianę ekranu, ukrycie karty i późno kończące się play(). `wheel_lab_audio_v1` to osobny klucz preferencji muzyki; backup JSON stanu gry go nie zawiera. Efekty korzystają ze starego `state.sound`; klik ma źródło WebAudio i wyzwalany jest przy zmianie indeksu sektora. Nowy test `tests/audio.test.cjs` i rozszerzony `app.test.cjs` przeszły; browser QA pojedynczego HTML potwierdziła media paused/time/duration, tworzenie, obrót, powrót, wyciszenie i PL/EN.

Rolki NIE odwzorowano 1:1 w katalogach: widać Android Conception, Energy Source, inne opisowe skale z postaciami popkultury, Cosmic Power, Extra Power, Winner Gets. Te mechaniki są materiałem na przyszły etap, nie dodano ich teraz. Bez walk.

Następny krok: ocena HTML przez użytkownika (kierunek + głośność i charakter kliku + pętla). Potem ewentualne dostrojenie i pierwsza beta GitHub. Repozytorium ani publikacja nie zostały wykonane; autorzy/licencje audio nieustalone, opisane jako robocze materiały użytkownika. Nie traktować samych podpisów jako pozwolenia na publiczną dystrybucję nagrań. Wersja techniczna 0.2.4; nazwa pierwszej publicznej bety może być osobna, żeby nie cofać wersji PWA.


## Stan aktualny 0.2.5 / Beta 0.1

Użytkownik skorygował kierunek: obrót ma być jak pierwotnie W PRAWO, zmieniona ma być KOLEJNOŚĆ PÓL. Zrealizowano przez iterację pool od końca w draw() i sectorIndex(), targetAngle sumuje pola po wybranym indeksie, spinEnd jest dodatni. Nie odwracać katalogów ani zapisanych pul; zachowano importy i snapshoty. Testy app.test.cjs sprawdzają wszystkie sektory oraz wzrost indeksu pod wskaźnikiem.

Dodano WLWheelAudio w audio.js: unlock() podczas gestu, próbka z fallbackiem, limit 400 ms, komunikat blokady, trzytonowy reveal(), stop(). Nowy stan sound=true, stare false zachowujemy. Pod kołem „Test dźwięku” ustawia sound=true, odblokowuje audio i odtwarza klik + wynik. Zwykły spin odtwarza wynik dokładnie raz po animacji. tests/effects.test.cjs testuje to na mocku WebAudio. Odsłuch rzeczywistego brzmienia nadal do oceny użytkownika.

Gotowe docs/ do GitHub Pages (main /docs), GITHUB_PAGES.md krok po kroku i prepare_release.py --version X.Y.Z. Nie tworzono repo ani nie publikowano — user poprosił o wersję, którą sam może wgrać. Wersja techniczna 0.2.5, etykieta Beta 0.1 w informacjach. Katalog app jest źródłem, docs generowane; unikaj edytowania obu oddzielnie. Nowy skrypt odbudowuje osadzone audio, standalone i docs; zachowuje katalogi admina (nie wywołuje make_data.py).

Odpowiedzi użytkownikowi: losowania z nową próbą RNG, bez pity i korekty szczęścia; jawne zależności mogą filtrować pule i proporcjonalnie przeliczać szanse. ADMIN NADAL LOKALNY. Publikowane data.js zmienia ustawienia początkowe nowych odwiedzających; istniejący zapis zachowuje konfigurację aż do świadomego wczytania dołączonych sezonów. Realny globalny panel, wspólne postacie i sprawiedliwe walki wymagają backendu. Walki są kolejnym etapem, jeszcze nie implementować bez reguł. Do obecnej bety więcej rolek nie potrzeba; do walk pomocny będzie przykład lub zasady rozstrzygania i doboru przeciwników (wcześniej villain wszyscy, antihero tylko hero).
