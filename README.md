be26-js2-slutprojekt-grupp404
Scrumboard
Scrumboardappen är en inlämningsuppgift för kursen i Javascript 2 på Grit Academy. Appen skapades med hjälp av Firebase Realtime Database. Biblioteket Lucide har använts för ikonerna.

Användaren kan skapa nya projekt, lägga till och ändra deadlinesa tilldela medlemmar till projektet. Detsamma gäller för projektets uppgifter och det går att ändra status när en medlem tilldelas och uppgiften kan klarmarkeras. I home page kan användaren se en överblick över antalet, projekt, medlemmar, pågående uppgifter, kommande deadlines samt närmaste deadline.

Uppgifterna i projektet kan sorteras i bokstavsordning och med deadline. De kan även filtreras per medlem och kategori.

Kodstruktur
src/controllers: Logik som hanterar samt styr olika händelser och funktioner i Scrumboard applikationen som bland annat filtrering av uppgifter.

src/model: Innehåller klasserna för project, task och member och fungerar som en mall över de egenskaper som dessa ska ha.

src/firebaseRequests: Hanterar firebase request såsom patch, post och delete av projekt, uppgifter och medlemmar samt hämtning av dessa data.

src/Pages: En uppdelning av HTML koden uppdelat på home page, medlemsida och projektsidan.

src/styles: Innehåller hela stylningen av Scrumboarden uppdelat i filer för, home, medlem, projekt, modal, task med mera.

src/ui: Står för hela renderingen i projektet uppdelat i filer som står för varsin del av gränssnittet.

src/main.ts: Filen är applikationens startpunkt. main.ts står för samordningen av Scrumboardens olika delar.

index.html: Står för applikationens grundstruktur och kopplar in main.ts.

Resurser
Frirebase Realtime Darabase :https://firebase.google.com/docs/database

Lucide: https://lucide.dev/icons/

Uppstart och redigering
I terminalen, när du ska redigerar filerna, skriv npm i firebase för att säkerställa att Firebase är korrekt installerat. Skriv sedan npm run dev i terminalen för att starta sidan lokalt och kunna testa koden i konsolen.

Du kan också öppna projektet genom den deployade sidan på Netlify: https://scrum-manager.netlify.app/
