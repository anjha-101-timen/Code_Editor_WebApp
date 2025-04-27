/**
 * editorFontBtn.js
 */
document.addEventListener('DOMContentLoaded', function () {
    const editorFontBtn = document.getElementById('editorFontBtn');
    const editorTextArea = document.getElementById('editor');

    let savedEditorFont = localStorage.getItem('editorTextAreaFont') || "'Ubuntu', monospace";
    editorTextArea.style.fontFamily = savedEditorFont;

    function createFontModal(textArea, savedFont, storageKey) {
        textArea.style.filter = 'blur(5px)';

        const modalOverlay = document.createElement('div');
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modalOverlay.style.zIndex = '1002';
        document.body.appendChild(modalOverlay);

        const fontModal = document.createElement('div');
        fontModal.classList.add('font-modal');
        fontModal.style.position = 'absolute';
        fontModal.style.backgroundColor = '#ffffff';
        fontModal.style.padding = '20px';
        fontModal.style.borderRadius = '8px';
        fontModal.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
        fontModal.style.zIndex = '1003';

        const textAreaRect = textArea.getBoundingClientRect();
        fontModal.style.top = `${textAreaRect.top + window.scrollY + textAreaRect.height / 2}px`;
        fontModal.style.left = `${textAreaRect.left + window.scrollX + textAreaRect.width / 2}px`;
        fontModal.style.transform = 'translate(-50%, -50%)';

        modalOverlay.appendChild(fontModal);

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search fonts...';
        searchInput.style.width = 'calc(100% - 22px)';
        searchInput.style.padding = '10px';
        searchInput.style.borderRadius = '4px';
        searchInput.style.border = '1px solid #ccc';
        searchInput.style.marginBottom = '10px';
        fontModal.appendChild(searchInput);

        const fontSelect = document.createElement('select');
        fontSelect.style.width = '100%';
        fontSelect.style.padding = '10px';
        fontSelect.style.borderRadius = '4px';
        fontSelect.style.border = '1px solid #ccc';
        fontSelect.style.background = '#ffffff';
        fontSelect.style.color = '#333';
        fontSelect.style.fontSize = '1em';
        fontSelect.style.overflowY = 'auto';
        fontSelect.style.maxHeight = '200px';

        const googleFonts = [
            { name: 'Roboto', family: "'Roboto', sans-serif" },
            { name: 'Open Sans', family: "'Open Sans', sans-serif" },
            { name: 'Lato', family: "'Lato', sans-serif" },
            { name: 'Montserrat', family: "'Montserrat', sans-serif" },
            { name: 'Raleway', family: "'Raleway', sans-serif" },
            { name: 'Poppins', family: "'Poppins', sans-serif" },
            { name: 'Noto Sans', family: "'Noto Sans', sans-serif" },
            { name: 'Source Sans Pro', family: "'Source Sans Pro', sans-serif" },
            { name: 'Oswald', family: "'Oswald', sans-serif" },
            { name: 'Merriweather', family: "'Merriweather', serif" },
            { name: 'PT Sans', family: "'PT Sans', sans-serif" },
            { name: 'Roboto Condensed', family: "'Roboto Condensed', sans-serif" },
            { name: 'Ubuntu', family: "'Ubuntu', sans-serif" },
            { name: 'Slabo 27px', family: "'Slabo 27px', serif" },
            { name: 'Lora', family: "'Lora', serif" },
            { name: 'Playfair Display', family: "'Playfair Display', serif" },
            { name: 'Arimo', family: "'Arimo', sans-serif" },
            { name: 'Nunito', family: "'Nunito', sans-serif" },
            { name: 'PT Serif', family: "'PT Serif', serif" },
            { name: 'Fira Sans', family: "'Fira Sans', sans-serif" },
            { name: 'Titillium Web', family: "'Titillium Web', sans-serif" },
            { name: 'Work Sans', family: "'Work Sans', sans-serif" },
            { name: 'Crimson Text', family: "'Crimson Text', serif" },
            { name: 'Inter', family: "'Inter', sans-serif" },
            { name: 'Mukta', family: "'Mukta', sans-serif" },
            { name: 'Exo 2', family: "'Exo 2', sans-serif" },
            { name: 'Dosis', family: "'Dosis', sans-serif" },
            { name: 'Libre Baskerville', family: "'Libre Baskerville', serif" },
            { name: 'Caveat', family: "'Caveat', cursive" },
            { name: 'Pacifico', family: "'Pacifico', cursive" },
            { name: 'Lobster', family: "'Lobster', cursive" },
            { name: 'Bebas Neue', family: "'Bebas Neue', sans-serif" },
            { name: 'Anton', family: "'Anton', sans-serif" },
            { name: 'Dancing Script', family: "'Dancing Script', cursive" },
            { name: 'Comfortaa', family: "'Comfortaa', cursive" },
            { name: 'Bitter', family: "'Bitter', serif" },
            { name: 'Indie Flower', family: "'Indie Flower', cursive" },
            { name: 'Shadows Into Light', family: "'Shadows Into Light', cursive" },
            { name: 'Amatic SC', family: "'Amatic SC', cursive" },
            { name: 'Righteous', family: "'Righteous', cursive" },
            { name: 'Abril Fatface', family: "'Abril Fatface', display" },
            { name: 'Cinzel', family: "'Cinzel', serif" },
            { name: 'Old Standard TT', family: "'Old Standard TT', serif" },
            { name: 'Domine', family: "'Domine', serif" },
            { name: 'Josefin Sans', family: "'Josefin Sans', sans-serif" },
            { name: 'Varela Round', family: "'Varela Round', sans-serif" },
            { name: 'Quicksand', family: "'Quicksand', sans-serif" },
            { name: 'Signika', family: "'Signika', sans-serif" },
            { name: 'Prompt', family: "'Prompt', sans-serif" },
            { name: 'Archivo', family: "'Archivo', sans-serif" },
            { name: 'Fjalla One', family: "'Fjalla One', sans-serif" },
            { name: 'Kanit', family: "'Kanit', sans-serif" },
            { name: 'Muli', family: "'Muli', sans-serif" },
            { name: 'Barlow', family: "'Barlow', sans-serif" },
            { name: 'Alegreya', family: "'Alegreya', serif" },
            { name: 'Rokkitt', family: "'Rokkitt', serif" },
            { name: 'Courier Prime', family: "'Courier Prime', monospace" },
            { name: 'Inconsolata', family: "'Inconsolata', monospace" },
            { name: 'Space Mono', family: "'Space Mono', monospace" },
            { name: 'VT323', family: "'VT323', monospace" },
            { name: 'Oxygen', family: "'Oxygen', sans-serif" },
            { name: 'Play', family: "'Play', sans-serif" },
            { name: 'Asap', family: "'Asap', sans-serif" },
            { name: 'Hind', family: "'Hind', sans-serif" },
            { name: 'Average', family: "'Average', serif" },
            { name: 'Anonymous Pro', family: "'Anonymous Pro', monospace" },
            { name: 'Karla', family: "'Karla', sans-serif" },
            { name: 'Archivo Narrow', family: "'Archivo Narrow', sans-serif" },
            { name: 'Catamaran', family: "'Catamaran', sans-serif" },
            { name: 'Exo', family: "'Exo', sans-serif" },
            { name: 'News Cycle', family: "'News Cycle', sans-serif" },
            { name: 'Rajdhani', family: "'Rajdhani', sans-serif" },
            { name: 'Scope One', family: "'Scope One', serif" },
            { name: 'Spectral', family: "'Spectral', serif" },
            { name: 'Tinos', family: "'Tinos', serif" },
            { name: 'Yanone Kaffeesatz', family: "'Yanone Kaffeesatz', sans-serif" },
            { name: 'Abel', family: "'Abel', sans-serif" },
            { name: 'Acme', family: "'Acme', sans-serif" },
            { name: 'Assistant', family: "'Assistant', sans-serif" },
            { name: 'Cabin', family: "'Cabin', sans-serif" },
            { name: 'Chivo', family: "'Chivo', sans-serif" },
            { name: 'Cormorant Garamond', family: "'Cormorant Garamond', serif" },
            { name: 'Cuprum', family: "'Cuprum', sans-serif" },
            { name: 'Didact Gothic', family: "'Didact Gothic', sans-serif" },
            { name: 'EB Garamond', family: "'EB Garamond', serif" },
            { name: 'Francois One', family: "'Francois One', sans-serif" },
            { name: 'Heebo', family: "'Heebo', sans-serif" },
            { name: 'IBM Plex Sans', family: "'IBM Plex Sans', sans-serif" },
            { name: 'Josefin Slab', family: "'Josefin Slab', serif" },
            { name: 'Julius Sans One', family: "'Julius Sans One', sans-serif" },
            { name: 'Kalam', family: "'Kalam', cursive" },
            { name: 'Krona One', family: "'Krona One', sans-serif" },
            { name: 'League Spartan', family: "'League Spartan', sans-serif" },
            { name: 'Libre Franklin', family: "'Libre Franklin', sans-serif" },
            { name: 'Luckiest Guy', family: "'Luckiest Guy', display" },
            { name: 'Manrope', family: "'Manrope', sans-serif" },
            { name: 'Maven Pro', family: "'Maven Pro', sans-serif" },
            { name: 'Montserrat Alternates', family: "'Montserrat Alternates', sans-serif" },
            { name: 'Niramit', family: "'Niramit', sans-serif" },
            { name: 'Nunito Sans', family: "'Nunito Sans', sans-serif" },
            { name: 'Pathway Gothic One', family: "'Pathway Gothic One', sans-serif" },
            { name: 'Playball', family: "'Playball', cursive" },
            { name: 'Prata', family: "'Prata', serif" },
            { name: 'Prompt', family: "'Prompt', sans-serif" },
            { name: 'Questrial', family: "'Questrial', sans-serif" },
            { name: 'Quattrocento', family: "'Quattrocento', serif" },
            { name: 'Rajdhani', family: "'Rajdhani', sans-serif" },
            { name: 'Ramabhadra', family: "'Ramabhadra', sans-serif" },
            { name: 'Rambla', family: "'Rambla', sans-serif" },
            { name: 'Red Hat Display', family: "'Red Hat Display', sans-serif" },
            { name: 'Red Hat Text', family: "'Red Hat Text', sans-serif" },
            { name: 'Reem Kufi', family: "'Reem Kufi', sans-serif" },
            { name: 'Roboto Mono', family: "'Roboto Mono', monospace" },
            { name: 'Rubik', family: "'Rubik', sans-serif" },
            { name: 'Sacramento', family: "'Sacramento', cursive" },
            { name: 'Satisfy', family: "'Satisfy', cursive" },
            { name: 'Secular One', family: "'Secular One', sans-serif" },
            { name: 'Shadows Into Light Two', family: "'Shadows Into Light Two', cursive" },
            { name: 'Shrikhand', family: "'Shrikhand', display" },
            { name: 'Sigmar One', family: "'Sigmar One', display" },
            { name: 'Slabo 13px', family: "'Slabo 13px', serif" },
            { name: 'Source Code Pro', family: "'Source Code Pro', monospace" },
            { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif" },
            { name: 'Spinnaker', family: "'Spinnaker', sans-serif" },
            { name: 'Staatliches', family: "'Staatliches', display" },
            { name: 'Syncopate', family: "'Syncopate', sans-serif" },
            { name: 'Teko', family: "'Teko', sans-serif" },
            { name: 'Text Me One', family: "'Text Me One', sans-serif" },
            { name: 'Timmana', family: "'Timmana', sans-serif" },
            { name: 'Trirong', family: "'Trirong', serif" },
            { name: 'Ubuntu Condensed', family: "'Ubuntu Condensed', sans-serif" },
            { name: 'Ultra', family: "'Ultra', serif" },
            { name: 'Unica One', family: "'Unica One', display" },
            { name: 'Vidaloka', family: "'Vidaloka', serif" },
            { name: 'Vollkorn', family: "'Vollkorn', serif" },
            { name: 'Wallpoet', family: "'Wallpoet', display" },
            { name: 'Wellfleet', family: "'Wellfleet', display" },
            { name: 'Yantramanav', family: "'Yantramanav', sans-serif" },
            { name: 'Yeseva One', family: "'Yeseva One', display" },
            { name: 'Zilla Slab', family: "'Zilla Slab', serif" },
            { name: 'Zilla Slab Highlight', family: "'Zilla Slab Highlight', display" },
            { name: 'Anybody', family: "'Anybody', display" },
            { name: 'Archivo Black', family: "'Archivo Black', display" },
            { name: 'Assistant', family: "'Assistant', sans-serif" },
            { name: 'Barlow Condensed', family: "'Barlow Condensed', sans-serif" },
            { name: 'BioRhyme', family: "'BioRhyme', serif" },
            { name: 'Cairo', family: "'Cairo', sans-serif" },
            { name: 'Carter One', family: "'Carter One', display" },
            { name: 'Commissioner', family: "'Commissioner', sans-serif" },
            { name: 'Cousine', family: "'Cousine', monospace" },
            { name: 'DM Sans', family: "'DM Sans', sans-serif" },
            { name: 'Expletus Sans', family: "'Expletus Sans', display" },
            { name: 'Grenze Gotisch', family: "'Grenze Gotisch', display" },
            { name: 'Gupter', family: "'Gupter', serif" },
            { name: 'IBM Plex Mono', family: "'IBM Plex Mono', monospace" },
            { name: 'JetBrains Mono', family: "'JetBrains Mono', monospace" },
            { name: 'Kumbh Sans', family: "'Kumbh Sans', sans-serif" },
            { name: 'Lexend Deca', family: "'Lexend Deca', sans-serif" },
            { name: 'Lilita One', family: "'Lilita One', display" },
            { name: 'Major Mono Display', family: "'Major Mono Display', monospace" },
            { name: 'Martel Sans', family: "'Martel Sans', sans-serif" },
            { name: 'Noto Serif', family: "'Noto Serif', serif" },
            { name: 'Overpass', family: "'Overpass', sans-serif" },
            { name: 'Passion One', family: "'Passion One', display" },
            { name: 'Playfair Display SC', family: "'Playfair Display SC', serif" },
            { name: 'PT Mono', family: "'PT Mono', monospace" },
            { name: 'Public Sans', family: "'Public Sans', sans-serif" },
            { name: 'Roboto Slab', family: "'Roboto Slab', serif" },
            { name: 'Rubik Mono One', family: "'Rubik Mono One', monospace" },
            { name: 'Spectral SC', family: "'Spectral SC', serif" },
            { name: 'Syne', family: "'Syne', display" },
            { name: 'Unbounded', family: "'Unbounded', display" },
            { name: 'Urbanist', family: "'Urbanist', sans-serif" },
            { name: 'Ysabeau', family: "'Ysabeau', serif" },
            { name: 'Zen Antique', family: "'Zen Antique', serif" },
            { name: 'Zen Kurenaido', family: "'Zen Kurenaido', sans-serif" },
        ];

        function populateFontSelect(fonts) {
            fontSelect.innerHTML = '';
            fonts.forEach(font => {
                const option = document.createElement('option');
                option.value = font.family;
                option.textContent = font.name;
                option.style.fontFamily = font.family;
                option.style.height = '30px';
                option.style.lineHeight = '30px';
                fontSelect.appendChild(option);
            });
            fontSelect.value = savedFont;
        }

        populateFontSelect(googleFonts.sort((a, b) => a.name.localeCompare(b.name)));

        fontSelect.value = savedFont;

        fontModal.appendChild(fontSelect);

        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredFonts = googleFonts.filter(font =>
                font.name.toLowerCase().includes(searchTerm)
            ).sort((a, b) => a.name.localeCompare(b.name));
            populateFontSelect(filteredFonts);
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'flex-end';
        buttonContainer.style.marginTop = '10px';
        fontModal.appendChild(buttonContainer);

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.style.backgroundColor = '#4CAF50';
        okButton.style.color = 'white';
        okButton.style.padding = '8px 12px';
        okButton.style.border = 'none';
        okButton.style.borderRadius = '4px';
        okButton.style.marginRight = '10px';
        okButton.style.cursor = 'pointer';
        buttonContainer.appendChild(okButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.backgroundColor = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.padding = '8px 12px';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        buttonContainer.appendChild(cancelButton);

        okButton.addEventListener('click', function () {
            const selectedFont = fontSelect.value;
            textArea.style.fontFamily = selectedFont;
            localStorage.setItem(storageKey, selectedFont);
            document.body.removeChild(modalOverlay);
            textArea.style.filter = 'none';
        });

        cancelButton.addEventListener('click', function () {
            document.body.removeChild(modalOverlay);
            textArea.style.filter = 'none';
        });

        modalOverlay.addEventListener('click', function (event) {
            if (event.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
                textArea.style.filter = 'none';
            }
        });
    }

    editorFontBtn.addEventListener('click', function () {
        createFontModal(editorTextArea, savedEditorFont, 'editorTextAreaFont');
    });
});
