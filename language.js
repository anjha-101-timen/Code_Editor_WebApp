document.addEventListener('DOMContentLoaded', function () {
    const editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");

    // Load mode from localStorage if available
    const savedMode = localStorage.getItem('aceMode');
    if (savedMode) {
        editor.session.setMode({ path: savedMode, v: 1 });
    }

    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) {
        languageBtn.addEventListener('click', function () {
            showLanguageMenu();
        });
    } else {
        console.error("languageBtn not found.");
    }

    // Define basic code templates for supported languages
    const languageTemplates = {
        "ace/mode/abap": `REPORT zhello_world.
    WRITE: 'Hello, World!'.`,
        "ace/mode/abc": `// ABC does not have a standardized syntax for "Hello, World!"`,
        "ace/mode/actionscript": `trace("Hello, World!");`,
        "ace/mode/ada": `with Ada.Text_IO; use Ada.Text_IO;
    procedure Hello_World is
    begin
       Put_Line("Hello, World!");
    end Hello_World;`,
        "ace/mode/apache_conf": `# Apache configuration files do not support "Hello, World!" directly.`,
        "ace/mode/applescript": `display dialog "Hello, World!"`,
        "ace/mode/asciidoc": `= Hello, World!
    This is a simple AsciiDoc document.`,
        "ace/mode/assembly_x86": `section .data
        hello db 'Hello, World!', 0xA
        len equ $ - hello
    
    section .text
        global _start
    
    _start:
        mov eax, 4
        mov ebx, 1
        mov ecx, hello
        mov edx, len
        int 0x80
    
        mov eax, 1
        xor ebx, ebx
        int 0x80`,
        "ace/mode/autohotkey": `MsgBox, Hello, World!`,
        "ace/mode/batchfile": `@echo off
    echo Hello, World!`,
        "ace/mode/bro": `print "Hello, World!";`,
        "ace/mode/c9search": `// C9Search is not a programming language.`,
        "ace/mode/c_cpp": `#include <iostream>
    using namespace std;
    
    int main() {
        cout << "Hello, World!" << endl;
        return 0;
    }`,
        "ace/mode/cirru": `// Cirru syntax is minimal and lacks standard output functionality.`,
        "ace/mode/clojure": `(println "Hello, World!")`,
        "ace/mode/cobol": `IDENTIFICATION DIVISION.
    PROGRAM-ID. HELLO-WORLD.
    PROCEDURE DIVISION.
        DISPLAY 'Hello, World!'.
        STOP RUN.`,
        "ace/mode/coffee": `console.log "Hello, World!"`,
        "ace/mode/coldfusion": `<cfoutput>Hello, World!</cfoutput>`,
        "ace/mode/csharp": `using System;
    
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Hello, World!");
        }
    }`,
        "ace/mode/css": `body {
        background-color: lightblue;
    }`,
        "ace/mode/curly": `// Curly syntax does not support "Hello, World!" directly.`,
        "ace/mode/d": `import std.stdio;
    
    void main() {
        writeln("Hello, World!");
    }`,
        "ace/mode/dart": `void main() {
      print('Hello, World!');
    }`,
        "ace/mode/diff": `// Diff files do not support "Hello, World!" directly.`,
        "ace/mode/django": `{% comment %} Django templates do not support direct output without a view. {% endcomment %}
    Hello, World!`,
        "ace/mode/dockerfile": `# Dockerfiles do not support "Hello, World!" directly.`,
        "ace/mode/dot": `// DOT language is used for graph visualization, not "Hello, World!".`,
        "ace/mode/drools": `// Drools rules do not support "Hello, World!" directly.`,
        "ace/mode/edifact": `// EDIFACT is a data interchange format, not a programming language.`,
        "ace/mode/eiffel": `class HELLO_WORLD
    create
        make
    feature
        make
            do
                print ("Hello, World!%N")
            end
    end`,
        "ace/mode/ejs": `<%= "Hello, World!" %>`,
        "ace/mode/elixir": `IO.puts "Hello, World!"`,
        "ace/mode/elm": `import Html exposing (text)
    
    main =
        text "Hello, World!"`,
        "ace/mode/erlang": `-module(hello).
    -export([start/0]).
    
    start() ->
        io:format("Hello, World!~n").`,
        "ace/mode/forth": `: HELLO  ." Hello, World!" CR ;
    HELLO`,
        "ace/mode/fortran": `program hello
        print *, "Hello, World!"
    end program hello`,
        "ace/mode/ftl": `<#-- FreeMarker templates require a context to render output -->
    Hello, World!`,
        "ace/mode/gcode": `// G-code is used for CNC machines, not "Hello, World!".`,
        "ace/mode/gherkin": `Feature: Hello World
      Scenario: Print Hello World
        Given I have a console
        When I run the program
        Then it should print "Hello, World!"`,
        "ace/mode/gitignore": `# Gitignore files do not support "Hello, World!" directly.`,
        "ace/mode/glsl": `// GLSL shaders are used for graphics rendering, not "Hello, World!".`,
        "ace/mode/golang": `package main
    import "fmt"
    
    func main() {
        fmt.Println("Hello, World!")
    }`,
        "ace/mode/groovy": `println "Hello, World!"`,
        "ace/mode/haml": `%p Hello, World!`,
        "ace/mode/handlebars": `{{!-- Handlebars templates require a context to render output --}}
    Hello, World!`,
        "ace/mode/haskell": `main :: IO ()
    main = putStrLn "Hello, World!"`,
        "ace/mode/haskell_cabal": `-- Cabal files do not support "Hello, World!" directly.`,
        "ace/mode/haxe": `class HelloWorld {
        static function main() {
            trace("Hello, World!");
        }
    }`,
        "ace/mode/html": `<!DOCTYPE html>
    <html>
    <head>
        <title>Hello, World!</title>
    </head>
    <body>
        <h1>Hello, World!</h1>
    </body>
    </html>`,
        "ace/mode/ini": `; INI files do not support "Hello, World!" directly.`,
        "ace/mode/io": `writeln("Hello, World!")`,
        "ace/mode/jack": `// Jack language is used for educational purposes, not "Hello, World!".`,
        "ace/mode/jade": `//- Jade/Pug templates require a context to render output
    p Hello, World!`,
        "ace/mode/java": `public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }`,
        "ace/mode/javascript": `console.log("Hello, World!");`,
        "ace/mode/json": `{
      "message": "Hello, World!"
    }`,
        "ace/mode/jsoniq": `// JSONiq is a query language for JSON, not "Hello, World!" directly.`,
        "ace/mode/jsp": `<%@ page contentType="text/html" %>
    <html>
    <body>
        <h1>Hello, World!</h1>
    </body>
    </html>`,
        "ace/mode/jsx": `const element = <h1>Hello, World!</h1>;
    ReactDOM.render(element, document.getElementById('root'));`,
        "ace/mode/julia": `println("Hello, World!")`,
        "ace/mode/kotlin": `fun main() {
        println("Hello, World!")
    }`,
        "ace/mode/latex": `\documentclass{article}
    \begin{document}
    Hello, World!
    \end{document}`,
        "ace/mode/less": `body {
        background-color: lightblue;
    }`,
        "ace/mode/liquid": `{% comment %} Liquid templates require a context to render output {% endcomment %}
    Hello, World!`,
        "ace/mode/lisp": `(print "Hello, World!")`,
        "ace/mode/livescript": `console.log "Hello, World!"`,
        "ace/mode/logiql": `// LogiQL is a query language, not "Hello, World!" directly.`,
        "ace/mode/lsl": `default {
        state_entry() {
            llSay(0, "Hello, World!");
        }
    }`,
        "ace/mode/lua": `print("Hello, World!")`,
        "ace/mode/lucene": `// Lucene is a search library, not a programming language.`,
        "ace/mode/makefile": `# Makefiles do not support "Hello, World!" directly.`,
        "ace/mode/markdown": `# Hello, World!
    This is a simple Markdown document.`,
        "ace/mode/mask": `// Mask syntax is minimal and lacks standard output functionality.`,
        "ace/mode/matlab": `disp('Hello, World!')`,
        "ace/mode/maze": `// Maze is not a programming language.`,
        "ace/mode/mel": `print "Hello, World!\\n";`,
        "ace/mode/mipsassembler": `.data
    hello: .asciiz "Hello, World!"
    
    .text
    .globl main
    
    main:
        li $v0, 4
        la $a0, hello
        syscall
    
        li $v0, 10
        syscall`,
        "ace/mode/mipsassembler_nicotine": `// MIPS Assembler Nicotine is not a programming language.`,
        "ace/mode/mushcode": `@pemit me=Hello, World!`,
        "ace/mode/mysql": `SELECT 'Hello, World!' AS greeting;`,
        "ace/mode/nix": `# Nix expressions do not support "Hello, World!" directly.`,
        "ace/mode/nsis": `OutFile "HelloWorld.exe"
    Name "Hello World"
    Section
        MessageBox MB_OK "Hello, World!"
    SectionEnd`,
        "ace/mode/objectivec": `#import <Foundation/Foundation.h>
    
    int main(int argc, const char * argv[]) {
        @autoreleasepool {
            NSLog(@"Hello, World!");
        }
        return 0;
    }`,
        "ace/mode/ocaml": `print_endline "Hello, World!"`,
        "ace/mode/pascal": `program HelloWorld;
    begin
      writeln('Hello, World!');
    end.`,
        "ace/mode/perl": `print "Hello, World!\n";`,
        "ace/mode/pgsql": `DO $$ BEGIN
        RAISE NOTICE 'Hello, World!';
    END $$;`,
        "ace/mode/php": `<?php
    echo "Hello, World!";
    ?>`,
        "ace/mode/plain_text": `Hello, World!`,
        "ace/mode/praetex": `// PraeTeX is not a programming language.`,
        "ace/mode/prolog": `:- initialization(main).
    main :-
        write('Hello, World!'), nl.`,
        "ace/mode/properties": `# Properties files do not support "Hello, World!" directly.`,
        "ace/mode/protobuf": `// Protobuf is a serialization format, not a programming language.`,
        "ace/mode/python": `print("Hello, World!")`,
        "ace/mode/r": `cat("Hello, World!\n")`,
        "ace/mode/razor": `@{
        var message = "Hello, World!";
    }
    <h1>@message</h1>`,
        "ace/mode/rdoc": `# RDoc comments do not support "Hello, World!" directly.`,
        "ace/mode/rhtml": `<h1>Hello, World!</h1>`,
        "ace/mode/ruby": `puts "Hello, World!"`,
        "ace/mode/rust": `fn main() {
        println!("Hello, World!");
    }`,
        "ace/mode/sass": `body
        background-color: lightblue`,
        "ace/mode/scad": `// OpenSCAD is used for 3D modeling, not "Hello, World!" directly.`,
        "ace/mode/scala": `object HelloWorld {
      def main(args: Array[String]): Unit = {
        println("Hello, World!")
      }
    }`,
        "ace/mode/scheme": `(display "Hello, World!")
    (newline)`,
        "ace/mode/scss": `body {
        background-color: lightblue;
    }`,
        "ace/mode/sh": `echo "Hello, World!"`,
        "ace/mode/sjs": `console.log("Hello, World!")`,
        "ace/mode/smarty": `{* Smarty templates require a context to render output *}
    Hello, World!`,
        "ace/mode/snippets": `// Snippets are not a programming language.`,
        "ace/mode/soy_template": `{namespace examples.simple}
    
    /**
     * Says hello to the world.
     */
    {template .helloWorld}
      Hello, World!
    {/template}`,
        "ace/mode/space": `// Space is not a programming language.`,
        "ace/mode/sparql": `# SPARQL is a query language for RDF, not "Hello, World!" directly.`,
        "ace/mode/sql": `SELECT 'Hello, World!' AS greeting;`,
        "ace/mode/sqlserver": `PRINT 'Hello, World!';`,
        "ace/mode/stylus": `body
        background-color lightblue`,
        "ace/mode/svg": `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">
      <text x="10" y="50" font-size="20">Hello, World!</text>
    </svg>`,
        "ace/mode/swift": `print("Hello, World!")`,
        "ace/mode/tcl": `puts "Hello, World!"`,
        "ace/mode/tex": `\documentclass{article}
    \begin{document}
    Hello, World!
    \end{document}`,
        "ace/mode/text": `Hello, World!`,
        "ace/mode/textile": `h1. Hello, World!`,
        "ace/mode/toml": `message = "Hello, World!"`,
        "ace/mode/tsx": `const element = <h1>Hello, World!</h1>;
    ReactDOM.render(element, document.getElementById('root'));`,
        "ace/mode/twig": `{# Twig templates require a context to render output #}
    Hello, World!`,
        "ace/mode/typescript": `console.log("Hello, World!");`,
        "ace/mode/vala": `void main() {
        print("Hello, World!\n");
    }`,
        "ace/mode/vbscript": `MsgBox "Hello, World!"`,
        "ace/mode/velocity": `#set($message = "Hello, World!")
    $message`,
        "ace/mode/verilog": `module HelloWorld;
        initial begin
            $display("Hello, World!");
        end
    endmodule`,
        "ace/mode/vhdl": `entity HelloWorld is
    end entity HelloWorld;
    
    architecture Behavioral of HelloWorld is
    begin
        process
        begin
            report "Hello, World!";
            wait;
        end process;
    end architecture Behavioral;`,
        "ace/mode/wollok": `println("Hello, World!")`,
        "ace/mode/xml": `<?xml version="1.0" encoding="UTF-8"?>
    <root>
        <message>Hello, World!</message>
    </root>`,
        "ace/mode/xquery": `xquery version "3.1";
    "Hello, World!"`,
        "ace/mode/yaml": `message: Hello, World!`
    };


    function showLanguageMenu() {
        // Create the language selection box
        const languageBox = document.createElement('div');
        languageBox.id = 'language-box';
        languageBox.style.position = 'fixed';
        languageBox.style.top = '50%';
        languageBox.style.left = '50%';
        languageBox.style.transform = 'translate(-50%, -50%) scale(0)';
        languageBox.style.backgroundColor = '#282c34';
        languageBox.style.border = '1px solid #61afef';
        languageBox.style.padding = '20px';
        languageBox.style.borderRadius = '10px';
        languageBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        languageBox.style.zIndex = '1000';
        languageBox.style.transition = 'transform 0.5s ease-in-out';

        // Add a title
        const title = document.createElement('h3');
        title.textContent = 'Select Language Mode';
        title.style.color = '#abb2bf';
        title.style.textAlign = 'center';
        title.style.marginBottom = '15px';
        languageBox.appendChild(title);

        // Create search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search languages...';
        searchInput.style.width = '100%';
        searchInput.style.padding = '8px';
        searchInput.style.marginBottom = '15px';
        searchInput.style.backgroundColor = '#3e4451';
        searchInput.style.color = '#abb2bf';
        searchInput.style.border = '1px solid #61afef';
        searchInput.style.borderRadius = '3px';
        languageBox.appendChild(searchInput);

        // Create grid container for language options
        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
        gridContainer.style.gap = '10px';
        gridContainer.style.maxHeight = '300px';
        gridContainer.style.overflowY = 'auto';
        gridContainer.style.marginBottom = '15px';
        languageBox.appendChild(gridContainer);

        // Define all Ace modes
        const languages = [
            { mode: "ace/mode/abap", name: "ABAP" },
            { mode: "ace/mode/abc", name: "ABC" },
            { mode: "ace/mode/actionscript", name: "ActionScript" },
            { mode: "ace/mode/ada", name: "ADA" },
            { mode: "ace/mode/apache_conf", name: "Apache Conf" },
            { mode: "ace/mode/applescript", name: "AppleScript" },
            { mode: "ace/mode/asciidoc", name: "AsciiDoc" },
            { mode: "ace/mode/assembly_x86", name: "Assembly x86" },
            { mode: "ace/mode/autohotkey", name: "AutoHotkey" },
            { mode: "ace/mode/batchfile", name: "BatchFile" },
            { mode: "ace/mode/bro", name: "Bro" },
            { mode: "ace/mode/c9search", name: "C9Search" },
            { mode: "ace/mode/c_cpp", name: "C/C++" },
            { mode: "ace/mode/cirru", name: "Cirru" },
            { mode: "ace/mode/clojure", name: "Clojure" },
            { mode: "ace/mode/cobol", name: "Cobol" },
            { mode: "ace/mode/coffee", name: "CoffeeScript" },
            { mode: "ace/mode/coldfusion", name: "ColdFusion" },
            { mode: "ace/mode/csharp", name: "C#" },
            { mode: "ace/mode/css", name: "CSS" },
            { mode: "ace/mode/curly", name: "Curly" },
            { mode: "ace/mode/d", name: "D" },
            { mode: "ace/mode/dart", name: "Dart" },
            { mode: "ace/mode/diff", name: "Diff" },
            { mode: "ace/mode/django", name: "Django" },
            { mode: "ace/mode/dockerfile", name: "Dockerfile" },
            { mode: "ace/mode/dot", name: "DOT" },
            { mode: "ace/mode/drools", name: "Drools" },
            { mode: "ace/mode/edifact", name: "EDIFACT" },
            { mode: "ace/mode/eiffel", name: "Eiffel" },
            { mode: "ace/mode/ejs", name: "EJS" },
            { mode: "ace/mode/elixir", name: "Elixir" },
            { mode: "ace/mode/elm", name: "Elm" },
            { mode: "ace/mode/erlang", name: "Erlang" },
            { mode: "ace/mode/forth", name: "Forth" },
            { mode: "ace/mode/fortran", name: "Fortran" },
            { mode: "ace/mode/ftl", name: "FreeMarker" },
            { mode: "ace/mode/gcode", name: "Gcode" },
            { mode: "ace/mode/gherkin", name: "Gherkin" },
            { mode: "ace/mode/gitignore", name: "Gitignore" },
            { mode: "ace/mode/glsl", name: "GLSL" },
            { mode: "ace/mode/golang", name: "Go" },
            { mode: "ace/mode/groovy", name: "Groovy" },
            { mode: "ace/mode/haml", name: "HAML" },
            { mode: "ace/mode/handlebars", name: "Handlebars" },
            { mode: "ace/mode/haskell", name: "Haskell" },
            { mode: "ace/mode/haskell_cabal", name: "Haskell Cabal" },
            { mode: "ace/mode/haxe", name: "Haxe" },
            { mode: "ace/mode/html", name: "HTML" },
            { mode: "ace/mode/ini", name: "INI" },
            { mode: "ace/mode/io", name: "Io" },
            { mode: "ace/mode/jack", name: "Jack" },
            { mode: "ace/mode/jade", name: "Jade" },
            { mode: "ace/mode/java", name: "Java" },
            { mode: "ace/mode/javascript", name: "JavaScript" },
            { mode: "ace/mode/json", name: "JSON" },
            { mode: "ace/mode/jsoniq", name: "JSONiq" },
            { mode: "ace/mode/jsp", name: "JSP" },
            { mode: "ace/mode/jsx", name: "JSX" },
            { mode: "ace/mode/julia", name: "Julia" },
            { mode: "ace/mode/kotlin", name: "Kotlin" },
            { mode: "ace/mode/latex", name: "LaTeX" },
            { mode: "ace/mode/less", name: "LESS" },
            { mode: "ace/mode/liquid", name: "Liquid" },
            { mode: "ace/mode/lisp", name: "Lisp" },
            { mode: "ace/mode/livescript", name: "LiveScript" },
            { mode: "ace/mode/logiql", name: "LogiQL" },
            { mode: "ace/mode/lsl", name: "LSL" },
            { mode: "ace/mode/lua", name: "Lua" },
            { mode: "ace/mode/lucene", name: "Lucene" },
            { mode: "ace/mode/makefile", name: "Makefile" },
            { mode: "ace/mode/markdown", name: "Markdown" },
            { mode: "ace/mode/mask", name: "Mask" },
            { mode: "ace/mode/matlab", name: "MATLAB" },
            { mode: "ace/mode/maze", name: "Maze" },
            { mode: "ace/mode/mel", name: "MEL" },
            { mode: "ace/mode/mipsassembler", name: "MIPS Assembler" },
            { mode: "ace/mode/mipsassembler_nicotine", name: "MIPS Assembler Nicotine" },
            { mode: "ace/mode/mushcode", name: "MUSHCode" },
            { mode: "ace/mode/mysql", name: "MySQL" },
            { mode: "ace/mode/nix", name: "Nix" },
            { mode: "ace/mode/nsis", name: "NSIS" },
            { mode: "ace/mode/objectivec", name: "Objective-C" },
            { mode: "ace/mode/ocaml", name: "OCaml" },
            { mode: "ace/mode/pascal", name: "Pascal" },
            { mode: "ace/mode/perl", name: "Perl" },
            { mode: "ace/mode/pgsql", name: "pgSQL" },
            { mode: "ace/mode/php", name: "PHP" },
            { mode: "ace/mode/plain_text", name: "Plain Text" },
            { mode: "ace/mode/praetex", name: "PraeTeX" },
            { mode: "ace/mode/prolog", name: "Prolog" },
            { mode: "ace/mode/praetex", name: "PraeTeX" },
            { mode: "ace/mode/prolog", name: "Prolog" },
            { mode: "ace/mode/properties", name: "Properties" },
            { mode: "ace/mode/protobuf", name: "Protobuf" },
            { mode: "ace/mode/python", name: "Python" },
            { mode: "ace/mode/r", name: "R" },
            { mode: "ace/mode/razor", name: "Razor" },
            { mode: "ace/mode/rdoc", name: "RDoc" },
            { mode: "ace/mode/rhtml", name: "RHTML" },
            { mode: "ace/mode/ruby", name: "Ruby" },
            { mode: "ace/mode/rust", name: "Rust" },
            { mode: "ace/mode/sass", name: "SASS" },
            { mode: "ace/mode/scad", name: "SCAD" },
            { mode: "ace/mode/scala", name: "Scala" },
            { mode: "ace/mode/scheme", name: "Scheme" },
            { mode: "ace/mode/scss", name: "SCSS" },
            { mode: "ace/mode/sh", name: "SH" },
            { mode: "ace/mode/sjs", name: "SJS" },
            { mode: "ace/mode/smarty", name: "Smarty" },
            { mode: "ace/mode/snippets", name: "snippets" },
            { mode: "ace/mode/soy_template", name: "Soy Template" },
            { mode: "ace/mode/space", name: "Space" },
            { mode: "ace/mode/sparql", name: "SPARQL" },
            { mode: "ace/mode/sql", name: "SQL" },
            { mode: "ace/mode/sqlserver", name: "SQLServer" },
            { mode: "ace/mode/stylus", name: "Stylus" },
            { mode: "ace/mode/svg", name: "SVG" },
            { mode: "ace/mode/swift", name: "Swift" },
            { mode: "ace/mode/tcl", name: "Tcl" },
            { mode: "ace/mode/tex", name: "Tex" },
            { mode: "ace/mode/text", name: "Text" },
            { mode: "ace/mode/textile", name: "Textile" },
            { mode: "ace/mode/toml", name: "TOML" },
            { mode: "ace/mode/tsx", name: "TSX" },
            { mode: "ace/mode/twig", name: "Twig" },
            { mode: "ace/mode/typescript", name: "Typescript" },
            { mode: "ace/mode/vala", name: "Vala" },
            { mode: "ace/mode/vbscript", name: "VBScript" },
            { mode: "ace/mode/velocity", name: "Velocity" },
            { mode: "ace/mode/verilog", name: "Verilog" },
            { mode: "ace/mode/vhdl", name: "VHDL" },
            { mode: "ace/mode/wollok", name: "Wollok" },
            { mode: "ace/mode/xml", name: "XML" },
            { mode: "ace/mode/xquery", name: "XQuery" },
            { mode: "ace/mode/yaml", name: "YAML" }
        ];

        let selectedLanguageMode = null;

        // Function to update the grid with filtered languages
        function updateGrid(filter = '') {
            gridContainer.innerHTML = ''; // Clear existing grid items
            languages.forEach(lang => {
                if (!filter || lang.name.toLowerCase().includes(filter.toLowerCase())) {
                    const gridItem = document.createElement('div');
                    gridItem.textContent = lang.name;
                    gridItem.style.padding = '10px';
                    gridItem.style.textAlign = 'center';
                    gridItem.style.borderRadius = '5px';
                    gridItem.style.cursor = 'pointer';
                    gridItem.style.backgroundColor = '#3e4451';
                    gridItem.style.color = '#abb2bf';
                    gridItem.style.transition = 'background-color 0.3s ease-in-out';

                    // Highlight selected language
                    if (selectedLanguageMode === lang.mode) {
                        gridItem.style.backgroundColor = '#61afef';
                        gridItem.style.color = '#282c34';
                    }

                    // Handle click on grid item
                    gridItem.addEventListener('click', () => {
                        selectedLanguageMode = lang.mode;

                        // Remove highlight from all items
                        Array.from(gridContainer.children).forEach(item => {
                            item.style.backgroundColor = '#3e4451';
                            item.style.color = '#abb2bf';
                        });

                        // Highlight the clicked item
                        gridItem.style.backgroundColor = '#61afef';
                        gridItem.style.color = '#282c34';
                    });

                    // Hover effect
                    gridItem.addEventListener('mouseenter', () => {
                        if (selectedLanguageMode !== lang.mode) {
                            gridItem.style.backgroundColor = '#5c6370';
                        }
                    });

                    gridItem.addEventListener('mouseleave', () => {
                        if (selectedLanguageMode !== lang.mode) {
                            gridItem.style.backgroundColor = '#3e4451';
                        }
                    });

                    gridContainer.appendChild(gridItem);
                }
            });
        }

        // Initial grid population
        updateGrid();

        // Search input listener
        searchInput.addEventListener('input', () => {
            updateGrid(searchInput.value);
        });

        // Buttons container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'space-between';
        buttonContainer.style.marginTop = '15px';

        // OK button
        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.style.backgroundColor = '#61afef';
        okButton.style.color = '#282c34';
        okButton.style.border = 'none';
        okButton.style.padding = '10px 20px';
        okButton.style.borderRadius = '5px';
        okButton.style.cursor = 'pointer';
        okButton.style.transition = 'background-color 0.3s ease-in-out';

        okButton.addEventListener('click', () => {
            if (selectedLanguageMode) {
                editor.session.setMode({ path: selectedLanguageMode, v: 1 });
                localStorage.setItem('aceMode', selectedLanguageMode);

                // Set the editor content to the selected language's template
                const template = languageTemplates[selectedLanguageMode];
                if (template) {
                    editor.setValue(template, -1); // Set the template as the editor's content
                } else {
                    editor.setValue("// No template available for this language.", -1);
                }
            }
            document.body.removeChild(languageBox);
        });

        // Cancel button
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.backgroundColor = '#5c6370';
        cancelButton.style.color = '#abb2bf';
        cancelButton.style.border = 'none';
        cancelButton.style.padding = '10px 20px';
        cancelButton.style.borderRadius = '5px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.transition = 'background-color 0.3s ease-in-out';

        cancelButton.addEventListener('click', () => {
            document.body.removeChild(languageBox);
        });

        buttonContainer.appendChild(okButton);
        buttonContainer.appendChild(cancelButton);
        languageBox.appendChild(buttonContainer);

        // Append the language box to the body
        document.body.appendChild(languageBox);

        // Trigger the animation after appending the language box
        setTimeout(() => {
            languageBox.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);

        // Remove the box when clicking outside
        document.addEventListener('click', (event) => {
            if (!languageBox.contains(event.target) && event.target !== languageBtn) {
                languageBox.style.transform = 'translate(-50%, -50%) scale(0)';
                setTimeout(() => {
                    document.body.removeChild(languageBox);
                }, 500); // Match the duration of the animation
            }
        });
    }
});