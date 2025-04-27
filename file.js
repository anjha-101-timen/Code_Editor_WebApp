document.addEventListener('DOMContentLoaded', function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript"); // Default mode

    // Create a hidden file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // File input change event listener
    fileInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            editor.setValue(contents);

            // Detect mode based on file extension (basic example)
            if (file.name.endsWith('.py')) {
                editor.session.setMode("ace/mode/python");
            } else if (file.name.endsWith('.html')) {
                editor.session.setMode("ace/mode/html");
            } else if (file.name.endsWith('.css')) {
                editor.session.setMode("ace/mode/css");
            } else if (file.name.endsWith('.js')) {
                editor.session.setMode("ace/mode/javascript");
            } else {
                editor.session.setMode("ace/mode/text"); // Default to text mode
            }
        };
        reader.readAsText(file);
    });

    // File button click event listener
    const fileButton = document.getElementById('fileButton');
    if (fileButton) {
        fileButton.addEventListener('click', function() {
            fileInput.click(); // Trigger file input click
        });
    } else {
        console.error("fileButton not found.");
    }

    // Add event listeners for other top buttons (example: "Save")
    document.querySelector('.top-button[textContent="Save"]').addEventListener('click', function() {
        saveFile(editor.getValue(), "download.txt", "text/plain"); // Example save
    });

    // Example save function
    function saveFile(text, filename, type) {
        var a = document.createElement("a");
        var file = new Blob([text], {type: type});
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
    }

    // Example Run Function
    document.querySelector('.top-button[textContent="Run"]').addEventListener('click', function() {
        try {
            eval(editor.getValue()); // Be very careful with eval!
        } catch (e) {
            console.error("Error running code:", e);
        }
    });

    // Example Format Function
    document.querySelector('.top-button[textContent="Format"]').addEventListener('click', function() {
        editor.session.setValue(js_beautify(editor.getValue())); // Requires js-beautify library
    });
});

// Example js-beautify function.
function js_beautify(js_source_text, options) {
    if (typeof js_beautify === 'function') {
        return js_beautify(js_source_text, options);
    } else {
        console.error("js-beautify library not found. Please include it in your HTML.");
        return js_source_text;
    }
}



// // download.js

// downloadBtn.addEventListener('click', function() {
//     const content = editor.getValue();
//     const mode = editor.session.getMode().$id;
//     const languages = [
//         { mode: "ace/mode/abap", name: "ABAP", extension: "abap" },
//         { mode: "ace/mode/abc", name: "ABC", extension: "abc" },
//         { mode: "ace/mode/actionscript", name: "ActionScript", extension: "as" },
//         { mode: "ace/mode/ada", name: "ADA", extension: "ada" },
//         { mode: "ace/mode/apache_conf", name: "Apache Conf", extension: "conf" },
//         { mode: "ace/mode/applescript", name: "AppleScript", extension: "applescript" },
//         { mode: "ace/mode/asciidoc", name: "AsciiDoc", extension: "adoc" },
//         { mode: "ace/mode/assembly_x86", name: "Assembly x86", extension: "asm" },
//         { mode: "ace/mode/autohotkey", name: "AutoHotkey", extension: "ahk" },
//         { mode: "ace/mode/batchfile", name: "BatchFile", extension: "bat" },
//         { mode: "ace/mode/bro", name: "Bro", extension: "bro" },
//         { mode: "ace/mode/c9search", name: "C9Search", extension: "c9search" },
//         { mode: "ace/mode/c_cpp", name: "C/C++", extension: "cpp" },
//         { mode: "ace/mode/cirru", name: "Cirru", extension: "cirru" },
//         { mode: "ace/mode/clojure", name: "Clojure", extension: "clj" },
//         { mode: "ace/mode/cobol", name: "Cobol", extension: "cbl" },
//         { mode: "ace/mode/coffee", name: "CoffeeScript", extension: "coffee" },
//         { mode: "ace/mode/coldfusion", name: "ColdFusion", extension: "cfm" },
//         { mode: "ace/mode/csharp", name: "C#", extension: "cs" },
//         { mode: "ace/mode/css", name: "CSS", extension: "css" },
//         { mode: "ace/mode/curly", name: "Curly", extension: "curly" },
//         { mode: "ace/mode/d", name: "D", extension: "d" },
//         { mode: "ace/mode/dart", name: "Dart", extension: "dart" },
//         { mode: "ace/mode/diff", name: "Diff", extension: "diff" },
//         { mode: "ace/mode/django", name: "Django", extension: "djt" },
//         { mode: "ace/mode/dockerfile", name: "Dockerfile", extension: "dockerfile" },
//         { mode: "ace/mode/dot", name: "DOT", extension: "dot" },
//         { mode: "ace/mode/drools", name: "Drools", extension: "drl" },
//         { mode: "ace/mode/edifact", name: "EDIFACT", extension: "edi" },
//         { mode: "ace/mode/eiffel", name: "Eiffel", extension: "e" },
//         { mode: "ace/mode/ejs", name: "EJS", extension: "ejs" },
//         { mode: "ace/mode/elixir", name: "Elixir", extension: "ex" },
//         { mode: "ace/mode/elm", name: "Elm", extension: "elm" },
//         { mode: "ace/mode/erlang", name: "Erlang", extension: "erl" },
//         { mode: "ace/mode/forth", name: "Forth", extension: "frt" },
//         { mode: "ace/mode/fortran", name: "Fortran", extension: "f" },
//         { mode: "ace/mode/ftl", name: "FreeMarker", extension: "ftl" },
//         { mode: "ace/mode/gcode", name: "Gcode", extension: "gcode" },
//         { mode: "ace/mode/gherkin", name: "Gherkin", extension: "feature" },
//         { mode: "ace/mode/gitignore", name: "Gitignore", extension: "gitignore" },
//         { mode: "ace/mode/glsl", name: "GLSL", extension: "glsl" },
//         { mode: "ace/mode/golang", name: "Go", extension: "go" },
//         { mode: "ace/mode/groovy", name: "Groovy", extension: "groovy" },
//         { mode: "ace/mode/haml", name: "HAML", extension: "haml" },
//         { mode: "ace/mode/handlebars", name: "Handlebars", extension: "hbs" },
//         { mode: "ace/mode/haskell", name: "Haskell", extension: "hs" },
//         { mode: "ace/mode/haskell_cabal", name: "Haskell Cabal", extension: "cabal" },
//         { mode: "ace/mode/haxe", name: "Haxe", extension: "hx" },
//         { mode: "ace/mode/html", name: "HTML", extension: "html" },
//         { mode: "ace/mode/ini", name: "INI", extension: "ini" },
//         { mode: "ace/mode/io", name: "Io", extension: "io" },
//         { mode: "ace/mode/jack", name: "Jack", extension: "jack" },
//         { mode: "ace/mode/jade", name: "Jade", extension: "jade" },
//         { mode: "ace/mode/java", name: "Java", extension: "java" },
//         { mode: "ace/mode/javascript", name: "JavaScript", extension: "js" },
//         { mode: "ace/mode/json", name: "JSON", extension: "json" },
//         { mode: "ace/mode/jsoniq", name: "JSONiq", extension: "jq" },
//         { mode: "ace/mode/jsp", name: "JSP", extension: "jsp" },
//         { mode: "ace/mode/jsx", name: "JSX", extension: "jsx" },
//         { mode: "ace/mode/julia", name: "Julia", extension: "jl" },
//         { mode: "ace/mode/kotlin", name: "Kotlin", extension: "kt" },
//         { mode: "ace/mode/latex", name: "LaTeX", extension: "tex" },
//         { mode: "ace/mode/less", name: "LESS", extension: "less" },
//         { mode: "ace/mode/liquid", name: "Liquid", extension: "liquid" },
//         { mode: "ace/mode/lisp", name: "Lisp", extension: "lisp" },
//         { mode: "ace/mode/livescript", name: "LiveScript", extension: "ls" },
//         { mode: "ace/mode/logiql", name: "LogiQL", extension: "logic" },
//         { mode: "ace/mode/lsl", name: "LSL", extension: "lsl" },
//         { mode: "ace/mode/lua", name: "Lua", extension: "lua" },
//         { mode: "ace/mode/lucene", name: "Lucene", extension: "lucene" },
//         { mode: "ace/mode/makefile", name: "Makefile", extension: "makefile" },
//         { mode: "ace/mode/markdown", name: "Markdown", extension: "md" },
//         { mode: "ace/mode/mask", name: "Mask", extension: "mask" },
//         { mode: "ace/mode/matlab", name: "MATLAB", extension: "matlab" },
//         { mode: "ace/mode/maze", name: "Maze", extension: "maze" },
//         { mode: "ace/mode/mel", name: "MEL", extension: "mel" },
//         { mode: "ace/mode/mipsassembler", name: "MIPS Assembler", extension: "asm" },
//         { mode: "ace/mode/mipsassembler_nicotine", name: "MIPS Assembler Nicotine", extension: "asm" },
//         { mode: "ace/mode/mushcode", name: "MUSHCode", extension: "mush" },
//         { mode: "ace/mode/mysql", name: "MySQL", extension: "sql" },
//         { mode: "ace/mode/nix", name: "Nix", extension: "nix" },
//         { mode: "ace/mode/nsis", name: "NSIS", extension: "nsi" },
//         { mode: "ace/mode/objectivec", name: "Objective-C", extension: "m" },
//         { mode: "ace/mode/ocaml", name: "OCaml", extension: "ml" },
//         { mode: "ace/mode/pascal", name: "Pascal", extension: "pas" },
//         { mode: "ace/mode/perl", name: "Perl", extension: "pl" },
//         { mode: "ace/mode/pgsql", name: "pgSQL", extension: "sql" },
//         { mode: "ace/mode/php", name: "PHP", extension: "php" },
//         { mode: "ace/mode/plain_text", name: "Plain Text", extension: "txt" },
//         { mode: "ace/mode/praetex", name: "PraeTeX", extension: "tex" },
//         { mode: "ace/mode/prolog", name: "Prolog", extension: "pl" },
//         { mode: "ace/mode/properties", name: "Properties", extension: "properties" },
//         { mode: "ace/mode/protobuf", name: "Protobuf", extension: "proto" },
//         { mode: "ace/mode/python", name: "Python", extension: "py" },
//         { mode: "ace/mode/r", name: "R", extension: "r" },
//         { mode: "ace/mode/razor", name: "Razor", extension: "cshtml" },
//         { mode: "ace/mode/rdoc", name: "RDoc", extension: "rdoc" },
//         { mode: "ace/mode/rhtml", name: "RHTML", extension: "rhtml" },
//         { mode: "ace/mode/ruby", name: "Ruby", extension: "rb" },
//         { mode: "ace/mode/rust", name: "Rust", extension: "rs" },
//         { mode: "ace/mode/sass", name: "SASS", extension: "sass" },
//         { mode: "ace/mode/scad", name: "SCAD", extension: "scad" },
//         { mode: "ace/mode/scala", name: "Scala", extension: "scala" },
//         { mode: "ace/mode/scheme", name: "Scheme", extension: "scm" },
//         { mode: "ace/mode/scss", name: "SCSS", extension: "scss" },
//         { mode: "ace/mode/sh", name: "SH", extension: "sh" },
//         { mode: "ace/mode/sjs", name: "SJS", extension: "sjs" },
//         { mode: "ace/mode/smarty", name: "Smarty", extension: "tpl" },
//         { mode: "ace/mode/snippets", name: "snippets", extension: "snippets" },
//         { mode: "ace/mode/soy_template", name: "Soy Template", extension: "soy" },
//         { mode: "ace/mode/space", name: "Space", extension: "space" },
//         { mode: "ace/mode/sparql", name: "SPARQL", extension: "sparql" },
//         { mode: "ace/mode/sql", name: "SQL", extension: "sql" },
//         { mode: "ace/mode/sqlserver", name: "SQLServer", extension: "sql" },
//         { mode: "ace/mode/stylus", name: "Stylus", extension: "styl" },
//         { mode: "ace/mode/svg", name: "SVG", extension: "svg" },
//         { mode: "ace/mode/swift", name: "Swift", extension: "swift" },
//         { mode: "ace/mode/tcl", name: "Tcl", extension: "tcl" },
//         { mode: "ace/mode/tex", name: "Tex", extension: "tex" },
//         { mode: "ace/mode/text", name: "Text", extension: "txt" },
//         { mode: "ace/mode/textile", name: "Textile", extension: "textile" },
//         { mode: "ace/mode/toml", name: "TOML", extension: "toml" },
//         { mode: "ace/mode/tsx", name: "TSX", extension: "tsx" },
//         { mode: "ace/mode/twig", name: "Twig", extension: "twig" },
//         { mode: "ace/mode/typescript", name: "Typescript", extension: "ts" },
//         { mode: "ace/mode/vala", name: "Vala", extension: "vala" },
//         { mode: "ace/mode/vbscript", name: "VBScript", extension: "vbs" },
//         { mode: "ace/mode/velocity", name: "Velocity", extension: "vm" },
//         { mode: "ace/mode/verilog", name: "Verilog", extension: "v" },
//         { mode: "ace/mode/vhdl", name: "VHDL", extension: "vhd" },
//         { mode: "ace/mode/wollok", name: "Wollok", extension: "wlk" },
//         { mode: "ace/mode/xml", name: "XML", extension: "xml" },
//         { mode: "ace/mode/xquery", name: "XQuery", extension: "xq" },
//         { mode: "ace/mode/yaml", name: "YAML", extension: "yaml" }
//     ];

//     const lang = languages.find(l => l.mode === mode);
//     const extension = lang ? lang.extension : "txt"; // Default to txt if mode not found
//     const filename = "code." + extension;

//     const element = document.createElement('a');
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
//     element.setAttribute('download', filename);
//     element.style.display = 'none';
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
// });


document.addEventListener('DOMContentLoaded', function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");

    // Load mode from localStorage if available
    var savedMode = localStorage.getItem('aceMode');
    if (savedMode) {
        editor.session.setMode({ path: savedMode, v: 1 });
    }

    editor.setValue("#include <iostream>\nusing namespace std;\n\nint main ()\n{\n    return 0;\n}");

    const downloadBtn = document.getElementById('downloadBtn'); // Get the download button

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadCode(editor, setupLanguageButton.currentExtension()); // Call downloadCode with editor and extension
        });
    } else {
        console.error("downloadBtn not found.");
    }

    setupLanguageButton(editor); // Initialize language button functionality
});