# Wheel Lab — Beta 0.1 (wersja techniczna 0.2.5)

Paczka jest gotowa do wgrania. Python, Node i plik BAT nie są potrzebne do publikacji ani grania. `docs/` zawiera gotową stronę i PWA.

## Pierwsza publikacja przez stronę GitHub

1. Rozpakuj ZIP na komputerze.
2. Utwórz repozytorium na swoim GitHubie, np. `wheel-lab`.
3. Wybierz **Add file → Upload files** i wgraj zawartość rozpakowanego katalogu projektu. W repozytorium ma być `docs/index.html`, a nie dodatkowy katalog `Wheel_Lab.../docs/index.html`. Nie wrzucaj samego ZIP-a. Możesz wgrać tylko folder `docs`, jeśli teraz chcesz wyłącznie opublikować stronę.
4. Zatwierdź pliki przyciskiem **Commit changes**.
5. Otwórz **Settings → Pages**.
6. W **Build and deployment → Source** wybierz **Deploy from a branch**.
7. Wybierz swoją gałąź (zwykle `main`), folder **/docs** i **Save**.
8. Po zakończeniu publikacji GitHub pokaże link do strony w tym samym miejscu. Otwórz go i sprawdź wersję **0.2.5** w stopce.

PWA instaluje się z przeglądarki, przez opcję instalacji / dodania do ekranu głównego. Instalacja jest opcjonalna; można grać pod samym linkiem. Obsługa przycisku instalacji zależy od przeglądarki.

## Ustawienia administratora — ważne rozróżnienie

**Zapisz zmiany w panelu nie publikuje niczego na GitHubie.** Login `admin/admin`, konfiguracja, limity i postacie są lokalne dla przeglądarki. To beta do wspólnych testów, jeszcze bez wspólnej bazy i prawdziwych kont.

Zmiana pliku `data.js` w opublikowanej aplikacji ustala konfigurację początkową dla nowych odwiedzających. Osoby z istniejącym zapisem zachowują swoje sezony. Aby przyjąć nowe ustawienia, po aktualizacji wybierają w panelu **Kopie i dane → Wczytaj sezony dołączone do tej wersji** (najpierw warto zachować kopię danych). Postacie zachowują zasady z chwili utworzenia.

Globalne zmiany administratora w czasie rzeczywistym, współdzielone postacie i walki między graczami będą wymagały usługi serwerowej i bazy. Samo podanie hasła w pliku JavaScript nie tworzy zabezpieczonego panelu.

## Kolejne wydania

Najprościej: gdy otrzymasz kolejną paczkę, zastąp folder `docs` w repozytorium jego nową wersją i zatwierdź pliki. Publikacja uruchomi się ponownie. Nie usuwaj repozytorium ani nie zmieniaj adresu, jeśli chcesz zachować dotychczasowy zapis przeglądarki.

W aplikacji otwórz **Aplikacja → Sprawdź aktualizacje**, a po pobraniu nowej wersji wybierz **Aktualizuj i uruchom ponownie**. Aktualizacja nie usuwa postaci. Samodzielny HTML pobierany na dysk aktualizuje się przez pobranie nowego pliku; mechanizm PWA działa pod adresem strony.

Dla osoby edytującej kod: źródłem jest `app/`. Po edycji uruchom `python prepare_release.py --version 0.2.6` (kolejny nieużywany numer). Skrypt synchronizuje wersje, osadza audio, buduje pojedynczy HTML i kopiuje gotową aplikację do `docs/`. Nie uruchamia serwera ani nie wysyła niczego do GitHuba. Po zmianie opcji admina najpierw pobierz **data.js do publikacji** i zastąp nim `app/data.js`, a następnie przygotuj nowe wydanie. `make_data.py` służy do odtworzenia początkowych katalogów, nie do publikowania edycji admina.

## Losowanie i dźwięk

Każdy obrót pobiera nową liczbę losową i korzysta z aktualnej puli opcji. Wynik innego koła nie wpływa na szczęście. Reguły mogą zmienić pulę (rasa, brak powtórzeń mocy, słabości wymagające mocy). Szansa opcji w przefiltrowanej puli wynosi jej waga podzielona przez sumę pozostałych wag. Wielkość pola odpowiada tej szansie.

Koło obraca się w prawo, pola są rysowane w odwrotnej kolejności listy. Przez wskaźnik przechodzą więc w kolejności słabsze → mocniejsze; po pełnym obrocie skala zaczyna się od nowa. Animacja nie wpływa na wylosowany wynik.

Pod kołem są **Efekty koła** i **Test dźwięku**. Test włącza efekty i odtwarza klik oraz sygnał wyniku. Nowy profil ma efekty włączone, poprzedni zapis zachowuje wcześniejsze ustawienie. Muzyka menu jest osobna i nie gra podczas tworzenia postaci. Jeżeli przeglądarka odmawia uruchomienia audio, aplikacja pokazuje komunikat, a losowanie działa dalej.

## Materiały i dalszy rozwój

Menu i próbka kliknięcia pochodzą z rolki dostarczonej przez użytkownika. Ich autorzy i licencje pozostają do uzupełnienia w informacjach o aplikacji. Sygnał wyniku jest generowany przez aplikację. Paczka nie zawiera samego filmu.

Walki to kolejny etap. Nie dodano automatycznych pojedynków ani statystyk HP/atak. Punkt kontynuacji i wyniki testów: `CONTINUE.md`.

Dokumentacja publikacji: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
