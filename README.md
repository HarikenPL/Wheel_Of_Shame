# Wheel Lab — Beta 0.1 / 0.2.5

**Publikacja na GitHubie: [GITHUB_PAGES.md](GITHUB_PAGES.md). Gotowy katalog do hostowania: `docs/`.**

## Najprostszy start

1. Rozpakuj cały ZIP.
2. Otwórz `Wheel_Lab_LOCAL.html` dwuklikiem w Chrome lub Edge.
3. Wpisz nazwę gracza i imię postaci. Klikaj „Zakręć kołem”, a po wyniku „Dalej”.
4. Panel administratora otwierasz przyciskiem na dole strony. Login: **admin**, hasło: **admin**.

Wersja jednoplikowa nie wymaga instalowania żadnych narzędzi. Zapis jest lokalny w przeglądarce. Zachowaj stałą lokalizację pliku. Regularnie eksportuj kopię w panelu administratora. Wersja 0.1 pozostaje osobnym prototypem; jej liczbowych statystyk i plików JSON nie importujemy do nowego generatora.

## Wersja instalowalna PWA

Na Windows uruchom `START_LOCAL.bat` — wymaga już zainstalowanego Pythona 3. Skrypt uruchamia mały serwer wyłącznie na 127.0.0.1 i otwiera http://localhost:8765/. Zamknięcie okna serwera go zatrzymuje. Na innym systemie: `python3 serve.py`.

W zakładce „Aplikacja” znajdziesz numer wersji, aktualny sezon, instalację i sprawdzanie aktualizacji. Instalacja zależy od przeglądarki; możesz też użyć jej menu „Zainstaluj aplikację” lub „Dodaj do ekranu głównego”. Po pierwszym pełnym otwarciu aplikacja zapisuje potrzebne pliki do pracy offline. PWA nie działa z adresu file://.

**Uwaga:** jednoplikowy HTML i wersja localhost mają osobne zapisy. Przeniesiesz dane przez eksport i przywrócenie pełnej kopii. Zmiana localhost na 127.0.0.1 lub numeru portu również tworzy oddzielne miejsce zapisu.

## Co działa

- PL/EN: interfejs oraz nazwy wszystkich opcji.
- 21 katalogów kół, w tym pule pomocnicze i koła warunkowe. To nie oznacza 21 obowiązkowych obrotów; kolejność zależy od wyników.
- Race, charakter, wzrost, siła, szybkość, wytrzymałość, IQ, umiejętności walki, broń, liczba mocy, moce, ich opanowanie, cecha specjalna, słabość.
- Hybrydy dwóch różnych ras. Podtypy smoków, demonów, aniołów, rdzenie robotów/androidów i żywioły. Artefakty. Moce rasowe.
- Unikalne moce i pomijanie słabości dotyczących mocy u postaci bez mocy.
- Ręczne losowanie, podświetlenie wyniku, dźwięk z wyłącznikiem, lista rzeczywistych szans.
- Zapis wyniku przed animacją: odświeżenie nie daje nowego losowania. Wznowienie postaci.
- Karty postaci, historia losowań i eksport JSON.
- Admin: dodawanie i usuwanie opcji oraz kół, zmiana obu nazw, kolorów, warunków i procentów, włączanie/wyłączanie, zmiana kolejności.
- Edytor wymaga nazw PL i EN. Aktywne opcje muszą sumować się do 100%. „Wyrównaj do 100%” proporcjonalnie przelicza aktualne wartości.
- Sezony: kopie, nazwy, aktywacja i niezależne katalogi. Postać ma kopię konfiguracji sezonu z chwili utworzenia.
- Limity tworzenia na gracza i sezon, indywidualne limity, blokada, odstęp czasowy. Zmiana nicku nie odnawia prób. Usunięcie postaci nie zwraca próby. Admin może przywrócić usuniętą postać.
- Tryb testowy admina nie zużywa limitów ani nie zapisuje testowej postaci do kolekcji; jej kartę można wyeksportować.
- Pełne kopie, import postaci z pomijaniem tych samych ID, eksport/import konfiguracji oraz eksport pliku data.js do późniejszej publikacji.
- Kontrola konfliktu edycji z inną kartą przeglądarki. Po komunikacie o zmianie danych w drugiej karcie odśwież stronę.

## Edycja kół

Administrator → Koła → wybierz sezon i koło. Każdy wiersz ma nazwę PL, nazwę EN, szansę %, przełącznik i usuwanie. Szansa 0 oznacza, że opcja nie wypadnie. Po dodaniu lub usunięciu opcji popraw procenty albo użyj „Wyrównaj do 100%”. Dopiero „Zapisz zmiany” zapisuje konfigurację.

Gdy część opcji jest wykluczona (np. druga rasa hybrydy), szanse pozostałych są przeliczane proporcjonalnie. Aktualna lista pod kołem pokazuje te rzeczywiste procenty. Kategorie związane z mocami są pomijane, jeśli nie ma mocy do losowania. Po wyczerpaniu dostępnych unikalnych mocy dalsze puste losowania są pomijane — utrzymuj wystarczającą liczbę opcji, jeśli pozwalasz na wiele mocy.

„Warunek wyświetlenia” pozwala uzależnić koło od wcześniej wylosowanej opcji. Kilka opcji wybiera się z Ctrl. W „Regułach opcji” można przypisać moc rasową, ustawić liczbę mocy dla koła liczby mocy oraz oznaczyć słabości wymagające posiadania mocy. Identyfikatory pozostają stałe mimo zmiany etykiet. Nie można usunąć opcji/koła, do którego nadal odwołuje się reguła — najpierw usuń takie powiązanie. Bezpieczną alternatywą jest wyłączenie opcji/koła.

## GitHub Pages i aktualizacje

Pełna instrukcja: [GITHUB_PAGES.md](GITHUB_PAGES.md). Wgraj folder `docs` do repozytorium, wybierz **Settings → Pages → Deploy from a branch → main → /docs**. Pliki są gotowe, niczego nie trzeba budować ani instalować do publikacji.

Źródła: `app/`. Dla edycji kodu: `python prepare_release.py --version NOWY.NUMER.WERSJI` (np. 0.2.6) aktualizuje numer i przygotowuje `docs/` oraz `Wheel_Lab_LOCAL.html`. Każda publikowana zmiana musi mieć nowy numer techniczny, aby odświeżyć cache PWA. Nazwa Beta 0.1 jest oddzielna od wersji technicznej.

Panel admina działa lokalnie. Edycje nie trafiają automatycznie do pozostałych graczy. Instrukcja opisuje eksport `data.js`, publikację konfiguracji początkowej i ręczne przyjęcie jej przez istniejących graczy. Wspólna baza i prawdziwy panel globalny to następny etap.

## Testy i kontynuacja

Bez instalowania zależności, przy dostępnym Node:

```
node tests/engine.test.cjs
node tests/app.test.cjs
```

Sprawdzono reguły 300 pełnych postaci, walidację tłumaczeń/procentów/importu, zachowanie kopii sezonów, ograniczenia po zmianie nicku i konflikt między kartami. W przeglądarce sprawdzono tworzenie i wznowienie postaci, zależne koło rdzenia robota, PL/EN, admin/admin, dodanie opcji, błąd sumy 105%, wymaganie obu nazw, kopię i zmianę sezonu, aktualizację 0.2.0 → 0.2.1 oraz dalsze losowanie po zatrzymaniu serwera. Wydanie 0.2.2 dodatkowo wzmacnia walidację importu; testy automatyczne przeszły. Instalacji jako osobnego okna systemowego nie testowano.

Dalsze kroki i mapa kodu: `CONTINUE.md`.

Dokumentacja techniczna użyta przy implementacji:
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
- https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages


## Zmiany 0.2.3–0.2.4

- Kierunek animacji odwrócony: koło obraca się przeciwnie do wskazówek zegara, a pod wskaźnikiem przechodzą opcje w kolejności listy (skale od słabszych do mocniejszych). Szanse wyników są takie same. Po końcu skali następuje oczywiście początek następnego obrotu.
- Menu główne: przycisk „Włącz muzykę menu” i suwak głośności. Pierwsze uruchomienie jest ciche. Muzyka to wskazane 0:00–0:06 dostarczonej rolki, zapętlone. Podczas całego tworzenia postaci, w innych zakładkach i po ukryciu karty muzyka się zatrzymuje. Powrót do menu uruchamia ją ponownie, jeśli jej nie wyciszono. Przeglądarka może ponownie wymagać kliknięcia przycisku.
- Efekty koła: osobny przełącznik pod kołem. Próbka kliknięcia pochodzi z ok. 0:08.20 rolki. Dźwięk wyzwala przejście pola pod wskaźnikiem; przy szybkich obrotach liczba klików jest ograniczona do liczby klatek animacji. Brak wstawek i dźwięku końcówki. Brzmienie i zapętlenie wymagają jeszcze subiektywnej oceny użytkownika.
- „Aplikacja”: Hariken PL, wsparcie ChatGPT/OpenAI, inspiracja The Wheel of Faith, źródło audio i historia zmian. Nie przypisano nieznanych autorów ani licencji muzyki.
- Wszystkie dźwięki są osadzone w samodzielnym HTML — bez instalowania Pythona, BAT i dodatkowych plików do grania. Pełny projekt w ZIP służy dalszemu rozwojowi oraz przyszłemu wdrożeniu.
- Preferencje muzyki zapisują się oddzielnie od postaci. Pełna kopia JSON postaci/sezonów ich nie przenosi.

Jeśli chcesz zachować swoje postacie i ustawienia z poprzedniego HTML, wyeksportuj pełną kopię w panelu admina, a następnie przywróć ją w nowym pliku. Zapis pod adresem file:// może zależeć od ścieżki pliku i przeglądarki.

Nowe testy: `node tests/audio.test.cjs`; test `app.test.cjs` obejmuje też geometrię kierunku i zatrzymania dla wszystkich pól katalogów. Sprawdzono w przeglądarce odtwarzanie 6-sekundowego pliku, zatrzymanie przy tworzeniu postaci, wznowienie w menu, wyciszenie oraz informacje PL/EN. Dźwięk kliknięcia wymaga oceny odsłuchowej użytkownika. Aktualizacji PWA i instalacji systemowej ponownie nie testowano przy tym wydaniu.


## Zmiany 0.2.5 (aktualne)

Zastępują decyzję o kierunku z 0.2.3: obrót wrócił do kierunku zgodnego ze wskazówkami zegara, a sektory są rysowane od ostatniej do pierwszej pozycji listy. Dane katalogu, procenty, stare postacie i reguły losowania nie zmieniły się.

Efekty: klik z rolki z awaryjnym generowanym klikiem przy błędzie dekodowania; nowy trzytonowy sygnał zatrzymania. Przed animacją aplikacja uruchamia audio w odpowiedzi na kliknięcie, z ograniczeniem oczekiwania do 400 ms. Brak dźwięku nie blokuje losowania. Nowy profil ma efekty włączone, stary zachowuje preferencję. „Test dźwięku” włącza efekty i odtwarza oba odgłosy. Wyciszenie zatrzymuje aktywne efekty. Menu pozostaje osobne.

Testy: geometria każdego pola przy różnych kątach startowych; uruchomienie dźwięku, dekodowanie i awaryjny klik, trzytonowy wynik i zatrzymanie przy wyciszeniu; zachowanie zapisów, importów, limitów i panelu; test muzyki menu. Podgląd przeglądarkowy wersji z katalogu podrzędnego potwierdził odczyt starej postaci, test audio bez błędów aplikacji, nowe losowanie i zgodność wskaźnika z wynikiem. Subiektywnego odsłuchu nie zweryfikowano. Strony nie opublikowano na koncie GitHub użytkownika — paczka jest przygotowana do samodzielnego wgrania.
