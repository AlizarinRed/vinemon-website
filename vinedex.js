function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

        function hexToRgb(hex) {
            let r = 0,
                g = 0,
                b = 0;
            // 3 digits
            if (hex.length == 4) {
                r = "0x" + hex[1] + hex[1];
                g = "0x" + hex[2] + hex[2];
                b = "0x" + hex[3] + hex[3];
                // 6 digits
            } else if (hex.length == 7) {
                r = "0x" + hex[1] + hex[2];
                g = "0x" + hex[3] + hex[4];
                b = "0x" + hex[5] + hex[6];
            }
            return "rgb(" + +r + "," + +g + "," + +b + ")";
        }
        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0');
        }
        function hexToHsl(H) {
            let r = 0,
                g = 0,
                b = 0;
            if (H.length == 4) {
                r = "0x" + H[1] + H[1];
                g = "0x" + H[2] + H[2];
                b = "0x" + H[3] + H[3];
            } else if (H.length == 7) {
                r = "0x" + H[1] + H[2];
                g = "0x" + H[3] + H[4];
                b = "0x" + H[5] + H[6];
            }
            r /= 255;
            g /= 255;
            b /= 255;
            let cmin = Math.min(r, g, b),
                cmax = Math.max(r, g, b),
                delta = cmax - cmin,
                h = 0,
                s = 0,
                l = 0;

            if (delta == 0) h = 0;
            else if (cmax == r) h = ((g - b) / delta) % 6;
            else if (cmax == g) h = (b - r) / delta + 2;
            else h = (r - g) / delta + 4;

            h = Math.round(h * 60);
            if (h < 0) h += 360;

            l = (cmax + cmin) / 2;
            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);

            return [h, s, l];
        }
        function hslToHex(h, s, l) {
            s /= 100;
            l /= 100;

            let c = (1 - Math.abs(2 * l - 1)) * s,
                x = c * (1 - Math.abs((h / 60) % 2 - 1)),
                m = l - c / 2,
                r = 0,
                g = 0,
                b = 0;

            if (0 <= h && h < 60) {
                r = c;
                g = x;
                b = 0;
            } else if (60 <= h && h < 120) {
                r = x;
                g = c;
                b = 0;
            } else if (120 <= h && h < 180) {
                r = 0;
                g = c;
                b = x;
            } else if (180 <= h && h < 240) {
                r = 0;
                g = x;
                b = c;
            } else if (240 <= h && h < 300) {
                r = x;
                g = 0;
                b = c;
            } else if (300 <= h && h < 360) {
                r = c;
                g = 0;
                b = x;
            }
            r = Math.round((r + m) * 255);
            g = Math.round((g + m) * 255);
            b = Math.round((b + m) * 255);

            return rgbToHex(r, g, b);
        }
        function lightenDarkenColor(hex, percent) {
            const [h, s, l] = hexToHsl(hex);
            const newLightness = Math.max(0, Math.min(100, l + percent));
            return hslToHex(h, s, newLightness);
        }
        function getEffectiveThemeColor(typeName, color) {
            let effectiveColor = color;
            const upperCaseType = typeName.toUpperCase();

            switch (upperCaseType) {
                case 'ROCK':
                    effectiveColor = lightenDarkenColor(color, 20);
                    break;
                case 'ASTRAL':
                    effectiveColor = lightenDarkenColor(color, 30);
                    break;
                case 'CHAOS':
                    effectiveColor = lightenDarkenColor(color, 20);
                    break;
                case 'GHOST':
                    effectiveColor = lightenDarkenColor(color, -10);
                    break;
                case 'STEEL':
                    effectiveColor = lightenDarkenColor(color, -10);
                    break;
                case 'POISON':
                    effectiveColor = lightenDarkenColor(color, -5);
                    break;
                case 'GRASS':
                    effectiveColor = lightenDarkenColor(color, -10);
                    break;
                case 'NORMAL':
                    effectiveColor = lightenDarkenColor(color, -10);
                    break;
                case 'BUG':
                    effectiveColor = lightenDarkenColor(color, -10);
                    break;
                case 'FIRE':
                    effectiveColor = lightenDarkenColor(color, -10);
                    break;
                case 'FLYING':
                    effectiveColor = lightenDarkenColor(color, -20);
                    break;
                case 'LIGHT':
                    effectiveColor = lightenDarkenColor(color, -20);
                    break;
                case 'PSYCHIC':
                    effectiveColor = lightenDarkenColor(color, -15);
                    break;
                case 'WATER':
                    effectiveColor = lightenDarkenColor(color, -15);
                    break;
                case 'DRAGON':
                    effectiveColor = lightenDarkenColor(color, 10);
                    break;
                case 'ICE':
                    effectiveColor = lightenDarkenColor(color, -30);
                    break;
                case 'ELECTRIC':
                    let [h, s, l] = hexToHsl(color);
                    h = 40; 
                    effectiveColor = hslToHex(h, s, l);
                    break;
            }
            return effectiveColor;
        }


        function getBackgroundImageFilter(typeName, color) {
            const upperCaseType = typeName.toUpperCase();

            switch (upperCaseType) {
                case 'ROCK':
                    return 'saturate(0.7) hue-rotate(-25deg) brightness(0.6)';

                case 'NORMAL':
                    return 'saturate(0) brightness(2.5)';

                case 'DARK':
                    return 'saturate(0) brightness(1.5)';

                default:
                    const [h, s, l] = hexToHsl(color);
                    return `saturate(3) brightness(0.6) hue-rotate(${h}deg)`;
            }
        }


        function generateSingleTypeTheme(accentColor, typeName) {
            const effectiveAccentColor = getEffectiveThemeColor(typeName, accentColor);
            const [h, s, l] = hexToHsl(accentColor);

            return {
                "--glow-color": `${accentColor}40`,
                "--main-bg-color": lightenDarkenColor(effectiveAccentColor, -45),
                "--text-color": "#FFFFFF",
                "--link-color": accentColor,
                "--header-bg": lightenDarkenColor(effectiveAccentColor, -50),
                "--header-shadow": "#000",
                "--header-border-bottom": accentColor,
                "--header-border-top": lightenDarkenColor(effectiveAccentColor, -35),
                "--card-bg": "#00000050",
                "--card-shadow": "#000",
                "--card-border": accentColor,
                "--info-header-bg": accentColor,
                "--info-header-border": lightenDarkenColor(accentColor, 10),
                "--info-body-bg": lightenDarkenColor(effectiveAccentColor, -35),
                "--info-body-border": accentColor,
                "--button-bg": accentColor,
                "--button-border": lightenDarkenColor(accentColor, 10),
                "--button-bg-hover": lightenDarkenColor(accentColor, 5),
                "--button-border-hover": lightenDarkenColor(accentColor, 15),
                "--button-bg-active": lightenDarkenColor(accentColor, -35),
                "--button-bg-active-hover": lightenDarkenColor(accentColor, -30),
                "--button-hover-brightness": "1.2",
                "--bar-color": accentColor,
                "--scrollbar-thumb-color": accentColor,
                "--scrollbar-track-color": lightenDarkenColor(effectiveAccentColor, -45),
                "--ability-badge-border": lightenDarkenColor(accentColor, 10),
                "--body-bg-filter": getBackgroundImageFilter(typeName, accentColor),
                "--body-bg-display": "block",
                "--viewVinemonBtn-bg": '#144b4d',
                "--viewVinemonBtn-border": '#1c666b',
                "--viewAbilitiesBtn-bg": '#530400',
                "--viewAbilitiesBtn-border": '#860006',
                "--viewMovesBtn-bg": '#1b4a6b',
                "--viewMovesBtn-border": '#406a99',
                "--viewItemsBtn-bg": '#441d70',
                "--viewItemsBtn-border": '#724293',
                "--typeChartBtn-bg": '#6b1b50',
                "--typeChartBtn-border": '#843c5f',
            };
        }
        function generateDualTypeTheme(accentColor1, accentColor2, primaryTypeName, secondaryTypeName) {
            const effectiveAccentColor2 = getEffectiveThemeColor(secondaryTypeName, accentColor2);
            const [h, s_prime, l_prime] = hexToHsl(accentColor1);

            return {
                "--glow-color": `${accentColor1}40`,
                "--main-bg-color": lightenDarkenColor(effectiveAccentColor2, -50),
                "--text-color": "#FFFFFF",
                "--link-color": accentColor1,
                "--header-bg": lightenDarkenColor(effectiveAccentColor2, -55),
                "--header-shadow": "#000",
                "--header-border-bottom": accentColor1,
                "--header-border-top": lightenDarkenColor(effectiveAccentColor2, -40),
                "--card-bg": "#00000050",
                "--card-shadow": "#000",
                "--card-border": accentColor1,
                "--info-header-bg": accentColor1,
                "--info-header-border": lightenDarkenColor(accentColor1, 10),
                "--info-body-bg": lightenDarkenColor(effectiveAccentColor2, -40),
                "--info-body-border": accentColor1,
                "--button-bg": accentColor1,
                "--button-border": lightenDarkenColor(accentColor1, 10),
                "--button-bg-hover": lightenDarkenColor(accentColor1, 5),
                "--button-border-hover": lightenDarkenColor(accentColor1, 15),
                "--button-bg-active": lightenDarkenColor(accentColor1, -40),
                "--button-bg-active-hover": lightenDarkenColor(accentColor1, -45),
                "--button-hover-brightness": "1.2",
                "--bar-color": accentColor1,
                "--scrollbar-thumb-color": accentColor1,
                "--scrollbar-track-color": lightenDarkenColor(effectiveAccentColor2, -50),
                "--ability-badge-border": lightenDarkenColor(accentColor1, 10),
                "--body-bg-filter": getBackgroundImageFilter(primaryTypeName, accentColor1),
                "--body-bg-display": "block",
                "--viewVinemonBtn-bg": '#144b4d',
                "--viewVinemonBtn-border": '#1c666b',
                "--viewAbilitiesBtn-bg": '#530400',
                "--viewAbilitiesBtn-border": '#860006',
                "--viewMovesBtn-bg": '#1b4a6b',
                "--viewMovesBtn-border": '#406a99',
                "--viewItemsBtn-bg": '#441d70',
                "--viewItemsBtn-border": '#724293',
                "--typeChartBtn-bg": '#6b1b50',
                "--typeChartBtn-border": '#843c5f',
            };
        }

        const themes = {
            default: {
                "--glow-color": "#00abff36",
                "--main-bg-color": "#230101",
                "--text-color": "#FFFFFF",
                "--link-color": "#A90024",
                "--header-bg": "#202020",
                "--header-shadow": "#000",
                "--header-border-bottom": "#860006",
                "--header-border-top": "#333",
                "--card-bg": "#00000050",
                "--card-shadow": "#000",
                "--card-border": "#860006",
                "--info-header-bg": "#860006",
                "--info-header-border": "#A90024",
                "--info-body-bg": "#530400",
                "--info-body-border": "#860006",
                "--button-bg": "#860006",
                "--button-border": "#A90024",
                "--button-bg-hover": "#ae0008",
                "--button-border-hover": "#dc002f",
                "--button-bg-active": "#2d0200",
                "--button-bg-active-hover": "#480300",
                "--button-hover-brightness": "1.3",
                "--bar-color": "#A90024",
                "--scrollbar-thumb-color": "#860006",
                "--scrollbar-track-color": "#530400",
                "--ability-badge-border": "#A90024",
                "--viewVinemonBtn-bg": "#144b4d",
                "--viewVinemonBtn-border": "#1c666b",
                "--viewAbilitiesBtn-bg": "#530400",
                "--viewAbilitiesBtn-border": "#860006",
                "--viewMovesBtn-bg": "#1b4a6b",
                "--viewMovesBtn-border": "#406a99",
                "--viewItemsBtn-bg": "#441d70",
                "--viewItemsBtn-border": "#724293",
                "--typeChartBtn-bg": "#6b1b50",
                "--typeChartBtn-border": "#843c5f",
                "--body-bg-filter": "none",
                "--body-bg-display": "block", 
            },
            night: {
                "--glow-color": "#8cb3ff20",
                "--main-bg-color": "#000000",
                "--text-color": "#E0E0E0",
                "--link-color": "#8cb3ff",
                "--header-bg": "#111111",
                "--header-shadow": "#000",
                "--header-border-bottom": "#333",
                "--header-border-top": "#2A2A2A",
                "--card-bg": "rgba(20, 20, 20, 0.5)",
                "--card-shadow": "#000",
                "--card-border": "#333",
                "--info-header-bg": "#1C1C1C",
                "--info-header-border": "#444",
                "--info-body-bg": "#111111",
                "--info-body-border": "#333",
                "--button-bg": "#333",
                "--button-border": "#555",
                "--button-bg-hover": "#444",
                "--button-border-hover": "#666",
                "--button-bg-active": "#222",
                "--button-bg-active-hover": "#333",
                "--button-hover-brightness": "1.1",
                "--bar-color": "#8cb3ff",
                "--scrollbar-thumb-color": "#555",
                "--scrollbar-track-color": "#111",
                "--ability-badge-border": "#555",
                "--viewVinemonBtn-bg": "#333",
                "--viewVinemonBtn-border": "#555",
                "--viewAbilitiesBtn-bg": "#333",
                "--viewAbilitiesBtn-border": "#555",
                "--viewMovesBtn-bg": "#333",
                "--viewMovesBtn-border": "#555",
                "--viewItemsBtn-bg": "#333",
                "--viewItemsBtn-border": "#555",
                "--typeChartBtn-bg": "#333",
                "--typeChartBtn-border": "#555",
                "--body-bg-filter": "none",
                "--body-bg-display": "none", 
            },

            despair: {
                "--glow-color": "#ff00005e",
                "--main-bg-color": "#1a1a1a",
                "--text-color": "#e0e0e0",
                "--link-color": "#ff4d4d",
                "--header-bg": "#101010",
                "--header-shadow": "#000",
                "--header-border-bottom": "#660000",
                "--header-border-top": "#222",
                "--card-bg": "#2a2a2a80",
                "--card-shadow": "#000",
                "--card-border": "#660000",
                "--info-header-bg": "#660000",
                "--info-header-border": "#8b0000",
                "--info-body-bg": "#400000",
                "--info-body-border": "#660000",
                "--button-bg": "#660000",
                "--button-border": "#8b0000",
                "--button-bg-hover": lightenDarkenColor("#660000", 5),
                "--button-border-hover": lightenDarkenColor("#660000", 15),
                "--button-bg-active": lightenDarkenColor("#660000", -15),
                "--button-bg-active-hover": lightenDarkenColor("#660000", -10),
                "--bar-color": "#8b0000",
                "--button-hover-brightness": "1.3",
                "--scrollbar-thumb-color": "#660000",
                "--scrollbar-track-color": "#1a1a1a",
                "--ability-badge-border": "#8b0000",
                "--viewVinemonBtn-bg": "#144b4d",
                "--viewVinemonBtn-border": "#1c666b",
                "--viewAbilitiesBtn-bg": "#530400",
                "--viewAbilitiesBtn-border": "#860006",
                "--viewMovesBtn-bg": "#1b4a6b",
                "--viewMovesBtn-border": "#406a99",
                "--viewItemsBtn-bg": "#441d70",
                "--viewItemsBtn-border": "#724293",
                "--typeChartBtn-bg": "#6b1b50",
                "--typeChartBtn-border": "#843c5f",
                "--body-bg-filter": "none",
                "--body-bg-display": "block", 
            },
        };

        function applyTheme(themeName) {
            let themeToApply;

            if (themeName === 'dynamic') {
                const currentId = document.getElementById("vinemonSelect").value;
                if (typeof vinemonData !== 'undefined' && vinemonData[currentId]) {
                    const mon = vinemonData[currentId];
                    const type1 = mon.types[0];
                    const type2 = mon.types.length > 1 ? mon.types[1] : null;
                    const color1 = typeColors[type1.toUpperCase()];

                    if (type2) {
                        const color2 = typeColors[type2.toUpperCase()];
                        themeToApply = generateDualTypeTheme(color1, color2, type1, type2);
                    } else {
                        themeToApply = generateSingleTypeTheme(color1, type1);
                    }

                } else {
                    themeToApply = themes.default;
                }
            } else {
                themeToApply = themes[themeName] || themes.default;
            }

            const root = document.documentElement;
            for (const [key, value] of Object.entries(themeToApply)) {
                root.style.setProperty(key, value);
            }

            const statValueStyleOverride = document.getElementById('day-theme-stat-override');
            if (statValueStyleOverride) {
                statValueStyleOverride.remove();
            }

            if (themeName === 'day') {
                const style = document.createElement('style');
                style.id = 'day-theme-stat-override';
                style.innerHTML = `
                .stat-bar .stat-value {
                    color: #212121 !important;
                    text-shadow: none !important;
                }
            `;
                document.head.appendChild(style);
            }

            document.getElementById('viewVinemonBtn').style.background = themeToApply['--viewVinemonBtn-bg'];
            document.getElementById('viewVinemonBtn').style.borderColor = themeToApply['--viewVinemonBtn-border'];
            document.getElementById('viewAbilitiesBtn').style.background = themeToApply['--viewAbilitiesBtn-bg'];
            document.getElementById('viewAbilitiesBtn').style.borderColor = themeToApply['--viewAbilitiesBtn-border'];
            document.getElementById('viewMovesBtn').style.background = themeToApply['--viewMovesBtn-bg'];
            document.getElementById('viewMovesBtn').style.borderColor = themeToApply['--viewMovesBtn-border'];
            document.getElementById('viewItemsBtn').style.background = themeToApply['--viewItemsBtn-bg'];
            document.getElementById('viewItemsBtn').style.borderColor = themeToApply['--viewItemsBtn-border'];
            document.getElementById('typeChartBtn').style.background = themeToApply['--typeChartBtn-bg'];
            document.getElementById('typeChartBtn').style.borderColor = themeToApply['--typeChartBtn-border'];

            localStorage.setItem("vinemonTheme", themeName);
        }

        function initializeThemes() {

            if (typeof typeColors !== 'undefined') {
                for (const type in typeColors) {
                    const color = typeColors[type];
                    themes[type.toLowerCase()] = generateSingleTypeTheme(color, type);
                }
            }

            const themeSelect = document.getElementById("themeSelect");
            if (!themeSelect) return;

            themeSelect.innerHTML = ''; 
            const standardGroup = document.createElement('optgroup');
            standardGroup.label = 'Standard Themes';
            standardGroup.appendChild(new Option('VineGear Theme', 'default'));
            standardGroup.appendChild(new Option('Night Theme', 'night'));

            themeSelect.appendChild(standardGroup);

            const dynamicGroup = document.createElement('optgroup');
            dynamicGroup.label = 'Dynamic Theme';
            dynamicGroup.appendChild(new Option('Dynamic Theme', 'dynamic'));
            themeSelect.appendChild(dynamicGroup);

            if (typeof typeColors !== 'undefined') {
                const typeGroup = document.createElement('optgroup');
                typeGroup.label = 'Type Themes';
                Object.keys(typeColors).sort().forEach(type => {
                    const option = new Option(type.charAt(0) + type.slice(1).toLowerCase(), type.toLowerCase());
                    typeGroup.appendChild(option);
                });
                themeSelect.appendChild(typeGroup);
            }

            const savedTheme = localStorage.getItem("vinemonTheme") || "default";
            themeSelect.value = savedTheme;
            applyTheme(savedTheme);

            themeSelect.addEventListener("change", (e) => {
                applyTheme(e.target.value);
            });


            if ('MutationObserver' in window) {
                const observer = new MutationObserver(function(mutations) {
                    if (document.getElementById('themeSelect').value === 'dynamic') {
                        applyTheme('dynamic');
                    }
                });

                const monNameElement = document.getElementById('monName');
                if (monNameElement) {
                    observer.observe(monNameElement, {
                        childList: true,
                        characterData: true,
                        subtree: true
                    });
                }
            }
        }

        function applyCorruption(canvas) {
            const ctx = canvas.getContext('2d', {
                willReadFrequently: true
            });
            const width = canvas.width;
            const height = canvas.height;

            const frameWidth = (width > height * 2) ? height : width;
            const half_width = frameWidth / 2;

            let iterations = 0;
            let xdest_max, ydest_max, xsrc_max, ysrc_max;

            if (half_width >= 82) {
                iterations = 195;
                xdest_max = width - 9;
                ydest_max = height - 5;
                xsrc_max = width - 9;
                ysrc_max = height - 11;
            } else if (half_width >= 66) {
                iterations = 154;
                xdest_max = width - 5;
                ydest_max = height - 3;
                xsrc_max = width - 7;
                ysrc_max = height - 9;
            } else if (half_width >= 48) {
                iterations = 75;
                xdest_max = width - 5;
                ydest_max = height - 3;
                xsrc_max = width - 7;
                ysrc_max = height - 9;
            } else if (half_width >= 35) {
                iterations = 37;
                xdest_max = width - 3;
                ydest_max = height - 2;
                xsrc_max = width - 5;
                ysrc_max = height - 7;
            } else {
                iterations = 15;
                xdest_max = width - 3;
                ydest_max = height - 2;
                xsrc_max = width - 5;
                ysrc_max = height - 7;
            }

            for (let i = 0; i < iterations; i++) {
                const xdest = Math.floor(Math.random() * Math.max(0, xdest_max));
                const ydest = Math.floor(Math.random() * Math.max(0, ydest_max));
                const xsrc = Math.floor(Math.random() * Math.max(0, xsrc_max));
                const ysrc = Math.floor(Math.random() * Math.max(0, ysrc_max));
                ctx.clearRect(xdest, ydest, 4, 4);
                ctx.drawImage(canvas, xsrc, ysrc, 16, 16, xdest, ydest, 16, 16);
                ctx.clearRect(xsrc, ysrc, 4, 4);
            }


            for (let i = 0; i < 40; i++) {
                const xdest = Math.floor(Math.random() * (width - 5));
                const ydest = Math.floor(Math.random() * (height - 3));
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
                ctx.fillRect(xdest, ydest, 2, 2);
            }
        }

        const typeColors = {
            NORMAL: "#b4b4b4",
            FIRE: "#ff9d55",
            WATER: "#6dacf1",
            ELECTRIC: "#f4d23c",
            GRASS: "#5ec392",
            ICE: "#9ff0e4",
            FIGHTING: "#da4545",
            POISON: "#8655bd",
            GROUND: "#a99672",
            FLYING: "#b8d3e5",
            PSYCHIC: "#fa71a8",
            BUG: "#b6d474",
            ROCK: "#684b3b",
            GHOST: "#a390b8",
            DRAGON: "#0a76d4",
            DARK: "#706a7e",
            STEEL: "#7ca0ab",
            FAIRY: "#D685AD",
            MYSTERY: "#13ffad",
            SOUND: "#FF6F61",
            COSMIC: "#6E44FF",
            CHAOS: "#5E2A2A",
            LIGHT: "#FFF44F",
            SHADOW: "#2B2B52",
            ASTRAL: "#350053"
        };



        const breedingGroupColors = {
            Monster: "#97724C",
            Humanlike: "#47B7AE",
            Water1: "#6BD1F9",
            Water2: "#4B94ED",
            Water3: "#2271B4",
            Bug: "#AAC22A",
            Mineral: "#979067",
            Flying: "#90AFF1",
            Amorphous: "#9F82CC",
            Field: "#E5BA65",
            Fairy: "#FF9EB9",
            Ditto: "#B6AAD5",
            Grass: "#82D25A",
            Dragon: "#5E57BF",
            Legendary: "#DF2B2B"
        };
        const flagStyles = {
            "CAN BE SNATCHED": {
                "background-color": "#000000"
            },
            "HEALING MOVE": {
                "background-color": "#228B22"
            },
            "MAKES CONTACT": {
                "background-color": "#E59400"
            },
            "HITS ALL OPPOSING": {
                "background-color": "#FFFFFF"
            },
            "BOMB MOVE": {
                "background-color": "#F08080"
            },
            "HITS USER OR ALLY": {
                "background-color": "#006400"
            },
            "SLASHING MOVE": {
                "background-color": "#A0A0A0"
            },
            "HIGH CRIT RATE": {
                "background-color": "#B22222"
            },
            "WIND MOVE": {
                "background-color": "#A8D8EA"
            },
            "TRAPPING MOVE": {
                "background-color": "#00008B"
            },
            "HITS 3-7 TIMES": {
                "background-color": "#FFFACD"
            },
            "HITS 2-5 TIMES": {
                "background-color": "#FFD700"
            },
            "HITS TWICE": {
                "background-color": "#B8860B"
            },
            "PUNCHING MOVE": {
                "background-color": "#D2691E"
            },
            "CAN BE MAGIC COATED": {
                "background-color": "#FF69B4"
            },
            "PULSE MOVE": {
                "background-color": "#DDA0DD"
            },
            "BITING MOVE": {
                "background-color": "#8A2BE2"
            },
            "HITS RANDOM OPPOSING": {
                "background-color": "#4B0082"
            },
            "RECHARGE MOVE": {
                "background-color": "#90EE90"
            },
            "KICKING MOVE": {
                "background-color": "#FFDAB9"
            },
            "SOUND MOVE": {
                "background-color": "#F5DEB3"
            },
            "HITS ALL BUT USER": {
                "background-color": "#D3D3D3"
            },
            "RECOIL MOVE": {
                "background-color": "#FF4500"
            },
            "BEAM MOVE": {
                "background-color": "#20B2AA"
            },
            "THAWS USER IF FROZEN": {
                background: "linear-gradient(to right, #ADD8E6, #FFA500)"
            },
            "IGNORES PROTECT": {
                background: "linear-gradient(to right, #FFEE00, #FFC0CB)"
            },
            "POWDER MOVE": {
                "background-color": "#9ACD32"
            },
            "DANCING MOVE": {
                "background-color": "#C71585"
            },
            "HITS USER SIDE": {
                "background-color": "#008B8B"
            },
            "TARGETS DIRECTLY IN FRONT OF USER": {
                background: "linear-gradient(to right, #808080, #B22222)"
            }
        };

        const priorityFlags = [
            "+1 PRIORITY",
            "-1 PRIORITY",
            "-2 PRIORITY",
            "-3 PRIORITY",
            "-4 PRIORITY",
            "-5 PRIORITY",
            "-6 PRIORITY"
        ];


        function isBaseForm(vinemonId) {
            const mon = vinemonData[vinemonId];
            if (!mon || !preEvoMap) return false;

            return !preEvoMap[mon.name.toUpperCase()];
        }


        function resetEggView() {
            currentAnimationId++;
            if (!isShowingEgg) return; 

            isShowingEgg = false;;

            const spriteImg = document.getElementById('spriteImg');
            const animatedSpriteDiv = document.getElementById('animatedSpriteDiv');
            const activeSpriteElement = window.getComputedStyle(animatedSpriteDiv).display !== 'none' ? animatedSpriteDiv : spriteImg;
            if (activeSpriteElement) {
                activeSpriteElement.style.opacity = 1;
            }

            const hatchContainer = document.getElementById('hatchContainer');
            hatchContainer.style.opacity = 0;
            hatchContainer.style.pointerEvents = 'none';
            hatchContainer.style.display = 'none';


            const viewEggBtn = document.getElementById('viewEggBtn');
            if (viewEggBtn) {
                viewEggBtn.textContent = 'View Egg';
                viewEggBtn.disabled = false;
            }
        }


        async function playHatchAnimation(id, onFlashCallback, audioContext, playSound, cryGainNode, animationRunId) {
            const hatchSpriteScaler = document.getElementById("hatchSpriteScaler");
            const hatchEggDiv = document.getElementById("hatchEggDiv");
            const hatchCrackDiv = document.getElementById("hatchCrackDiv");
            const hatchWhiteOverlay = document.getElementById("hatchWhiteOverlay");

            hatchEggDiv.style.backgroundImage = 'none';
            hatchCrackDiv.style.backgroundImage = 'none';
            hatchCrackDiv.style.backgroundPosition = '0 0';
            hatchCrackDiv.style.opacity = 1;
            hatchSpriteScaler.classList.remove('egg-wobble-1', 'egg-wobble-2', 'egg-wobble-3');
            hatchEggDiv.style.transform = '';

            try {
                const paddedId = String(id).padStart(3, "0");
                const eggSpriteUrl = `https://vinemon.link/vinemon/vinemon/eggs/${paddedId}.png`;
                const specificCrackUrl = `https://vinemon.link/vinemon/vinemon/eggs/${paddedId}cracks.png`;
                const fallbackCrackUrl = `https://vinemon.link/vinemon/vinemon/eggs/eggcracks.png`;

                const loadImage = (url) => new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
                    img.src = url;
                });

                const crackSheetPromise = loadImage(specificCrackUrl).catch(() => loadImage(fallbackCrackUrl));
                const [eggImg, crackSheet] = await Promise.all([
                    loadImage(eggSpriteUrl),
                    crackSheetPromise
                ]);

                const animWidth = crackSheet.width / 5;
                const animHeight = crackSheet.height;

                [hatchCrackDiv, hatchSpriteScaler].forEach(el => {
                    el.style.width = `${animWidth}px`;
                    el.style.height = `${animHeight}px`;
                });

                hatchEggDiv.style.width = `${eggImg.width}px`;
                hatchEggDiv.style.height = `${eggImg.height}px`;

                const offsetY = (animHeight - eggImg.height) / 2;
                const offsetX = (animWidth - eggImg.width) / 2;
                hatchEggDiv.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

                hatchEggDiv.style.backgroundImage = `url(${eggImg.src})`;
                hatchCrackDiv.style.backgroundImage = `url(${crackSheet.src})`;
                hatchCrackDiv.style.backgroundSize = `${crackSheet.width}px ${crackSheet.height}px`;

                const setCrackFrame = (frame) => {
                    hatchCrackDiv.style.backgroundPosition = `-${frame * animWidth}px 0`;
                };

                if (animationRunId !== currentAnimationId) return false;
                setCrackFrame(0);
                hatchSpriteScaler.classList.add('egg-wobble-1');
                await sleep(400);
                if (animationRunId !== currentAnimationId) return false;

                hatchSpriteScaler.classList.remove('egg-wobble-1');
                await sleep(400);
                if (animationRunId !== currentAnimationId) return false;

                setCrackFrame(1);
                await sleep(100);
                if (animationRunId !== currentAnimationId) return false;
                hatchSpriteScaler.classList.add('egg-wobble-1');
                await sleep(400);
                if (animationRunId !== currentAnimationId) return false;

                hatchSpriteScaler.classList.remove('egg-wobble-1');
                await sleep(400);
                if (animationRunId !== currentAnimationId) return false;

                setCrackFrame(2);
                await sleep(100);
                if (animationRunId !== currentAnimationId) return false;
                hatchSpriteScaler.classList.add('egg-wobble-2');
                await sleep(400);
                if (animationRunId !== currentAnimationId) return false;

                hatchSpriteScaler.classList.remove('egg-wobble-2');
                await sleep(200);
                if (animationRunId !== currentAnimationId) return false;

                setCrackFrame(3);
                await sleep(100);
                if (animationRunId !== currentAnimationId) return false;
                hatchSpriteScaler.classList.add('egg-wobble-3');

                setCrackFrame(4);
                await sleep(1200);
                if (animationRunId !== currentAnimationId) return false;

                hatchWhiteOverlay.style.opacity = 1;
                await sleep(50);
                if (animationRunId !== currentAnimationId) return false;

                if (typeof onFlashCallback === 'function') {
                    await onFlashCallback();
                }

                const cryUrl = `https://vinemon.link/cries/${paddedId}Cry.ogg`;
                fetch(cryUrl)
                    .then(response => response.arrayBuffer())
                    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                    .then(decodedCryBuffer => {
                        if (animationRunId === currentAnimationId) {
                            const isCorrupted = document.getElementById("corruptionToggle").checked;
                            let pitch = 1.0;
                            if (isCorrupted) {
                                const randomPart1 = Math.floor(Math.random() * 66);
                                const randomPart2 = Math.floor(Math.random() * 6);
                                pitch = (100 - randomPart1 + randomPart2) / 100.0;
                            }
                            playSound(decodedCryBuffer, cryGainNode, pitch);
                        }
                    })
                    .catch(e => console.error("Error playing hatch cry:", e));

                await sleep(500);
                if (animationRunId !== currentAnimationId) return false;

                hatchWhiteOverlay.style.opacity = 0;
                return true;
            } catch (error) {
                console.error("Hatch animation failed, critical assets missing for ID:", id, error);
                document.getElementById('hatchContainer').style.display = 'none';
                document.getElementById('hatchWhiteOverlay').style.opacity = 0;
                return false;
            }
        }

        function determineRandomForm(vinemonId, hasFemaleSprite) {
            const result = {
                shiny: Math.random() < 0.06, 
                corruption: Math.random() < 0.03
            };

            const mon = vinemonData[vinemonId];
            const genderMap = {
                AlwaysFemale: {
                    probability: 1.0
                },
                AlwaysMale: {
                    probability: 0.0
                },
                Genderless: {
                    probability: 0.0
                },
                FemaleOneEighth: {
                    probability: 0.125
                },
                FemaleSevenEighths: {
                    probability: 0.875
                },
                Female25Percent: {
                    probability: 0.25
                },
                Female50Percent: {
                    probability: 0.50
                },
                Female75Percent: {
                    probability: 0.75
                }
            };

            const genderInfo = genderMap[mon.genderRate] || {
                probability: 0.0
            };

            if (hasFemaleSprite && genderInfo.probability > 0) {
                result.female = Math.random() < genderInfo.probability;
            } else {
                result.female = false;
            }

            return result;
        }
        const fullCreatorData = {
            // --- Existing creators from your original file ---
            HOODLUMCALLUM: {
                pfp: "https://alizarin.red/images/HoodCal_profile.jpg",
                bio: "HoodlumCallum is a Veteran PokeTuber known for his Romhack and Fan Game playthroughs, which have helped spawn concepts and ideas for Vinemon! Shorts and Pants are Callum's Mascots! If you are a Youtuber, Cal does do Youtube Thumbnail Commissions!",
                socials: { Bluesky: "https://bsky.app/profile/hoodcal.com", "Main YouTube": "https://www.youtube.com/@HoodlumCallum", "Secondary YouTube": "https://www.youtube.com/@HoodCal", "Third YouTube": "https://www.youtube.com/@HoodlumPantsLizard", Twitch: "https://www.twitch.tv/hoodlumcallum", Twitter: "https://twitter.com/hoodlumcallum", Discord: "https://discord.gg/hoodlum", TikTok: "https://www.tiktok.com/@hoodlumcallum", Merch: "https://hoodcal.com/" }
            },
            SENOISHI: {
                pfp: "https://alizarin.red/images/Sehnoishi_profile.png",
                bio: "Senoishi is a talented artist and contributed a few Vinemon, such as the Plagy-line and the Turtant-line. Outside of Vinemon, we've made Clownpube's Sprites! They are known for their distinctive art style, shitposts, and creative designs. They actively accept commissions!",
                socials: { Bluesky: "https://bsky.app/profile/senoishi.bsky.social", Tumblr: "https://senoishi.tumblr.com/", Twitter: "https://twitter.com/sehnoishi", YouTube: "https://www.youtube.com/@Senoishi" }
            },
            ALTARIASONG: {
                pfp: "https://alizarin.red/images/AltariaSong_profile.png",
                bio: "Altariasong is a skilled artist who designed the first ever Vineshroom Plush for the 2015 Charity Stream! For Vinemon, they designed Pugcakes and even have their own NPC attached to the game's Fetch Quest. Can you beat them in a battle? Hopefully someday we might see their evolution of Pugcakes in game!",
                socials: {}
            },
            PUTUK: {
                pfp: "https://alizarin.red/images/PUTUK_profile.jpg",
                bio: "Putuk is a creative force behind the Trappit-Line, Pyromid-Line, and Blastropod's Design! Their art has an exceedingly unique style and they actively accept commissions!",
                socials: { Website: "https://beewolf-burrow.neocities.org/", Bluesky: "https://bsky.app/profile/putukspitsvenom.bsky.social", Tumblr: "https://putuksstuff.tumblr.com/", Twitter: "https://x.com/putukspitsvenom", Newgrounds: "https://putukspitsvenom.newgrounds.com/", YouTube: "https://www.youtube.com/@Putuk22", Twitch: "https://www.twitch.tv/putuk" }
            },
            GLORY2SNOWSTAR: {
                pfp: "https://alizarin.red/images/glory2snowstar_profile.png",
                bio: "Glory2Snowstar is a lover of Marine Life and Bats! If you have frequented many of Vinesauce's Comment sections, you most likely have run into one of their comments! They conceptualized and created, Mafula, Doldrunge, and the Ectasea-line with the help of Riviera!",
                socials: { Bluesky: "https://bsky.app/profile/glory2snowstar.bsky.social", Twitter: "https://twitter.com/Glory2Snowstar", YouTube: "https://www.youtube.com/@Glory2Snowstar", Itchio: "https://glory2snowstar.itch.io/", Twitch: "https://www.twitch.tv/glory2snowstar/" }
            },
            RIVIERA: {
                pfp: "https://alizarin.red/images/Riviera_profile.png",
                bio: "Riviera is an artist who has contributed and supplied support during the first Vinemon Submission Contest by making their art into pixel art, all while helping to expand the unique world of Fanoth! The designs they contributed to are the Mafula, Doldrunge, and the Ectasea-line. Designs they solely made were Voxerd, Mudclab, and Vixine!",
                socials: {}
            },
            HARMONICKY: {
                pfp: "https://alizarin.red/images/harmonicky_profile.jpg",
                bio: "Harmonicky is a Vinemon Designer who contributed the Chimpeese-line and M'preagle! She makes great art and streams from time to time on Twitch! Go check her out!",
                socials: { Bluesky: "https://bsky.app/profile/harmonicky.bsky.social", Twitch: "https://www.twitch.tv/harmonickytv" }
            },
            ENNUIKAL: {
                pfp: "https://alizarin.red/images/Ennuikal_profile.jpg",
                bio: "Ennuikal is a Vinemon Designer who created Ghanoose to Vinemon! Thankfully, this cursed creature is stuck in Fanoth... Wait, Geese exist in the real world.... F$@K!",
                socials: { Newgrounds: "https://ennuikal.newgrounds.com/", Bluesky: "https://bsky.app/profile/ennuikal.bsky.social", Twitter: "https://twitter.com/EnnuikalART", YouTube: "https://www.youtube.com/@ennuikal" }
            },
            YOEMON: {
                pfp: "https://alizarin.red/images/yoemon_profile.png",
                bio: "Yoemon worked alongside Go-Go-Galajo in the Creation of the Hollowmite-Line! On their own, Yoemon does fascinating Web Novels and Gaming Videos! Worth sitting down for a read or watching a video or two when you have the time!",
                socials: { Wordpress: "https://yoemon.wordpress.com/", Bluesky: "https://bsky.app/profile/did:plc:6435cdcsb4xscv3eu7w6rp2v", Twitter: "https://twitter.com/Yoemon0124", YouTube: "https://www.youtube.com/@spiralsincircles273/" }
            },
            "GO-GO-GALAJO": {
                pfp: "https://alizarin.red/images/GGGalajo_Profile.jpg",
                bio: "Go-Go-Galajo worked along side with Yoemon in the Creation of the Hollowmite-Line! On their own they make a lot of amazing art on their socials! Go check them out and throw them some support!",
                socials: { Carrd: "https://galajo.carrd.co/", Bluesky: "https://bsky.app/profile/galajo.bsky.social", DeviantArt: "https://www.deviantart.com/galajo", Twitter: "https://twitter.com/GGGalajo", Newgrounds: "https://galajo.newgrounds.com/", Tumblr: "https://www.tumblr.com/galajo", "Fur Affinity": "https://www.furaffinity.net/gallery/galajo/", Itaku: "https://itaku.ee/profile/galajo" }
            },
            BYNINE: {
                pfp: "https://alizarin.red/images/bynine_profile.jpg",
                bio: "Bynine is an incredible creature artist and game dev! They created Dumpleng, which originates from Pocketman Teal! They even provided us with a unique sprite for our game itself! Check out their free games on Itch and their new game Cavern of Dreams that's out on the Nintendo Switch and Steam!",
                socials: { Steam: "https://store.steampowered.com/search/?developer=Bynine%20Studio", Itchio: "https://bynine.itch.io/", Bluesky: "https://bsky.app/profile/bynine.bsky.social", Twitter: "https://twitter.com/BynineB", YouTube: "https://www.youtube.com/c/BynineStudio", Tumblr: "https://www.tumblr.com/bynineb", "Pocketman Teal VOD": "https://www.youtube.com/watch?v=_lPHJ0va2CA" }
            },
            MIRRORAMA: {
                pfp: "https://alizarin.red/images/mirrorama_profile.jpg",
                bio: "Mirrorama is an artist who makes both lovely and moody pieces of art! For Vinemon they contributed the sprite concept for Innyume! ",
                socials: { Carrd: "https://mirrorama.carrd.co/", "Main Twitter": "https://twitter.com/walkyjake", "Art Twitter": "https://twitter.com/mirrorama", Instagram: "https://www.instagram.com/merasalamins", Tumblr: "https://mirrorama.tumblr.com/" }
            },
            "FXUAD & MODOKA": {
                pfp: "https://alizarin.red/images/MODOKA_profile.jpg",
                bio: "Fxuad & Modoka kindly allowed us to reference their fakemon, Feesh, from their Homebrew Game called Sonymon! They worked as a indie game publisher from Netherlands!",
                socials: { "Gamebrew": "https://www.gamebrew.org/wiki/Sonymon_PSP", "Twitter (Fxuad)": "https://twitter.com/fouotball", "Twitter (Modoka)": "https://twitter.com/Modoka", "Reddit Post": "https://www.reddit.com/r/Vinesauce/comments/e6142m/a_few_years_ago_vinny_made_fun_of_one_of_my_psp/", "Sonymon VOD": "https://youtu.be/KuOJHg1pi-E?t=3159" }
            },
            FXUAD: {
                pfp: "https://alizarin.red/images/MODOKA_profile.jpg",
                bio: "Fxuad & Modoka kindly allowed us to reference their fakemon, Feesh, from their Homebrew Game called Sonymon! They worked as a indie game publisher from Netherlands!",
                socials: { "Gamebrew": "https://www.gamebrew.org/wiki/Sonymon_PSP", "Twitter (Fxuad)": "https://twitter.com/fouotball", "Twitter (Modoka)": "https://twitter.com/Modoka", "Reddit Post": "https://www.reddit.com/r/Vinesauce/comments/e6142m/a_few_years_ago_vinny_made_fun_of_one_of_my_psp/", "Sonymon VOD": "https://youtu.be/KuOJHg1pi-E?t=3159" }
            },
            MODOKA: {
                pfp: "https://alizarin.red/images/MODOKA_profile.jpg",
                bio: "Fxuad & Modoka kindly allowed us to reference their fakemon, Feesh, from their Homebrew Game called Sonymon! They worked as a indie game publisher from Netherlands!",
                socials: { "Gamebrew": "https://www.gamebrew.org/wiki/Sonymon_PSP", "Twitter (Fxuad)": "https://twitter.com/fouotball", "Twitter (Modoka)": "https://twitter.com/Modoka", "Reddit Post": "https://www.reddit.com/r/Vinesauce/comments/e6142m/a_few_years_ago_vinny_made_fun_of_one_of_my_psp/", "Sonymon VOD": "https://youtu.be/KuOJHg1pi-E?t=3159" }
            },
            JUSTJICH: {
                pfp: "https://alizarin.red/images/JustJich_profile.jpg",
                bio: "JustJich is a Twitch Streamer and Youtuber who broadcasted their whole playthrough of Vinemon! Due to them being super chill and streaming the whole game we immortalized them with the Skrunty line!",
                socials: { Linktree: "https://linktr.ee/JustJich", Bluesky: "https://bsky.app/profile/justjich.bsky.social", Youtube: "http://www.youtube.com/@justjich?sub_confirmation=1", Twitch: "http://www.twitch.tv/justjich", Twitter: "https://twitter.com/JustJich", Discord: "https://discord.gg/pkFazkEZDK", "Vinemon Playthrough": "https://www.youtube.com/playlist?list=PLTJhgLNSkuKp0ZPtDw-ovZOrU1i6uGZ9B" }
            },
            "GUSTTHEGHOST": {
                pfp: "https://alizarin.red/images/gustly_profile.jpg",
                bio: "Gust the Ghost aka GustlyWind is a Digital Artist who created the wonderfully friend-shaped Vinemon, Magibun and Spirignon! Check out their amazing art and give them a follow on their social pages!",
                socials: { Carrd: "https://gustlywind.carrd.co/", Bluesky: "https://bsky.app/profile/gustlywind.bsky.social", Newgrounds: "https://gustlywind.newgrounds.com/", Instagram: "https://www.instagram.com/gustlywind/", Tumblr: "https://www.tumblr.com/gustlywind" }
            },
            "GUST THE GHOST": {
                pfp: "https://alizarin.red/images/gustly_profile.jpg",
                bio: "Gust the Ghost aka GustlyWind is a Digital Artist who created the wonderfully friend-shaped Vinemon, Magibun and Spirignon! Check out their amazing art and give them a follow on their social pages!",
                socials: { Carrd: "https://gustlywind.carrd.co/", Bluesky: "https://bsky.app/profile/gustlywind.bsky.social", Newgrounds: "https://gustlywind.newgrounds.com/", Instagram: "https://www.instagram.com/gustlywind/", Tumblr: "https://www.tumblr.com/gustlywind" }
            },
            SMASHING: {
                pfp: "https://alizarin.red/images/smashing_profile.png",
                bio: "Smashing is the creator behind the awesome design for Raptine. They are more famously known for their 3D Renders, and this is how Raptine originated, design-wise first! They currently are taking commissions, so go check them out!",
                socials: { Carrd: "https://smashing.carrd.co/", Bluesky: "https://bsky.app/profile/smashingrenders.bsky.social", DeviantArt: "https://www.deviantart.com/smashingrenders", Twitter: "https://twitter.com/SmashingRenders", Instagram: "https://www.instagram.com/smashingrenders/" }
            },
            UNDEADCHICKENNUGGET: {
                pfp: "https://alizarin.red/images/undeadnugget_profile.jpg",
                bio: "UndeadChickenNugget is the creator of the creepy but sick design of the Skullshroom line! This design predates Vinemon, and they gave us permission to use it in the game! Go check out their other work and art at their links below!",
                socials: { Bluesky: "https://bsky.app/profile/undeadnugget.bsky.social", DeviantArt: "https://www.deviantart.com/undeadchickennugget", Twitter: "https://twitter.com/Undeadnugget", Tumblr: "https://undeadnugget.tumblr.com/" }
            },
            AKUMANOROBIN: {
                pfp: "https://alizarin.red/images/akumanorobin_profile.jpg",
                bio: "Akumanorobin aka GauchoPatriarca is the creator of the cute Starwie line! Their designs were well known in the Vinesauce Community, and they are a Moderator of the Vinesauce Discord! They nowadays are locked into the wonderful world of danmei!",
                socials: { Bluesky: "https://bsky.app/profile/akumanorobin.bsky.social", Twitter: "https://twitter.com/GauchoPatriarca", Instagram: "https://www.instagram.com/akumanorobin/", Newgrounds: "https://akumanorobin.newgrounds.com/" }
            },
            // --- New creators from Credits.txt ---
            SHYGUYXXL: {
                pfp: "https://alizarin.red/images/shyguyxxl_profile.jpg",
                bio: "Artist, Animator & NPC Writer for Vinemon. One of the core members of the Swone Vial Co. team.",
                socials: { Bluesky: "https://bsky.app/profile/shyguyxxl.bsky.social", Twitter: "https://twitter.com/ShyGuyXXL", DeviantArt: "https://www.deviantart.com/shyguyxxl", YouTube: "https://www.youtube.com/@ShyGuyXXL/" }
            },
            PSYPHER: {
                pfp: "https://alizarin.red/images/psypher_profile.jpg",
                bio: "Composer, Game Balance & Programmer for Vinemon. One of the core member of the Swone Vial Co. team.",
                socials: { Bluesky: "https://bsky.app/profile/psypher.bsky.social", YouTube: "https://www.youtube.com/thepsynergist", BandCamp: "https://thepsynergist.bandcamp.com/", SoundCloud: "https://soundcloud.com/thepsynergist", Twitter: "https://twitter.com/thepsynergist" }
            },
            ALIZARINRED: {
                pfp: "https://alizarin.red/images/AlizarinRed_Profile.png",
                bio: "Artist, World Builder & Story Writer for Vinemon. One of the core member of the Swone Vial Co. team.",
                socials: { Website: "https://alizarin.red", Carrd: "https://alizarinred.carrd.co/", Bluesky: "https://bsky.app/profile/alizarin.red", Twitch: "https://www.twitch.tv/alizarinred", "YouTube (Main Channel)": "https://www.youtube.com/@alizarinred", "YouTube (VOD Channel)": "https://www.youtube.com/@lizarinRed/", "DeviantArt": "https://www.deviantart.com/pick-blue", NewGrounds: "https://pickblue.newgrounds.com/", Twitter: "https://twitter.com/lizarinRed" }
            },
            COSSACKNEPPY: {
                pfp: "https://alizarin.red/images/CossackNeppy_profile.jpg",
                bio: "Created the Main Large Cutscene Vinemon. One of the members of the Swone Vial Co. team.",
                socials: { Carrd: "https://cossackneppy.carrd.co/", NewGrounds: "https://cossackneppy.newgrounds.com/", Instagram: "https://www.instagram.com/cossackneppy/", Threads: "https://www.threads.com/@cossackneppy" }
            },
            SHRINEFOX: {
                pfp: "https://alizarin.red/images/shrinefox_profile.jpg",
                bio: "Provided the base website design for our main Vinemon website.",
                socials: { Website: "https://shrinefox.com/", Bluesky: "https://bsky.app/profile/shrinefox.com", YouTube: "https://youtube.com/user/ShrineFox", "Ko-Fi": "https://ko-fi.com/shrinefox", Twitter: "https://x.com/ShrineFoxMods" }
            },
            VENDILY: {
                pfp: "https://alizarin.red/images/vendily_profile.png",
                bio: "Contributed programming expertise to the Vinemon project.",
                socials: { GitHub: "https://github.com/Vendily", YouTube: "https://www.youtube.com/@Vendily", DeviantArt: "https://www.deviantart.com/vendily", "PokeCommunity Profile": "https://www.pokecommunity.com/members/vendily.534464/", "Eevee Expo Resources": "https://eeveeexpo.com/resources/authors/378/", Twitter:"https://x.com/Vendily1"  }
            },
             LIGHTDASHER: {
                pfp: "https://alizarin.red/images/LightDasher_Profile.jpg",
                bio: "Contributed Imakuni's base Overworld and Trainer Sprite!",
                socials: { Bluesky: "https://bsky.app/profile/lightdasher.bsky.social", Twitter: "https://twitter.com/LightDasher", Tumblr: "https://www.tumblr.com/lightdasher", DeviantArt: "https://www.deviantart.com/light-dasher" }
            },
             ALICEFLARE: {
                pfp: "https://alizarin.red/images/AliceFlare_Profile.jpg",
                bio: "Contributed their amazing vocals to the song Vs. The Jahn Rangers, Final.",
                socials: { Carrd: "https://aliceflare.carrd.co/", Twitch: "https://twitch.tv/AliceFlare", Bluesky: "https://bsky.app/profile/aliceflare.bsky.social", "YouTube (Main Channel)": "https://www.youtube.com/AliceFlare", "Youtube (VOD Channel)": "https://www.youtube.com/@AliceFlareVODS", Instagram: "https://instagram.com/alice.flare", "Ko-Fi": "https://ko-fi.com/AliceFlare", Twitter: "https://twitter.com/AliceInAltoland" }
            },
             LYZERUS: {
                pfp: "https://alizarin.red/images/lyzerus_profile.jpg",
                bio: "Contributed multiple art assets to the game, including, The Default Trees, Swamp Trees, Guardia Trees, Harkinian Lighthouse, Log Cabins, EV Dojo, Purple Roofed Houses, Mini S.S. Twitchat, and all the Vineball Icon Sprites.",
                socials: {Bluesky: "https://bsky.app/profile/lyzerus.bsky.social", NewGrounds: "https://lyzerus.newgrounds.com/", Twitter: "https://twitter.com/aaronlyzerus" }
            },
           ILLICITNATURE: {
                pfp: "https://alizarin.red/images/Illicitnature_profile.jpg",
                bio: "Illicit Nature is most known for their musical contributions to Skatebird; however, they are also big Vinesauce Fans! They provided our Credits song, which features multiple people in our credits on vocals, including AlizarinRed, HexenHell, and Saucecole!",
                socials: { Linktree: "https://linktr.ee/illicitnature", Bandcamp: "https://illicitnature.bandcamp.com/", Twitter:"https://twitter.com/Illicit_Nature" }
            },
           BASSCLEFFF: {
                pfp: "https://alizarin.red/images/bassclefff_profile.jpg",
                bio: "Bassclefff is an incredibly talented musician who has worked on multiple soundtracks for games and mods! They also have plenty of Albums you can listen to and purchase! For Vinemon they provided us the Mystery Gift song that plays when you are claiming one!",
                socials: { Bandcamp: "https://bassclefff.bandcamp.com/", Bluesky: "https://bsky.app/profile/bassclefff.bsky.social", Spotify: "https://open.spotify.com/artist/7wzwTflQknkaz4OJJM7qMg", Soundcloud: "https://soundcloud.com/bassclefff", NewGrounds: "https://bassclefff.newgrounds.com/", YouTube: "https://www.youtube.com/@Bassclefff", Twitter:"https://twitter.com/bassclef_3" }
            },
           HEXENHELL: {
                pfp: "https://alizarin.red/images/hexenhell_profile.png",
                bio: "Hexenhell was one of our Beta Testers for the game and provided us with valuable information during such, they also provided vocals to the end credits song of the game! They are a Video Editor for SimpleFlips and a Mod for BoundaryBreak! They also stream from time to time!",
                socials: { Bluesky: "https://bsky.app/profile/hexenhell.bsky.social", Twitch: "https://www.twitch.tv/hexenhell", Instagram: "https://www.instagram.com/hexen_hell/", YouTube: "https://www.youtube.com/@hexenhell", Twitter:"https://twitter.com/hellhexen" }
            },
           HOVERBAT: {
                pfp: "https://alizarin.red/images/hoverbat_profile.jpg",
                bio: "HoverBat was one of our Beta Testers for the game and provided us with valuable information during such, they also allowed us to put a billboard up to promote their game! It's unironically the best way to play Zelda 2! It has so many quality of life and community features. Not to mention it's FREE!",
                socials: { Patreon: "https://www.patreon.com/HoverBat", Twitch: "https://www.twitch.tv/hoverbat", YouTube: "https://www.youtube.com/c/HoverBat", "HoverBat's GitHub Profile":"https://github.com/HoverBat1",  "ZIIAOL aka ZALiA(Zelda Again: Link is Adventuresome) Itchio": "https://hoverbat.itch.io/ziiaol", "ZALiA Source Code Github": "https://github.com/ZA-LiA/ZALiA" }
            },
           KARPFEN: {
                pfp: "https://alizarin.red/images/karpfen_profile.webp",
                bio: "Karpfen was one of our Beta Testers for the game and provided us with valuable information during such!",
                socials: {}
            },
           NARRY: {
                pfp: "https://alizarin.red/images/narry_profile.gif",
                bio: "Karpfen was one of our Beta Testers for the game and provided us with valuable information during such! They have supported the Vinesauce Community by moderating Twitch chat and more!",
                socials: {Bluesky: "https://bsky.app/profile/narry.online", YouTube: "https://www.youtube.com/@narryg", Twitter: "https://twitter.com/NarryOnTheNet"}
            },
           SAUCECOIE: {
                pfp: "https://alizarin.red/images/saucecoie_profile.jpg",
                bio: "Saucecoie was one of our Beta Testers for the game and provided us with valuable information during such! You might find a missable easter egg in the game's sewers featuring them! They also have a few other games they have had a hand in which you can find each games thread linked below!",
                socials: {Bluesky: "https://bsky.app/profile/saucecoie.bsky.social", Soundcloud: "https://soundcloud.com/saucecoie", YouTube: "https://www.youtube.com/@saucecoie", Twitter: "https://twitter.com/saucecoie", "Secrets of the Ages": "https://eeveeexpo.com/threads/8652/", ULTRALITE: "https://eeveeexpo.com/ultralite/", "Pokémon: Chasing Glory": "https://eeveeexpo.com/threads/2446/", "Pokemon Universe -Across Time and Space-":"https://eeveeexpo.com/threads/607/", "Pokémon Defiance (Cancelled)": "https://eeveeexpo.com/threads/97/" }
            },
           AGENTREDJACKAL: {
                pfp: "https://alizarin.red/images/agentredjackal_profile.jpg",
                bio: "AgentRedJackal was one of our Beta Testers for the game and provided us with valuable information during such! They do a lot of creative work, including but not limited to: Game Modding, Art, Music, Video Editing, Streaming, Charity Work, Model Rigging, Podcasting, and more! Read more about such on their website, it's a nostalgic treat!",
                socials: {BioLink: "https://bio.link/arjackal", Website: "https://agentredjackal.blogspot.com/", Bluesky: "https://bsky.app/profile/agentredjackal.bsky.social", Twitch: "https://www.twitch.tv/agentredjackal", Itchio: "https://agentredjackal.itch.io/", YouTube: "https://www.youtube.com/@agentredjackalfullstreams", Twitter: "https://twitter.com/agentredjackal" }
            },
           SINCITYASSASSIN: {
                pfp: "https://alizarin.red/images/sincityassassin_profile.jpg",
                bio: "SinCityAssassin was one of our Beta Testers for the game and provided us with valuable information during such! You most likely know them from the Vinesauce Discord as they are a active moderator there and also a long-time contributor to the Vinesauce community as a whole!",
                socials: {Bluesky: "https://bsky.app/profile/sincityassassin.bsky.social", YouTube: "https://www.youtube.com/user/AnimeViewer34", Twitter: "https://twitter.com/sincityassassin" }
            },
           SOLASH: {
                pfp: "https://alizarin.red/images/solash_profile.jpg",
                bio: "Vinion was based on Solash's depiction of a living Vineshroom as a Pokemon!",
                socials: {Deviantart: "https://www.deviantart.com/solash1/", "Solash's OG Vinion-Line Design": "https://booru.vineshroom.net/post/view/42061" }
            },
           TECKWORKS: {
                pfp: "https://alizarin.red/images/teckworks_profile.jpg",
                bio: "Teckworks is a very well-known artist! Our Female Mimikyu is based on Teckworks' depiction of such!",
                socials: {Bluesky: "https://bsky.app/profile/teckworks.bsky.social", Newgrounds: "https://teckworks.newgrounds.com/", Patreon: "https://www.patreon.com/teckworks", YouTube: "https://www.youtube.com/c/teckworks", "Teckwork's OG Female Mimikyu-Line Design": "https://booru.vineshroom.net/post/view/41818", Twitter: "https://twitter.com/teckworks" }
            },
           MAJESTUR: {
                pfp: "https://alizarin.red/images/majestur_profile.jpg",
                bio: "Majestur designed a special lizard wizard that became a door, you might learn more in the future but for now we implore you to just ignore it for now. ;)",
                socials: {Bluesky: "https://bsky.app/profile/majestur.bsky.social", "Ko-Fi": "https://ko-fi.com/majestur", Twitter: "https://twitter.com/Majestur_" }
            },
           METASHARD: {
                pfp: "https://alizarin.red/images/metashard_profile.jpg",
                bio: "While we had the design first, Metashard during the art contest submitted their own Ernest, because of this we decided to avoid potential complaints to equally give them credit as shared inspiration of the idea.",
                socials: {YouTube: "https://www.youtube.com/@metashard3952", Twitch: "https://www.twitch.tv/metashard", "Metashard's OG Ernest Design": "https://imgur.com/a/DKUw2" }
            },
           VINNYVINESAUCE: {
                pfp: "https://alizarin.red/images/vinesauce_profile.png",
                bio: "I'm Vinny and I focus on variety streaming. I don't have a strict schedule and stream a few times a week, but you can expect full playthroughs, classic games, randomizers, corruptions, trash, bizarre media, and weird/forgotten games. More prerecorded videos are on my youtube.",
                socials: {"Vinesauce Website": "https://vinesauce.com/", "Red Vox Website": "redvoxband.com", Linktree: "https://linktr.ee/vinnyvinesauce", Bluesky: "https://bsky.app/profile/vinny.vinesauce.com", Twitch: "https://www.twitch.tv/vinesauce", "Youtube (Highlight)":"https://www.youtube.com/@vinesauce", "YouTube (VOD)": "https://www.youtube.com/user/vinesaucefullsauce", "YouTube (Twitch Clips)": "https://www.youtube.com/@VinesauceTwitchClips", "YouTube (Cut Content)": "https://www.youtube.com/@VinesauceTheExtraSauce", "Instagram (Vinesauce)": "https://instagram.com/vinny.vinesauce", "Twitter (Vinesauce)": "https://x.com/vinnyvinesauce", BandCamp: "https://vine.bandcamp.com/", Spotify: "https://open.spotify.com/artist/3Zy9Sz7WPIetWqQbYq4UoK", "YouTube (Red Vox)": "https://www.youtube.com/@RedVox", "Instagram (Red Vox)": "http://instagram.com/redvoxband", "Twitter (Red Vox)": "https://twitter.com/redvoxband"}
            },
           IMAKUNI: {
                pfp: "https://alizarin.red/images/imakuni_profile.jpg",
                bio: "My name is Marisa (or you could call me Risa!) I'm a Retro/Variety streamer since 2009 and a Vtuber as of April 2023 (my model's name is Kuni!) Once was a streamer for the streaming group, Vinesauce. Now, doing my own thing! ",
                socials: {Merch: "https://uwumarket.us/collections/imakuni?filter.v.price.gte=&filter.v.price.lte=&sort_by=created-descending", Bluesky: "https://bsky.app/profile/imakuni.bsky.social", Twitch: "https://www.twitch.tv/imakuni/", "YouTube": "https://www.youtube.com/c/imakunifullstreams", "Twitter": "https://x.com/ImakuniVT" }
            },
           ALTAKARI: {
                pfp: "https://alizarin.red/images/altakari_profile.jpg",
                bio: 'I am Altair "ALT" Akari (formerly known as DORB). I am a video game playing person and an online anime man. I love playing weird old games, even stranger indie passion projects, and maybe even partake in a visual novel now and then. :^)',
                socials: {Bluesky: "https://bsky.app/profile/altakari.bsky.social", Twitch: "https://www.twitch.tv/altakari/", "YouTube (Main)": "https://www.youtube.com/@ALTAKARI", "YouTube (VOD)": "https://www.youtube.com/c/DorbDump", Twitter: "https://x.com/altairakari" }
            },
           HOOTEY: {
                pfp: "https://alizarin.red/images/hootey_profile.webp",
                bio: "Retro dad, who plays games bad, helping you laugh to forget all the sad.",
                socials: {Bluesky: "https://bsky.app/profile/hootey.bsky.social", Twitch: "https://www.twitch.tv/hootey/", YouTube: "https://www.youtube.com/@hootonium" }
            },
           POTATO: {
                pfp: "https://alizarin.red/images/potato_profile.jpg",
                bio: "Man that disappoints his peers over at tater.stream \(´•ω•｀)/",
                socials: {Bluesky: "https://bsky.app/profile/tater.stream", Twitch: "https://www.twitch.tv/potato/", Twitter: "https://x.com/VinePotato" }
            },
           LIMEALICIOUS: {
                pfp: "https://alizarin.red/images/laimu_profile.jpg",
                bio: "I'm Limes/Laimu! I stream all sorts of video games, from childhood classics to the latest releases. Console and PC alike.",
                socials: {Bluesky: "https://bsky.app/profile/limealicious.bsky.social", Twitch: "https://www.twitch.tv/limealicious", Instagram: "https://www.instagram.com/laimulicious/", Patreon: "https://patreon.com/limealicious", "YouTube(Main)": "https://www.youtube.com/c/Limealicious", "YouTube (VOD)": "https://www.youtube.com/@LimeArchives", TikTok: "https://www.tiktok.com/@laimulicious", Twitter: "https://twitter.com/Laimulicious" }
            },
           VARGSKELETHORJOEL:{ 
                pfp: "https://alizarin.red/images/joel_profile.jpg",
                bio: "My name is Joel. I'm from Sweden and I hate video games. I eat nails for breakfast and tame Siberian tigers in my spare free time. I like metal and I know how to kill skeletons.",
                socials: {Twitch: "https://www.twitch.tv/vargskelethor", "YouTube (Main)": "https://www.youtube.com/c/vinesaucejoel", "YouTube (VOD)": "https://www.youtube.com/c/VargskelethorUncutFullJoelStreams", Twitter: "https://twitter.com/joel_vinesauce" }
            },
           REVSCARECROW:{ 
                pfp: "https://alizarin.red/images/revscarecrow_profile.png",
                bio: "My name is Joel. I'm from Sweden and I hate video games. I eat nails for breakfast and tame Siberian tigers in my spare free time. I like metal and I know how to kill skeletons.",
                socials: {Website: "https://www.colinmullin.com/", Bluesky: "https://bsky.app/profile/revscarecrow.bsky.social", Twitch: "https://www.twitch.tv/revscarecrow/", Patreon: "https://www.patreon.com/revscarecrow", "YouTube (Main)": "https://www.youtube.com/revscarecrow", "YouTube (VOD)": "https://www.youtube.com/channel/UCSNF0FG_I8NboKf0H7Xn1CQ", "YouTube (Art)": "https://www.youtube.com/revscarecrowartcade", Tumblr: "https://revscarecrow.tumblr.com/", Twitter: "https://twitter.com/Rev_Scarecrow" }
            },
           FRED:{ 
                pfp: "https://alizarin.red/images/fred_profile.png",
                bio: "Generally Video Game related things, like glitches/mishaps in streams or just me generally finding comedic or interesting moments in some of the games I play. Avid Shiny Hunter.",
                socials: {Twitch: "https://www.twitch.tv/fred/", YouTube: "https://www.youtube.com/@freddyt09/", Instagram: "https://www.instagram.com/fredrick_gaming/" }
            },
           JABRONIMIKE:{ 
                pfp: "https://alizarin.red/images/jabronimike_profile.jpg",
                bio: "Streamer, YouTuber, Professional internet asshole.",
                socials: {Bluesky: "https://bsky.app/profile/jabronimike.bsky.social", Twitch: "https://www.twitch.tv/jabroni_mike/", Patreon: "https://www.patreon.com/jabronimike", "Ko-Fi": "https://ko-fi.com/jabroni_mike", "YouTube (Main)": "https://www.youtube.com/@Jabroni_Mike", "YouTube (VOD)": "https://www.youtube.com/@JabroniMikeFullStreams", "YouTube (Clips)": "https://www.youtube.com/@jabronimikeclips", TikTok: "https://www.tiktok.com/@jabroni_mike", Twitter: "https://x.com/jabroni_mike" }
            },
           GREATZOTT:{ 
                pfp: "https://alizarin.red/images/greatzott_profile.jpg",
                bio: "Student, small time streamer, sentient soap dish, salad shredder, sorta sailor, sickly son, sour patch adult.",
                socials: {Bluesky: "https://bsky.app/profile/greatzott.bsky.social", Twitch: "https://www.twitch.tv/greatzott/", YouTube: "https://www.youtube.com/@Greatzott", "Twitter": "https://x.com/GreatZott" }
            },
           GREATSPHYNX:{ 
                pfp: "https://alizarin.red/images/greatsphynx_profile.jpg",
                bio: "I'm Jon, you can also call me Sphynx, and I play all sorts of things. I originally went to school for Computer Science, but ended up working as a chef for almost 10 years. I went back to school to get a degree in Food Science, and now I work as a restaurant and health and safety consultant from home. Gongo mostly rules the stream now. But occasionally I will play games, make music, do cool video art, or other stuff.",
                socials: {Spotify: "https://open.spotify.com/artist/2WuJGAO4DXehVk6SZV1f9G", Bluesky: "https://bsky.app/profile/greatsphynx.bsky.social", Twitch: "https://www.twitch.tv/greatsphynx/", YouTube: "https://www.youtube.com/channel/UChPVW7zdC1f_fcIy7HJ_LKg", Twitter: "https://twitter.com/Great_Sphynx" }
            },
           JEFFTHEVIDYABUM:{ 
                pfp: "https://alizarin.red/images/vidyabum_profile.jpeg",
                bio: "We don't know much about them but Vidyabum sleeps in an oxygen tent which he believes gives him “sexual powers”.",
                socials: { Linktree: "https://linktr.ee/vidyabum", Merch: "https://vidyabum-shop.fourthwall.com/", Bluesky: "https://bsky.app/profile/vidyabum.bsky.social", Twitch: "https://https://www.twitch.tv/vidyabum", "YouTube (Main)": "https://www.youtube.com/@vidyabum", "YouTube (VOD)": "https://www.youtube.com/c/VidyaBumFullstreams", TikTok: "https://www.tiktok.com/@jeff.the.vidyabum", Twitter: "https://x.com/vidyabum" }
            },
           MIKEPANOOTS:{ 
                pfp: "https://alizarin.red/images/Panoots_profile.jpg",
                bio: "Misc. content creator. Student. I like Godzilla, Jojo, Rareware, Doom, Yakuza, and Half-Life.",
                socials: { "YouTube(Main)": "https://www.youtube.com/c/panoots", "YouTube(Archive)": "https://www.youtube.com/@PanootsGaming", Twitter: "https://x.com/mikepanoots" }
            },
           RUBBERROSS:{ 
                pfp: "https://alizarin.red/images/rubberross_profile.jpg",
                bio: "My name's Ross! I want to make drawing and animation fun!",
                socials: {Patreon:"https://www.patreon.com/RubberNinja", Bluesky: "https://bsky.app/profile/rubberross.bsky.social", Twitch: "https://www.twitch.tv/rubberross",  "YouTube(Main)": "https://www.youtube.com/RubberRoss", "YouTube(VOD)": "https://www.youtube.com/@rubberrossvods", "YouTube(OLD)": "https://www.youtube.com/@RubberNinja/", Instagram: "https://instagram.com/RubberNinja", TikTok: "https://instagram.com/RubberNinja", Twitter: "https://x.com/rubberninja" }
            },
           JERMA985:{ 
                pfp: "https://alizarin.red/images/jerma_profile.jpg",
                bio: "Just hanging out, you?",
                socials: {Twitch: "https://www.twitch.tv/jerma985",  "YouTube(Main)": "https://www.youtube.com/jerma985", "YouTube(Highlights)": "https://www.youtube.com/@2ndJerma/", "YouTube(VOD)": "https://www.youtube.com/@JermaStreamArchive/", Twitter: "https://x.com/jerma985" }
            },
           GEAROMATIC:{ 
                pfp: "https://alizarin.red/images/gearomatic_profile.jpg",
                bio: "I'm a 30 year old Audio Engineer! I just play games for fun.",
                socials: {Biolink: "https://gearomatic.bio.link/", Merch: "https://gearomatic-shop.fourthwall.com/", Bluesky: "https://bsky.app/profile/gearomatic.bsky.social", Twitch: "https://www.twitch.tv/gearomatic",  "Dual Redundancy Podcast": "https://linktr.ee/dualredundancy", "YouTube(VOD)": "https://www.youtube.com/c/gearomaticgames", Twitter: "https://x.com/gearomatic?lang=en" }
            },
           CAPTAINSOUTHBIRD:{ 
                pfp: "https://alizarin.red/images/captainsouthbird_profile.png",
                bio: "Hi! I'm a guy who's been around the Internet for too long and done some bizarre things (but generally had fun doing them). At various times we may have crossed paths depending on where your interests lie. ",
                socials: {Website: "https://captainsouthbird.me/", Bluesky: "https://bsky.app/profile/cptsouthbird.bsky.social", Twitch: "https://www.twitch.tv/captainsouthbird", "YouTube(Main)":"https://www.youtube.com/c/CaptainSouthbird", "YouTube(Highlights)": "https://www.youtube.com/@southbirdhighlights", "YouTube(VOD)": "https://www.youtube.com/@southbirdvods", "YouTube(Vinesauce Days)": "https://www.youtube.com/@southbirdsvinesaucedays3429" }
            },
           GREYLENO:{ 
                pfp: "https://alizarin.red/images/greyleno_profile.png",
                bio: "Hey, folks, how's it going?",
                socials: {Website: "https://vinesauce.com/greyroom.yot", "Campaign Website": "https://vinesauce.com/greymatters.yot"}
            },
           REDLETTERMEDIA:{ 
                pfp: "https://alizarin.red/images/RedLetterMedia_profile.jpg",
                bio: "Milwaukee, WI based humor related and entertainment adjacent content creators. The world's only unfluencers.",
                socials: {Website: "https://www.redlettermedia.com/", Bluesky: "https://bsky.app/profile/redlettermedia.com", Merch: "https://redlettermediamerch.com/", Bandcamp: "https://redlettermedia.bandcamp.com/", Patreon:"https://www.patreon.com/redlettermedia", YouTube: "https://www.youtube.com/user/RedLetterMedia", Twitter:"https://x.com/redlettermedia",}
            },
           HATSUNEMIKU:{ 
                pfp: "https://alizarin.red/images/hatsunemiku_profile.jpg",
                bio: "Hatsune Miku is a music software developed by Crypton Future Media, INC., which enables anyone to make their computer sing by entering lyrics and melodies. As a massive number of users created music using the software and posted their works on the Internet, Hatsune Miku quickly evolved into a cultural phenomenon. Since then, Hatsune Miku has gained much attention as a character, involved in many fields such as merchandising and live performance as a virtual singer. Now her popularity has spread across the globe.",
                socials: {Website: "https://piapro.net/intl/en.html", Spotify: "https://open.spotify.com/artist/6pNgnvzBa6Bthsv8SrZJYl", YouTube: "https://www.youtube.com/@HatsuneMiku", Instagram:"https://www.instagram.com/cfm_miku_official", Twitter:"https://x.com/cfm_miku_en",}
            },
           QBCUBED:{ 
                pfp: "https://vinemon.link/images/QBcubed_profile.jpg",
                bio: "QBCubed is a Streamer and Artist who contributed the creepy Faesoph to Vinemon! If their art interests you, they often have their Commissions open!",
                socials: {Twitch: "https://www.twitch.tv/qbcubed/", Bluesky: "https://bsky.app/profile/qbcubed.bsky.social", Discord: "https://discord.gg/aBAr7qcF2X", Twitter:"https://twitter.com/qbcubed",}
            },
        };

        // NEW object to define the layout of the credits page.
        const creditsPageLayout = [
            { type: 'main_header', content: 'Vinemon: Sauce Edition' },
            { type: 'sub_header', content: 'An Interactive Shitpost' },
            { type: 'separator' },
            { type: 'section_header', content: 'Swone Vial Co' },
            { type: 'credit_group', title: 'Artist, Animator & NPC Writer', members: [{ name: 'ShyGuyXXL'}] },
            { type: 'credit_group', title: 'Composer, Game Balance & Programmer', members: [{ name: 'Psypher'}] },
            { type: 'credit_group', title: 'Artist, World Builder & Story Writer', members: [{ name: 'AlizarinRed'}] },
            { type: 'credit_group', title: 'Cutscene Animator', members: [{ name: 'CossackNeppy'}] },
            { type: 'separator' },
            { type: 'section_header', content: 'Additional Creative Help' },
            { type: 'credit_group', title: 'Website Help', members: [{ name: 'ShrineFox' }] },
            { type: 'credit_group', title: 'Artist', members: [{ name: 'Lyzerus'}, { name: 'Light Dasher'}, { name: 'Senoishi'}] },
            { type: 'credit_group', title: 'Support Writer', members: [{ name: 'Dryboner' }] },
            { type: 'credit_group', title: 'Programming', members: [{ name: 'Vendily'}] },
            { type: 'credit_group', title: 'Musical Help & Bug Tester', members: [{ name: 'Barrels O\' Fun' }] },
            { type: 'credit_group', title: 'Music', members: [{ name: 'Alice Flare' }, { name: 'Illicit Nature' }, { name: 'Bassclefff' }, { name: 'Mr. Fox' }] },
            { type: 'separator' },
            { type: 'section_header', content: 'Bug Testers' },
            { type: 'credit_group', members: ['Bassclefff', 'Bynine', 'HexenHell', 'Hoverbat', 'Karpfen', 'Lyzerus', 'Narry', 'Saucecoie', 'Senoishi', 'AgentRedJackal', 'AkumanoRobin', 'AliceFlare', 'Altariasong', 'SinCityAssassin', 'Vendily'] },
            { type: 'separator' },
            { type: 'section_header', content: 'Contest Winners & Design Creators' },
            { type: 'credit_group', members: ['Smashing', 'Metashard', 'Riviera', 'Ennuikal', 'QBcubed', 'Solash', 'Teckworks', 'Yoemon', 'Go-Go-Galajo', 'Majestur', 'Mirrorama', 'Putuk', 'Glory2Snowstar', 'Giant_Key', 'ChargeThenLance', 'Crazy Pansage Lady', 'Harmonicky', 'Gust The Ghost', 'Akumanorobin', 'Altariasong', 'UndeadChickenNugget', 'Bynine', "Fxuad", "Modoka"] },
            { type: 'separator' },
            { type: 'section_header', content: 'In-Game Content Creators' },
            { type: 'credit_group', members: ['Vinny Vinesauce', 'Imakuni', 'ALTAKARI', 'Hootey', 'Potato', 'Limealicious', 'VargSkelethor Joel', 'RevScarecrow', 'UmJammerJenny', 'Fred', 'Jabroni Mike', 'GreatZott', 'GreatSphynx', 'Jeff the Vidyabum', 'MikePanoots', 'RubberRoss', 'Jerma985', 'Gearomatic', 'Captain Southbird', 'Grey Leno', 'Red Letter Media', "Hatsune Miku"] },
            { type: 'separator' },
            { type: 'final_note', content: 'This is a non-profit parody fan game. Please support the official games! All rights belong to their respected owners. No Infringement Intended :)' }
        ];


        let allMovesDataMap = {};
        let allTmMoveNames = [];
        const vinemonData = {};
        let mapData = {};
        let allMovesData = {};
        let allTMsData = {};
        let allItemsData = [];
        let allAbilitiesData = {}; 
        let allAbilitiesRaw = [];
        let internalToExternalMoveMap = {};
        let preEvoMap = {};
        let isLoading = false;
        let isShowingEgg = false;
        let currentAnimationId = 0;
        const descriptionLinkExclusions = new Set(["ROCK"]);

        const learnableMoves = new Set();
        const learnableAbilities = new Set();
        let vinemonViewMode = "list";
        let itemViewMode = "list";
        let moveViewMode = "list";
        let abilityViewMode = "list";
        let shiny = false,
            female = false,
            back = false,
            corruption = false; 
        let currentExtraSprite = "";
        let currentItemSort = "id";
        let currentItemSortOrder = "asc";
        let selectedItemCategoryFilter = "";
        let currentMoveSort = "name";
        let currentMoveSortOrder = "asc";
        let selectedMoveTypeFilter = "";
        let showUnusedMoves = false;
        let selectedMoveFlagFilter = "";

        const disabledMoveTypes = ["FAIRY", "ASTRAL", "SOUND", "COSMIC", "CHAOS", "LIGHT", "SHADOW", "Fairy", "Astral"];

        let currentVinemonSort = "id";
        let currentVinemonSortOrder = "asc";
        let selectedType1 = "";
        let selectedType2 = "";
        let selectedBreedingGroup = "";
        let selectedStatToSort = "";
        let statSortOrder = "desc";
        let abilitySortOrder = "asc";
        let showUnusedAbilities = false;

        const statIndices = {
            HP: 0,
            ATK: 1,
            DEF: 2,
            SPD: 3,
            "SP.ATK": 4,
            "SP.DEF": 5
        };

        let femaleAvailable = false;

        const itemCategories = {
            1: "Trash",
            2: "Drugs",
            3: "Capture Devices",
            4: "Don't Copy That",
            5: "Natural Drugs",
            6: "Valuables",
            7: "Hax",
            8: "'Portant Stuff"
        };

        const categoryColors = {
            Trash: "#2b6b5d",
            Drugs: "#7a2a7a",
            "Capture Devices": "#1e5b8d",
            "Don't Copy That": "#4f2b8a",
            "Natural Drugs": "#52752b",
            Valuables: "#8d1f1f",
            Hax: "#613861",
            "'Portant Stuff": "#8d6a1f"
        };

        const moveCategoryColors = {
            Physical: "#f75231",
            Special: "#94b5de",
            Status: "#c6c6bd"
        };

        function mapType(typeString) {
            if (!typeString) return "";
            const upperType = typeString.toUpperCase();
            if (upperType === "QMARKS") {
                return "MYSTERY";
            }
            return upperType;
        }

        function getDisplayTypeName(typeString) {
            const mappedType = mapType(typeString); 
            if (!mappedType) return "";
            if (mappedType === "SP.ATK") return "Sp. Atk";
            if (mappedType === "SP.DEF") return "Sp. Def";
            return mappedType.charAt(0) + mappedType.slice(1).toLowerCase();
        }

        function getStatColor(index) {
            return ["#00a96b", "#ff3c00", "#3686ff", "#ffda2c", "#ff1cf7", "#6c45ff"][index];
        }

async function updateSprite(id) {
            const mon = vinemonData[id];
            const spriteContainer = document.getElementById("spriteContainer");
            const imgElement = document.getElementById("spriteImg");
            const animatedSpriteDiv = document.getElementById("animatedSpriteDiv");
            

            const shinyStatus = document.getElementById("shinyStatus");
            const corruptionStatus = document.getElementById("corruptionStatus");
            const shinyCorruptionStatus = document.getElementById("shinyCorruptionStatus");

            const isShiny = document.getElementById("shinyToggle").checked;
            const isCorrupted = document.getElementById("corruptionToggle").checked;

            shinyStatus.style.display = "none";
            corruptionStatus.style.display = "none";
            shinyCorruptionStatus.style.display = "none";

            if (isShiny && isCorrupted) {
                shinyCorruptionStatus.style.display = "block";
            } else if (isShiny) {
                shinyStatus.style.display = "block";
            } else if (isCorrupted) {
                corruptionStatus.style.display = "block";
            }

            if (!spriteContainer.querySelector(".loading-spinner")) {
                const loader = document.createElement("div");
                loader.className = "loading-spinner";
                spriteContainer.prepend(loader);
            }
            spriteContainer.classList.add("is-loading");

            if (isShowingEgg) {
                animatedSpriteDiv.style.display = "none";
                imgElement.style.display = "block";
                const paddedId = String(id).padStart(3, "0");
                const spritePath = `https://vinemon.link/vinemon/vinemon/eggs/${paddedId}.png`;
                const tempImg = new Image();
                tempImg.onload = () => {
                    imgElement.src = spritePath;
                    spriteContainer.classList.remove("is-loading");
                };
                tempImg.onerror = () => {
                    isShowingEgg = false;
                    document.getElementById('viewEggBtn').textContent = 'View Egg';
                    updateSprite(id);
                };
                tempImg.src = spritePath;
                return;
            }

            let subfolder = "";
            if (back)   subfolder += "back";
            if (shiny)  subfolder += "shiny";
            if (female) subfolder += "female";

            let folder = "/vinemon/vinemon";
            if (subfolder) {
                folder += "/" + subfolder;
            }

            const isAnimatedSprite = (mon && mon.name.toUpperCase() === 'SORBÉBÉ' && isShiny) ||
                (String(id) === '114' && currentExtraSprite === '_1') ||
                (String(id) === "211");
            let spritePath = `${folder}/${id}${currentExtraSprite || ''}.png`;
            const image = new Image();
            image.crossOrigin = "Anonymous";

            image.onerror = () => {
                imgElement.style.display = "block";
                animatedSpriteDiv.style.display = "none";
                imgElement.src = "https://vinemon.link/vinemon/vinemon/icons/icon000.png";
                spriteContainer.classList.remove("is-loading");
            };

            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d', {
                    willReadFrequently: true
                });
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);

                if (isCorrupted) {
                    applyCorruption(canvas);
                }

                const finalImageSrc = canvas.toDataURL();

                if (isAnimatedSprite) {
                    imgElement.style.display = "none";
                    animatedSpriteDiv.style.display = "block";

                    if (mon.name.toUpperCase() === 'SORBÉBÉ' && isShiny) {
                        animatedSpriteDiv.className = back ? "sorbebe-shiny-back-sprite-class sprite-scaler" : "sorbebe-shiny-front-sprite-class sprite-scaler";
                    } else if (String(id) === '114' && currentExtraSprite === '_1') {
                        animatedSpriteDiv.className = "luciflipper-animated-sprite-class sprite-scaler";
                    } else if (String(id) === "211") {
                        animatedSpriteDiv.className = "vinebot-2-0-sprite-class sprite-scaler";
                    }

                    animatedSpriteDiv.style.backgroundImage = `url(${finalImageSrc})`;

                } else {
                    animatedSpriteDiv.style.display = "none";
                    imgElement.style.display = "block";
                    imgElement.src = finalImageSrc;
                }

                spriteContainer.classList.remove("is-loading");
            };

            image.src = spritePath;
        }



        function updateURL(id) {
            const url = new URL(window.location);
            url.searchParams.set("id", id);
            if (shiny) url.searchParams.set("shiny", "1");
            else url.searchParams.delete("shiny");
            if (corruption) url.searchParams.set("corruption", "1");
            else url.searchParams.delete("corruption"); 
            if (female && femaleAvailable) url.searchParams.set("female", "1");
            else url.searchParams.delete("female");
            if (back) url.searchParams.set("back", "1");
            else url.searchParams.delete("back");
            if (currentExtraSprite) url.searchParams.set("extra", currentExtraSprite);
            else url.searchParams.delete("extra");
            history.replaceState(null, "", url);
        }

        function checkImageExists(url) {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        }

        function checkAndDisplayExtraSprites(id) {
            const extraSpriteOptionsDiv = document.getElementById("extraSpriteOptions");
            extraSpriteOptionsDiv.innerHTML = "";

            const mon = vinemonData[id];
            const extraSpriteSuffixes = mon.extraSprites || [];

            if (document.getElementById('themeSelect').value === 'dynamic') {
                applyTheme('dynamic');
            }

            if (extraSpriteSuffixes.length > 0) {

                const defaultButton = document.createElement("button");
                defaultButton.textContent = "Default";
                defaultButton.className = "extra-sprite-option-btn";
                if (!currentExtraSprite || !extraSpriteSuffixes.includes(currentExtraSprite)) {
                    defaultButton.classList.add("active-option");
                }
                defaultButton.addEventListener("click", () => {
                    currentExtraSprite = "";
                    resetEggView();
                    document
                        .querySelectorAll(".extra-sprite-option-btn")
                        .forEach((btn) => btn.classList.remove("active-option"));
                    defaultButton.classList.add("active-option");
                    updateURL(id);
                    updateSprite(id);
                });
                extraSpriteOptionsDiv.appendChild(defaultButton);

                extraSpriteSuffixes.forEach((suffix, index) => {
                    const button = document.createElement("button");
                    button.textContent = `Option ${index + 1}`;
                    button.className = "extra-sprite-option-btn";
                    if (currentExtraSprite === suffix) {
                        button.classList.add("active-option");
                    }
                    button.dataset.suffix = suffix;
                    button.addEventListener("click", () => {
                        currentExtraSprite = button.dataset.suffix;
                        resetEggView();
                        document
                            .querySelectorAll(".extra-sprite-option-btn")
                            .forEach((btn) => btn.classList.remove("active-option"));
                        button.classList.add("active-option");
                        updateURL(id);
                        updateSprite(id);
                    });
                    extraSpriteOptionsDiv.appendChild(button);
                });

                extraSpriteOptionsDiv.style.display = "flex";
            } else {
                extraSpriteOptionsDiv.style.display = "none";
                currentExtraSprite = "";
            }
        }

        function updateNavButtons(currentId) {
            const ids = Object.keys(vinemonData)
                .map(Number)
                .sort((a, b) => a - b);
            const currentIndex = ids.indexOf(Number(currentId));

            const getSpriteUrl = (id, isShiny) => {
                const iconSuffix = isShiny ? "s" : "";
                return `https://vinemon.link/vinemon/vinemon/icons/icon${String(id).padStart(3, "0")}${iconSuffix}.png`;
            };

            const setupButton = (btn, iconDiv) => {
                const targetId = btn.dataset.id;

                if (!iconDiv.querySelector(".loading-spinner")) {
                    const loader = document.createElement("div");
                    loader.className = "loading-spinner";
                    iconDiv.appendChild(loader);
                }
                iconDiv.parentElement.classList.add("is-loading");
                iconDiv.style.backgroundImage = "none";

                const tempImg = new Image();
                tempImg.onload = () => {
                    iconDiv.style.backgroundImage = `url(${tempImg.src})`;
                    iconDiv.parentElement.classList.remove("is-loading");
                };
                tempImg.onerror = () => {
                    iconDiv.style.backgroundImage = `url('https://vinemon.link/vinemon/vinemon/icons/icon000.png')`;
                    iconDiv.parentElement.classList.remove("is-loading");
                };
                tempImg.src = getSpriteUrl(targetId, shiny);
            };

            const prevBtn = document.getElementById("prevBtn");
            const nextBtn = document.getElementById("nextBtn");
            const prevIconDiv = document.getElementById("prevIcon");
            const nextIconDiv = document.getElementById("nextIcon");

            const prevId = ids[currentIndex > 0 ? currentIndex - 1 : ids.length - 1];
            const nextId = ids[currentIndex < ids.length - 1 ? currentIndex + 1 : 0];

            prevBtn.dataset.id = String(prevId).padStart(3, "0");
            nextBtn.dataset.id = String(nextId).padStart(3, "0");


            setupButton(prevBtn, prevIconDiv);
            setupButton(nextBtn, nextIconDiv);

            prevBtn.disabled = nextBtn.disabled = ids.length <= 1;
        }

/**
 * Extracts the average color from an image element using the FastAverageColor library.
 * @param {HTMLImageElement} imgElement The image element to process.
 * @param {function(string): void} callback The function to call with the resulting color hex string.
 */
function getAverageColor(imgElement, callback) {
    const faci = new FastAverageColor();

    // Check if the image has finished loading
    if (!imgElement.complete) {
        // If not, wait for it to load
        imgElement.addEventListener('load', function() {
            faci.getColorAsync(imgElement)
                .then(color => {
                    callback(color.hex);
                })
                .catch(e => {
                    console.error(e);
                    callback('#A90024'); // Fallback color
                });
        });
    } else {
        // If it's already loaded, process it immediately
        faci.getColorAsync(imgElement)
            .then(color => {
                callback(color.hex);
            })
            .catch(e => {
                console.error(e);
                callback('#A90024'); // Fallback color
            });
    }
}

function showCreatorInfo(creatorNameKey) {
    const creator = fullCreatorData[creatorNameKey.toUpperCase().replace(/ /g, '')];
    if (!creator) return;

    const modal = document.getElementById("creatorInfoModal");
    const modalContent = modal.querySelector(".modal-content-details");
    const modalTitle = document.getElementById("creatorInfoModalTitle");
    const creatorPfp = document.getElementById("creatorPfp");

    document.getElementById("creatorInfoModalTitle").textContent = creatorNameKey;
    
    creatorPfp.crossOrigin = "Anonymous";
    
    creatorPfp.src = creator.pfp;
    document.getElementById("creatorBio").textContent = creator.bio;

   creatorPfp.onload = function() {
        getAverageColor(creatorPfp, function(avgColor) {
            // Set border colors to the vibrant average color
            modalContent.style.borderColor = avgColor;
            creatorPfp.style.borderColor = avgColor;

            const [h, s, l] = hexToHsl(avgColor);

            // Calculate a dark, desaturated version for the background
            const bgLightness = Math.max(0, l - 45); // 45% darker
            const bgSaturation = Math.max(0, s - 25); // 25% less saturated
            const newBgColor = hslToHex(h, bgSaturation, bgLightness);
            modalContent.style.backgroundColor = newBgColor;

            // Calculate a light, vibrant version for the title text
            const titleLightness = Math.min(100, l + 30); // 30% lighter
            const titleSaturation = Math.min(100, s + 10); // 10% more saturated
            const newTitleColor = hslToHex(h, titleSaturation, titleLightness);
            modalTitle.style.color = newTitleColor;

            // Calculate a darker (but still saturated) version for buttons
            const darkerButtonColor = lightenDarkenColor(avgColor, -30);

            const socialLinks = document.getElementById("creatorSocials").querySelectorAll('.creator-social-link');
            socialLinks.forEach(link => {
                link.style.borderColor = avgColor;
                link.style.backgroundColor = darkerButtonColor;
                link.addEventListener('mouseover', () => {
                    link.style.backgroundColor = avgColor;
                    link.style.color = 'black';
                });
                link.addEventListener('mouseout', () => {
                    link.style.backgroundColor = darkerButtonColor;
                    link.style.color = 'white';
                });
            });
        });
    };

    const socialsContainer = document.getElementById("creatorSocials");
    socialsContainer.innerHTML = "";

    for (const [name, url] of Object.entries(creator.socials)) {
        const link = document.createElement("a");
        link.href = url;
        link.textContent = name;
        link.className = "creator-social-link";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        socialsContainer.appendChild(link);
    }

    modal.querySelector(".close-button-details").onclick = () => {
        // Reset styles on close to avoid them carrying over
        modalContent.style.backgroundColor = '';
        modal.style.display = "none";
    };

    modal.style.display = "flex";

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modalContent.style.backgroundColor = '';
            modal.style.display = "none";
        }
    });
}

function styleTypeChartHeaders() {
    const typeChartTable = document.querySelector(".type-chart-table");
    if (!typeChartTable) return;

    // Helper to apply styles and store the original color
    const applyTypeStyles = (cell) => {
        const typeName = cell.textContent.trim().toUpperCase();
        const color = typeColors[typeName];

        if (color) {
            let finalColor = color;
            // Check if the cell is an Attacker header (in the table body)
            if (cell.parentElement.parentElement.tagName === 'TBODY') {
                finalColor = lightenDarkenColor(color, -15); // Darken by 15%
            }

            cell.style.backgroundColor = finalColor;
            cell.dataset.originalColor = finalColor; // Store the original color
            
            const lightTextTypes = ["#F7D02C", "#FFF44F", "#B6D474", "#9FF0E4"];
            cell.style.setProperty('-webkit-text-stroke', '5px #000000');
            cell.style.setProperty('paint-order', 'stroke fill');
            cell.style.border = '3px solid #00000075';
        }
    };

    // Style horizontal defender headers
    const defenderHeaders = typeChartTable.querySelectorAll("thead th");
    defenderHeaders.forEach((th, index) => {
        if (index > 0) { // Skip the corner cell
            applyTypeStyles(th);
        }
    });

    // Style vertical attacker headers
    const attackerHeaders = typeChartTable.querySelectorAll("tbody th");
    attackerHeaders.forEach(th => {
        applyTypeStyles(th);
    });
}

        function generateMap() {
            const gridContainer = document.getElementById("map-grid-container");
            const hoverInfo = document.getElementById("map-hover-info");
            gridContainer.innerHTML = "";

            const locationPoints = {};
            if (mapData.mapData && mapData.mapData[0] && mapData.mapData[0].points) {
                mapData.mapData[0].points.forEach((point) => {
                    const key = `${point.x},${point.y}`;
                    if (!locationPoints[key]) {
                        locationPoints[key] = [];
                    }
                    locationPoints[key].push(point);
                });
            }

            for (let y = 0; y < 20; y++) {
                for (let x = 0; x < 30; x++) {
                    const cell = document.createElement("div");
                    cell.className = "map-cell";
                    cell.dataset.x = x;
                    cell.dataset.y = y;

                    const pointKey = `${x},${y}`;
                    const pointsData = locationPoints[pointKey];

                    if (pointsData) {
                        cell.classList.add("location-spot");
                        const primaryPoint = pointsData[0];
                        cell.dataset.locationName = primaryPoint.name;
                        cell.dataset.subLocation = primaryPoint.subLocation || "";

                        cell.addEventListener("mouseover", () => {
                            const subLoc = cell.dataset.subLocation ? ` - ${cell.dataset.subLocation}` : "";
                            hoverInfo.innerHTML = `<p><strong>${cell.dataset.locationName}</strong>${subLoc}</p>`;
                        });

                        cell.addEventListener("mouseout", () => {
                            hoverInfo.innerHTML = "<p>Hover over a location on the map...</p>";
                        });

                        cell.addEventListener("click", () => {
                            showLocationDetails(pointsData);
                        });
                    }

                    gridContainer.appendChild(cell);
                }
            }
        }

        function updateMapForVinemon(vinemonName) {
            document.querySelectorAll(".map-cell.highlight").forEach((cell) => {
                cell.classList.remove("highlight");
            });

            const infoList = document.getElementById("map-info-list");
            infoList.innerHTML = ""; 

            const locationsFound = new Map();
            if (!mapData.mapData || !mapData.mapData[0] || !mapData.mapData[0].points) {
                infoList.innerHTML = "<p>Map data is not available.</p>";
                return;
            }

            mapData.mapData[0].points.forEach((point) => {
                const subLocations =
                    point.locations && Array.isArray(point.locations) ?
                    point.locations : [{
                        subLocationName: point.subLocation || "",
                        encounterData: point.encounterData
                    }];

                subLocations.forEach((subLoc) => {
                    if (subLoc.encounterData && subLoc.encounterData.encounterTypes) {
                        for (const encounterType in subLoc.encounterData.encounterTypes) {
                            const rarityLevels = subLoc.encounterData.encounterTypes[encounterType];

                            let allEncountersForMethod = [];
                            if (Array.isArray(rarityLevels)) {
                                allEncountersForMethod = rarityLevels;
                            } else if (typeof rarityLevels === "object" && rarityLevels !== null) {
                                allEncountersForMethod = Object.values(rarityLevels).flat();
                            }

                            if (allEncountersForMethod.some((enc) => enc.vinemonName.toUpperCase() === vinemonName.toUpperCase())) {
                                const locationKey = `${point.name}-${subLoc.subLocationName || ""}`;

                                if (!locationsFound.has(locationKey)) {
                                    locationsFound.set(locationKey, {
                                        name: point.name,
                                        subLocation: subLoc.subLocationName || "",
                                        x: point.x,
                                        y: point.y,
                                        pointsData: mapData.mapData[0].points.filter((p) => p.x === point.x && p.y === point.y)
                                    });
                                }

                                const cell = document.querySelector(`.map-cell[data-x='${point.x}'][data-y='${point.y}']`);
                                if (cell) {
                                    cell.classList.add("highlight");
                                }
                            }
                        }
                    }
                });
            });

            if (locationsFound.size > 0) {
                const ul = document.createElement("ul");
                locationsFound.forEach((loc, key) => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${loc.name}</strong>${loc.subLocation ? `<br>${loc.subLocation}` : ""}`;

                    li.dataset.x = loc.x;
                    li.dataset.y = loc.y;

                    li.addEventListener("mouseover", () => {
                        const cell = document.querySelector(`.map-cell[data-x='${li.dataset.x}'][data-y='${li.dataset.y}']`);
                        if (cell) {
                            cell.classList.add("hover-highlight");
                        }
                    });

                    li.addEventListener("mouseout", () => {
                        const cell = document.querySelector(`.map-cell[data-x='${li.dataset.x}'][data-y='${li.dataset.y}']`);
                        if (cell) {
                            cell.classList.remove("hover-highlight");
                        }
                    });
                    li.addEventListener("click", () => {
                        showLocationDetails(loc.pointsData);
                    });

                    ul.appendChild(li);
                });
                infoList.appendChild(ul);
            } else {
                infoList.innerHTML = "<p>This Vinemon cannot be found in the wild.</p>";
            }
        }

        function showLocationDetails(pointsData, targetSubLocName = null) {
            const modal = document.getElementById("locationDetailsModal");
            const locationNameEl = document.getElementById("modalLocationName");
            const encountersEl = document.getElementById("modalLocationEncounters");
            encountersEl.innerHTML = "";

            const primaryPoint = pointsData[0];
            locationNameEl.textContent = primaryPoint.name;

            const encounterDetailsContainer = document.createElement("div");

            const locationHasData = (loc) => {
                if (!loc) return false;
                return (loc.encounterData && Object.keys(loc.encounterData.encounterTypes).length > 0) ||
                    (loc.staticEncounters && loc.staticEncounters.length > 0) ||
                    (loc.gifts && loc.gifts.length > 0) ||
                    (loc.swarms && loc.swarms.encounterTypes && Object.keys(loc.swarms.encounterTypes).length > 0) ||
                    (loc.purchases && loc.purchases.length > 0);
            };

            if (primaryPoint.name === "Route 6") {
                const mainCategories = {
                    "Pre-E4": ["Route 6 [Pre-E4]", "Ice Quarry"],
                    "Post-E4": ["Route 6 [Post-E4]", "Ice Quarry", "Mike Love's Castle Hallway", "Mike Love's Castle Slimed Hallway", "Mike Love's Dungeon"]
                };
                const allSubLocations = primaryPoint.locations;
                const mainButtonContainer = document.createElement('div');
                mainButtonContainer.className = "move-category-buttons";
                const secondaryButtonContainer = document.createElement('div');
                secondaryButtonContainer.className = "move-category-buttons";
                secondaryButtonContainer.style.marginTop = "10px";

                let targetMainCatKey;
                let targetSecondarySearchName;

                if (targetSubLocName) {
                    const postE4SpecificNames = ["Mike Love's Castle Hallway", "Mike Love's Castle Slimed Hallway", "Mike Love's Dungeon", "[Post-E4]"];
                    targetMainCatKey = postE4SpecificNames.includes(targetSubLocName) ? "Post-E4" : "Pre-E4";
                    targetSecondarySearchName = targetSubLocName;
                } else {
                    targetMainCatKey = "Pre-E4";
                    targetSecondarySearchName = mainCategories["Pre-E4"][0];
                }

                const renderRoute6 = (activeMainCat, activeSecondarySearchName) => {
                    mainButtonContainer.innerHTML = '';
                    secondaryButtonContainer.innerHTML = '';

                    Object.keys(mainCategories).forEach(catName => {
                        const btn = document.createElement("button");
                        btn.textContent = `[${catName}]`;
                        btn.className = "move-category-button";
                        if (catName === activeMainCat) btn.classList.add('active');
                        btn.onclick = () => renderRoute6(catName, mainCategories[catName][0]);
                        mainButtonContainer.appendChild(btn);
                    });

                    const secondaryNames = mainCategories[activeMainCat];
                    let dataToDisplay;
                    let finalActiveSearchName = activeSecondarySearchName.startsWith("Route 6") ? activeSecondarySearchName.substring(8) : activeSecondarySearchName;

                    const foundMatch = secondaryNames.some(name => (name.startsWith("Route 6") ? name.substring(8) : name) === finalActiveSearchName);
                    if (!foundMatch) {
                        finalActiveSearchName = secondaryNames[0].startsWith("Route 6") ? secondaryNames[0].substring(8) : secondaryNames[0];
                    }

                    secondaryNames.forEach(name => {
                        const displayName = name.startsWith("Route 6") ? "Route 6" : name;
                        const searchName = name.startsWith("Route 6") ? name.substring(8) : name;
                        const locationData = allSubLocations.find(loc => loc.subLocationName === searchName);

                        if (locationData) {
                            const btn = document.createElement("button");
                            btn.textContent = displayName;
                            btn.className = "move-category-button";
                            btn.onclick = () => renderRoute6(activeMainCat, searchName);
                            if (searchName === finalActiveSearchName) {
                                btn.classList.add('active');
                                dataToDisplay = locationData;
                            }
                            secondaryButtonContainer.appendChild(btn);
                        }
                    });

                    if (dataToDisplay) {
                        displayEncounterDetails(dataToDisplay, encounterDetailsContainer);
                    }
                };

                renderRoute6(targetMainCatKey, targetSecondarySearchName);
                encountersEl.appendChild(mainButtonContainer);
                encountersEl.appendChild(secondaryButtonContainer);
                encountersEl.appendChild(encounterDetailsContainer);

            } else if (primaryPoint.name === "Route 9") {
                const mainButtonContainer = document.createElement('div');
                mainButtonContainer.className = "move-category-buttons";
                const allSubLocations = primaryPoint.locations;

                const buttonsConfig = {
                    "Prototaxite Base": {
                        subLocNames: ["Prototaxite Base"]
                    },
                    "Prototaxite Caves": {
                        subLocNames: allSubLocations.filter(l => l.subLocationName.startsWith("Mount Prototaxite") && !l.subLocationName.endsWith("Summit")).map(l => l.subLocationName)
                    },
                    "Mount Prototaxite Summit": {
                        subLocNames: ["Mount Prototaxite Summit"]
                    }
                };

                let targetBtnKey;
                if (targetSubLocName) {
                    targetBtnKey = Object.keys(buttonsConfig).find(key => buttonsConfig[key].subLocNames.includes(targetSubLocName)) || "Prototaxite Base";
                } else {
                    targetBtnKey = "Prototaxite Base";
                }

                const renderRoute9 = (activeBtnKey) => {
                    mainButtonContainer.innerHTML = '';
                    encounterDetailsContainer.innerHTML = '';

                    Object.keys(buttonsConfig).forEach(btnText => {
                        const btn = document.createElement("button");
                        btn.textContent = btnText;
                        btn.className = "move-category-button";
                        if (btnText === activeBtnKey) btn.classList.add('active');
                        btn.onclick = () => renderRoute9(btnText);
                        mainButtonContainer.appendChild(btn);
                    });

                    if (activeBtnKey === "Prototaxite Caves") {
                        const caveLocations = allSubLocations.filter(loc => loc.subLocationName && loc.subLocationName.startsWith("Mount Prototaxite") && !loc.subLocationName.endsWith("Summit"));
                        caveLocations.forEach(loc => {
                            const floorHeader = document.createElement('h3');
                            floorHeader.textContent = loc.subLocationName;
                            floorHeader.style.cssText = "background: var(--info-header-bg); padding: 6px 12px; border-radius: 6px; font-size: 1.1rem; margin: 20px 0 0 0; border-bottom: 2px solid var(--info-header-border);";
                            encounterDetailsContainer.appendChild(floorHeader);
                            const floorDetailsContainer = document.createElement('div');
                            floorDetailsContainer.style.cssText = "background: var(--info-body-bg); padding: 12px; border: 2px solid var(--info-body-border); border-top: none; border-radius: 0px 0px 6px 6px;";
                            displayEncounterDetails(loc, floorDetailsContainer);
                            encounterDetailsContainer.appendChild(floorDetailsContainer);
                        });
                    } else {
                        displayEncounterDetails(allSubLocations.find(loc => loc.subLocationName === activeBtnKey), encounterDetailsContainer);
                    }
                };

                renderRoute9(targetBtnKey);
                encountersEl.appendChild(mainButtonContainer);
                encountersEl.appendChild(encounterDetailsContainer);

            } else {
                const subLocationContainer = document.createElement("div");
                Object.assign(subLocationContainer.style, {
                    marginBottom: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px"
                });
                const locationsToShow = primaryPoint.locations && primaryPoint.locations.length > 0 ? primaryPoint.locations : [{
                    subLocationName: null,
                    ...primaryPoint
                }];

                let indexToShow = 0;
                if (targetSubLocName) {
                    const exactIndex = locationsToShow.findIndex(l => l.subLocationName === targetSubLocName);
                    if (exactIndex !== -1) indexToShow = exactIndex;
                } else {
                    const firstWithDataIndex = locationsToShow.findIndex(locationHasData);
                    if (firstWithDataIndex !== -1) indexToShow = firstWithDataIndex;
                }

                if (locationsToShow.length > 1) {
                    locationsToShow.forEach(location => {
                        const btn = document.createElement("button");
                        btn.textContent = location.subLocationName || primaryPoint.name;
                        btn.className = "move-category-button";
                        btn.onclick = () => {
                            document.querySelectorAll("#locationDetailsModal .move-category-button").forEach(b => b.classList.remove("active"));
                            btn.classList.add("active");
                            displayEncounterDetails(location, encounterDetailsContainer);
                        };
                        subLocationContainer.appendChild(btn);
                    });
                    encountersEl.appendChild(subLocationContainer);
                    encountersEl.appendChild(encounterDetailsContainer);
                    subLocationContainer.children[indexToShow].click();
                } else {
                    displayEncounterDetails(locationsToShow[0], encounterDetailsContainer);
                    encountersEl.appendChild(encounterDetailsContainer);
                }
            }

            modal.style.display = "block";
            modal.querySelector(".close").onclick = () => {
                modal.style.display = "none";
            };
            window.onclick = (event) => {
                if (event.target == modal) modal.style.display = "none";
            };
        }

        function updateMapForVinemon(vinemonName) {
            document.querySelectorAll(".map-cell.highlight").forEach(cell => cell.classList.remove("highlight"));
            const infoList = document.getElementById("map-info-list");
            infoList.innerHTML = "";

            if (!mapData.mapData || !mapData.mapData[0] || !mapData.mapData[0].points) {
                infoList.innerHTML = "<p>Map data is not available.</p>";
                return;
            }

            const locationsFound = new Map();
            const upperCaseVinemonName = vinemonName.toUpperCase();

            mapData.mapData[0].points.forEach(point => {
                if (!point.locations || !Array.isArray(point.locations)) return;

                point.locations.forEach(subLoc => {
                    let found = false;
                    const locationKey = `${point.name}-${subLoc.subLocationName || ''}`;

                    if (subLoc.encounterData?.encounterTypes) {
                        for (const type in subLoc.encounterData.encounterTypes) {
                            if ((subLoc.encounterData.encounterTypes[type] || []).some(enc => enc.vinemonName.toUpperCase() === upperCaseVinemonName)) {
                                found = true;
                                break;
                            }
                        }
                    }
                    if (!found && subLoc.staticEncounters?.some(enc => enc.vinemonName.toUpperCase() === upperCaseVinemonName)) found = true;
                    if (!found && subLoc.gifts?.some(gift => gift.vinemonName.toUpperCase() === upperCaseVinemonName)) found = true;
                    if (!found && subLoc.swarms?.encounterTypes) {
                        for (const type in subLoc.swarms.encounterTypes) {
                            if (subLoc.swarms.encounterTypes[type].some(name => name.toUpperCase() === upperCaseVinemonName)) {
                                found = true;
                                break;
                            }
                        }
                    }
                    if (!found && subLoc.purchases?.some(item => item.vinemonName.toUpperCase() === upperCaseVinemonName)) found = true;

                    if (found && !locationsFound.has(locationKey)) {
                        locationsFound.set(locationKey, {
                            name: point.name,
                            subLocation: subLoc.subLocationName || "",
                            x: point.x,
                            y: point.y,
                            pointsData: mapData.mapData[0].points.filter(p => p.x === point.x && p.y === point.y)
                        });
                        const cell = document.querySelector(`.map-cell[data-x='${point.x}'][data-y='${point.y}']`);
                        if (cell) cell.classList.add("highlight");
                    }
                });
            });

            if (locationsFound.size > 0) {
                const ul = document.createElement("ul");
                locationsFound.forEach((loc) => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${loc.name}</strong>${loc.subLocation ? `<br>${loc.subLocation.replace(/\[|\]/g, '')}` : ''}`;
                    li.addEventListener("mouseover", () => document.querySelector(`.map-cell[data-x='${loc.x}'][data-y='${loc.y}']`)?.classList.add("hover-highlight"));
                    li.addEventListener("mouseout", () => document.querySelector(`.map-cell[data-x='${loc.x}'][data-y='${loc.y}']`)?.classList.remove("hover-highlight"));
                    li.addEventListener("click", () => showLocationDetails(loc.pointsData, loc.subLocation));
                    ul.appendChild(li);
                });
                infoList.appendChild(ul);
            } else {
                infoList.innerHTML = "<p>This Vinemon is not available at any specific location.</p>";
            }
        }

function displayEncounterDetails(location, container) {
            const targetContainer = container || document.getElementById("modalLocationEncounters").querySelector("div:last-child");
            targetContainer.innerHTML = "";

            let hasRenderedFemaleNidoodlan = false;

            const createVinemonLink = (vinemonName, detailsText, categoryColor = "#888") => {
                let vinemonId;

                if (vinemonName.toUpperCase() === "NIDOODLAN") {
                    if (!hasRenderedFemaleNidoodlan) {
                        vinemonId = "029"; // Assign first instance as Female
                        hasRenderedFemaleNidoodlan = true;
                    } else {
                        vinemonId = "032"; // Assign second instance as Male
                    }
                } else {
                    vinemonId = Object.keys(vinemonData).find(key => vinemonData[key].name.toUpperCase() === vinemonName.toUpperCase());
                }

                if (!vinemonId) return null;

                const li = document.createElement("li");
                li.style.marginBottom = "8px";
                if (vinemonName.toUpperCase() === document.getElementById("monName").textContent.toUpperCase() && vinemonId === document.getElementById("vinemonSelect").value) {
                    li.classList.add("current-vinemon-highlight");
                }

                const link = document.createElement("a");
                link.href = `?id=${vinemonId}`;
                Object.assign(link.style, {
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 10px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "white",
                    backgroundColor: categoryColor,
                    border: "2px solid rgba(0,0,0,0.4)",
                    boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.2)"
                });
                link.onclick = (e) => {
                    e.preventDefault();
                    document.getElementById("locationDetailsModal").style.display = "none";
                    loadVinemon(vinemonId);
                };

                const icon = document.createElement("div");
                const iconSuffix = shiny ? "s" : "";
                icon.className = "evolution-icon-sprite";
                icon.style.backgroundImage = `url(https://vinemon.link/vinemon/vinemon/icons/icon${String(vinemonId).padStart(3, "0")}${iconSuffix}.png)`;
                icon.style.marginRight = "10px";
                icon.style.boxShadow = "0 0 0 3px #00000075 inset";
                icon.style.borderRadius = "4px";
                icon.style.backgroundColor = "#00000075";

                const nameSpan = document.createElement("span");
                nameSpan.textContent = vinemonData[vinemonId].name;
                nameSpan.style.fontWeight = "bold";

                const detailsSpan = document.createElement("span");
                detailsSpan.textContent = detailsText;
                detailsSpan.style.marginLeft = "auto";
                detailsSpan.style.fontSize = "0.9em";

                link.appendChild(icon);
                link.appendChild(nameSpan);
                link.appendChild(detailsSpan);
                li.appendChild(link);
                return li;
            };

            if (location.staticEncounters?.length > 0) {
                const header = document.createElement("h4");
                header.textContent = "Static Encounters";
                targetContainer.appendChild(header);
                const ul = document.createElement("ul");
                location.staticEncounters.forEach(enc => {
                    const details = enc.count ? `(x${enc.count})` : "(Static)";
                    const li = createVinemonLink(enc.vinemonName, details, "#4a7a96");
                    if (li) {
                        if (enc.notes) {
                            const notesP = document.createElement('p');
                            notesP.textContent = enc.notes;
                            notesP.style.cssText = "font-size: 0.85em; line-height: 1.3; margin-left: 10px; margin-right: 10px; margin-top: 4px; opacity: 0.9; padding: 6px 10px; background: rgba(0,0,0,0.2); border-radius: 6px;";
                            li.appendChild(notesP);
                        }
                        ul.appendChild(li);
                    }
                });
                targetContainer.appendChild(ul);
            }

            if (location.encounterData && location.encounterData.encounterTypes) {
                for (const type in location.encounterData.encounterTypes) {
                    let allEncountersForMethod = [];
                    const encountersSource = location.encounterData.encounterTypes[type];
                    if (Array.isArray(encountersSource)) allEncountersForMethod = encountersSource;
                    else if (typeof encountersSource === 'object' && encountersSource !== null) allEncountersForMethod = Object.values(encountersSource).flat();
                    if (allEncountersForMethod.length === 0) continue;

                    const encounterMethod = type.replace(/([A-Z])/g, ' $1').trim();
                    const typeHeader = document.createElement("h4");
                    typeHeader.textContent = `Wild Encounters (Via ${encounterMethod})`;
                    targetContainer.appendChild(typeHeader);

                    const categoriesContainer = document.createElement('div');
                    Object.assign(categoriesContainer.style, {
                        display: 'flex',
                        gap: '16px',
                        flexWrap: 'wrap',
                        width: '100%'
                    });

                    const uniqueChances = [...new Set(allEncountersForMethod.map(enc => enc.chance))].sort((a, b) => b - a);
                    const categorized = {
                        Common: [],
                        Uncommon: [],
                        Rare: []
                    };
                    allEncountersForMethod.forEach(enc => {
                        if (uniqueChances.length > 0 && enc.chance === uniqueChances[0]) categorized.Common.push(enc);
                        else if (uniqueChances.length > 1 && enc.chance === uniqueChances[1]) categorized.Uncommon.push(enc);
                        else categorized.Rare.push(enc);
                    });

                    Object.entries({
                        Common: '#ADADAD',
                        Uncommon: '#6294CD',
                        Rare: '#D0288F'
                    }).forEach(([catName, color]) => {
                        const encounters = categorized[catName];
                        if (encounters.length > 0) {
                            const columnDiv = document.createElement('div');
                            Object.assign(columnDiv.style, {
                                flex: '1',
                                minWidth: '250px'
                            });
                            const subHeader = document.createElement('p');
                            subHeader.innerHTML = `<strong>${catName}</strong>`;
                            const ul = document.createElement('ul');
                            encounters.sort((a, b) => b.chance - a.chance).forEach(enc => {
                                const levelText = enc.minLevel === enc.maxLevel ? `Lvl ${enc.minLevel}` : `Lvl ${enc.minLevel}-${enc.maxLevel}`;
                                const li = createVinemonLink(enc.vinemonName, `${levelText} (${enc.chance}%)`, color);
                                if (li) ul.appendChild(li);
                            });
                            columnDiv.appendChild(subHeader);
                            columnDiv.appendChild(ul);
                            categoriesContainer.appendChild(columnDiv);
                        }
                    });
                    targetContainer.appendChild(categoriesContainer);
                }
            }

            if (location.gifts?.length > 0) {
                const header = document.createElement("h4");
                header.textContent = "Gift Vinemon";
                targetContainer.appendChild(header);
                const ul = document.createElement("ul");
                location.gifts.forEach(gift => {
                    const details = gift.nickname ? `(Nickname: ${gift.nickname})` : "(Gift)";
                    const li = createVinemonLink(gift.vinemonName, details, "#967c4a");
                    if (li) {
                        if (gift.notes) {
                            const notesP = document.createElement('p');
                            notesP.textContent = gift.notes;
                            notesP.style.cssText = "font-size: 0.85em; line-height: 1.3; margin-left: 10px; margin-right: 10px; margin-top: 4px; opacity: 0.9; padding: 6px 10px; background: rgba(0,0,0,0.2); border-radius: 6px;";
                            li.appendChild(notesP);
                        }
                        ul.appendChild(li);
                    }
                });
                targetContainer.appendChild(ul);
            }

            if (location.swarms) {
                const header = document.createElement("h4");
                header.textContent = "Potential Swarms";
                const swarmInfo = document.createElement('p');
                swarmInfo.style.fontSize = '0.9em';
                swarmInfo.textContent = `Daily Spawn Chance: ${location.swarms.spawnChance}%`;
                targetContainer.appendChild(header);
                targetContainer.appendChild(swarmInfo);
                const ul = document.createElement("ul");
                for (const type in location.swarms.encounterTypes) {
                    location.swarms.encounterTypes[type].forEach(name => {
                        const levelInfo = swarmLevelData[name.toUpperCase()];
                        let levelText = levelInfo ? `Lvl ${levelInfo.min}-${levelInfo.max} ` : "";
                        const details = `${levelText}(Swarm - ${type}) (${location.swarms.encounterRate}%)`;
                        const li = createVinemonLink(name, details, "#9d5a9d");
                        if (li) ul.appendChild(li);
                    });
                }
                targetContainer.appendChild(ul);
            }

            if (location.purchases?.length > 0) {
                const header = document.createElement("h4");
                header.textContent = "Purchasable";
                targetContainer.appendChild(header);
                const ul = document.createElement("ul");
                location.purchases.forEach(item => {
                    const details = `${item.cost} ${item.currency}`;
                    const li = createVinemonLink(item.vinemonName, details, "#4a965d");
                    if (li) ul.appendChild(li);
                });
                targetContainer.appendChild(ul);
            }

            if (targetContainer.children.length === 0) {
                targetContainer.innerHTML = "<p>No special encounters or items at this location.</p>";
            }
        }

        function displayAbilities(containerId, abilityNames) {
            const container = document.getElementById(containerId);
            container.innerHTML = "";
            if (abilityNames && abilityNames.length > 0) {
                abilityNames.forEach((internalName) => {
                    const abilityData = allAbilitiesRaw.find((ab) => ab.name.toUpperCase() === internalName.toUpperCase());

                    if (abilityData) {
                        const span = document.createElement("span");
                        span.textContent = abilityData.in_game_name;
                        span.style.cursor = "pointer";

                        span.addEventListener("click", () => {
                            const learners = Object.values(vinemonData)
                                .filter(
                                    (mon) =>
                                    (mon.abilities && mon.abilities.includes(abilityData.name)) ||
                                    (mon.hidden && mon.hidden.includes(abilityData.name))
                                )
                                .map((mon) => mon.name);

                            showAbilityDetails(abilityData, learners);
                        });

                        container.appendChild(span);
                    } else {
                        const span = document.createElement("span");
                        span.textContent = internalName;
                        container.appendChild(span);
                    }
                });
            } else {
                container.textContent = "—";
            }
        }

        function createEvolutionLink(evoId, textContent) {
            const badgeLink = document.createElement("a");
            badgeLink.className = "evolution-badge";
            badgeLink.href = `?id=${evoId}`;
            badgeLink.addEventListener("click", (e) => {
                e.preventDefault();
                loadVinemon(evoId);
            });

            const iconContainer = document.createElement("div");
            iconContainer.className = "image-container";
            iconContainer.style.display = "inline-flex";
            iconContainer.style.width = "32px";
            iconContainer.style.height = "32px";

            const iconDiv = document.createElement("div");
            iconDiv.className = "evolution-icon-sprite";
            iconContainer.appendChild(iconDiv);

            const iconSuffix = shiny ? "s" : "";
            const iconUrl = `https://vinemon.link/vinemon/vinemon/icons/icon${evoId}${iconSuffix}.png`;
            const img = new Image();
            img.onload = () => {
                iconDiv.style.backgroundImage = `url(${iconUrl})`;
            };
            img.onerror = () => {
                iconDiv.style.backgroundImage = `url(https://vinemon.link/vinemon/vinemon/icons/icon000.png)`;
            };
            img.src = iconUrl;

            const textSpan = document.createElement("span");
            textSpan.textContent = textContent;

            badgeLink.appendChild(iconContainer);
            badgeLink.appendChild(textSpan);
            return badgeLink;
        }

        function getItemInfo(itemInternalName) {
            if (typeof allItemsData === 'undefined' || !allItemsData) {
                console.error("allItemsData is not loaded yet.");
                return null;
            }
            return allItemsData.find(item => item.name === itemInternalName);
        }

function createItemBadge(itemInternalName) {
            const itemInfo = getItemInfo(itemInternalName);
            if (!itemInfo) return document.createElement('span'); 

            const itemButton = document.createElement("a");
            itemButton.className = "evolution-badge";
            itemButton.href = "#";
            itemButton.onclick = (e) => {
                e.preventDefault();
                showItemDetails(itemInfo.name);
            };
            Object.assign(itemButton.style, {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 8px 4px 4px"
            });

            const iconContainer = document.createElement("div");
            iconContainer.style.cssText = `display: inline-flex; justify-content: center; align-items: center; width: 32px; height: 32px; background: var(--info-body-bg); border: 2px solid var(--button-border); border-radius: 6px; flex-shrink: 0;`;
            
            const itemIcon = document.createElement("img");
            itemIcon.src = `https://vinemon.link/vinemon/vinemon/items/item${String(itemInfo.id).padStart(3, "0")}.png`;
            itemIcon.style.cssText = "width: 24px; height: 24px;";
            
            iconContainer.appendChild(itemIcon);

            const itemNameSpan = document.createElement("span");
            itemNameSpan.textContent = itemInfo.displayName;

            itemButton.appendChild(iconContainer);
            itemButton.appendChild(itemNameSpan);

            return itemButton;
        }

        function findLocationPointById(locationId) {
            if (!mapData.mapData || !mapData.mapData[0] || !mapData.mapData[0].points) {
                return null;
            }

            for (const point of mapData.mapData[0].points) {
                if (point.locations && Array.isArray(point.locations)) {
                    const matchingSubLocation = point.locations.find(
                        (loc) => loc.encounterData && String(loc.encounterData.id_from_file) === String(locationId)
                    );

                    if (matchingSubLocation) {
                        return {
                            ...point,
                            subLocation: matchingSubLocation.subLocationName,
                            encounterData: matchingSubLocation.encounterData 
                        };
                    }
                }
            }
            return null;
        }

        const originIcon = document.getElementById("originIcon");
        const originModal = document.getElementById("originModal");
        const originModalTitle = document.getElementById("originModalTitle");
        const originModalContent = document.getElementById("originModalContent");

        function updateOriginIcon(id) {
            const mon = vinemonData[id];
            originIcon.style.display = 'block';

            originIcon.src = `https://vinemon.link/vinemon/vinemon/origins/footprint${String(id).padStart(3, "0")}.png`;

            originIcon.onclick = () => {
                originModalTitle.textContent = `${mon.name}'s Origins`;
                switch (id) {

                    case '001':
                    case '002':
                    case '003':
                        originModalContent.textContent = "Apple's line originates from Animal Crossing! The inclusion is due to Imakuni having Apple as a Villager in her Animal Crossing playthroughs. Apple is notoriously known to Eat Ass on her streams!";
                        break;
                    case '004':
                    case '005':
                        originModalContent.textContent = "Cherry's Line originates from Animal Crossing! The inclusion is due to Cherry being a fan favorite of Vinny Vinesauce's streams of Animal Crossing while being a sort of Villager that Vinny had a playful disliking of them narratively! The Shiny of Cherry is based on Lucky which in the series was fan theorized to be Cherry in disguise!";
                        break;
                    case '006':
                        originModalContent.textContent = "Numb Cherry originates from Animal Crossing! While the inclusion is the same for the pre evolves, the design of Numb Cherry is based on Vlinny and acts a extra connection point as both characters had a fell from grace over time due to artist depictions! The Shiny of Cherry is based on Lucky which in the series was fan theorized to be Cherry in disguise!";
                        break;
                    case '148':
                        originModalContent.textContent = "Chatyot is based on the concept of a parrot that mimics internet memes and streamer culture, a playful take on the 'Jape Me' Vinemon kind.";
                        break;
                    default:
                        originModalContent.textContent = "This Vinemon's origin is currently a mystery, waiting to be discovered!";
                }
                originModal.style.display = "flex";
            };
        }

        originModal.querySelector(".close-button-details").addEventListener("click", () => {
            originModal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target == originModal) {
                originModal.style.display = "none";
            }
        });

        async function loadVinemon(id) {
            if (isLoading) return;
            isLoading = true;

            resetEggView();
            updateOriginIcon(id);

            try {
                const mon = vinemonData[id];
                if (!mon) return;

                const viewEggBtn = document.getElementById('viewEggBtn');
                viewEggBtn.style.display = isBaseForm(id) ? 'inline-block' : 'none';

                updateNavButtons(id);
                document.getElementById("vinemonSelect").value = id;
                document.getElementById("monName").textContent = mon.name.toUpperCase();
                document.getElementById("monNumber").textContent = `#${id}`;
                document.getElementById("kind").textContent = mon.kind || "";

                const femalePathsToCheck = [
                    `https://vinemon.link/vinemon/vinemon/female/${id}.png`,
                    `https://vinemon.link/vinemon/vinemon/shiny/female/${id}.png`,
                    `https://vinemon.link/vinemon/vinemon/back/female/${id}.png`,
                    `https://vinemon.link/vinemon/vinemon/back/shiny/female/${id}.png`
                ];
                const checks = femalePathsToCheck.map(path => checkImageExists(path));
                const results = await Promise.all(checks);
                femaleAvailable = results.some(exists => exists);

                document.getElementById("genderToggle").disabled = !femaleAvailable;
                if (!femaleAvailable) {
                    female = false;
                }

                document.getElementById("shinyToggle").checked = shiny;
                document.getElementById("genderToggle").checked = female;
                document.getElementById("backToggle").checked = back;
                document.getElementById("corruptionToggle").checked = corruption;

                checkAndDisplayExtraSprites(id);
                updateURL(id);
                updateSprite(id);
                updateMapForVinemon(mon.name);

                const dexEntryElement = document.getElementById("dexEntry");
                let dexHTML = mon.dex.replace(/\\n/g, "<br>");

                const creatorNames = Object.keys(fullCreatorData);
                const creatorsRegex = new RegExp(`(${creatorNames.join("|")})`, "gi");
                dexHTML = dexHTML.replace(creatorsRegex, (match) => {
                    const creatorKey = match.toUpperCase().replace(/ /g, '');
                    return fullCreatorData[creatorKey] ?
                        `<a href="#" onclick="event.preventDefault(); showCreatorInfo('${match}')" style="color: #00bcd4; font-weight: bold;">${match}</a>` :
                        match;
                });

                const nameToDataMap = new Map();
                Object.entries(vinemonData).forEach(([monId, monData]) => {
                    if (monData.name) {
                        nameToDataMap.set(monData.name.toUpperCase(), {
                            id: monId,
                            data: monData
                        });
                    }
                });

                const sortedNames = Object.values(vinemonData)
                    .map((data) => data.name)
                    .filter((name) => name && !descriptionLinkExclusions.has(name.toUpperCase()))
                    .sort((a, b) => b.length - a.length);

                if (sortedNames.length > 0) {
                    const allNamesPattern = sortedNames.map((name) => name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|");
                    const masterRegex = new RegExp(`\\b(${allNamesPattern})('s|s)?\\b`, "gi");
                    dexHTML = dexHTML.replace(masterRegex, (match, name, suffix) => {
                        suffix = suffix || "";
                        const upperCaseName = name.toUpperCase();
                        const isSelf = mon.name.toUpperCase() === upperCaseName;
                        if (isSelf) {
                            return `<b>${upperCaseName}</b>${suffix}`;
                        } else {
                            const otherMonInfo = nameToDataMap.get(upperCaseName);
                            if (otherMonInfo) {
                                return `<b><a href="#" onclick="event.preventDefault(); loadVinemon('${otherMonInfo.id}')">${upperCaseName}</a></b>${suffix}`;
                            }
                        }
                        return match;
                    });
                }
                dexEntryElement.innerHTML = dexHTML;

                const genderMap = {
                    AlwaysFemale: { female: 100, male: 0, label: "♀ Only" },
                    AlwaysMale: { female: 0, male: 100, label: "♂ Only" },
                    Genderless: { female: 0, male: 0, label: "Genderless" },
                    FemaleOneEighth: { female: 12.5, male: 87.5, label: "♀ 12.5% / ♂ 87.5%" },
                    FemaleSevenEighths: { female: 87.5, male: 12.5, label: "♀ 87.5% / ♂ 12.5%" },
                    Female25Percent: { female: 25, male: 75, label: "♀ 25% / ♂ 75%" },
                    Female50Percent: { female: 50, male: 50, label: "♀ 50% / ♂ 50%" },
                    Female75Percent: { female: 75, male: 25, label: "♀ 75% / ♂ 25%" }
                };
                const gender = genderMap[mon.genderRate] || { female: 0, male: 0, label: mon.genderRate };
                document.querySelector(".gender-female").style.width = `${gender.female}%`;
                document.querySelector(".gender-male").style.width = `${gender.male}%`;
                document.getElementById("genderRateLabel").textContent = gender.label;
                const typeWrap = document.getElementById("typeBadges");
                typeWrap.innerHTML = "";
                mon.types.forEach((originalType) => {
                    const displayType = getDisplayTypeName(originalType);
                    const mappedTypeForColor = mapType(originalType);
                    const span = document.createElement("span");
                    span.textContent = displayType;
                    const theme = document.getElementById('themeSelect').value;
                    if (theme === 'day') {
                        const colors = accessibleTypeColorsDay[mappedTypeForColor] || "#ff3399";
                        span.style.backgroundColor = colors.bg;
                        span.style.color = colors.text;
                    } else {
                        const color = typeColors[mappedTypeForColor] || "#ff3399";
                        span.style.backgroundColor = color;
                        span.style.color = ["#F7D02C", "#FFF44F", "#E2BF65", "#A8A77A", "#B6D474", "#9FF0E4"].includes(color.toUpperCase()) ? "#000" : "#FFF";
                    }
                    span.onclick = () => openVinemonListAndFilterByType(mappedTypeForColor);
                    typeWrap.appendChild(span);
                });
                displayAbilities("abilityList", mon.abilities);
                displayAbilities("hiddenAbilities", mon.hidden);
                const statWrap = document.getElementById("statBars");
                statWrap.innerHTML = "";
                let total = 0;
                const statLabels = ["HP", "ATK", "DEF", "SPD", "SP.ATK", "SP.DEF"];
                mon.stats.forEach((val, i) => {
                    const widthPercent = (val / 255) * 100;
                    const bar = document.createElement("div");
                    bar.className = "stat-bar";
                    bar.innerHTML = `<span class='stat-name'>${statLabels[i]}</span><span class='stat-value'>${val}</span><div class='bar-container'><div class='bar' style='width: ${widthPercent}%; background: ${getStatColor(i)};'></div></div>`;
                    statWrap.appendChild(bar);
                    total += val;
                });
                document.getElementById("totalStat").textContent = total;
                const totalStatBar = document.getElementById("totalStatBar");
                if (totalStatBar) {
                    const bstPercent = (total / 780) * 100;
                    totalStatBar.style.width = `${bstPercent}%`;
                }
                document.getElementById("height").textContent = `${mon.height} m`;
                document.getElementById("weight").textContent = `${mon.weight} kg`;
                const comp1Span = document.getElementById("compatibility1"),
                    comp2Span = document.getElementById("compatibility2");
                comp1Span.innerHTML = "";
                comp2Span.innerHTML = "";
                const createBreedingLink = (groupName) => {
                    const link = document.createElement("a");
                    link.textContent = groupName;
                    link.href = "#";
                    link.className = "breeding-group-link";
                    link.style.backgroundColor = breedingGroupColors[groupName] || "#68A090";
                    link.onclick = (e) => {
                        e.preventDefault();
                        resetAndFilterVinemonList("breedingGroup", groupName);
                    };
                    return link;
                };
                if (mon.compatibility[0]) comp1Span.appendChild(createBreedingLink(mon.compatibility[0]));
                if (mon.compatibility[1]) comp2Span.appendChild(createBreedingLink(mon.compatibility[1]));
                
                // --- EVOLUTION LOGIC START ---
                const evolutionsContainer = document.getElementById("evolutions");
                evolutionsContainer.innerHTML = "";
                let hasEvolutionaryInfo = false;
                const preEvos = preEvoMap[mon.name.toUpperCase()];

                if (preEvos && preEvos.length > 0) {
                    hasEvolutionaryInfo = true;
                    const preEvoHeader = document.createElement("p");
                    preEvoHeader.innerHTML = "<strong>Evolves From:</strong>";
                    preEvoHeader.style.cssText = "font-weight: bold; margin-top: 25px;";
                    evolutionsContainer.appendChild(preEvoHeader);

                    preEvos.forEach(preEvo => {
                        const paddedPreEvoId = String(preEvo.id).padStart(3, "0");
                        const displayName = preEvo.name;

                        // Special case for Re:PolyCrash's pre-evolution from item
                        if (mon.name.toUpperCase() === "RE:POLYCRASH" && preEvo.condition === 'HoldItem' && preEvo.value === 'RTCEVO') {
                            const customEvoDiv = document.createElement('div');
                            customEvoDiv.style.marginBottom = '15px';

                            const preEvoLink = createEvolutionLink(paddedPreEvoId, preEvo.name);
                            Object.assign(preEvoLink.style, {boxSizing: 'border-box', justifyContent: 'center' });

                            const viaText = document.createElement('p');
                            viaText.textContent = 'While Holding';
                            viaText.style.margin = '8px 0';
                            viaText.style.fontWeight = 'bold';
                            
                            const itemButton = createItemBadge("RTCEVO");
                            Object.assign(itemButton.style, { width: '100%', boxSizing: 'border-box', justifyContent: 'center' });

                            customEvoDiv.appendChild(preEvoLink);
                            customEvoDiv.appendChild(viaText);
                            customEvoDiv.appendChild(itemButton);
                            evolutionsContainer.appendChild(customEvoDiv);
                        } else { // Default pre-evolution logic
                            if (preEvo.condition === "Item") {
                               const itemInfo = getItemInfo(preEvo.value);
                                if (itemInfo) {
                                    const evolutionContainer = document.createElement("div");
                                    Object.assign(evolutionContainer.style, { display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" });
                                    const vinemonLink = createEvolutionLink(paddedPreEvoId, displayName);
                                    const viaText = document.createTextNode(" via ");
                                    const itemButton = createItemBadge(preEvo.value);
                                    evolutionContainer.appendChild(vinemonLink);
                                    evolutionContainer.appendChild(viaText);
                                    evolutionContainer.appendChild(itemButton);
                                    evolutionsContainer.appendChild(evolutionContainer);
                                }
                            } else if (preEvo.condition === "LandCritical") {
                                const evolutionContainer = document.createElement("div");
                                Object.assign(evolutionContainer.style, { display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" });
                                const vinemonLink = createEvolutionLink(paddedPreEvoId, displayName);
                                const viaText = document.createTextNode(" via ");
                                const conditionBadge = document.createElement("a");
                                conditionBadge.className = "evolution-badge info-link critical-hit-badge";
                                conditionBadge.href = "#";
                                conditionBadge.dataset.infoKey = "criticalHit";
                                Object.assign(conditionBadge.style, { display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 8px 4px 4px" });
                                const iconContainer = document.createElement("div");
                                iconContainer.style.cssText = `display: inline-flex; justify-content: center; align-items: center; width: 32px; height: 32px; background: var(--info-body-bg); border: 2px solid var(--button-border); border-radius: 6px; flex-shrink: 0;`;
                                const conditionIcon = document.createElement("img");
                                conditionIcon.src = "https://vinemon.link/images/D20.png";
                                conditionIcon.style.cssText = "width: 24px; height: 24px;";
                                iconContainer.appendChild(conditionIcon);
                                const conditionTextSpan = document.createElement("span");
                                conditionTextSpan.textContent = "Critical Hits";
                                conditionBadge.appendChild(iconContainer);
                                conditionBadge.appendChild(conditionTextSpan);
                                evolutionContainer.appendChild(vinemonLink);
                                evolutionContainer.appendChild(viaText);
                                evolutionContainer.appendChild(conditionBadge);
                                evolutionsContainer.appendChild(evolutionContainer);
                            } else if (preEvo.condition === "Location") {
                                const locationId = preEvo.value;
                                const locationPoint = findLocationPointById(locationId);
                                if (locationPoint) {
                                    const locationName = `${locationPoint.name}${locationPoint.subLocation ? ` - ${locationPoint.subLocation}` : ""}`;
                                    const vinemonLink = createEvolutionLink(paddedPreEvoId, displayName);
                                    evolutionsContainer.appendChild(vinemonLink);
                                    const viaTextElement = document.createElement("p");
                                    viaTextElement.textContent = "when Leveling Up in";
                                    viaTextElement.style.cssText = "text-align: center; margin: 8px 0; font-weight: bold;";
                                    evolutionsContainer.appendChild(viaTextElement);
                                    const locationButton = document.createElement("a");
                                    locationButton.className = "evolution-badge";
                                    locationButton.href = "#";
                                    locationButton.onclick = (e) => { e.preventDefault(); showEvolutionLocationMap(locationId); };
                                    Object.assign(locationButton.style, { display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 8px 4px 4px", width: "fit-content", margin: "0 auto", background: "#004053", border: "2px solid #5af"});
                                    const iconContainer = document.createElement("div");
                                    iconContainer.style.cssText = `display: inline-flex; justify-content: center; align-items: center; width: 48px; height: 38px; background: var(--info-body-bg); border: 2px solid var(--button-border); border-radius: 6px; flex-shrink: 0;background: #002a37; border: 2px solid #5AF;`;
                                    const locationIcon = document.createElement("img");
                                    locationIcon.src = "https://vinemon.link/vinemon/vinemon/ui/vineMap.png";
                                    locationIcon.style.cssText = "width: 38px; height: 28px;";
                                    iconContainer.appendChild(locationIcon);
                                    const locationNameSpan = document.createElement("span");
                                    locationNameSpan.textContent = locationName;
                                    locationButton.appendChild(iconContainer);
                                    locationButton.appendChild(locationNameSpan);
                                    evolutionsContainer.appendChild(locationButton);
                                }
                            } else {
                                let preEvoConditionText = preEvo.condition === "Level" && preEvo.value ? `at Level ${preEvo.value}` : (preEvo.condition ? ` (${preEvo.condition})` : "");
                                const badgeLink = createEvolutionLink(paddedPreEvoId, `${displayName} ${preEvoConditionText}`);
                                evolutionsContainer.appendChild(badgeLink);
                            }
                        }
                    });
                }

                const evoArray = mon.evolutions || [];
                if (evoArray.length > 0) {
                    hasEvolutionaryInfo = true;
                    const evoHeader = document.createElement("p");
                    evoHeader.innerHTML = "<strong>Evolves To:</strong>";
                    evoHeader.style.cssText = `margin: 25px 0px 5px 0px; font-weight: bold;`;
                    evolutionsContainer.appendChild(evoHeader);

                    for (let i = 0; i < evoArray.length; i += 3) {
                        const internalName = evoArray[i];
                        const levelKeyword = evoArray[i + 1];
                        const levelValue = evoArray[i + 2];
                        const evoEntry = Object.entries(vinemonData).find(([vid, vdata]) => vdata.name?.toUpperCase() === internalName.toUpperCase());

                        if (evoEntry) {
                            const [evoId, evoData] = evoEntry;
                            const paddedEvoId = String(evoId).padStart(3, "0");
                            const displayName = evoData.name;
                             
                            // Special case for Re:TechCrash's item evolution
                            if (mon.name.toUpperCase() === 'RE:TECHCRASH' && (levelKeyword === "HoldItem" || levelKeyword === "Item") && levelValue === 'RTCEVO') {
                                const customEvoDiv = document.createElement('div');
                                customEvoDiv.style.marginBottom = '15px';
                                
                                const evoLink = createEvolutionLink(paddedEvoId, displayName);
                                Object.assign(evoLink.style, { boxSizing: 'border-box', justifyContent: 'center' });
                               
                                const viaText = document.createElement('p');
                                viaText.textContent = 'While Holding';
                                viaText.style.margin = '8px 0';
                                viaText.style.fontWeight = 'bold';
                                
                                const itemButton = createItemBadge("RTCEVO");
                                Object.assign(itemButton.style, { width: '100%', boxSizing: 'border-box', justifyContent: 'center' });

                                customEvoDiv.appendChild(evoLink);
                                customEvoDiv.appendChild(viaText);
                                customEvoDiv.appendChild(itemButton);
                                evolutionsContainer.appendChild(customEvoDiv);

                            } else { // Default evolution logic for all other cases
                                if (levelKeyword === "Item" || levelKeyword === "HoldItem") {
                                    const itemInfo = getItemInfo(levelValue);
                                    if (itemInfo) {
                                        const evolutionContainer = document.createElement("div");
                                        Object.assign(evolutionContainer.style, { display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" });
                                        const vinemonLink = createEvolutionLink(paddedEvoId, displayName);
                                        const viaText = document.createTextNode(" via ");
                                        const itemButton = createItemBadge(levelValue);
                                        evolutionContainer.appendChild(vinemonLink);
                                        evolutionContainer.appendChild(viaText);
                                        evolutionContainer.appendChild(itemButton);
                                        evolutionsContainer.appendChild(evolutionContainer);
                                    }
                                } else if (levelKeyword === "LandCritical") {
                                    const evolutionContainer = document.createElement("div");
                                    Object.assign(evolutionContainer.style, { display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" });
                                    const vinemonLink = createEvolutionLink(paddedEvoId, displayName);
                                    const viaText = document.createTextNode(" via ");
                                    const conditionBadge = document.createElement("a");
                                    conditionBadge.className = "evolution-badge info-link critical-hit-badge";
                                    conditionBadge.href = "#";
                                    conditionBadge.dataset.infoKey = "criticalHit";
                                    Object.assign(conditionBadge.style, { display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 8px 4px 4px" });
                                    const iconContainer = document.createElement("div");
                                    iconContainer.style.cssText = `display: inline-flex; justify-content: center; align-items: center; width: 32px; height: 32px; background: var(--info-body-bg); border: 2px solid var(--button-border); border-radius: 6px; flex-shrink: 0;`;
                                    const conditionIcon = document.createElement("img");
                                    conditionIcon.src = "https://vinemon.link/images/D20.png";
                                    conditionIcon.style.cssText = "width: 24px; height: 24px;";
                                    iconContainer.appendChild(conditionIcon);
                                    const conditionTextSpan = document.createElement("span");
                                    conditionTextSpan.textContent = "Critical Hits";
                                    conditionBadge.appendChild(iconContainer);
                                    conditionBadge.appendChild(conditionTextSpan);
                                    evolutionContainer.appendChild(vinemonLink);
                                    evolutionContainer.appendChild(viaText);
                                    evolutionContainer.appendChild(conditionBadge);
                                    evolutionsContainer.appendChild(evolutionContainer);
                                } else if (levelKeyword === "Location") {
                                    const locationId = levelValue;
                                    const locationPoint = findLocationPointById(locationId);
                                    if (locationPoint) {
                                        const locationName = `${locationPoint.name}${locationPoint.subLocation ? ` - ${locationPoint.subLocation}` : ""}`;
                                        const vinemonLink = createEvolutionLink(paddedEvoId, displayName);
                                        evolutionsContainer.appendChild(vinemonLink);
                                        const viaTextElement = document.createElement("p");
                                        viaTextElement.textContent = "when Leveling Up in";
                                        viaTextElement.style.cssText = "text-align: center; margin: 8px 0; font-weight: bold;";
                                        evolutionsContainer.appendChild(viaTextElement);
                                        const locationButton = document.createElement("a");
                                        locationButton.className = "evolution-badge";
                                        locationButton.href = "#";
                                        locationButton.onclick = (e) => { e.preventDefault(); showEvolutionLocationMap(locationId); };
                                        Object.assign(locationButton.style, { display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 8px 4px 4px", width: "fit-content", margin: "0 auto", background: "#004053", border: "2px solid #5af"});
                                        const iconContainer = document.createElement("div");
                                        iconContainer.style.cssText = `display: inline-flex; justify-content: center; align-items: center; width: 42px; height: 32px; background: var(--info-body-bg); border: 2px solid var(--button-border); border-radius: 6px; flex-shrink: 0;background: #002a37; border: 2px solid #5AF;`;
                                        const locationIcon = document.createElement("img");
                                        locationIcon.src = "https://vinemon.link/vinemon/vinemon/ui/vineMap.png";
                                        locationIcon.style.cssText = "width: 38px; height: 28px;";
                                        iconContainer.appendChild(locationIcon);
                                        const locationNameSpan = document.createElement("span");
                                        locationNameSpan.textContent = locationName;
                                        locationButton.appendChild(iconContainer);
                                        locationButton.appendChild(locationNameSpan);
                                        evolutionsContainer.appendChild(locationButton);
                                    }
                                } else {
                                    let evolutionCondition = levelKeyword === "Level" && levelValue ? `at Level ${levelValue}` : levelKeyword ? `(${levelKeyword})` : "";
                                    const badgeLink = createEvolutionLink(paddedEvoId, `${displayName} ${evolutionCondition}`);
                                    evolutionsContainer.appendChild(badgeLink);
                                }
                            }
                        }
                    }
                }

                if (!hasEvolutionaryInfo) {
                    evolutionsContainer.textContent = "Has No Evolutions";
                }
                // --- EVOLUTION LOGIC END ---
                
                const updateWildItemDisplay = (elementId, itemInternalName) => {
                    const itemInfo = getItemInfo(itemInternalName);
                    const element = document.getElementById(elementId);
                    element.innerHTML = "";
                    if (itemInfo) {
                        const itemLink = document.createElement("a");
                        itemLink.href = "#";
                        itemLink.onclick = (e) => {
                            e.preventDefault();
                            showItemDetails(itemInfo.name);
                        };
                        const itemSprite = document.createElement("img");
                        itemSprite.src = `https://vinemon.link/vinemon/vinemon/items/item${String(itemInfo.id).padStart(3, "0")}.png`;
                        itemSprite.alt = itemInfo.displayName;
                        const itemNameSpan = document.createElement("span");
                        itemNameSpan.textContent = itemInfo.displayName;
                        itemLink.appendChild(itemSprite);
                        itemLink.appendChild(itemNameSpan);
                        element.appendChild(itemLink);
                    } else {
                        element.textContent = "—";
                    }
                };
                updateWildItemDisplay("itemCommon", mon.wildItems.common);
                updateWildItemDisplay("itemUncommon", mon.wildItems.uncommon);
                updateWildItemDisplay("itemRare", mon.wildItems.rare);
                const levelUpMovesList = document.getElementById("levelUpMovesList");
                const eggMovesList = document.getElementById("eggMovesList");
                const tmsList = document.getElementById("TMsList");
                levelUpMovesList.innerHTML = "";
                eggMovesList.innerHTML = "";
                tmsList.innerHTML = "";
                if (mon.levelUpMoves && mon.levelUpMoves.length > 0) {
                    mon.levelUpMoves.forEach((moveEntry) => {
                        const moveDiv = document.createElement("div");
                        const moveName = moveEntry.move;
                        moveDiv.textContent = `Lv. ${moveEntry.level} ${moveName}`;
                        const moveInfo = allMovesData[moveName];
                        if (moveInfo) {
                            const mappedMoveType = mapType(moveInfo.type);
                            const bgColor = typeColors[mappedMoveType] || "#68A090";
                            moveDiv.style.backgroundColor = bgColor;
                            const lightTextTypes = ["#F7D02C", "#FFF44F", "E2BF65", "#A8A77A"];
                            moveDiv.style.color = lightTextTypes.includes(bgColor.toUpperCase()) ? "#000" : "#FFF";
                        }
                        moveDiv.addEventListener("click", () => showMoveDetails(moveName));
                        levelUpMovesList.appendChild(moveDiv);
                    });
                } else {
                    levelUpMovesList.textContent = "No Level Up Moves found.";
                }
                if (mon.eggMoves && mon.eggMoves.length > 0) {
                    mon.eggMoves.forEach((moveName) => {
                        const moveDiv = document.createElement("div");
                        moveDiv.textContent = moveName;
                        const moveInfo = allMovesData[moveName];
                        if (moveInfo) {
                            const mappedMoveType = mapType(moveInfo.type);
                            const bgColor = typeColors[mappedMoveType] || "#68A090";
                            moveDiv.style.backgroundColor = bgColor;
                            const lightTextTypes = ["#F7D02C", "#FFF44F", "E2BF65", "#A8A77A"];
                            moveDiv.style.color = lightTextTypes.includes(bgColor.toUpperCase()) ? "#000" : "#FFF";
                        }
                        moveDiv.addEventListener("click", () => showMoveDetails(moveName));
                        eggMovesList.appendChild(moveDiv);
                    });
                } else {
                    eggMovesList.textContent = "No Egg Moves found.";
                }
                const learnableTMs = [];
                const currentMonName = mon.name;
                if (allTMsData.TMs) {
                    for (const tmInternalName in allTMsData.TMs) {
                        const externalName = internalToExternalMoveMap[tmInternalName];
                        if (externalName) {
                            const learners = allTMsData.TMs[tmInternalName];
                            if (learners.includes(currentMonName)) {
                                learnableTMs.push(externalName);
                            }
                        }
                    }
                }
                if (learnableTMs.length > 0) {
                    learnableTMs.sort().forEach((moveName) => {
                        const moveDiv = document.createElement("div");
                        moveDiv.textContent = moveName;
                        const moveInfo = allMovesData[moveName];
                        if (moveInfo) {
                            const mappedMoveType = mapType(moveInfo.type);
                            const bgColor = typeColors[mappedMoveType] || "#68A090";
                            moveDiv.style.backgroundColor = bgColor;
                            const lightTextTypes = ["#F7D02C", "#FFF44F", "E2BF65", "#A8A77A"];
                            moveDiv.style.color = lightTextTypes.includes(bgColor.toUpperCase()) ? "#000" : "#FFF";
                        }
                        moveDiv.addEventListener("click", () => showMoveDetails(moveName));
                        tmsList.appendChild(moveDiv);
                    });
                } else {
                    tmsList.textContent = "No TMs found.";
                }
                document.querySelectorAll(".move-category-button").forEach((button) => button.classList.remove("active"));
                document.querySelector('.move-category-button[data-category="levelUpMoves"]').classList.add("active");
                document.querySelectorAll(".move-list").forEach((list) => (list.style.display = "none"));
                levelUpMovesList.style.display = "flex";
                const allTypes = Object.keys(typeColors);
                const weaknesses = [],
                    resistances = [],
                    immunities = [];

                function getEffectiveness(attackType, defenseType) {
                    const mappedAttackType = mapType(attackType);
                    const mappedDefenseType = mapType(defenseType);
                    const atkKey = mappedAttackType.charAt(0) + mappedAttackType.slice(1).toLowerCase();
                    const defKey = mappedDefenseType.charAt(0) + mappedDefenseType.slice(1).toLowerCase();
                    return typeChart[atkKey]?. [defKey] ?? 1;
                }

                function calcCombinedEffectiveness(attackType) {
                    const monMappedTypes = mon.types.map((t) => mapType(t));
                    if (monMappedTypes.length === 1) return getEffectiveness(attackType, monMappedTypes[0]);
                    if (monMappedTypes.length === 2) return getEffectiveness(attackType, monMappedTypes[0]) * getEffectiveness(attackType, monMappedTypes[1]);
                    return 1;
                }
                allTypes.forEach((attackType) => {
                    const multiplier = calcCombinedEffectiveness(attackType);
                    if (multiplier === 0) immunities.push(attackType);
                    else if (multiplier > 1) weaknesses.push({
                        type: attackType,
                        mult: multiplier
                    });
                    else if (multiplier < 1 && multiplier > 0) resistances.push({
                        type: attackType,
                        mult: multiplier
                    });
                });
                const weakDiv = document.getElementById("weaknesses"),
                    resistDiv = document.getElementById("resistances"),
                    immuneDiv = document.getElementById("immunities");

                function createTypeSpan(text, color, typeName) {
                    const span = document.createElement("span");
                    span.textContent = text;
                    span.style.backgroundColor = color;
                    span.style.color = ["#F7D02C", "#FFF44F", "E2BF65", "#A8A77A"].includes(color) ? "#000" : "#FFF";
                    span.style.display = "inline-block";
                    const mappedTypeName = mapType(typeName);
                    span.onclick = () => openVinemonListAndFilterByType(mappedTypeName);
                    return span;
                }

                function createNoneSpan() {
                    const span = document.createElement("span");
                    span.textContent = "None";
                    span.style.backgroundColor = "#000000";
                    span.style.color = "white";
                    span.style.display = "inline-block";
                    return span;
                }
                weakDiv.innerHTML = "<strong>Weaknesses:</strong><br> ";
                resistDiv.innerHTML = "<strong>Resistances:</strong><br> ";
                immuneDiv.innerHTML = "<strong>Immunities:</strong><br> ";
                weaknesses.sort((a, b) => b.mult - a.mult);
                if (weaknesses.length === 0) {
                    weakDiv.appendChild(createNoneSpan());
                } else {
                    weaknesses.forEach((w) => {
                        const color = typeColors[mapType(w.type)] || "#e74c3c";
                        const span = createTypeSpan(`${w.type} (${w.mult}×)`, color, w.type);
                        if (w.mult >= 4) {
                            span.classList.add("four-times");
                        }
                        weakDiv.appendChild(span);
                    });
                }
                resistances.sort((a, b) => a.mult - b.mult);
                if (resistances.length === 0) {
                    resistDiv.appendChild(createNoneSpan());
                } else {
                    resistances.forEach((r) => {
                        const color = typeColors[mapType(r.type)] || "#3498db";
                        const span = createTypeSpan(`${r.type} (${r.mult}×)`, color, r.type);
                        if (r.mult <= 0.25) {
                            span.classList.add("twentyfive-times");
                        }
                        resistDiv.appendChild(span);
                    });
                }
                if (immunities.length === 0) {
                    immuneDiv.appendChild(createNoneSpan());
                } else {
                    immunities.forEach((i) => {
                        const color = typeColors[mapType(i)] || "#95a5a6";
                        immuneDiv.appendChild(createTypeSpan(i, color, i));
                    });
                }

            } finally {
                isLoading = false;
            }
        }
        function getURLBool(param) {
            return new URLSearchParams(window.location.search).get(param) === "1";
        }

        function initDropdown() {
            const select = document.getElementById("vinemonSelect");
            select.innerHTML = "";
            const sortedVinemonEntries = Object.entries(vinemonData)
                .map(([id, data]) => ({
                    id,
                    name: data.name
                }))
                .sort((a, b) => parseInt(a.id) - parseInt(b.id));
            sortedVinemonEntries.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.id;
                option.textContent = `#${entry.id} ${entry.name || "UNKNOWN"}`;
                select.appendChild(option);
            });
        }

        document.getElementById("vinemonSelect").addEventListener("change", (e) => {

            shiny = false;
            female = false;
            back = false;
            corruption = false;
            currentExtraSprite = "";

            loadVinemon(e.target.value)
        });
        document.getElementById("shinyToggle").addEventListener("change", (e) => {
            shiny = e.target.checked;
            resetEggView();
            checkAndDisplayExtraSprites(document.getElementById("vinemonSelect").value);
            updateURL(document.getElementById("vinemonSelect").value);
            updateSprite(document.getElementById("vinemonSelect").value);
            updateNavButtons(document.getElementById("vinemonSelect").value);
        });
        document.getElementById("genderToggle").addEventListener("change", async (e) => {
            female = e.target.checked;
            if (!femaleAvailable && female) {
                female = false;
                e.target.checked = false;
                return;
            }
            resetEggView();
            checkAndDisplayExtraSprites(document.getElementById("vinemonSelect").value);
            updateURL(document.getElementById("vinemonSelect").value);
            updateSprite(document.getElementById("vinemonSelect").value);
        });
        document.getElementById("backToggle").addEventListener("change", (e) => {
            back = e.target.checked;
            resetEggView();
            checkAndDisplayExtraSprites(document.getElementById("vinemonSelect").value);
            updateURL(document.getElementById("vinemonSelect").value);
            updateSprite(document.getElementById("vinemonSelect").value);
        });

        document.getElementById("prevBtn").addEventListener("click", (e) => {
            shiny = false;
            female = false;
            back = false;
            corruption = false;
            currentExtraSprite = "";

            const targetId = e.currentTarget.dataset.id;
            loadVinemon(targetId);
        });

        document.getElementById("nextBtn").addEventListener("click", (e) => {
            shiny = false;
            female = false;
            back = false;
            corruption = false;
            currentExtraSprite = "";

            const targetId = e.currentTarget.dataset.id;
            loadVinemon(targetId);
        });
        document.getElementById("randomBtn").addEventListener("click", async () => {
            const ids = Object.keys(vinemonData);
            const randomId = ids[Math.floor(Math.random() * ids.length)];

            currentExtraSprite = "";
            back = false;

            const mon = vinemonData[randomId];
            const hasFemaleSprite = await checkImageExists(`https://vinemon.link/vinemon/vinemon/female/${randomId}.png`);

            const formResult = determineRandomForm(randomId, hasFemaleSprite);
            shiny = formResult.shiny;
            corruption = formResult.corruption;
            female = formResult.female;

            document.getElementById("shinyToggle").checked = shiny;
            document.getElementById("corruptionToggle").checked = corruption;
            document.getElementById("genderToggle").checked = female;
            document.getElementById("backToggle").checked = back;

            loadVinemon(randomId);
        });
        document.getElementById("corruptionToggle").addEventListener("change", (e) => {
            corruption = e.target.checked;
            resetEggView();
            checkAndDisplayExtraSprites(document.getElementById("vinemonSelect").value);
            updateURL(document.getElementById("vinemonSelect").value);
            updateSprite(document.getElementById("vinemonSelect").value);
        });

        const itemsListModal = document.getElementById("itemsListModal");
        const itemsListContainer = document.getElementById("itemsListContainer");
        const itemDetailsModal = document.getElementById("itemDetailsModal");
        const modalItemName = document.getElementById("modalItemName");
        const modalItemPrice = document.getElementById("modalItemPrice");
        const modalItemDescription = document.getElementById("modalItemDescription");
        const modalItemHeldBy = document.getElementById("modalItemHeldBy");
        const modalItemCategoryDisplay = document.getElementById("modalItemCategory");
        const itemSearchInput = document.getElementById("itemSearchInput");
        const sortByIdBtn = document.getElementById("sortByIdBtn");
        const sortByNameBtn = document.getElementById("sortByNameBtn");
        const sortByPriceBtn = document.getElementById("sortByPriceBtn");
        const itemCategoryFilterSelect = document.getElementById("itemCategoryFilterSelect");
        const locationMapModal = document.getElementById("locationMapModal");

        function populateItemCategoryFilter() {
            if (!itemCategoryFilterSelect) return;
            while (itemCategoryFilterSelect.options.length > 1) {
                itemCategoryFilterSelect.remove(1);
            }
            for (const id in itemCategories) {
                const option = document.createElement("option");
                option.value = id;
                option.textContent = itemCategories[id];
                itemCategoryFilterSelect.appendChild(option);
            }
        }

function renderItems() {
    itemsListContainer.innerHTML = "";
    itemsListContainer.classList.toggle("small-view-grid", itemViewMode === "grid");
    let itemsToRender = [...allItemsData];

    const searchTerm = itemSearchInput.value.toLowerCase();
    if (searchTerm) {
        itemsToRender = itemsToRender.filter(
            (item) =>
            item.displayName.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)
        );
    }
    if (selectedItemCategoryFilter) {
        itemsToRender = itemsToRender.filter((item) => String(item.field3) === selectedItemCategoryFilter);
    }
    if (currentItemSort === "id")
        itemsToRender.sort((a, b) => (currentItemSortOrder === "asc" ? a.id - b.id : b.id - a.id));
    else if (currentItemSort === "name")
        itemsToRender.sort((a, b) =>
            currentItemSortOrder === "asc" ?
            a.displayName.localeCompare(b.displayName) :
            b.displayName.localeCompare(a.displayName)
        );
    else if (currentItemSort === "price")
        itemsToRender.sort((a, b) => (currentItemSortOrder === "asc" ? a.price - b.price : b.price - a.price));

    document.getElementById("itemDexCount").textContent = `(${itemsToRender.length} / ${allItemsData.length})`;

    itemsToRender.forEach((item) => {
        if (itemViewMode === "grid") {
            const itemEntry = document.createElement("div");
            itemEntry.classList.add("item-entry-small");
            itemEntry.onclick = () => showItemDetails(item.name);

            const itemSprite = document.createElement("img");
            itemSprite.alt = item.displayName;

            let spriteUrl;
            if (item.field3 === 4 && item.name.startsWith("TM")) {
                try {
                    const tmNumber = parseInt(item.name.replace('TM', ''));
                    if (tmNumber > 0 && tmNumber <= allTmMoveNames.length) {
                        const tmMoveInternalName = allTmMoveNames[tmNumber - 1];
                        const moveData = allMovesDataMap[tmMoveInternalName];
                        if (moveData) {
                            let moveType = moveData.type.toUpperCase();
                            spriteUrl = `https://vinemon.link/vinemon/vinemon/items/itemMachine${moveType}.png`;
                        } else {
                            spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item000.png`; // Fallback
                        }
                    } else {
                        spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item000.png`; // Fallback
                    }
                } catch(e) {
                    spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item000.png`; // Fallback
                }
            } else {
                spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item${String(item.id).padStart(3, "0")}.png`;
            }
            itemSprite.src = spriteUrl;


            const itemNameSpan = document.createElement("span");
            itemNameSpan.classList.add("item-name");
            itemNameSpan.textContent = item.displayName;

            const categoryName = itemCategories[item.field3] || "Unknown";
            itemEntry.style.background = `linear-gradient(to bottom, ${categoryColors[categoryName] || "#666"}, #441d70)`;

            itemEntry.appendChild(itemSprite);
            itemEntry.appendChild(itemNameSpan);
            itemsListContainer.appendChild(itemEntry);
        } else {
            const itemEntry = document.createElement("div");
            itemEntry.classList.add("item-entry");
            itemEntry.onclick = () => showItemDetails(item.name);

            const itemIconContainer = document.createElement("div");
            itemIconContainer.className = "image-container";
            const loader = document.createElement("div");
            loader.className = "loading-spinner";
            const itemSprite = document.createElement("img");
            itemSprite.alt = item.displayName;
            itemIconContainer.appendChild(loader);
            itemIconContainer.appendChild(itemSprite);
            itemIconContainer.classList.add("is-loading");

            let spriteUrl;
            if (item.field3 === 4 && item.name.startsWith("TM")) {
                try {
                    const tmNumber = parseInt(item.name.replace('TM', ''));
                    if (tmNumber > 0 && tmNumber <= allTmMoveNames.length) {
                        const tmMoveInternalName = allTmMoveNames[tmNumber - 1];
                        const moveData = allMovesDataMap[tmMoveInternalName];
                        if (moveData) {
                            let moveType = moveData.type.toUpperCase();
                            spriteUrl = `https://vinemon.link/vinemon/vinemon/items/itemMachine${moveType}.png`;
                        } else {
                            spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item000.png`; // Fallback
                        }
                    } else {
                        spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item000.png`; // Fallback
                    }
                } catch(e) {
                    spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item000.png`; // Fallback
                }
            } else {
                spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item${String(item.id).padStart(3, "0")}.png`;
            }


            const tempImg = new Image();
            tempImg.onload = () => {
                itemSprite.src = spriteUrl;
                itemIconContainer.classList.remove("is-loading");
            };
            tempImg.onerror = () => {
                itemSprite.src = "https://vinemon.link/vinemon/vinemon/icons/icon000.png";
                itemIconContainer.classList.remove("is-loading");
            };
            tempImg.src = spriteUrl;

            const itemNameSpan = document.createElement("span");
            itemNameSpan.classList.add("item-name");
            itemNameSpan.textContent = item.displayName;

            const itemCategorySpan = document.createElement("span");
            itemCategorySpan.classList.add("item-category");
            const categoryName = itemCategories[item.field3] || "Unknown";
            itemCategorySpan.textContent = categoryName;

            itemEntry.style.background = `linear-gradient(to right, #441d70 0%, ${categoryColors[categoryName] || "#666"} 100%)`;

            itemEntry.appendChild(itemIconContainer);
            itemEntry.appendChild(itemNameSpan);
            itemEntry.appendChild(itemCategorySpan);
            itemsListContainer.appendChild(itemEntry);
        }
    });
}

        function setItemSort(sortType, button) {
            if (currentItemSort === sortType) {
                currentItemSortOrder = currentItemSortOrder === "asc" ? "desc" : "asc";
            } else {
                currentItemSort = sortType;
                currentItemSortOrder = "asc";
            }

            document.querySelectorAll(".item-controls button").forEach((btn) => btn.classList.remove("active-sort"));
            button.classList.add("active-sort");
            renderItems();
        }

        itemSearchInput.addEventListener("input", renderItems);
        sortByIdBtn.addEventListener("click", (e) => setItemSort("id", e.currentTarget));
        sortByNameBtn.addEventListener("click", (e) => setItemSort("name", e.currentTarget));
        sortByPriceBtn.addEventListener("click", (e) => setItemSort("price", e.currentTarget));
        if (itemCategoryFilterSelect) {
            itemCategoryFilterSelect.addEventListener("change", (e) => {
                selectedItemCategoryFilter = e.target.value;
                renderItems();
            });
        }

        document.getElementById("viewItemsBtn").addEventListener("click", () => {
            renderItems();
            itemsListModal.style.display = "block";
        });

        itemsListModal.querySelector(".close").addEventListener("click", () => {
            itemsListModal.style.display = "none";
        });

        itemDetailsModal.querySelector(".close-button-details").addEventListener("click", () => {
            itemDetailsModal.style.display = "none";
        });
function showItemDetails(itemInternalName) {
    const itemInfo = allItemsData.find((item) => item.name === itemInternalName);
    if (itemInfo) {
        const isTm = itemInfo.field3 === 4 && itemInfo.name.startsWith("TM");
        let spriteUrl;

        if (isTm) {
            try {
                const tmNumber = parseInt(itemInfo.name.replace('TM', ''));
                if (tmNumber > 0 && tmNumber <= allTmMoveNames.length) {
                    const tmMoveInternalName = allTmMoveNames[tmNumber - 1];
                    const moveData = allMovesDataMap[tmMoveInternalName];
                    if (moveData) {
                        let moveType = moveData.type.toUpperCase();
                        spriteUrl = `https://vinemon.link/vinemon/vinemon/items/itemMachine${moveType}.png`;
                    } else {
                        spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item000.png`; // Fallback
                    }
                } else {
                    spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item000.png`; // Fallback
                }
            } catch (e) {
                spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item000.png`; // Fallback
            }
        } else {
            spriteUrl = `https://vinemon.link/vinemon/vinemon/items/item${String(itemInfo.id).padStart(3, "0")}.png`;
        }
        modalItemName.innerHTML = `<img src="${spriteUrl}" alt="${itemInfo.displayName}" class="item-sprite-small">${itemInfo.displayName}`;
        modalItemPrice.textContent = isTm ? "N/A" : (itemInfo.price === 0 ? "N/A" : `${itemInfo.price}c`);
        modalItemDescription.innerHTML = itemInfo.description.split("\\n").join("<br>").replace("Catch Rate:", "<strong>Catch Rate:</strong>");

        const heldByVinemonEntries = Object.entries(vinemonData).filter(
            ([id, monData]) =>
            monData.wildItems.common === itemInfo.name ||
            monData.wildItems.uncommon === itemInfo.name ||
            monData.wildItems.rare === itemInfo.name
        );
        if (heldByVinemonEntries.length > 0) {
            const heldByText = document.createElement("strong");
            heldByText.textContent = "Held by: ";
            modalItemHeldBy.innerHTML = "";
            modalItemHeldBy.appendChild(heldByText);
            heldByVinemonEntries.forEach(([id, monData], index) => {
                const monLink = document.createElement("a");
                monLink.href = `?id=${id}`;
                monLink.textContent = monData.name;
                monLink.style.color = "#FFD700";
                monLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    itemDetailsModal.style.display = "none";
                    loadVinemon(id);
                });
                if (index > 0) modalItemHeldBy.append(", ");
                modalItemHeldBy.appendChild(monLink);
            });
        } else {
            modalItemHeldBy.innerHTML = "<strong>Held by:</strong> None";
        }

        const itemCategoryName = itemCategories[itemInfo.field3] || "Unknown Category";
        modalItemCategoryDisplay.textContent = itemCategoryName;
        const colorToApply = categoryColors[itemCategoryName] || "#A90024";
        const modalContentDetails = document.querySelector("#itemDetailsModal .item-modal-content-details");
        modalContentDetails.style.setProperty("--dynamic-border-color", colorToApply);
        modalContentDetails.style.setProperty("--dynamic-strong-color", colorToApply);


        const actionsContainer = document.getElementById("modalItemActions");
        actionsContainer.innerHTML = ''; 
        if (isTm) {
            const viewMoveBtn = document.createElement('button');
            viewMoveBtn.textContent = 'View Move Details';
            viewMoveBtn.className = 'nav-btn'; 
            Object.assign(viewMoveBtn.style, {
                marginTop: '15px',
                width: '100%',
                justifyContent: 'center'
            });

            viewMoveBtn.onclick = () => {
                try {
                    const tmNumber = parseInt(itemInfo.name.replace('TM', ''));
                    const tmMoveInternalName = allTmMoveNames[tmNumber - 1];
                    const moveData = allMovesDataMap[tmMoveInternalName];
                    if (moveData) {
                        itemDetailsModal.style.display = 'none';
                        showMoveDetails(moveData.external_name);
                    }
                } catch (e) {
                    console.error("Could not link to move details.", e);
                }
            };
            actionsContainer.appendChild(viewMoveBtn);
        }

        itemDetailsModal.style.display = "flex";
    } else {
        console.error("Item details not found for:", itemInternalName);
    }
}

        function parseMoveFlags(description) {
            const flags = [];
            if (!description) return flags;

            const separatorIndex = description.indexOf(" - ");
            let flagsPart = separatorIndex !== -1 ? description.substring(0, separatorIndex) : description;

            flagsPart = flagsPart.replace(/\/\//g, "").trim();
            const potentialFlags = flagsPart.split(" ~ ").map((f) => f.trim().toUpperCase());

            potentialFlags.forEach((flag) => {
                const priorityMatch = flag.match(/^([+-]\d+)\s*PRIORITY/);
                if (priorityMatch) {
                    flags.push(`${priorityMatch[1]} PRIORITY`);
                } else if (flagStyles[flag]) {
                    flags.push(flag);
                }
            });

            return flags;
        }

        function filterMovesFromDetails(filterType, value) {
            const moveDetailsModal = document.getElementById("moveDetailsModal");
            const movesListModal = document.getElementById("movesListModal");

            if (moveDetailsModal) moveDetailsModal.style.display = "none";

            document.getElementById("moveSearchInput").value = "";
            selectedMoveTypeFilter = "";
            document.getElementById("moveTypeFilterSelect").value = "";
            selectedMoveFlagFilter = "";
            document.getElementById("moveFlagFilterSelect").value = "";

            if (filterType === "type") {
                selectedMoveTypeFilter = value;
                document.getElementById("moveTypeFilterSelect").value = value;
                setMovesSort("name", document.getElementById("sortMovesByNameBtn")); 
            } else if (filterType === "category") {
                setMovesSort("category", document.getElementById("sortMovesByCategoryBtn")); 
            } else if (filterType === "flag") {
                selectedMoveFlagFilter = value;
                document.getElementById("moveFlagFilterSelect").value = value;
                setMovesSort("name", document.getElementById("sortMovesByNameBtn"));
            }

            renderMoves();
            if (movesListModal) movesListModal.style.display = "block";
        }

        function populateMoveFlagFilter() {
            const select = document.getElementById("moveFlagFilterSelect");
            if (!select) return;

            const allFlags = [...Object.keys(flagStyles), ...priorityFlags].sort();

            allFlags.forEach((flag) => {
                const option = document.createElement("option");
                option.value = flag;
                option.textContent = flag.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
                select.appendChild(option);
            });
        }

        const movesListModal = document.getElementById("movesListModal");
        const movesListContainer = document.getElementById("movesListContainer");
        const moveSearchInput = document.getElementById("moveSearchInput");
        const sortMovesByNameBtn = document.getElementById("sortMovesByNameBtn");
        const sortMovesByTypeBtn = document.getElementById("sortMovesByTypeBtn");
        const sortMovesByCategoryBtn = document.getElementById("sortMovesByCategoryBtn");
        const sortMovesByPowerBtn = document.getElementById("sortMovesByPowerBtn");
        const sortMovesByAccBtn = document.getElementById("sortMovesByAccBtn");
        const sortMovesByPPBtn = document.getElementById("sortMovesByPPBtn");

        function populateMoveTypeFilter() {
            const moveTypeFilterSelect = document.getElementById("moveTypeFilterSelect");
            if (!moveTypeFilterSelect) return;

            const uniqueMoveTypes = new Set();
            Object.values(allMovesData).forEach((move) => {
                uniqueMoveTypes.add(mapType(move.type)); 
            });
            const sortedMoveTypes = Array.from(uniqueMoveTypes).sort();

            while (moveTypeFilterSelect.options.length > 1) {
                moveTypeFilterSelect.remove(1);
            }

            sortedMoveTypes.forEach((type) => {
                if (!disabledMoveTypes.includes(type)) {
                    const option = document.createElement("option");
                    option.value = type;
                    option.textContent = getDisplayTypeName(type); 
                    moveTypeFilterSelect.appendChild(option);
                }
            });
        }

        function renderMoves() {
            movesListContainer.innerHTML = "";
            movesListContainer.classList.toggle("small-view-grid", moveViewMode === "grid");
            let movesToRender = Object.values(allMovesData);

            movesToRender = movesToRender.filter((move) => {
                const isUsed = learnableMoves.has(move.external_name);
                return showUnusedMoves ? !isUsed : isUsed;
            });

            const searchTerm = moveSearchInput.value.toLowerCase();
            if (searchTerm) {
                movesToRender = movesToRender.filter(
                    (move) =>
                    move.external_name.toLowerCase().includes(searchTerm) ||
                    (move.description && move.description.toLowerCase().includes(searchTerm))
                );
            }

            if (selectedMoveTypeFilter) {
                movesToRender = movesToRender.filter((move) => mapType(move.type) === selectedMoveTypeFilter);
            }

            if (selectedMoveFlagFilter) {
                movesToRender = movesToRender.filter((move) => {
                    const flags = parseMoveFlags(move.description);
                    return flags.includes(selectedMoveFlagFilter.toUpperCase());
                });
            }

            if (currentMoveSort === "name")
                movesToRender.sort((a, b) =>
                    currentMoveSortOrder === "asc" ?
                    a.external_name.localeCompare(b.external_name) :
                    b.external_name.localeCompare(a.external_name)
                );
            else if (currentMoveSort === "type")
                movesToRender.sort((a, b) => {
                    const typeA = mapType(a.type);
                    const typeB = mapType(b.type);
                    return currentMoveSortOrder === "asc" ? typeA.localeCompare(typeB) : typeB.localeCompare(a.type);
                });
            else if (currentMoveSort === "category")
                movesToRender.sort((a, b) => {
                    const catA = a.category.toUpperCase();
                    const catB = b.category.toUpperCase();
                    return currentMoveSortOrder === "asc" ? catA.localeCompare(catB) : catB.localeCompare(a.category);
                });
            else if (currentMoveSort === "base_power")
                movesToRender.sort((a, b) =>
                    currentMoveSortOrder === "asc" ? a.base_power - b.base_power : b.base_power - a.base_power
                );
            else if (currentMoveSort === "accuracy")
                movesToRender.sort((a, b) =>
                    currentMoveSortOrder === "asc" ? a.accuracy - b.accuracy : b.accuracy - a.accuracy
                );
            else if (currentMoveSort === "Total_PP")
                movesToRender.sort((a, b) =>
                    currentMoveSortOrder === "asc" ? a.Total_PP - b.Total_PP : b.Total_PP - a.Total_PP
                );

            const finalCount = movesToRender.length;
            document.getElementById("moveDexCount").textContent = `(${finalCount} / ${finalCount})`;

            movesToRender.forEach((move) => {
                if (moveViewMode === "grid") {
                    const moveEntry = document.createElement("div");
                    moveEntry.classList.add("move-entry-small");
                    moveEntry.onclick = () => showMoveDetails(move.external_name);

                    const moveNameSpan = document.createElement("span");
                    moveNameSpan.classList.add("move-name-main");
                    moveNameSpan.textContent = move.external_name;

                    const mappedMoveType = mapType(move.type);
                    moveEntry.style.setProperty("--move-entry-color", typeColors[mappedMoveType] || "#68A090");

                    const typeBadge = document.createElement("span");
                    typeBadge.className = "badge";
                    typeBadge.textContent = getDisplayTypeName(move.type);
                    typeBadge.style.backgroundColor = typeColors[mappedMoveType] || "#68A090";

                    moveEntry.appendChild(moveNameSpan);
                    moveEntry.appendChild(typeBadge);
                    movesListContainer.appendChild(moveEntry);
                } else {
                    const moveEntry = document.createElement("div");
                    moveEntry.classList.add("move-entry-row");
                    moveEntry.onclick = () => showMoveDetails(move.external_name);

                    const moveNameSpan = document.createElement("span");
                    moveNameSpan.classList.add("move-name-main");
                    moveNameSpan.textContent = move.external_name;
                    const detailsContainer = document.createElement("div");
                    detailsContainer.style.display = "flex";
                    detailsContainer.style.alignItems = "center";
                    if (move.effect_chance > 0) {
                        const effectChanceSpan = document.createElement("span");
                        effectChanceSpan.classList.add("move-detail-box", "move-eff");
                        effectChanceSpan.textContent = `EFF-${move.effect_chance}%`;
                        detailsContainer.appendChild(effectChanceSpan);
                    }
                    if (move.Total_PP > 0) {
                        const ppSpan = document.createElement("span");
                        ppSpan.classList.add("move-detail-box", "move-pp-text");
                        ppSpan.textContent = `${move.Total_PP} PP`;
                        detailsContainer.appendChild(ppSpan);
                    }
                    if (move.base_power > 0) {
                        const powerSpan = document.createElement("span");
                        powerSpan.classList.add("move-detail-box", "move-power-text");
                        powerSpan.textContent = `${move.base_power} POW`;
                        detailsContainer.appendChild(powerSpan);
                    }
                    if (move.accuracy > 0) {
                        const accuracySpan = document.createElement("span");
                        accuracySpan.classList.add("move-detail-box", "move-acc-text");
                        accuracySpan.textContent = `${move.accuracy}% ACC`;
                        detailsContainer.appendChild(accuracySpan);
                    }
                    const categorySpan = document.createElement("span");
                    categorySpan.classList.add("move-detail-box", "move-category-type");
                    categorySpan.textContent = move.category.toUpperCase();
                    categorySpan.style.backgroundColor = moveCategoryColors[move.category] || "#666";
                    detailsContainer.appendChild(categorySpan);
                    const typeSpan = document.createElement("span");
                    typeSpan.classList.add("move-detail-box", "move-type-text");
                    const mappedMoveTypeForDisplay = mapType(move.type);
                    typeSpan.textContent = mappedMoveTypeForDisplay;
                    typeSpan.style.backgroundColor = typeColors[mappedMoveTypeForDisplay] || "#666";
                    detailsContainer.appendChild(typeSpan);
                    moveEntry.style.setProperty("--move-entry-color", typeColors[mappedMoveTypeForDisplay] || "#666");
                    moveEntry.appendChild(moveNameSpan);
                    moveEntry.appendChild(detailsContainer);
                    movesListContainer.appendChild(moveEntry);
                }
            });
        }

        function setMovesSort(sortType, button) {
            if (currentMoveSort === sortType) {
                currentMoveSortOrder = currentMoveSortOrder === "asc" ? "desc" : "asc";
            } else {
                currentMoveSort = sortType;
                currentMoveSortOrder = "asc";
            }

            document
                .querySelectorAll("#movesListModal .moves-controls button")
                .forEach((btn) => btn.classList.remove("active-sort"));
            button.classList.add("active-sort");
            renderMoves();
        }

        moveSearchInput.addEventListener("input", renderMoves);
        sortMovesByNameBtn.addEventListener("click", (e) => setMovesSort("name", e.currentTarget));
        sortMovesByTypeBtn.addEventListener("click", (e) => setMovesSort("type", e.currentTarget));
        sortMovesByCategoryBtn.addEventListener("click", (e) => setMovesSort("category", e.currentTarget));
        sortMovesByPowerBtn.addEventListener("click", (e) => setMovesSort("base_power", e.currentTarget));
        sortMovesByAccBtn.addEventListener("click", (e) => setMovesSort("accuracy", e.currentTarget));
        sortMovesByPPBtn.addEventListener("click", (e) => setMovesSort("Total_PP", e.currentTarget));

        document.addEventListener("DOMContentLoaded", () => {
            const viewMovesBtn = document.getElementById("viewMovesBtn");
            const moveTypeFilterSelect = document.getElementById("moveTypeFilterSelect");
            const toggleUnusedMovesBtn = document.getElementById("toggleUnusedMovesBtn");
            const moveFlagFilterSelect = document.getElementById("moveFlagFilterSelect");

            if (viewMovesBtn) {
                viewMovesBtn.addEventListener("click", () => {
                    showUnusedMoves = false;
                    moveSearchInput.value = "";
                    selectedMoveTypeFilter = "";
                    moveTypeFilterSelect.value = "";
                    currentMoveSort = "name";
                    currentMoveSortOrder = "asc";

                    document
                        .querySelectorAll("#movesListModal .moves-controls button")
                        .forEach((btn) => btn.classList.remove("active-sort"));
                    sortMovesByNameBtn.classList.add("active-sort");

                    if (toggleUnusedMovesBtn) {
                        toggleUnusedMovesBtn.dataset.showing = "used";
                        toggleUnusedMovesBtn.textContent = "Show Unused";
                        toggleUnusedMovesBtn.classList.remove("active-sort");
                    }

                    renderMoves();
                    movesListModal.style.display = "block";
                });
            }

            if (movesListModal)
                movesListModal.querySelector(".close").addEventListener("click", () => {
                    movesListModal.style.display = "none";
                });

            if (moveTypeFilterSelect) {
                moveTypeFilterSelect.addEventListener("change", (e) => {
                    selectedMoveTypeFilter = e.target.value;
                    renderMoves();
                });
            }

            if (toggleUnusedMovesBtn) {
                toggleUnusedMovesBtn.addEventListener("click", () => {
                    showUnusedMoves = !showUnusedMoves;
                    toggleUnusedMovesBtn.dataset.showing = showUnusedMoves ? "unused" : "used";
                    toggleUnusedMovesBtn.textContent = showUnusedMoves ? "Show Used" : "Show Unused";
                    toggleUnusedMovesBtn.classList.toggle("active-sort");
                    renderMoves();
                });
            }

            if (moveFlagFilterSelect) {
                moveFlagFilterSelect.addEventListener("change", (e) => {
                    selectedMoveFlagFilter = e.target.value;
                    renderMoves();
                });
            }

            const tabButtonContainer = document.querySelector(".main-content > div:nth-child(2) .tab-buttons-wrapper"); 
            if (tabButtonContainer) {
                const tabButtons = tabButtonContainer.querySelectorAll(".tab-button");
                const tabContentWrapper = document.querySelector(".main-content > div:nth-child(2) .tab-content-wrapper");
                if (tabContentWrapper) {
                    const tabContents = tabContentWrapper.querySelectorAll(".tab-content");

                    tabButtons.forEach((button) => {
                        button.addEventListener("click", () => {
                            tabButtons.forEach((btn) => btn.classList.remove("active"));
                            tabContents.forEach((content) => content.classList.remove("active-tab-content"));

                            button.classList.add("active");
                            const targetTabId = button.getAttribute("data-tab");
                            const targetContent = tabContentWrapper.querySelector(`#${targetTabId}`); 
                            if (targetContent) {
                                targetContent.classList.add("active-tab-content");
                            }
                        });
                    });
                }
            }
        });

        const vinemonListModal = document.getElementById("vinemonListModal");
        const vinemonListContainer = document.getElementById("vinemonListContainer");
        const vinemonSearchInput = document.getElementById("vinemonSearchInput");
        const vinemonBreedingGroupFilter = document.getElementById("vinemonBreedingGroupFilter");

        function populateTypeFilters() {
            const type1Filter = document.getElementById("vinemonType1Filter");
            const type2Filter = document.getElementById("vinemonType2Filter");

            if (!type1Filter || !type2Filter) return;

            const uniqueTypes = new Set();
            Object.values(vinemonData).forEach((mon) => {
                mon.types.forEach((type) => uniqueTypes.add(mapType(type)));
            });

            const sortedTypes = Array.from(uniqueTypes).sort();

            while (type1Filter.options.length > 1) type1Filter.remove(1);
            while (type2Filter.options.length > 1) type2Filter.remove(1);

            sortedTypes.forEach((type) => {
                const option1 = document.createElement("option");
                option1.value = type;
                option1.textContent = getDisplayTypeName(type); 
                type1Filter.appendChild(option1.cloneNode(true));
                type2Filter.appendChild(option1);
            });
        }

        function populateBreedingGroupFilter() {
            if (!vinemonBreedingGroupFilter) return;
            const breedingGroups = new Set();
            Object.values(vinemonData).forEach((mon) => {
                if (mon.compatibility) {
                    mon.compatibility.forEach((group) => {
                        if (group) breedingGroups.add(group);
                    });
                }
            });

            const sortedGroups = Array.from(breedingGroups).sort();

            while (vinemonBreedingGroupFilter.options.length > 1) {
                vinemonBreedingGroupFilter.remove(1);
            }

            sortedGroups.forEach((group) => {
                const option = document.createElement("option");
                option.value = group;
                option.textContent = group;
                vinemonBreedingGroupFilter.appendChild(option);
            });
        }

        function updateApplyStatSortButtonText() {
            const vinemonStatSortSelect = document.getElementById("vinemonStatSort");
            const vinemonApplyStatSortBtn = document.getElementById("vinemonApplyStatSortBtn");
            if (!vinemonStatSortSelect || !vinemonApplyStatSortBtn) return;

            const statValue = vinemonStatSortSelect.value;

            if (statValue && vinemonApplyStatSortBtn.dataset.statSortActive === "true") {
                const statName = vinemonStatSortSelect.options[vinemonStatSortSelect.selectedIndex].text;
                const currentOrderText = vinemonApplyStatSortBtn.dataset.order === "desc" ? "High to Low" : "Low to High";
                vinemonApplyStatSortBtn.textContent = `Stat: ${statName} (${currentOrderText})`;
            } else if (statValue) {
                const statName = vinemonStatSortSelect.options[vinemonStatSortSelect.selectedIndex].text;
                vinemonApplyStatSortBtn.textContent = `Sort by ${statName}`;
            } else {
                vinemonApplyStatSortBtn.textContent = "Sort by Stat";
            }
        }

        function renderVinemonList() {
            vinemonListContainer.innerHTML = "";
            vinemonListContainer.classList.toggle("small-view-grid", vinemonViewMode === "grid");
            let vinemonToRender = Object.entries(vinemonData);
            const searchTerm = vinemonSearchInput.value.toLowerCase();
            if (searchTerm) {
                vinemonToRender = vinemonToRender.filter(
                    ([id, mon]) =>
                    mon.name.toLowerCase().includes(searchTerm) ||
                    id.includes(searchTerm) ||
                    mon.dex.toLowerCase().includes(searchTerm)
                );
            }
            if (selectedType1) {
                vinemonToRender = vinemonToRender.filter(([id, mon]) => mon.types.some((t) => mapType(t) === selectedType1));
            }
            if (selectedType2) {
                vinemonToRender = vinemonToRender.filter(([id, mon]) => {
                    const monMappedTypes = mon.types.map((t) => mapType(t));
                    if (selectedType1 && selectedType1 === selectedType2) {
                        return monMappedTypes.length === 1 && monMappedTypes.includes(selectedType2);
                    }
                    const type1Matches = selectedType1 ? monMappedTypes.includes(selectedType1) : true;
                    return (
                        type1Matches &&
                        monMappedTypes.includes(selectedType2) &&
                        (selectedType1 ? monMappedTypes.length > 1 : true)
                    );
                });
            }
            if (selectedBreedingGroup) {
                vinemonToRender = vinemonToRender.filter(
                    ([id, mon]) => mon.compatibility && mon.compatibility.includes(selectedBreedingGroup)
                );
            }
            const vinemonApplyStatSortBtn = document.getElementById("vinemonApplyStatSortBtn");
            if (
                selectedStatToSort &&
                vinemonApplyStatSortBtn &&
                vinemonApplyStatSortBtn.dataset.statSortActive === "true"
            ) {
                const currentStatSortOrder = vinemonApplyStatSortBtn.dataset.order;
                vinemonToRender.sort(([idA, monA], [idB, monB]) => {
                    let valA, valB;
                    if (selectedStatToSort === "BST") {
                        valA = monA.stats.reduce((sum, stat) => sum + stat, 0);
                        valB = monB.stats.reduce((sum, stat) => sum + stat, 0);
                    } else {
                        const statIndex = statIndices[selectedStatToSort];
                        valA = monA.stats[statIndex];
                        valB = monB.stats[statIndex];
                    }
                    return currentStatSortOrder === "asc" ? valA - valB : valB - valA;
                });
            } else {
                if (currentVinemonSort === "id") {
                    vinemonToRender.sort(([idA], [idB]) => {
                        return currentVinemonSortOrder === "asc" ? parseInt(idA) - parseInt(idB) : parseInt(idB) - parseInt(idA);
                    });
                } else if (currentVinemonSort === "name") {
                    vinemonToRender.sort(([, monA], [, monB]) => {
                        return currentVinemonSortOrder === "asc" ?
                            monA.name.localeCompare(monB.name) :
                            monB.name.localeCompare(monA.name);
                    });
                } else if (currentVinemonSort === "height") {
                    vinemonToRender.sort(([, monA], [, monB]) => {
                        return currentVinemonSortOrder === "asc" ? monA.height - monB.height : monB.height - monA.height;
                    });
                } else if (currentVinemonSort === "weight") {
                    vinemonToRender.sort(([, monA], [, monB]) => {
                        return currentVinemonSortOrder === "asc" ? monA.weight - monB.weight : monB.weight - monA.weight;
                    });
                }
            }
            document.getElementById("vinemonDexCount").textContent =
                `(${vinemonToRender.length} / ${Object.keys(vinemonData).length})`;

            vinemonToRender.forEach(([id, mon]) => {
                if (vinemonViewMode === "grid") {
                    const entryDiv = document.createElement("div");
                    entryDiv.className = "vinemon-entry-small";
                    const primaryMappedType = mapType(mon.types[0]);
                    const primaryTypeColor = typeColors[primaryMappedType] || "#68A090";
                    entryDiv.style.setProperty("--vinemon-entry-color", primaryTypeColor);
                    entryDiv.addEventListener("click", () => {
                        loadVinemon(id);
                        if (vinemonListModal) vinemonListModal.style.display = "none";
                    });

                    const iconSprite = document.createElement("div");
                    iconSprite.className = "vinemon-list-icon-sprite";
                    const iconSuffix = shiny ? "s" : "";
                    iconSprite.style.backgroundImage = `url(https://vinemon.link/vinemon/vinemon/icons/icon${id}${iconSuffix}.png)`;

                    const numberSpan = document.createElement("span");
                    numberSpan.className = "vinemon-list-number";
                    numberSpan.textContent = `#${id}`;

                    const nameSpan = document.createElement("span");
                    nameSpan.className = "vinemon-list-name";
                    nameSpan.textContent = mon.name;

                    const typesContainer = document.createElement("div");
                    typesContainer.className = "vinemon-types-container";
                    mon.types.forEach((originalType) => {
                        const displayType = getDisplayTypeName(originalType);
                        const mappedTypeForColor = mapType(originalType);
                        const typeBadge = document.createElement("span");
                        typeBadge.className = "badge";
                        typeBadge.textContent = displayType.toUpperCase();
                        const bgColor = typeColors[mappedTypeForColor] || "#68A090";
                        typeBadge.style.backgroundColor = bgColor;
                        typeBadge.style.color = ["#F7D02C", "#FFF44F", "E2BF65", "#A8A77A"].includes(bgColor) ? "#000" : "#FFF";
                        typesContainer.appendChild(typeBadge);
                    });

                    entryDiv.appendChild(iconSprite);
                    entryDiv.appendChild(numberSpan);
                    entryDiv.appendChild(nameSpan);
                    entryDiv.appendChild(typesContainer);
                    vinemonListContainer.appendChild(entryDiv);
                } else {
                    const entryDiv = document.createElement("div");
                    entryDiv.className = "vinemon-entry-row";
                    const primaryMappedType = mapType(mon.types[0]);
                    const primaryTypeColor = typeColors[primaryMappedType] || "#68A090";
                    entryDiv.style.setProperty("--vinemon-entry-color", primaryTypeColor);
                    entryDiv.addEventListener("click", () => {
                        loadVinemon(id);
                        if (vinemonListModal) vinemonListModal.style.display = "none";
                    });

                    const iconContainer = document.createElement("div");
                    iconContainer.className = "image-container";
                    iconContainer.classList.add("is-loading");

                    const loader = document.createElement("div");
                    loader.className = "loading-spinner";

                    const iconSprite = document.createElement("div");
                    iconSprite.className = "vinemon-list-icon-sprite";

                    iconContainer.appendChild(loader);
                    iconContainer.appendChild(iconSprite);

                    const iconSuffix = shiny ? "s" : "";
                    const spriteUrl = `https://vinemon.link/vinemon/vinemon/icons/icon${id}${iconSuffix}.png`;
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        iconSprite.style.backgroundImage = `url(${spriteUrl})`;
                        iconContainer.classList.remove("is-loading");
                    };
                    tempImg.onerror = () => {
                        iconSprite.style.backgroundImage = `url('https://vinemon.link/vinemon/vinemon/icons/icon000.png')`; // Fallback
                        iconContainer.classList.remove("is-loading");
                    };
                    tempImg.src = spriteUrl;

                    const infoContainer = document.createElement("div");
                    infoContainer.className = "vinemon-info-container";
                    const numberSpan = document.createElement("span");
                    numberSpan.className = "vinemon-list-number";
                    numberSpan.textContent = `#${id}`;
                    const nameSpan = document.createElement("span");
                    nameSpan.className = "vinemon-list-name";
                    nameSpan.textContent = mon.name;
                    infoContainer.appendChild(numberSpan);
                    infoContainer.appendChild(nameSpan);

                    const statsListContainer = document.createElement("div");
                    statsListContainer.className = "vinemon-stats-list-container";
                    const statDisplayLabels = ["HP", "ATK", "DEF", "SPD", "SP.ATK", "SP.DEF"];
                    let bst = 0;
                    mon.stats.forEach((statValue, index) => {
                        const statDisplay = document.createElement("div");
                        statDisplay.className = "stat-display-list";
                        const statLabelSpan = document.createElement("span");
                        statLabelSpan.className = "stat-label-list";
                        statLabelSpan.textContent = statDisplayLabels[index];
                        const statValueSpan = document.createElement("span");
                        statValueSpan.className = "stat-value-list";
                        statValueSpan.textContent = statValue;
                        statDisplay.appendChild(statLabelSpan);
                        statDisplay.appendChild(statValueSpan);
                        statsListContainer.appendChild(statDisplay);
                        bst += statValue;
                    });
                    const bstDisplay = document.createElement("div");
                    bstDisplay.className = "stat-display-list";
                    const bstLabelSpan = document.createElement("span");
                    bstLabelSpan.className = "stat-label-list";
                    bstLabelSpan.textContent = "BST";
                    const bstValueSpan = document.createElement("span");
                    bstValueSpan.className = "stat-value-list";
                    bstValueSpan.textContent = bst;
                    bstDisplay.appendChild(bstLabelSpan);
                    bstDisplay.appendChild(bstValueSpan);
                    statsListContainer.appendChild(bstDisplay);

                    const typesContainer = document.createElement("div");
                    typesContainer.className = "vinemon-types-container";
                    mon.types.forEach((originalType) => {
                        const displayType = getDisplayTypeName(originalType);
                        const mappedTypeForColor = mapType(originalType);
                        const typeBadge = document.createElement("span");
                        typeBadge.className = "badge";
                        typeBadge.textContent = displayType.toUpperCase();
                        const bgColor = typeColors[mappedTypeForColor] || "#68A090";
                        typeBadge.style.backgroundColor = bgColor;
                        typeBadge.style.color = ["#F7D02C", "#FFF44F", "E2BF65", "#A8A77A"].includes(bgColor) ? "#000" : "#FFF";
                        typesContainer.appendChild(typeBadge);
                    });

                    entryDiv.appendChild(iconContainer);
                    entryDiv.appendChild(infoContainer);
                    entryDiv.appendChild(statsListContainer);
                    entryDiv.appendChild(typesContainer);
                    vinemonListContainer.appendChild(entryDiv);
                }
            });
        }

        function setVinemonSort(sortType, button) {
            const vinemonStatSortSelect = document.getElementById("vinemonStatSort");
            const vinemonApplyStatSortBtn = document.getElementById("vinemonApplyStatSortBtn");

            if (vinemonApplyStatSortBtn && sortType !== "stat") {
                vinemonApplyStatSortBtn.dataset.statSortActive = "false";
                vinemonApplyStatSortBtn.classList.remove("active-sort");
                if (vinemonStatSortSelect) {
                    selectedStatToSort = "";
                    vinemonStatSortSelect.value = "";
                }
                updateApplyStatSortButtonText();
            }

            const sortVinemonByHeightBtn = document.getElementById("sortVinemonByHeightBtn");
            const sortVinemonByWeightBtn = document.getElementById("sortVinemonByWeightBtn");

            if (sortType !== "height" && sortVinemonByHeightBtn) {
                sortVinemonByHeightBtn.textContent = "Height";
            }
            if (sortType !== "weight" && sortVinemonByWeightBtn) {
                sortVinemonByWeightBtn.textContent = "Weight";
            }

            if (currentVinemonSort === sortType) {
                currentVinemonSortOrder = currentVinemonSortOrder === "asc" ? "desc" : "asc";
            } else {
                currentVinemonSort = sortType;
                currentVinemonSortOrder = sortType === "height" || sortType === "weight" ? "desc" : "asc";
            }

            if (button.id === "sortVinemonByHeightBtn" || button.id === "sortVinemonByWeightBtn") {
                button.textContent = `${sortType.charAt(0).toUpperCase() + sortType.slice(1)} (${currentVinemonSortOrder === "desc" ? "High > Low" : "Low > High"})`;
            }

            document
                .querySelectorAll("#vinemonListModal .vinemon-controls button[data-sort]")
                .forEach((btn) => btn.classList.remove("active-sort"));
            if (button) button.classList.add("active-sort");

            renderVinemonList();
        }

        vinemonSearchInput.addEventListener("input", renderVinemonList);

        document.getElementById("viewVinemonBtn").addEventListener("click", () => {
            renderVinemonList();
            vinemonListModal.style.display = "block";
        });

        if (vinemonListModal)
            vinemonListModal.querySelector(".close").addEventListener("click", () => {
                vinemonListModal.style.display = "none";
            });

        const typeChart = {
            Normal: {
                Rock: 0.5,
                Ghost: 0,
                Steel: 0.5,
                Mystery: 2
            },
            Fire: {
                Fire: 0.5,
                Water: 0.5,
                Grass: 2,
                Ice: 2,
                Bug: 2,
                Rock: 0.5,
                Dragon: 0.5,
                Steel: 2
            },
            Water: {
                Fire: 2,
                Water: 0.5,
                Grass: 0.5,
                Ground: 2,
                Rock: 2,
                Dragon: 0.5
            },
            Electric: {
                Water: 2,
                Electric: 0.5,
                Grass: 0.5,
                Ground: 0,
                Flying: 2,
                Dragon: 0.5
            },
            Grass: {
                Fire: 0.5,
                Water: 2,
                Grass: 0.5,
                Poison: 0.5,
                Ground: 2,
                Flying: 0.5,
                Bug: 0.5,
                Rock: 2,
                Dragon: 0.5,
                Steel: 0.5
            },
            Ice: {
                Fire: 0.5,
                Water: 0.5,
                Grass: 2,
                Ground: 2,
                Flying: 2,
                Dragon: 2,
                Steel: 0.5
            },
            Fighting: {
                Normal: 2,
                Ice: 2,
                Rock: 2,
                Dark: 2,
                Steel: 2,
                Poison: 0.5,
                Flying: 0.5,
                Psychic: 0.5,
                Bug: 0.5,
                Ghost: 0
            },
            Poison: {
                Grass: 2,
                Poison: 0.5,
                Ground: 0.5,
                Rock: 0.5,
                Ghost: 0.5,
                Steel: 0
            },
            Ground: {
                Fire: 2,
                Electric: 2,
                Grass: 0.5,
                Poison: 2,
                Flying: 0,
                Bug: 0.5,
                Rock: 2,
                Steel: 2
            },
            Flying: {
                Electric: 0.5,
                Grass: 2,
                Fighting: 2,
                Bug: 2,
                Rock: 0.5,
                Steel: 0.5
            },
            Psychic: {
                Fighting: 2,
                Poison: 2,
                Psychic: 0.5,
                Dark: 0,
                Steel: 0.5
            },
            Bug: {
                Fire: 0.5,
                Grass: 2,
                Fighting: 0.5,
                Poison: 0.5,
                Flying: 0.5,
                Psychic: 2,
                Ghost: 0.5,
                Dark: 2,
                Steel: 0.5
            },
            Rock: {
                Fire: 2,
                Ice: 2,
                Fighting: 0.5,
                Ground: 0.5,
                Flying: 2,
                Bug: 2,
                Steel: 0.5
            },
            Ghost: {
                Normal: 0,
                Psychic: 2,
                Ghost: 2,
                Dark: 0.5
            },
            Dragon: {
                Dragon: 2,
                Steel: 0.5
            },
            Dark: {
                Fighting: 0.5,
                Psychic: 2,
                Ghost: 2,
                Dark: 0.5,
                Steel: 0.5
            },
            Steel: {
                Fire: 0.5,
                Water: 0.5,
                Electric: 0.5,
                Ice: 2,
                Rock: 2,
                Steel: 0.5
            },
            Mystery: {}
        };

        const swarmLevelData = {
            "RABBUZZ": {
                min: 5,
                max: 8
            },
            "APPLE": {
                min: 5,
                max: 8
            },
            "CHERRY": {
                min: 5,
                max: 8
            },
            "FROSLASS": {
                min: 8,
                max: 14
            },
            "DOODLE DIP": {
                min: 8,
                max: 14
            },
            "LUIGI": {
                min: 4,
                max: 8
            },
            "LUCIFLIPPER": {
                min: 5,
                max: 10
            },
            "PUDDIDROP": {
                min: 8,
                max: 12
            }
        };

        const types = Object.keys(typeChart);

        const allTypes = [...new Set([...types, ...types.flatMap((type) => Object.keys(typeChart[type]))])];

const chartBody = document.getElementById("typeChartBody");
if (chartBody) {
    const table = chartBody.closest('.type-chart-table');
    allTypes.forEach((attack, rowIndex) => {
        const row = document.createElement("tr");
        const attackCell = document.createElement("th");
        attackCell.textContent = attack;
        row.appendChild(attackCell);

        allTypes.forEach((defend, colIndex) => {
            const effectiveness = typeChart[attack]?.[defend] ?? 1;
            const cell = document.createElement("td");
            cell.textContent = effectiveness === 1 ? "–" : effectiveness;
            if (effectiveness !== 1) cell.setAttribute("data-effect", effectiveness);

            // --- Add Hover Events for Highlighting ---
            cell.addEventListener('mouseover', (e) => {
                const hoveredCell = e.target;
                const rowHeader = row.querySelector('th');
                const colHeader = table.querySelector(`thead th:nth-child(${colIndex + 2})`);

                // Highlight Headers
                if (rowHeader && rowHeader.dataset.originalColor) {
                    rowHeader.style.backgroundColor = lightenDarkenColor(rowHeader.dataset.originalColor, 30);
                }
                if (colHeader && colHeader.dataset.originalColor) {
                    colHeader.style.backgroundColor = lightenDarkenColor(colHeader.dataset.originalColor, 10);
                }
                
                // Highlight Row and Column Cells, skipping data-effect cells
                const rowColor = rowHeader?.dataset.originalColor || '#13050e';
                const colColor = colHeader?.dataset.originalColor || '#13050e';

                for(let i = 1; i < row.cells.length; i++) {
                    if (!row.cells[i].hasAttribute('data-effect')) { // Check added here
                        row.cells[i].style.backgroundColor = lightenDarkenColor(rowColor, -30);
                    }
                }
                for(let i = 0; i < chartBody.rows.length; i++) {
                    const cellInCol = chartBody.rows[i].cells[colIndex + 1];
                     if (cellInCol && !cellInCol.hasAttribute('data-effect')) { // Check added here
                        cellInCol.style.backgroundColor = lightenDarkenColor(colColor, -45);
                    }
                }

                // Highlight the specific hovered cell
                hoveredCell.style.filter = 'brightness(var(--button-hover-brightness))';
                hoveredCell.style.outline = '2px solid #FFD700';
                hoveredCell.style.zIndex = '2';

            });

            cell.addEventListener('mouseout', () => {
                // Remove all highlights from headers and cells
                table.querySelectorAll('th, td').forEach(el => {
                    el.style.zIndex = '';
                    el.style.filter = '';
                    el.style.outline = '';
                    if (el.dataset.originalColor) {
                        el.style.backgroundColor = el.dataset.originalColor;
                    } else if (el.tagName === 'TD') {
                        el.style.backgroundColor = ''; 
                    }
                });
            });
            // --- End Hover Events ---

            row.appendChild(cell);
        });

        chartBody.appendChild(row);
    });
}

        const typeChartModal = document.getElementById("typeChartModal");
        const typeChartBtn = document.getElementById("typeChartBtn");
        const typeChartCloseSpan = typeChartModal ? typeChartModal.querySelector(".close") : null;

if (typeChartBtn)
    typeChartBtn.onclick = () => {
        if (typeChartModal) {
            typeChartModal.style.display = "block";
            styleTypeChartHeaders(); // Add this line
        }
    };
        if (typeChartCloseSpan)
            typeChartCloseSpan.onclick = () => {
                if (typeChartModal) typeChartModal.style.display = "none";
            };
        window.addEventListener("click", (e) => {
            if (e.target == typeChartModal) {
                if (typeChartModal) typeChartModal.style.display = "none";
            }
        });

        const abilityDetailsModal = document.getElementById("abilityDetailsModal");

        function getEvolutionaryLine(vinemonId) {
            const line = new Set([vinemonId]);
            const mon = vinemonData[vinemonId];

            if (mon && mon.evolutions) {
                for (let i = 0; i < mon.evolutions.length; i += 3) {
                    const evoName = mon.evolutions[i];
                    const evoId = Object.keys(vinemonData).find((key) => vinemonData[key].name === evoName);
                    if (evoId) {
                        getEvolutionaryLine(evoId).forEach((id) => line.add(id));
                    }
                }
            }
            return line;
        }

        function isSignatureAbility(abilityName, learners) {
            if (learners.length === 0) return false;

            const firstLearnerId = Object.keys(vinemonData).find((key) => vinemonData[key].name === learners[0]);
            if (!firstLearnerId) return false;

            const evoLine = getEvolutionaryLine(firstLearnerId);
            return learners.every((learnerName) => {
                const learnerId = Object.keys(vinemonData).find((key) => vinemonData[key].name === learnerName);
                return evoLine.has(learnerId);
            });
        }

        const cryAudio = new Audio(); 

        function resetAndFilterVinemonList(filterType, filterValue) {
            const vinemonListModal = document.getElementById("vinemonListModal");
            const vinemonSearchInput = document.getElementById("vinemonSearchInput");
            const type1Filter = document.getElementById("vinemonType1Filter");
            const type2Filter = document.getElementById("vinemonType2Filter");
            const breedingFilter = document.getElementById("vinemonBreedingGroupFilter");

            vinemonSearchInput.value = "";
            selectedType1 = "";
            selectedType2 = "";
            selectedBreedingGroup = "";
            if (type1Filter) type1Filter.value = "";
            if (type2Filter) type2Filter.value = "";
            if (breedingFilter) breedingFilter.value = "";

            setVinemonSort("id", document.getElementById("sortVinemonByIdBtn"));

            switch (filterType) {
                case "type1":
                    selectedType1 = filterValue;
                    if (type1Filter) type1Filter.value = filterValue;
                    break;
                case "breedingGroup":
                    selectedBreedingGroup = filterValue;
                    if (breedingFilter) breedingFilter.value = filterValue;
                    break;
            }

            renderVinemonList();
            if (vinemonListModal) vinemonListModal.style.display = "block";
        }

        document.addEventListener("keydown", (event) => {
            const activeElement = document.activeElement;
            const isTyping = activeElement.tagName === "INPUT" || activeElement.tagName === "SELECT";

            function getActiveScrollableModal() {
                const modals = {
                    vinemonListModal: "vinemonListContainer",
                    itemsListModal: "itemsListContainer",
                    movesListModal: "movesListContainer",
                    abilitiesListModal: "abilitiesListContainer"
                };

                for (const modalId in modals) {
                    const modalElement = document.getElementById(modalId);
                    if (modalElement && window.getComputedStyle(modalElement).display !== "none") {
                        return document.getElementById(modals[modalId]);
                    }
                }
                return null; 
            }

            const activeModalScroller = getActiveScrollableModal();

            if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                if (activeModalScroller) {
                    event.preventDefault();
                    const scrollAmount = event.shiftKey ? 400 : 40;
                    activeModalScroller.scrollTop += event.key === "ArrowDown" ? scrollAmount : -scrollAmount;
                }
            }

            if (isTyping) {
                return; 
            }

            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                if (activeModalScroller) return;

                event.preventDefault();
                const ids = Object.keys(vinemonData)
                    .map(Number)
                    .sort((a, b) => a - b);
                if (ids.length === 0) return;

                const currentId = parseInt(document.getElementById("vinemonSelect").value);
                const currentIndex = ids.indexOf(currentId);
                const jumpAmount = event.shiftKey ? 10 : 1;
                let newIndex;

                if (event.key === "ArrowLeft") {
                    newIndex = currentIndex - jumpAmount;
                    while (newIndex < 0) {
                        newIndex += ids.length;
                    }
                } else {
                    newIndex = currentIndex + jumpAmount;
                    newIndex = newIndex % ids.length;
                }

                const newId = ids[newIndex];
                if (newId !== undefined && newId !== currentId) {
                    loadVinemon(String(newId).padStart(3, "0"));
                }
            }
        });

        const infoModalContent = {
            criticalHit: {
                title: "Critical Hit",
                description: "A critical hit is an attack that deals increased damage, ignoring the attacker's negative stat changes and the defender's positive stat changes. By default, a critical hit deals 1.5 times the normal damage. This rate and the damage multiplier can be affected by certain moves, abilities, or items."
            }
        };

        document.body.addEventListener("click", function(event) {
            const infoLink = event.target.closest(".info-link");

            if (infoLink) {
                event.preventDefault();
                const key = infoLink.dataset.infoKey;
                const content = infoModalContent[key];

                if (content) {
                    const modal = document.getElementById("genericInfoModal");
                    document.getElementById("genericInfoModalTitle").textContent = content.title;
                    document.getElementById("genericInfoModalDescription").innerHTML = content.description.replace(
                        /\n/g,
                        "<br>"
                    );

                    modal.querySelector(".close-button-details").onclick = () => {
                        modal.style.display = "none";
                    };

                    modal.style.display = "flex";
                }
            }
        });

        window.addEventListener("click", (event) => {
            const modal = document.getElementById("genericInfoModal");
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });

        function showEvolutionLocationMap(locationId) {
            const modal = document.getElementById("locationMapModal");
            const grid = document.getElementById("locationMapModalGrid");
            if (!modal || !grid || !mapData.mapData) return;

            grid.innerHTML = "";
            const allPoints = mapData.mapData[0].points;
            const targetPoint = findLocationPointById(locationId);

            if (!targetPoint) {
                console.error(`Could not find targetPoint for location ID: ${locationId}`);
                return;
            }

            document.getElementById("locationMapModalTitle").textContent =
                `Evolution Location: ${targetPoint.name}${targetPoint.subLocation ? ` - ${targetPoint.subLocation}` : ""}`;

            for (let y = 0; y < 20; y++) {
                for (let x = 0; x < 30; x++) {
                    const cell = document.createElement("div");
                    cell.className = "map-cell";
                    const currentPoint = allPoints.find((p) => p.x == x && p.y == y);
                    if (currentPoint) cell.classList.add("location-spot");

                    if (targetPoint.x == x && targetPoint.y == y) {
                        cell.classList.add("highlight");
                        cell.style.cursor = "pointer";
                        cell.addEventListener("click", () => {
                            modal.style.display = "none";
                            showLocationDetails([targetPoint]);
                        });
                    }
                    grid.appendChild(cell);
                }
            }

            modal.style.display = "flex";
            modal.querySelector(".close").onclick = () => (modal.style.display = "none");
        }

        function updateMapForVinemon(vinemonName) {
            document.querySelectorAll(".map-cell.highlight").forEach(cell => cell.classList.remove("highlight"));
            const infoList = document.getElementById("map-info-list");
            infoList.innerHTML = "";

            if (!mapData.mapData || !mapData.mapData[0] || !mapData.mapData[0].points) {
                infoList.innerHTML = "<p>Map data is not available.</p>";
                return;
            }

            const locationsFound = new Map();
            const upperCaseVinemonName = vinemonName.toUpperCase();

            mapData.mapData[0].points.forEach(point => {
                if (!point.locations || !Array.isArray(point.locations)) return;

                point.locations.forEach(subLoc => {
                    let found = false;
                    const locationKey = `${point.name}-${subLoc.subLocationName || ''}`;

                    if (subLoc.encounterData?.encounterTypes) {
                        for (const type in subLoc.encounterData.encounterTypes) {
                            const encounters = subLoc.encounterData.encounterTypes[type] || [];
                            if (encounters.some(enc => enc.vinemonName.toUpperCase() === upperCaseVinemonName)) {
                                found = true;
                                break;
                            }
                        }
                    }

                    if (subLoc.staticEncounters?.some(enc => enc.vinemonName.toUpperCase() === upperCaseVinemonName)) {
                        found = true;
                    }

                    if (subLoc.gifts?.some(gift => gift.vinemonName.toUpperCase() === upperCaseVinemonName)) {
                        found = true;
                    }

                    if (subLoc.swarms?.encounterTypes) {
                        for (const type in subLoc.swarms.encounterTypes) {
                            if (subLoc.swarms.encounterTypes[type].some(name => name.toUpperCase() === upperCaseVinemonName)) {
                                found = true;
                                break;
                            }
                        }
                    }

                    if (subLoc.purchases?.some(item => item.vinemonName.toUpperCase() === upperCaseVinemonName)) {
                        found = true;
                    }

                    if (found && !locationsFound.has(locationKey)) {
                        locationsFound.set(locationKey, {
                            name: point.name,
                            subLocation: subLoc.subLocationName || "",
                            x: point.x,
                            y: point.y,
                            pointsData: mapData.mapData[0].points.filter(p => p.x === point.x && p.y === point.y)
                        });
                        const cell = document.querySelector(`.map-cell[data-x='${point.x}'][data-y='${point.y}']`);
                        if (cell) cell.classList.add("highlight");
                    }
                });
            });

            if (locationsFound.size > 0) {
                const ul = document.createElement("ul");
                locationsFound.forEach((loc) => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${loc.name}</strong>${loc.subLocation ? `<br>${loc.subLocation}` : ''}`;
                    li.dataset.x = loc.x;
                    li.dataset.y = loc.y;
                    li.addEventListener("mouseover", () => document.querySelector(`.map-cell[data-x='${li.dataset.x}'][data-y='${li.dataset.y}']`)?.classList.add("hover-highlight"));
                    li.addEventListener("mouseout", () => document.querySelector(`.map-cell[data-x='${li.dataset.x}'][data-y='${li.dataset.y}']`)?.classList.remove("hover-highlight"));
                    li.addEventListener("click", () => showLocationDetails(loc.pointsData));
                    ul.appendChild(li);
                });
                infoList.appendChild(ul);
            } else {
                infoList.innerHTML = "<p>This Vinemon is not available at any specific location.</p>";
            }
        }



        Promise.all([
            fetch("pokemon.json").then((res) => res.json()),
            fetch("map.json").then((res) => res.json()),
            fetch("moves.json").then((res) => res.json()),
            fetch("tms.json").then((res) => res.json()),
            fetch("items.json").then((res) => res.json()),
            fetch("abilities.json").then((res) => res.json())
        ]).then(([pokemon_data, map_data, moves_array, tms_data, items_data, abilities_json_data]) => {
    Object.assign(vinemonData, pokemon_data);
            Object.assign(mapData, map_data);
            allTMsData = tms_data;
            allItemsData = items_data;
            allItemsData = allItemsData.filter((item) => item.name !== "EVOITEMVLINNY");

            allAbilitiesRaw = abilities_json_data;

            moves_array.forEach((move) => {
                allMovesData[move.external_name] = move;
                internalToExternalMoveMap[move.internal_name] = move.external_name;
            });


    moves_array.forEach(move => {
        allMovesDataMap[move.internal_name] = move;
    });

    if (tms_data && tms_data.TMs) {
        allTmMoveNames = Object.keys(tms_data.TMs);
    }

    allItemsData.forEach(item => {
        if (item.field3 === 4 && item.name.startsWith("TM")) {
            try {
                const tmNumber = parseInt(item.name.replace('TM', ''));
                if (tmNumber > 0 && tmNumber <= allTmMoveNames.length) {
                    const tmMoveInternalName = allTmMoveNames[tmNumber - 1];
                    const moveData = allMovesDataMap[tmMoveInternalName];
                    if (moveData) {

                        item.displayName = `${item.name} - ${moveData.external_name}`;
                    }
                }
            } catch (e) {
                console.error(`Error processing TM name for ${item.name}`, e);
            }
        }
    });

            abilities_json_data.forEach((ability) => {
                allAbilitiesData[ability.name] = {
                    in_game_name: ability.in_game_name,
                    description: ability.description
                };
            });
            Object.entries(vinemonData).forEach(([baseMonId, baseMonData]) => {
                if (baseMonData.evolutions && baseMonData.evolutions.length > 0) {
                    for (let i = 0; i < baseMonData.evolutions.length; i += 3) {
                        const evolvedInternalName = baseMonData.evolutions[i];
                        const evolutionCondition = baseMonData.evolutions[i + 1];
                        const evolutionValue = baseMonData.evolutions[i + 2];
                        const key = evolvedInternalName.toUpperCase();
                        if (!preEvoMap[key]) {
                            preEvoMap[key] = [];
                        }
                        preEvoMap[key].push({
                            id: baseMonId,
                            name: baseMonData.name,
                            condition: evolutionCondition,
                            value: evolutionValue
                        });
                    }
                }
            });

            const vinemonTmMap = {};
            if (allTMsData.TMs) {
                for (const tmInternalName in allTMsData.TMs) {
                    const externalName = internalToExternalMoveMap[tmInternalName];
                    if (externalName) {
                        const learners = allTMsData.TMs[tmInternalName];
                        learners.forEach((learnerName) => {
                            if (!vinemonTmMap[learnerName]) vinemonTmMap[learnerName] = new Set();
                            vinemonTmMap[learnerName].add(externalName);
                        });
                    }
                }
            }

            Object.values(vinemonData).forEach((mon) => {
                if (mon.signature) learnableMoves.add(mon.signature);
                if (mon.levelUpMoves) mon.levelUpMoves.forEach((entry) => learnableMoves.add(entry.move));
                if (mon.eggMoves) mon.eggMoves.forEach((moveName) => learnableMoves.add(moveName));
                if (vinemonTmMap[mon.name]) vinemonTmMap[mon.name].forEach((moveName) => learnableMoves.add(moveName));

                if (mon.abilities) mon.abilities.forEach((abilityName) => learnableAbilities.add(abilityName));
                if (mon.hidden) mon.hidden.forEach((abilityName) => learnableAbilities.add(abilityName));
            });
            initializeThemes()
            initDropdown();
            populateTypeFilters();
            populateBreedingGroupFilter();
            populateMoveTypeFilter();
            populateItemCategoryFilter();
            populateMoveFlagFilter();
            initializeAbilitiesModal();
            generateMap();
            const urlParams = new URLSearchParams(window.location.search);
            const monId = urlParams.get("id") || "001";
            shiny = getURLBool("shiny");
            female = getURLBool("female");
            back = getURLBool("back");
            corruption = getURLBool("corruption");
            const urlExtraSprite = urlParams.get("extra") || "";
            const mon = vinemonData[monId];
            const newMonExtraSprites = mon.extraSprites || [];
            currentExtraSprite = urlExtraSprite && newMonExtraSprites.includes(urlExtraSprite) ? urlExtraSprite : "";

            loadVinemon(monId);
        });

        function renderAbilities() {
            const abilitiesListContainer = document.getElementById("abilitiesListContainer");
            const searchInput = document.getElementById("abilitySearchInput");
            if (!abilitiesListContainer || !searchInput) return;

            abilitiesListContainer.innerHTML = "";
            abilitiesListContainer.classList.toggle("small-view-grid", abilityViewMode === "grid");
            let abilitiesToRender = [...allAbilitiesRaw];

            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                abilitiesToRender = abilitiesToRender.filter(
                    (ability) =>
                    ability.in_game_name.toLowerCase().includes(searchTerm) ||
                    ability.description.toLowerCase().includes(searchTerm)
                );
            }

            abilitiesToRender = abilitiesToRender.filter((ability) => {
                const isUsed = learnableAbilities.has(ability.name);
                return showUnusedAbilities ? !isUsed : isUsed;
            });

            abilitiesToRender.sort((a, b) => {
                const nameA = a.in_game_name;
                const nameB = b.in_game_name;
                return abilitySortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            });

            const totalAbilitiesCount = allAbilitiesRaw.length;
            const totalUsedAbilitiesCount = learnableAbilities.size;

            const denominator = showUnusedAbilities ?
                totalAbilitiesCount - totalUsedAbilitiesCount :
                totalUsedAbilitiesCount;

            document.getElementById("abilityDexCount").textContent = `(${abilitiesToRender.length} / ${denominator})`;

            if (abilitiesToRender.length === 0) {
                abilitiesListContainer.innerHTML = `<p style="text-align: center; width: 100%;">No abilities match.</p>`;
                return;
            }

            abilitiesToRender.forEach((ability) => {
                const learners = Object.values(vinemonData)
                    .filter(
                        (mon) =>
                        (mon.abilities && mon.abilities.includes(ability.name)) ||
                        (mon.hidden && mon.hidden.includes(ability.name))
                    )
                    .map((mon) => mon.name);

                if (abilityViewMode === "grid") {
                    const entry = document.createElement("div");
                    entry.className = "ability-entry-small";
                    entry.style.cursor = "pointer";
                    entry.onclick = () => showAbilityDetails(ability, learners);

                    const nameSpan = document.createElement("span");
                    nameSpan.className = "ability-name";
                    nameSpan.textContent = ability.in_game_name;

                    entry.appendChild(nameSpan);
                    abilitiesListContainer.appendChild(entry);
                } else {
                    const entry = document.createElement("div");
                    entry.className = "ability-entry";
                    entry.style.cursor = "pointer";
                    entry.onclick = () => showAbilityDetails(ability, learners);

                    const nameSpan = document.createElement("span");
                    nameSpan.className = "ability-name";
                    nameSpan.textContent = ability.in_game_name;

                    const learnersSpan = document.createElement("span");
                    learnersSpan.className = "ability-learners";
                    learnersSpan.textContent = `x${learners.length}`;

                    entry.appendChild(nameSpan);
                    entry.appendChild(learnersSpan);
                    abilitiesListContainer.appendChild(entry);
                }
            });
        }

        function showAbilityDetails(ability, learners) {
            const abilityDetailsModal = document.getElementById("abilityDetailsModal");
            if (!abilityDetailsModal) return;

            document.getElementById("modalAbilityName").textContent = ability.in_game_name;
            document.getElementById("modalAbilityDescription").innerHTML = ability.description.replace(/\\n/g, "<br>");

            const learnedByListElement = document.getElementById("modalAbilityLearnedBy");
            learnedByListElement.innerHTML = "<strong>Learned By:</strong> ";

            if (learners.length > 0) {
                learners.sort().forEach((learnerName, index) => {
                    const monId = Object.keys(vinemonData).find((key) => vinemonData[key].name === learnerName);
                    if (monId) {
                        const link = document.createElement("a");
                        link.href = `?id=${monId}`;
                        link.textContent = learnerName;
                        link.style.color = "rgb(255, 161, 218)";
                        link.addEventListener("click", (e) => {
                            e.preventDefault();
                            abilityDetailsModal.style.display = "none";
                            document.getElementById("abilitiesListModal").style.display = "none";
                            loadVinemon(monId);
                        });
                        learnedByListElement.appendChild(link);
                        if (index < learners.length - 1) {
                            learnedByListElement.append(", ");
                        }
                    }
                });
            } else {
                learnedByListElement.append("None");
            }

            const signatureStatus = document.getElementById("modalAbilitySignature");
            if (isSignatureAbility(ability.name, learners)) {
                signatureStatus.textContent = "Signature Ability";
                signatureStatus.style.display = "block";
            } else {
                signatureStatus.style.display = "none";
            }

            abilityDetailsModal.style.display = "flex";
        }

        function initializeAbilitiesModal() {
            const viewBtn = document.getElementById("viewAbilitiesBtn");
            const modal = document.getElementById("abilitiesListModal");
            const abilityDetailsModal = document.getElementById("abilityDetailsModal");

            if (!viewBtn || !modal || !abilityDetailsModal) return;

            const closeBtn = modal.querySelector(".close");
            const detailsCloseBtn = abilityDetailsModal.querySelector(".close-button-details");
            const searchInput = document.getElementById("abilitySearchInput");
            const sortBtn = document.getElementById("sortAbilitiesByNameBtn");
            const toggleUnusedBtn = document.getElementById("toggleUnusedAbilitiesBtn");

            viewBtn.addEventListener("click", () => {
                modal.querySelector(".modal-content").style.borderColor = "#530400";

                showUnusedAbilities = false;
                abilitySortOrder = "asc";
                searchInput.value = "";

                toggleUnusedBtn.dataset.showing = "used";
                toggleUnusedBtn.textContent = "Show Unused";
                toggleUnusedBtn.classList.remove("active-sort");
                sortBtn.textContent = "Sort ABC (A-Z)";
                sortBtn.dataset.order = "asc";
                sortBtn.classList.add("active-sort");

                renderAbilities();
                modal.style.display = "block";
            });

            if (closeBtn)
                closeBtn.addEventListener("click", () => {
                    modal.style.display = "none";
                });
            if (detailsCloseBtn)
                detailsCloseBtn.addEventListener("click", () => {
                    abilityDetailsModal.style.display = "none";
                });
            if (searchInput) searchInput.addEventListener("input", renderAbilities);

            if (sortBtn) {
                sortBtn.addEventListener("click", () => {
                    abilitySortOrder = abilitySortOrder === "asc" ? "desc" : "asc";
                    sortBtn.dataset.order = abilitySortOrder;
                    sortBtn.textContent = abilitySortOrder === "asc" ? "Sort ABC (A-Z)" : "Sort ABC (Z-A)";
                    renderAbilities();
                });
            }

            if (toggleUnusedBtn) {
                toggleUnusedBtn.addEventListener("click", () => {
                    showUnusedAbilities = !showUnusedAbilities;
                    toggleUnusedBtn.dataset.showing = showUnusedAbilities ? "unused" : "used";
                    toggleUnusedBtn.textContent = showUnusedAbilities ? "Show Used" : "Show Unused";
                    toggleUnusedBtn.classList.toggle("active-sort");
                    renderAbilities();
                });
            }
        }

        function openVinemonListAndFilterByType(typeName) {
            const type1Filter = document.getElementById("vinemonType1Filter");
            const type2Filter = document.getElementById("vinemonType2Filter");
            const breedingFilter = document.getElementById("vinemonBreedingGroupFilter");
            const searchInput = document.getElementById("vinemonSearchInput");
            searchInput.value = "";
            selectedType2 = "";
            if (type2Filter) type2Filter.value = "";
            selectedBreedingGroup = "";
            if (breedingFilter) breedingFilter.value = "";
            setVinemonSort("id", document.getElementById("sortVinemonByIdBtn"));
            selectedType1 = typeName;
            if (type1Filter) type1Filter.value = typeName;
            renderVinemonList();
            const vinemonListModal = document.getElementById("vinemonListModal");
            if (vinemonListModal) vinemonListModal.style.display = "block";
        }
        document.addEventListener("DOMContentLoaded", () => {
            const moveCategoryButtons = document.querySelectorAll(".move-category-button");
            const moveDetailsModal = document.getElementById("moveDetailsModal");
            const closeButton = moveDetailsModal ? moveDetailsModal.querySelector(".close-button-details") : null;
            const abilityDetailsModal = document.getElementById("abilityDetailsModal");

            const toggleVinemonViewBtn = document.getElementById("toggleVinemonViewBtn");
            if (toggleVinemonViewBtn) {
                toggleVinemonViewBtn.addEventListener("click", () => {
                    vinemonViewMode = vinemonViewMode === "list" ? "grid" : "list";
                    toggleVinemonViewBtn.classList.toggle("active-sort", vinemonViewMode === "grid");
                    renderVinemonList();
                });
            }

            const toggleItemViewBtn = document.getElementById("toggleItemViewBtn");
            if (toggleItemViewBtn) {
                toggleItemViewBtn.addEventListener("click", () => {
                    itemViewMode = itemViewMode === "list" ? "grid" : "list";
                    toggleItemViewBtn.classList.toggle("active-sort", itemViewMode === "grid");
                    renderItems();
                });
            }

            const toggleMoveViewBtn = document.getElementById("toggleMoveViewBtn");
            if (toggleMoveViewBtn) {
                toggleMoveViewBtn.addEventListener("click", () => {
                    moveViewMode = moveViewMode === "list" ? "grid" : "list";
                    toggleMoveViewBtn.classList.toggle("active-sort", moveViewMode === "grid");
                    renderMoves();
                });
            }

            const toggleAbilityViewBtn = document.getElementById("toggleAbilityViewBtn");
            if (toggleAbilityViewBtn) {
                toggleAbilityViewBtn.addEventListener("click", () => {
                    abilityViewMode = abilityViewMode === "list" ? "grid" : "list";
                    toggleAbilityViewBtn.classList.toggle("active-sort", abilityViewMode === "grid");
                    renderAbilities();
                });
            }

            moveCategoryButtons.forEach((button) => {
                button.addEventListener("click", function() {
                    moveCategoryButtons.forEach((btn) => btn.classList.remove("active"));
                    this.classList.add("active");
                    document.querySelectorAll(".move-list").forEach((list) => (list.style.display = "none"));
                    document.getElementById(this.dataset.category + "List").style.display = "flex";
                });
            });

            if (closeButton)
                closeButton.addEventListener("click", () => {
                    if (moveDetailsModal) moveDetailsModal.style.display = "none";
                });
            window.addEventListener("click", (event) => {
                if (event.target == moveDetailsModal) {
                    if (moveDetailsModal) moveDetailsModal.style.display = "none";
                }
                if (event.target == itemsListModal) {
                    if (itemsListModal) itemsListModal.style.display = "none";
                }
                if (event.target == itemDetailsModal) {
                    if (itemDetailsModal) itemDetailsModal.style.display = "none";
                }
                if (event.target == movesListModal) {
                    if (movesListModal) movesListModal.style.display = "none";
                }
                if (event.target == vinemonListModal) {
                    if (vinemonListModal) vinemonListModal.style.display = "none";
                }
                const abilitiesModal = document.getElementById("abilitiesListModal");
                if (event.target == abilitiesModal) {
                    if (abilitiesModal) abilitiesModal.style.display = "none";
                }
                if (event.target == abilityDetailsModal) {
                    if (abilityDetailsModal) abilityDetailsModal.style.display = "none";
                }
                if (event.target == locationMapModal) {
                    if (locationMapModal) locationMapModal.style.display = "none";
                }
            });

            const vinemonType1Filter = document.getElementById("vinemonType1Filter");
            const vinemonType2Filter = document.getElementById("vinemonType2Filter");
            const vinemonStatSortSelect = document.getElementById("vinemonStatSort");
            const vinemonApplyStatSortBtn = document.getElementById("vinemonApplyStatSortBtn");
            const localSortVinemonByIdBtn = document.getElementById("sortVinemonByIdBtn");
            const localSortVinemonByNameBtn = document.getElementById("sortVinemonByNameBtn");

            const sortVinemonByHeightBtn = document.getElementById("sortVinemonByHeightBtn");
            const sortVinemonByWeightBtn = document.getElementById("sortVinemonByWeightBtn");

            if (sortVinemonByHeightBtn) {
                sortVinemonByHeightBtn.addEventListener("click", (e) => setVinemonSort("height", e.currentTarget));
            }
            if (sortVinemonByWeightBtn) {
                sortVinemonByWeightBtn.addEventListener("click", (e) => setVinemonSort("weight", e.currentTarget));
            }

            if (vinemonType1Filter)
                vinemonType1Filter.addEventListener("change", (e) => {
                    selectedType1 = e.target.value; 
                    renderVinemonList();
                });

            if (vinemonType2Filter)
                vinemonType2Filter.addEventListener("change", (e) => {
                    selectedType2 = e.target.value; 
                    renderVinemonList();
                });

            if (vinemonBreedingGroupFilter) {
                vinemonBreedingGroupFilter.addEventListener("change", (e) => {
                    selectedBreedingGroup = e.target.value;
                    renderVinemonList();
                });
            }

            if (vinemonStatSortSelect) {
                vinemonStatSortSelect.addEventListener("change", () => {
                    selectedStatToSort = vinemonStatSortSelect.value;
                    if (selectedStatToSort) {
                        if (vinemonApplyStatSortBtn.dataset.statSortActive === "true") {
                            renderVinemonList();
                        }
                    } else {
                        if (vinemonApplyStatSortBtn.dataset.statSortActive === "true") {
                            vinemonApplyStatSortBtn.dataset.statSortActive = "false";
                            vinemonApplyStatSortBtn.classList.remove("active-sort");
                            setVinemonSort("id", localSortVinemonByIdBtn);
                        }
                    }
                    updateApplyStatSortButtonText();
                });
            }

            if (vinemonApplyStatSortBtn) {
                vinemonApplyStatSortBtn.addEventListener("click", (e) => {
                    const statToSortValue = vinemonStatSortSelect.value;
                    if (!statToSortValue) {
                        return;
                    }

                    if (vinemonApplyStatSortBtn.dataset.statSortActive === "true" && selectedStatToSort === statToSortValue) {
                        statSortOrder = vinemonApplyStatSortBtn.dataset.order === "desc" ? "asc" : "desc";
                    } else {
                        statSortOrder = "desc";
                        selectedStatToSort = statToSortValue;
                        currentVinemonSort = "";
                        if (localSortVinemonByIdBtn) localSortVinemonByIdBtn.classList.remove("active-sort");
                        if (localSortVinemonByNameBtn) localSortVinemonByNameBtn.classList.remove("active-sort");
                        vinemonApplyStatSortBtn.classList.add("active-sort");
                        vinemonApplyStatSortBtn.dataset.statSortActive = "true";
                    }

                    vinemonApplyStatSortBtn.dataset.order = statSortOrder;
                    updateApplyStatSortButtonText();
                    renderVinemonList();
                });
            }

            if (localSortVinemonByIdBtn)
                localSortVinemonByIdBtn.addEventListener("click", (e) => {
                    setVinemonSort("id", e.currentTarget);
                });
            if (localSortVinemonByNameBtn)
                localSortVinemonByNameBtn.addEventListener("click", (e) => {
                    setVinemonSort("name", e.currentTarget);
                });

            updateApplyStatSortButtonText();
const creditsBtn = document.getElementById('creditsBtn');
        const creditsModal = document.getElementById('creditsModal');
        const creditsModalBody = document.getElementById('creditsModalBody');
        const closeBtn = creditsModal.querySelector('.close-button-details');

        creditsBtn.addEventListener('click', () => {
            // Check if credits are already loaded to avoid regenerating them
            if (creditsModalBody.innerHTML.trim() === "<!-- Credits will be loaded here -->" || creditsModalBody.innerHTML.trim() === "") {
                let htmlContent = '';

                creditsPageLayout.forEach(item => {
                    switch (item.type) {
                        case 'main_header':
                            htmlContent += `<h1>${item.content}</h1>`;
                            break;
                        case 'sub_header':
                            htmlContent += `<h1>${item.content}</h1>`;
                            break;
                        case 'separator':
                            htmlContent += '<hr>';
                            break;
                        case 'section_header':
                            htmlContent += `<h2>${item.content}</h2>`;
                            break;
                        case 'credit_group':
                            if (item.title) {
                                htmlContent += `<h3>${item.title}</h3>`;
                            }
                            const membersHtml = item.members.map(member => {
                                const memberName = typeof member === 'object' ? member.name : member;
                                const memberHandle = typeof member === 'object' ? member.handle : '';
                                const creatorKey = memberName.toUpperCase().replace(/ /g, '');

                                if (fullCreatorData[creatorKey]) {
                                    return `<a href="#" class="creator-credit-link" onclick="event.preventDefault(); showCreatorInfo('${memberName}')">${memberName}</a>` + (memberHandle ? ` - ${memberHandle}` : '');
                                } else {
                                    return memberName + (memberHandle ? ` - ${memberHandle}` : '');
                                }
                            }).join(' - ');
                            htmlContent += `<p>${membersHtml}</p>`;
                            break;
                        case 'final_note':
                             htmlContent += `<p><em>${item.content.replace(/\n/g, '<br>')}</em></p>`;
                             break;
                    }
                });
                creditsModalBody.innerHTML = htmlContent;
            }
            creditsModal.style.display = 'flex';
        });

        closeBtn.addEventListener('click', () => {
            creditsModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === creditsModal) {
                creditsModal.style.display = 'none';
            }
        });
});


        function isSignatureMove(moveName, learners) {
            if (learners.size === 0) return false;

            const firstLearner = learners.values().next().value;
            if (!firstLearner) return false;

            const firstLearnerEvoLine = getEvolutionaryLine(firstLearner.id);
            if (firstLearnerEvoLine.size === 0) return false;

            for (const learner of learners) {
                if (!firstLearnerEvoLine.has(learner.id)) {
                    return false;
                }
            }

            return true; 
        }

        function showMoveDetails(moveName) {
            const moveInfo = allMovesData[moveName];
            const modal = document.getElementById("moveDetailsModal");
            if (!moveInfo || !modal) {
                console.error("Move details not found for:", moveName);
                return;
            }

            document.getElementById("modalMoveName").textContent = moveInfo.external_name;

            const modalMoveTypeSpan = document.getElementById("modalMoveType");
            const mappedMoveType = mapType(moveInfo.type);
            const moveTypeColor = typeColors[mappedMoveType] || "#A90024";
            modalMoveTypeSpan.className = "modal-styled-badge";
            modalMoveTypeSpan.textContent = getDisplayTypeName(moveInfo.type);
            modalMoveTypeSpan.style.backgroundColor = moveTypeColor;
            modalMoveTypeSpan.onclick = () => filterMovesFromDetails("type", mappedMoveType);

            const lightColors = [
                "#F7D02C",
                "#FFF44F",
                "#FFFF00",
                "#FFFFE0",
                "#FFDAB9",
                "#FFFACD",
                "#ADFF2F",
                "#D3D3D3",
                "#90EE90"
            ];
            modalMoveTypeSpan.style.color = lightColors.some((c) => moveTypeColor.toUpperCase() === c) ? "#000" : "#FFF";

            const modalMoveCategorySpan = document.getElementById("modalMoveCategory");
            const moveCategoryColor = moveCategoryColors[moveInfo.category] || "#666";
            modalMoveCategorySpan.className = "modal-styled-badge";
            modalMoveCategorySpan.textContent = moveInfo.category;
            modalMoveCategorySpan.style.backgroundColor = moveCategoryColor;
            modalMoveCategorySpan.style.color = "#FFF";
            modalMoveCategorySpan.onclick = () => filterMovesFromDetails("category", moveInfo.category); // Now clickable

            document.getElementById("modalMovePower").textContent = moveInfo.base_power === 0 ? "—" : moveInfo.base_power;
            document.getElementById("modalMoveAccuracy").textContent = moveInfo.accuracy === 0 ? "—" : moveInfo.accuracy;
            document.getElementById("modalMovePP").textContent = moveInfo.Total_PP;
            document.getElementById("modalMoveEffectChance").textContent =
                moveInfo.effect_chance === 0 ? "—" : moveInfo.effect_chance + "%";

            const moveDetailsModalContent = document.querySelector("#moveDetailsModal .modal-content-details");
            if (moveDetailsModalContent) {
                moveDetailsModalContent.style.setProperty("--dynamic-border-color", moveTypeColor);
                moveDetailsModalContent.style.setProperty("--dynamic-strong-color", moveTypeColor);
            }

            const modalDescElement = document.getElementById("modalMoveDescription");
            modalDescElement.innerHTML = ""; 

            let rawDescription = (moveInfo.description || "").trim();
            let descriptionText = "";

            const flagContainer = document.createElement("div");
            flagContainer.style.marginTop = "10px";

            const separatorIndex = rawDescription.indexOf(" - ");

            if (separatorIndex !== -1) {
                let flagsPart = rawDescription.substring(0, separatorIndex);
                descriptionText = rawDescription.substring(separatorIndex + 3);
                flagsPart = flagsPart.replace(/\/\//g, "").trim();
                const flags = flagsPart.split(" ~ ").map((flag) => flag.trim());

                flags.forEach((flag) => {
                    const flagUpper = flag.toUpperCase();
                    const priorityMatch = flagUpper.match(/^([+-]\d+)\s*PRIORITY/);
                    let badgeText = flag;
                    let badgeValue = flagUpper;

                    const badge = document.createElement("span");
                    badge.className = "badge";

                    if (priorityMatch) {
                        const priorityValue = priorityMatch[1];
                        badge.style.backgroundColor = priorityValue.startsWith("+") ? "#B22222" : "#4682B4";
                        badge.style.color = "white";
                        badgeText = `${priorityValue} PRIORITY`;
                        badgeValue = badgeText;
                    } else if (flagStyles[flagUpper]) {
                        const style = flagStyles[flagUpper];
                        for (const prop in style) {
                            badge.style[prop] = style[prop];
                        }
                        badgeText = Object.keys(flagStyles).find((k) => k.toUpperCase() === flagUpper) || flag;
                    }

                    badge.textContent = badgeText;
                    badge.onclick = () => filterMovesFromDetails("flag", badgeValue);
                    flagContainer.appendChild(badge);
                });
            } else {
                descriptionText = rawDescription;
            }

            if (moveInfo.external_name === "Curse") {
                descriptionText = descriptionText.replace(/ ~ /g, "<br><br>");
            }
            descriptionText = descriptionText.replace(/\\n/g, "<br>");

            const descriptionNode = document.createElement("p");
            descriptionNode.style.marginTop = "10px";
            descriptionNode.innerHTML = descriptionText;

            modalDescElement.appendChild(flagContainer);
            modalDescElement.appendChild(descriptionNode);

            const learnedByListElement = document.getElementById("modalMoveLearnedBy");
            learnedByListElement.innerHTML = "<strong>Learned By:</strong> ";
            const learners = new Set();
            Object.entries(vinemonData).forEach(([id, mon]) => {
                if (mon.levelUpMoves?.some((entry) => entry.move === moveName))
                    learners.add({
                        id,
                        name: mon.name
                    });
                if (mon.eggMoves?.includes(moveName))
                    learners.add({
                        id,
                        name: mon.name
                    });
                if (allTMsData.TMs) {
                    for (const tmInternal in allTMsData.TMs) {
                        if (internalToExternalMoveMap[tmInternal] === moveName && allTMsData.TMs[tmInternal].includes(mon.name)) {
                            learners.add({
                                id,
                                name: mon.name
                            });
                            break;
                        }
                    }
                }
                if (mon.signature === moveName)
                    learners.add({
                        id,
                        name: mon.name
                    });
            });
            if (learners.size > 0) {
                const sortedLearners = Array.from(learners).sort((a, b) => parseInt(a.id) - parseInt(b.id));
                sortedLearners.forEach((learner, index) => {
                    const link = document.createElement("a");
                    link.href = `?id=${learner.id}`;
                    link.textContent = learner.name;
                    link.style.color = moveTypeColor;
                    link.onclick = (e) => {
                        e.preventDefault();
                        modal.style.display = "none";
                        loadVinemon(learner.id);
                    };
                    learnedByListElement.appendChild(link);
                    if (index < sortedLearners.length - 1) learnedByListElement.append(", ");
                });
            } else {
                learnedByListElement.append("None");
            }
            const signatureStatus = document.getElementById("modalMoveSignature");
            if (isSignatureMove(moveName, learners)) {
                signatureStatus.textContent = "Signature Move";
                signatureStatus.style.backgroundColor = moveTypeColor;
                signatureStatus.style.display = "block";
            } else {
                signatureStatus.style.display = "none";
            }

            modal.style.display = "none";
            setTimeout(() => {
                modal.style.display = "flex";
            }, 0);
        }

    document.addEventListener('DOMContentLoaded', () => {
        const playCryBtn = document.getElementById("playCryBtn");
        const viewEggBtn = document.getElementById('viewEggBtn');
        const volumeBtn = document.getElementById('volumeBtn');
        const volumeModal = document.getElementById('volumeModal');
        const songVolumeSlider = document.getElementById('songVolume');
        const clickVolumeSlider = document.getElementById('clickVolume');
        const cryVolumeSlider = document.getElementById('cryVolume');
        const songMuteCheckbox = document.getElementById('songMute');
        const clickMuteCheckbox = document.getElementById('clickMute');
        const cryMuteCheckbox = document.getElementById('cryMute');
        const trainerTipToggle = document.getElementById('trainerTipToggleEnabled');
        const trainerTipContainer = document.getElementById('trainerTipContainer');
        const audioFile = 'https://vinemon.link/vinemon/vinemon/vinemonSiteBeats.ogg';
        const clickSoundFile = 'https://alizarin.red/sfx/VMclick2.mp3';
        const LOOP_START_SAMPLE = 1585344;
        const LOOP_LENGTH_SAMPLE = 3187168;
        const FADE_IN_DURATION = 4;
        let audioContext;
        let songBuffer, clickBuffer, cryBuffer;
        let songGainNode, clickGainNode, cryGainNode;
        let isMusicPlaying = false;
        
        // --- Trainer Tip Variables ---
        let initialTipTimer;
        let tipCycleInterval;
        let currentTipIndex = 0;

        const trainerTips = [
            "Vinemon: Sauce Edition, you see, is a Pokémon Fan Game made in RPG Maker XP with the Pokémon Essentials Engine. Very expensivth!",
            "Did you know? You can use the Arrow Keys to navigate the VineDex. Hold SHIFT to jump by 10! It's a real time-saver, you underthtand.",
            "Some Vinemon have alternate forms or sprites! You must try toggling the options under the main sprite. You never know what you'll find, yesth!",
            "The 'dynamic' theme will change the website's colors to match the currently viewed Vinemon's types. Very clever, wouldn't you say?",
            "Clicking on a type badge will open the VineDex and automatically filter by that type. It's quite the modern conveniencth!",
            "You can randomize everything, including the form (Shiny, Corrupted, etc.), by clicking the 'Randomize' button! The possibilities are endlessth!",
            "Curious about who made a certain Vinemon? The creator's name is often mentioned in the VineDex entry and is clickable! A little credit where credit is due, of courseth.",
            "Each Dex (VineDex, MoveDex, etc.) has its own sorting and filtering options. Don't forget to use them! They're very expensivth... to implement, you know.",
            "Some moves have special properties called Flags. Click on a move to see its details and click on a flag to filter all moves by that property! It's a fascinating systhem.",
            "Can't find a Vinemon in the wild? It might be a gift, a static encounter, or an evolution! You must explore all the possibilitieth, Vinnith!",
            "Wild Vinemon battle AI upgrades after the 2nd Gym Badge to Trainer Level AI, and if the levels of the wild Vinemon are level 20 or above. They get smarter, you thee!",
            "The game has several skill levels of AI, some smarter, some that involve taking your party/moves/stats/held items/abilities into account. A real challenge for a budding young trainer, yesth!",
            "Certain Trainers will have special programming to act as unique 'bosses' for battles incorporating fun and interesting mechanics that reside outside of the normal Vinemon, Items, & Ability mechanics! You must be prepared for anything, Vinnith!",
            "The Shiny Encounter rate is 6% and Corruption Encounter rate is 3%. This means you have a 0.18% chance to get a Shiny Corruption both in-game AND on this site! The odds are... astronomical, you thee!",
            "The Vinerus (Pokerus) can be found at a 6% encounter rate. A very beneficial, and rare, occurrencth!",
            "Wild Vinemon now can be found with both regular and hidden abilities in the wild. You never know what you'll encounter out there, no thir!",
            "Wild Vinemon can now be encountered holding items. When defeated those items may drop after the battle if they weren't consumed during it. A little bonuth for your efforts.",
            "Certain Items Now Work on Vinemon: Light Ball will work on Rabbuzz, Thick Club will work on Boomish and Droloom, Metal Powder and Quick Powder work on a Transformed Cognitto! You must find the right tool for the job, Vinnith!",
            "Poison does not cause damage outside of battle. A small mercy, yesth.",
            "Evolution can happen mid-battle if their requirements are met. Imagine the surprise on your opponent's fathe!",
            "Items that are consumed in battle are now a one-time use item that is restored after a battle (Berries and Food items aren’t restored after a battle.) A very economical systhem, you know.",
            "The Safari Zone doesn’t involve the minigame. Battles in the zone occur just as they do outside the zone. You’re given 30 Fren Balls and can use these in the zone, and you give them back after. You can find Fren Balls throughout the zone that can be used outside the zone. The zone contains several biomes which have their own encounter tables. It's a grand adventure, Vinnith!",
            "Weather that does chip damage will do damage based on their type’s resistance to the damage in question. Hail does Ice type damage. Sandstorm does Rock type damage. You must pay attention to the forecasth!",
            "Harvest has the chance of double procing, if the user consumes their harvested item and they still fulfill the requirements of Harvest. A bountiful harvesth indeed!",
            "If Vinemon are Asleep or Frozen, they’re 2.5x more likely to be caught. If Vinemon are affected by any other status, they’re 1.875x more likely to be caught. It's all about strategy, you underthtand.",
            "Critical Capture mechanics are now dependent on how many Vinemon the player has SEEN, as opposed to Vinemon the player has caught. Every encounter mattersth!",
            "The Vinegear is one of the more important mechanics in the game. You’ll be able to check your Vinedex, current Quests, access PC Storage (once you have the proper Dex Card), as well as any minigames and online features. A truly indispensable gadget, yesth!",
            "In Vinemon, we have Online Features! You can do Online Battling, Online Trading and even acquire Mystery Gifts! The wonders of modern technology, you thee.",
            "Pokemon Centers are now called 1UP Centers, and the Deli (PokeMarts) are now located inside. A one-stop shop for all your needsth!",
            "Walking into a 1UP Center now sets your respawn point after whiting out. No longer required to heal at a 1UP Center to do so. A very convenient change, wouldn't you say?",
            "The player always faces down after speaking to a nurse, to mitigate speaking to them again by accident after healing. A small but thoughtful detail, of courseth!",
            "Move Relearner/Deleter is now located in Vinny’s PC at 1UP Center and ScumSoft PCs. You never have to worry about a misplaced move again, no thir!",
            "TM’s have infinite uses. A tremendous value, you thee!",
            "Fishing doesn’t require additional input in order to hook a catch. It's a more relaxing experienth now.",
            "The Quest Log will allow you to keep track of where you are in the story as well as any other quests you may be on. Never get lost again, Vinnith!",
            "Implemented new Autosave functionality. Saves after all non-event wild battles, random trainer battle on routes, on entering and leaving 1-up centers, fly, escape rope, dig, gate houses, repel, dungeons, as well as prior to important lore areas when Autosave is enabled in options. You must protect your progreth!",
            "Can have up to 10 total save files. Plenty of room for experimentation, yesth!",
            "Most Routes have random chance-based weather. It keeps you on your toeth!",
            "Traded Vinemon will always obey the player in battle. A bond built on trussth.",
            "Traded Vinemon can be nicknamed. You must give them a name with character, Vinnith!",
            "Mystery Type moves have no resistances, but aren’t super effective against any type, either. A real wild card, you thee!",
            "Normal Type moves are Super Effective against Mystery Type Vinemon. An interesting wrinkle in the formula, wouldn't you say?",
            "Ice Type Vinemon have their Defense boosted in Hail. They thrive in the cold, yesth!",
            "The Battle UI will indicate if a move used on an opposing Vinemon will be effective or not, once you’ve seen them, based on their +, -, or = icon as well as color indication. Vinemon are considered seen when caught or defeated. It's a very informative systhem!",
            "Evolution Stones work in Battle. A dramatic turn of events, right in the heat of the moment, of courseth!",
            "EV reducing berries will reduce the EV in question by 4 each use. You must sculpt your Vinemon to perfection, yesth!",
            "EV increasing wings will increase the EV in question by 4 each use. For that extra little boossth.",
            "Vitamins increase the EV in question by 20 each use. Very expensivth... but effectivth!",
            "Modified berries that heal HP but cause confusion if it doesn't like the taste, to heal for the same HP constants as the modern games (was 1/8th of health, 1/4 if Ripen is active, and now heals for 1/3, or 2/3s if Ripen is active). A much-needed improvement, you underthtand.",
            "VineRadar (PokeRadar) doesn’t require a charge and chains can result in evolved Vinemon showing up if you beat up/catch their pre-evolutions. A fantastic way to hunt for rare spethimens!",
            "Ability Capsule: Allows the Vinemon to cycle between all their abilities (including Hidden Abilities.). The power of choice, in a capthule!",
            "Escape Rope is a Key Item. You'll never be without one again, no thir!",
            "The game will ask if you wish to use another Repel when the effects of the previous one run out, if you have any more Repels in your bag. A very considerate feature, yesth.",
            "Berserk Gene is able to be planted like any other berry. You can grow your own... power!",
            "Almost every Vinemon has their own unique signature move! It makes them all feel spethial.",
            "Custom moves, abilities, and items allow for each Vinemon to have their own unique fighting chance against one another. Come up with synergies with each to dominate the competition! The strategic possibilities are immenth, Vinnith!",
            "Sandstorm and Hail will do Rock and Ice-Type Damage, respectively. Like Sandstorm boosts Sp. Def with Rock-Types, so too does Hail boost Def for Ice-Types. A fascinating parallel, you thee.",
            "The first caught corruption of a species will save the unique sprite to the 'Fuzzy Pickles' Folder. You must see it to believe it, Vinnith!",
            "Every time you view the corruption the sprite will change to something different! It's never the same twithe!",
            "Within Vinemon we have many unique animations for the overworld. From HM Items to the Legendary Vinemon Interactions. It's a feasth for the eyeth, Vinnith!"
        ];
        let settings = {
            song: 1.0,
            click: 1.0,
            cry: 1.0,
            songMuted: false,
            clickMuted: false,
            cryMuted: false,
            trainerTipsEnabled: true
        };

        function saveSettings() {
            localStorage.setItem('vinemonViewerSettings', JSON.stringify(settings));
        }

        function loadSettings() {
            const saved = localStorage.getItem('vinemonViewerSettings');
            if (saved) {
                const savedSettings = JSON.parse(saved);
                settings = { ...settings, ...savedSettings };
            }
        }

        function applySettingsToUI() {
            songVolumeSlider.value = settings.song;
            clickVolumeSlider.value = settings.click;
            cryVolumeSlider.value = settings.cry;
            songMuteCheckbox.checked = settings.songMuted;
            clickMuteCheckbox.checked = settings.clickMuted;
            cryMuteCheckbox.checked = settings.cryMuted;
            trainerTipToggle.checked = settings.trainerTipsEnabled;
            updateAllGains();
        }

        function displayTrainerTip(index) {
            if (!settings.trainerTipsEnabled || !trainerTipContainer) return;
            
            // Clear any existing timers to prevent conflicts
            clearTimeout(initialTipTimer);
            clearInterval(tipCycleInterval);

            // If no index is provided, start from a random tip. Otherwise, use the given index.
            currentTipIndex = (index === undefined) ? Math.floor(Math.random() * trainerTips.length) : index;

            if (currentTipIndex >= trainerTips.length) currentTipIndex = 0;
            if (currentTipIndex < 0) currentTipIndex = trainerTips.length - 1;

            document.getElementById('trainerTipContent').textContent = trainerTips[currentTipIndex];
            trainerTipContainer.classList.add('visible');

            // Start the 20-second interval to cycle to the next tip
            tipCycleInterval = setInterval(() => {
                displayTrainerTip(currentTipIndex + 1);
            }, 20000); 
        }

        function hideAndDisableTips() {
            trainerTipContainer.classList.remove('visible');
            clearInterval(tipCycleInterval); // Stop the cycling
            clearTimeout(initialTipTimer); // Stop the initial timer just in case

            settings.trainerTipsEnabled = false;
            trainerTipToggle.checked = false;
            saveSettings();
        }

        function updateGain(gainNode, volume, isMuted) {
            if (gainNode) {
                gainNode.gain.value = isMuted ? 0 : volume;
            }
        }

        function updateAllGains() {
            updateGain(songGainNode, settings.song, settings.songMuted);
            updateGain(clickGainNode, settings.click, settings.clickMuted);
            updateGain(cryGainNode, settings.cry, settings.cryMuted);
            playCryBtn.disabled = settings.cryMuted;
        }

        function playSound(buffer, gainNode, rate = 1.0) {
            if (!audioContext || !buffer) return;
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.playbackRate.value = rate;
            source.connect(gainNode);
            source.start(0);
        }

        async function initAudioSystem() {
            try {
                audioContext = new(window.AudioContext || window.webkitAudioContext)();
                songGainNode = audioContext.createGain();
                clickGainNode = audioContext.createGain();
                cryGainNode = audioContext.createGain();

                songGainNode.connect(audioContext.destination);
                clickGainNode.connect(audioContext.destination);
                cryGainNode.connect(audioContext.destination);

                const [songResponse, clickResponse] = await Promise.all([fetch(audioFile), fetch(clickSoundFile)]);
                const [songArrayBuffer, clickArrayBuffer] = await Promise.all([songResponse.arrayBuffer(), clickResponse.arrayBuffer()]);
                [songBuffer, clickBuffer] = await Promise.all([audioContext.decodeAudioData(songArrayBuffer), audioContext.decodeAudioData(clickArrayBuffer)]);

                console.log('Audio system ready.');
                loadSettings();
                applySettingsToUI();

                // Set the initial timer if tips are enabled
                if (settings.trainerTipsEnabled) {
                   initialTipTimer = setTimeout(() => displayTrainerTip(), 30000); // 60 seconds
                }

            } catch (error) {
                console.error('Failed to initialize audio system:', error);
            }
        }
        
        // --- Event Listeners ---

        document.getElementById('closeTrainerTip').addEventListener('click', (e) => {
            e.stopPropagation();
            hideAndDisableTips();
        });

        document.getElementById('prevTip').addEventListener('click', (e) => {
            e.stopPropagation();
            displayTrainerTip(currentTipIndex - 1); // Go to previous tip
        });

        document.getElementById('nextTip').addEventListener('click', (e) => {
            e.stopPropagation();
            displayTrainerTip(currentTipIndex + 1); // Go to next tip
        });

        volumeBtn.addEventListener('click', () => {
            volumeModal.style.display = 'block';
        });
        volumeModal.querySelector('.close').addEventListener('click', () => {
            volumeModal.style.display = 'none';
        });
        window.addEventListener('click', (e) => {
            if (e.target == volumeModal) volumeModal.style.display = 'none';
        });

        songVolumeSlider.addEventListener('input', (e) => {
            settings.song = parseFloat(e.target.value);
            updateAllGains();
            saveSettings();
        });
        clickVolumeSlider.addEventListener('input', (e) => {
            settings.click = parseFloat(e.target.value);
            updateAllGains();
            saveSettings();
        });
        cryVolumeSlider.addEventListener('input', (e) => {
            settings.cry = parseFloat(e.target.value);
            updateAllGains();
            saveSettings();
        });
        songMuteCheckbox.addEventListener('change', (e) => {
            settings.songMuted = e.target.checked;
            updateAllGains();
            saveSettings();
        });
        clickMuteCheckbox.addEventListener('change', (e) => {
            settings.clickMuted = e.target.checked;
            updateAllGains();
            saveSettings();
        });
        cryMuteCheckbox.addEventListener('change', (e) => {
            settings.cryMuted = e.target.checked;
            updateAllGains();
            saveSettings();
        });

        trainerTipToggle.addEventListener('change', (e) => {
            settings.trainerTipsEnabled = e.target.checked;
            if (settings.trainerTipsEnabled) {
                // If re-enabled, show the tip immediately
                displayTrainerTip();
            } else {
                // If disabled, hide the tip and clear timers
                trainerTipContainer.classList.remove('visible');
                clearInterval(tipCycleInterval);
                clearTimeout(initialTipTimer);
            }
            saveSettings();
        });

        playCryBtn.addEventListener('click', async (event) => {
            event.stopPropagation();
            const currentId = document.getElementById("vinemonSelect").value;
            const isCorrupted = document.getElementById("corruptionToggle").checked;
            let pitch = 1.0;
            if (isCorrupted) {
                pitch = (100 - Math.floor(Math.random() * 66) + Math.floor(Math.random() * 6)) / 100.0;
            }
            const cryUrl = `https://alizarin.red/cries/${String(currentId).padStart(3, "0")}Cry.ogg`;
            try {
                const response = await fetch(cryUrl);
                const arrayBuffer = await response.arrayBuffer();
                cryBuffer = await audioContext.decodeAudioData(arrayBuffer);
                playSound(cryBuffer, cryGainNode, pitch);
            } catch (e) {
                console.error("Error playing cry:", e);
            }
        });

        document.body.addEventListener('click', (e) => {
            const target = e.target;
            const isInteractiveTag = target.closest('button, a, input, select, label, [onclick]');
            const hasPointerCursor = window.getComputedStyle(target).cursor === 'pointer';

            if (isInteractiveTag || hasPointerCursor) {
                playSound(clickBuffer, clickGainNode);
            }

            if (isMusicPlaying || !songBuffer) return;
            isMusicPlaying = true;
            if (audioContext.state === 'suspended') audioContext.resume();
            songGainNode.gain.setValueAtTime(0, audioContext.currentTime);
            songGainNode.gain.linearRampToValueAtTime(settings.songMuted ? 0 : settings.song, audioContext.currentTime + FADE_IN_DURATION);
            const songSourceNode = audioContext.createBufferSource();
            songSourceNode.buffer = songBuffer;
            songSourceNode.loop = true;
            songSourceNode.loopStart = LOOP_START_SAMPLE / songBuffer.sampleRate;
            songSourceNode.loopEnd = (LOOP_START_SAMPLE + LOOP_LENGTH_SAMPLE) / songBuffer.sampleRate;
            songSourceNode.connect(songGainNode);
            songSourceNode.start(0);

        }, true);
        if (viewEggBtn) {
            viewEggBtn.addEventListener('click', async () => {
                const currentId = document.getElementById('vinemonSelect').value;
                const spriteImg = document.getElementById('spriteImg');
                const animatedSpriteDiv = document.getElementById('animatedSpriteDiv');
                const hatchContainer = document.getElementById('hatchContainer');
                const hatchEggDiv = document.getElementById('hatchEggDiv');
                const hatchCrackDiv = document.getElementById('hatchCrackDiv');
                const hatchSpriteScaler = document.getElementById("hatchSpriteScaler");

                const activeSpriteElement = window.getComputedStyle(animatedSpriteDiv).display !== 'none' ?
                    animatedSpriteDiv :
                    spriteImg;

                if (isShowingEgg) {
                    viewEggBtn.disabled = true;
                    currentAnimationId++;
                    const thisAnimationRunId = currentAnimationId;
const onFlash = async () => {
    const hasFemaleSprite = await checkImageExists(`https://vinemon.link/vinemon/vinemon/female/${currentId}.png`);
    const formResult = determineRandomForm(currentId, hasFemaleSprite);

    shiny = formResult.shiny;
    corruption = formResult.corruption;
    female = formResult.female;

    document.getElementById("shinyToggle").checked = shiny;
    document.getElementById("corruptionToggle").checked = corruption;
    document.getElementById("genderToggle").checked = female;

    isShowingEgg = false;
    await updateSprite(currentId);

    hatchSpriteScaler.classList.remove('egg-wobble-3');
    hatchContainer.style.display = 'none';
    hatchContainer.style.opacity = 0;
    hatchContainer.style.pointerEvents = 'none';

    const newlyActiveSpriteElement = window.getComputedStyle(animatedSpriteDiv).display !== 'none' ?
        animatedSpriteDiv :
        spriteImg;

    newlyActiveSpriteElement.style.opacity = 1;


    hatchEggDiv.style.transform = '';
};

                    const animationSucceeded = await playHatchAnimation(currentId, onFlash, audioContext, playSound, cryGainNode, thisAnimationRunId);

                    if (thisAnimationRunId !== currentAnimationId) {
                        return;
                    }

                    if (!animationSucceeded) {
                        hatchContainer.style.display = 'none';
                        hatchContainer.style.opacity = 0;
                        activeSpriteElement.style.opacity = 1;
                        alert("This Vinemon's hatching animation assets are missing. It has been hatched instantly.");
                    }

                    viewEggBtn.textContent = 'View Egg';
                    viewEggBtn.disabled = false;

                } else {
                    isShowingEgg = true;
                    viewEggBtn.textContent = 'Hatch Egg';
                    activeSpriteElement.style.opacity = 0;
                    hatchContainer.style.display = 'flex';
                    hatchCrackDiv.style.opacity = 0;
                    hatchEggDiv.style.opacity = 1;
                    hatchEggDiv.style.transform = '';

                    const paddedId = String(currentId).padStart(3, "0");
                    const eggSpriteUrl = `https://vinemon.link/vinemon/vinemon/eggs/${paddedId}.png`;
                    const eggImg = new Image();
                    eggImg.onload = () => {
                        const eggWidth = eggImg.width;
                        const eggHeight = eggImg.height;
                        hatchEggDiv.style.width = `${eggWidth}px`;
                        hatchEggDiv.style.height = `${eggHeight}px`;
                        hatchSpriteScaler.style.width = `${eggWidth}px`;
                        hatchSpriteScaler.style.height = `${eggHeight}px`;
                        hatchEggDiv.style.backgroundImage = `url(${eggSpriteUrl})`;
                        hatchContainer.style.opacity = 1;
                        hatchContainer.style.pointerEvents = 'auto';
                    };
                    eggImg.onerror = () => {
                        alert("This Vinemon's egg sprite is missing.");
                        activeSpriteElement.style.opacity = 1;
                        isShowingEgg = false;
                        viewEggBtn.textContent = 'View Egg';
                    }
                    eggImg.src = eggSpriteUrl;
                }
            });
        }
        initAudioSystem();
    });