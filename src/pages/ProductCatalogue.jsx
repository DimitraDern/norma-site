import { useState } from "react";
import { Link } from "react-router-dom";
import { asset } from "../utils/asset.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

/*
  ΕΙΚΟΝΕΣ: Οι κατηγορίες 01, 02, 03, 04, 09, 12, 13, 14 έχουν παραπάνω από ένα
  path στο "images" array (carousel με βελάκια).

  ΓΛΩΣΣΑ: υπάρχουν ΔΥΟ πλήρη datasets (categoriesEl / categoriesEn) με το
  ΙΔΙΟ code/groupKey ανά κατηγορία -- έτσι το φιλτράρισμα ανά ομάδα δεν
  "σπάει" όταν αλλάζει η γλώσσα. Οι εικόνες είναι ίδιες και στα δύο.
*/

const categoriesEl = [
  { code: "01", groupKey: "mesh", title: "Πονταριστά Συρματοπλέγματα", tagline: "Πονταριστά συρματοπλέγματα υψηλής αντοχής για αγροτικές και βιομηχανικές περιφράξεις, παραγωγή NORMA S.A.", desc: "Ηλεκτροσυγκολλητά (πονταριστά) συρματοπλέγματα σε ρολό — πλήρης γκάμα καρέ, υψών και διαμέτρων σύρματος.",
    images: [asset("/images/product-04.png"), asset("/images/pontarista-1.png"), asset("/images/pontarista-2.jpg"), asset("/images/pontarista-3.png")],
    variants: [
      { name: "Πονταριστό 60×100 mm (Φ 3.00/2.40)", subtitle: "Γαλβανιζέ, ρολό 20 m", specs: [["Καρέ", "60×100 mm"], ["Σύρμα", "Φ 3.00 / 2.40 mm"], ["Μήκος ρολού", "20 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό 60×100 mm (Φ 2.70/2.40)", subtitle: "Γαλβανιζέ, ρολό 20 m", specs: [["Καρέ", "60×100 mm"], ["Σύρμα", "Φ 2.70 / 2.40 mm"], ["Μήκος ρολού", "20 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό 60×100 mm (Φ 2.70/2.20)", subtitle: "Γαλβανιζέ, ρολό 20 m", specs: [["Καρέ", "60×100 mm"], ["Σύρμα", "Φ 2.70 / 2.20 mm"], ["Μήκος ρολού", "20 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό 60×100 mm (Φ 2.40/2.20)", subtitle: "Γαλβανιζέ, ρολό 20 m", specs: [["Καρέ", "60×100 mm"], ["Σύρμα", "Φ 2.40 / 2.20 mm"], ["Μήκος ρολού", "20 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό 60×100 mm (Φ 2.20/2.20)", subtitle: "Γαλβανιζέ, ρολό 20 m", specs: [["Καρέ", "60×100 mm"], ["Σύρμα", "Φ 2.20 / 2.20 mm"], ["Μήκος ρολού", "20 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό 60×100 mm (Φ 2.20/2.00)", subtitle: "Γαλβανιζέ, ρολό 20 m", specs: [["Καρέ", "60×100 mm"], ["Σύρμα", "Φ 2.20 / 2.00 mm"], ["Μήκος ρολού", "20 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό 50×50 mm (Φ 2.00)", subtitle: "Γαλβανιζέ, ρολό 25 m", specs: [["Καρέ", "50×50 mm"], ["Σύρμα", "Φ 2.00 / 2.00 mm"], ["Μήκος ρολού", "25 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό 50×50 mm (Φ 1.80)", subtitle: "Γαλβανιζέ, ρολό 25 m", specs: [["Καρέ", "50×50 mm"], ["Σύρμα", "Φ 1.80 / 1.80 mm"], ["Μήκος ρολού", "25 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό 50×75 mm (Φ 2.00)", subtitle: "Γαλβανιζέ, ρολό 25 m", specs: [["Καρέ", "50×75 mm"], ["Σύρμα", "Φ 2.00 / 2.00 mm"], ["Μήκος ρολού", "25 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό 50×75 mm (Φ 1.80)", subtitle: "Γαλβανιζέ, ρολό 25 m", specs: [["Καρέ", "50×75 mm"], ["Σύρμα", "Φ 1.80 / 1.80 mm"], ["Μήκος ρολού", "25 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό 60×100 mm (Φ 1.80)", subtitle: "Γαλβανιζέ, ρολό 25 m", specs: [["Καρέ", "60×100 mm"], ["Σύρμα", "Φ 1.80 / 1.80 mm"], ["Μήκος ρολού", "25 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Πονταριστό PVC 50×100 mm (Φ 2.50)", subtitle: "Πλαστικοποιημένο RAL 6005 (πράσινο), ρολό 25 m", specs: [["Καρέ", "50×100 mm"], ["Σύρμα", "Φ 2.50 mm PVC"], ["Χρώμα", "RAL 6005"], ["Μήκος ρολού", "25 m"], ["Ύψη", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
    ] },
  { code: "02", groupKey: "mesh", title: "Δικτυωτά (Πλεκτά) Συρματοπλέγματα", tagline: "Δικτυωτό πλεκτό συρματόπλεγμα (chain link) για περιφράξεις γηπέδων, οικοπέδων και βιομηχανικών χώρων.", desc: "Δικτυωτά (πλεκτά / chain-link) συρματοπλέγματα σε ρολό, γαλβανιζέ ή πλαστικοποιημένα. Σειρά «ΕΒΡΟΣ 1».",
    images: [asset("/images/product-01.jpg"), asset("/images/diktyota-1.jpg"), asset("/images/diktyota-2.png")],
    variants: [
      { name: "Νο 10 – Φ 1,5 mm", subtitle: "Καρέ 40×40 mm, ρολό 25 m", specs: [["Διάμετρος σύρματος", "1,5 mm"], ["Καρέ πλέγματος", "40×40 mm"], ["Μήκος ρολού", "25 m"], ["Ύψος ρολού", "1,00 – 1,20 – 1,50 – 1,80 – 2,00 m"]] },
      { name: "Νο 12 – Φ 1,8 mm", subtitle: "Καρέ 40×40 / 50×50 / 55×55 / 65×65 mm, ρολό 25 m", specs: [["Διάμετρος σύρματος", "1,8 mm"], ["Καρέ πλέγματος", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Μήκος ρολού", "25 m"], ["Ύψος ρολού", "1,00 – 1,20 – 1,50 – 1,80 – 2,00 m"]] },
      { name: "Νο 13 – Φ 2,0 mm", subtitle: "Καρέ 40×40 / 50×50 / 55×55 / 65×65 mm, ρολό 25 m", specs: [["Διάμετρος σύρματος", "2,0 mm"], ["Καρέ πλέγματος", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Μήκος ρολού", "25 m"], ["Ύψος ρολού", "1,00 – 1,20 – 1,50 – 1,80 – 2,00 m"]] },
      { name: "Νο 14 – Φ 2,2 mm", subtitle: "Καρέ 40×40 / 50×50 / 55×55 / 65×65 mm, ρολό 20 m", specs: [["Διάμετρος σύρματος", "2,2 mm"], ["Καρέ πλέγματος", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Μήκος ρολού", "20 m"], ["Ύψος ρολού", "1,00 – 1,20 – 1,50 – 1,80 – 2,00 m"]] },
      { name: "Νο 15 – Φ 2,4 mm", subtitle: "Καρέ 40×40 / 50×50 / 55×55 / 65×65 mm, ρολό 20 m", specs: [["Διάμετρος σύρματος", "2,4 mm"], ["Καρέ πλέγματος", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Μήκος ρολού", "20 m"], ["Ύψος ρολού", "1,00 – 1,20 – 1,50 – 1,80 – 2,00 m"]] },
      { name: "Νο 17 – Φ 3,0 mm", subtitle: "Καρέ 50×50 / 55×55 / 65×65 mm, ρολό 10 m", specs: [["Διάμετρος σύρματος", "3,0 mm"], ["Καρέ πλέγματος", "50×50 – 55×55 – 65×65 mm"], ["Μήκος ρολού", "10 m"], ["Ύψος ρολού", "1,00 – 1,20 – 1,50 – 1,80 – 2,00 m"]] },
      { name: "PVC Πλαστικοποιημένο – Φ 2,60 mm", subtitle: "Καρέ 55×55 mm, ρολό 20 m", specs: [["Διάμετρος σύρματος", "2,60 mm"], ["Καρέ πλέγματος", "55×55 mm"], ["Μήκος ρολού", "20 m"], ["Ύψος ρολού", "1,00 – 1,20 – 1,50 – 1,80 – 2,00 m"]] },
    ] },
  { code: "03", groupKey: "mesh", title: "Πλέγμα Γαλβανιζέ σε Φύλλο", tagline: "Γαλβανισμένο πλέγμα σε φύλλο για κατασκευαστικές και βιομηχανικές εφαρμογές.", desc: "Πονταριστά γαλβανιζέ πλέγματα σε φύλλα, 50 τεμ./δέμα.",
    images: [asset("/images/panel-galvanized-1.png"), asset("/images/panel-galvanized-2.png"), asset("/images/panel-galvanized-3.jpg")],
    variants: [
      { name: "Φύλλο Φ 3,00 mm", subtitle: "Γαλβανιζέ, 50 τεμ./δέμα", specs: [["Πάχος σύρματος", "3,00 mm"], ["Διαστάσεις", "2,00×5,00 m | 1,50×5,00 m"], ["Τεμάχια/δέμα", "50"]] },
      { name: "Φύλλο Φ 3,50 mm", subtitle: "Γαλβανιζέ, 50 τεμ./δέμα", specs: [["Πάχος σύρματος", "3,50 mm"], ["Διαστάσεις", "2,00×5,00 m | 1,50×5,00 m"], ["Τεμάχια/δέμα", "50"]] },
      { name: "Φύλλο Φ 4,00 mm", subtitle: "Γαλβανιζέ, 50 τεμ./δέμα", specs: [["Πάχος σύρματος", "4,00 mm"], ["Διαστάσεις", "2,00×5,00 m | 1,50×5,00 m"], ["Τεμάχια/δέμα", "50"]] },
    ] },
  { code: "04", groupKey: "mesh", title: "NORMA Panel – Ηλεκτροστατικά Βαμμένα & Γαλβανιζέ", tagline: "Πάνελ περίφραξης γαλβανιζέ ή ηλεκτροστατικά βαμμένα, ιδανικά για κήπους, αυλές και επαγγελματικούς χώρους.", desc: "Πλέγματα γαλβανιζέ και πλαστικοποιημένα (PVC) σε φύλλα panel 2,50 m. Χρώματα: RAL 6005 (πράσινο), 7043 (σκούρο γκρι), 7045 (ανοιχτό γκρι).",
    images: [asset("/images/product-02.jpg"), asset("/images/norma-panel-1.png"), asset("/images/norma-panel-2.png"), asset("/images/norma-panel-3.jpg"), asset("/images/norma-panel-5.jpg"), asset("/images/norma-panel-4.png")],
    variants: [
      { name: "NORMA Panel PVC 50×100", subtitle: "Γαλβανιζέ + πλαστικοποιημένο, Φ 4,20 mm", specs: [["Διάμετρος σύρματος", "4,20 mm"], ["Καρέ", "50×100 mm"], ["Διαστάσεις (Ύψος×Μήκος)", "1,00×2,50 | 1,20×2,50 | 1,50×2,50 | 1,76×2,50 | 1,96×2,50 m"], ["Χρώματα RAL", "6005 – 7043 – 7045"]] },
      { name: "Panel Γαλβανιζέ 50×100", subtitle: "Γαλβανιζέ χωρίς βαφή, Φ 4,00 mm", specs: [["Διάμετρος σύρματος", "4,00 mm"], ["Καρέ", "50×100 mm"], ["Διαστάσεις (Ύψος×Μήκος)", "1,00×2,50 | 1,20×2,50 | 1,50×2,50 | 1,76×2,50 | 1,96×2,50 m"]] },
      { name: "NORMA Panel PVC 55×200", subtitle: "Γαλβανιζέ + πλαστικοποιημένο, Φ 4,20 mm", specs: [["Διάμετρος σύρματος", "4,20 mm"], ["Καρέ", "(55×100) + (55×200) mm"], ["Διαστάσεις (Ύψος×Μήκος)", "1,00×2,50 | 1,20×2,50 | 1,50×2,50 | 1,76×2,50 | 1,96×2,50 m"], ["Χρώματα RAL", "6005 – 7043 – 7045"]] },
      { name: "Panel Γαλβανιζέ 55×200", subtitle: "Γαλβανιζέ χωρίς βαφή, Φ 4,00 mm", specs: [["Διάμετρος σύρματος", "4,00 mm"], ["Καρέ", "(55×100) + (55×200) mm"], ["Διαστάσεις (Ύψος×Μήκος)", "1,00×2,50 | 1,20×2,50 | 1,50×2,50 | 1,76×2,50 | 1,96×2,50 m"]] },
      { name: "NORMA Panel PVC 70×200", subtitle: "Γαλβανιζέ + πλαστικοποιημένο, Φ 4,20 mm", specs: [["Διάμετρος σύρματος", "4,20 mm"], ["Καρέ", "(70×100) + (70×200) mm"], ["Διαστάσεις (Ύψος×Μήκος)", "1,00×2,50 | 1,20×2,50 | 1,50×2,50 | 1,76×2,50 | 1,96×2,50 m"], ["Χρώματα RAL", "6005 – 7043 – 7045"]] },
      { name: "Panel Γαλβανιζέ 70×200", subtitle: "Γαλβανιζέ χωρίς βαφή, Φ 4,00 mm", specs: [["Διάμετρος σύρματος", "4,00 mm"], ["Καρέ", "(70×100) + (70×200) mm"], ["Διαστάσεις (Ύψος×Μήκος)", "1,00×2,50 | 1,20×2,50 | 1,50×2,50 | 1,76×2,50 | 1,96×2,50 m"]] },
    ] },
  { code: "05", groupKey: "mesh", title: "Εξάγωνο Συρματόπλεγμα", tagline: "Γαλβανισμένο εξάγωνο συρματόπλεγμα για κοτέτσια, κλουβιά και προστασία καλλιεργειών.", desc: "Κλασικό εξάγωνο πλέγμα για πτηνοτροφεία, κήπους και ελαφριές περιφράξεις.",
    images: [asset("/images/hexagonal-1.png")],
    variants: [
      { name: "Νο 2,5 – Φ 0,70 mm – Καρέ 1/2\"", subtitle: "Γαλβανιζέ, ρολό 25 m", specs: [["Διάμετρος σύρματος", "0,70 mm"], ["Καρέ", "1/2\" (13 mm)"], ["Μήκος ρολού", "25 m"], ["Ύψος ρολού", "0,80 – 1,00 – 1,20 – 1,50 m"]] },
      { name: "Νο 4 – Φ 0,90 mm – Καρέ 1\"", subtitle: "Γαλβανιζέ, ρολό 50 m", specs: [["Διάμετρος σύρματος", "0,90 mm"], ["Καρέ", "1\" (25 mm)"], ["Μήκος ρολού", "50 m"], ["Ύψος ρολού", "0,80 – 1,00 – 1,20 – 1,50 m"]] },
      { name: "Νο 4 – Φ 0,90 mm – Καρέ 2\"", subtitle: "Γαλβανιζέ, ρολό 50 m", specs: [["Διάμετρος σύρματος", "0,90 mm"], ["Καρέ", "2\" (50 mm)"], ["Μήκος ρολού", "50 m"], ["Ύψος ρολού", "0,80 – 1,00 – 1,20 – 1,50 m"]] },
      { name: "Νο 2,5 – Φ 0,60 mm – Καρέ 1/2\" (ελαφρύ)", subtitle: "Γαλβανιζέ, ρολό 20 m", specs: [["Διάμετρος σύρματος", "0,60 mm"], ["Καρέ", "1/2\" (13 mm)"], ["Μήκος ρολού", "20 m"], ["Ύψος ρολού", "0,80 – 1,00 – 1,20 – 1,50 m"]] },
      { name: "Νο 4 – Φ 0,60 mm – Καρέ 1\" (ελαφρύ)", subtitle: "Γαλβανιζέ, ρολό 20 m", specs: [["Διάμετρος σύρματος", "0,60 mm"], ["Καρέ", "1\" (25 mm)"], ["Μήκος ρολού", "20 m"], ["Ύψος ρολού", "0,80 – 1,00 – 1,20 – 1,50 m"]] },
    ] },
  { code: "06", groupKey: "security", title: "Σύρματα Ακανθωτά", tagline: "Ακανθωτό σύρμα γαλβανιζέ για περιμετρική ασφάλεια οικοπέδων και βιομηχανικών εγκαταστάσεων.", desc: "Ακανθωτό σύρμα γαλβανιζέ σε ρολό 50 m ή 100 m.",
    images: [asset("/images/product-03.png")],
    variants: [
      { name: "Νο 11/4 – Φ 1,60 mm", subtitle: "Ρολό 100 m", specs: [["Πάχος σύρματος", "1,60 mm"], ["Μήκος ρολού", "100 m"]] },
      { name: "Νο 12/4 – Φ 1,80 mm", subtitle: "Ρολό 50 m ή 100 m", specs: [["Πάχος σύρματος", "1,80 mm"], ["Μήκος ρολού", "50 m | 100 m"]] },
      { name: "Νο 13/4 – Φ 2,00 mm", subtitle: "Ρολό 50 m ή 100 m", specs: [["Πάχος σύρματος", "2,00 mm"], ["Μήκος ρολού", "50 m | 100 m"]] },
      { name: "Νο 14/4 – Φ 2,20 mm", subtitle: "Ρολό 50 m ή 100 m", specs: [["Πάχος σύρματος", "2,20 mm"], ["Μήκος ρολού", "50 m | 100 m"]] },
    ] },
  { code: "07", groupKey: "security", title: "Κονσερτίνα (Τύπου ΝΑΤΟ)", tagline: "Συρμάτινη κονσερτίνα τύπου ΝΑΤΟ για υψηλή περιμετρική προστασία.", desc: "Κονσερτίνα ασφαλείας τύπου ΝΑΤΟ, γαλβανιζέ.",
    images: [asset("/images/concertina-1.png")],
    variants: [
      { name: "Κονσερτίνα Φ 200 mm", subtitle: "56 σπείρες, άνοιγμα 12 m", specs: [["Διάμετρος ρολού", "200 mm"], ["Σπείρες", "56"], ["Άνοιγμα", "12 m"], ["Διάμετρος/Άνοιγμα λεπίδας", "150 mm"]] },
      { name: "Κονσερτίνα Φ 300 mm", subtitle: "56 σπείρες, άνοιγμα 6 m", specs: [["Διάμετρος ρολού", "300 mm"], ["Σπείρες", "56"], ["Άνοιγμα", "6 m"], ["Διάμετρος/Άνοιγμα λεπίδας", "200 mm"]] },
      { name: "Κονσερτίνα Φ 500 mm", subtitle: "56 σπείρες, άνοιγμα 8 m, ~7 kg", specs: [["Διάμετρος ρολού", "500 mm"], ["Σπείρες", "56"], ["Άνοιγμα", "8 m"], ["Διάμετρος/Άνοιγμα λεπίδας", "400 mm"], ["Βάρος ρολού", "~7 kg"]] },
      { name: "Κονσερτίνα Φ 950 mm", subtitle: "56 σπείρες, άνοιγμα 13 m, ~14 kg", specs: [["Διάμετρος ρολού", "950 mm"], ["Σπείρες", "56"], ["Άνοιγμα", "13 m"], ["Διάμετρος/Άνοιγμα λεπίδας", "800 mm"], ["Βάρος ρολού", "~14 kg"]] },
    ] },
  { code: "08", groupKey: "materials", title: "Σύρματα", tagline: "Γαλβανισμένο σύρμα διαφόρων διαμέτρων για βιομηχανική και αγροτική χρήση.", desc: "Γαλβανιζέ, μαύρα, ευθύγραμμα, χορτοδεσίας — για κάθε χρήση.",
    images: [asset("/images/wire-1.png")],
    variants: [
      { name: "Σύρμα θερμό γαλβάνισμα", subtitle: "Σε κουλούρα, πλήρης γκάμα διαμέτρων", specs: [["Διάμετρος", "0.90 – 1.20 – 1.50 – 1.80 – 2.00 – 2.20 – 2.40 – 2.70 – 3.00 – 3.90 – 4.00 mm"], ["Φινίρισμα", "Θερμό γαλβάνισμα"], ["Συσκευασία", "Κουλούρα"]] },
      { name: "Σύρμα πλαστικοποιημένο", subtitle: "Γαλβανιζέ με επικάλυψη PVC", specs: [["Διάμετρος", "2,60 mm"], ["Χρώματα", "Πράσινο, Μαύρο"]] },
      { name: "Σύρμα ευθύγραμμο γαλβανιζέ", subtitle: "Κομμένο σε ράβδους", specs: [["Διάμετρος", "2.20 – 2.70 – 3.00 – 3.50 – 4.00 mm"], ["Μήκος ράβδου", "Κατά παραγγελία"], ["Φινίρισμα", "Θερμό γαλβάνισμα"]] },
      { name: "Σύρμα μαύρο", subtitle: "Για οικοδομικές εργασίες & δεσίματα", specs: [["Διάμετρος", "1.20 – 1.50 – 1.60 – 1.80 – 2.00 – 2.20 – 2.40 – 2.60 – 2.70 – 3.00 – 3.30 mm"], ["Συσκευασία", "Κουλούρα ή πακέτο 2 kg"]] },
      { name: "Σύρμα χορτοδεσίας μαύρο", subtitle: "Αγροτικής χρήσης", specs: [["Διάμετρος", "1,80 mm"], ["Βάρος κουλούρας", "40–45 kg"]] },
      { name: "Σύρμα ευθύγραμμο γαλβανιζέ (ράβδοι)", subtitle: "Κομμένο σε ράβδους για περίφραξη & κατασκευές", specs: [["Πάχος", "4–5 mm"], ["Ύψος ράβδου", "1,00 – 3,00 m"]] },
    ] },
  { code: "09", groupKey: "materials", title: "Πάσσαλοι & Σωλήνες", tagline: "Γαλβανιζέ πάσσαλοι και σωλήνες για στήριξη περιφράξεων και κατασκευών.", desc: "Κοιλοδοκοί, σωλήνες γαλβανιζέ και σιδηρογωνίες για στήριξη περίφραξης.",
    images: [asset("/images/posts-tubes-1.jpg"), asset("/images/posts-painted-2.jpg"), asset("/images/posts-painted-3.jpg"), asset("/images/posts-tubes-4.jpg"), asset("/images/posts-angles-5.jpg")],
    variants: [
      { name: "Κοιλοδοκός 50x50 Πλαστικοποιημένος – Πάχος 2,00 mm", subtitle: "Με βάση, πλαστικοποιημένοι (PVC)", specs: [["Διαστάσεις", "50×50 mm"], ["Πάχος", "2,00 mm"], ["Διαθέσιμα ύψη", "1,00 – 1,20 – 1,50 – 1,76 – 1,96 m"]] },
      { name: "Κοιλοδοκός 50x50 Πλαστικοποιημένος – Πάχος 1,50 mm", subtitle: "Με βάση, πλαστικοποιημένοι (PVC)", specs: [["Διαστάσεις", "50×50 mm"], ["Πάχος", "1,50 mm"], ["Διαθέσιμα ύψη", "1,00 – 1,20 – 1,50 – 1,76 – 1,96 m"]] },
      { name: "Κοιλοδοκός 50x50 Γαλβανισμένος – Πάχος 2,00 mm", subtitle: "Με βάση, γαλβανισμένοι", specs: [["Διαστάσεις", "50×50 mm"], ["Πάχος", "2,00 mm"], ["Διαθέσιμα ύψη", "1,00 – 1,20 – 1,50 – 1,76 – 1,96 m"]] },
      { name: "Κοιλοδοκός 50x50 Γαλβανισμένος – Πάχος 1,50 mm", subtitle: "Με βάση, γαλβανισμένοι", specs: [["Διαστάσεις", "50×50 mm"], ["Πάχος", "1,50 mm"], ["Διαθέσιμα ύψη", "1,00 – 1,20 – 1,50 – 1,76 – 1,96 m"]] },
      { name: "Σωλήνες πάσσαλοι γαλβανιζέ", subtitle: "Θερμό γαλβάνισμα, με βάση", specs: [["Διάμετρος", "Φ42 – Φ48 – Φ60 mm"], ["Πάχος τοιχώματος", "1.50 – 2.00 mm"], ["Ύψος", "1.50 – 2.00 – 2.50 m"], ["Φινίρισμα", "Θερμό γαλβάνισμα"]] },
      { name: "Σιδηρογωνίες πάσσαλοι", subtitle: "Γωνιακοί πάσσαλοι, διάφορα μεγέθη", specs: [["Διαστάσεις", "30x30 – 40x40 – 50x50 mm"], ["Ύψος", "1.00 – 1.50 – 2.00 m"], ["Πάχος", "3.00 – 4.00 mm"]] },
      { name: "Τάπες, Clips & Βύσματα", subtitle: "Εξαρτήματα σύνδεσης πλεγμάτων", specs: [["Τάπες", "50x50 mm – 60x40 mm"], ["Clips σύνδεσης", "Για panel πλέγματα"], ["Σύνδεσμοι Clips PVC", "Για σύνδεση πλεγμάτων"], ["Τάπα πλαστική", "Για πάσσαλο 50x50 mm"], ["Στριφώνια μεταλλικά", "10x100 mm"], ["Βύσματα", "Μ8 – Μ10 – Μ12"]] },
    ] },
  { code: "10", groupKey: "materials", title: "Καρφιά & Βελονάκια", tagline: "Καρφιά και βελονάκια στήριξης για εγκατάσταση συρματοπλεγμάτων.", desc: "Οικοδομικά καρφιά, ατσαλόκαρφα, στραβόκαρφα, δίχαλα και βελονάκια.",
    images: [asset("/images/nails-1.png")],
    variants: [
      { name: "Καρφιά οικοδομικά", subtitle: "Πλήρης γκάμα μεγεθών, συσκευασία 5 kg κουτί", specs: [["Νο.4", "2.50 mm × 40 mm"], ["Νο.5", "2.80 mm × 50 mm"], ["Νο.6", "2.80 mm × 60 mm"], ["Νο.7", "3.00 mm × 70 mm"], ["Νο.8", "3.50 mm × 80 mm"], ["Νο.10", "4.00 mm × 100 mm"], ["Νο.11", "4.00 mm × 110 mm"], ["Νο.12", "4.00 mm × 120 mm"], ["Νο.15", "5.00 mm × 150 mm"], ["Νο.18", "6.00 mm × 180 mm"], ["Νο.20", "6.00 mm × 200 mm"], ["Συσκευασία", "Κουτί 5 kg"]] },
      { name: "Ατσαλόκαρφα", subtitle: "Σκληρά, για σκυρόδεμα", specs: [["Μήκος", "25 – 30 – 40 – 50 – 60 mm"], ["Υλικό", "Σκληρός χάλυβας"]] },
      { name: "Δίχαλα", subtitle: "Γαλβανιζέ, για σύρματα περίφραξης", specs: [["Μήκος", "25 – 30 – 40 mm"], ["Φινίρισμα", "Γαλβανιζέ"]] },
      { name: "Βελονάκια ακέφαλα", subtitle: "Για ξύλινες κατασκευές", specs: [["Μήκος", "20 – 25 – 30 – 40 – 50 mm"], ["Πάχος", "1.00 – 1.40 mm"]] },
      { name: "Βελονάκια πλατυκέφαλα", subtitle: "Για ταπετσαρίες & επενδύσεις", specs: [["Μήκος", "10 – 15 – 20 – 25 mm"], ["Πάχος", "1.00 mm"]] },
    ] },
  { code: "11", groupKey: "constructions", title: "Αντιπλημμυρικά & Gabion", tagline: "Κατασκευές gabion και αντιπλημμυρικά συστήματα για προστασία εδάφους και υποδομών.", desc: "Συρματοκιβώτια, gabion κατασκευές αντιστήριξης και αντιπλημμυρικής προστασίας.",
    images: [asset("/images/gabion-1.png")],
    variants: [
      { name: "Συρματοκιβώτιο αντιπλημμυρικό βαρύ γαλβάνισμα", subtitle: "Αντιπλημμυρικό / αντιστήριξης", specs: [["Διαστάσεις", "Κατά παραγγελία"], ["Πάχος σύρματος", "4.00 – 5.00 mm"], ["Καρέ πλέγματος", "50x100 mm"], ["Φινίρισμα", "Γαλβανιζέ / Galfan"]] },
      { name: "Αντιπλημμυρικό πλέγμα σε ρολό βαρύ γαλβάνισμα", subtitle: "Για κατασκευή gabion επιτόπου", specs: [["Πάχος σύρματος", "3,00 mm"], ["Ύψος", "0.50 – 1.00 – 2.00 m"], ["Μήκος ρολού", "25 – 50 m"]] },
      { name: "Αντιπλημμυρικό κιβώτιο", subtitle: "Έτοιμο προς χρήση, γαλβανιζέ", specs: [["Διαστάσεις", "2x1x1 m | 2x1x0.5 m | 3x1x1 m"], ["Πάχος σύρματος", "3.00 – 4.00 mm"]] },
    ] },
  { code: "12", groupKey: "constructions", title: "Κάγκελα & Πόρτες Ηλεκτροστατικά Βαμμένα", tagline: "Κάγκελα και πόρτες ηλεκτροστατικά βαμμένες για ιδιωτικούς και επαγγελματικούς χώρους.", desc: "Μεταλλικές κατασκευές πάσης φύσεως — κάγκελα, πόρτες, υπόστεγα.",
    images: [asset("/images/gates-painted-1.jpg"), asset("/images/gates-painted-2.jpg"), asset("/images/gates-painted-3.jpg")],
    variants: [
      { name: "Κάγκελα", subtitle: "Κατά παραγγελία, μεταλλικά", specs: [["Υλικό", "Σίδερο ή αλουμίνιο"], ["Κατασκευή", "Κατά παραγγελία"]] },
      { name: "Πόρτες μεταλλικές", subtitle: "Μονόφυλλες & δίφυλλες, για περίφραξη", specs: [["Τύπος", "Μονόφυλλη ή δίφυλλη"], ["Πλάτος", "1.00 – 1.50 – 2.00 – 3.00 – 4.00 m"], ["Ύψος", "1.00 – 1.50 – 2.00 m"], ["Φινίρισμα", "Γαλβανιζέ ή ηλεκτροστατικά βαμμένο"]] },
      { name: "Υπόστεγα", subtitle: "Μεταλλικές κατασκευές", specs: [["Κατασκευή", "Κατά παραγγελία"], ["Υλικό", "Γαλβανιζέ σωλήνες & κοιλοδοκοί"]] },
    ] },
  { code: "13", groupKey: "equipment", title: "Χειράμαξες & Εργαλεία", tagline: "Χειράμαξες και εργαλεία για αγροτική και κατασκευαστική χρήση.", desc: "Χειράμαξες ηλεκτροστατικά βαμμένες, καροτσάκια και ανταλλακτικά.",
    images: [asset("/images/product-06.png"), asset("/images/wheelbarrow-norma-1.png"), asset("/images/wheelbarrow-norma-2.jpg"), asset("/images/wheelbarrow-norma-3.jpg")],
    variants: [
      { name: "Εργολαβικό απλό NORMA No 1", subtitle: "Χειράμαξα ηλεκτροστατικά βαμμένη", specs: [["Τύπος", "Απλή"], ["Ρόδα", "Αεροθαλάμου"], ["Φινίρισμα", "Ηλεκτροστατικά βαμμένη"]] },
      { name: "Εργολαβικό ενισχυμένο NORMA No 3", subtitle: "Βαρέως τύπου, ενισχυμένο πλαίσιο", specs: [["Τύπος", "Βαρέως τύπου ενισχυμένη"], ["Ρόδα", "Αεροθαλάμου ή συμπαγής"], ["Φινίρισμα", "Ηλεκτροστατικά βαμμένη"]] },
      { name: "Δίτροχο καροτσάκι", subtitle: "Αεροθαλάμου ή συμπαγές", specs: [["Ρόδες", "2 — αεροθαλάμου ή συμπαγείς"], ["Χρήση", "Αγροτική / οικοδομική"]] },
      { name: "Ανταλλακτικά χειράμαξων", subtitle: "Ρόδες, λάστιχα, κάδοι", specs: [["Ρόδες", "Αεροθαλάμου ή συμπαγείς"], ["Κάδοι", "Πλαστικοί ή μεταλλικοί"], ["Λάστιχα", "Διάφορα μεγέθη"]] },
    ] },
  { code: "14", groupKey: "constructions", title: "Κατασκευές Περιφράξεων", tagline: "Ολοκληρωμένες κατασκευές περιφράξεων κατά παραγγελία.", desc: "Πλήρη κατασκευή περίφραξης οικοπέδων, αγροτεμαχίων, στρατιωτικών εγκαταστάσεων τύπου ΝΑΤΟ, φωτοβολταϊκών πάρκων, κτηνοτροφικών μονάδων. Τα εξειδικευμένα συνεργεία μας αναλαμβάνουν την πλήρη κατασκευή και τοποθέτηση κάθε περίφραξης, προσαρμοσμένη στα μέτρα του πελάτη.",
    images: [asset("/images/product-05.png"), asset("/images/norma-panel-2.png"), asset("/images/fencing-enhanced-1.png"), asset("/images/fencing-enhanced-2.png")],
    variants: [
      { name: "Περίφραξη οικοπέδων", subtitle: "Πλήρης κατασκευή με panel ή πλέγμα", specs: [["Τύποι", "Ηλεκτροστατικά βαμμένα panel, πονταριστά, δικτυωτά"], ["Πάσσαλοι", "Κοιλοδοκοί 50×50, σωλήνες, σιδηρογωνίες"], ["Εξαρτήματα", "Clips, τάπες, στριφώνια, τεντωτήρες"]] },
      { name: "Περίφραξη αγροτεμαχίων", subtitle: "Ανθεκτικές κατασκευές για αγροτική χρήση", specs: [["Υλικά", "Πονταριστό ή δικτυωτό πλέγμα"], ["Στήριξη", "Σιδηρογωνίες ή γαλβανιζέ σωλήνες"]] },
      { name: "Περίφραξη στρατιωτικών εγκαταστάσεων τύπου ΝΑΤΟ", subtitle: "Υψηλής ασφαλείας με κονσερτίνα", specs: [["Τύπος", "Πλέγμα + ακανθωτό + κονσερτίνα"], ["Ασφάλεια", "Τύπου ΝΑΤΟ"]] },
      { name: "Περίφραξη φωτοβολταϊκών πάρκων", subtitle: "Κατασκευή σύμφωνα με τις προδιαγραφές", specs: [["Τύπος", "Panel ή γαλβανιζέ πλέγμα"], ["Ύψος", "Κατά παραγγελία"]] },
      { name: "Περίφραξη κτηνοτροφικών μονάδων", subtitle: "Ειδικές κατασκευές για ζωικό κεφάλαιο", specs: [["Υλικά", "Πονταριστό πλέγμα, σιδηρογωνίες"], ["Τύπος", "Ανθεκτική κατασκευή"]] },
    ] },
  { code: "15", groupKey: "constructions", title: "Αγροτικές Εγκαταστάσεις", tagline: "Μεταλλικές κατασκευές για αγροτικές εγκαταστάσεις και κτηνοτροφικές μονάδες.", desc: "Πασσάλωση και εξοπλισμός για ακτινίδια, σπαράγγια, αμπέλια, θερμοκήπια.",
    images: [asset("/images/agricultural-1.png")],
    variants: [
      { name: "Πασσάλωση αγροτεμαχίων", subtitle: "Για ακτινίδια, σπαράγγια, αμπέλια", specs: [["Υλικό", "Γαλβανιζέ σωλήνες & κοιλοδοκοί"], ["Ύψος", "1.50 – 2.00 – 2.50 – 3.00 m"], ["Κατασκευή", "Κατά παραγγελία"]] },
      { name: "Θερμοκήπια", subtitle: "Μεταλλικός σκελετός, γαλβανιζέ", specs: [["Σκελετός", "Γαλβανιζέ σωλήνες"], ["Τύπος", "Τούνελ ή πολυκαρμπονάτο"], ["Κατασκευή", "Κατά παραγγελία"]] },
      { name: "Εξοπλισμός αμπελώνων", subtitle: "Πάσσαλοι, σύρματα, σφιγκτήρες", specs: [["Πάσσαλοι", "Σιδηρογωνίες ή σωλήνες"], ["Σύρμα τάνυσης", "Γαλβανιζέ 2.20 – 2.70 mm"], ["Σφιγκτήρες", "Μεταλλικοί"]] },
    ] },
  { code: "16", groupKey: "constructions", title: "Διακοσμητικές Κατασκευές", tagline: "Διακοσμητικές μεταλλικές κατασκευές για κήπους και εξωτερικούς χώρους.", desc: "Διακοσμητικά συρματοκιβώτια και αρχιτεκτονικές λύσεις με gabion.",
    images: [asset("/images/decorative-1.png")],
    variants: [
      { name: "Διακοσμητικά gabion «KORINA»", subtitle: "Για κήπους, τοπία & εξωτερικούς χώρους", specs: [["Τύπος", "Κουτί ή κολώνα"], ["Διαστάσεις", "Κατά παραγγελία"], ["Πάχος σύρματος", "3,00 – 4,00 mm"], ["Γέμισμα", "Φυσική πέτρα, βότσαλο"]] },
      { name: "Τοίχοι αντιστήριξης", subtitle: "Με φυσική πέτρα, gabion σύστημα", specs: [["Ύψος", "0.50 – 1.00 – 2.00+ m"], ["Πλάτος", "0.30 – 0.50 – 1.00 m"], ["Μήκος", "Κατά παραγγελία"]] },
    ] },
];

const categoriesEn = [
  { code: "01", groupKey: "mesh", title: "Welded Wire Mesh", tagline: "High-strength welded wire mesh for agricultural and industrial fencing, manufactured by NORMA S.A.", desc: "Electro-welded (spot-welded) wire mesh in rolls — full range of grid sizes, heights and wire diameters.",
    images: [asset("/images/product-04.png"), asset("/images/pontarista-1.png"), asset("/images/pontarista-2.jpg"), asset("/images/pontarista-3.png")],
    variants: [
      { name: "Welded Mesh 60×100 mm (Ø 3.00/2.40)", subtitle: "Galvanized, 20 m roll", specs: [["Grid size", "60×100 mm"], ["Wire", "Ø 3.00 / 2.40 mm"], ["Roll length", "20 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh 60×100 mm (Ø 2.70/2.40)", subtitle: "Galvanized, 20 m roll", specs: [["Grid size", "60×100 mm"], ["Wire", "Ø 2.70 / 2.40 mm"], ["Roll length", "20 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh 60×100 mm (Ø 2.70/2.20)", subtitle: "Galvanized, 20 m roll", specs: [["Grid size", "60×100 mm"], ["Wire", "Ø 2.70 / 2.20 mm"], ["Roll length", "20 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh 60×100 mm (Ø 2.40/2.20)", subtitle: "Galvanized, 20 m roll", specs: [["Grid size", "60×100 mm"], ["Wire", "Ø 2.40 / 2.20 mm"], ["Roll length", "20 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh 60×100 mm (Ø 2.20/2.20)", subtitle: "Galvanized, 20 m roll", specs: [["Grid size", "60×100 mm"], ["Wire", "Ø 2.20 / 2.20 mm"], ["Roll length", "20 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh 60×100 mm (Ø 2.20/2.00)", subtitle: "Galvanized, 20 m roll", specs: [["Grid size", "60×100 mm"], ["Wire", "Ø 2.20 / 2.00 mm"], ["Roll length", "20 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh 50×50 mm (Ø 2.00)", subtitle: "Galvanized, 25 m roll", specs: [["Grid size", "50×50 mm"], ["Wire", "Ø 2.00 / 2.00 mm"], ["Roll length", "25 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh 50×50 mm (Ø 1.80)", subtitle: "Galvanized, 25 m roll", specs: [["Grid size", "50×50 mm"], ["Wire", "Ø 1.80 / 1.80 mm"], ["Roll length", "25 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh 50×75 mm (Ø 2.00)", subtitle: "Galvanized, 25 m roll", specs: [["Grid size", "50×75 mm"], ["Wire", "Ø 2.00 / 2.00 mm"], ["Roll length", "25 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh 50×75 mm (Ø 1.80)", subtitle: "Galvanized, 25 m roll", specs: [["Grid size", "50×75 mm"], ["Wire", "Ø 1.80 / 1.80 mm"], ["Roll length", "25 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh 60×100 mm (Ø 1.80)", subtitle: "Galvanized, 25 m roll", specs: [["Grid size", "60×100 mm"], ["Wire", "Ø 1.80 / 1.80 mm"], ["Roll length", "25 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded Mesh PVC 50×100 mm (Ø 2.50)", subtitle: "PVC-coated RAL 6005 (green), 25 m roll", specs: [["Grid size", "50×100 mm"], ["Wire", "Ø 2.50 mm PVC"], ["Color", "RAL 6005"], ["Roll length", "25 m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
    ] },
  { code: "02", groupKey: "mesh", title: "Chain-Link (Woven) Mesh", tagline: "Woven chain-link mesh for fencing sports grounds, plots and industrial areas.", desc: "Chain-link (woven) mesh in rolls, galvanized or PVC-coated. «EVROS 1» series.",
    images: [asset("/images/product-01.jpg"), asset("/images/diktyota-1.jpg"), asset("/images/diktyota-2.png")],
    variants: [
      { name: "No 10 – Ø 1.5 mm", subtitle: "Grid 40×40 mm, 25 m roll", specs: [["Wire diameter", "1.5 mm"], ["Mesh grid", "40×40 mm"], ["Roll length", "25 m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "No 12 – Ø 1.8 mm", subtitle: "Grid 40×40 / 50×50 / 55×55 / 65×65 mm, 25 m roll", specs: [["Wire diameter", "1.8 mm"], ["Mesh grid", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Roll length", "25 m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "No 13 – Ø 2.0 mm", subtitle: "Grid 40×40 / 50×50 / 55×55 / 65×65 mm, 25 m roll", specs: [["Wire diameter", "2.0 mm"], ["Mesh grid", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Roll length", "25 m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "No 14 – Ø 2.2 mm", subtitle: "Grid 40×40 / 50×50 / 55×55 / 65×65 mm, 20 m roll", specs: [["Wire diameter", "2.2 mm"], ["Mesh grid", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Roll length", "20 m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "No 15 – Ø 2.4 mm", subtitle: "Grid 40×40 / 50×50 / 55×55 / 65×65 mm, 20 m roll", specs: [["Wire diameter", "2.4 mm"], ["Mesh grid", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Roll length", "20 m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "No 17 – Ø 3.0 mm", subtitle: "Grid 50×50 / 55×55 / 65×65 mm, 10 m roll", specs: [["Wire diameter", "3.0 mm"], ["Mesh grid", "50×50 – 55×55 – 65×65 mm"], ["Roll length", "10 m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "PVC-Coated – Ø 2.60 mm", subtitle: "Grid 55×55 mm, 20 m roll", specs: [["Wire diameter", "2.60 mm"], ["Mesh grid", "55×55 mm"], ["Roll length", "20 m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
    ] },
  { code: "03", groupKey: "mesh", title: "Galvanized Mesh in Sheets", tagline: "Galvanized mesh sheets for construction and industrial applications.", desc: "Welded galvanized mesh in sheets, 50 pcs/bundle.",
    images: [asset("/images/panel-galvanized-1.png"), asset("/images/panel-galvanized-2.png"), asset("/images/panel-galvanized-3.jpg")],
    variants: [
      { name: "Sheet Ø 3.00 mm", subtitle: "Galvanized, 50 pcs/bundle", specs: [["Wire thickness", "3.00 mm"], ["Dimensions", "2.00×5.00 m | 1.50×5.00 m"], ["Pieces/bundle", "50"]] },
      { name: "Sheet Ø 3.50 mm", subtitle: "Galvanized, 50 pcs/bundle", specs: [["Wire thickness", "3.50 mm"], ["Dimensions", "2.00×5.00 m | 1.50×5.00 m"], ["Pieces/bundle", "50"]] },
      { name: "Sheet Ø 4.00 mm", subtitle: "Galvanized, 50 pcs/bundle", specs: [["Wire thickness", "4.00 mm"], ["Dimensions", "2.00×5.00 m | 1.50×5.00 m"], ["Pieces/bundle", "50"]] },
    ] },
  { code: "04", groupKey: "mesh", title: "NORMA Panel – Powder-Coated & Galvanized", tagline: "Galvanized or powder-coated fencing panels, ideal for gardens, yards and commercial spaces.", desc: "Galvanized and PVC-coated mesh in 2.50 m panel sheets. Colors: RAL 6005 (green), 7043 (dark grey), 7045 (light grey).",
    images: [asset("/images/product-02.jpg"), asset("/images/norma-panel-1.png"), asset("/images/norma-panel-2.png"), asset("/images/norma-panel-3.jpg"), asset("/images/norma-panel-5.jpg"), asset("/images/norma-panel-4.png")],
    variants: [
      { name: "NORMA Panel PVC 50×100", subtitle: "Galvanized + PVC-coated, Ø 4.20 mm", specs: [["Wire diameter", "4.20 mm"], ["Grid", "50×100 mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"], ["RAL colors", "6005 – 7043 – 7045"]] },
      { name: "Galvanized Panel 50×100", subtitle: "Galvanized, unpainted, Ø 4.00 mm", specs: [["Wire diameter", "4.00 mm"], ["Grid", "50×100 mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"]] },
      { name: "NORMA Panel PVC 55×200", subtitle: "Galvanized + PVC-coated, Ø 4.20 mm", specs: [["Wire diameter", "4.20 mm"], ["Grid", "(55×100) + (55×200) mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"], ["RAL colors", "6005 – 7043 – 7045"]] },
      { name: "Galvanized Panel 55×200", subtitle: "Galvanized, unpainted, Ø 4.00 mm", specs: [["Wire diameter", "4.00 mm"], ["Grid", "(55×100) + (55×200) mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"]] },
      { name: "NORMA Panel PVC 70×200", subtitle: "Galvanized + PVC-coated, Ø 4.20 mm", specs: [["Wire diameter", "4.20 mm"], ["Grid", "(70×100) + (70×200) mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"], ["RAL colors", "6005 – 7043 – 7045"]] },
      { name: "Galvanized Panel 70×200", subtitle: "Galvanized, unpainted, Ø 4.00 mm", specs: [["Wire diameter", "4.00 mm"], ["Grid", "(70×100) + (70×200) mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"]] },
    ] },
  { code: "05", groupKey: "mesh", title: "Hexagonal Wire Mesh", tagline: "Galvanized hexagonal wire mesh for coops, cages and crop protection.", desc: "Classic hexagonal mesh for poultry farms, gardens and light fencing.",
    images: [asset("/images/hexagonal-1.png")],
    variants: [
      { name: "No 2.5 – Ø 0.70 mm – Grid 1/2\"", subtitle: "Galvanized, 25 m roll", specs: [["Wire diameter", "0.70 mm"], ["Grid", "1/2\" (13 mm)"], ["Roll length", "25 m"], ["Roll height", "0.80 – 1.00 – 1.20 – 1.50 m"]] },
      { name: "No 4 – Ø 0.90 mm – Grid 1\"", subtitle: "Galvanized, 50 m roll", specs: [["Wire diameter", "0.90 mm"], ["Grid", "1\" (25 mm)"], ["Roll length", "50 m"], ["Roll height", "0.80 – 1.00 – 1.20 – 1.50 m"]] },
      { name: "No 4 – Ø 0.90 mm – Grid 2\"", subtitle: "Galvanized, 50 m roll", specs: [["Wire diameter", "0.90 mm"], ["Grid", "2\" (50 mm)"], ["Roll length", "50 m"], ["Roll height", "0.80 – 1.00 – 1.20 – 1.50 m"]] },
      { name: "No 2.5 – Ø 0.60 mm – Grid 1/2\" (light)", subtitle: "Galvanized, 20 m roll", specs: [["Wire diameter", "0.60 mm"], ["Grid", "1/2\" (13 mm)"], ["Roll length", "20 m"], ["Roll height", "0.80 – 1.00 – 1.20 – 1.50 m"]] },
      { name: "No 4 – Ø 0.60 mm – Grid 1\" (light)", subtitle: "Galvanized, 20 m roll", specs: [["Wire diameter", "0.60 mm"], ["Grid", "1\" (25 mm)"], ["Roll length", "20 m"], ["Roll height", "0.80 – 1.00 – 1.20 – 1.50 m"]] },
    ] },
  { code: "06", groupKey: "security", title: "Barbed Wire", tagline: "Galvanized barbed wire for perimeter security of plots and industrial facilities.", desc: "Galvanized barbed wire in 50 m or 100 m rolls.",
    images: [asset("/images/product-03.png")],
    variants: [
      { name: "No 11/4 – Ø 1.60 mm", subtitle: "100 m roll", specs: [["Wire thickness", "1.60 mm"], ["Roll length", "100 m"]] },
      { name: "No 12/4 – Ø 1.80 mm", subtitle: "50 m or 100 m roll", specs: [["Wire thickness", "1.80 mm"], ["Roll length", "50 m | 100 m"]] },
      { name: "No 13/4 – Ø 2.00 mm", subtitle: "50 m or 100 m roll", specs: [["Wire thickness", "2.00 mm"], ["Roll length", "50 m | 100 m"]] },
      { name: "No 14/4 – Ø 2.20 mm", subtitle: "50 m or 100 m roll", specs: [["Wire thickness", "2.20 mm"], ["Roll length", "50 m | 100 m"]] },
    ] },
  { code: "07", groupKey: "security", title: "Concertina Wire (NATO Type)", tagline: "NATO-type razor concertina wire for high-security perimeters.", desc: "NATO-type security concertina, galvanized.",
    images: [asset("/images/concertina-1.png")],
    variants: [
      { name: "Concertina Ø 200 mm", subtitle: "56 coils, 12 m extension", specs: [["Coil diameter", "200 mm"], ["Coils", "56"], ["Extension", "12 m"], ["Blade diameter/extension", "150 mm"]] },
      { name: "Concertina Ø 300 mm", subtitle: "56 coils, 6 m extension", specs: [["Coil diameter", "300 mm"], ["Coils", "56"], ["Extension", "6 m"], ["Blade diameter/extension", "200 mm"]] },
      { name: "Concertina Ø 500 mm", subtitle: "56 coils, 8 m extension, ~7 kg", specs: [["Coil diameter", "500 mm"], ["Coils", "56"], ["Extension", "8 m"], ["Blade diameter/extension", "400 mm"], ["Roll weight", "~7 kg"]] },
      { name: "Concertina Ø 950 mm", subtitle: "56 coils, 13 m extension, ~14 kg", specs: [["Coil diameter", "950 mm"], ["Coils", "56"], ["Extension", "13 m"], ["Blade diameter/extension", "800 mm"], ["Roll weight", "~14 kg"]] },
    ] },
  { code: "08", groupKey: "materials", title: "Wire", tagline: "Galvanized wire in various diameters for industrial and agricultural use.", desc: "Galvanized, black, straight, baling wire — for every use.",
    images: [asset("/images/wire-1.png")],
    variants: [
      { name: "Hot-dip galvanized wire", subtitle: "In coils, full range of diameters", specs: [["Diameter", "0.90 – 1.20 – 1.50 – 1.80 – 2.00 – 2.20 – 2.40 – 2.70 – 3.00 – 3.90 – 4.00 mm"], ["Finish", "Hot-dip galvanized"], ["Packaging", "Coil"]] },
      { name: "PVC-coated wire", subtitle: "Galvanized with PVC coating", specs: [["Diameter", "2.60 mm"], ["Colors", "Green, Black"]] },
      { name: "Straight galvanized wire", subtitle: "Cut into rods", specs: [["Diameter", "2.20 – 2.70 – 3.00 – 3.50 – 4.00 mm"], ["Rod length", "Made to order"], ["Finish", "Hot-dip galvanized"]] },
      { name: "Black wire", subtitle: "For construction work & tying", specs: [["Diameter", "1.20 – 1.50 – 1.60 – 1.80 – 2.00 – 2.20 – 2.40 – 2.60 – 2.70 – 3.00 – 3.30 mm"], ["Packaging", "Coil or 2 kg pack"]] },
      { name: "Black baling wire", subtitle: "Agricultural use", specs: [["Diameter", "1.80 mm"], ["Coil weight", "40–45 kg"]] },
      { name: "Straight galvanized wire (rods)", subtitle: "Cut into rods for fencing & construction", specs: [["Thickness", "4–5 mm"], ["Rod height", "1.00 – 3.00 m"]] },
    ] },
  { code: "09", groupKey: "materials", title: "Posts & Pipes", tagline: "Galvanized posts and pipes for supporting fences and constructions.", desc: "Square posts, galvanized pipes and angle irons for fence support.",
    images: [asset("/images/posts-tubes-1.jpg"), asset("/images/posts-painted-2.jpg"), asset("/images/posts-painted-3.jpg"), asset("/images/posts-tubes-4.jpg"), asset("/images/posts-angles-5.jpg")],
    variants: [
      { name: "Square Post 50x50 PVC-Coated – 2.00 mm thick", subtitle: "With base, PVC-coated", specs: [["Dimensions", "50×50 mm"], ["Thickness", "2.00 mm"], ["Available heights", "1.00 – 1.20 – 1.50 – 1.76 – 1.96 m"]] },
      { name: "Square Post 50x50 PVC-Coated – 1.50 mm thick", subtitle: "With base, PVC-coated", specs: [["Dimensions", "50×50 mm"], ["Thickness", "1.50 mm"], ["Available heights", "1.00 – 1.20 – 1.50 – 1.76 – 1.96 m"]] },
      { name: "Square Post 50x50 Galvanized – 2.00 mm thick", subtitle: "With base, galvanized", specs: [["Dimensions", "50×50 mm"], ["Thickness", "2.00 mm"], ["Available heights", "1.00 – 1.20 – 1.50 – 1.76 – 1.96 m"]] },
      { name: "Square Post 50x50 Galvanized – 1.50 mm thick", subtitle: "With base, galvanized", specs: [["Dimensions", "50×50 mm"], ["Thickness", "1.50 mm"], ["Available heights", "1.00 – 1.20 – 1.50 – 1.76 – 1.96 m"]] },
      { name: "Galvanized post pipes", subtitle: "Hot-dip galvanized, with base", specs: [["Diameter", "Ø42 – Ø48 – Ø60 mm"], ["Wall thickness", "1.50 – 2.00 mm"], ["Height", "1.50 – 2.00 – 2.50 m"], ["Finish", "Hot-dip galvanized"]] },
      { name: "Angle iron posts", subtitle: "Corner posts, various sizes", specs: [["Dimensions", "30x30 – 40x40 – 50x50 mm"], ["Height", "1.00 – 1.50 – 2.00 m"], ["Thickness", "3.00 – 4.00 mm"]] },
      { name: "Caps, Clips & Fasteners", subtitle: "Mesh connection accessories", specs: [["Caps", "50x50 mm – 60x40 mm"], ["Connection clips", "For panel mesh"], ["PVC clip connectors", "For connecting mesh"], ["Plastic cap", "For 50x50 mm post"], ["Metal turnbuckles", "10x100 mm"], ["Fasteners", "M8 – M10 – M12"]] },
    ] },
  { code: "10", groupKey: "materials", title: "Nails & Tacks", tagline: "Support nails and tacks for installing wire mesh.", desc: "Construction nails, steel nails, forked nails, and tacks.",
    images: [asset("/images/nails-1.png")],
    variants: [
      { name: "Construction nails", subtitle: "Full size range, 5 kg box packaging", specs: [["No.4", "2.50 mm × 40 mm"], ["No.5", "2.80 mm × 50 mm"], ["No.6", "2.80 mm × 60 mm"], ["No.7", "3.00 mm × 70 mm"], ["No.8", "3.50 mm × 80 mm"], ["No.10", "4.00 mm × 100 mm"], ["No.11", "4.00 mm × 110 mm"], ["No.12", "4.00 mm × 120 mm"], ["No.15", "5.00 mm × 150 mm"], ["No.18", "6.00 mm × 180 mm"], ["No.20", "6.00 mm × 200 mm"], ["Packaging", "5 kg box"]] },
      { name: "Steel nails", subtitle: "Hardened, for concrete", specs: [["Length", "25 – 30 – 40 – 50 – 60 mm"], ["Material", "Hardened steel"]] },
      { name: "Forked nails", subtitle: "Galvanized, for fence wire", specs: [["Length", "25 – 30 – 40 mm"], ["Finish", "Galvanized"]] },
      { name: "Headless tacks", subtitle: "For wooden constructions", specs: [["Length", "20 – 25 – 30 – 40 – 50 mm"], ["Thickness", "1.00 – 1.40 mm"]] },
      { name: "Flat-head tacks", subtitle: "For upholstery & coverings", specs: [["Length", "10 – 15 – 20 – 25 mm"], ["Thickness", "1.00 mm"]] },
    ] },
  { code: "11", groupKey: "constructions", title: "Flood Control & Gabion", tagline: "Gabion structures and flood-control systems for soil and infrastructure protection.", desc: "Wire cages, gabion retaining structures and flood-protection systems.",
    images: [asset("/images/gabion-1.png")],
    variants: [
      { name: "Heavy-galvanized flood-control wire cage", subtitle: "Flood control / retaining", specs: [["Dimensions", "Made to order"], ["Wire thickness", "4.00 – 5.00 mm"], ["Mesh grid", "50x100 mm"], ["Finish", "Galvanized / Galfan"]] },
      { name: "Heavy-galvanized flood-control mesh roll", subtitle: "For on-site gabion construction", specs: [["Wire thickness", "3.00 mm"], ["Height", "0.50 – 1.00 – 2.00 m"], ["Roll length", "25 – 50 m"]] },
      { name: "Flood-control box", subtitle: "Ready to use, galvanized", specs: [["Dimensions", "2x1x1 m | 2x1x0.5 m | 3x1x1 m"], ["Wire thickness", "3.00 – 4.00 mm"]] },
    ] },
  { code: "12", groupKey: "constructions", title: "Railings & Powder-Coated Gates", tagline: "Powder-coated railings and gates for private and commercial properties.", desc: "Metal constructions of every kind — railings, gates, sheds.",
    images: [asset("/images/gates-painted-1.jpg"), asset("/images/gates-painted-2.jpg"), asset("/images/gates-painted-3.jpg")],
    variants: [
      { name: "Railings", subtitle: "Made to order, metal", specs: [["Material", "Iron or aluminum"], ["Construction", "Made to order"]] },
      { name: "Metal gates", subtitle: "Single & double leaf, for fencing", specs: [["Type", "Single or double leaf"], ["Width", "1.00 – 1.50 – 2.00 – 3.00 – 4.00 m"], ["Height", "1.00 – 1.50 – 2.00 m"], ["Finish", "Galvanized or powder-coated"]] },
      { name: "Sheds", subtitle: "Metal constructions", specs: [["Construction", "Made to order"], ["Material", "Galvanized pipes & square posts"]] },
    ] },
  { code: "13", groupKey: "equipment", title: "Wheelbarrows & Tools", tagline: "Wheelbarrows and tools for agricultural and construction use.", desc: "Powder-coated wheelbarrows, carts and spare parts.",
    images: [asset("/images/product-06.png"), asset("/images/wheelbarrow-norma-1.png"), asset("/images/wheelbarrow-norma-2.jpg"), asset("/images/wheelbarrow-norma-3.jpg")],
    variants: [
      { name: "NORMA Standard Contractor No 1", subtitle: "Powder-coated wheelbarrow", specs: [["Type", "Standard"], ["Wheel", "Pneumatic"], ["Finish", "Powder-coated"]] },
      { name: "NORMA Reinforced Contractor No 3", subtitle: "Heavy-duty, reinforced frame", specs: [["Type", "Heavy-duty reinforced"], ["Wheel", "Pneumatic or solid"], ["Finish", "Powder-coated"]] },
      { name: "Two-wheel cart", subtitle: "Pneumatic or solid wheels", specs: [["Wheels", "2 — pneumatic or solid"], ["Use", "Agricultural / construction"]] },
      { name: "Wheelbarrow spare parts", subtitle: "Wheels, tires, buckets", specs: [["Wheels", "Pneumatic or solid"], ["Buckets", "Plastic or metal"], ["Tires", "Various sizes"]] },
    ] },
  { code: "14", groupKey: "constructions", title: "Fencing Construction", tagline: "Complete made-to-order fencing construction.", desc: "Full fence construction for plots, farmland, NATO-type military installations, solar parks, and livestock units. Our specialized crews handle the complete construction and installation of every fence, tailored to the customer's requirements.",
    images: [asset("/images/product-05.png"), asset("/images/norma-panel-2.png"), asset("/images/fencing-enhanced-1.png"), asset("/images/fencing-enhanced-2.png")],
    variants: [
      { name: "Plot fencing", subtitle: "Full construction with panel or mesh", specs: [["Types", "Powder-coated panel, welded, chain-link"], ["Posts", "50×50 square posts, pipes, angle irons"], ["Accessories", "Clips, caps, turnbuckles, tensioners"]] },
      { name: "Farmland fencing", subtitle: "Durable construction for agricultural use", specs: [["Materials", "Welded or chain-link mesh"], ["Support", "Angle irons or galvanized pipes"]] },
      { name: "NATO-type military installation fencing", subtitle: "High security with concertina", specs: [["Type", "Mesh + barbed wire + concertina"], ["Security", "NATO type"]] },
      { name: "Solar park fencing", subtitle: "Built to specification", specs: [["Type", "Panel or galvanized mesh"], ["Height", "Made to order"]] },
      { name: "Livestock unit fencing", subtitle: "Special constructions for livestock", specs: [["Materials", "Welded mesh, angle irons"], ["Type", "Durable construction"]] },
    ] },
  { code: "15", groupKey: "constructions", title: "Agricultural Installations", tagline: "Metal constructions for agricultural installations and livestock units.", desc: "Posts and equipment for kiwi, asparagus, vineyards and greenhouses.",
    images: [asset("/images/agricultural-1.png")],
    variants: [
      { name: "Farmland post support", subtitle: "For kiwi, asparagus, vineyards", specs: [["Material", "Galvanized pipes & square posts"], ["Height", "1.50 – 2.00 – 2.50 – 3.00 m"], ["Construction", "Made to order"]] },
      { name: "Greenhouses", subtitle: "Metal frame, galvanized", specs: [["Frame", "Galvanized pipes"], ["Type", "Tunnel or polycarbonate"], ["Construction", "Made to order"]] },
      { name: "Vineyard equipment", subtitle: "Posts, wires, tensioners", specs: [["Posts", "Angle irons or pipes"], ["Tensioning wire", "Galvanized 2.20 – 2.70 mm"], ["Tensioners", "Metal"]] },
    ] },
  { code: "16", groupKey: "constructions", title: "Decorative Constructions", tagline: "Decorative metal constructions for gardens and outdoor spaces.", desc: "Decorative wire cages and gabion architectural solutions.",
    images: [asset("/images/decorative-1.png")],
    variants: [
      { name: "Decorative gabion «KORINA»", subtitle: "For gardens, landscaping & outdoor spaces", specs: [["Type", "Box or column"], ["Dimensions", "Made to order"], ["Wire thickness", "3.00 – 4.00 mm"], ["Filling", "Natural stone, pebbles"]] },
      { name: "Retaining walls", subtitle: "With natural stone, gabion system", specs: [["Height", "0.50 – 1.00 – 2.00+ m"], ["Width", "0.30 – 0.50 – 1.00 m"], ["Length", "Made to order"]] },
    ] },
];

const groupKeys = ["all", "mesh", "security", "materials", "constructions", "equipment"];
const groupLabels = {
  el: { all: "Όλα", mesh: "Πλέγματα", security: "Ασφάλεια", materials: "Υλικά", constructions: "Κατασκευές", equipment: "Εξοπλισμός" },
  en: { all: "All", mesh: "Mesh", security: "Security", materials: "Materials", constructions: "Constructions", equipment: "Equipment" },
};

function ImageCarousel({ images, alt, labels }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  function prev(e) {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function next(e) {
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="relative w-full h-40 border-b border-ink/10 overflow-hidden group">
      <img src={images[index]} alt={alt} className="w-full h-full object-cover" />
      {hasMultiple && (
        <>
          <button onClick={prev} aria-label={labels.prevImage} className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-ink/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            ‹
          </button>
          <button onClick={next} aria-label={labels.nextImage} className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-ink/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            ›
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProductCatalogue() {
  const { lang, t } = useLanguage();
  const categories = lang === "en" ? categoriesEn : categoriesEl;
  const [activeGroup, setActiveGroup] = useState("all");
  const [openCodes, setOpenCodes] = useState(new Set());

  function toggleCode(code) {
    setOpenCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }

  const filtered = activeGroup === "all" ? categories : categories.filter((c) => c.groupKey === activeGroup);

  const catalogueLabels = {
    prevImage: lang === "en" ? "Previous image" : "Προηγούμενη εικόνα",
    nextImage: lang === "en" ? "Next image" : "Επόμενη εικόνα",
  };

  return (
    <div>
      <div className="bg-ink pt-32 pb-14">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/" className="font-mono text-xs text-accent hover:underline">
            {lang === "en" ? "← Home" : "← Αρχική"}
          </Link>
          <h1 className="font-display font-700 text-3xl md:text-4xl text-white mt-4">
            {lang === "en" ? "Product Catalogue" : "Κατάλογος Προϊόντων"}
          </h1>
          <p className="text-white/60 mt-2 max-w-xl">
            {lang === "en"
              ? "Full range of wire mesh, fencing and metal construction products."
              : "Πλήρης γκάμα προϊόντων συρματουργίας, περίφραξης και μεταλλικών κατασκευών."}
          </p>
        </div>
      </div>

      <div className="bg-paper border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center gap-2">
          {groupKeys.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeGroup === g ? "bg-accent text-white" : "bg-white text-steel border border-ink/10 hover:bg-ink/[0.03]"
              }`}
            >
              {groupLabels[lang][g]}
            </button>
          ))}
          <span className="font-mono text-xs text-steel ml-2">
            {filtered.length} {lang === "en" ? "categories" : "κατηγορίες"}
          </span>
        </div>
      </div>

      <div className="bg-paper py-10">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filtered.map((cat) => {
            const isOpen = openCodes.has(cat.code);
            return (
              <div key={cat.code} className="bg-tag border border-ink/12 rounded-sm overflow-hidden flex flex-col">
                <ImageCarousel images={cat.images} alt={cat.title} labels={catalogueLabels} />
                <div className="p-5 flex flex-col">
                  <h3 className="font-display font-600 text-lg text-ink mb-1">{cat.title}</h3>
                  <p className="text-steel text-xs italic leading-relaxed mb-2">{cat.tagline}</p>
                  <p className="text-steel text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <button
                    onClick={() => toggleCode(cat.code)}
                    className="text-accent text-sm font-semibold flex items-center gap-1 hover:underline self-start"
                  >
                    {lang === "en" ? `View ${cat.variants.length} products` : `Δείτε τα ${cat.variants.length} προϊόντα`}
                    <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>⌄</span>
                  </button>

                  {isOpen && (
                    <div className="mt-4 space-y-3">
                      {cat.variants.map((v, vi) => (
                        <div key={vi} className="bg-white border border-ink/10 rounded-sm overflow-hidden">
                          <div className="p-3 pb-2">
                            <div className="font-semibold text-sm text-ink mb-0.5">{v.name}</div>
                            <div className="text-xs text-ink/75 font-medium">{v.subtitle}</div>
                          </div>
                          <table className="w-full border-t border-ink/10">
                            <tbody>
                              {v.specs.map(([label, value], si) => (
                                <tr key={si} className={si % 2 === 1 ? "bg-paper/60" : ""}>
                                  <td className="py-1.5 pl-3 pr-2 text-[11px] uppercase tracking-wide text-ink/70 font-semibold font-mono whitespace-nowrap align-top w-[38%]">
                                    {label}
                                  </td>
                                  <td className="py-1.5 pr-3 text-sm text-ink font-medium border-l border-ink/10 pl-2">{value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-6">
          <div className="bg-ink rounded-sm p-8 text-center">
            <h3 className="font-display font-700 text-xl text-white mb-2">
              {lang === "en" ? "Need a quote?" : "Θέλετε προσφορά;"}
            </h3>
            <p className="text-white/60 text-sm mb-5">
              {lang === "en"
                ? "Contact us for wholesale prices, custom orders and installation."
                : "Επικοινωνήστε μαζί μας για χονδρικές τιμές, custom παραγγελίες και εγκατάσταση."}
            </p>
            <Link to="/#contact" className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-sm transition-colors">
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
