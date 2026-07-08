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

## Codice a barre (v2)

- **Scansiona** dalla tab Spesa: EAN già in catalogo → dritto al prezzo; EAN in più supermercati → mini-confronto e scegli dove sei; EAN nuovo → scheda precompilata da OpenFoodFacts (nome, marca, formato quando disponibili).
- Richiede Chrome/Chromium su Android (API BarcodeDetector nativa). Fallback: inserimento manuale del codice.
- La scansione funziona offline; il lookup OpenFoodFacts richiede rete (se manca, la scheda si compila a mano ma il codice resta associato).
- Da una scheda esistente: "Associa codice a barre" per collegare l'EAN a prodotti creati prima.
- Prodotti a peso del banco: codici interni del negozio, restano a inserimento manuale.

## Aggiornamenti futuri previsti

- **Fase 2 — OCR scontrino**: foto → parsing via API Claude dietro un Cloudflare Worker (la key non sta mai nella pagina pubblica).
- **Fase 3 — Sync cloud** (Supabase): solo se il backup manuale si rivela insufficiente nell'uso reale.

Nota tecnica: quando aggiorni `index.html`, incrementa `CACHE` in `sw.js` (es. `spesa-v2`) per forzare il refresh sui dispositivi installati.

## v3 — sessione, offerte, lista, statistiche

- **Sessione scontrino**: dalla tab Spesa, imposta supermercato+data una volta, scansiona (o cerca, per il banco) tutti i prodotti, poi inserisci i prezzi in sequenza con avanzamento e "salta". La bozza sopravvive a chiusure dell'app (salvata a ogni scansione). Codice noto ma di un altro supermercato → clona la scheda precompilata.
- **Flag offerta**: spunta "In offerta" sul prezzo; le promo restano nello storico ma il Confronto e la Lista usano l'ultimo prezzo *pieno* (l'offerta recente è mostrata a parte).
- **Lista della spesa**: aggiungi i gruppi che ti servono; l'app li smista per supermercato consigliato = il più economico tra i prodotti con gradimento entro 1 stella dal migliore del gruppo. Prezzo e stelle sempre visibili, alternativa più economica indicata.
- **Statistiche** (tab Altro): spesa per mese e per supermercato (di ciò che registri), e "paniere personale" — variazione mediana dei tuoi prezzi pieni su 60+ giorni, con i rincari maggiori. Si popola da solo col tempo.
- Scorciatoia: pressione lunga sull'icona → "Scansiona".
- Migrazione automatica del database (v1→v2): i dati esistenti restano.
