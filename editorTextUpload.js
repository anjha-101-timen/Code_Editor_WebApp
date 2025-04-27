document.addEventListener('DOMContentLoaded', function () {
    const editorTextUploadBtn = document.getElementById('editorTextUploadBtn');
    const editorElement = document.getElementById('editor');
    const aceEditor = ace.edit(editorElement);

    editorTextUploadBtn.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.abap, .abc, .as, .ada, .adb, .conf, .applescript, .adoc, .asciidoc, .asm, .s, .ahk, .bat, .cmd, .bro, .c, .cpp, .h, .hpp, .cc, .cxx, .cirru, .clj, .cljs, .cbl, .cob, .coffee, .cfm, .cs, .css, .curly, .d, .dart, .diff, .patch, Dockerfile, .dot, .drl, .e, .ejs, .ex, .exs, .elm, .erl, .hrl, .fth, .4th, .f, .for, .f90, .ftl, .gcode, .nc, .feature, .gitignore, .glsl, .vert, .frag, .go, .groovy, .haml, .hbs, .handlebars, .hs, .cabal, .hx, .html, .htm, .xhtml, .ini, .io, .jack, .jade, .pug, .java, .js, .jsx, .json, .jq, .jsp, .jl, .kt, .kts, .tex, .latex, .less, .liquid, .lisp, .lsp, .ls, .logic, .lsl, .lua, Makefile, makefile, .md, .markdown, .mask, .matlab, .mz, .mel, .mush, .sql, .nix, .nsi, .m, .mm, .ml, .mli, .pas, .pp, .pl, .pm, .php, .phtml, .php3, .php4, .php5, .phps, .txt, .pro, .properties, .proto, .py, .pyw, .r, .cshtml, .rdoc, .rhtml, .rb, .rs, .sass, .scad, .scala, .scm, .scss, .sh, .bash, .sjs, .tpl, .soy, .space, .rq, .sparql, .styl, .svg, .swift, .tcl, .textile, .toml, .tsx, .twig, .ts, .vala, .vbs, .vm, .v, .vh, .vhd, .vhdl, .wlk, .xml, .xslt, .xsl, .xq, .xquery, .yaml, .yml';

        input.onchange = function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    aceEditor.setValue(e.target.result);
                };
                reader.readAsText(file);
            }
        };

        input.click();
    });
});