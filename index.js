// ==UserScript==
// @name        Simple word replacer
// @namespace   http://tampermonkey.net/
// @version     1.0
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
        "Bundeskanzler": "Reichskanzler",
        "Bundeskanzlers": "Reichskanzlers",
        "Auswärtige Amt": "Reichspropagandaministerium",
        "Auswärtiges Amt": "Reichspropagandaministeriums",
        "Finanzministerium": "Reichsfinanzministerium",
        "Finanzministeriums": "Reichsfinanzministeriums",
        "Wirtschaftsministerium": "Reichskapitalministerium",
        "Wirtschaftsministeriums": "Reichskapitalministeriums",
        "Bildungsministerium": "Reichsindoktrinationsministerium",
        "Bildungsministeriums": "Reichsindoktrinationsministeriums",
        "Arbeitsministerium": "Reichsarbeitsministerium",
        "Arbeitsministeriums": "Reichsarbeitsministeriums"
    };

    function replaceWordsInTextNode(node) {
        let text = node.nodeValue;
        for (const [original, replacement] of Object.entries(wordReplacements)) {
            const regex = new RegExp(`\\b${original}\\b`, 'gi');
            text = text.replace(regex, replacement);
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