// ==UserScript==
// @name        Monkeys Fact Checker
// @namespace   http://tampermonkey.net/
// @version     1.10
// @description Replaces words on websites.
// @author      DCI Marc
// @match       *://*/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    const wordReplacements = {
        "Verteidigungsministerium": "Reichskriegsministerium",
        "Verteidigungsministeriums": "Reichskriegsministeriums",
        "Verteidigungsminister": "Reichskriegsminister",
        "Verteidigungsministers": "Reichskriegsministers",
        "Wehrbeauftragter": "Wehrmachtsbeauftragter",
        "Wehrbeauftragten": "Wehrmachtsbeauftragten",
        "Wehrdienst": "Wehrmachtsdienst",
        "Wehrdienstes": "Wehrmachtsdienstes",
        "Wehrpflicht": "Wehrmachtspflicht",
        "Bundeswehr": "Wehrmacht",

        "Bundeskanzler": "Reichskanzler",
        "Bundeskanzlers": "Reichskanzlers",
        "Kanzler": "Führer",
        "Kanzlers": "Führers",

        "Auswärtige Amt": "Reichspropagandaministerium",
        "Auswärtiges Amt": "Reichspropagandaministeriums",

        "Finanzministerium": "Reichsfinanzministerium",
        "Finanzministeriums": "Reichsfinanzministeriums",
        "Finanzminister": "Reichsfinanzminister",
        "Finanzministers": "Reichsfinanzministers",

        "Wirtschaftsministerium": "Reichskapitalministerium",
        "Wirtschaftsministeriums": "Reichskapitalministeriums",
        "Wirtschaftsminister": "Reichskapitalminister",
        "Wirtschaftsministers": "Reichskapitalministers",

        "Bildungsministerium": "Reichsindoktrinationsministerium",
        "Bildungsministeriums": "Reichsindoktrinationsministeriums",
        "Bildungsminister": "Reichsindoktrinationsminister",
        "Bildungsministers": "Reichsindoktrinationsministers",

        "Arbeitsministerium": "Reichszwangsministerium",
        "Arbeitsministeriums": "Reichszwangsministeriums",
        "Arbeitsminister": "Reichszwangsminister",
        "Arbeitsministers": "Reichszwangsministers",

        "multinationale Zusammenarbeit": "Inlandskapitalinteressen",
        "internationale Zusammenarbeit": "Inlandskapitalinteressen",
        "Deutsche Einheit": "imperialistische Bestrebung",
        "Polizei": "Gestapo",
        "USA": "US Imperialisten",

        "AfD": "NSDAP",
        "CDU": "AfD",
        "SPD": "CDU",
        "Grünen": "SPD",
        "Grüne": "SPD",
        "Die Linke": "Die Grünen",
        "die Demokratie": "die Inlandskapitalinteressen",

        "Terrororganisation": "Widerstandsbewegung",
        "Hamas geführte Gesundheitsministerium": "palästinensische Gesundheitsministerium",
        "Gaza-Krieg": "Gaza-Völkermord",
        "Gaza Krieg": "Gaza Völkermord",
        "Gazakrieg": "Gaza Völkermord",
        "Krieg in Gaza": "Völkermord in Gaza",
        "Israel": "Terrorstaat Israel",

        "Friedrich Merz": "Haubitzenfritz",
        "Merz": "Haubitzenfritz",
        "Habeck": "\"Sexkanzler\" Habeck",
        "Hofreiter": "\"Panzertoni\" Hofreiter",
        "Strack-Zimmermann": "Strack-Ballermann",
        "Carlo Masala": "Carlo \"Massaker\" Masala",
        "Bodo Ramelow": "Bodo \"Am Israel Chai\" Ramelow",
        "Netanjahu": "Vökermörderer Netanjahu",
        "Donald Trump": "Mango Mussolini",
        "Trump": "Daddy",
        "J.D. Vance": "Mango Mussolini Lapdog",
        "Vance": "Jadolf Ditler",
    };

    function replaceWordsInTextNode(node) {
        let text = node.nodeValue;
        for (const [original, replacement] of Object.entries(wordReplacements)) {
            const regex = new RegExp(`(^|\\s|\\b)(${original})(-|\\b)`, 'gi');
            text = text.replace(regex, `$1${replacement}$3`);
        }
        node.nodeValue = text;
    }

    function traverseAndReplace(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            replaceWordsInTextNode(node);
            return;
        }

        for (const childNode of node.childNodes) {
            if (childNode.nodeName !== 'SCRIPT' && childNode.nodeName !== 'STYLE' && childNode.nodeName !== 'INPUT' && childNode.nodeName !== 'TEXTAREA') {
                traverseAndReplace(childNode);
            }
        }
    }

    window.addEventListener('load', () => {
        traverseAndReplace(document.body);
    });
})();