// Module55Content.jsx
import React from 'react';
import styles from './Module55Content.module.css';

const Module55Content = () => {
  return (
    <div className={styles.moduleLayout}>
      <h1>GVIM Basics &amp; Commands</h1>
      <p>GVIM or “GNU vi Improved,” is a highly configurable and advanced text editor, which is based on the unix Vi editor.</p>
      <p>The full Form of GVIM is Graphical vim Text editor.</p>
      <p>It is mostly used for Programming and Scripting works and also used for general text editing.</p>
      <p>GVIM is not used for image editing.</p>
      <p>General text editors are Notepad, Notepad++, Windows office.</p>
      <p>Linux/unix based text editors are nano, libre office, emacs, Vi, GVIM.</p>
      <p>Some of the Key features of GVIM include:</p>
      <ul>
        <li>Syntax Highlighting &amp; Color Schemes</li>
        <li>Code Folding</li>
        <li>Plug‑in Support</li>
        <li>Multi level undo/redo</li>
        <li>Split screen support</li>
        <li>Integrated help system</li>
        <li>Customization</li>
        <li>Scripting</li>
        <li>Regular Expression</li>
        <li>Integrated development environment</li>
        <li>Command line interface</li>
        <li>Remote editing</li>
      </ul>

      <h2>Syntax Highlighting &amp; Color Schemes</h2>
      <p>We highlight different color schemes for text, background, etc., and also for the keywords of GVIM can be highlighted with different colors.</p>
      <ul>
        <li>Comments: Blue</li>
        <li>Verilog keywords: Brown</li>
        <li>Numbers: pink</li>
        <li>@, [ ]: Blue</li>
        <li>User defined words: black</li>
      </ul>

      <h2>Code Folding</h2>
      <p>GVIM can fold sections of code to make it easier to navigate large files.</p>
      <p>For Code folding we use the commands <code>zf</code> and <code>zo</code>; by using the visual command we can select the required section and type <code>zf</code> to fold.</p>
      <p>To open the folded section place the cursor at “[+]” and type <code>zo</code>.</p>

      <h2>Plug‑in support</h2>
      <p>GVIM has a wide range of third‑party plug‑ins available that can add additional functionality such as code completion and error checking.</p>

      <h2>Multi level UNDO/REDO</h2>
      <p>GVIM allows you to undo/redo multiple levels of changes, making it easy to recover from mistakes.</p>

      <h2>Split Screen Support</h2>
      <p>GVIM can split the screen into multiple panes, allowing you to view and edit multiple files at the same time.</p>
      <ul>
        <li><code>:spl</code>, <code>:split</code> – horizontal split</li>
        <li><code>:vsplit</code> – vertical split</li>
      </ul>

      <h2>Integrated help system</h2>
      <p>GVIM includes built‑in help documentation and tutorials, making it easy to learn and use.</p>
      <p>Command: <code>:help</code></p>

      <h2>Customization</h2>
      <p>Allowing users to adjust font, color, key bindings. It also allows you to create and edit your own macros and define your own commands.</p>

      <h2>Scripting</h2>
      <p>GVIM supports scripting in a variety of languages, including vim script, perl, python &amp; ruby which allows you to automate repetitive tasks and external functionality of the editor.</p>

      <h2>Regular expressions</h2>
      <p>GVIM supports regular expressions for searching &amp; replacing text, which can be a powerful tool for editing large or complex files.</p>
      <p>Examples:</p>
      <ul>
        <li>Replace entire file: <code>0,$s/old/new/g</code></li>
        <li>Replace line by line with confirmation: <code>0,$s/old/new/gc</code></li>
      </ul>

      <h2>Integrated Development Environment (IDE)</h2>
      <p>GVIM can be configured as a complete IDE with features such as code completion, error checking and debugging.</p>

      <h2>Command line Interface</h2>
      <p>GVIM can be launched from the command line allowing users to quickly open &amp; edit files without having to launch the full graphical user interface.</p>

      <h2>Remote Editing</h2>
      <p>GVIM supports files on remote servers using protocols such as SSH and FTP.</p>

      <h2>Modes of GVIM</h2>
      <p>One of the most distinctive features of GVIM is its modal editing, where it operates in four different modes:</p>
      <ul>
        <li>Escape mode / Normal mode</li>
        <li>Insert mode</li>
        <li>Visual block mode</li>
        <li>Recording mode</li>
        <li>Command line mode</li>
      </ul>

      <h3>Escape Mode</h3>
      <p>This is the default mode when you start Vim or switch back to it after editing text. In this mode, you can navigate, delete, copy, paste, and perform various other operations using key combinations. Pressing the “Escape” key in Normal Mode ensures you are not in any other mode and are ready to execute commands.</p>

      <h3>Insert Mode</h3>
      <p>This is the mode where you can actually type and edit text. To enter Insert Mode from Normal Mode, press “i” (for insert) or “a” (for append). While in Insert Mode, you can type and edit as you would in any other text editor.</p>

      <h3>Visual Block mode</h3>
      <p>Visual block mode in Vim (and GVim) allows you to select and edit a rectangular block of text rather than entire lines. This can be very useful for making column‑based changes in your text. You can enter by pressing “Ctrl+v” from normal mode.</p>

      <h3>Recording Mode</h3>
      <p>In Vim, you can use the recording feature to record a sequence of actions as a macro and then replay that macro on different parts of your text. This is incredibly useful for automating repetitive tasks. Start recording with <code>q</code> followed by any alphabet (e.g., <code>qa</code>, <code>qd</code>, <code>qf</code>) from normal mode and stop with <code>q</code>.</p>

      <h3>Command line Mode</h3>
      <p>This mode is used for entering more advanced commands, such as searching, replacing, saving files, and so on. To enter Command‑Line Mode from Normal Mode, press “:”. From here, type various commands and press “Enter” to execute them.</p>

      <h3>Common commands in Escape Mode</h3>
      <ul>
        <li><code>h</code> – Move the cursor to the left.</li>
        <li><code>j</code> – Move the cursor down.</li>
        <li><code>k</code> – Move the cursor up.</li>
        <li><code>l</code> – Move the cursor to the right.</li>
        <li><code>w</code> – Move to the next word.</li>
        <li><code>b</code> – Move to the previous word.</li>
        <li><code>0</code> – Move to the beginning of the current line.</li>
        <li><code>$</code> – Move to the end of the current line.</li>
        <li><code>gg</code> – Move to the first line of the document.</li>
        <li><code>G</code> – Move to the last line of the document.</li>
        <li><code>n</code> – Move next instance of the last search.</li>
        <li><code>N</code> – Move previous instance of the last search.</li>
        <li><code>dd</code> – Delete the current line.</li>
        <li><code>D</code> – Delete to the end of the line.</li>
        <li><code>x</code> – Delete the character under the cursor.</li>
        <li><code>X</code> – Delete the character before the cursor.</li>
        <li><code>u</code> – Undo the last change.</li>
        <li><code>Ctrl+r</code> – Redo the last change.</li>
        <li><code>Ctrl+f</code> – Move the cursor forward one screen.</li>
        <li><code>Ctrl+b</code> – Move the cursor backward one screen.</li>
        <li><code>yy</code> – Yank (copy) the entire line.</li>
        <li><code>10yy</code> – Yank 10 lines from the cursor.</li>
        <li><code>P</code> – Paste the copied text before the cursor.</li>
        <li><code>10p</code> – Paste 10 times.</li>
        <li><code>e</code> – Move to the end of a word.</li>
        <li><code>ge</code> – Move to the previous end of a word.</li>
        <li><code>dw</code> – Delete a word.</li>
        <li><code>:</code> – Enter command‑line mode.</li>
        <li><code>/</code> – Search forward in the document.</li>
        <li><code>?</code> – Search backward in the document.</li>
      </ul>

      <h3>Common commands in Insert mode</h3>
      <ul>
        <li><code>i</code> – Insert before the cursor.</li>
        <li><code>I</code> – Insert at the beginning of the line.</li>
        <li><code>a</code> – Append after the cursor.</li>
        <li><code>A</code> – Append at the end of the line.</li>
        <li><code>o</code> – Open a new line below and start insert mode.</li>
        <li><code>O</code> – Open a new line above and start insert mode.</li>
        <li><code>r</code> – Replace one character under the cursor.</li>
        <li><code>R</code> – Replace multiple characters starting at the cursor.</li>
        <li><code>s</code> – Delete the character under the cursor and insert new text.</li>
        <li><code>S</code> – Delete the current line and insert a new line.</li>
        <li><code>c</code> – Delete to the end of the line and insert new text.</li>
        <li><code>cc</code> – Delete the entire line and insert new text.</li>
        <li><code>cw</code> – Delete word under the cursor and insert new text.</li>
        <li><code>c$</code> – Delete to the end of the line and insert new text.</li>
      </ul>

      <h3>Common commands in Command mode</h3>
      <ul>
        <li><code>:%s/old/new/g</code> – Replace the old word with the new word globally.</li>
        <li><code>:%s/old/new/gc</code> – Replace the old word with the new word with confirmation.</li>
        <li><code>/&lt;word&gt;</code> – Search for a word or pattern.</li>
        <li><code>w</code> – Save the document.</li>
        <li><code>wa</code> – Save all open documents.</li>
        <li><code>w!</code> – Force‑save the document.</li>
        <li><code>w &lt;filename&gt;</code> – Save the document with a specific filename.</li>
        <li><code>vspl &lt;filename&gt;</code> – Open a file with a vertical split.</li>
        <li><code>spl &lt;filename&gt;</code> – Open a file with a horizontal split.</li>
        <li><code>e &lt;filename&gt;</code> – Open a file in the current window.</li>
        <li><code>q</code> – Quit the window.</li>
        <li><code>qa</code> – Quit all windows.</li>
        <li><code>q!</code> – Force‑quit the window.</li>
      </ul>

      <h2>VIMRC File</h2>
      <p>In Vim, including the GUI version GVim, the vimrc file is a configuration file that contains various settings and customizations for the editor.</p>
      <p>On Windows the file is typically named <code>_vimrc</code> and resides in your user’s home directory.</p>
      <h3>Common settings you might include:</h3>
      <ul>
        <li><code>set number</code> – Show line numbers.</li>
        <li><code>set guifont=fixedsys:h14</code> – Set the GUI font.</li>
        <li><code>set showmode</code> – Show the current mode.</li>
        <li><code>set tabstop=4</code> – Set tab width.</li>
        <li><code>set nocompatible</code> – Disable vi‑compatible mode.</li>
        <li><code>set backspace=indent,eol,start</code> – Configure backspace behaviour.</li>
        <li><code>set incsearch</code> – Enable incremental search.</li>
        <li><code>set hlsearch</code> – Highlight search results.</li>
        <li><code>set autoindent</code> – Enable auto‑indentation.</li>
        <li><code>syntax on</code> – Enable syntax highlighting.</li>
        <li><code>colorscheme desert</code> – Use a dark color scheme.</li>
        <li><code>nnoremap &lt;F2&gt; :w&lt;CR&gt;</code> – Map F2 to save.</li>
        <li><code>vnoremap &lt;C-s&gt; :w&lt;CR&gt;</code> – Map Ctrl+S to save in visual mode.</li>
        <li><code>vnoremap &lt;C-c&gt; "+y</code> – Map Ctrl+C to copy.</li>
        <li><code>vnoremap &lt;C-x&gt; "+x</code> – Map Ctrl+X to cut.</li>
      </ul>
    </div>
  );
};

export default Module55Content;
