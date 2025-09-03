// ==UserScript==
// @name        Simple word replacer
// @namespace   http://tampermonkey.net/
// @version     1.6
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

        "Friedrich Merz": "Haubitzenfritz",
        "Merz": "Haubitzenfritz",
        "Habeck": "\"Sexkanzler\" Habeck",
        "Hofreiter": "\"Panzertoni\" Hofreiter",
        "Strack-Zimmermann": "Strack-Ballermann",
        "Carlo Masala": "Carlo \"Massaker\" Masala",
        "Bodo Ramelow": "Bodo \"Am Israel Chai\" Ramelow",

        "multinationale Zusammenarbeit": "Inlandskapitalinteressen",
        "internationale Zusammenarbeit": "Inlandskapitalinteressen",
        "Deutsche Einheit": "imperialistische Bestrebung",
        "Polizei": "Gestapo",
        "USA": "US Imperialisten",

        "Die Linke": "Die Grünen",
        "Grüne": "SPD",
        "Grünen": "SPD",
        "SPD": "CDU",
        "CDU": "AfD",
        "AfD": "NSDAP",
        "die Demokratie": "die Inlandskapitalinteressen",

        "Terrororganisation": "Widerstandsbewegung",
        "Hamas geführte Gesundheitsministerium": "palästinensische Gesundheitsministerium",
        "Gaza-Krieg": "Gaza-Völkermord",
        "Gaza Krieg": "Gaza Völkermord",
        "Israel": "Terrorstaat Israel",
        "Netanjahu": "Vökermörderer Netanjahu"
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
        } else {
            for (const childNode of node.childNodes) {
                if (childNode.nodeName !== 'SCRIPT' && childNode.nodeName !== 'STYLE' && childNode.nodeName !== 'INPUT' && childNode.nodeName !== 'TEXTAREA') {
                    traverseAndReplace(childNode);
                }
            }
        }
    }

    window.addEventListener('load', () => {
        traverseAndReplace(document.body);
    });
})();