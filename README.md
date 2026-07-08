# Spesa — catalogo prezzi & gradimento

PWA personale per catalogare i prezzi dei prodotti nei vari supermercati, confrontarli a **prezzo unitario** (€/kg, €/L, €/pz) e annotare il gradimento. Funziona offline, i dati restano sul dispositivo (IndexedDB), zero dipendenze esterne.

## Come funziona il modello

- **Scheda prodotto** (una tantum): nome, supermercato, formato della confezione, gruppo di confronto, stelle di gradimento.
- **Registrazione prezzo** (a ogni spesa): cerchi la scheda, inserisci solo il prezzo dello scontrino. Il €/kg lo calcola l'app dal formato.
- **Prodotti a peso** (banco, sfuso): la scheda ha formato "a peso"; a ogni acquisto inserisci prezzo + peso dallo scontrino.
- **Gruppo di confronto**: schede con lo stesso gruppo (es. "Prosciutto crudo") vengono confrontate tra supermercati nella sezione Confronta. Il miglior €/unità ha il cartellino giallo.
- **Cambio formato** (shrinkflation): modifichi il formato dalla scheda; gli acquisti passati conservano il €/unità dell'epoca.

## Deploy su GitHub Pages

1. Crea un repository pubblico (es. `spesa`).
2. Carica questi 5 file nella root: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`.
3. Settings → Pages → Source: **Deploy from a branch**, branch `main`, cartella `/ (root)`.
4. Dopo 1–2 minuti l'app è su `https://TUOUTENTE.github.io/spesa/`.

## Installazione come app

- **Android (Chrome)**: apri l'URL → menu ⋮ → "Aggiungi a schermata Home" / "Installa app".
- **iOS (Safari)**: apri l'URL → Condividi → "Aggiungi a Home".
- **Tablet/PC**: icona di installazione nella barra degli indirizzi.

## Dati e backup

I dati vivono **solo sul dispositivo** dove li inserisci. Per usarli su più dispositivi: sezione **Altro → Esporta backup** sul dispositivo principale, poi **Importa backup** sugli altri (unione o sostituzione). Consiglio: esporta un backup periodico anche solo come sicurezza — svuotare i dati del browser cancella il catalogo.

## Aggiornamenti futuri previsti

- **Fase 2 — OCR scontrino**: foto → parsing via API Claude dietro un Cloudflare Worker (la key non sta mai nella pagina pubblica).
- **Fase 3 — Sync cloud** (Supabase): solo se il backup manuale si rivela insufficiente nell'uso reale.

Nota tecnica: quando aggiorni `index.html`, incrementa `CACHE` in `sw.js` (es. `spesa-v2`) per forzare il refresh sui dispositivi installati.
