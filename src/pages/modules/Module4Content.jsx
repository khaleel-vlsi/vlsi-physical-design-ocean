import React, { useEffect, useState } from 'react';
import AdUnit from '../../components/AdUnit';
import styles from './Module4Content.module.css';

const Module4Content = () => {
  const [showAllLinux, setShowAllLinux] = useState(false);
  const [showAllTcl, setShowAllTcl] = useState(false);

  useEffect(() => {
    const triggerMathJax = () => {
      if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
      }
    };
    triggerMathJax();
    const timer = setTimeout(triggerMathJax, 1000);
    return () => clearTimeout(timer);
  }, []);

  const linuxHeadings = [
    { id: 'h.hb89eod6gcxs', text: 'Introduction to Linux Operating System' },
    { id: 'h.sn2ibi9dtku8', text: '1. What is an Operating System (OS)?' },
    { id: 'h.s93gvw1sorqy', text: '2. What is Linux?' },
    { id: 'h.3asoicers4jr', text: '3. Why Do We Need an Operating System?' },
    { id: 'h.4t91rgkq0o1u', text: '4. Components of Linux Operating System' },
    { id: 'h.pn2r3zidwgwi', text: '5. What is Kernel?' },
    { id: 'h.m9sogcs2pfhc', text: '6. Why Kernel is Important?' },
    { id: 'h.pbfoiul0oboo', text: '7. What is Shell?' },
    { id: 'h.x03q0jlxhof2', text: '8. Types of Shells in Linux' },
    { id: 'h.mgklsnd7c2bv', text: '9. Why Do We Use Shell in Linux?' },
    { id: 'h.3ouyihjkypm', text: '10. Difference Between Kernel and Shell' },
    { id: 'h.ornv2ntuk3t7', text: '11. Why Linux is Preferred?' },
    { id: 'h.a3gh18h99nic', text: '12. Summary (For Students)' },
    { id: 'h.xxj5r6bwhnix', text: 'Linux File System & Paths (With Commands Explained Clearly)' },
    { id: 'h.yd3mh079lvip', text: '1. What is a Path in Linux?' },
    { id: 'h.jjz8nnrzvxm7', text: '3. Absolute Path (Full Address)' },
    { id: 'h.1cphh8b0bsdc', text: '4. Relative Path (Nearby Address)' },
    { id: 'h.cs0yt3wz18zq', text: '5. pwd Command (Where Am I?)' },
    { id: 'h.ksvu87dz0obm', text: '6. ls Command (What is Inside?)' },
    { id: 'h.dszlvqhmnddo', text: '7. cd Command (Move Between Folders)' },
    { id: 'h.bp5jz7cwo478', text: '8. mkdir Command (Create Folder)' },
    { id: 'h.j2evlniefcge', text: '9. rmdir Command (Delete Empty Folder)' },
    { id: 'h.qrdwjohagq76', text: '10. Special Path Symbols (Very Important)' },
    { id: 'h.2egsj5bt0wvk', text: '11. Home Directory (~)' },
    { id: 'h.365b1dx9gj1b', text: '12. Practical Real Example (Lab Style)' },
    { id: 'h.djrl5as3ld2q', text: '13. Student Revision Summary' },
    { id: 'h.lzpe0wqu1flc', text: '1. pwd – Present Working Directory' },
    { id: 'h.lcdvumf3h42e', text: '2. ls – List Directory Contents' },
    { id: 'h.8dzqnd9dty4u', text: '3. cd – Change Directory' },
    { id: 'h.z7ng0ouyci0c', text: '4. mkdir – Make Directory' },
    { id: 'h.ifp99fi1j1e2', text: '5. rmdir – Remove Empty Directory' },
    { id: 'h.l3pohtvlzb3e', text: '6. touch – Create File / Update Time' },
    { id: 'h.4i21qgl0elep', text: '7. cat – View File Content' },
    { id: 'h.tdeypgpyowdl', text: '8. less – View Large Files' },
    { id: 'h.ipnmxsqbf1kl', text: '9. head – First Lines of File' },
    { id: 'h.v06b5nk955u2', text: '10. tail – Last Lines of File' },
    { id: 'h.7oorfrlrzc7h', text: '11. cp – Copy Files & Directories' },
    { id: 'h.mve0l3uu13ak', text: '12. mv – Move / Rename' },
    { id: 'h.5jgww1wjag7c', text: '13. rm – Remove Files & Directories' },
    { id: 'h.q6ljllw3214w', text: '14. find – Search Files' },
    { id: 'h.sar86bxvsbmi', text: '15. grep – Search Inside Files' },
    { id: 'h.69rpind97kbo', text: '16. which – Command Location' },
    { id: 'h.5ztsnnwgslxj', text: '17. echo – Display Output' },
    { id: 'h.gvl8tl146pc0', text: 'FINAL STUDENT UNDERSTANDING FLOW' },
    { id: 'h.mfeo5a1c4nlp', text: 'LINUX EDITORS – DETAILED LECTURE NOTES' },
    { id: 'h.w4ddpwwfrbr8', text: '1. What is an Editor?' },
    { id: 'h.h7d034q71mn8', text: '2. Types of Editors in Linux' },
    { id: 'h.uy7b71us1t2w', text: '3. Vi Editor' },
    { id: 'h.ji334748b7da', text: '4. Vim Editor' },
    { id: 'h.a46h645qakok', text: '5. rvim Editor' },
    { id: 'h.1v0uir9hp8qp', text: '6. GVIM Editor (MAIN FOCUS)' },
    { id: 'h.tszekayo077v', text: '7. GVIM MODES (VERY IMPORTANT)' },
    { id: 'h.nbbog5j7w5l2', text: '8. Normal Mode (Default Mode)' },
    { id: 'h.acq6y3ypng1w', text: '9. Insert Mode' },
    { id: 'h.50iflzmvyhgk', text: '10. Visual Mode' },
    { id: 'h.s57ss84v9fsq', text: '11. Command-Line Mode' },
    { id: 'h.zfn5v3ttbjim', text: '12. Replace Mode' },
    { id: 'h.1vm8y0393i65', text: '13. GVIM WORKFLOW (REAL LIFE)' },
    { id: 'h.ngwf35vt4b7o', text: '14. Why GVIM is Used in Industry?' },
    { id: 'h.1904gnwhmv8f', text: '15. STUDENT SUMMARY (ONE GLANCE)' },
    { id: 'h.s29ah6n704jo', text: 'GVIM EDITOR – COMPLETE COMMANDS (DETAILED LECTURE NOTES)' },
    { id: 'h.t7pjwadio0zi', text: '1. GVIM MODES (REVISION)' },
    { id: 'h.aim0iye9w621', text: '2. NORMAL MODE COMMANDS (MOST IMPORTANT)' },
    { id: 'h.ph06ddks4rfz', text: '3. INSERT MODE COMMANDS' },
    { id: 'h.ch84jy9r8n77', text: '4. DELETE COMMANDS (NORMAL MODE)' },
    { id: 'h.dwiwq269b3w3', text: '5. COPY (YANK) COMMANDS' },
    { id: 'h.867nl9poviyz', text: '6. PASTE COMMANDS' },
    { id: 'h.zgklyvsckgd', text: '7. UNDO / REDO' },
    { id: 'h.9gsvztfs9wwm', text: '8. VISUAL MODE COMMANDS' },
    { id: 'h.uubl5oxxrm9h', text: '9. SEARCH COMMANDS' },
    { id: 'h.axu6nac8isdq', text: '10. COMMAND MODE COMMANDS' },
    { id: 'h.7wptd0xxxe3', text: '11. REPLACE COMMANDS' },
    { id: 'h.jj05uhe2sm47', text: '12. MULTI-FILE COMMANDS' },
    { id: 'h.53fva7zgiwkx', text: '13. WINDOW / SPLIT COMMANDS' },
    { id: 'h.x266lj3q8hxj', text: '14. SETTINGS COMMANDS' },
    { id: 'h.xzebbmi4egm9', text: '15. HELP COMMAND' },
    { id: 'h.awkdeynrfb8t', text: '16. REAL-TIME GVIM USAGE EXAMPLE' },
    { id: 'h.ss1w2eypn27s', text: '17. COMPLETE STUDENT SUMMARY' },
    { id: 'h.rfbmvqpy75et', text: 'LINUX WILDCARD CHARACTERS (PATTERN MATCHING)' },
    { id: 'h.3ztj258txqmh', text: '1. What is a Wildcard Character?' },
    { id: 'h.uwj27fxhsiyl', text: '2. Why Do We Use Wildcards?' },
    { id: 'h.4mrwf0iehlf4', text: '3. Types of Wildcard Characters' },
    { id: 'h.x2y8bdma8chg', text: '4. Asterisk Wildcard (*)' },
    { id: 'h.xkdlyl16kqsi', text: '4.1 Meaning' },
    { id: 'h.197r4ya2y0mq', text: '4.2 Examples' },
    { id: 'h.22slqb9qmz22', text: '5. Question Mark (?) Wildcard' },
    { id: 'h.hk990ket8k2q', text: '5.1 Meaning' },
    { id: 'h.4u889w5nv72r', text: '5.2 Examples' },
    { id: 'h.7akprw67uap4', text: '6. Bracket Wildcard [ ]' },
    { id: 'h.dmxcx430tsjb', text: '6.1 Meaning' },
    { id: 'h.yjcndp96gv9g', text: '6.2 Examples' },
    { id: 'h.becszmqhvocd', text: '6.3 Bracket with Negation [! ]' },
    { id: 'h.8jtd9emyot4b', text: '7. Brace Expansion { }' },
    { id: 'h.uq8vx36ks9mo', text: '7.1 Meaning' },
    { id: 'h.pr1fh5y9rgcn', text: '7.2 Examples' },
    { id: 'h.xlfil7uuxyoc', text: '8. Combining Wildcards (Advanced Usage)' },
    { id: 'h.3wfpzpj1hbpl', text: '9. Real-Time Use Cases' },
    { id: 'h.tx1qzt8b88fm', text: '10. Important Notes for Students' },
    { id: 'h.jwhtpjytdgq', text: '11. Student Quick Summary Table' },
    { id: 'h.ty513i3oh7a6', text: 'LINUX FILE & DIRECTORY PERMISSIONS' },
    { id: 'h.f5ptpmb74v20', text: '1. Why Permissions Are Needed in Linux' },
    { id: 'h.8cizh46qq7ha', text: '2. Types of Users in Linux' },
    { id: 'h.ch3wxzd3gflr', text: '3. Understanding ls -l Output' },
    { id: 'h.ij85lcfpx75a', text: '4. File Types' },
    { id: 'h.fhplqhiey259', text: '5. Permission Types' },
    { id: 'h.9isnstckunvk', text: '6. Permission Structure (9 Bits)' },
    { id: 'h.v69ypkpjeot0', text: '7. Permissions on Files vs Directories' },
    { id: 'h.nqsf58jefrse', text: '8. Symbolic Mode of chmod' },
    { id: 'h.vbtyzo48zi3', text: '9. Symbol Meaning' },
    { id: 'h.fo6b7n8vdfv3', text: '10. Examples – Symbolic Mode' },
    { id: 'h.lbd2nba1mekk', text: '11. Octal (Numeric) Permission System' },
    { id: 'h.osnobths8wdj', text: '12. Common Octal Examples' },
    { id: 'h.2tmigc4noak2', text: '13. Directory Permission Examples' },
    { id: 'h.vvgei4c7hycz', text: '14. Recursive Permission Change' },
    { id: 'h.xiemfcar7oaf', text: '15. chown – Change Owner' },
    { id: 'h.33gvjsdghx97', text: '16. chgrp – Change Group' },
    { id: 'h.4ev1sudtnf37', text: '17. Real-World Scenario Example' },
    { id: 'h.zdxqusy4loqf', text: '18. Common Mistakes Students Make' },
    { id: 'h.258s7rqv0qkk', text: '19. Quick Revision Table' },
    { id: 'h.b9lzd9qzp2p2', text: '20. Student Final Summary' },
    { id: 'h.z15rfdqyu7ew', text: 'LINUX REDIRECTION OPERATORS' },
    { id: 'h.wyu0c05prchz', text: '1. What is Redirection in Linux?' },
    { id: 'h.mbj4lfj2cxzm', text: '2. Standard Streams in Linux' },
    { id: 'h.8x6ke3kh8p', text: '3. Types of Redirection' },
    { id: 'h.k0y29uc15i6g', text: '4. Output Redirection Operator >' },
    { id: 'h.chmiievrrs0i', text: '5. Append Output Redirection >>' },
    { id: 'h.9z7qvagkekh6', text: '6. Input Redirection Operator <' },
    { id: 'h.wwy473qsejl3', text: '7. Here Document Operator <<' },
    { id: 'h.xt21n5l3rk4g', text: '8. Real-World Use Case' },
    { id: 'h.ahfriqwezhj7', text: '9. Error Redirection (Bonus – Important)' },
    { id: 'h.xg7u8b9k1yfc', text: '10. Combined Redirection' },
    { id: 'h.oywd6yohli5i', text: '11. Redirection Summary Table' },
    { id: 'h.v9fbcg4yhhjf', text: '12. Common Student Mistakes' },
    { id: 'h.wnh4oruf9tv0', text: '13. Simple Student Practice Tasks' },
    { id: 'h.7w5sre5vzjjz', text: '14. Final Student Understanding' },
    { id: 'h.d29279u3fokz', text: 'HELPFUL COMMANDS IN LINUX (LECTURE STYLE)' },
    { id: 'h.8yygpjfbtwyi', text: '1. Why Helpful Commands Are Important' },
    { id: 'h.1iocpws7hq3c', text: '2. man Command (Manual Pages)' },
    { id: 'h.a58ni5xpmo6b', text: '3. help Command (Shell Built-ins)' },
    { id: 'h.q9y0g9lhdg5t', text: '4. info Command' },
    { id: 'h.641mpyeg7y6i', text: '5. whatis Command' },
    { id: 'h.8dh4rrm4e02t', text: '6. apropos Command' },
    { id: 'h.kjaz69dycpc9', text: '7. type Command' },
    { id: 'h.19tls63m0usi', text: '8. which Command' },
    { id: 'h.2xn7c1do25gl', text: '9. whereis Command' },
    { id: 'h.kwsb5un4ekxy', text: '10. --help Option' },
    { id: 'h.hqtdoryrj1bg', text: '11. Comparison Table (Quick Revision)' },
    { id: 'h.cog0sv7gl6pg', text: '12. Real Student Workflow' },
    { id: 'h.4u6on730opf8', text: '14. Student Summary' },
    { id: 'h.d9kke6286jzt', text: '1. more Command' },
    { id: 'h.7uw6g5mddczo', text: 'What is more?' },
    { id: 'h.1h6bepkyghj0', text: 'Syntax' },
    { id: 'h.y2fxdmlowxa2', text: 'Example 1' },
    { id: 'h.37mengy98a2k', text: 'Example 2' },
    { id: 'h.2kqwblaj1q96', text: 'Example 3' },
    { id: 'h.f0ixnroiop3m', text: 'Important Keys in more' },
    { id: 'h.9gcdoqvhqx03', text: 'Limitations of more' },
    { id: 'h.qxmz7beq3mc0', text: '2. less Command' },
    { id: 'h.kar4rsbwgzsa', text: 'What is less?' },
    { id: 'h.dplx879av57m', text: 'Syntax' },
    { id: 'h.r10tqa6dhvzd', text: 'Example 1' },
    { id: 'h.vzudwbscg0as', text: 'Example 2' },
    { id: 'h.ewmw0j390m5x', text: 'Example 3' },
    { id: 'h.phtuzdw1te4l', text: 'Useful Keys in less' },
    { id: 'h.5oeqwap0nzei', text: 'Why less is better' },
    { id: 'h.mx202zywgf3g', text: '3. grep Command' },
    { id: 'h.jlizgh77wb7o', text: 'What is grep?' },
    { id: 'h.dlcx6yaxb8gr', text: 'Syntax' },
    { id: 'h.p9d8az9oghfh', text: 'Example 1' },
    { id: 'h.ul3s3hqb2nj9', text: 'Example 2' },
    { id: 'h.4xzes0y1np4c', text: 'Example 3' },
    { id: 'h.3icwf1lzugoj', text: 'Common grep Options' },
    { id: 'h.qled5kfjmoz8', text: '4. Pipe Operator |' },
    { id: 'h.wk1eyfrqyblc', text: 'What is Pipe?' },
    { id: 'h.yxtreztb9yn2', text: 'Syntax' },
    { id: 'h.z6ipl35ehjzq', text: 'Example 1' },
    { id: 'h.xi1720z8zbkl', text: 'Example 2' },
    { id: 'h.jp57ww5yu4o6', text: 'Example 3' },
    { id: 'h.pammkiduxqbn', text: 'Multiple Pipes' },
    { id: 'h.i1js79l0q6y', text: 'Why Pipes are powerful' },
    { id: 'h.4yszufg1ypt5', text: '5. sed Command (Stream Editor)' },
    { id: 'h.5zwey1uru8l6', text: 'What is sed?' },
    { id: 'h.16w0tovdi9u4', text: 'Syntax' },
    { id: 'h.nj92mpw0ckpj', text: '5.1 Replace Text' },
    { id: 'h.gyq2sx637l0n', text: '5.2 Delete Lines' },
    { id: 'h.ah8tebfp4tme', text: '5.3 Print Specific Lines' },
    { id: 'h.im5chad6fv0x', text: '5.4 Save Output to File' },
    { id: 'h.ad037ks11wo7', text: '5.5 Edit File Permanently (-i)' },
    { id: 'h.9j3t3qupel9o', text: '6. Combined Usage (Real-World Examples)' },
    { id: 'h.qd03dun7t81i', text: '7. Command Comparison' },
    { id: 'h.h0rovl64xevc', text: '8. Student Practice Tasks' },
    { id: 'h.imbmderv5pud', text: '9. Interview Important Notes' },
    { id: 'h.kd8qdhscsemg', text: 'AWK COMMAND – COMPLETE LECTURE WITH OUTPUTS' },
    { id: 'h.8axnskzfckad', text: '1. What is AWK (Simple Explanation)' },
    { id: 'h.4zdelz9krj5q', text: '2. Sample File Used for All Examples' },
    { id: 'h.21o33tytqsqv', text: '3. Basic AWK Syntax' },
    { id: 'h.spasvm840o8a', text: '4. $0 – Print Complete Line' },
    { id: 'h.6a99yqeq0uyi', text: '5. $1, $2, $3 – Fields (Columns)' },
    { id: 'h.v1bkpjl1529r', text: '6. NR – Line Number' },
    { id: 'h.frl7bz1elsq6', text: '7. NF – Number of Fields' },
    { id: 'h.u68d9wm4q5y', text: '8. FS – Field Separator' },
    { id: 'h.xhm0b9q82br8', text: '9. OFS – Output Field Separator' },
    { id: 'h.e1ymgobu90b1', text: '10. BEGIN Block (Pre-Processing)' },
    { id: 'h.h8h3gu3xsc7y', text: '11. END Block (Post-Processing)' },
    { id: 'h.hf7rds9xcbpx', text: '12. Calculate Average' },
    { id: 'h.k8as2agx94v2', text: '13. Conditional Statements' },
    { id: 'h.kh5btcfh2gvj', text: '14. Pattern Matching' },
    { id: 'h.blfhftv98s6a', text: '15. Multiple Conditions' },
    { id: 'h.mdf98njt2rxh', text: '16. FILENAME' },
    { id: 'h.dl9ew57d9htp', text: '17. AWK with Pipe' },
    { id: 'h.vpnrrixy54se', text: '18. Full AWK Program (BEGIN + BODY + END)' },
    { id: 'h.q8selvn3fksh', text: '19. Real-Time Use Case (Log Analysis)' },
    { id: 'h.b0vtxhvv1nzc', text: '20. Student Practice (Important)' },
    { id: 'h.2s1s0w2dndow', text: 'AWK OPERATORS – COMPLETE LECTURE WITH OUTPUTS' },
    { id: 'h.uwapzt3g5kmv', text: 'Common Sample File (marks.txt)' },
    { id: 'h.4mxc8ms9ael5', text: '1. Arithmetic Operators in AWK' },
    { id: 'h.ddau3lhxslsw', text: '2. Increment & Decrement Operators' },
    { id: 'h.tboie26bvyud', text: '3. Assignment Operators' },
    { id: 'h.gz62r0yinleb', text: '4. Relational Operators' },
    { id: 'h.9m73aenz2a6v', text: '5. Logical Operators' },
    { id: 'h.6k2uohhk273s', text: '6. Ternary Operator' },
    { id: 'h.serhrx1kkmgd', text: '7. Exponential Operator (^ or **)' },
    { id: 'h.8rdeh2k9u0l2', text: '8. Combined Operator Example (Real Life)' },
    { id: 'h.1kjov1bu1cx9', text: '9. Key Points for Students' },
    { id: 'h.yk7wdkqjn8e9', text: 'DECISION MAKING STATEMENTS IN AWK' },
    { id: 'h.11wx4ktu2e74', text: 'Sample Input File (student.txt)' },
    { id: 'h.pl7rnddyvgb5', text: '1. IF Statement in AWK' },
    { id: 'h.a5ic346v9n1m', text: '2. IF–ELSE Statement' },
    { id: 'h.u4edjdkk7yjx', text: '3. IF – ELSE IF – ELSE Statement' },
    { id: 'h.xu5z6srx88mx', text: '4. Decision Making Using Logical Operators' },
    { id: 'h.uay1r8bw72jn', text: '5. Nested IF (IF inside IF)' },
    { id: 'h.hc8j5ex99v2s', text: '6. Ternary Operator (Short Decision Making)' },
    { id: 'h.3dxfoph4oxfb', text: '7. Decision Making in BEGIN and END Blocks' },
    { id: 'h.y4wjqnbdoq2m', text: '8. Real-Time Example (Total Pass Count)' },
    { id: 'h.s2mezjb92r2w', text: 'KEY NOTES FOR STUDENTS' },
    { id: 'h.nvq870q129lo', text: 'AWK LOOPS & LOOP CONTROL STATEMENTS' },
    { id: 'h.f6i2aphiobyv', text: 'Sample Input File (marks.txt)' },
    { id: 'h.jf7c5let4cxd', text: '1. WHILE LOOP' },
    { id: 'h.z4zantv05bub', text: '2. DO–WHILE LOOP' },
    { id: 'h.z6snqohc6k3p', text: '3. FOR LOOP' },
    { id: 'h.7yz45k5k78jq', text: '4. FOR LOOP WITH ARRAYS' },
    { id: 'h.yp7ci81ekdf1', text: '5. LOOP CONTROL STATEMENTS' },
    { id: 'h.csqc1puyftqr', text: '5.1 BREAK STATEMENT' },
    { id: 'h.453sl96lhv1n', text: '5.2 CONTINUE STATEMENT' },
    { id: 'h.9ewnojpgy9sk', text: '5.3 NEXT STATEMENT' },
    { id: 'h.5x2p1ttubet4', text: '5.4 EXIT STATEMENT' },
    { id: 'h.lcekvj4fdh48', text: '6. REAL-TIME COMBINED EXAMPLE' },
    { id: 'h.clvbwqdy6yc6', text: 'IMPORTANT DIFFERENCES' },
    { id: 'h.25k63kty3n8q', text: '🎯 STUDENT TAKEAWAY' },
    { id: 'h.5e40sbft13n1', text: 'MAKEFILE – COMPLETE EXPLANATION (LECTURE STYLE)' },
    { id: 'h.anozpmorwiq7', text: '1. What is a Makefile?' },
    { id: 'h.wnipw5qe8i3j', text: '2. Why Do We Need a Makefile?' },
    { id: 'h.sqn7ge1b9lyg', text: '3. Where Makefile is Used in Industry' },
    { id: 'h.lhfc0d87mw', text: '4. What is make Command?' },
    { id: 'h.egfrjdje0jkt', text: '5. Basic Structure of a Makefile' },
    { id: 'h.958l3ebv7hbm', text: '6. First Simple Example (Beginner)' },
    { id: 'h.eg9robi44j08', text: '7. How Makefile Works (Internally)' },
    { id: 'h.ey87t4v0ypiw', text: '8. Multiple Files Example (Real Industry Style)' },
    { id: 'h.9aibibqm3zuk', text: 'Makefile (Without Variables)' },
    { id: 'h.bpb151ujq8ca', text: '9. Using Variables (Professional Way)' },
    { id: 'h.jaljv6jqfi0l', text: '10. Automatic Variables (Important for Interviews)' },
    { id: 'h.ueiiuz8gwlzw', text: '11. PHONY Targets (Industry Standard)' },
    { id: 'h.sdu1izd0e0f2', text: '12. Complete Industry-Level Makefile' },
    { id: 'h.z107gc7ddrjz', text: '13. Real Industry Workflow' },
    { id: 'h.vdzfgatdpp9r', text: '14. Common Mistakes (Students Should Know)' },
    { id: 'h.j5jrzei1ta7m', text: '15. Makefile Interview Questions' },
    { id: 'h.nou6y48ers5k', text: '17. Student Summary' },
  ];

  const tclHeadings = [
    { id: 'h.oouxwmttz0p8', text: 'INTRODUCTION TO TCL (Tool Command Language)' },
    { id: 'h.jhu2pnsvuroc', text: '1. What is TCL?' },
    { id: 'h.scjb86hdx8l1', text: '2. Why TCL is Popular (Key Features)' },
    { id: 'h.g9s1slybclx1', text: '3. Real-Time Applications of TCL' },
    { id: 'h.k7363xqjrdaq', text: '4. Basic Structure of a TCL Script' },
    { id: 'h.u35i33nbp3x8', text: '5. TCL Variables' },
    { id: 'h.sz2u4afbb0w', text: '6. How to Set a Variable (set command)' },
    { id: 'h.ejgt21bmzq77', text: '7. Variable Substitution in TCL' },
    { id: 'h.oca9bpjw5lev', text: '8. Variable Substitution ($) – Deep Explanation' },
    { id: 'h.r8wwbkdmftme', text: '9. Command Substitution ([ ]) – VERY IMPORTANT' },
    { id: 'h.q91ufg7l1qh5', text: '10. expr Command (Arithmetic in TCL)' },
    { id: 'h.l3uk4rszedb2', text: '11. Difference Between {} and "" in TCL' },
    { id: 'h.v09h6mp2ipso', text: '12. Backslash Substitution (\)' },
    { id: 'h.4bolwievgg6n', text: '13. Real-Time Example (Automation Script)' },
    { id: 'h.2cf43sihbnrc', text: '14. Common Mistakes Students Make' },
    { id: 'h.qi15h7dr1ink', text: '15. TCL Summary (Exam + Industry)' },
    { id: 'h.nru52btdsvvx', text: 'Commands Covered' },
    { id: 'h.ic7g814n8x2f', text: '1. puts Command' },
    { id: 'h.gai1oh94aiwo', text: 'What is puts?' },
    { id: 'h.b3hqy2p8py8r', text: 'Syntax' },
    { id: 'h.plwd5fhtlup9', text: 'Example 1: Simple Output' },
    { id: 'h.z892j8swt1u5', text: 'Example 2: Printing Variable' },
    { id: 'h.95b1z15x97rw', text: 'Example 3: With Variable Substitution' },
    { id: 'h.v22detwuchzb', text: 'Example 4: Without New Line' },
    { id: 'h.45mnengg5o61', text: '2. gets Command' },
    { id: 'h.7940i65nfrzq', text: 'What is gets?' },
    { id: 'h.tyccuy2h6dpt', text: 'Syntax' },
    { id: 'h.k6zgqupo55wo', text: 'Example 1: Basic Input' },
    { id: 'h.8lkn9gutykw5', text: 'Example 2: Input and Arithmetic' },
    { id: 'h.h03zb8wxpc9v', text: 'Example 3: Input Validation Style' },
    { id: 'h.vbhr53ugvb2j', text: '3. split Command' },
    { id: 'h.3d1nn7j1vcrc', text: 'What is split?' },
    { id: 'h.vjotcz3x4rqj', text: 'Syntax' },
    { id: 'h.dxyjbewp6w0g', text: 'Example 1: Split by Space' },
    { id: 'h.f6g6czs835n6', text: 'Example 2: Split by Comma' },
    { id: 'h.u003an3w5vkl', text: 'Example 3: Access Split Values' },
    { id: 'h.770romzwpbn', text: '4. join Command' },
    { id: 'h.4u2eo7w3fro9', text: 'What is join?' },
    { id: 'h.nzyfug4iy6ia', text: 'Syntax' },
    { id: 'h.v1djluxh7oyg', text: 'Example 1: Join with Space' },
    { id: 'h.t068tqyrxf44', text: 'Example 2: Join with Comma' },
    { id: 'h.djkeqj2c9vo4', text: 'Example 3: File Path Example' },
    { id: 'h.qrajc0qofbbd', text: '5. expr Command (MOST IMPORTANT)' },
    { id: 'h.s3ll3v5ndt8b', text: 'Syntax' },
    { id: 'h.jpl2gt2kwcdg', text: '5.1 Arithmetic Operators' },
    { id: 'h.97mohfhvjicz', text: '5.2 Relational Operators' },
    { id: 'h.kubpfw2konaf', text: '5.3 Logical Operators' },
    { id: 'h.h5pa0lrtcgc4', text: '6. Real-Time Example (Decision Making Base)' },
    { id: 'h.rr8xpmyhd9t5', text: '7. Summary Table (Quick Revision)' },
    { id: 'h.swxbsnv7fquj', text: 'TCL MATH FUNCTIONS – COMPLETE & DEEP EXPLANATION' },
    { id: 'h.5xy0971nzinc', text: 'General Rule' },
    { id: 'h.irtcezr6d17g', text: '1. abs() – Absolute Value' },
    { id: 'h.deqp6dj74hqh', text: 'What is abs()?' },
    { id: 'h.cqauwnljri7g', text: '2. ceil() – Ceiling Value' },
    { id: 'h.e7c9rrf28j80', text: 'What is ceil()?' },
    { id: 'h.izolx9xp5h5x', text: '3. floor() – Floor Value' },
    { id: 'h.7p8skcc0b3v3', text: 'What is floor()?' },
    { id: 'h.aufxt8iwv4rw', text: '4. double() – Convert to Floating Point' },
    { id: 'h.prx6lqsxw7qz', text: 'What is double()?' },
    { id: 'h.9evozz33eb16', text: '5. int() – Convert to Integer' },
    { id: 'h.7zchbxz4q4d5', text: 'What is int()?' },
    { id: 'h.b66n20rznw07', text: '6. min() – Minimum Value' },
    { id: 'h.wpsjhfbr0rlb', text: 'What is min()?' },
    { id: 'h.opqbe7np0yn1', text: '7. max() – Maximum Value' },
    { id: 'h.nz6nhht3p3b6', text: 'What is max()?' },
    { id: 'h.9ffgg3c059ym', text: '8. pow() – Power Function' },
    { id: 'h.goskosjwwody', text: 'What is pow()?' },
    { id: 'h.ff8gri4o7xi8', text: '9. Combined Example (Real-Time Script)' },
    { id: 'h.1lm93oa9a0md', text: '10. Quick Reference Table' },
    { id: 'h.gj9lb09yz6gr', text: 'TCL LISTS – COMPLETE & IN-DEPTH EXPLANATION' },
    { id: 'h.p7yt048xhmwc', text: '1. What is a List in TCL?' },
    { id: 'h.ogugzbchcs9c', text: '2. llength – Length of List' },
    { id: 'h.gwce2p7yzfrh', text: 'What is llength?' },
    { id: 'h.3fa3fkwy0oc2', text: '3. lindex – Access Element by Index' },
    { id: 'h.m9lu2swc3xo8', text: 'What is lindex?' },
    { id: 'h.5azomovi077w', text: '4. lappend – Add Element to List' },
    { id: 'h.nejvlotaaal4', text: 'What is lappend?' },
    { id: 'h.j4xjrdxshua4', text: '5. lset – Modify List Element' },
    { id: 'h.7q16e48p9dvb', text: 'What is lset?' },
    { id: 'h.nmpl2uifecle', text: '6. lsort – Sort a List' },
    { id: 'h.en06mu7ag6kx', text: 'What is lsort?' },
    { id: 'h.6rgyzkblfvs4', text: '7. lsearch – Search Element in List' },
    { id: 'h.3zb3qm8r7z7c', text: 'What is lsearch?' },
    { id: 'h.7kk991rtb43s', text: '8. Combined Real-Time Example' },
    { id: 'h.do9d8t4zanlg', text: '9. Quick Summary Table' },
    { id: 'h.h48m1e8jyyv6', text: 'TCL LOOPS – COMPLETE & IN-DEPTH EXPLANATION' },
    { id: 'h.99rpp1s6ix5', text: '1. What is a Loop?' },
    { id: 'h.ihkmgfl4oamg', text: 'Types of Loops in TCL' },
    { id: 'h.bcjxy5pi9y6s', text: '2. FOR LOOP' },
    { id: 'h.2xyyw2gvlk3c', text: 'Syntax' },
    { id: 'h.225rxvv9rtmj', text: 'How for loop works' },
    { id: 'h.4hgziegvag6', text: 'Example 1: Print numbers 1 to 5' },
    { id: 'h.m3csva6nh5v9', text: 'Example 2: Print even numbers' },
    { id: 'h.6attfwoyfhcr', text: 'Example 3: Table of 5' },
    { id: 'h.2apc2nfkzlrt', text: 'Example 4: Real-time Script (File creation)' },
    { id: 'h.8ddjt9bb9ooo', text: '3. WHILE LOOP' },
    { id: 'h.gsiocl8vy72b', text: 'Syntax' },
    { id: 'h.ricenie520ga', text: 'How while loop works' },
    { id: 'h.t5wbpsz7dv1b', text: 'Example 1: Print numbers 1 to 5' },
    { id: 'h.wmkhedrxgm47', text: 'Example 2: Countdown' },
    { id: 'h.vamm8ia77a6i', text: 'Example 3: Sum of numbers' },
    { id: 'h.8hccw4hbil29', text: 'Real-time Use' },
    { id: 'h.1wj6alnmrnxw', text: '4. FOREACH LOOP (MOST IMPORTANT)' },
    { id: 'h.901t86qogxdv', text: 'Syntax' },
    { id: 'h.ce4jrcl37t47', text: 'Why foreach is powerful' },
    { id: 'h.4a9e7whh0vgq', text: 'Example 1: Print list elements' },
    { id: 'h.rimp2seazvuj', text: 'Example 2: Sum of list values' },
    { id: 'h.7yrsqxu6q17m', text: 'Example 3: Index + Value' },
    { id: 'h.4ch7oueqli16', text: 'Example 4: Multiple variables' },
    { id: 'h.td1x13x027hu', text: 'Example 5: Nested foreach' },
    { id: 'h.oh6dsvt2bkx5', text: '5. SAME APPLICATION USING DIFFERENT LOOPS' },
    { id: 'h.hde5iu7r0pd0', text: '6. Loop Control Commands' },
    { id: 'h.mkmuyh6mp02h', text: 'break – Exit loop' },
    { id: 'h.rnl21yx162c', text: 'continue – Skip iteration' },
    { id: 'h.h3vo0kvpbd52', text: '7. Real-Time Industry Script Example' },
    { id: 'h.521ebo74pb3b', text: '8. Quick Comparison Table' },
    { id: 'h.8o3wkqd731bo', text: 'TCL LOOP CONTROL STATEMENTS' },
    { id: 'h.bb94itkve4t2', text: '1. break Statement' },
    { id: 'h.qgvn8q8lker0', text: '2. continue Statement' },
    { id: 'h.u4thigpi7eih', text: '3. Difference Between break and continue' },
    { id: 'h.1nnu3acasjlf', text: 'DECISION MAKING IN TCL' },
    { id: 'h.sbaofho5c9aj', text: '1. if Statement' },
    { id: 'h.n7zv4xpgbtln', text: '2. if … else Statement' },
    { id: 'h.aqytrgl07brx', text: '3. if … elseif … else Statement' },
    { id: 'h.7dth3l662xlh', text: '4. switch Statement' },
    { id: 'h.44kxdi3s8cm1', text: 'Comparison: if vs switch' },
    { id: 'h.95v54kwv888d', text: 'Final Summary for Students' },
    { id: 'h.2mas1btaq5jr', text: 'TCL PROCEDURES (proc)' },
    { id: 'h.u718lldc1gt1', text: '1. What is a Procedure (proc) in TCL?' },
    { id: 'h.pt7kpp7841b1', text: '2. Why Procedures Are Used (Industry View)' },
    { id: 'h.xd45nzmfzi3e', text: '3. Basic Syntax of proc' },
    { id: 'h.b5rqa8n5ye0d', text: '4. Script 1: Simple Procedure (No Arguments)' },
    { id: 'h.bdq9nfl36t2h', text: '5. Script 2: Procedure with One Argument' },
    { id: 'h.jazemwb3ja3a', text: '6. Script 3: Procedure with Multiple Arguments' },
    { id: 'h.3f6lve2qgl9g', text: '7. Script 4: Procedure with Return Value' },
    { id: 'h.140cxhc4cq29', text: '8. Script 5: Real-Time File Check Procedure' },
    { id: 'h.9a8bk4gay0vk', text: '9. Script 6: Procedure with Default Arguments' },
    { id: 'h.syj91p3zazs', text: '10. Script 7: Industrial Logging Procedure' },
    { id: 'h.6sti1rbb366o', text: '11. Script 8: Mathematical Utility Procedure' },
    { id: 'h.7v8e1aemxii9', text: '12. Script 9: Loop Inside Procedure' },
    { id: 'h.queswycptnmx', text: '13. Script 10: Real Industrial Automation Script' },
    { id: 'h.52szm1kujmxw', text: '14. Important Industry Rules for proc' },
    { id: 'h.y5aophoblkvx', text: '15. Common Mistakes Students Make' },
    { id: 'h.ybrqj24pf2t8', text: 'Final Student Summary' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.moduleLayout}>
      <div className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          <div className={styles.navSection}>
            <h2 className={styles.navTitle}>Linux - Topics Covered</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllLinux ? linuxHeadings : linuxHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {linuxHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllLinux(!showAllLinux)} 
                className={styles.seeMoreBtn}
              >
                {showAllLinux ? 'See Less' : 'See More'}
              </button>
            )}
          </div>

          <div className={styles.navSection}>
            <h2 className={styles.navTitle}>TCL - Topics Covered</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllTcl ? tclHeadings : tclHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {tclHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllTcl(!showAllTcl)} 
                className={styles.seeMoreBtn}
              >
                {showAllTcl ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentCard}>
          <h1 id="h.hb89eod6gcxs" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">Introduction to Linux Operating System</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.sn2ibi9dtku8" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. What is an Operating System (OS)?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `An Operating System is a system software that acts as an interface between the user and the computer hardware.` }} />
          <h3 id="h.h0yzhhdqimur" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Main functions of an Operating System</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Controls and manages hardware (CPU, memory, disk, I/O devices)<br></span></li><li class="c10 li-bullet-0"><span class="c0">Allows users to run applications<br></span></li><li class="c10 li-bullet-0"><span class="c0">Manages files and folders<br></span></li><li class="c10 li-bullet-0"><span class="c0">Provides security and access control<br></span></li>` }} />
          <h3 id="h.att4dtyxpze2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Without Operating System</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Computer cannot work<br></span></li><li class="c10 li-bullet-0"><span class="c0">User cannot interact with hardware directly<br></span></li>` }} />
          <h3 id="h.yg6g6r6yews3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Examples of Operating Systems</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Windows<br></span></li><li class="c10 li-bullet-0"><span class="c0">Linux<br></span></li><li class="c10 li-bullet-0"><span class="c0">macOS<br></span></li><li class="c10 li-bullet-0"><span class="c0">Android<br></span></li><li class="c10 li-bullet-0"><span class="c0">iOS<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image5.png" alt="Graphic showing Open Source collaborative development model" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.s93gvw1sorqy" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. What is Linux?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux is a free and open-source operating system based on UNIX principles.` }} />
          <h3 id="h.tsxubnwjywd1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Key points about Linux</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Developed by </span><span class="c22 c19">Linus Torvalds (1991)<br></span></li><li class="c10 li-bullet-0"><span class="c0">Open source (source code is freely available)<br></span></li><li class="c10 li-bullet-0"><span class="c0">Highly secure and stable<br></span></li><li class="c10 li-bullet-0"><span class="c0">Used in servers, mobiles, supercomputers, cloud, and embedded systems<br></span></li>` }} />
          <h3 id="h.9kx37kd2x0i9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Where Linux is used</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Servers (Google, Amazon, Facebook)<br></span></li><li class="c10 li-bullet-0"><span class="c0">Mobile phones (Android)<br></span></li><li class="c10 li-bullet-0"><span class="c0">Cloud platforms<br></span></li><li class="c10 li-bullet-0"><span class="c0">Cybersecurity tools<br></span></li><li class="c10 li-bullet-0"><span class="c0">Programming and development<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image19.png" alt="Application layer in the Linux ecosystem" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.3asoicers4jr" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. Why Do We Need an Operating System?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Operating systems are required because:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Hardware understands only </span><span class="c22 c19">binary (0s and 1s)<br></span></li><li class="c10 li-bullet-0"><span>Users understand </span><span class="c22 c19">commands and applications<br></span></li><li class="c10 li-bullet-0"><span class="c0">OS converts user instructions into hardware operations<br></span></li>` }} />
          <h3 id="h.46ljfxvulmqu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Roles of OS</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c83" colspan="1" rowspan="1"><p class="c13"><span class="c19">User</span></p></td><td class="c23" colspan="1" rowspan="1"><p class="c13"><span class="c19">OS</span></p></td><td class="c29" colspan="1" rowspan="1"><p class="c13"><span class="c19">Hardware</span></p></td></tr><tr class="c5"><td class="c83" colspan="1" rowspan="1"><p class="c3"><span class="c0">Gives command</span></p></td><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c0">Translates</span></p></td><td class="c29" colspan="1" rowspan="1"><p class="c3"><span class="c0">Executes</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image16.png" alt="Conceptual diagram of Linux security and stability architecture" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.4t91rgkq0o1u" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">4. Components of Linux Operating System</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux operating system consists of three main components:` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Kernel<br></span></li><li class="c10 li-bullet-0"><span class="c0">Shell<br></span></li><li class="c10 li-bullet-0"><span class="c0">Utilities / Applications<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image13.png" alt="User interaction with the Linux Shell interface" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.pn2r3zidwgwi" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5. What is Kernel?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `The Kernel is the core (heart) of the operating system.` }} />
          <h3 id="h.nbxphirilsxj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Definition</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Kernel is the central program that directly interacts with hardware and manages system resources.` }} />
          <h3 id="h.4f59r7d7d714" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Functions of Kernel</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Process management (CPU scheduling)<br></span></li><li class="c10 li-bullet-0"><span class="c0">Memory management<br></span></li><li class="c10 li-bullet-0"><span class="c0">Device management<br></span></li><li class="c10 li-bullet-0"><span class="c0">File system management<br></span></li><li class="c10 li-bullet-0"><span class="c0">System call handling<br></span></li>` }} />
          <h3 id="h.omf8iop0aymr" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Important Point</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `User cannot directly access hardware  Kernel controls all hardware access` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image11.png" alt="Diagram of multi-user and multi-tasking capabilities in Linux" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.m9sogcs2pfhc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6. Why Kernel is Important?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Without kernel:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">No memory management<br></span></li><li class="c10 li-bullet-0"><span class="c0">No multitasking<br></span></li><li class="c10 li-bullet-0"><span class="c0">No device communication<br></span></li><li class="c10 li-bullet-0"><span class="c0">System will crash<br></span></li>` }} />
          <h3 id="h.4xno7pi8gai2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Types of Kernels</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Monolithic Kernel (Linux)<br></span></li><li class="c10 li-bullet-0"><span class="c0">Microkernel<br></span></li><li class="c10 li-bullet-0"><span class="c0">Hybrid Kernel<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image18.png" alt="Illustration of Linux operating system versatility across devices" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.pbfoiul0oboo" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">7. What is Shell?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `The Shell is a command interpreter that acts as an interface between user and kernel.` }} />
          <h3 id="h.chft0q1z37ve" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Definition</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Shell is a program that takes user commands, interprets them, and sends them to the kernel for execution.` }} />
          <h3 id="h.nrhqgeyl0nph" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Shell works like a translator</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">User → Shell → Kernel → Hardware<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image17.png" alt="Community support network illustration for Linux" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.x03q0jlxhof2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c19 c27">8. Types of Shells in Linux</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c70" colspan="1" rowspan="1"><p class="c13"><span class="c19">Shell Name</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c13"><span class="c19">Description</span></p></td></tr><tr class="c5"><td class="c70" colspan="1" rowspan="1"><p class="c3"><span class="c0">Bash</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c3"><span class="c0">Most common shell</span></p></td></tr><tr class="c5"><td class="c70" colspan="1" rowspan="1"><p class="c3"><span class="c0">Sh</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c3"><span class="c0">Bourne Shell</span></p></td></tr><tr class="c5"><td class="c70" colspan="1" rowspan="1"><p class="c3"><span class="c0">Zsh</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c3"><span class="c0">Advanced shell</span></p></td></tr><tr class="c5"><td class="c70" colspan="1" rowspan="1"><p class="c3"><span class="c0">Fish</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c3"><span class="c0">User-friendly shell</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image1.png" alt="Free and open source software logo" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.mgklsnd7c2bv" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">9. Why Do We Use Shell in Linux?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Shell is used because:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Faster than GUI<br></span></li><li class="c10 li-bullet-0"><span class="c0">Powerful scripting support<br></span></li><li class="c10 li-bullet-0"><span class="c0">Automates tasks<br></span></li><li class="c10 li-bullet-0"><span class="c0">Required for server administration<br></span></li>` }} />
          <h3 id="h.korm03ykj6xh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Command to list files:
ls` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image4.png" alt="Motivation graphic for learning Linux systems" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.3ouyihjkypm" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">10. Difference Between Kernel and Shell</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c68" colspan="1" rowspan="1"><p class="c13"><span class="c19">Kernel</span></p></td><td class="c71" colspan="1" rowspan="1"><p class="c13"><span class="c19">Shell</span></p></td></tr><tr class="c5"><td class="c68" colspan="1" rowspan="1"><p class="c3"><span class="c0">Core of OS</span></p></td><td class="c71" colspan="1" rowspan="1"><p class="c3"><span class="c0">Interface to OS</span></p></td></tr><tr class="c5"><td class="c68" colspan="1" rowspan="1"><p class="c3"><span class="c0">Manages hardware</span></p></td><td class="c71" colspan="1" rowspan="1"><p class="c3"><span class="c0">Takes user commands</span></p></td></tr><tr class="c5"><td class="c68" colspan="1" rowspan="1"><p class="c3"><span class="c0">Runs in background</span></p></td><td class="c71" colspan="1" rowspan="1"><p class="c3"><span class="c0">User interacts with it</span></p></td></tr><tr class="c5"><td class="c68" colspan="1" rowspan="1"><p class="c3"><span class="c0">Cannot be replaced easily</span></p></td><td class="c71" colspan="1" rowspan="1"><p class="c3"><span class="c0">Can be changed</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image7.png" alt="Career growth pathways in Linux and DevOps" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.ornv2ntuk3t7" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">11. Why Linux is Preferred?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Free and open source<br></span></li><li class="c10 li-bullet-0"><span class="c0">Secure and stable<br></span></li><li class="c10 li-bullet-0"><span class="c0">High performance<br></span></li><li class="c10 li-bullet-0"><span class="c0">Multiuser &amp; multitasking<br></span></li><li class="c10 li-bullet-0"><span class="c0">Used in real-world industry<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image12.png" alt="Graphic indicating system uptime without reboots" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.a3gh18h99nic" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">12. Summary (For Students)</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c19">OS</span><span class="c0"> connects user and hardware<br></span></li><li class="c10 li-bullet-0"><span class="c19">Linux</span><span class="c0"> is a free, open-source OS<br></span></li><li class="c10 li-bullet-0"><span class="c19">Kernel</span><span class="c0"> is the heart of Linux<br></span></li><li class="c10 li-bullet-0"><span class="c19">Shell</span><span class="c0"> is the command interface<br></span></li><li class="c10 li-bullet-0"><span class="c0">Linux is powerful, secure, and widely used<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.gz8l9gthkerx" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">One-Line Revision</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `“Linux = Kernel + Shell + Utilities”` }} />
          <h1 id="h.xxj5r6bwhnix" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">Linux File System &amp; Paths (With Commands Explained Clearly)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.yd3mh079lvip" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. What is a Path in Linux?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `A path is the location (address) of a file or folder inside the Linux system.
Just like:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c19">House address</span><span class="c0"> → helps you reach a house<br></span></li><li class="c10 li-bullet-0"><span class="c19">Linux path</span><span class="c0"> → helps Linux reach a file<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image10.png" alt="Industry usage statistics for Linux servers" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `2. Root Directory (/) – The Starting Point` }} />
          <h3 id="h.iob9ot8whuj6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">What is Root Directory?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Root directory is the </span><span class="c19">top-most folder</span><span class="c0"> in Linux<br></span></li><li class="c10 li-bullet-0"><span>Represented by </span><span class="c1">/<br></span></li><li class="c10 li-bullet-0"><span class="c0">All files and folders start from here<br></span></li>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Important
Linux has only one root directory` }} />
          <hr className={styles.divider} />
          <h3 id="h.d0ntwyvur23" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Real Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `/
Everything like /home, /bin, /etc comes under this.` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image20.png" alt="Icon representing the lightweight nature of Linux kernel" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.jjz8nnrzvxm7" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. Absolute Path (Full Address)</span>` }} />
          <h3 id="h.fa1jp5exf5vy" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">What is Absolute Path?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Path that starts from </span><span class="c19">root directory (</span><span class="c55 c19">/</span><span class="c22 c19">)<br></span></li><li class="c10 li-bullet-0"><span>Gives </span><span class="c22 c19">complete location<br></span></li><li class="c10 li-bullet-0"><span>Works from </span><span class="c22 c19">anywhere<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.t9rsjywcbjg8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Real Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `/home/student/Documents/notes.txt
This means:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Start from </span><span class="c1">/<br></span></li><li class="c10 li-bullet-0"><span>Go to </span><span class="c1">home<br></span></li><li class="c10 li-bullet-0"><span>Then </span><span class="c1">student<br></span></li><li class="c10 li-bullet-0"><span>Then </span><span class="c1">Documents<br></span></li><li class="c10 li-bullet-0"><span>Open </span><span class="c1">notes.txt<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.crki1f2anve8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">Command Used – </span><span class="c55 c56 c19">cd</span><span class="c17"> (Change Directory)</span>` }} />
          <h4 id="h.jbhpude0fn3z" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c19 c89">What </span><span class="c55 c19 c105">cd</span><span class="c22 c19"> does</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Moves you from one folder to another<br></span></li>` }} />
          <h4 id="h.rq26k5n48k7h" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c22 c19">Real Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cd /home/student/Documents
No matter where you are, Linux takes you to Documents` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image9.png" alt="The Kernel layer in Linux architecture" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.1cphh8b0bsdc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">4. Relative Path (Nearby Address)</span>` }} />
          <h3 id="h.s7e0ynddrfto" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">What is Relative Path?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Path based on </span><span class="c22 c19">current location<br></span></li><li class="c10 li-bullet-0"><span>Does </span><span class="c19">not start with </span><span class="c55 c19 c75">/<br></span></li><li class="c10 li-bullet-0"><span class="c0">Shorter and faster to type<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.qzsj33ez7dno" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Real Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Current directory:
/home/student
Relative path:
Documents/notes.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.rrbjjn4q2cao" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cd Documents
Linux understands: “Go inside Documents which is inside my current folder”` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image15.png" alt="System utilities and tools in Linux" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.cs0yt3wz18zq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5. pwd Command (Where Am I?)</span>` }} />
          <h3 id="h.j1vuuiokrtv0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">pwd</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c12">pwd</span><span> means </span><span class="c22 c19">Print Working Directory<br></span></li><li class="c10 li-bullet-0"><span>Shows </span><span class="c22 c19">current location<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.issuppxs6ds8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Why we use it</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">To avoid confusion<br></span></li><li class="c10 li-bullet-0"><span class="c0">To know exactly where we are<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.81lx9u3l2a2n" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `pwd
Output:
/home/student/Linux
Means you are inside Linux folder` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image3.png" alt="The Root directory (/) in Linux file hierarchy" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.ksvu87dz0obm" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6. ls Command (What is Inside?)</span>` }} />
          <h3 id="h.jfizzjez5vwf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">ls</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Lists files and folders in a directory<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.164fpbvf7hy4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Real-Life Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Like opening a bag to see what is inside` }} />
          <hr className={styles.divider} />
          <h3 id="h.dwqb8crlasn2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Examples</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls
Shows files in current folder
ls /home/student
Shows files inside student folder` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image21.png" alt="/bin directory containing essential binary executables" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.dszlvqhmnddo" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">7. cd Command (Move Between Folders)</span>` }} />
          <h3 id="h.ch14t3t5yo5l" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">cd</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Changes directory<br></span></li><li class="c10 li-bullet-0"><span class="c0">Helps move inside folders<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.rfarpb3o7vdi" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Examples</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Go to home directory:
cd /home/student
Go back one step:
cd ..
Go to home directly:
cd ~` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image2.png" alt="/sbin directory for system administrator binaries" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.bp5jz7cwo478" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">8. mkdir Command (Create Folder)</span>` }} />
          <h3 id="h.shu3vaq2v2fm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">mkdir</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Creates a new directory<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.365fr8oniam7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Real Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `mkdir LinuxNotes
A folder named LinuxNotes is created` }} />
          <hr className={styles.divider} />
          <h2 id="h.j2evlniefcge" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">9. rmdir Command (Delete Empty Folder)</span>` }} />
          <h3 id="h.jbf904ppqw0d" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">rmdir</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Deletes </span><span class="c19">empty</span><span class="c0"> directories only<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.3ak2eanzm967" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rmdir LinuxNotes` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image6.png" alt="/etc directory for system configuration files" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.qrdwjohagq76" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">10. Special Path Symbols (Very Important)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c13"><span class="c19">Symbol</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td><td class="c44" colspan="1" rowspan="1"><p class="c13"><span class="c19">Example</span></p></td></tr><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">/</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c3"><span class="c0">Root directory</span></p></td><td class="c44" colspan="1" rowspan="1"><p class="c3"><span class="c12">/home</span></p></td></tr><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">.</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c3"><span class="c0">Current directory</span></p></td><td class="c44" colspan="1" rowspan="1"><p class="c3"><span class="c12">./file.txt</span></p></td></tr><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">..</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c3"><span class="c0">Parent directory</span></p></td><td class="c44" colspan="1" rowspan="1"><p class="c3"><span class="c12">cd ..</span></p></td></tr><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">~</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c3"><span class="c0">Home directory</span></p></td><td class="c44" colspan="1" rowspan="1"><p class="c3"><span class="c12">cd ~</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image8.png" alt="/home directory structure for user files" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.2egsj5bt0wvk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">11. Home Directory (</span><span class="c55 c38 c19">~</span><span class="c27 c19">)</span>` }} />
          <h3 id="h.8ibjcbvbc5hc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">What is Home Directory?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Personal space for each user<br></span></li><li class="c10 li-bullet-0"><span class="c0">Stores documents, downloads, files<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.cy6gcnoi1662" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `/home/student
Shortcut:
~` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image14.png" alt="/root home directory for the superuser" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.365b1dx9gj1b" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">12. Practical Real Example (Lab Style)</span>` }} />
          <h3 id="h.af1tnk6hpmtc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Step 1: Check location</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `pwd` }} />
          <h3 id="h.fypuis1r4y1x" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Step 2: Create folder</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `mkdir LinuxClass` }} />
          <h3 id="h.a9lcknunfe0g" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Step 3: Enter folder</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cd LinuxClass` }} />
          <h3 id="h.tos7f5d1z1ib" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Step 4: Verify</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `pwd
Output:
/home/student/LinuxClass` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module4/image22.png" alt="/var directory for variable data like logs and spool files" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.djrl5as3ld2q" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">13. Student Revision Summary</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c12">pwd</span><span class="c0"> → Where am I?<br></span></li><li class="c10 li-bullet-0"><span class="c12">ls</span><span class="c0"> → What is inside?<br></span></li><li class="c10 li-bullet-0"><span class="c12">cd</span><span class="c0"> → Move folders<br></span></li><li class="c10 li-bullet-0"><span class="c12">mkdir</span><span class="c0"> → Create folder<br></span></li><li class="c10 li-bullet-0"><span class="c0">Absolute path → Full address<br></span></li><li class="c10 li-bullet-0"><span class="c0">Relative path → Nearby address<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.jba9q1usgwn3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Final One-Line Understanding</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux paths are addresses, and commands help us move, see, and manage those a
LINUX FILE &amp; DIRECTORY COMMANDS – DETAILED LECTURE NOTES` }} />
          <hr className={styles.divider} />
          <h2 id="h.lzpe0wqu1flc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. pwd – Present Working Directory</span>` }} />
          <h3 id="h.9byeoed2iw3t" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">pwd</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `pwd shows where you are currently working in the Linux file system.
Linux is hierarchical (tree structure). If you don’t know your location, you may work on the wrong files.` }} />
          <hr className={styles.divider} />
          <h3 id="h.6cfqw290bk00" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `pwd
Output:
/home/student
Means: You are inside the student directory.` }} />
          <hr className={styles.divider} />
          <h3 id="h.i3u33xt4ztuk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cd Documents
pwd
First you move into Documents  Then pwd confirms your new location` }} />
          <hr className={styles.divider} />
          <h3 id="h.v0bkgtwj75t9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cd /
pwd
Shows root directory /` }} />
          <hr className={styles.divider} />
          <h2 id="h.lcdvumf3h42e" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. ls – List Directory Contents</span>` }} />
          <h3 id="h.tkxywigzmhoq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">ls</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Used to see files and directories inside a folder.` }} />
          <hr className={styles.divider} />
          <h3 id="h.q4hi2pnpvk4n" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1 (Basic)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls
Shows only names of files &amp; folders` }} />
          <hr className={styles.divider} />
          <h3 id="h.6nuwhgjmahge" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2 (Detailed view)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls -l
Shows:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Permissions<br></span></li><li class="c10 li-bullet-0"><span class="c0">Owner<br></span></li><li class="c10 li-bullet-0"><span class="c0">Size<br></span></li><li class="c10 li-bullet-0"><span class="c0">Date<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.1sa2y7fxst4e" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3 (Hidden files)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls -a
Shows hidden files like .bashrc` }} />
          <hr className={styles.divider} />
          <h3 id="h.yzuv68pyjoql" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 4 (Human readable size)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls -lh
File size shown in KB, MB instead of bytes` }} />
          <hr className={styles.divider} />
          <h2 id="h.8dzqnd9dty4u" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. cd – Change Directory</span>` }} />
          <h3 id="h.jj96apwliacu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">cd</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Used to move between directories.` }} />
          <hr className={styles.divider} />
          <h3 id="h.bfvzl2u1t31l" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cd Downloads
Moves into Downloads folder` }} />
          <hr className={styles.divider} />
          <h3 id="h.d9nh8ntin6ho" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cd ..
Moves one level up (parent directory)` }} />
          <hr className={styles.divider} />
          <h3 id="h.7yxk68smopgs" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cd ~
Moves directly to home directory` }} />
          <hr className={styles.divider} />
          <h2 id="h.z7ng0ouyci0c" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">4. mkdir – Make Directory</span>` }} />
          <h3 id="h.rtuf5k4tw5pv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">mkdir</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Used to create new directories.` }} />
          <hr className={styles.divider} />
          <h3 id="h.v379p4zb6h30" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `mkdir Linux
Creates a folder named Linux` }} />
          <hr className={styles.divider} />
          <h3 id="h.4ranlaow890q" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `mkdir Class1 Class2
Creates multiple directories at once` }} />
          <hr className={styles.divider} />
          <h3 id="h.h9jqyn18z08x" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3 (Nested directories)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `mkdir -p Linux/Notes/Day1
Creates parent &amp; child directories together` }} />
          <hr className={styles.divider} />
          <h2 id="h.ifp99fi1j1e2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5. rmdir – Remove Empty Directory</span>` }} />
          <h3 id="h.eomit9tovxfg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">rmdir</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Deletes empty directories only.` }} />
          <hr className={styles.divider} />
          <h3 id="h.swih8dkmpffb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rmdir Test
Deletes Test if empty` }} />
          <hr className={styles.divider} />
          <h3 id="h.ktcp34x7ckkq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rmdir Dir1 Dir2
Deletes multiple empty directories` }} />
          <hr className={styles.divider} />
          <h3 id="h.yuvp74xff21t" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3 (Fails if not empty)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rmdir Linux
Error if Linux contains files` }} />
          <hr className={styles.divider} />
          <h2 id="h.l3pohtvlzb3e" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6. touch – Create File / Update Time</span>` }} />
          <h3 id="h.tentlskb7mua" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c19 c56">touch</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Creates empty files or updates timestamp.` }} />
          <hr className={styles.divider} />
          <h3 id="h.iba5uf5dmz1w" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `touch file.txt
Creates an empty text file` }} />
          <hr className={styles.divider} />
          <h3 id="h.b1vxhbl101mm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `touch a.txt b.txt c.txt
Creates multiple files` }} />
          <hr className={styles.divider} />
          <h3 id="h.6ivllxksh81b" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `touch oldfile.txt
Updates modification time if file exists` }} />
          <hr className={styles.divider} />
          <h2 id="h.4i21qgl0elep" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">7. cat – View File Content</span>` }} />
          <h3 id="h.v0rwsalo3q53" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">cat</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Displays entire content of a file.` }} />
          <hr className={styles.divider} />
          <h3 id="h.w6rpfdsx7v53" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cat file.txt
Shows full file content` }} />
          <hr className={styles.divider} />
          <h3 id="h.vqs6q6s4mxx9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cat file1.txt file2.txt
Displays both files together` }} />
          <hr className={styles.divider} />
          <h3 id="h.g5zibs932sla" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cat &gt; new.txt
Hello Linux
Ctrl+D
Creates file and writes content` }} />
          <hr className={styles.divider} />
          <h2 id="h.tdeypgpyowdl" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">8. less – View Large Files</span>` }} />
          <h3 id="h.aizv1tz487nx" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">less</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Used to read big files page by page.` }} />
          <hr className={styles.divider} />
          <h3 id="h.vtie81511w9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `less logfile.txt
Scroll using arrow keys` }} />
          <hr className={styles.divider} />
          <h3 id="h.j5gfjwm2q9qu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `less /etc/passwd
Safely read system files` }} />
          <hr className={styles.divider} />
          <h3 id="h.yx018cb1qgh8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ps aux | less
View output page by page` }} />
          <hr className={styles.divider} />
          <h2 id="h.ipnmxsqbf1kl" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">9. head – First Lines of File</span>` }} />
          <h3 id="h.aiqlcydzhidv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">head</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Shows top lines of a file.` }} />
          <hr className={styles.divider} />
          <h3 id="h.f70hw0cei6j5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `head file.txt
Shows first 10 lines` }} />
          <hr className={styles.divider} />
          <h3 id="h.dgkv47t12zoq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `head -5 file.txt
Shows first 5 lines` }} />
          <hr className={styles.divider} />
          <h3 id="h.snp2uk7spi1l" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `head /etc/passwd
Quickly view important file header` }} />
          <hr className={styles.divider} />
          <h2 id="h.v06b5nk955u2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">10. tail – Last Lines of File</span>` }} />
          <h3 id="h.b6ozbgam97ar" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">tail</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Shows last lines, mainly for logs.` }} />
          <hr className={styles.divider} />
          <h3 id="h.x2ogm8536eyi" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `tail file.txt
Shows last 10 lines` }} />
          <hr className={styles.divider} />
          <h3 id="h.vaz1mhlmz942" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `tail -5 file.txt
Shows last 5 lines` }} />
          <hr className={styles.divider} />
          <h3 id="h.li5uerlapve0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3 (Live monitoring)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `tail -f logfile.txt
Watches logs live` }} />
          <hr className={styles.divider} />
          <h2 id="h.7oorfrlrzc7h" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">11. cp – Copy Files &amp; Directories</span>` }} />
          <h3 id="h.r1hayjz65r8e" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">cp</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Copies files or directories.` }} />
          <hr className={styles.divider} />
          <h3 id="h.ai17zasiwz46" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cp a.txt b.txt
Copies a.txt to b.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.3vyclkez3xfp" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cp a.txt /home/student/
Copies file to another directory` }} />
          <hr className={styles.divider} />
          <h3 id="h.692utk64x5ug" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3 (Directory copy)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cp -r Dir1 Dir2
Copies entire directory` }} />
          <hr className={styles.divider} />
          <h2 id="h.mve0l3uu13ak" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">12. mv – Move / Rename</span>` }} />
          <h3 id="h.ghdae6yja6em" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">mv</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Used to move OR rename.` }} />
          <hr className={styles.divider} />
          <h3 id="h.lou6dch7xsbf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1 (Rename)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `mv old.txt new.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.wlz9vtnsjc01" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2 (Move)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `mv file.txt Documents/` }} />
          <hr className={styles.divider} />
          <h3 id="h.i575lcy83rl0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `mv *.txt Backup/
Moves all txt files` }} />
          <hr className={styles.divider} />
          <h2 id="h.5jgww1wjag7c" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">13. rm – Remove Files &amp; Directories</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `⚠ Dangerous command` }} />
          <hr className={styles.divider} />
          <h3 id="h.hot9pceefryn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rm file.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.c1c3ocptevjl" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rm -r Folder/
Deletes folder and content` }} />
          <hr className={styles.divider} />
          <h3 id="h.s3vvucurokrc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rm -f file.txt
Force delete without confirmation` }} />
          <hr className={styles.divider} />
          <h2 id="h.q6ljllw3214w" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">14. find – Search Files</span>` }} />
          <h3 id="h.w52hdaa4wd81" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c19 c35">What is </span><span class="c55 c56 c19">find</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Search files based on name, type, size.` }} />
          <hr className={styles.divider} />
          <h3 id="h.anp7hsm89esd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `find . -name file.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.4b25ghcvagyj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `find /home -type d
Finds directories` }} />
          <hr className={styles.divider} />
          <h3 id="h.emw5q0bm3e1r" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `find . -name "*.txt"
Finds all text files` }} />
          <hr className={styles.divider} />
          <h2 id="h.sar86bxvsbmi" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">15. grep – Search Inside Files</span>` }} />
          <h3 id="h.ii26aw24hwwc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">grep</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Search text inside files.` }} />
          <hr className={styles.divider} />
          <h3 id="h.ngjlyppk3mi4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep linux notes.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.qkd0fwzctydp" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep -i linux notes.txt
Case-insensitive search` }} />
          <hr className={styles.divider} />
          <h3 id="h.gbf7xie0wk0s" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls | grep txt
Filters output` }} />
          <hr className={styles.divider} />
          <h2 id="h.69rpind97kbo" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">16. which – Command Location</span>` }} />
          <h3 id="h.mne29va52bk2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">which</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Shows where command is installed.` }} />
          <hr className={styles.divider} />
          <h3 id="h.7k1ibyw5dwz1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `which ls` }} />
          <hr className={styles.divider} />
          <h3 id="h.cf0z8acdf2hg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `which bash` }} />
          <hr className={styles.divider} />
          <h3 id="h.uucj64g7ocw1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `which python` }} />
          <hr className={styles.divider} />
          <h2 id="h.5ztsnnwgslxj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">17. echo – Display Output</span>` }} />
          <h3 id="h.fyhmxs122aem" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">echo</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Prints text or variables.` }} />
          <hr className={styles.divider} />
          <h3 id="h.bdpyb84tur45" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `echo Hello Linux` }} />
          <hr className={styles.divider} />
          <h3 id="h.ysoajc1ep3ky" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `echo $SHELL` }} />
          <hr className={styles.divider} />
          <h3 id="h.8m8en0h7xp8b" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `echo "Today is Linux class"` }} />
          <hr className={styles.divider} />
          <h2 id="h.gvl8tl146pc0" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">FINAL STUDENT UNDERSTANDING FLOW</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1️⃣ Where am I? → pwd 2️⃣ What is here? → ls 3️⃣ Go somewhere → cd 4️⃣ Create → mkdir, touch 5️⃣ View → cat, less, head, tail 6️⃣ Copy/Move → cp, mv 7️⃣ Delete → rm 8️⃣ Search → find, grep 9️⃣ Know command → which` }} />
          <hr className={styles.divider} />
          <h1 id="h.mfeo5a1c4nlp" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">LINUX EDITORS – DETAILED LECTURE NOTES</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.w4ddpwwfrbr8" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. What is an Editor?</span>` }} />
          <h3 id="h.p7hvu1yf5c7o" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Definition:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `An editor is a software tool used to create, modify, and save text files.
In Linux:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Configuration files<br></span></li><li class="c10 li-bullet-0"><span class="c0">Program code<br></span></li><li class="c10 li-bullet-0"><span class="c0">Scripts<br></span></li><li class="c10 li-bullet-0"><span>Logs<br> are </span><span class="c19">text-based</span><span class="c0">, so editors are very important.<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.vxf4e8vgp5rf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Why Editors are Important in Linux?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Linux is </span><span class="c22 c19">command-line driven<br></span></li><li class="c10 li-bullet-0"><span>Almost everything is configured using </span><span class="c22 c19">text files<br></span></li><li class="c10 li-bullet-0"><span class="c0">Editors allow:<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c15 c26 li-bullet-0"><span class="c0">Editing system files<br></span></li><li class="c15 c26 li-bullet-0"><span class="c0">Writing shell scripts<br></span></li><li class="c15 c26 li-bullet-0"><span class="c0">Programming<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.h7d034q71mn8" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. Types of Editors in Linux</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux editors are mainly divided into two categories:` }} />
          <h3 id="h.hyydn76wqny5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">A. CLI Editors (Command Line Editors)</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Work inside terminal<br></span></li><li class="c10 li-bullet-0"><span class="c0">Lightweight<br></span></li><li class="c10 li-bullet-0"><span class="c0">Very powerful<br></span></li>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Examples:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c1">vi<br></span></li><li class="c10 li-bullet-0"><span class="c1">vim<br></span></li><li class="c10 li-bullet-0"><span class="c1">rvim<br></span></li><li class="c10 li-bullet-0"><span class="c1">nano<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.3uhiyk4pn4vw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">B. GUI Editors (Graphical Editors)</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Mouse-based<br></span></li><li class="c10 li-bullet-0"><span class="c0">Window interface<br></span></li>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Examples:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c1">gvim<br></span></li><li class="c10 li-bullet-0"><span class="c1">gedit<br></span></li><li class="c10 li-bullet-0"><span class="c1">kate<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.uy7b71us1t2w" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. Vi Editor</span>` }} />
          <h3 id="h.2pwpfnrr47u1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">vi</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Oldest and most basic Linux editor<br></span></li><li class="c10 li-bullet-0"><span>Available in </span><span class="c22 c19">almost all Linux systems<br></span></li><li class="c10 li-bullet-0"><span class="c0">Modal editor (works in modes)<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.gidziwnaq5lc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Characteristics:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Lightweight<br></span></li><li class="c10 li-bullet-0"><span class="c0">Keyboard-based<br></span></li><li class="c10 li-bullet-0"><span class="c0">Difficult for beginners<br></span></li><li class="c10 li-bullet-0"><span class="c0">Foundation for vim &amp; gvim<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ji334748b7da" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">4. Vim Editor</span>` }} />
          <h3 id="h.g6ylx95wensd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">vim</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `vim = Vi Improved` }} />
          <h3 id="h.vrqu09pky2n0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Advantages over vi:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Syntax highlighting<br></span></li><li class="c10 li-bullet-0"><span class="c0">Undo/Redo<br></span></li><li class="c10 li-bullet-0"><span class="c0">Plugins support<br></span></li><li class="c10 li-bullet-0"><span class="c0">Better search<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.25o5grykp9bx" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `vim file.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.a46h645qakok" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5. rvim Editor</span>` }} />
          <h3 id="h.mfrmdu729pg2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">rvim</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rvim = Restricted Vim` }} />
          <h3 id="h.fqj228kizddo" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Purpose:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Used for </span><span class="c22 c19">security<br></span></li><li class="c10 li-bullet-0"><span class="c0">Restricts:<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c15 c26 li-bullet-0"><span class="c0">Shell commands<br></span></li><li class="c15 c26 li-bullet-0"><span class="c0">File system access<br></span></li>` }} />
          <h3 id="h.8rnu77ds18sn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Usage:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rvim file.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.1v0uir9hp8qp" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6. GVIM Editor (MAIN FOCUS)</span>` }} />
          <h3 id="h.b089ucu7gha1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">What is GVIM?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `gvim = Graphical Vim` }} />
          <h3 id="h.drl2jr4x4z78" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Features:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">GUI-based vim<br></span></li><li class="c10 li-bullet-0"><span class="c0">Mouse support<br></span></li><li class="c10 li-bullet-0"><span class="c0">Menus &amp; toolbar<br></span></li><li class="c10 li-bullet-0"><span class="c0">Same power as vim + graphical interface<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.p7do6jsgczmk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Why GVIM is Best for Learning?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Easy for beginners  Visual support  Same commands as vim  Used in real-world development` }} />
          <hr className={styles.divider} />
          <h3 id="h.fpzt23269u6y" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command to Open GVIM:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `gvim file.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.tszekayo077v" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">7. GVIM MODES (VERY IMPORTANT)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `GVIM works using MODES.` }} />
          <h3 id="h.6xhkukskxcj4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Total Main Modes:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1️⃣ Normal Mode 2️⃣ Insert Mode 3️⃣ Visual Mode 4️⃣ Command-Line Mode 5️⃣ Replace Mode` }} />
          <hr className={styles.divider} />
          <h2 id="h.nbbog5j7w5l2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">8. Normal Mode (Default Mode)</span>` }} />
          <h3 id="h.75evgjz6f84u" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">What is Normal Mode?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Default mode when GVIM opens<br></span></li><li class="c10 li-bullet-0"><span class="c0">Used for:<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c15 c26 li-bullet-0"><span class="c0">Navigation<br></span></li><li class="c15 c26 li-bullet-0"><span class="c0">Copy, delete<br></span></li><li class="c15 c26 li-bullet-0"><span class="c0">Editing commands<br></span></li>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `🚫 Cannot type text directly` }} />
          <hr className={styles.divider} />
          <h3 id="h.ejb9mfl9gs0e" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Important Normal Mode Commands (Systematic Order)</span>` }} />
          <h4 id="h.ar8timhzljwd" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c22 c19">A. Cursor Movement</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c21" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">h</span></p></td><td class="c21" colspan="1" rowspan="1"><p class="c3"><span class="c0">Move left</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">l</span></p></td><td class="c21" colspan="1" rowspan="1"><p class="c3"><span class="c0">Move right</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">j</span></p></td><td class="c21" colspan="1" rowspan="1"><p class="c3"><span class="c0">Move down</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">k</span></p></td><td class="c21" colspan="1" rowspan="1"><p class="c3"><span class="c0">Move up</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h4 id="h.k6bo9bju18vt" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c22 c19">B. Word Movement</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c91" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">w</span></p></td><td class="c91" colspan="1" rowspan="1"><p class="c3"><span class="c0">Next word</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">b</span></p></td><td class="c91" colspan="1" rowspan="1"><p class="c3"><span class="c0">Previous word</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">e</span></p></td><td class="c91" colspan="1" rowspan="1"><p class="c3"><span class="c0">End of word</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h4 id="h.7hherc5usu2d" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c22 c19">C. Line Movement</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">0</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Start of line</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">$</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">End of line</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">gg</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">First line</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">G</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Last line</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h4 id="h.n06jjcnlywle" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c22 c19">D. Delete Commands</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c83" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">x</span></p></td><td class="c83" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete character</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">dd</span></p></td><td class="c83" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete line</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">dw</span></p></td><td class="c83" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete word</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">d$</span></p></td><td class="c83" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete till end</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h4 id="h.vxea7vxw41ek" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c19 c22">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux is powerful` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Cursor on "is"<br></span></li><li class="c10 li-bullet-0"><span>Press </span><span class="c12">dw</span><span class="c0"> → deletes "is"<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.acq6y3ypng1w" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">9. Insert Mode</span>` }} />
          <h3 id="h.mrgvyeqvyjb1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">What is Insert Mode?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Used to </span><span class="c22 c19">type text<br></span></li><li class="c10 li-bullet-0"><span class="c0">Similar to Notepad typing<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.l41z5sdd8vlq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Enter Insert Mode</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">i</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">Insert before cursor</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">I</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">Insert at line start</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">a</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">Insert after cursor</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">A</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">Insert at line end</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">o</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">New line below</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">O</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">New line above</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.1vtl47w5akeh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Exit Insert Mode</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ESC` }} />
          <hr className={styles.divider} />
          <h3 id="h.7b28jv4ffn1q" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Press </span><span class="c1">i<br></span></li><li class="c10 li-bullet-0"><span>Type: </span><span class="c1">Linux Editor<br></span></li><li class="c10 li-bullet-0"><span>Press </span><span class="c1">ESC<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.50iflzmvyhgk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">10. Visual Mode</span>` }} />
          <h3 id="h.ct7thq524rjx" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">What is Visual Mode?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Used to </span><span class="c22 c19">select text<br></span></li><li class="c10 li-bullet-0"><span class="c0">Similar to mouse selection<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.lbbiquk51vha" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Enter Visual Mode</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">v</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">Character selection</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">V</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">Line selection</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">Ctrl + v</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">Block selection</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.blblhl5usgag" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Visual Mode Operations</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c95" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">y</span></p></td><td class="c95" colspan="1" rowspan="1"><p class="c3"><span class="c0">Copy</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">d</span></p></td><td class="c95" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">&gt;</span></p></td><td class="c95" colspan="1" rowspan="1"><p class="c3"><span class="c0">Indent right</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">&lt;</span></p></td><td class="c95" colspan="1" rowspan="1"><p class="c3"><span class="c0">Indent left</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.dshadkgm1481" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Press </span><span class="c1">V<br></span></li><li class="c10 li-bullet-0"><span class="c0">Select lines<br></span></li><li class="c10 li-bullet-0"><span>Press </span><span class="c12">y</span><span class="c0"> → copied<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.s57ss84v9fsq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">11. Command-Line Mode</span>` }} />
          <h3 id="h.pfn4i4df5h0r" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">What is Command Mode?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Used to:<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c15 c26 li-bullet-0"><span class="c0">Save file<br></span></li><li class="c15 c26 li-bullet-0"><span class="c0">Quit<br></span></li><li class="c15 c26 li-bullet-0"><span class="c0">Search<br></span></li><li class="c15 c26 li-bullet-0"><span class="c0">Replace<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.r4u2hm4lh4yq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Enter Command Mode</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `:` }} />
          <hr className={styles.divider} />
          <h3 id="h.4wiln7t6j0we" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">File Commands</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:w</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c3"><span class="c0">Save</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:q</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c3"><span class="c0">Quit</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:wq</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c3"><span class="c0">Save &amp; Quit</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:q!</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c3"><span class="c0">Force quit</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:w!</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c3"><span class="c0">Force save</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.fqjqdur07oxn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Search Commands</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">/word</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Search forward</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">?word</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Search backward</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">n</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Next match</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">N</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Previous match</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.eagxs69gjvjw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Replace Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `:%s/old/new/g
Replace all occurrences` }} />
          <hr className={styles.divider} />
          <h3 id="h.hr18y68h2t25" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `:%s/linux/Linux/g` }} />
          <hr className={styles.divider} />
          <h2 id="h.zfn5v3ttbjim" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">12. Replace Mode</span>` }} />
          <h3 id="h.wffimqhvow87" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">What is Replace Mode?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Replaces text instead of inserting<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.z1k0jmnjwkpe" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Enter Replace Mode</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `R` }} />
          <hr className={styles.divider} />
          <h3 id="h.4917rt9ogtik" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Press </span><span class="c1">R<br></span></li><li class="c10 li-bullet-0"><span class="c0">Type new text<br></span></li><li class="c10 li-bullet-0"><span class="c0">Existing text is overwritten<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.1vm8y0393i65" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">13. GVIM WORKFLOW (REAL LIFE)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1️⃣ Open file → gvim file.txt 2️⃣ Navigate → Normal Mode 3️⃣ Edit → Insert Mode 4️⃣ Select → Visual Mode 5️⃣ Save → Command Mode` }} />
          <hr className={styles.divider} />
          <h2 id="h.ngwf35vt4b7o" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">14. Why GVIM is Used in Industry?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Configuration editing  Programming  Remote system editing  Fast editing` }} />
          <hr className={styles.divider} />
          <h2 id="h.1904gnwhmv8f" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">15. STUDENT SUMMARY (ONE GLANCE)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c11" colspan="1" rowspan="1"><p class="c13"><span class="c19">Mode</span></p></td><td class="c87" colspan="1" rowspan="1"><p class="c13"><span class="c19">Purpose</span></p></td></tr><tr class="c5"><td class="c11" colspan="1" rowspan="1"><p class="c3"><span class="c0">Normal</span></p></td><td class="c87" colspan="1" rowspan="1"><p class="c3"><span class="c0">Navigation &amp; commands</span></p></td></tr><tr class="c5"><td class="c11" colspan="1" rowspan="1"><p class="c3"><span class="c0">Insert</span></p></td><td class="c87" colspan="1" rowspan="1"><p class="c3"><span class="c0">Typing text</span></p></td></tr><tr class="c5"><td class="c11" colspan="1" rowspan="1"><p class="c3"><span class="c0">Visual</span></p></td><td class="c87" colspan="1" rowspan="1"><p class="c3"><span class="c0">Select text</span></p></td></tr><tr class="c5"><td class="c11" colspan="1" rowspan="1"><p class="c3"><span class="c0">Command</span></p></td><td class="c87" colspan="1" rowspan="1"><p class="c3"><span class="c0">Save, search</span></p></td></tr><tr class="c5"><td class="c11" colspan="1" rowspan="1"><p class="c3"><span class="c0">Replace</span></p></td><td class="c87" colspan="1" rowspan="1"><p class="c3"><span class="c0">Overwrite</span></p></td></tr></tbody>` }} />
          </div>
          <h1 id="h.s29ah6n704jo" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">GVIM EDITOR – COMPLETE COMMANDS (DETAILED LECTURE NOTES)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.t7pjwadio0zi" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. GVIM MODES (REVISION)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `GVIM works using modes. Commands depend on which mode you are in.` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c50" colspan="1" rowspan="1"><p class="c13"><span class="c19">Mode</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c13"><span class="c19">Purpose</span></p></td></tr><tr class="c5"><td class="c50" colspan="1" rowspan="1"><p class="c3"><span class="c0">Normal Mode</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c3"><span class="c0">Navigation, delete, copy</span></p></td></tr><tr class="c5"><td class="c50" colspan="1" rowspan="1"><p class="c3"><span class="c0">Insert Mode</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c3"><span class="c0">Typing text</span></p></td></tr><tr class="c5"><td class="c50" colspan="1" rowspan="1"><p class="c3"><span class="c0">Visual Mode</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c3"><span class="c0">Selection</span></p></td></tr><tr class="c5"><td class="c50" colspan="1" rowspan="1"><p class="c3"><span class="c0">Command Mode</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c3"><span class="c0">Save, search, replace</span></p></td></tr><tr class="c5"><td class="c50" colspan="1" rowspan="1"><p class="c3"><span class="c0">Replace Mode</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c3"><span class="c0">Overwrite text</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.aim0iye9w621" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. NORMAL MODE COMMANDS (MOST IMPORTANT)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Default mode when GVIM opens` }} />
          <hr className={styles.divider} />
          <h3 id="h.64s89f7k6e8p" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">2.1 Cursor Movement Commands</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c21" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">h</span></p></td><td class="c21" colspan="1" rowspan="1"><p class="c3"><span class="c0">Move left</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">l</span></p></td><td class="c21" colspan="1" rowspan="1"><p class="c3"><span class="c0">Move right</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">j</span></p></td><td class="c21" colspan="1" rowspan="1"><p class="c3"><span class="c0">Move down</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">k</span></p></td><td class="c21" colspan="1" rowspan="1"><p class="c3"><span class="c0">Move up</span></p></td></tr></tbody>` }} />
          </div>
          <h4 id="h.y5qlhaghsuhi" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c22 c19">Examples:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux
World` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Press </span><span class="c12">j</span><span> → moves to </span><span class="c1">World<br></span></li><li class="c10 li-bullet-0"><span>Press </span><span class="c12">k</span><span> → back to </span><span class="c1">Linux<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.zg3w95y97ha7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">2.2 Word Navigation Commands</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c91" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">w</span></p></td><td class="c91" colspan="1" rowspan="1"><p class="c3"><span class="c0">Next word</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">b</span></p></td><td class="c91" colspan="1" rowspan="1"><p class="c3"><span class="c0">Previous word</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">e</span></p></td><td class="c91" colspan="1" rowspan="1"><p class="c3"><span class="c0">End of word</span></p></td></tr></tbody>` }} />
          </div>
          <h4 id="h.qmphesaytkvc" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c22 c19">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux is powerful OS` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Cursor on </span><span class="c1">Linux<br></span></li><li class="c10 li-bullet-0"><span class="c12">w</span><span> → moves to </span><span class="c1">is<br></span></li><li class="c10 li-bullet-0"><span class="c12">e</span><span> → moves to </span><span class="c1">x<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.8ypvceqs640b" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">2.3 Line Navigation Commands</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c87" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">0</span></p></td><td class="c87" colspan="1" rowspan="1"><p class="c3"><span class="c0">Start of line</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">^</span></p></td><td class="c87" colspan="1" rowspan="1"><p class="c3"><span class="c0">First non-space character</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">$</span></p></td><td class="c87" colspan="1" rowspan="1"><p class="c3"><span class="c0">End of line</span></p></td></tr></tbody>` }} />
          </div>
          <h4 id="h.i64sep2j2boy" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c22 c19">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux System` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c12">0</span><span class="c0"> → start (spaces)<br></span></li><li class="c10 li-bullet-0"><span class="c12">^</span><span> → </span><span class="c1">L<br></span></li><li class="c10 li-bullet-0"><span class="c12">$</span><span class="c0"> → end<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.7l216r2ie8vs" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">2.4 File Navigation Commands</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c65" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">gg</span></p></td><td class="c65" colspan="1" rowspan="1"><p class="c3"><span class="c0">First line</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">G</span></p></td><td class="c65" colspan="1" rowspan="1"><p class="c3"><span class="c0">Last line</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">10G</span></p></td><td class="c65" colspan="1" rowspan="1"><p class="c3"><span class="c0">Go to line 10</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">Ctrl + g</span></p></td><td class="c65" colspan="1" rowspan="1"><p class="c3"><span class="c0">Show line number</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.ph06ddks4rfz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. INSERT MODE COMMANDS</span>` }} />
          <h3 id="h.37qj8nqvkihq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Enter Insert Mode</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">i</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">Insert before cursor</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">a</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">Insert after cursor</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">I</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">Insert at start</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">A</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">Insert at end</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">o</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">New line below</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">O</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c3"><span class="c0">New line above</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.lxn4pmj7x8nd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Examples:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Cursor on </span><span class="c1">L<br></span></li><li class="c10 li-bullet-0"><span class="c12">a</span><span> → type </span><span class="c12">OS<br></span><span class="c0"> Result:<br></span></li>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux OS` }} />
          <hr className={styles.divider} />
          <h2 id="h.ch84jy9r8n77" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">4. DELETE COMMANDS (NORMAL MODE)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c84" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">x</span></p></td><td class="c84" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete character</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">dw</span></p></td><td class="c84" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete word</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">dd</span></p></td><td class="c84" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete line</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">D</span></p></td><td class="c84" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete till end</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">dG</span></p></td><td class="c84" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete till end of file</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.oxoe4e53mxvv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Examples:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux is powerful` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Cursor on </span><span class="c1">is<br></span></li><li class="c10 li-bullet-0"><span class="c12">dw</span><span> → deletes </span><span class="c1">is<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Line1
Line2
Line3` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Cursor on </span><span class="c1">Line2<br></span></li><li class="c10 li-bullet-0"><span class="c12">dd</span><span> → deletes </span><span class="c1">Line2<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.dwiwq269b3w3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5. COPY (YANK) COMMANDS</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c7" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">yy</span></p></td><td class="c7" colspan="1" rowspan="1"><p class="c3"><span class="c0">Copy line</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">yw</span></p></td><td class="c7" colspan="1" rowspan="1"><p class="c3"><span class="c0">Copy word</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">y$</span></p></td><td class="c7" colspan="1" rowspan="1"><p class="c3"><span class="c0">Copy till end</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">yG</span></p></td><td class="c7" colspan="1" rowspan="1"><p class="c3"><span class="c0">Copy till end file</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.dugo3cv8f0c7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux is powerful` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Cursor on </span><span class="c1">Linux<br></span></li><li class="c10 li-bullet-0"><span class="c1">yw<br></span></li><li class="c10 li-bullet-0"><span>Move cursor → </span><span class="c1">p<br></span></li><li class="c10 li-bullet-0"><span class="c0">Word pasted<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.867nl9poviyz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6. PASTE COMMANDS</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">p</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">Paste after cursor</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">P</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">Paste before cursor</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.zgklyvsckgd" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">7. UNDO / REDO</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">u</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c3"><span class="c0">Undo</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">Ctrl + r</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c3"><span class="c0">Redo</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.u2ayncshuexz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Delete a line<br></span></li><li class="c10 li-bullet-0"><span>Press </span><span class="c12">u</span><span class="c0"> → restored<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.9gsvztfs9wwm" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">8. VISUAL MODE COMMANDS</span>` }} />
          <h3 id="h.vah1xivg14fc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Enter Visual Mode</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c13"><span class="c19">Mode</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">v</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c3"><span class="c0">Character</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">V</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c3"><span class="c0">Line</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">Ctrl + v</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c3"><span class="c0">Block</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.1ssk4dmahti4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Visual Mode Operations</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">y</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c3"><span class="c0">Copy</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">d</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c3"><span class="c0">Delete</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">&gt;</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c3"><span class="c0">Indent</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">&lt;</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c3"><span class="c0">Outdent</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.lnplnmqgbryv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Press </span><span class="c1">V<br></span></li><li class="c10 li-bullet-0"><span class="c0">Select 3 lines<br></span></li><li class="c10 li-bullet-0"><span class="c12">&gt;</span><span class="c0"> → indented<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.uubl5oxxrm9h" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">9. SEARCH COMMANDS</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">/word</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Search forward</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">?word</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Search backward</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">n</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Next</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">N</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Previous</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.edcbz3myiq5h" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux is Linux` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c1">/Linux<br></span></li><li class="c10 li-bullet-0"><span class="c12">n</span><span class="c0"> → next Linux<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.axu6nac8isdq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">10. COMMAND MODE COMMANDS</span>` }} />
          <h3 id="h.z9zw3ezgg9sc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Enter Command Mode</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `:` }} />
          <hr className={styles.divider} />
          <h3 id="h.nzbm9raak9u4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">File Commands</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:w</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Save</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:q</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Quit</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:wq</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Save &amp; quit</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:q!</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Force quit</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:w!</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Force save</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.nlstr2n07xxy" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `:w myfile.txt
(Save as new file)` }} />
          <hr className={styles.divider} />
          <h2 id="h.7wptd0xxxe3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">11. REPLACE COMMANDS</span>` }} />
          <h3 id="h.ewxoqus6nsl3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Single Replace</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c71" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">r</span></p></td><td class="c71" colspan="1" rowspan="1"><p class="c3"><span class="c0">Replace one character</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.bm3rc1v84m2f" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Global Replace</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `:%s/old/new/g` }} />
          <h3 id="h.3bcrcnsvwxka" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Examples:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `:%s/linux/Linux/g
Replace everywhere
:5,10s/a/A/g
Replace only lines 5–10` }} />
          <hr className={styles.divider} />
          <h2 id="h.jj05uhe2sm47" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">12. MULTI-FILE COMMANDS</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:e file</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c3"><span class="c0">Open file</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:n</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c3"><span class="c0">Next file</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:prev</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c3"><span class="c0">Previous</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:ls</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c3"><span class="c0">List files</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:bd</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c3"><span class="c0">Close file</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.53fva7zgiwkx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">13. WINDOW / SPLIT COMMANDS</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:split</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c3"><span class="c0">Horizontal split</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:vsplit</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c3"><span class="c0">Vertical split</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">Ctrl+w w</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c3"><span class="c0">Switch window</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">Ctrl+w q</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c3"><span class="c0">Close split</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.x266lj3q8hxj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">14. SETTINGS COMMANDS</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c72" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:set nu</span></p></td><td class="c72" colspan="1" rowspan="1"><p class="c3"><span class="c0">Show line numbers</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:set nonu</span></p></td><td class="c72" colspan="1" rowspan="1"><p class="c3"><span class="c0">Hide numbers</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:set ic</span></p></td><td class="c72" colspan="1" rowspan="1"><p class="c3"><span class="c0">Ignore case</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:syntax on</span></p></td><td class="c72" colspan="1" rowspan="1"><p class="c3"><span class="c0">Syntax highlight</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.xzebbmi4egm9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">15. HELP COMMAND</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c80" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:help</span></p></td><td class="c80" colspan="1" rowspan="1"><p class="c3"><span class="c0">Open help</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c12">:help dd</span></p></td><td class="c80" colspan="1" rowspan="1"><p class="c3"><span>Help on </span><span class="c12">dd</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.awkdeynrfb8t" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">16. REAL-TIME GVIM USAGE EXAMPLE</span>` }} />
          <h3 id="h.a7wgvy2wgnjy" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Editing Config File:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `gvim /etc/passwd` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c1">/root<br></span></li><li class="c10 li-bullet-0"><span class="c1">dd<br></span></li><li class="c10 li-bullet-0"><span class="c1">:wq<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ss1w2eypn27s" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">17. COMPLETE STUDENT SUMMARY</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Navigation  Editing  Copy/Paste  Search  Replace  Multi-file  Splits  Settings` }} />
          <hr className={styles.divider} />
          <h1 id="h.rfbmvqpy75et" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">LINUX WILDCARD CHARACTERS (PATTERN MATCHING)</span>` }} />
          <h3 id="h.cvzcvk6nitam" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c92 c35 c19">(Complete Beginner-to-Advanced Notes)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.3ztj258txqmh" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. What is a Wildcard Character?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `A wildcard is a special character used in Linux shell to represent one or more characters in file or directory names.
Instead of typing full file names, we use patterns.` }} />
          <h3 id="h.rs9yd56nk5k6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `file1.txt
file2.txt
file3.txt
Instead of:
rm file1.txt file2.txt file3.txt
We can use:
rm file*.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.uwj27fxhsiyl" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. Why Do We Use Wildcards?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Save time  Handle multiple files  Powerful file filtering  Used in ls, cp, mv, rm, find, grep` }} />
          <hr className={styles.divider} />
          <h2 id="h.4mrwf0iehlf4" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. Types of Wildcard Characters</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux mainly supports these wildcard characters:` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c13"><span class="c19">Wildcard</span></p></td><td class="c85" colspan="1" rowspan="1"><p class="c13"><span class="c19">Name</span></p></td></tr><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c12">*</span></p></td><td class="c85" colspan="1" rowspan="1"><p class="c3"><span class="c0">Asterisk</span></p></td></tr><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c12">?</span></p></td><td class="c85" colspan="1" rowspan="1"><p class="c3"><span class="c0">Question mark</span></p></td></tr><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c12">[ ]</span></p></td><td class="c85" colspan="1" rowspan="1"><p class="c3"><span class="c0">Bracket expression</span></p></td></tr><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c12">{ }</span></p></td><td class="c85" colspan="1" rowspan="1"><p class="c3"><span class="c0">Brace expansion</span></p></td></tr><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c12">!</span></p></td><td class="c85" colspan="1" rowspan="1"><p class="c3"><span class="c0">Negation (inside brackets)</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h1 id="h.x2y8bdma8chg" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">4. Asterisk Wildcard (</span><span class="c51 c19">*</span><span class="c24 c19">)</span>` }} />
          <h2 id="h.xkdlyl16kqsi" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">4.1 Meaning</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `* matches ZERO or MORE characters` }} />
          <hr className={styles.divider} />
          <h2 id="h.197r4ya2y0mq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">4.2 Examples</span>` }} />
          <h3 id="h.qn0ms3d7cegg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: List all files</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls *
Lists all files and directories` }} />
          <hr className={styles.divider} />
          <h3 id="h.qi578y5ofebk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Files starting with name</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls file*
Matches:
file.txt
file1.txt
file_backup.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.n8w4wypqbw75" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Files ending with extension</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls *.txt
Matches:
notes.txt
data.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.5229ygfs9o2i" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 4: Copy multiple files</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cp *.txt /backup/
Copies all .txt files` }} />
          <hr className={styles.divider} />
          <h3 id="h.lvq3h699qmor" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 5: Remove files</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rm log*
Deletes:
log1
log2.txt
log_backup
⚠ Be careful with rm *` }} />
          <hr className={styles.divider} />
          <h1 id="h.22slqb9qmz22" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">5. Question Mark (</span><span class="c51 c19">?</span><span class="c24 c19">) Wildcard</span>` }} />
          <h2 id="h.hk990ket8k2q" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5.1 Meaning</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `? matches EXACTLY ONE character` }} />
          <hr className={styles.divider} />
          <h2 id="h.4u889w5nv72r" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5.2 Examples</span>` }} />
          <h3 id="h.pdw5taezv8ch" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls file?.txt
Matches:
file1.txt
file2.txt
Does NOT match:
file10.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.cyelw51mpnhg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls ???.txt
Matches:
abc.txt
one.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.x0nt15frev6t" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rm data?.csv
Deletes:
data1.csv
data2.csv` }} />
          <hr className={styles.divider} />
          <h3 id="h.rvrbt1beap6t" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">Difference Between </span><span class="c55 c56 c19">*</span><span class="c35 c19"> and </span><span class="c54 c19">?</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c101"><td class="c58" colspan="1" rowspan="1"><p class="c13"><span class="c55 c19">*</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c13"><span class="c55 c19">?</span></p></td></tr><tr class="c5"><td class="c58" colspan="1" rowspan="1"><p class="c3"><span class="c0">Zero or more chars</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c3"><span class="c0">Exactly one char</span></p></td></tr><tr class="c5"><td class="c58" colspan="1" rowspan="1"><p class="c3"><span class="c0">file* → file, file1</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c3"><span class="c0">file? → file1</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h1 id="h.7akprw67uap4" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">6. Bracket Wildcard </span><span class="c39 c19">[ ]</span>` }} />
          <h2 id="h.dmxcx430tsjb" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6.1 Meaning</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `[ ] matches ANY ONE character from the list or range` }} />
          <hr className={styles.divider} />
          <h2 id="h.yjcndp96gv9g" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6.2 Examples</span>` }} />
          <h3 id="h.kdu9dmgu6x52" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Specific characters</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls file[123].txt
Matches:
file1.txt
file2.txt
file3.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.uwovl38uhldg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Character range</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls file[a-z].txt
Matches:
filea.txt
fileb.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.q15lzcyn6aoo" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Numbers range</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls report[0-9].pdf
Matches:
report1.pdf
report9.pdf` }} />
          <hr className={styles.divider} />
          <h2 id="h.becszmqhvocd" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">6.3 Bracket with Negation </span><span class="c90 c55 c38 c19">[! ]</span>` }} />
          <h3 id="h.h3llqdvwbxze" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Meaning:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Matches NOT these characters` }} />
          <hr className={styles.divider} />
          <h3 id="h.l20i573nsg3m" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls file[!1].txt
Matches:
file2.txt
file3.txt
Excludes:
file1.txt` }} />
          <hr className={styles.divider} />
          <h1 id="h.8jtd9emyot4b" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c19 c61">7. Brace Expansion </span><span class="c39 c19">{ }</span>` }} />
          <h2 id="h.uq8vx36ks9mo" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">7.1 Meaning</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `&#123; &#125; is used to generate multiple strings` }} />
          <hr className={styles.divider} />
          <h2 id="h.pr1fh5y9rgcn" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">7.2 Examples</span>` }} />
          <h3 id="h.5uyzsm2h3qy4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls file&#123;1,2,3&#125;.txt
Expands to:
file1.txt file2.txt file3.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.hotifqyp4qd0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `touch day&#123;1..5&#125;.txt
Creates:
day1.txt day2.txt day3.txt day4.txt day5.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.yqf5pp53aaw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cp file.&#123;txt,pdf&#125; /backup/
Copies:
file.txt
file.pdf` }} />
          <hr className={styles.divider} />
          <h1 id="h.xlfil7uuxyoc" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">8. Combining Wildcards (Advanced Usage)</span>` }} />
          <h3 id="h.i7eef1ac6hv7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls *[0-9]?.log
Matches:
error12.log
data9a.log` }} />
          <hr className={styles.divider} />
          <h3 id="h.e3dytazcfiuu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rm report[!0-9]*.txt
Deletes all reports not starting with numbers` }} />
          <hr className={styles.divider} />
          <h1 id="h.3wfpzpj1hbpl" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">9. Real-Time Use Cases</span>` }} />
          <h3 id="h.lqhcrfvyaej6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Find log files:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls /var/log/*.log` }} />
          <hr className={styles.divider} />
          <h3 id="h.3rfsmrisely1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Backup files:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cp *.conf /backup/` }} />
          <hr className={styles.divider} />
          <h3 id="h.bcs8prq83bm3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Delete temp files:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rm *.tmp` }} />
          <hr className={styles.divider} />
          <h1 id="h.tx1qzt8b88fm" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">10. Important Notes for Students</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `⚠ Wildcards are processed by shell, not command ⚠ Use ls before rm to verify ⚠ Wildcards do NOT match hidden files (.file)
To match hidden files:
ls .*` }} />
          <hr className={styles.divider} />
          <h1 id="h.jwhtpjytdgq" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">11. Student Quick Summary Table</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c13"><span class="c19">Wildcard</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c13"><span class="c19">Use</span></p></td></tr><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c12">*</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c3"><span class="c0">Any length</span></p></td></tr><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c12">?</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c3"><span class="c0">One character</span></p></td></tr><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c12">[ ]</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c3"><span class="c0">One from set</span></p></td></tr><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c12">[! ]</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c3"><span class="c0">Not from set</span></p></td></tr><tr class="c5"><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c12">{ }</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c3"><span class="c0">Multiple names</span></p></td></tr></tbody>` }} />
          </div>
          <h1 id="h.ty513i3oh7a6" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">LINUX FILE &amp; DIRECTORY PERMISSIONS</span>` }} />
          <h3 id="h.gr2c13r84thi" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c92 c35 c19">(Complete Beginner → Practical Level Notes)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.f5ptpmb74v20" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. Why Permissions Are Needed in Linux</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux is a multi-user operating system. Many users can access the same system at the same time.
Permissions ensure:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Data security<br></span></li><li class="c10 li-bullet-0"><span class="c0">Controlled access<br></span></li><li class="c10 li-bullet-0"><span class="c0">Protection from accidental deletion<br></span></li><li class="c10 li-bullet-0"><span class="c0">Proper system management<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.8cizh46qq7ha" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. Types of Users in Linux</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Every file and directory has 3 permission categories:` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c29" colspan="1" rowspan="1"><p class="c13"><span class="c19">Category</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c29" colspan="1" rowspan="1"><p class="c3"><span class="c19">User (u)</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Owner of the file</span></p></td></tr><tr class="c5"><td class="c29" colspan="1" rowspan="1"><p class="c3"><span class="c19">Group (g)</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Group of users</span></p></td></tr><tr class="c5"><td class="c29" colspan="1" rowspan="1"><p class="c3"><span class="c19">Others (o)</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Everyone else</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.ch3wxzd3gflr" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">3. Understanding </span><span class="c55 c38 c19">ls -l</span><span class="c27 c19"> Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Command:
ls -l
Example output:
-rwxr-xr-- 1 khalil dev 1234 notes.txt
Breakdown:` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c13"><span class="c19">Field</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c3"><span class="c12">-</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">File type</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c3"><span class="c12">rwx</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">User permissions</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c3"><span class="c12">r-x</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">Group permissions</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c3"><span class="c12">r--</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">Others permissions</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c3"><span class="c0">khalil</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">Owner</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c3"><span class="c0">dev</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c3"><span class="c0">Group</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.ij85lcfpx75a" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">4. File Types</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c13"><span class="c19">Symbol</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">-</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Regular file</span></p></td></tr><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">d</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Directory</span></p></td></tr><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">l</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Link</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.fhplqhiey259" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5. Permission Types</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c13"><span class="c19">Permission</span></p></td><td class="c62" colspan="1" rowspan="1"><p class="c13"><span class="c19">Symbol</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c13"><span class="c19">File Meaning</span></p></td><td class="c97" colspan="1" rowspan="1"><p class="c13"><span class="c19">Directory Meaning</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Read</span></p></td><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">r</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">View file content</span></p></td><td class="c97" colspan="1" rowspan="1"><p class="c3"><span class="c0">List files</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Write</span></p></td><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">w</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Modify file</span></p></td><td class="c97" colspan="1" rowspan="1"><p class="c3"><span class="c0">Create/Delete files</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">Execute</span></p></td><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">x</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Run file</span></p></td><td class="c97" colspan="1" rowspan="1"><p class="c3"><span class="c0">Enter directory</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.9isnstckunvk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6. Permission Structure (9 Bits)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rwx r-x r--
u   g   o` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>First 3 → </span><span class="c22 c19">User<br></span></li><li class="c10 li-bullet-0"><span>Next 3 → </span><span class="c22 c19">Group<br></span></li><li class="c10 li-bullet-0"><span>Last 3 → </span><span class="c22 c19">Others<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.v69ypkpjeot0" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">7. Permissions on Files vs Directories</span>` }} />
          <h3 id="h.zj4i5nb50ic" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">File</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c13"><span class="c19">Permission</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c13"><span class="c19">Effect</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">r</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c3"><span class="c0">Can read file</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">w</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c3"><span class="c0">Can modify</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">x</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c3"><span class="c0">Can execute</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.cj4jdzjx09tr" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Directory</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c13"><span class="c19">Permission</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c13"><span class="c19">Effect</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">r</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c3"><span class="c0">Can list files</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">w</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c3"><span class="c0">Can create/delete</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">x</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c3"><span class="c0">Can enter (cd)</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.nqsf58jefrse" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">8. Symbolic Mode of </span><span class="c90 c55 c38 c19">chmod</span>` }} />
          <h3 id="h.slfwaklbcv8f" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chmod [u/g/o/a][+/-/=][r/w/x] filename` }} />
          <hr className={styles.divider} />
          <h2 id="h.vbtyzo48zi3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">9. Symbol Meaning</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c13"><span class="c19">Symbol</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">+</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c3"><span class="c0">Add permission</span></p></td></tr><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">-</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c3"><span class="c0">Remove permission</span></p></td></tr><tr class="c5"><td class="c62" colspan="1" rowspan="1"><p class="c3"><span class="c12">=</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c3"><span class="c0">Assign exact permission</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.fo6b7n8vdfv3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">10. Examples – Symbolic Mode</span>` }} />
          <h3 id="h.i6v2fy1aqhdh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Add execute permission to user:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chmod u+x script.sh` }} />
          <hr className={styles.divider} />
          <h3 id="h.lkqlkzdu2bld" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Remove write permission from group:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chmod g-w notes.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.jftzmuz3sxjo" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Give read-only to others:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chmod o=r report.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.1la17szc6zey" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Give full permission to user:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chmod u=rwx file.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.qf0pllbh40yb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Give permissions to all:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chmod a+rx data.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.lbd2nba1mekk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">11. Octal (Numeric) Permission System</span>` }} />
          <h3 id="h.c17mtxa4mz6g" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Numeric Values:</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c13"><span class="c19">Permission</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c13"><span class="c19">Value</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">r</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c3"><span class="c0">4</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">w</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c3"><span class="c0">2</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">x</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c3"><span class="c0">1</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.vktmpaeqbl6p" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Permission Calculation</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c13"><span class="c19">Permission</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c13"><span class="c19">Value</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">rwx</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c3"><span class="c0">7</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">rw-</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c3"><span class="c0">6</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">r--</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c3"><span class="c0">4</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">r-x</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c3"><span class="c0">5</span></p></td></tr><tr class="c5"><td class="c18" colspan="1" rowspan="1"><p class="c3"><span class="c0">---</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c3"><span class="c0">0</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.osnobths8wdj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">12. Common Octal Examples</span>` }} />
          <h3 id="h.mqlttvklyolm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c19 c54">755</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rwx r-x r-x
Command:
chmod 755 file.sh` }} />
          <hr className={styles.divider} />
          <h3 id="h.5ieoqql9o7fc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c54 c19">644</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rw- r-- r--
Command:
chmod 644 notes.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.t86g1qyj8b9r" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c55 c56 c19">777</span><span class="c17"> (Dangerous )</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `rwx rwx rwx
Command:
chmod 777 test.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.2tmigc4noak2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">13. Directory Permission Examples</span>` }} />
          <h3 id="h.rpkb34tct762" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Allow everyone to enter directory:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chmod 755 mydir` }} />
          <hr className={styles.divider} />
          <h3 id="h.ddkcdi885tth" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Private directory:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chmod 700 private` }} />
          <hr className={styles.divider} />
          <h2 id="h.vvgei4c7hycz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">14. Recursive Permission Change</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chmod -R 755 project/
Changes permission for:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Folder<br></span></li><li class="c10 li-bullet-0"><span class="c0">All subfolders<br></span></li><li class="c10 li-bullet-0"><span class="c0">All files<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.xiemfcar7oaf" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">15. </span><span class="c55 c38 c19">chown</span><span class="c27 c19"> – Change Owner</span>` }} />
          <h3 id="h.bn57p9fx4s0n" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chown user filename` }} />
          <hr className={styles.divider} />
          <h3 id="h.esne6xw4rg3q" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chown ravi file.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.6u1x0ux5kyo3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Change owner &amp; group:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chown ravi:dev report.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.625c12c7etrd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Recursive ownership:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chown -R ravi:dev project/
⚠ Only root can use chown` }} />
          <hr className={styles.divider} />
          <h2 id="h.33gvjsdghx97" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">16. </span><span class="c55 c38 c19">chgrp</span><span class="c27 c19"> – Change Group</span>` }} />
          <h3 id="h.abbeunxuziw7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chgrp group filename` }} />
          <hr className={styles.divider} />
          <h3 id="h.8l0xg13yxmjx" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chgrp admin notes.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.xv8ao7w5lprr" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Recursive:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `chgrp -R admin project/` }} />
          <hr className={styles.divider} />
          <h2 id="h.4ev1sudtnf37" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">17. Real-World Scenario Example</span>` }} />
          <h3 id="h.vtpiyze7gfoa" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Create secure project folder:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `mkdir project
chown khalil:dev project
chmod 750 project
Result:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Owner → Full access<br></span></li><li class="c10 li-bullet-0"><span class="c0">Group → Read + Execute<br></span></li><li class="c10 li-bullet-0"><span class="c0">Others → No access<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.zdxqusy4loqf" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">18. Common Mistakes Students Make</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Using 777 always  Forgetting execute permission on directories  Removing read permission but expecting ls to work` }} />
          <hr className={styles.divider} />
          <h2 id="h.258s7rqv0qkk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">19. Quick Revision Table</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c13"><span class="c19">Purpose</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c0">chmod</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c3"><span class="c0">Change permissions</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c0">chown</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c3"><span class="c0">Change owner</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c0">chgrp</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c3"><span class="c0">Change group</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c0">ls -l</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c3"><span class="c0">View permissions</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.b9lzd9qzp2p2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">20. Student Final Summary</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Linux permissions protect files<br></span></li><li class="c10 li-bullet-0"><span class="c0">Three levels: User, Group, Others<br></span></li><li class="c10 li-bullet-0"><span class="c0">Two methods: Symbolic &amp; Octal<br></span></li><li class="c10 li-bullet-0"><span class="c0">Directories behave differently<br></span></li><li class="c10 li-bullet-0"><span class="c12">chown</span><span> &amp; </span><span class="c12">chgrp</span><span class="c0"> control ownership<br></span></li>` }} />
          <h1 id="h.z15rfdqyu7ew" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">LINUX REDIRECTION OPERATORS</span>` }} />
          <h3 id="h.9k2wfcaj9phh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19 c92">(Input &amp; Output Redirection – Complete Beginner Guide)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.wyu0c05prchz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. What is Redirection in Linux?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `By default in Linux:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c19">Input</span><span class="c0"> → Keyboard<br></span></li><li class="c10 li-bullet-0"><span class="c19">Output</span><span class="c0"> → Screen (Terminal)<br></span></li>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Redirection allows us to change the direction of input or output to:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Files<br></span></li><li class="c10 li-bullet-0"><span class="c0">Other commands<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.mbj4lfj2cxzm" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. Standard Streams in Linux</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Every command uses 3 standard streams:` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c79" colspan="1" rowspan="1"><p class="c13"><span class="c19">Stream</span></p></td><td class="c94" colspan="1" rowspan="1"><p class="c13"><span class="c19">Name</span></p></td><td class="c96" colspan="1" rowspan="1"><p class="c13"><span class="c19">Number</span></p></td><td class="c100" colspan="1" rowspan="1"><p class="c13"><span class="c19">Default</span></p></td></tr><tr class="c5"><td class="c79" colspan="1" rowspan="1"><p class="c3"><span class="c0">Standard Input</span></p></td><td class="c94" colspan="1" rowspan="1"><p class="c3"><span class="c0">stdin</span></p></td><td class="c96" colspan="1" rowspan="1"><p class="c3"><span class="c0">0</span></p></td><td class="c100" colspan="1" rowspan="1"><p class="c3"><span class="c0">Keyboard</span></p></td></tr><tr class="c5"><td class="c79" colspan="1" rowspan="1"><p class="c3"><span class="c0">Standard Output</span></p></td><td class="c94" colspan="1" rowspan="1"><p class="c3"><span class="c0">stdout</span></p></td><td class="c96" colspan="1" rowspan="1"><p class="c3"><span class="c0">1</span></p></td><td class="c100" colspan="1" rowspan="1"><p class="c3"><span class="c0">Screen</span></p></td></tr><tr class="c5"><td class="c79" colspan="1" rowspan="1"><p class="c3"><span class="c0">Standard Error</span></p></td><td class="c94" colspan="1" rowspan="1"><p class="c3"><span class="c0">stderr</span></p></td><td class="c96" colspan="1" rowspan="1"><p class="c3"><span class="c0">2</span></p></td><td class="c100" colspan="1" rowspan="1"><p class="c3"><span class="c0">Screen</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.8x6ke3kh8p" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. Types of Redirection</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1️⃣ Output Redirection 2️⃣ Input Redirection 3️⃣ Here Document (&lt;&lt;)` }} />
          <hr className={styles.divider} />
          <h1 id="h.k0y29uc15i6g" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">4. Output Redirection Operator </span><span class="c39 c19">&gt;</span>` }} />
          <h3 id="h.hrp9xww7kyio" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Meaning:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Redirect output of a command to a file ⚠ Overwrites existing file` }} />
          <hr className={styles.divider} />
          <h3 id="h.p0gsge1ggdso" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `command &gt; filename` }} />
          <hr className={styles.divider} />
          <h3 id="h.ncu18kgqeezg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls &gt; files.txt
Output of ls goes into files.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.v0jlctcr2xkt" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `date &gt; today.txt
Date stored in file` }} />
          <hr className={styles.divider} />
          <h3 id="h.x2tdq0um9skq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `echo "Linux is powerful" &gt; note.txt
Text saved into file` }} />
          <hr className={styles.divider} />
          <h3 id="h.28q2ggo5ku77" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Important Point:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `If file exists → Content erased &amp; replaced` }} />
          <hr className={styles.divider} />
          <h1 id="h.chmiievrrs0i" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">5. Append Output Redirection </span><span class="c39 c19">&gt;&gt;</span>` }} />
          <h3 id="h.dug0lq9kbqrn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Meaning:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Redirect output and append to file  Existing data is not removed` }} />
          <hr className={styles.divider} />
          <h3 id="h.p6t2rkcmr5ez" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `command &gt;&gt; filename` }} />
          <hr className={styles.divider} />
          <h3 id="h.4rjllqv1yr4q" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `date &gt;&gt; log.txt
Adds date at end of file` }} />
          <hr className={styles.divider} />
          <h3 id="h.uesi5wglow0d" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `echo "Second line" &gt;&gt; note.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.3c8cx2lebtzf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls &gt;&gt; files.txt
Adds directory list again` }} />
          <hr className={styles.divider} />
          <h3 id="h.782zc4eedznb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">Difference: </span><span class="c55 c56 c19">&gt;</span><span class="c35 c19"> vs </span><span class="c54 c19">&gt;&gt;</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c13"><span class="c19">Operator</span></p></td><td class="c23" colspan="1" rowspan="1"><p class="c13"><span class="c19">Behavior</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c12">&gt;</span></p></td><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c0">Overwrite</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c12">&gt;&gt;</span></p></td><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c0">Append</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h1 id="h.9z7qvagkekh6" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">6. Input Redirection Operator </span><span class="c19 c39">&lt;</span>` }} />
          <h3 id="h.x1p5vw1fxm26" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Meaning:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Take input from a file instead of keyboard` }} />
          <hr className={styles.divider} />
          <h3 id="h.infve843vldc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `command &lt; filename` }} />
          <hr className={styles.divider} />
          <h3 id="h.olnuns9lbbf9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cat &lt; file.txt
Displays content of file` }} />
          <hr className={styles.divider} />
          <h3 id="h.nlw9sc39th1h" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `wc -l &lt; file.txt
Counts lines in file` }} />
          <hr className={styles.divider} />
          <h3 id="h.gdl1cpy53ch8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sort &lt; names.txt
Sorts file content` }} />
          <hr className={styles.divider} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Without &lt;, you would type input manually` }} />
          <hr className={styles.divider} />
          <h1 id="h.wwy473qsejl3" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">7. Here Document Operator </span><span class="c39 c19">&lt;&lt;</span>` }} />
          <h3 id="h.n76yime85y1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Meaning:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Provide multiple lines of input directly in terminal` }} />
          <hr className={styles.divider} />
          <h3 id="h.dqxxxw9i8fzv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `command &lt;&lt; DELIMITER
text
text
DELIMITER` }} />
          <hr className={styles.divider} />
          <h3 id="h.usg17sd9y18e" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cat &lt;&lt; EOF
Hello
This is Linux
EOF
Output shown on screen` }} />
          <hr className={styles.divider} />
          <h3 id="h.ayq6fza21des" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `wc -w &lt;&lt; END
Linux is an operating system
END
Word count printed` }} />
          <hr className={styles.divider} />
          <h3 id="h.hoajt1jvqick" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cat &lt;&lt; DATA &gt; file.txt
Line one
Line two
DATA
Data written into file` }} />
          <hr className={styles.divider} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `EOF, END, DATA → Any word (must match exactly)` }} />
          <hr className={styles.divider} />
          <h1 id="h.xt21n5l3rk4g" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">8. Real-World Use Case</span>` }} />
          <h3 id="h.t02pgoclngbt" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Create file without editor:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cat &lt;&lt; EOF &gt; info.txt
Name: Ravi
Course: Linux
EOF` }} />
          <hr className={styles.divider} />
          <h1 id="h.ahfriqwezhj7" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">9. Error Redirection (Bonus – Important)</span>` }} />
          <h3 id="h.qv6d2piahlua" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Redirect errors only:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `command 2&gt; error.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.j8nevuxxv4aw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls wrongfile 2&gt; error.log` }} />
          <hr className={styles.divider} />
          <h3 id="h.magnbga32jqf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Redirect both output &amp; error:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `command &gt; all.txt 2&gt;&amp;1` }} />
          <hr className={styles.divider} />
          <h1 id="h.xg7u8b9k1yfc" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">10. Combined Redirection</span>` }} />
          <h3 id="h.yabs7kcvpd3q" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sort &lt; input.txt &gt; output.txt
Reads from file  Writes sorted output to new file` }} />
          <hr className={styles.divider} />
          <h1 id="h.oywd6yohli5i" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">11. Redirection Summary Table</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c13"><span class="c19">Operator</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c13"><span class="c19">Purpose</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c12">&gt;</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Output overwrite</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c12">&gt;&gt;</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Output append</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c12">&lt;</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Input from file</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c12">&lt;&lt;</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Multi-line input</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c12">2&gt;</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c3"><span class="c0">Error output</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h1 id="h.v9fbcg4yhhjf" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">12. Common Student Mistakes</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Using &gt; instead of &gt;&gt;  Forgetting delimiter in &lt;&lt;  Overwriting important files` }} />
          <hr className={styles.divider} />
          <h1 id="h.wnh4oruf9tv0" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">13. Simple Student Practice Tasks</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1️⃣ Save ls output to file 2️⃣ Append date 3 times 3️⃣ Count lines using &lt; 4️⃣ Create file using &lt;&lt;` }} />
          <hr className={styles.divider} />
          <h1 id="h.7w5sre5vzjjz" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">14. Final Student Understanding</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Redirection controls data flow  Saves time  Avoids manual typing  Very useful in scripting` }} />
          <h1 id="h.d29279u3fokz" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">HELPFUL COMMANDS IN LINUX (LECTURE STYLE)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.8yygpjfbtwyi" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. Why Helpful Commands Are Important</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `In Linux:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Thousands of commands exist<br></span></li><li class="c10 li-bullet-0"><span class="c0">No one can memorize all options<br></span></li><li class="c10 li-bullet-0"><span>Linux provides </span><span class="c22 c19">built-in documentation<br></span></li>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Helpful commands act as your Linux teacher` }} />
          <hr className={styles.divider} />
          <h2 id="h.1iocpws7hq3c" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">2. </span><span class="c55 c38 c19">man</span><span class="c27 c19"> Command (Manual Pages)</span>` }} />
          <h3 id="h.ibtvo4dkqhh1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">man</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `man stands for manual
It displays:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Command description<br></span></li><li class="c10 li-bullet-0"><span class="c0">Syntax<br></span></li><li class="c10 li-bullet-0"><span class="c0">Options<br></span></li><li class="c10 li-bullet-0"><span class="c0">Examples<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.udqck0cf6v1x" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `man command_name` }} />
          <hr className={styles.divider} />
          <h3 id="h.7veyjuhcgxj9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `man ls
Shows:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">NAME<br></span></li><li class="c10 li-bullet-0"><span class="c0">SYNOPSIS<br></span></li><li class="c10 li-bullet-0"><span class="c0">DESCRIPTION<br></span></li><li class="c10 li-bullet-0"><span class="c0">OPTIONS<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.tqn5xsh8sf36" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output Structure</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `LS(1)                   User Commands                   LS(1)
NAME
ls - list directory contents
SYNOPSIS
ls [OPTION]... [FILE]...
DESCRIPTION
List information about the FILEs` }} />
          <hr className={styles.divider} />
          <h3 id="h.slo6npjxj8bu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Navigation in man Page</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c77"><span class="c19">Key</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c77"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c15"><span class="c12">Enter</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c15"><span class="c0">Next line</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c15"><span class="c12">Space</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c15"><span class="c0">Next page</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c15"><span class="c12">b</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c15"><span class="c0">Previous page</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c15"><span class="c12">/word</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c15"><span class="c0">Search</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c15"><span class="c12">n</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c15"><span class="c0">Next match</span></p></td></tr><tr class="c5"><td class="c48" colspan="1" rowspan="1"><p class="c15"><span class="c12">q</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c15"><span class="c0">Quit</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.50gwj8np4bte" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Search inside man</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `man grep
Inside man:
/recursive` }} />
          <hr className={styles.divider} />
          <h3 id="h.1oa79vnio1c2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Specific Section</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `man 5 passwd
Section 5 → file formats` }} />
          <hr className={styles.divider} />
          <h3 id="h.y6b5hekhi1vn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Man Sections</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c88" colspan="1" rowspan="1"><p class="c77"><span class="c19">Section</span></p></td><td class="c76" colspan="1" rowspan="1"><p class="c77"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c88" colspan="1" rowspan="1"><p class="c15"><span class="c0">1</span></p></td><td class="c76" colspan="1" rowspan="1"><p class="c15"><span class="c0">User commands</span></p></td></tr><tr class="c5"><td class="c88" colspan="1" rowspan="1"><p class="c15"><span class="c0">2</span></p></td><td class="c76" colspan="1" rowspan="1"><p class="c15"><span class="c0">System calls</span></p></td></tr><tr class="c5"><td class="c88" colspan="1" rowspan="1"><p class="c15"><span class="c0">3</span></p></td><td class="c76" colspan="1" rowspan="1"><p class="c15"><span class="c0">Library calls</span></p></td></tr><tr class="c5"><td class="c88" colspan="1" rowspan="1"><p class="c15"><span class="c0">4</span></p></td><td class="c76" colspan="1" rowspan="1"><p class="c15"><span class="c0">Devices</span></p></td></tr><tr class="c5"><td class="c88" colspan="1" rowspan="1"><p class="c15"><span class="c0">5</span></p></td><td class="c76" colspan="1" rowspan="1"><p class="c15"><span class="c0">File formats</span></p></td></tr><tr class="c5"><td class="c88" colspan="1" rowspan="1"><p class="c15"><span class="c0">8</span></p></td><td class="c76" colspan="1" rowspan="1"><p class="c15"><span class="c0">Admin commands</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.a58ni5xpmo6b" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">3. </span><span class="c55 c38 c19">help</span><span class="c27 c19"> Command (Shell Built-ins)</span>` }} />
          <h3 id="h.j24q1u7l4dc8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">help</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Shows help for </span><span class="c22 c19">shell built-in commands<br></span></li><li class="c10 li-bullet-0"><span>Faster than </span><span class="c1">man<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.rzq7hxjd0snh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `help
help command` }} />
          <hr className={styles.divider} />
          <h3 id="h.8yni6r74vyuq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `help cd
Output:
cd: cd [-L|-P] [dir]
Change the shell working directory.` }} />
          <hr className={styles.divider} />
          <h3 id="h.kp88xj3loz94" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `help exit` }} />
          <hr className={styles.divider} />
          <h3 id="h.bnpsllxi5w1h" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Difference: man vs help</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c57" colspan="1" rowspan="1"><p class="c77"><span class="c19">man</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c77"><span class="c19">help</span></p></td></tr><tr class="c5"><td class="c57" colspan="1" rowspan="1"><p class="c15"><span class="c0">External commands</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c15"><span class="c0">Shell built-ins</span></p></td></tr><tr class="c5"><td class="c57" colspan="1" rowspan="1"><p class="c15"><span class="c0">Detailed</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c15"><span class="c0">Short explanation</span></p></td></tr><tr class="c5"><td class="c57" colspan="1" rowspan="1"><p class="c15"><span class="c0">Uses pager</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c15"><span class="c0">Instant output</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.q9y0g9lhdg5t" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">4. </span><span class="c55 c38 c19">info</span><span class="c27 c19"> Command</span>` }} />
          <h3 id="h.2b7v1ipil724" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">info</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">GNU documentation system<br></span></li><li class="c10 li-bullet-0"><span class="c0">More structured than man<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.v6fd5z5mcgor" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `info command` }} />
          <hr className={styles.divider} />
          <h3 id="h.otappnp2ifor" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `info ls` }} />
          <hr className={styles.divider} />
          <h3 id="h.i9v6ms96t8dz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Navigation Keys</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c45" colspan="1" rowspan="1"><p class="c77"><span class="c19">Key</span></p></td><td class="c99" colspan="1" rowspan="1"><p class="c77"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c45" colspan="1" rowspan="1"><p class="c15"><span class="c12">n</span></p></td><td class="c99" colspan="1" rowspan="1"><p class="c15"><span class="c0">Next</span></p></td></tr><tr class="c5"><td class="c45" colspan="1" rowspan="1"><p class="c15"><span class="c12">p</span></p></td><td class="c99" colspan="1" rowspan="1"><p class="c15"><span class="c0">Previous</span></p></td></tr><tr class="c5"><td class="c45" colspan="1" rowspan="1"><p class="c15"><span class="c12">u</span></p></td><td class="c99" colspan="1" rowspan="1"><p class="c15"><span class="c0">Up</span></p></td></tr><tr class="c5"><td class="c45" colspan="1" rowspan="1"><p class="c15"><span class="c12">q</span></p></td><td class="c99" colspan="1" rowspan="1"><p class="c15"><span class="c0">Quit</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.j405nd6zqam1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Comparison</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c36" colspan="1" rowspan="1"><p class="c77"><span class="c19">man</span></p></td><td class="c53" colspan="1" rowspan="1"><p class="c77"><span class="c19">info</span></p></td></tr><tr class="c5"><td class="c36" colspan="1" rowspan="1"><p class="c15"><span class="c0">Short &amp; quick</span></p></td><td class="c53" colspan="1" rowspan="1"><p class="c15"><span class="c0">Detailed &amp; structured</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.641mpyeg7y6i" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">5. </span><span class="c55 c38 c19">whatis</span><span class="c27 c19"> Command</span>` }} />
          <h3 id="h.gt6u3wxouiql" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">whatis</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">One-line description of command<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.tpiiz2wv134d" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `whatis command` }} />
          <hr className={styles.divider} />
          <h3 id="h.c9fyczarsgnc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `whatis ls
Output:
ls (1) - list directory contents` }} />
          <hr className={styles.divider} />
          <h3 id="h.4jxqlg4ea8r4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `whatis chmod
Output:
chmod (1) - change file mode bits` }} />
          <hr className={styles.divider} />
          <h3 id="h.geqq3cyyts1b" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">When to Use</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Quick reference  Interview preparation  Command recall` }} />
          <hr className={styles.divider} />
          <h2 id="h.8dh4rrm4e02t" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">6. </span><span class="c55 c38 c19">apropos</span><span class="c27 c19"> Command</span>` }} />
          <h3 id="h.l3mrje36je7g" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">apropos</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Searches man page descriptions<br></span></li><li class="c10 li-bullet-0"><span class="c0">Finds commands by keyword<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.63tkl4acwitp" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `apropos keyword` }} />
          <hr className={styles.divider} />
          <h3 id="h.8bxp571b3t1t" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `apropos copy
Output:
cp (1) - copy files and directories
scp (1) - secure copy` }} />
          <hr className={styles.divider} />
          <h3 id="h.qykgfa3536gk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `apropos network` }} />
          <hr className={styles.divider} />
          <h2 id="h.kjaz69dycpc9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">7. </span><span class="c55 c38 c19">type</span><span class="c27 c19"> Command</span>` }} />
          <h3 id="h.nga45k10yw6d" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">type</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Shows:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Command type<br></span></li><li class="c10 li-bullet-0"><span class="c0">Built-in / external / alias<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.gb1q2yzj7r9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `type command` }} />
          <hr className={styles.divider} />
          <h3 id="h.7nukntkerqwm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `type cd
Output:
cd is a shell builtin` }} />
          <hr className={styles.divider} />
          <h3 id="h.3508ld6fnmp" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `type ls
Output:
ls is /usr/bin/ls` }} />
          <hr className={styles.divider} />
          <h2 id="h.19tls63m0usi" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">8. </span><span class="c55 c38 c19">which</span><span class="c27 c19"> Command</span>` }} />
          <h3 id="h.2av26qiw49wv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">which</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Shows full path of command<br></span></li><li class="c10 li-bullet-0"><span class="c0">Uses PATH variable<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.gnhprkgldzpd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `which command` }} />
          <hr className={styles.divider} />
          <h3 id="h.uo37r7yetngf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `which python
Output:
/usr/bin/python` }} />
          <hr className={styles.divider} />
          <h2 id="h.2xn7c1do25gl" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">9. </span><span class="c55 c38 c19">whereis</span><span class="c27 c19"> Command</span>` }} />
          <h3 id="h.wjd6bwymf8bf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">whereis</span><span class="c17">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Finds binary, source, man pages<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.6tv7vyhgxfl5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `whereis command` }} />
          <hr className={styles.divider} />
          <h3 id="h.uad4cn4fb8d0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `whereis gcc
Output:
gcc: /usr/bin/gcc /usr/lib/gcc /usr/share/man/man1/gcc.1.gz` }} />
          <hr className={styles.divider} />
          <h2 id="h.kwsb5un4ekxy" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">10. </span><span class="c55 c38 c19">--help</span><span class="c27 c19"> Option</span>` }} />
          <h3 id="h.6r78pdtbe4mo" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c35 c19">What is </span><span class="c55 c56 c19">--help</span><span class="c17">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Most commands support quick help` }} />
          <hr className={styles.divider} />
          <h3 id="h.9g2vli1sum2a" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `command --help` }} />
          <hr className={styles.divider} />
          <h3 id="h.k0orgpbjk95y" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls --help` }} />
          <hr className={styles.divider} />
          <h3 id="h.5iz5md7zbp48" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep --help
Shows:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Syntax<br></span></li><li class="c10 li-bullet-0"><span class="c0">Options<br></span></li><li class="c10 li-bullet-0"><span class="c0">Usage<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.hqtdoryrj1bg" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">11. Comparison Table (Quick Revision)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c77"><span class="c19">Command</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c77"><span class="c19">Purpose</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c15"><span class="c0">man</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c15"><span class="c0">Full documentation</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c15"><span class="c0">help</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c15"><span class="c0">Shell built-ins</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c15"><span class="c0">info</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c15"><span class="c0">GNU docs</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c15"><span class="c0">whatis</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c15"><span class="c0">One-line info</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c15"><span class="c0">apropos</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c15"><span class="c0">Search commands</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c15"><span class="c0">type</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c15"><span class="c0">Command type</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c15"><span class="c0">which</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c15"><span class="c0">Command path</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c15"><span class="c0">whereis</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c15"><span class="c0">Binary + man</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c15"><span class="c0">--help</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c15"><span class="c0">Quick help</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.cog0sv7gl6pg" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">12. Real Student Workflow</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1️⃣ Forgot command usage
man command
2️⃣ Need quick syntax
command --help
3️⃣ Find related command
apropos keyword
4️⃣ Check built-in
type command` }} />
          <hr className={styles.divider} />
          <h2 id="h.4u6on730opf8" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">14. Student Summary</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux is self-documented  No need to memorize everything  man is your best friend  Helpful commands save time  Essential for Linux mastery
LINUX TEXT VIEWING, SEARCHING &amp; PROCESSING COMMANDS` }} />
          <h3 id="h.sqci5zhbs8j5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c92 c35 c19">(more, less, grep, pipe, sed – COMPLETE GUIDE)</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.d9kke6286jzt" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">1. </span><span class="c51 c19">more</span><span class="c24 c19"> Command</span>` }} />
          <h2 id="h.7uw6g5mddczo" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">What is </span><span class="c55 c38 c19">more</span><span class="c27 c19">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `more is used to view file content page by page when the file is large.` }} />
          <hr className={styles.divider} />
          <h2 id="h.1h6bepkyghj0" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `more filename` }} />
          <hr className={styles.divider} />
          <h2 id="h.y2fxdmlowxa2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `more /etc/passwd
Displays content one screen at a time` }} />
          <hr className={styles.divider} />
          <h2 id="h.37mengy98a2k" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls -l /etc | more
Output of ls viewed page by page` }} />
          <hr className={styles.divider} />
          <h2 id="h.2kqwblaj1q96" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ps aux | more
Large process list readable` }} />
          <hr className={styles.divider} />
          <h2 id="h.f0ixnroiop3m" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">Important Keys in </span><span class="c90 c55 c38 c19">more</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c73" colspan="1" rowspan="1"><p class="c13"><span class="c19">Key</span></p></td><td class="c23" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c73" colspan="1" rowspan="1"><p class="c3"><span class="c0">Space</span></p></td><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c0">Next page</span></p></td></tr><tr class="c5"><td class="c73" colspan="1" rowspan="1"><p class="c3"><span class="c0">Enter</span></p></td><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c0">Next line</span></p></td></tr><tr class="c5"><td class="c73" colspan="1" rowspan="1"><p class="c3"><span class="c0">q</span></p></td><td class="c23" colspan="1" rowspan="1"><p class="c3"><span class="c0">Quit</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.9gcdoqvhqx03" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">Limitations of </span><span class="c55 c38 c19 c90">more</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Cannot scroll backward  Limited search` }} />
          <hr className={styles.divider} />
          <h1 id="h.qxmz7beq3mc0" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">2. </span><span class="c51 c19">less</span><span class="c24 c19"> Command</span>` }} />
          <h2 id="h.kar4rsbwgzsa" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">What is </span><span class="c55 c38 c19">less</span><span class="c27 c19">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Advanced version of more  Scroll forward &amp; backward` }} />
          <hr className={styles.divider} />
          <h2 id="h.dplx879av57m" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `less filename` }} />
          <hr className={styles.divider} />
          <h2 id="h.r10tqa6dhvzd" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `less /var/log/syslog` }} />
          <hr className={styles.divider} />
          <h2 id="h.vzudwbscg0as" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls -R / | less` }} />
          <hr className={styles.divider} />
          <h2 id="h.ewmw0j390m5x" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `history | less` }} />
          <hr className={styles.divider} />
          <h2 id="h.phtuzdw1te4l" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">Useful Keys in </span><span class="c90 c55 c38 c19">less</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c73" colspan="1" rowspan="1"><p class="c13"><span class="c19">Key</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c13"><span class="c19">Action</span></p></td></tr><tr class="c5"><td class="c73" colspan="1" rowspan="1"><p class="c3"><span class="c0">Space</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c3"><span class="c0">Next page</span></p></td></tr><tr class="c5"><td class="c73" colspan="1" rowspan="1"><p class="c3"><span class="c0">b</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c3"><span class="c0">Previous page</span></p></td></tr><tr class="c5"><td class="c73" colspan="1" rowspan="1"><p class="c3"><span class="c0">/word</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c3"><span class="c0">Search</span></p></td></tr><tr class="c5"><td class="c73" colspan="1" rowspan="1"><p class="c3"><span class="c0">n</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c3"><span class="c0">Next match</span></p></td></tr><tr class="c5"><td class="c73" colspan="1" rowspan="1"><p class="c3"><span class="c0">q</span></p></td><td class="c66" colspan="1" rowspan="1"><p class="c3"><span class="c0">Quit</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.5oeqwap0nzei" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">Why </span><span class="c55 c38 c19">less</span><span class="c27 c19"> is better</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Faster  Search support  Backward navigation` }} />
          <hr className={styles.divider} />
          <h1 id="h.mx202zywgf3g" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">3. </span><span class="c19 c51">grep</span><span class="c24 c19"> Command</span>` }} />
          <h2 id="h.jlizgh77wb7o" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">What is </span><span class="c38 c19 c55">grep</span><span class="c27 c19">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Search text patterns inside files or output` }} />
          <hr className={styles.divider} />
          <h2 id="h.dlcx6yaxb8gr" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep "pattern" file` }} />
          <hr className={styles.divider} />
          <h2 id="h.p9d8az9oghfh" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep root /etc/passwd` }} />
          <hr className={styles.divider} />
          <h2 id="h.ul3s3hqb2nj9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ps aux | grep ssh` }} />
          <hr className={styles.divider} />
          <h2 id="h.4xzes0y1np4c" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep error logfile.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.3icwf1lzugoj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">Common </span><span class="c55 c38 c19">grep</span><span class="c27 c19"> Options</span>` }} />
          <h3 id="h.dyj7e9qcj5qg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c55 c56 c19">-i</span><span class="c17"> (Ignore case)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep -i linux file.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.z3t62eotiaha" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c55 c56 c19">-n</span><span class="c17"> (Line number)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep -n root /etc/passwd` }} />
          <hr className={styles.divider} />
          <h3 id="h.q3065db2zo73" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c55 c56 c19">-v</span><span class="c17"> (Invert match)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep -v root /etc/passwd` }} />
          <hr className={styles.divider} />
          <h3 id="h.egtbgpeit5pt" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c55 c56 c19">-r</span><span class="c17"> (Recursive)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep -r error /var/log` }} />
          <hr className={styles.divider} />
          <h3 id="h.ebdsj9cm6ckr" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c55 c56 c19">-w</span><span class="c17"> (Exact word)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep -w user file.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.7q1lnc99ya1d" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c55 c56 c19">-c</span><span class="c17"> (Count matches)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep -c error logfile.txt` }} />
          <hr className={styles.divider} />
          <h1 id="h.qled5kfjmoz8" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">4. Pipe Operator </span><span class="c39 c19">|</span>` }} />
          <h2 id="h.wk1eyfrqyblc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">What is Pipe?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Pass output of one command as input to another` }} />
          <hr className={styles.divider} />
          <h2 id="h.yxtreztb9yn2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `command1 | command2` }} />
          <hr className={styles.divider} />
          <h2 id="h.z6ipl35ehjzq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls | more` }} />
          <hr className={styles.divider} />
          <h2 id="h.xi1720z8zbkl" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ps aux | grep root` }} />
          <hr className={styles.divider} />
          <h2 id="h.jp57ww5yu4o6" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cat file.txt | wc -l` }} />
          <hr className={styles.divider} />
          <h2 id="h.pammkiduxqbn" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Multiple Pipes</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ps aux | grep ssh | wc -l` }} />
          <hr className={styles.divider} />
          <h2 id="h.i1js79l0q6y" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Why Pipes are powerful</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Avoid temporary files  Faster processing  Clean output` }} />
          <hr className={styles.divider} />
          <h1 id="h.4yszufg1ypt5" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">5. </span><span class="c51 c19">sed</span><span class="c24 c19"> Command (Stream Editor)</span>` }} />
          <h2 id="h.5zwey1uru8l6" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">What is </span><span class="c55 c38 c19">sed</span><span class="c27 c19">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Used to search, replace, delete, edit text without opening editor` }} />
          <hr className={styles.divider} />
          <h2 id="h.16w0tovdi9u4" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sed 'operation' filename` }} />
          <hr className={styles.divider} />
          <h2 id="h.nj92mpw0ckpj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5.1 Replace Text</span>` }} />
          <h3 id="h.3figlhbfp80o" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sed 's/Linux/UNIX/' file.txt
Replaces first occurrence per line` }} />
          <hr className={styles.divider} />
          <h3 id="h.85jpgihc66oe" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Replace all occurrences</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sed 's/Linux/UNIX/g' file.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.3056ew1s06qn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Case insensitive</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sed 's/linux/UNIX/gi' file.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.gyq2sx637l0n" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5.2 Delete Lines</span>` }} />
          <h3 id="h.ojickzhg73q6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Delete specific line</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sed '3d' file.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.cvkksjbf4v7u" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Delete range</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sed '2,5d' file.txt` }} />
          <hr className={styles.divider} />
          <h3 id="h.zgvktfp636n7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Delete matching pattern</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sed '/error/d' logfile.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.ah8tebfp4tme" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5.3 Print Specific Lines</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sed -n '5p' file.txt
sed -n '2,6p' file.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.im5chad6fv0x" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5.4 Save Output to File</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sed 's/old/new/g' file.txt &gt; newfile.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.ad037ks11wo7" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">5.5 Edit File Permanently (</span><span class="c55 c38 c19">-i</span><span class="c27 c19">)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `sed -i 's/old/new/g' file.txt
⚠ Be careful – modifies file directly` }} />
          <hr className={styles.divider} />
          <h1 id="h.9j3t3qupel9o" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">6. Combined Usage (Real-World Examples)</span>` }} />
          <h3 id="h.k617163v4qb4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `grep error logfile.txt | less` }} />
          <hr className={styles.divider} />
          <h3 id="h.qmal0n7j7u97" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ps aux | grep root | sed 's/root/ADMIN/'` }} />
          <hr className={styles.divider} />
          <h3 id="h.tlzmvilikpao" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `cat file.txt | sed 's/test/demo/g' | grep demo` }} />
          <hr className={styles.divider} />
          <h1 id="h.qd03dun7t81i" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">7. Command Comparison</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c13"><span class="c19">Command</span></p></td><td class="c63" colspan="1" rowspan="1"><p class="c13"><span class="c19">Purpose</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c0">more</span></p></td><td class="c63" colspan="1" rowspan="1"><p class="c3"><span class="c0">Simple paging</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c0">less</span></p></td><td class="c63" colspan="1" rowspan="1"><p class="c3"><span class="c0">Advanced paging</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c0">grep</span></p></td><td class="c63" colspan="1" rowspan="1"><p class="c3"><span class="c0">Search text</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c0">pipe \`</span></p></td><td class="c63" colspan="1" rowspan="1"><p class="c3"><span class="c0">\`</span></p></td></tr><tr class="c5"><td class="c4" colspan="1" rowspan="1"><p class="c3"><span class="c0">sed</span></p></td><td class="c63" colspan="1" rowspan="1"><p class="c3"><span class="c0">Edit text</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h1 id="h.h0rovl64xevc" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">8. Student Practice Tasks</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1️⃣ View large file using less 2️⃣ Search word ignoring case 3️⃣ Replace word using sed 4️⃣ Use pipe with grep 5️⃣ Count matching lines` }} />
          <hr className={styles.divider} />
          <h1 id="h.imbmderv5pud" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">9. Interview Important Notes</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `less preferred over more  grep + pipe very common  sed used in scripts  Pipes reduce memory usage` }} />
          <h1 id="h.kd8qdhscsemg" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">AWK COMMAND – COMPLETE LECTURE WITH OUTPUTS</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.8axnskzfckad" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. What is AWK (Simple Explanation)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk is a text processing tool used to:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span>Read a file </span><span class="c22 c19">line by line<br></span></li><li class="c10 li-bullet-0"><span>Split each line into </span><span class="c22 c19">columns (fields)<br></span></li><li class="c10 li-bullet-0"><span>Perform </span><span class="c22 c19">filtering, calculations, formatting<br></span></li>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Think of AWK like Excel for text files.` }} />
          <hr className={styles.divider} />
          <h2 id="h.4zdelz9krj5q" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. Sample File Used for All Examples</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Let us create a file called data.txt
ID Name Marks
1 Ravi 85
2 Sita 90
3 Kumar 78
4 Anil 92` }} />
          <hr className={styles.divider} />
          <h2 id="h.21o33tytqsqv" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. Basic AWK Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123; action &#125;' filename` }} />
          <hr className={styles.divider} />
          <h3 id="h.71vs46ukobs4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Print entire file</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;print&#125;' data.txt` }} />
          <h3 id="h.9l3lh6w6r008" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ID Name Marks
1 Ravi 85
2 Sita 90
3 Kumar 78
4 Anil 92
Same as cat, but processed line by line.` }} />
          <hr className={styles.divider} />
          <h2 id="h.spasvm840o8a" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">4. </span><span class="c55 c38 c19">$0</span><span class="c27 c19"> – Print Complete Line</span>` }} />
          <h3 id="h.ti2c4xgwoyeb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;print $0&#125;' data.txt` }} />
          <h3 id="h.vu1cpl1il2i" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ID Name Marks
1 Ravi 85
2 Sita 90
3 Kumar 78
4 Anil 92
$0 means entire current line` }} />
          <hr className={styles.divider} />
          <h2 id="h.6a99yqeq0uyi" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">5. </span><span class="c55 c38 c19">$1</span><span class="c38 c19">, </span><span class="c55 c38 c19">$2</span><span class="c38 c19">, </span><span class="c55 c38 c19">$3</span><span class="c27 c19"> – Fields (Columns)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c20" colspan="1" rowspan="1"><p class="c13"><span class="c19">Variable</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c20" colspan="1" rowspan="1"><p class="c3"><span class="c0">$1</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c3"><span class="c0">First column</span></p></td></tr><tr class="c5"><td class="c20" colspan="1" rowspan="1"><p class="c3"><span class="c0">$2</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c3"><span class="c0">Second column</span></p></td></tr><tr class="c5"><td class="c20" colspan="1" rowspan="1"><p class="c3"><span class="c0">$3</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c3"><span class="c0">Third column</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.5qtfwfwm7cpo" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Print Names only</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;print $2&#125;' data.txt` }} />
          <h3 id="h.rpo5w4elvm60" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Name
Ravi
Sita
Kumar
Anil` }} />
          <hr className={styles.divider} />
          <h3 id="h.wqy6qb2zzvvn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Print ID and Marks</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;print $1, $3&#125;' data.txt` }} />
          <h3 id="h.uqhmnp9kh9of" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ID Marks
1 85
2 90
3 78
4 92` }} />
          <hr className={styles.divider} />
          <h2 id="h.v1bkpjl1529r" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">6. </span><span class="c55 c38 c19">NR</span><span class="c27 c19"> – Line Number</span>` }} />
          <h3 id="h.mhtt8bchnf1a" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;print NR, $0&#125;' data.txt` }} />
          <h3 id="h.tqgbnj9bwu4f" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1 ID Name Marks
2 1 Ravi 85
3 2 Sita 90
4 3 Kumar 78
5 4 Anil 92
NR = record (line) number` }} />
          <hr className={styles.divider} />
          <h3 id="h.wn6rvzrgcc0u" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example: Print only 3rd line</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'NR==3 &#123;print&#125;' data.txt` }} />
          <h3 id="h.la4j8me7d6kr" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `2 Sita 90` }} />
          <hr className={styles.divider} />
          <h2 id="h.frl7bz1elsq6" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">7. </span><span class="c55 c38 c19">NF</span><span class="c27 c19"> – Number of Fields</span>` }} />
          <h3 id="h.oexb0lk38806" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;print NF&#125;' data.txt` }} />
          <h3 id="h.8a2jf9128c2l" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `3
3
3
3
3
Each line has 3 columns` }} />
          <hr className={styles.divider} />
          <h2 id="h.u68d9wm4q5y" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">8. </span><span class="c55 c38 c19">FS</span><span class="c27 c19"> – Field Separator</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Default separator = space` }} />
          <hr className={styles.divider} />
          <h3 id="h.gaxj7deorvlk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example File: users.txt</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `root:x:0:0
ravi:x:1001:1001
sita:x:1002:1002` }} />
          <hr className={styles.divider} />
          <h3 id="h.lk9weu81g0o5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;FS=":"&#125; &#123;print $1&#125;' users.txt` }} />
          <h3 id="h.tjffzbv9wrs4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `root
ravi
sita
FS=":" tells awk to split by colon` }} />
          <hr className={styles.divider} />
          <h2 id="h.xhm0b9q82br8" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">9. </span><span class="c55 c38 c19">OFS</span><span class="c27 c19"> – Output Field Separator</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.3sobk64rknxn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;OFS=" | "&#125; &#123;print $1,$2,$3&#125;' data.txt` }} />
          <h3 id="h.usrqrabgps01" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ID | Name | Marks
1 | Ravi | 85
2 | Sita | 90
3 | Kumar | 78
4 | Anil | 92` }} />
          <hr className={styles.divider} />
          <h2 id="h.e1ymgobu90b1" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">10. BEGIN Block (Pre-Processing)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Executed once before reading file` }} />
          <hr className={styles.divider} />
          <h3 id="h.nz3tjhh0i3vy" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;print "Student Marks Report"&#125; &#123;print $2,$3&#125;' data.txt` }} />
          <h3 id="h.g323ck2b5dq0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Student Marks Report
Name Marks
Ravi 85
Sita 90
Kumar 78
Anil 92` }} />
          <hr className={styles.divider} />
          <h2 id="h.h8h3gu3xsc7y" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">11. END Block (Post-Processing)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Executed once after file ends` }} />
          <hr className={styles.divider} />
          <h3 id="h.twpuuej5rmct" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;sum+=$3&#125; END&#123;print "Total Marks:", sum&#125;' data.txt` }} />
          <h3 id="h.23yv7nr6beng" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Total Marks: 345` }} />
          <hr className={styles.divider} />
          <h2 id="h.hf7rds9xcbpx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">12. Calculate Average</span>` }} />
          <h3 id="h.4uasaxayesg7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;sum+=$3&#125; END&#123;print "Average:", sum/(NR-1)&#125;' data.txt` }} />
          <h3 id="h.an23u9m1p73m" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Average: 86.25
(NR-1 because first line is header)` }} />
          <hr className={styles.divider} />
          <h2 id="h.k8as2agx94v2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">13. Conditional Statements</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.pig77ylpb1mi" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example: Marks &gt; 80</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '$3&gt;80 &#123;print $2,$3&#125;' data.txt` }} />
          <h3 id="h.lifvj5t7fv5r" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90
Anil 92` }} />
          <hr className={styles.divider} />
          <h2 id="h.kh5btcfh2gvj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">14. Pattern Matching</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.gtge388tsygz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example: Find name "Sita"</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '/Sita/ &#123;print&#125;' data.txt` }} />
          <h3 id="h.73lgo4pktbfk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `2 Sita 90` }} />
          <hr className={styles.divider} />
          <h2 id="h.blfhftv98s6a" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">15. Multiple Conditions</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.2vpa47huozq7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '$3&gt;80 &amp;&amp; $2!="Ravi" &#123;print $2&#125;' data.txt` }} />
          <h3 id="h.ky45ozdirt9a" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Sita
Anil` }} />
          <hr className={styles.divider} />
          <h2 id="h.mdf98njt2rxh" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c19 c38">16. </span><span class="c90 c55 c38 c19">FILENAME</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.b3s7fyw28rro" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;print FILENAME, NR, $0&#125;' data.txt` }} />
          <h3 id="h.l0tkohi66921" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `data.txt 1 ID Name Marks
data.txt 2 1 Ravi 85
data.txt 3 2 Sita 90
data.txt 4 3 Kumar 78
data.txt 5 4 Anil 92` }} />
          <hr className={styles.divider} />
          <h2 id="h.dl9ew57d9htp" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">17. AWK with Pipe</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.br36j5atbrlz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ls -l | awk '&#123;print $9&#125;'` }} />
          <h3 id="h.qmhievr7t9y8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `data.txt
users.txt` }} />
          <hr className={styles.divider} />
          <h2 id="h.vpnrrixy54se" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">18. Full AWK Program (BEGIN + BODY + END)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '
BEGIN &#123; print "----Report Start----" &#125;
&#123; print NR, $2, $3 &#125;
END &#123; print "----Report End----" &#125;
' data.txt` }} />
          <h3 id="h.6bhq7gori5kz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `----Report Start----
1 Name Marks
2 Ravi 85
3 Sita 90
4 Kumar 78
5 Anil 92
----Report End----` }} />
          <hr className={styles.divider} />
          <h2 id="h.q8selvn3fksh" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">19. Real-Time Use Case (Log Analysis)</span>` }} />
          <h3 id="h.wb6ejm1gibji" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">log.txt</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `INFO server started
ERROR disk full
INFO user login
ERROR memory low` }} />
          <hr className={styles.divider} />
          <h3 id="h.z1a28fvkt0hq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '/ERROR/ &#123;print NR,$0&#125;' log.txt` }} />
          <h3 id="h.hk9y9cmxv8gh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `2 ERROR disk full
4 ERROR memory low` }} />
          <hr className={styles.divider} />
          <h2 id="h.b0vtxhvv1nzc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">20. Student Practice (Important)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1️⃣ Print only 2nd column 2️⃣ Print lines &gt; 80 marks 3️⃣ Calculate total marks 4️⃣ Show line numbers 5️⃣ Change field separator` }} />
          <h1 id="h.2s1s0w2dndow" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">AWK OPERATORS – COMPLETE LECTURE WITH OUTPUTS</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `We will cover ALL AWK operators step by step:` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Arithmetic Operators<br></span></li><li class="c10 li-bullet-0"><span class="c0">Increment &amp; Decrement Operators<br></span></li><li class="c10 li-bullet-0"><span class="c0">Assignment Operators<br></span></li><li class="c10 li-bullet-0"><span class="c0">Relational Operators<br></span></li><li class="c10 li-bullet-0"><span class="c0">Logical Operators<br></span></li><li class="c10 li-bullet-0"><span class="c0">Ternary Operator<br></span></li><li class="c10 li-bullet-0"><span class="c0">Exponential Operator<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.uwapzt3g5kmv" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Common Sample File (marks.txt)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ID Name Marks
1 Ravi 85
2 Sita 90
3 Kumar 78
4 Anil 92` }} />
          <hr className={styles.divider} />
          <h2 id="h.4mxc8ms9ael5" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. Arithmetic Operators in AWK</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c13"><span class="c19">Operator</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">+</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c3"><span class="c0">Addition</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">-</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c3"><span class="c0">Subtraction</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">*</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c3"><span class="c0">Multiplication</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">/</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c3"><span class="c0">Division</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">%</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c3"><span class="c0">Modulus</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.us5mnag79akm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Add 5 marks to everyone</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1) print $2, $3+5&#125;' marks.txt` }} />
          <h3 id="h.f9lfrq3vfi5j" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 90
Sita 95
Kumar 83
Anil 97` }} />
          <hr className={styles.divider} />
          <h3 id="h.df6jlwvuf5kx" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Multiply marks by 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1) print $2, $3*2&#125;' marks.txt` }} />
          <h3 id="h.orsk0aasgfq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 170
Sita 180
Kumar 156
Anil 184` }} />
          <hr className={styles.divider} />
          <h3 id="h.fvytkbb1dyis" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Average marks</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;sum+=$3&#125; END&#123;print sum/(NR-1)&#125;' marks.txt` }} />
          <h3 id="h.v0gylvo5csq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `86.25` }} />
          <hr className={styles.divider} />
          <h3 id="h.my4z3j4jjhul" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 4: Modulus (Even / Odd marks)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1) print $2, $3%2&#125;' marks.txt` }} />
          <h3 id="h.fvzaxy4u5kha" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 1
Sita 0
Kumar 0
Anil 0
1 = Odd, 0 = Even` }} />
          <hr className={styles.divider} />
          <h2 id="h.ddau3lhxslsw" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. Increment &amp; Decrement Operators</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c13"><span class="c19">Operator</span></p></td><td class="c31" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">++</span></p></td><td class="c31" colspan="1" rowspan="1"><p class="c3"><span class="c0">Increment by 1</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">--</span></p></td><td class="c31" colspan="1" rowspan="1"><p class="c3"><span class="c0">Decrement by 1</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.s9c4cblc1snk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Increase marks by 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1)&#123;$3++; print $2,$3&#125;&#125;' marks.txt` }} />
          <h3 id="h.f92mlqpmycpk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 86
Sita 91
Kumar 79
Anil 93` }} />
          <hr className={styles.divider} />
          <h3 id="h.nrbhdbq24jsk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Decrease marks by 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1)&#123;$3--; print $2,$3&#125;&#125;' marks.txt` }} />
          <h3 id="h.ooeve88dda5q" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 84
Sita 89
Kumar 77
Anil 91` }} />
          <hr className={styles.divider} />
          <h3 id="h.exjr5j26qbwk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Line Counter using Increment</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;c=0&#125; &#123;c++&#125; END&#123;print c&#125;' marks.txt` }} />
          <h3 id="h.catiwd8w9vv1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `5` }} />
          <hr className={styles.divider} />
          <h2 id="h.tboie26bvyud" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. Assignment Operators</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c13"><span class="c19">Operator</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">=</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c3"><span class="c0">Assign</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">+=</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c3"><span class="c0">Add and assign</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">-=</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c3"><span class="c0">Subtract and assign</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">*=</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c3"><span class="c0">Multiply and assign</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">/=</span></p></td><td class="c74" colspan="1" rowspan="1"><p class="c3"><span class="c0">Divide and assign</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.je0ujo6fjk0j" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Add all marks</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;sum += $3&#125; END&#123;print sum&#125;' marks.txt` }} />
          <h3 id="h.d3y3oqitviwf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `345` }} />
          <hr className={styles.divider} />
          <h3 id="h.9bmudnmuhyii" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Reduce marks by 10</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1)&#123;$3 -=10; print $2,$3&#125;&#125;' marks.txt` }} />
          <h3 id="h.1kuybh929114" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 75
Sita 80
Kumar 68
Anil 82` }} />
          <hr className={styles.divider} />
          <h3 id="h.xxm2cvqkj7v7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Double sum</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;sum += $3&#125; END&#123;sum *=2; print sum&#125;' marks.txt` }} />
          <h3 id="h.sq3x3p1891b5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `690` }} />
          <hr className={styles.divider} />
          <h2 id="h.gz62r0yinleb" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">4. Relational Operators</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c13"><span class="c19">Operator</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">&gt;</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c3"><span class="c0">Greater than</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">&lt;</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c3"><span class="c0">Less than</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">&gt;=</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c3"><span class="c0">Greater than or equal</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">&lt;=</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c3"><span class="c0">Less than or equal</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">==</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c3"><span class="c0">Equal</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">!=</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c3"><span class="c0">Not equal</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.2eqouak1sxdc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Marks greater than 80</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '$3 &gt; 80 &#123;print $2,$3&#125;' marks.txt` }} />
          <h3 id="h.1fa2je5a1am" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90
Anil 92` }} />
          <hr className={styles.divider} />
          <h3 id="h.blkakpryxjpq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Marks equal to 90</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '$3 == 90 &#123;print $2&#125;' marks.txt` }} />
          <h3 id="h.r2x3t4pwy6na" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Sita` }} />
          <hr className={styles.divider} />
          <h3 id="h.rmrjvzajrnhh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Marks not equal to 78</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '$3 != 78 &#123;print $2,$3&#125;' marks.txt` }} />
          <h3 id="h.l4ifnmeqpcfg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90
Anil 92` }} />
          <hr className={styles.divider} />
          <h2 id="h.9m73aenz2a6v" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5. Logical Operators</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c13"><span class="c19">Operator</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">&amp;&amp;</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c3"><span class="c0">AND</span></p></td></tr><tr class="c103"><td class="c67" colspan="1" rowspan="1"><p class="c2"><span class="c0"></span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c2"><span class="c0"></span></p></td></tr><tr class="c5"><td class="c67" colspan="1" rowspan="1"><p class="c3"><span class="c0">!</span></p></td><td class="c81" colspan="1" rowspan="1"><p class="c3"><span class="c0">NOT</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.kqrijxqxr0q8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Marks &gt;80 AND name not Ravi</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '$3&gt;80 &amp;&amp; $2!="Ravi" &#123;print $2,$3&#125;' marks.txt` }} />
          <h3 id="h.e39wpvittqk5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Sita 90
Anil 92` }} />
          <hr className={styles.divider} />
          <h3 id="h.blngww1vdpam" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Marks &lt;80 OR name Kumar</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '$3&lt;80 || $2=="Kumar" &#123;print $2,$3&#125;' marks.txt` }} />
          <h3 id="h.offfb3uizoqe" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Kumar 78` }} />
          <hr className={styles.divider} />
          <h3 id="h.ol7mkspq3l8h" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: NOT operator</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '!($3&gt;80) &#123;print $2,$3&#125;' marks.txt` }} />
          <h3 id="h.wnmmgipse6bd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Kumar 78` }} />
          <hr className={styles.divider} />
          <h2 id="h.6k2uohhk273s" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6. Ternary Operator</span>` }} />
          <h3 id="h.kg8idvs4ptx1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `condition ? true : false` }} />
          <hr className={styles.divider} />
          <h3 id="h.awp1om8snwa1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Pass / Fail</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1) print $2, ($3&gt;=80?"PASS":"FAIL")&#125;' marks.txt` }} />
          <h3 id="h.e82zeu8vd52t" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi PASS
Sita PASS
Kumar FAIL
Anil PASS` }} />
          <hr className={styles.divider} />
          <h3 id="h.qfuo1ipd1pd2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Grade system</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1) print $2, ($3&gt;=90?"A":($3&gt;=80?"B":"C"))&#125;' marks.txt` }} />
          <h3 id="h.cesrk0ym585h" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi B
Sita A
Kumar C
Anil A` }} />
          <hr className={styles.divider} />
          <h2 id="h.serhrx1kkmgd" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">7. Exponential Operator (</span><span class="c55 c38 c19">^</span><span class="c38 c19"> or </span><span class="c55 c38 c19">**</span><span class="c27 c19">)</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.ghai5crw4w87" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Square of marks</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1) print $2, $3^2&#125;' marks.txt` }} />
          <h3 id="h.yljatzcsom9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 7225
Sita 8100
Kumar 6084
Anil 8464` }} />
          <hr className={styles.divider} />
          <h3 id="h.jzxrcq6wr1gz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Cube of marks</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1) print $2, $3**3&#125;' marks.txt` }} />
          <h3 id="h.4gxtg0a4irpm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 614125
Sita 729000
Kumar 474552
Anil 778688` }} />
          <hr className={styles.divider} />
          <h2 id="h.8rdeh2k9u0l2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">8. Combined Operator Example (Real Life)</span>` }} />
          <h3 id="h.w2xoyjus7ac" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1)&#123;total+=$3; count++&#125;&#125; END&#123;print "Average:", total/count&#125;' marks.txt` }} />
          <h3 id="h.56nnrpdnzsgi" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Average: 86.25` }} />
          <hr className={styles.divider} />
          <h2 id="h.1kjov1bu1cx9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">9. Key Points for Students</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `$3 += 5 means add 5 marks  &amp;&amp; means both must be true  ?: replaces if-else  ^ used for power  ++ increases value by 1` }} />
          <h1 id="h.yk7wdkqjn8e9" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">DECISION MAKING STATEMENTS IN AWK</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Decision-making statements are used to make decisions based on conditions. In AWK, we mainly use:` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c1">if<br></span></li><li class="c10 li-bullet-0"><span class="c1">if–else<br></span></li><li class="c10 li-bullet-0"><span class="c1">if–else if–else<br></span></li><li class="c10 li-bullet-0"><span class="c0">Conditional expressions using relational &amp; logical operators<br></span></li><li class="c10 li-bullet-0"><span class="c0">Ternary operator (short decision)<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.11wx4ktu2e74" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Sample Input File (student.txt)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ID Name Marks
1 Ravi 85
2 Sita 90
3 Kumar 78
4 Anil 92
5 Raju 60` }} />
          <hr className={styles.divider} />
          <h2 id="h.pl7rnddyvgb5" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. IF Statement in AWK</span>` }} />
          <h3 id="h.m32dn6bic8oj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `if (condition)
action
Executes action ONLY if condition is true` }} />
          <hr className={styles.divider} />
          <h3 id="h.ku5keisorsy9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Print students who passed (Marks ≥ 80)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if($3&gt;=80) print $2,$3&#125;' student.txt` }} />
          <h3 id="h.wtty79gl2wi5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90
Anil 92` }} />
          <hr className={styles.divider} />
          <h3 id="h.wmib35wv6fcu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Print students who failed (Marks &lt; 80)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if($3&lt;80) print $2,"FAILED"&#125;' student.txt` }} />
          <h3 id="h.5zfe9pmoy1pl" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Kumar FAILED
Raju FAILED` }} />
          <hr className={styles.divider} />
          <h3 id="h.w991jdkzh86n" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Skip header using IF</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(NR&gt;1) print $2,$3&#125;' student.txt` }} />
          <h3 id="h.xmgoyku90kc4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90
Kumar 78
Anil 92
Raju 60` }} />
          <hr className={styles.divider} />
          <h2 id="h.a5ic346v9n1m" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. IF–ELSE Statement</span>` }} />
          <h3 id="h.pm2b69p1lto7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `if (condition)
action1
else
action2
One condition → Two outcomes` }} />
          <hr className={styles.divider} />
          <h3 id="h.bsryq0oa7ls6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Pass / Fail</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if($3&gt;=80) print $2,"PASS"; else print $2,"FAIL"&#125;' student.txt` }} />
          <h3 id="h.yos91thvzqg0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Name FAIL
Ravi PASS
Sita PASS
Kumar FAIL
Anil PASS
Raju FAIL` }} />
          <hr className={styles.divider} />
          <h3 id="h.th5n5r2vzsaz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Scholarship Eligibility</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if($3&gt;=90) print $2,"Eligible"; else print $2,"Not Eligible"&#125;' student.txt` }} />
          <h3 id="h.cf4288yehtdd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi Not Eligible
Sita Eligible
Kumar Not Eligible
Anil Eligible
Raju Not Eligible` }} />
          <hr className={styles.divider} />
          <h3 id="h.hfsmwy1ynyry" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Check Even or Odd Marks</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if($3%2==0) print $2,"Even"; else print $2,"Odd"&#125;' student.txt` }} />
          <h3 id="h.niq1vvnflow7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi Odd
Sita Even
Kumar Even
Anil Even
Raju Even` }} />
          <hr className={styles.divider} />
          <h2 id="h.u4edjdkk7yjx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. IF – ELSE IF – ELSE Statement</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Used when multiple conditions are needed.` }} />
          <h3 id="h.mt4mrcvrlorh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `if (condition1)
action1
else if (condition2)
action2
else
action3` }} />
          <hr className={styles.divider} />
          <h3 id="h.lzqg3zth8ezr" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Grade System</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;
if($3&gt;=90)
print $2,"Grade A"
else if($3&gt;=80)
print $2,"Grade B"
else if($3&gt;=70)
print $2,"Grade C"
else
print $2,"Fail"
&#125;' student.txt` }} />
          <h3 id="h.5z1sxctjjsdg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Name Fail
Ravi Grade B
Sita Grade A
Kumar Grade C
Anil Grade A
Raju Fail` }} />
          <hr className={styles.divider} />
          <h3 id="h.j5pllwmkowc5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Result Category</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;
if($3&gt;=85)
print $2,"Distinction"
else if($3&gt;=60)
print $2,"First Class"
else
print $2,"Fail"
&#125;' student.txt` }} />
          <h3 id="h.iazqeyrgd76s" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi Distinction
Sita Distinction
Kumar First Class
Anil Distinction
Raju First Class` }} />
          <hr className={styles.divider} />
          <h2 id="h.xu5z6srx88mx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">4. Decision Making Using Logical Operators</span>` }} />
          <h3 id="h.wv2hhjbqxl4n" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Marks &gt;80 AND &lt;90</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if($3&gt;80 &amp;&amp; $3&lt;90) print $2,$3&#125;' student.txt` }} />
          <h3 id="h.h7wkr915527c" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85` }} />
          <hr className={styles.divider} />
          <h3 id="h.fs1gpg5yyzh2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Marks &lt;70 OR &gt;90</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if($3&lt;70 || $3&gt;90) print $2,$3&#125;' student.txt` }} />
          <h3 id="h.fkv94rvgxon3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Anil 92
Raju 60` }} />
          <hr className={styles.divider} />
          <h3 id="h.rumnpncm3ygn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: NOT Operator</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;if(!($3&gt;=80)) print $2,"Below Average"&#125;' student.txt` }} />
          <h3 id="h.o837reyns6s" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Kumar Below Average
Raju Below Average` }} />
          <hr className={styles.divider} />
          <h2 id="h.uay1r8bw72jn" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5. Nested IF (IF inside IF)</span>` }} />
          <h3 id="h.mk473wjv03zz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example: Scholarship + Hostel Eligibility</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;
if($3&gt;=80)
&#123;
if($3&gt;=90)
print $2,"Topper"
else
print $2,"Merit"
&#125;
&#125;' student.txt` }} />
          <h3 id="h.3iynz99qs1av" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi Merit
Sita Topper
Anil Topper` }} />
          <hr className={styles.divider} />
          <h2 id="h.hc8j5ex99v2s" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6. Ternary Operator (Short Decision Making)</span>` }} />
          <h3 id="h.v9gxwj8y5eks" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `condition ? true : false` }} />
          <hr className={styles.divider} />
          <h3 id="h.48zmum6g67na" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Pass / Fail (Short Form)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;print $2, ($3&gt;=80?"PASS":"FAIL")&#125;' student.txt` }} />
          <h3 id="h.sjbu3wm1ym9l" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Name FAIL
Ravi PASS
Sita PASS
Kumar FAIL
Anil PASS
Raju FAIL` }} />
          <hr className={styles.divider} />
          <h3 id="h.kisb2p7aebgd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Grade Using Ternary</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;print $2, ($3&gt;=90?"A":($3&gt;=80?"B":"C"))&#125;' student.txt` }} />
          <h3 id="h.ldv9wsp4pwtb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Name C
Ravi B
Sita A
Kumar C
Anil A
Raju C` }} />
          <hr className={styles.divider} />
          <h2 id="h.3dxfoph4oxfb" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">7. Decision Making in BEGIN and END Blocks</span>` }} />
          <h3 id="h.aqfz7jd51r1p" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example: Check file size</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'END&#123;
if(NR&gt;5)
print "Large File"
else
print "Small File"
&#125;' student.txt` }} />
          <h3 id="h.tl1ogn44ynkj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Large File` }} />
          <hr className={styles.divider} />
          <h2 id="h.y4wjqnbdoq2m" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">8. Real-Time Example (Total Pass Count)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;
if($3&gt;=80)
pass++
else
fail++
&#125;
END&#123;
print "Pass:",pass
print "Fail:",fail
&#125;' student.txt` }} />
          <h3 id="h.1loz26b34b4j" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Pass: 3
Fail: 2` }} />
          <hr className={styles.divider} />
          <h2 id="h.s2mezjb92r2w" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">KEY NOTES FOR STUDENTS</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `if → single condition  if–else → yes / no  else if → multiple decisions  Logical operators combine conditions  Ternary → short &amp; fast decision` }} />
          <h1 id="h.nvq870q129lo" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">AWK LOOPS &amp; LOOP CONTROL STATEMENTS</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Loops are used when a set of statements must be executed repeatedly until a condition becomes false.
In AWK, we have:` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c12">while</span><span class="c0"> loop<br></span></li><li class="c10 li-bullet-0"><span class="c12">do–while</span><span class="c0"> loop<br></span></li><li class="c10 li-bullet-0"><span class="c12">for</span><span class="c0"> loop<br></span></li><li class="c10 li-bullet-0"><span class="c0">Loop control statements<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c15 c26 li-bullet-0"><span class="c1">break<br></span></li><li class="c15 c26 li-bullet-0"><span class="c1">continue<br></span></li><li class="c15 c26 li-bullet-0"><span class="c1">exit<br></span></li><li class="c15 c26 li-bullet-0"><span class="c1">next<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.f6i2aphiobyv" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Sample Input File (marks.txt)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ID Name Marks
1 Ravi 85
2 Sita 90
3 Kumar 78
4 Anil 92
5 Raju 60` }} />
          <hr className={styles.divider} />
          <h1 id="h.jf7c5let4cxd" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c19 c24">1. WHILE LOOP</span>` }} />
          <h3 id="h.yxzmizetpw5y" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `while(condition)
&#123;
statements
&#125;
Loop runs as long as condition is TRUE` }} />
          <hr className={styles.divider} />
          <h3 id="h.ubo8m2k64uds" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Print numbers from 1 to 5</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;
i=1
while(i&lt;=5)
&#123;
print i
i++
&#125;
&#125;'` }} />
          <h3 id="h.arefvbxz50p2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
3
4
5` }} />
          <hr className={styles.divider} />
          <h3 id="h.rpaai732z8w7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Print table of 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;
i=1
while(i&lt;=10)
&#123;
print "2 x",i,"=",2*i
i++
&#125;
&#125;'` }} />
          <h3 id="h.1zarria7kskz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `2 x 1 = 2
2 x 2 = 4
...
2 x 10 = 20` }} />
          <hr className={styles.divider} />
          <h3 id="h.c1aj8d9gwl3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Sum of numbers 1 to 10</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;
i=1
sum=0
while(i&lt;=10)
&#123;
sum=sum+i
i++
&#125;
print "Sum =",sum
&#125;'` }} />
          <h3 id="h.dxtfqgxhsq3t" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Sum = 55` }} />
          <hr className={styles.divider} />
          <h1 id="h.z4zantv05bub" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">2. DO–WHILE LOOP</span>` }} />
          <h3 id="h.jgpg1ryl713g" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `do
&#123;
statements
&#125;
while(condition)
Executes AT LEAST ONCE, even if condition is false.` }} />
          <hr className={styles.divider} />
          <h3 id="h.q9wheh5qns7h" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Print 1 to 5</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;
i=1
do
&#123;
print i
i++
&#125;
while(i&lt;=5)
&#125;'` }} />
          <h3 id="h.ocvugaeie49b" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
3
4
5` }} />
          <hr className={styles.divider} />
          <h3 id="h.z6aoyzhypb05" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Condition False but Runs Once</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;
i=10
do
&#123;
print i
&#125;
while(i&lt;5)
&#125;'` }} />
          <h3 id="h.y7mz4rjrh53u" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `10
Important: Condition false, still printed once.` }} />
          <hr className={styles.divider} />
          <h3 id="h.xjqo9kgz2spn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Factorial using do–while</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;
n=5
fact=1
do
&#123;
fact=fact*n
n--
&#125;
while(n&gt;0)
print "Factorial =",fact
&#125;'` }} />
          <h3 id="h.107uxp3tms3e" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Factorial = 120` }} />
          <hr className={styles.divider} />
          <h1 id="h.z6snqohc6k3p" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">3. FOR LOOP</span>` }} />
          <h3 id="h.ao4qvwb3vepn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for(initialization; condition; increment)
&#123;
statements
&#125;
Most commonly used loop in AWK.` }} />
          <hr className={styles.divider} />
          <h3 id="h.6u6u2mtb5gtp" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Print numbers 1 to 10</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;
for(i=1;i&lt;=10;i++)
print i
&#125;'` }} />
          <h3 id="h.1myud4zgpibf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
...
10` }} />
          <hr className={styles.divider} />
          <h3 id="h.5b0iyrwt2tbd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Sum of even numbers</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;
sum=0
for(i=2;i&lt;=10;i+=2)
sum+=i
print "Sum =",sum
&#125;'` }} />
          <h3 id="h.qkm8x0e8ibxl" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Sum = 30` }} />
          <hr className={styles.divider} />
          <h3 id="h.cw653obozflf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 3: Print file using for loop</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk '&#123;
for(i=1;i&lt;=NF;i++)
print $i
&#125;' marks.txt` }} />
          <h3 id="h.irq82mkuyxsq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ID
Name
Marks
1
Ravi
85
...` }} />
          <hr className={styles.divider} />
          <h3 id="h.snjqj2gg2uwj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 4: Print only names</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'NR&gt;1&#123;
for(i=2;i&lt;=2;i++)
print $i
&#125;' marks.txt` }} />
          <h3 id="h.x9tsp2stxci6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi
Sita
Kumar
Anil
Raju` }} />
          <hr className={styles.divider} />
          <h1 id="h.7yz45k5k78jq" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">4. FOR LOOP WITH ARRAYS</span>` }} />
          <h3 id="h.5unmy2ggrfe8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example: Count Pass/Fail</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'NR&gt;1&#123;
if($3&gt;=80)
result["Pass"]++
else
result["Fail"]++
&#125;
END&#123;
for(i in result)
print i,result[i]
&#125;' marks.txt` }} />
          <h3 id="h.z2rz3lrqls47" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Pass 3
Fail 2` }} />
          <hr className={styles.divider} />
          <h1 id="h.yp7ci81ekdf1" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">5. LOOP CONTROL STATEMENTS</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.csqc1puyftqr" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5.1 BREAK STATEMENT</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Exits the loop immediately` }} />
          <hr className={styles.divider} />
          <h3 id="h.82rmnc3tj6ed" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Stop at 5</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;
for(i=1;i&lt;=10;i++)
&#123;
if(i==6)
break
print i
&#125;
&#125;'` }} />
          <h3 id="h.4p091tyr4rvf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
3
4
5` }} />
          <hr className={styles.divider} />
          <h3 id="h.180yyqjunyy0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Stop after first fail</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'NR&gt;1&#123;
if($3&lt;80)
break
print $2,$3
&#125;' marks.txt` }} />
          <h3 id="h.75wb51i29s6d" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90` }} />
          <hr className={styles.divider} />
          <h2 id="h.453sl96lhv1n" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5.2 CONTINUE STATEMENT</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Skips current iteration only` }} />
          <hr className={styles.divider} />
          <h3 id="h.frfixed3wpgb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Skip number 5</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'BEGIN&#123;
for(i=1;i&lt;=10;i++)
&#123;
if(i==5)
continue
print i
&#125;
&#125;'` }} />
          <h3 id="h.3lynz8z2wswz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
3
4
6
7
8
9
10` }} />
          <hr className={styles.divider} />
          <h3 id="h.3nzjfx6weaz3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Skip failed students</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'NR&gt;1&#123;
if($3&lt;80)
continue
print $2,$3
&#125;' marks.txt` }} />
          <h3 id="h.b043p18n0596" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90
Anil 92` }} />
          <hr className={styles.divider} />
          <h2 id="h.9ewnojpgy9sk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5.3 NEXT STATEMENT</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Skips current record and moves to next line` }} />
          <hr className={styles.divider} />
          <h3 id="h.qkxp5mysw4rw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Skip header</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'NR==1&#123;next&#125; &#123;print $2,$3&#125;' marks.txt` }} />
          <h3 id="h.ti6atch26mq6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90
Kumar 78
Anil 92
Raju 60` }} />
          <hr className={styles.divider} />
          <h3 id="h.vgl4t9ihckw5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Skip failed students</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'NR&gt;1&#123;
if($3&lt;80)
next
print $2,$3
&#125;' marks.txt` }} />
          <h3 id="h.7v3ibykdw7aw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90
Anil 92` }} />
          <hr className={styles.divider} />
          <h2 id="h.5x2p1ttubet4" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5.4 EXIT STATEMENT</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Stops entire AWK program` }} />
          <hr className={styles.divider} />
          <h3 id="h.8yhx7w93syz3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 1: Stop after 3 lines</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'NR==4&#123;exit&#125; &#123;print&#125;' marks.txt` }} />
          <h3 id="h.a4r82poe6g3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ID Name Marks
1 Ravi 85
2 Sita 90` }} />
          <hr className={styles.divider} />
          <h3 id="h.j01xiam8atsa" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example 2: Exit when marks &lt; 70</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'NR&gt;1&#123;
if($3&lt;70)
exit
print $2,$3
&#125;' marks.txt` }} />
          <h3 id="h.qrnprtpc6h36" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90
Kumar 78
Anil 92` }} />
          <hr className={styles.divider} />
          <h1 id="h.lcekvj4fdh48" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">6. REAL-TIME COMBINED EXAMPLE</span>` }} />
          <h3 id="h.710go5v7kf17" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Top 3 students</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `awk 'NR&gt;1&#123;
if(count==3)
exit
if($3&gt;=80)
&#123;
print $2,$3
count++
&#125;
&#125;' marks.txt` }} />
          <h3 id="h.8jpbniq39yuv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi 85
Sita 90
Anil 92` }} />
          <hr className={styles.divider} />
          <h1 id="h.clvbwqdy6yc6" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">IMPORTANT DIFFERENCES</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c80" colspan="1" rowspan="1"><p class="c13"><span class="c19">Statement</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c13"><span class="c19">Purpose</span></p></td></tr><tr class="c5"><td class="c80" colspan="1" rowspan="1"><p class="c3"><span class="c12">break</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c3"><span class="c0">Exit loop only</span></p></td></tr><tr class="c5"><td class="c80" colspan="1" rowspan="1"><p class="c3"><span class="c12">continue</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c3"><span class="c0">Skip iteration</span></p></td></tr><tr class="c5"><td class="c80" colspan="1" rowspan="1"><p class="c3"><span class="c12">next</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c3"><span class="c0">Skip record</span></p></td></tr><tr class="c5"><td class="c80" colspan="1" rowspan="1"><p class="c3"><span class="c12">exit</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c3"><span class="c0">Stop program</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.25k63kty3n8q" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">🎯 STUDENT TAKEAWAY</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Use for loop mostly  Use while/do-while for conditions  Control flow using break, continue, next, exit  Combine with if conditions for real power` }} />
          <h1 id="h.5e40sbft13n1" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">MAKEFILE – COMPLETE EXPLANATION (LECTURE STYLE)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.anozpmorwiq7" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">1. What is a Makefile?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `A Makefile is a special file that contains instructions (rules) used by the make command to:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Compile programs<br></span></li><li class="c10 li-bullet-0"><span class="c0">Build executables<br></span></li><li class="c10 li-bullet-0"><span class="c0">Automate repetitive tasks<br></span></li><li class="c10 li-bullet-0"><span class="c0">Save time and avoid manual compilation errors<br></span></li>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Makefile automates the build process` }} />
          <hr className={styles.divider} />
          <h2 id="h.wnipw5qe8i3j" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">2. Why Do We Need a Makefile?</span>` }} />
          <h3 id="h.qm4z0bsrng8p" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Without Makefile</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `gcc file1.c file2.c file3.c -o myapp
Problems:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">Long commands<br></span></li><li class="c10 li-bullet-0"><span class="c0">Easy to make mistakes<br></span></li><li class="c10 li-bullet-0"><span class="c0">Recompile all files even if one file changes<br></span></li><li class="c10 li-bullet-0"><span class="c0">Not scalable for big projects<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.xxb18xkm9vfh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">With Makefile</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `make
Automatically compiles only modified files  Faster build  Industry standard  Used in Linux kernel, drivers, embedded systems, DevOps, CI/CD` }} />
          <hr className={styles.divider} />
          <h2 id="h.sqn7ge1b9lyg" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">3. Where Makefile is Used in Industry</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c86" colspan="1" rowspan="1"><p class="c13"><span class="c19">Industry Area</span></p></td><td class="c93" colspan="1" rowspan="1"><p class="c13"><span class="c19">Usage</span></p></td></tr><tr class="c5"><td class="c86" colspan="1" rowspan="1"><p class="c3"><span class="c0">Linux Kernel</span></p></td><td class="c93" colspan="1" rowspan="1"><p class="c3"><span class="c0">Build kernel &amp; drivers</span></p></td></tr><tr class="c5"><td class="c86" colspan="1" rowspan="1"><p class="c3"><span class="c0">Embedded Systems</span></p></td><td class="c93" colspan="1" rowspan="1"><p class="c3"><span class="c0">Firmware compilation</span></p></td></tr><tr class="c5"><td class="c86" colspan="1" rowspan="1"><p class="c3"><span class="c0">DevOps</span></p></td><td class="c93" colspan="1" rowspan="1"><p class="c3"><span class="c0">Automation pipelines</span></p></td></tr><tr class="c5"><td class="c86" colspan="1" rowspan="1"><p class="c3"><span class="c0">Software Companies</span></p></td><td class="c93" colspan="1" rowspan="1"><p class="c3"><span class="c0">Large C/C++ projects</span></p></td></tr><tr class="c5"><td class="c86" colspan="1" rowspan="1"><p class="c3"><span class="c0">Open Source</span></p></td><td class="c93" colspan="1" rowspan="1"><p class="c3"><span class="c0">Standard build system</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.lhfc0d87mw" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c38 c19">4. What is </span><span class="c55 c38 c19">make</span><span class="c27 c19"> Command?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `make reads Makefile and executes commands only when required
make
Automatically checks:` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c0">File timestamps<br></span></li><li class="c10 li-bullet-0"><span class="c0">Dependencies<br></span></li><li class="c10 li-bullet-0"><span class="c0">Rebuilds only changed parts<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.egfrjdje0jkt" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">5. Basic Structure of a Makefile</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `target: dependencies
&lt;TAB&gt; command
⚠ TAB is mandatory, not spaces` }} />
          <hr className={styles.divider} />
          <h3 id="h.1p60xqc1jkkj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `hello: hello.c
gcc hello.c -o hello` }} />
          <hr className={styles.divider} />
          <h2 id="h.958l3ebv7hbm" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">6. First Simple Example (Beginner)</span>` }} />
          <h3 id="h.lr6ixll2nect" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">hello.c</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `#include &lt;stdio.h&gt;
int main()
&#123;
printf("Hello Makefile\n");
return 0;
&#125;` }} />
          <hr className={styles.divider} />
          <h3 id="h.rddelbgw189m" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Makefile</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `hello: hello.c
gcc hello.c -o hello` }} />
          <hr className={styles.divider} />
          <h3 id="h.b9urssl8nm9w" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Execution</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `make` }} />
          <h3 id="h.g7hawdg875po" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `gcc hello.c -o hello
./hello` }} />
          <h3 id="h.1yykf3wvfrmw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Program Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Hello Makefile` }} />
          <hr className={styles.divider} />
          <h2 id="h.eg9robi44j08" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">7. How Makefile Works (Internally)</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c10 li-bullet-0"><span class="c12">make</span><span> looks for file named </span><span class="c22 c19">Makefile<br></span></li><li class="c10 li-bullet-0"><span class="c0">Reads the first target<br></span></li><li class="c10 li-bullet-0"><span class="c0">Checks dependency timestamps<br></span></li><li class="c10 li-bullet-0"><span class="c0">If source is modified → recompiles<br></span></li><li class="c10 li-bullet-0"><span class="c0">Else → does nothing<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ey87t4v0ypiw" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">8. Multiple Files Example (Real Industry Style)</span>` }} />
          <h3 id="h.vxeph7a9x3yg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Project Structure</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `project/
├── main.c
├── add.c
├── sub.c
├── add.h
├── sub.h
└── Makefile` }} />
          <hr className={styles.divider} />
          <h3 id="h.x2eezgv63a3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">main.c</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `#include &lt;stdio.h&gt;
#include "add.h"
#include "sub.h"
int main()
&#123;
printf("Add = %d\n", add(5,3));
printf("Sub = %d\n", sub(5,3));
return 0;
&#125;` }} />
          <hr className={styles.divider} />
          <h3 id="h.l312rdqsa4u9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">add.c</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `int add(int a, int b)
&#123;
return a + b;
&#125;` }} />
          <hr className={styles.divider} />
          <h3 id="h.ppwcamwdxfb3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">sub.c</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `int sub(int a, int b)
&#123;
return a - b;
&#125;` }} />
          <hr className={styles.divider} />
          <h2 id="h.9aibibqm3zuk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">Makefile (Without Variables)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `myapp: main.o add.o sub.o
gcc main.o add.o sub.o -o myapp
main.o: main.c
gcc -c main.c
add.o: add.c
gcc -c add.c
sub.o: sub.c
gcc -c sub.c` }} />
          <hr className={styles.divider} />
          <h3 id="h.pys593ag97c2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Execution</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `make` }} />
          <h3 id="h.uyadbypmj6kj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `gcc -c main.c
gcc -c add.c
gcc -c sub.c
gcc main.o add.o sub.o -o myapp` }} />
          <hr className={styles.divider} />
          <h3 id="h.1qg9mim9ki7v" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Change only add.c</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `make` }} />
          <h3 id="h.4027a940t11r" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `gcc -c add.c
gcc main.o add.o sub.o -o myapp
Only modified file is compiled  Time-saving` }} />
          <hr className={styles.divider} />
          <h2 id="h.bpb151ujq8ca" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">9. Using Variables (Professional Way)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `CC = gcc
CFLAGS = -Wall -g
myapp: main.o add.o sub.o
$(CC) main.o add.o sub.o -o myapp
main.o: main.c
$(CC) $(CFLAGS) -c main.c
add.o: add.c
$(CC) $(CFLAGS) -c add.c
sub.o: sub.c
$(CC) $(CFLAGS) -c sub.c` }} />
          <hr className={styles.divider} />
          <h2 id="h.jaljv6jqfi0l" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">10. Automatic Variables (Important for Interviews)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c5"><td class="c20" colspan="1" rowspan="1"><p class="c13"><span class="c19">Variable</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c13"><span class="c19">Meaning</span></p></td></tr><tr class="c5"><td class="c20" colspan="1" rowspan="1"><p class="c3"><span class="c12">$@</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c3"><span class="c0">Target name</span></p></td></tr><tr class="c5"><td class="c20" colspan="1" rowspan="1"><p class="c3"><span class="c12">$&lt;</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c3"><span class="c0">First dependency</span></p></td></tr><tr class="c5"><td class="c20" colspan="1" rowspan="1"><p class="c3"><span class="c12">$^</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c3"><span class="c0">All dependencies</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.ddh0ack6o40k" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Optimized Makefile</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `CC = gcc
CFLAGS = -Wall
myapp: main.o add.o sub.o
$(CC) $^ -o $@
%.o: %.c
$(CC) $(CFLAGS) -c $&lt;` }} />
          <hr className={styles.divider} />
          <h2 id="h.ueiiuz8gwlzw" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">11. PHONY Targets (Industry Standard)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Targets that are not files` }} />
          <hr className={styles.divider} />
          <h3 id="h.9y7fcgu5yikw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `.PHONY: clean
clean:
rm -f *.o myapp` }} />
          <hr className={styles.divider} />
          <h3 id="h.535u65jinkk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17">Usage</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `make clean
Removes object files  Very common in industry` }} />
          <hr className={styles.divider} />
          <h2 id="h.sdu1izd0e0f2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">12. Complete Industry-Level Makefile</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `CC = gcc
CFLAGS = -Wall -g
TARGET = myapp
OBJ = main.o add.o sub.o
$(TARGET): $(OBJ)
$(CC) $(OBJ) -o $(TARGET)
%.o: %.c
$(CC) $(CFLAGS) -c $&lt;
clean:
rm -f $(OBJ) $(TARGET)` }} />
          <hr className={styles.divider} />
          <h2 id="h.z107gc7ddrjz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">13. Real Industry Workflow</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1️⃣ Developer modifies code 2️⃣ Runs make 3️⃣ Only changed files compile 4️⃣ Faster CI/CD pipeline 5️⃣ Used in Git, Jenkins, Docker` }} />
          <hr className={styles.divider} />
          <h2 id="h.vdzfgatdpp9r" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">14. Common Mistakes (Students Should Know)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Using spaces instead of TAB  Forgetting dependencies  Not using variables  Not adding clean target` }} />
          <hr className={styles.divider} />
          <h2 id="h.j5jrzei1ta7m" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">15. Makefile Interview Questions</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `What is Makefile?  Difference between make &amp; gcc?  What is $@, $&lt;, $^?  What is .PHONY?  How make improves build time?` }} />
          <hr className={styles.divider} />
          <h2 id="h.nou6y48ers5k" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c27 c19">17. Student Summary</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Makefile automates compilation  Used in real companies  Saves time &amp; avoids errors  Essential for Linux programmers  Must-know for interviews` }} />
          <h1 id="h.oouxwmttz0p8" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">INTRODUCTION TO TCL (Tool Command Language)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.jhu2pnsvuroc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">1. What is TCL?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c4">TCL</span><span> stands for </span><span class="c18 c4">Tool Command Language</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> TCL is:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span>A </span><span class="c18 c4">high-level scripting language<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Interpreted (not compiled)<br></span></li><li class="c0 c16 li-bullet-0"><span>Very </span><span class="c18 c4">simple syntax<br></span></li><li class="c0 c16 li-bullet-0"><span>Designed for </span><span class="c18 c4">command execution and automation<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Created by </span><span class="c18 c4">John Ousterhout</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.scjb86hdx8l1" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">2. Why TCL is Popular (Key Features)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span>✔ Easy to learn<br> ✔ Powerful string handling<br> ✔ Strong scripting capability<br> ✔ Platform independent<br> ✔ Widely used in </span><span class="c18 c4">EDA tools</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.g9s1slybclx1" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">3. Real-Time Applications of TCL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>TCL is heavily used in </span><span class="c4">industry</span><span>, especially where </span><span class="c4">automation</span><span class="c1"> is required.</span>` }} />
          <h3 id="h.khhn0gbsgbi4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Major Real-Time Uses</span>` }} />
          <h3 id="h.qm1pyhynu4gq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">1️⃣ EDA / VLSI Industry</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">Synopsys (Design Compiler, PrimeTime)<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Cadence<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Mentor Graphics<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Used for:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">Timing analysis<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Synthesis scripts<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Physical design automation<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.gioa71s72svm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">2️⃣ Automation Scripts</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">File handling<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Log parsing<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Batch execution<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.4ct0bn5dfiaf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">3️⃣ Embedded Systems</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">Testing automation<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Configuration scripts<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.xmdmg7r3q2o5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">4️⃣ GUI Applications</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">TCL + Tk → GUI programs</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.u95nay7nk0fc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Industry Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `ASIC Engineer writes TCL script
→ Tool reads TCL
→ Tool executes commands
→ Reports generated automatically` }} />
          <hr className={styles.divider} />
          <h2 id="h.k7363xqjrdaq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">4. Basic Structure of a TCL Script</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `command argument1 argument2` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ No semicolon required<br> ✔ One command per line</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.nnqij9f1mcfz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts "Hello TCL"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Hello TCL` }} />
          <hr className={styles.divider} />
          <h2 id="h.u35i33nbp3x8" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">5. TCL Variables</span>` }} />
          <h3 id="h.z7jsd8rq9bfo" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Important Rule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c4">TCL variables are NOT typed<br></span><span>  Everything is a </span><span class="c18 c4">string</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.sz2u4afbb0w" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">6. How to Set a Variable (set command)</span>` }} />
          <h3 id="h.3d95dznqvlkv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set variable_name value` }} />
          <hr className={styles.divider} />
          <h3 id="h.k0ekfmecl17f" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1: Simple Variable</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set a 10
puts $a` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `10` }} />
          <hr className={styles.divider} />
          <h3 id="h.omi7pziweoux" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2: String Variable</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set name "Linux TCL"
puts $name` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux TCL` }} />
          <hr className={styles.divider} />
          <h3 id="h.v0bqyf7ekbc8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Important Rule</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `✔ $ is used to access variable value ✔ set is used to assign value` }} />
          <hr className={styles.divider} />
          <h3 id="h.z4a4smd009e9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3: Reassign Variable</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set x 5
set x 20
puts $x` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `20` }} />
          <hr className={styles.divider} />
          <h2 id="h.ejgt21bmzq77" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">7. Variable Substitution in TCL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>TCL performs </span><span class="c18 c4">substitution BEFORE execution</span>` }} />
          <h3 id="h.a7i4yri2cqe5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Types of Substitution</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1️⃣ Variable substitution ($) 2️⃣ Command substitution ([]) 3️⃣ Backslash substitution (\)` }} />
          <hr className={styles.divider} />
          <h2 id="h.oca9bpjw5lev" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">8. Variable Substitution (</span><span class="c10 c4">$</span><span class="c6 c4">) – Deep Explanation</span>` }} />
          <h3 id="h.ubu2flnw7iq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set a 5
set b 10
puts $a
puts $b` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `5
10` }} />
          <hr className={styles.divider} />
          <h3 id="h.wl8w4hbsvmzs" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2: Using Variable in Sentence</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set name Rahul
puts "My name is $name"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `My name is Rahul` }} />
          <hr className={styles.divider} />
          <h3 id="h.mws4i328ucx0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Wrong Way</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts 'My name is $name'` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `My name is $name` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Single quotes do </span><span class="c4">NOT</span><span class="c1"> substitute variables</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.r8wwbkdmftme" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">9. Command Substitution (</span><span class="c10 c4">[ ]</span><span class="c6 c4">) – VERY IMPORTANT</span>` }} />
          <h3 id="h.ioamepou5w7q" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">What is Command Substitution?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Execute a command first<br>  Use its output as value</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.2q0jjrwyw6z4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set var [command]` }} />
          <hr className={styles.divider} />
          <h3 id="h.sng1r52y065x" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1: expr Command</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set x [expr 5 + 3]
puts $x` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `8` }} />
          <hr className={styles.divider} />
          <h3 id="h.53wmy6ig0muw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2: Without Command Substitution</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set x expr 5 + 3
puts $x` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `expr` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Wrong result</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.vm7gk2r1z4it" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3: Nested Command Substitution</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set y [expr [expr 2 + 3] * 4]
puts $y` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `20` }} />
          <hr className={styles.divider} />
          <h2 id="h.q91ufg7l1qh5" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">10. expr Command (Arithmetic in TCL)</span>` }} />
          <h3 id="h.rttn6aqyv2gt" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `expr expression` }} />
          <hr className={styles.divider} />
          <h3 id="h.bloz2g4tkhn1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set a 10
set b 5
set sum [expr $a + $b]
puts $sum` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `15` }} />
          <hr className={styles.divider} />
          <h3 id="h.y5pidyl4qpis" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2: Multiplication</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set result [expr 4 * 6]
puts $result` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `24` }} />
          <hr className={styles.divider} />
          <h3 id="h.a8t9meexc30l" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3: Division</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr 10 / 2]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `5` }} />
          <hr className={styles.divider} />
          <h2 id="h.l3uk4rszedb2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">11. Difference Between </span><span class="c10 c4">{}</span><span class="c4 c29"> and </span><span class="c10 c4">""</span><span class="c6 c4"> in TCL</span>` }} />
          <h3 id="h.tb80nelba6at" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c4 c36">Double Quotes </span><span class="c19 c4 c23">" "</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ Variable substitution<br> ✔ Command substitution</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set a 10
puts "Value is $a"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Value is 10` }} />
          <hr className={styles.divider} />
          <h3 id="h.bq14njlcy8iy" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c36 c4">Curly Braces </span><span class="c19 c23 c4">{ }</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> No substitution<br> ✔ Faster execution</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts &#123;Value is $a&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Value is $a` }} />
          <hr className={styles.divider} />
          <h3 id="h.rwluj9yuwj88" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Best Practice</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span>Use </span><span class="c34">{}</span><span class="c1"> when no substitution needed<br></span></li><li class="c0 c16 li-bullet-0"><span>Use </span><span class="c34">""</span><span class="c1"> when substitution required<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.v09h6mp2ipso" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">12. Backslash Substitution (</span><span class="c10 c4">\\</span><span class="c6 c4">)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Used for:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">New line<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Tab<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Escape characters<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.eycl5oprxsp7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts "Hello\nTCL"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Hello
TCL` }} />
          <hr className={styles.divider} />
          <h3 id="h.twnxskdrwybr" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts "Name:\tRahul"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Name:   Rahul` }} />
          <hr className={styles.divider} />
          <h2 id="h.4bolwievgg6n" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">13. Real-Time Example (Automation Script)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set file_count [exec ls | wc -l]
puts "Total files: $file_count"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Total files: 12` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Used in:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">Build systems<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Verification flows<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Reports generation<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.2cf43sihbnrc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">14. Common Mistakes Students Make</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Forgetting $  Not using [ ] for expr  Using single quotes  Mixing &#123;&#125; and ""` }} />
          <hr className={styles.divider} />
          <h2 id="h.qi15h7dr1ink" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">15. TCL Summary (Exam + Industry)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `✔ Everything is a command ✔ Variables are strings ✔ $ → variable substitution ✔ [ ] → command substitution ✔ &#123;&#125; → no substitution ✔ expr → arithmetic` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">TCL COMMANDS – DETAILED EXPLANATION</span>` }} />
          <h2 id="h.nru52btdsvvx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Commands Covered</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c2">puts<br></span></li><li class="c0 c16 li-bullet-0"><span class="c2">gets<br></span></li><li class="c0 c16 li-bullet-0"><span class="c2">split<br></span></li><li class="c0 c16 li-bullet-0"><span class="c2">join<br></span></li><li class="c0 c16 li-bullet-0"><span class="c2">expr<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c45 li-bullet-0"><span class="c1">Arithmetic operators<br></span></li><li class="c0 c45 li-bullet-0"><span class="c1">Relational operators<br></span></li><li class="c0 c45 li-bullet-0"><span class="c1">Logical operators<br></span></li>` }} />
          <hr className={styles.divider} />
          <h1 id="h.ic7g814n8x2f" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">1. puts Command</span>` }} />
          <h2 id="h.gai1oh94aiwo" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">What is </span><span class="c10 c4">puts</span><span class="c6 c4">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts is used to print output on the screen or write output to a file.` }} />
          <hr className={styles.divider} />
          <h2 id="h.b3hqy2p8py8r" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts "message"
puts variable` }} />
          <hr className={styles.divider} />
          <h2 id="h.plwd5fhtlup9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 1: Simple Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts "Welcome to TCL"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Welcome to TCL` }} />
          <hr className={styles.divider} />
          <h2 id="h.z892j8swt1u5" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 2: Printing Variable</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set name Linux
puts $name` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux` }} />
          <hr className={styles.divider} />
          <h2 id="h.95b1z15x97rw" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 3: With Variable Substitution</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set x 10
puts "Value of x is $x"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Value of x is 10` }} />
          <hr className={styles.divider} />
          <h2 id="h.v22detwuchzb" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 4: Without New Line</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts -nonewline "Enter name: "` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Enter name:` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c18 c4">user input programs</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.45mnengg5o61" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">2. gets Command</span>` }} />
          <h2 id="h.7940i65nfrzq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">What is </span><span class="c10 c4">gets</span><span class="c6 c4">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `gets is used to take input from the user or read input from a file.` }} />
          <hr className={styles.divider} />
          <h2 id="h.tyccuy2h6dpt" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `gets stdin variable` }} />
          <hr className={styles.divider} />
          <h2 id="h.k6zgqupo55wo" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 1: Basic Input</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts -nonewline "Enter your name: "
gets stdin name
puts "Hello $name"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Input:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Rahul` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Hello Rahul` }} />
          <hr className={styles.divider} />
          <h2 id="h.8lkn9gutykw5" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 2: Input and Arithmetic</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts "Enter first number:"
gets stdin a
puts "Enter second number:"
gets stdin b
puts "Sum = [expr $a + $b]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Input:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `5
3` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Sum = 8` }} />
          <hr className={styles.divider} />
          <h2 id="h.h03zb8wxpc9v" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 3: Input Validation Style</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts "Enter age:"
gets stdin age
puts "Your age is $age"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c18 c4">interactive scripts</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.vbhr53ugvb2j" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">3. split Command</span>` }} />
          <h2 id="h.3d1nn7j1vcrc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">What is </span><span class="c4 c10">split</span><span class="c6 c4">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `split is used to convert a string into a list based on a delimiter.` }} />
          <hr className={styles.divider} />
          <h2 id="h.vjotcz3x4rqj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `split string delimiter` }} />
          <hr className={styles.divider} />
          <h2 id="h.dxyjbewp6w0g" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 1: Split by Space</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set str "Linux TCL Shell"
set result [split $str " "]
puts $result` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux TCL Shell` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Internally stored as:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `&#123;Linux&#125; &#123;TCL&#125; &#123;Shell&#125;` }} />
          <hr className={styles.divider} />
          <h2 id="h.f6g6czs835n6" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 2: Split by Comma</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set data "10,20,30"
set nums [split $data ","]
puts $nums` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `10 20 30` }} />
          <hr className={styles.divider} />
          <h2 id="h.u003an3w5vkl" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 3: Access Split Values</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set str "A:B:C"
set list [split $str ":"]
puts [lindex $list 0]
puts [lindex $list 1]
puts [lindex $list 2]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `A
B
C` }} />
          <hr className={styles.divider} />
          <h1 id="h.770romzwpbn" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">4. join Command</span>` }} />
          <h2 id="h.4u2eo7w3fro9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">What is </span><span class="c10 c4">join</span><span class="c6 c4">?</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `join is used to convert a list into a string using a delimiter.` }} />
          <hr className={styles.divider} />
          <h2 id="h.nzyfug4iy6ia" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `join list delimiter` }} />
          <hr className={styles.divider} />
          <h2 id="h.v1djluxh7oyg" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 1: Join with Space</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set list &#123;Linux TCL Script&#125;
puts [join $list " "]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Linux TCL Script` }} />
          <hr className={styles.divider} />
          <h2 id="h.t068tqyrxf44" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 2: Join with Comma</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set nums &#123;10 20 30&#125;
puts [join $nums ","]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `10,20,30` }} />
          <hr className={styles.divider} />
          <h2 id="h.djkeqj2c9vo4" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 3: File Path Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set path &#123;/home user docs&#125;
puts [join $path "/"]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `/home/user/docs` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c4">Real-time use</span><span class="c1">: Path creation</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.qrajc0qofbbd" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">5. expr Command (MOST IMPORTANT)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `expr is used to evaluate expressions.` }} />
          <hr className={styles.divider} />
          <h2 id="h.s3ll3v5ndt8b" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `expr expression` }} />
          <hr className={styles.divider} />
          <h1 id="h.jpl2gt2kwcdg" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">5.1 Arithmetic Operators</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c24"><span class="c4">Operator</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c24"><span class="c4">Meaning</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">+</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c0"><span class="c1">Addition</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">-</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c0"><span class="c1">Subtraction</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">*</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c0"><span class="c1">Multiplication</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">/</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c0"><span class="c1">Division</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">%</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c0"><span class="c1">Modulus</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.a5jg1wem0mqt" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1: Addition</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr 5 + 3]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `8` }} />
          <hr className={styles.divider} />
          <h3 id="h.tn88isl5w65v" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2: Multiple Variables</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set a 10
set b 4
puts [expr $a - $b]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `6` }} />
          <hr className={styles.divider} />
          <h3 id="h.igroyhe4lmr2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3: Modulus</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr 10 % 3]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1` }} />
          <hr className={styles.divider} />
          <h1 id="h.97mohfhvjicz" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">5.2 Relational Operators</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c24"><span class="c4">Operator</span></p></td><td class="c14" colspan="1" rowspan="1"><p class="c24"><span class="c4">Meaning</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">==</span></p></td><td class="c14" colspan="1" rowspan="1"><p class="c0"><span class="c1">Equal</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">!=</span></p></td><td class="c14" colspan="1" rowspan="1"><p class="c0"><span class="c1">Not equal</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">&gt;</span></p></td><td class="c14" colspan="1" rowspan="1"><p class="c0"><span class="c1">Greater</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">&lt;</span></p></td><td class="c14" colspan="1" rowspan="1"><p class="c0"><span class="c1">Less</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">&gt;=</span></p></td><td class="c14" colspan="1" rowspan="1"><p class="c0"><span class="c1">Greater or equal</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">&lt;=</span></p></td><td class="c14" colspan="1" rowspan="1"><p class="c0"><span class="c1">Less or equal</span></p></td></tr></tbody>` }} />
          </div>
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Output: 1 (true) or 0 (false)` }} />
          <hr className={styles.divider} />
          <h3 id="h.ni3rneumrt9e" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr 5 &gt; 3]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1` }} />
          <hr className={styles.divider} />
          <h3 id="h.c0i9de3ja5j5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr 5 == 10]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `0` }} />
          <hr className={styles.divider} />
          <h3 id="h.pybm05fn9kg2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3: Using Variables</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set x 20
set y 10
puts [expr $x &lt;= $y]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `0` }} />
          <hr className={styles.divider} />
          <h1 id="h.kubpfw2konaf" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">5.3 Logical Operators</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c24"><span class="c4">Operator</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c24"><span class="c4">Meaning</span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">&amp;&amp;</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c0"><span class="c1">AND</span></p></td></tr><tr class="c46"><td class="c21" colspan="1" rowspan="1"><p class="c0 c3"><span class="c1"></span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c0 c3"><span class="c1"></span></p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c1">!</span></p></td><td class="c30" colspan="1" rowspan="1"><p class="c0"><span class="c1">NOT</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.fu3fafytj5ah" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1: AND</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr (5 &gt; 3) &amp;&amp; (10 &gt; 5)]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1` }} />
          <hr className={styles.divider} />
          <h3 id="h.pwwx5v4zscqb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2: OR</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr (5 &gt; 10) || (3 &lt; 7)]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1` }} />
          <hr className={styles.divider} />
          <h3 id="h.b301l329e166" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3: NOT</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr !(5 &gt; 10)]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1` }} />
          <hr className={styles.divider} />
          <h1 id="h.h5pa0lrtcgc4" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">6. Real-Time Example (Decision Making Base)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts "Enter marks:"
gets stdin marks
if &#123;[expr $marks &gt;= 50]&#125; &#123;
puts "PASS"
&#125; else &#123;
puts "FAIL"
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Input:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `65` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `PASS` }} />
          <hr className={styles.divider} />
          <h1 id="h.rr8xpmyhd9t5" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">7. Summary Table (Quick Revision)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c24"><span class="c4">Command</span></p></td><td class="c35" colspan="1" rowspan="1"><p class="c24"><span class="c4">Purpose</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">puts</span></p></td><td class="c35" colspan="1" rowspan="1"><p class="c0"><span class="c1">Print output</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">gets</span></p></td><td class="c35" colspan="1" rowspan="1"><p class="c0"><span class="c1">Take input</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">split</span></p></td><td class="c35" colspan="1" rowspan="1"><p class="c0"><span class="c1">String → list</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">join</span></p></td><td class="c35" colspan="1" rowspan="1"><p class="c0"><span class="c1">List → string</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">expr</span></p></td><td class="c35" colspan="1" rowspan="1"><p class="c0"><span class="c1">Calculations &amp; conditions</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h1 id="h.swxbsnv7fquj" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">TCL MATH FUNCTIONS – COMPLETE &amp; DEEP EXPLANATION</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `In TCL, mathematical functions are mainly used inside the expr command.` }} />
          <hr className={styles.divider} />
          <h2 id="h.5xy0971nzinc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">General Rule</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `All math functions are written inside expr` }} />
          <h3 id="h.oury9wzdfkbl" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `expr function(value)` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">or</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `expr &#123;function(value)&#125;
Using &#123; &#125; is recommended (safe &amp; faster)` }} />
          <hr className={styles.divider} />
          <h1 id="h.irtcezr6d17g" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">1. abs() – Absolute Value</span>` }} />
          <h2 id="h.deqp6dj74hqh" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is abs()?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Returns the </span><span class="c4">positive value</span><span class="c1"> of a number (removes sign).</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.f6nfx2hpkznd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;abs(-10)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `10` }} />
          <hr className={styles.divider} />
          <h3 id="h.d43925wvhw6m" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;abs(25)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `25` }} />
          <hr className={styles.divider} />
          <h3 id="h.iybrvvy29efj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Real Use)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set balance -500
puts "Final amount = [expr &#123;abs($balance)&#125;]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Final amount = 500` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c18 c4">Used in banking &amp; difference calculations</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.cqauwnljri7g" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">2. ceil() – Ceiling Value</span>` }} />
          <h2 id="h.e7c9rrf28j80" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is ceil()?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Rounds </span><span class="c4">UP</span><span> to the </span><span class="c4">nearest integer</span><span class="c1">.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.xp1b1loxwr1w" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;ceil(4.2)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `5` }} />
          <hr className={styles.divider} />
          <h3 id="h.7eyg11qkcl45" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;ceil(7.0)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `7` }} />
          <hr className={styles.divider} />
          <h3 id="h.5hhjeki9rttz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Real Use)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set pages 3.1
puts "Total pages = [expr &#123;ceil($pages)&#125;]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Total pages = 4` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c18 c4">Used in billing &amp; resource allocation</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.izolx9xp5h5x" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">3. floor() – Floor Value</span>` }} />
          <h2 id="h.7p8skcc0b3v3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is floor()?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Rounds </span><span class="c4">DOWN</span><span class="c1"> to the nearest integer.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.ewp5gb8fegny" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;floor(4.9)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `4` }} />
          <hr className={styles.divider} />
          <h3 id="h.2kdl78ccj5bg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;floor(10.1)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `10` }} />
          <hr className={styles.divider} />
          <h3 id="h.ikx0yny52jnb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Real Use)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set price 99.99
puts "Rounded price = [expr &#123;floor($price)&#125;]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `99` }} />
          <hr className={styles.divider} />
          <h1 id="h.aufxt8iwv4rw" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">4. double() – Convert to Floating Point</span>` }} />
          <h2 id="h.prx6lqsxw7qz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is double()?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Converts a number into </span><span class="c4">floating-point (decimal)</span><span class="c1">.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.s5j14iv8pgyp" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;double(5)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `5.0` }} />
          <hr className={styles.divider} />
          <h3 id="h.wid34g3pm6yz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set x 10
puts [expr &#123;double($x)/3&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `3.3333333333333335` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c18 c4">Important for accurate division</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.17uiaxtnhqu6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Without double</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;10/3&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `3` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">⚠️ Integer division</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.9evozz33eb16" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">5. int() – Convert to Integer</span>` }} />
          <h2 id="h.7zchbxz4q4d5" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is int()?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Removes the </span><span class="c4">decimal part</span><span class="c1"> and keeps integer.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.c7mj42tr1ay3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;int(5.9)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `5` }} />
          <hr className={styles.divider} />
          <h3 id="h.41qy4infco1n" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;int(-4.7)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `-4` }} />
          <hr className={styles.divider} />
          <h3 id="h.8nb2hmiqo6a2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Real Use)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set marks 89.6
puts "Final marks = [expr &#123;int($marks)&#125;]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Final marks = 89` }} />
          <hr className={styles.divider} />
          <h1 id="h.b66n20rznw07" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">6. min() – Minimum Value</span>` }} />
          <h2 id="h.wpsjhfbr0rlb" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is min()?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Returns the </span><span class="c4">smallest value</span><span class="c1">.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.rlbmawhhn7lh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;min(10, 20)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `10` }} />
          <hr className={styles.divider} />
          <h3 id="h.8f4v2tvb4039" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;min(5, -3, 7)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `-3` }} />
          <hr className={styles.divider} />
          <h3 id="h.uu3s9ek9zam3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Real Use)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set a 15
set b 9
puts "Lowest value = [expr &#123;min($a,$b)&#125;]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Lowest value = 9` }} />
          <hr className={styles.divider} />
          <h1 id="h.opqbe7np0yn1" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">7. max() – Maximum Value</span>` }} />
          <h2 id="h.nz6nhht3p3b6" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is max()?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Returns the </span><span class="c4">largest value</span><span class="c1">.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.4ath2q6eeiig" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;max(10, 20)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `20` }} />
          <hr className={styles.divider} />
          <h3 id="h.2ropv6sfafc8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;max(5, -3, 7)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `7` }} />
          <hr className={styles.divider} />
          <h3 id="h.z6fe2bf11t3d" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Real Use)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set score1 85
set score2 92
puts "Top score = [expr &#123;max($score1,$score2)&#125;]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Top score = 92` }} />
          <hr className={styles.divider} />
          <h1 id="h.9ffgg3c059ym" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">8. pow() – Power Function</span>` }} />
          <h2 id="h.goskosjwwody" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is pow()?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Calculates </span><span class="c4">base raised to power</span><span class="c1">.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.trk1rkmcibsc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;pow(2,3)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `8.0` }} />
          <hr className={styles.divider} />
          <h3 id="h.qbvz8bs34gex" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [expr &#123;pow(5,2)&#125;]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `25.0` }} />
          <hr className={styles.divider} />
          <h3 id="h.pjv5zyu1wx9e" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Real Use)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set radius 3
puts "Area = [expr &#123;3.14 * pow($radius,2)&#125;]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Area = 28.26` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c18 c4">Used in engineering &amp; scientific calculations</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.ff8gri4o7xi8" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">9. Combined Example (Real-Time Script)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts "Enter a number:"
gets stdin num
puts "Absolute = [expr &#123;abs($num)&#125;]"
puts "Ceil      = [expr &#123;ceil($num)&#125;]"
puts "Floor     = [expr &#123;floor($num)&#125;]"
puts "Square    = [expr &#123;pow($num,2)&#125;]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Input:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `-4.6` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Absolute = 4.6
Ceil      = -4
Floor     = -5
Square    = 21.16` }} />
          <hr className={styles.divider} />
          <h1 id="h.1lm93oa9a0md" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">10. Quick Reference Table</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c26" colspan="1" rowspan="1"><p class="c24"><span class="c4">Function</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c24"><span class="c4">Purpose</span></p></td></tr><tr class="c31"><td class="c26" colspan="1" rowspan="1"><p class="c0"><span class="c1">abs()</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1">Absolute value</span></p></td></tr><tr class="c31"><td class="c26" colspan="1" rowspan="1"><p class="c0"><span class="c1">ceil()</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1">Round up</span></p></td></tr><tr class="c31"><td class="c26" colspan="1" rowspan="1"><p class="c0"><span class="c1">floor()</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1">Round down</span></p></td></tr><tr class="c31"><td class="c26" colspan="1" rowspan="1"><p class="c0"><span class="c1">double()</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1">Convert to float</span></p></td></tr><tr class="c31"><td class="c26" colspan="1" rowspan="1"><p class="c0"><span class="c1">int()</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1">Convert to integer</span></p></td></tr><tr class="c31"><td class="c26" colspan="1" rowspan="1"><p class="c0"><span class="c1">min()</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1">Smallest value</span></p></td></tr><tr class="c31"><td class="c26" colspan="1" rowspan="1"><p class="c0"><span class="c1">max()</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1">Largest value</span></p></td></tr><tr class="c31"><td class="c26" colspan="1" rowspan="1"><p class="c0"><span class="c1">pow()</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1">Power calculation</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h1 id="h.gj9lb09yz6gr" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">TCL LISTS – COMPLETE &amp; IN-DEPTH EXPLANATION</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.p7yt048xhmwc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">1. What is a List in TCL?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>A </span><span class="c4">list</span><span> is a collection of elements stored in </span><span class="c4">order</span><span class="c1">.</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Elements can be:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">Numbers<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Strings<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Variables<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Even other lists<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.3jtw01w1nb98" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Creating a List</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set mylist &#123;10 20 30 40&#125;` }} />
          <hr className={styles.divider} />
          <h3 id="h.qloaz5jprltu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Printing a List</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts $mylist` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `10 20 30 40` }} />
          <hr className={styles.divider} />
          <h3 id="h.e11zlxg0coi6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Another Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set names &#123;Ravi Kumar Sita Mohan&#125;
puts $names` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi Kumar Sita Mohan` }} />
          <hr className={styles.divider} />
          <h1 id="h.ogugzbchcs9c" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">2. llength – Length of List</span>` }} />
          <h2 id="h.gwce2p7yzfrh" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is llength?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Returns the </span><span class="c4">number of elements</span><span class="c1"> in a list.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.lki77ud3q6i2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `llength list_name` }} />
          <hr className={styles.divider} />
          <h3 id="h.8p8ap6wyuty2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set list1 &#123;a b c d&#125;
puts [llength $list1]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `4` }} />
          <hr className={styles.divider} />
          <h3 id="h.ueivvdtsnc6t" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set marks &#123;85 90 78 92&#125;
puts "Total students = [llength $marks]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Total students = 4` }} />
          <hr className={styles.divider} />
          <h3 id="h.hi5ew2c6bl2k" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Nested List)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set list2 &#123;&#123;a b&#125; &#123;c d&#125;&#125;
puts [llength $list2]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `2` }} />
          <hr className={styles.divider} />
          <h1 id="h.3fa3fkwy0oc2" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">3. lindex – Access Element by Index</span>` }} />
          <h2 id="h.m9lu2swc3xo8" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is lindex?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Returns the </span><span class="c4">element at a specific index</span><span class="c1">.</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Index starts from </span><span class="c18 c4">0</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.p1pmp8efb8h5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `lindex list_name index` }} />
          <hr className={styles.divider} />
          <h3 id="h.74se9d9h82gy" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set fruits &#123;apple banana mango&#125;
puts [lindex $fruits 0]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `apple` }} />
          <hr className={styles.divider} />
          <h3 id="h.1i7g6k4uyakd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [lindex $fruits 2]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `mango` }} />
          <hr className={styles.divider} />
          <h3 id="h.8oedvqhf1koi" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Nested List)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set data &#123;&#123;10 20&#125; &#123;30 40&#125;&#125;
puts [lindex $data 1]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `30 40` }} />
          <hr className={styles.divider} />
          <h3 id="h.9q26s4qtitez" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 4 (Nested Inside Nested)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [lindex [lindex $data 1] 0]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `30` }} />
          <hr className={styles.divider} />
          <h1 id="h.5azomovi077w" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">4. lappend – Add Element to List</span>` }} />
          <h2 id="h.nejvlotaaal4" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is lappend?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Adds elements </span><span class="c4">at the end</span><span class="c1"> of a list.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.hdm2tzm39bk0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `lappend list_name element` }} />
          <hr className={styles.divider} />
          <h3 id="h.yzstlbfiymbn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set list1 &#123;1 2 3&#125;
lappend list1 4
puts $list1` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1 2 3 4` }} />
          <hr className={styles.divider} />
          <h3 id="h.erm33conrghm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2 (Multiple Elements)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `lappend list1 5 6
puts $list1` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1 2 3 4 5 6` }} />
          <hr className={styles.divider} />
          <h3 id="h.f0409yhfppny" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Real Use)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set students &#123;&#125;
lappend students Ravi Sita Mohan
puts $students` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi Sita Mohan` }} />
          <hr className={styles.divider} />
          <h1 id="h.j4xjrdxshua4" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">5. lset – Modify List Element</span>` }} />
          <h2 id="h.7q16e48p9dvb" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is lset?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Replaces an element at a given index.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.aosrdh38xcdl" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `lset list_name index new_value` }} />
          <hr className={styles.divider} />
          <h3 id="h.dn6ga1d0gz39" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set colors &#123;red blue green&#125;
lset colors 1 yellow
puts $colors` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `red yellow green` }} />
          <hr className={styles.divider} />
          <h3 id="h.ezsvpe8hu7wn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set nums &#123;10 20 30&#125;
lset nums 2 100
puts $nums` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `10 20 100` }} />
          <hr className={styles.divider} />
          <h3 id="h.ewca97vxhf0b" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Nested List)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set matrix &#123;&#123;1 2&#125; &#123;3 4&#125;&#125;
lset matrix 1 1 99
puts $matrix` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `&#123;1 2&#125; &#123;3 99&#125;` }} />
          <hr className={styles.divider} />
          <h1 id="h.nmpl2uifecle" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">6. lsort – Sort a List</span>` }} />
          <h2 id="h.en06mu7ag6kx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is lsort?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Sorts elements in </span><span class="c4">ascending order</span><span class="c1"> (default).</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.qvk6z1j61o8n" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `lsort list_name` }} />
          <hr className={styles.divider} />
          <h3 id="h.7lhvakm8y557" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 1 (Numbers)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set nums &#123;5 2 9 1&#125;
puts [lsort $nums]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1 2 5 9` }} />
          <hr className={styles.divider} />
          <h3 id="h.bz36hf78t16z" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2 (Strings)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set names &#123;Ravi Anil Sita Mohan&#125;
puts [lsort $names]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Anil Mohan Ravi Sita` }} />
          <hr className={styles.divider} />
          <h3 id="h.hhop8tkrhzb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Descending Order)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [lsort -decreasing $nums]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `9 5 2 1` }} />
          <hr className={styles.divider} />
          <h3 id="h.in4izx9unexa" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 4 (Numeric Sort)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set values &#123;10 2 30&#125;
puts [lsort -integer $values]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `2 10 30` }} />
          <hr className={styles.divider} />
          <h1 id="h.6rgyzkblfvs4" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">7. lsearch – Search Element in List</span>` }} />
          <h2 id="h.3zb3qm8r7z7c" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">What is lsearch?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Returns the </span><span class="c4">index of an element</span><span class="c1">.</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Returns -1 if not found` }} />
          <hr className={styles.divider} />
          <h3 id="h.7k90p0i2axhp" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `lsearch list_name value` }} />
          <hr className={styles.divider} />
          <h3 id="h.bzt6wjjyp8f1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c4 c17">Example 1</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set fruits &#123;apple banana mango&#125;
puts [lsearch $fruits banana]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1` }} />
          <hr className={styles.divider} />
          <h3 id="h.cv2xqs58k3n5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 2 (Not Found)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `puts [lsearch $fruits orange]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `-1` }} />
          <hr className={styles.divider} />
          <h3 id="h.exta6bi3ut6y" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 3 (Pattern Search)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set files &#123;file1.txt file2.log file3.txt&#125;
puts [lsearch -glob $files *.txt]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `0` }} />
          <hr className={styles.divider} />
          <h3 id="h.7f9hql128p4j" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Example 4 (All Matches)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set nums &#123;10 20 10 30 10&#125;
puts [lsearch -all $nums 10]` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `0 2 4` }} />
          <hr className={styles.divider} />
          <h1 id="h.7kk991rtb43s" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">8. Combined Real-Time Example</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set students &#123;Ravi Sita Mohan&#125;
lappend students Anil
puts "Students: $students"
puts "Total: [llength $students]"
puts "First student: [lindex $students 0]"
puts "Sorted list: [lsort $students]"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Students: Ravi Sita Mohan Anil
Total: 4
First student: Ravi
Sorted list: Anil Mohan Ravi Sita` }} />
          <hr className={styles.divider} />
          <h1 id="h.do9d8t4zanlg" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">9. Quick Summary Table</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c24"><span class="c4">Command</span></p></td><td class="c13" colspan="1" rowspan="1"><p class="c24"><span class="c4">Purpose</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">llength</span></p></td><td class="c13" colspan="1" rowspan="1"><p class="c0"><span class="c1">Count elements</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">lindex</span></p></td><td class="c13" colspan="1" rowspan="1"><p class="c0"><span class="c1">Get element</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">lappend</span></p></td><td class="c13" colspan="1" rowspan="1"><p class="c0"><span class="c1">Add element</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">lset</span></p></td><td class="c13" colspan="1" rowspan="1"><p class="c0"><span class="c1">Modify element</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">lsort</span></p></td><td class="c13" colspan="1" rowspan="1"><p class="c0"><span class="c1">Sort list</span></p></td></tr><tr class="c31"><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c1">lsearch</span></p></td><td class="c13" colspan="1" rowspan="1"><p class="c0"><span class="c1">Search element</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h1 id="h.h48m1e8jyyv6" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">TCL LOOPS – COMPLETE &amp; IN-DEPTH EXPLANATION</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.99rpp1s6ix5" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">1. What is a Loop?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>A </span><span class="c4">loop</span><span> is used to </span><span class="c4">repeat a block of code</span><span> multiple times </span><span class="c4">until a condition is met</span><span class="c1">.</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Why loops?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">Avoid writing same code again and again<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Process lists, files, numbers<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Automate real-time tasks (industry scripts)<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ihkmgfl4oamg" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Types of Loops in TCL</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c7" colspan="1" rowspan="1"><p class="c24"><span class="c4">Loop</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c24"><span class="c4">Used for</span></p></td></tr><tr class="c31"><td class="c7" colspan="1" rowspan="1"><p class="c0"><span class="c34">for</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c0"><span class="c1">Known number of iterations</span></p></td></tr><tr class="c31"><td class="c7" colspan="1" rowspan="1"><p class="c0"><span class="c34">while</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c0"><span class="c1">Loop based on condition</span></p></td></tr><tr class="c31"><td class="c7" colspan="1" rowspan="1"><p class="c0"><span class="c34">foreach</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c0"><span class="c1">Loop over list elements</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h1 id="h.bcjxy5pi9y6s" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">2. FOR LOOP</span>` }} />
          <h2 id="h.2xyyw2gvlk3c" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for &#123;initialization&#125; &#123;condition&#125; &#123;increment&#125; &#123;
statements
&#125;` }} />
          <hr className={styles.divider} />
          <h2 id="h.225rxvv9rtmj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">How for loop works</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">1️⃣ Initialization runs once<br> 2️⃣ Condition checked<br> 3️⃣ Body executes<br> 4️⃣ Increment runs<br> 5️⃣ Repeat until condition fails</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.4hgziegvag6" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 1: Print numbers 1 to 5</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for &#123;set i 1&#125; &#123;$i &lt;= 5&#125; &#123;incr i&#125; &#123;
puts $i
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
3
4
5` }} />
          <hr className={styles.divider} />
          <h2 id="h.m3csva6nh5v9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 2: Print even numbers</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for &#123;set i 2&#125; &#123;$i &lt;= 10&#125; &#123;incr i 2&#125; &#123;
puts $i
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `2
4
6
8
10` }} />
          <hr className={styles.divider} />
          <h2 id="h.6attfwoyfhcr" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 3: Table of 5</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for &#123;set i 1&#125; &#123;$i &lt;= 10&#125; &#123;incr i&#125; &#123;
puts "5 x $i = [expr 5 * $i]"
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `5 x 1 = 5
5 x 2 = 10
...
5 x 10 = 50` }} />
          <hr className={styles.divider} />
          <h2 id="h.2apc2nfkzlrt" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 4: Real-time Script (File creation)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for &#123;set i 1&#125; &#123;$i &lt;= 3&#125; &#123;incr i&#125; &#123;
puts "Creating file$i.txt"
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Creating file1.txt
Creating file2.txt
Creating file3.txt` }} />
          <hr className={styles.divider} />
          <h1 id="h.8ddjt9bb9ooo" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">3. WHILE LOOP</span>` }} />
          <h2 id="h.gsiocl8vy72b" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `while &#123;condition&#125; &#123;
statements
&#125;` }} />
          <hr className={styles.divider} />
          <h2 id="h.ricenie520ga" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">How while loop works</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>✔ Condition checked first<br> ✔ Loop runs </span><span class="c18 c4">only if condition is true</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.t5wbpsz7dv1b" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 1: Print numbers 1 to 5</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set i 1
while &#123;$i &lt;= 5&#125; &#123;
puts $i
incr i
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
3
4
5` }} />
          <hr className={styles.divider} />
          <h2 id="h.wmkhedrxgm47" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 2: Countdown</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set n 5
while &#123;$n &gt; 0&#125; &#123;
puts "Countdown: $n"
incr n -1
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Countdown: 5
Countdown: 4
...
Countdown: 1` }} />
          <hr className={styles.divider} />
          <h2 id="h.vamm8ia77a6i" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 3: Sum of numbers</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set i 1
set sum 0
while &#123;$i &lt;= 5&#125; &#123;
set sum [expr $sum + $i]
incr i
&#125;
puts "Sum = $sum"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Sum = 15` }} />
          <hr className={styles.divider} />
          <h2 id="h.8hccw4hbil29" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Real-time Use</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ Unknown number of iterations<br> ✔ Log monitoring<br> ✔ Waiting for condition</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.1wj6alnmrnxw" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">4. FOREACH LOOP (MOST IMPORTANT)</span>` }} />
          <h2 id="h.901t86qogxdv" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `foreach variable list &#123;
statements
&#125;` }} />
          <hr className={styles.divider} />
          <h2 id="h.ce4jrcl37t47" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Why foreach is powerful</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span>Best for </span><span class="c18 c4">lists<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Clean &amp; readable<br></span></li><li class="c0 c16 li-bullet-0"><span>Widely used in </span><span class="c18 c4">industry TCL scripts<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.4a9e7whh0vgq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 1: Print list elements</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set fruits &#123;apple banana mango&#125;
foreach f $fruits &#123;
puts $f
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `apple
banana
mango` }} />
          <hr className={styles.divider} />
          <h2 id="h.rimp2seazvuj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 2: Sum of list values</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set nums &#123;10 20 30&#125;
set sum 0
foreach n $nums &#123;
set sum [expr $sum + $n]
&#125;
puts "Total = $sum"` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Total = 60` }} />
          <hr className={styles.divider} />
          <h2 id="h.7yrsqxu6q17m" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 3: Index + Value</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set students &#123;Ravi Sita Mohan&#125;
set i 0
foreach s $students &#123;
puts "Index $i = $s"
incr i
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Index 0 = Ravi
Index 1 = Sita
Index 2 = Mohan` }} />
          <hr className={styles.divider} />
          <h2 id="h.4ch7oueqli16" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 4: Multiple variables</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `foreach &#123;name age&#125; &#123;Ravi 25 Sita 23 Mohan 28&#125; &#123;
puts "$name is $age years old"
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Ravi is 25 years old
Sita is 23 years old
Mohan is 28 years old` }} />
          <hr className={styles.divider} />
          <h2 id="h.td1x13x027hu" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Example 5: Nested foreach</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set matrix &#123;&#123;1 2&#125; &#123;3 4&#125;&#125;
foreach row $matrix &#123;
foreach val $row &#123;
puts $val
&#125;
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
3
4` }} />
          <hr className={styles.divider} />
          <h1 id="h.oh6dsvt2bkx5" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">5. SAME APPLICATION USING DIFFERENT LOOPS</span>` }} />
          <h3 id="h.q16jnvv60alr" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Application: Print numbers 1 to 3</span>` }} />
          <h3 id="h.qpmp1mc9ptgd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Using for</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for &#123;set i 1&#125; &#123;$i &lt;= 3&#125; &#123;incr i&#125; &#123;
puts $i
&#125;` }} />
          <h3 id="h.xy7em5df3fft" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Using while</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set i 1
while &#123;$i &lt;= 3&#125; &#123;
puts $i
incr i
&#125;` }} />
          <h3 id="h.t05rbo1j0zvj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Using foreach</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `foreach i &#123;1 2 3&#125; &#123;
puts $i
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output (Same for all):</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
3` }} />
          <hr className={styles.divider} />
          <h1 id="h.hde5iu7r0pd0" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">6. Loop Control Commands</span>` }} />
          <h2 id="h.mkmuyh6mp02h" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">break – Exit loop</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for &#123;set i 1&#125; &#123;$i &lt;= 5&#125; &#123;incr i&#125; &#123;
if &#123;$i == 3&#125; &#123;
break
&#125;
puts $i
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2` }} />
          <hr className={styles.divider} />
          <h2 id="h.rnl21yx162c" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">continue – Skip iteration</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for &#123;set i 1&#125; &#123;$i &lt;= 5&#125; &#123;incr i&#125; &#123;
if &#123;$i == 3&#125; &#123;
continue
&#125;
puts $i
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
4
5` }} />
          <hr className={styles.divider} />
          <h1 id="h.h3vo0kvpbd52" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">7. Real-Time Industry Script Example</span>` }} />
          <h3 id="h.dlfbqnb79lh1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Check list of servers</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set servers &#123;server1 server2 server3&#125;
foreach s $servers &#123;
puts "Checking $s..."
&#125;` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output:</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Checking server1...
Checking server2...
Checking server3...` }} />
          <hr className={styles.divider} />
          <h1 id="h.521ebo74pb3b" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c4 c8">8. Quick Comparison Table</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c15" colspan="1" rowspan="1"><p class="c24"><span class="c4">Feature</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c24"><span class="c4">for</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c24"><span class="c4">while</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c24"><span class="c4">foreach</span></p></td></tr><tr class="c44"><td class="c15" colspan="1" rowspan="1"><p class="c0"><span class="c1">Known count</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0"><span class="c1">✔</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0 c3"><span class="c1"></span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c0"><span class="c1">✔</span></p></td></tr><tr class="c44"><td class="c15" colspan="1" rowspan="1"><p class="c0"><span class="c1">Condition-based</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0 c3"><span class="c1"></span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0"><span class="c1">✔</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c0 c3"><span class="c1"></span></p></td></tr><tr class="c44"><td class="c15" colspan="1" rowspan="1"><p class="c0"><span class="c1">List handling</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0 c3"><span class="c1"></span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0 c3"><span class="c1"></span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c0"><span class="c1">✔ BEST</span></p></td></tr><tr class="c44"><td class="c15" colspan="1" rowspan="1"><p class="c0"><span class="c1">Industry use</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0"><span class="c1">Medium</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0"><span class="c1">Medium</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c0"><span class="c1">High </span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h1 id="h.8o3wkqd731bo" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">TCL LOOP CONTROL STATEMENTS</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Loop control statements are used to </span><span class="c4">change the normal flow of loops</span><span class="c1">.</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> In TCL, we mainly use:</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c18 c4">break<br></span></li><li class="c0 c16 li-bullet-0"><span class="c4 c18">continue<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.bb94itkve4t2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">1. </span><span class="c10 c4">break</span><span class="c6 c4"> Statement</span>` }} />
          <h3 id="h.ouetxlptm3on" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c36 c4">What is </span><span class="c23 c4">break</span><span class="c17 c4">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c34">break</span><span> is used to </span><span class="c18 c4">immediately stop the loop<br></span></li><li class="c0 c16 li-bullet-0"><span>Control comes </span><span class="c18 c4">outside the loop<br></span></li><li class="c0 c16 li-bullet-0"><span>Remaining iterations are </span><span class="c18 c4">skipped<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.vey9e2gm0bd4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c36 c4">Script 1: Using </span><span class="c23 c4">break</span><span class="c17 c4"> in a loop</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for &#123;set i 1&#125; &#123;$i &lt;= 5&#125; &#123;incr i&#125; &#123;
if &#123;$i == 3&#125; &#123;
break
&#125;
puts "Value: $i"
&#125;
puts "Loop ended"` }} />
          <h3 id="h.5mzu5osj3nl7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Execution Flow</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">i = 1 → printed<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">i = 2 → printed<br></span></li><li class="c0 c16 li-bullet-0"><span>i = 3 → condition true → </span><span class="c34">break</span><span class="c1"> → loop stops<br></span></li>` }} />
          <h3 id="h.tm3w6xqydhrc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Value: 1
Value: 2
Loop ended` }} />
          <hr className={styles.divider} />
          <h3 id="h.jt262wvmkie1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Real-Time Example (Industry use)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Stop checking servers when failure found</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set servers &#123;srv1 srv2 fail_srv srv3&#125;
foreach s $servers &#123;
if &#123;$s == "fail_srv"&#125; &#123;
puts "Error found on $s"
break
&#125;
puts "Checking $s"
&#125;` }} />
          <h3 id="h.lf55bam5r9ea" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Checking srv1
Checking srv2
Error found on fail_srv` }} />
          <hr className={styles.divider} />
          <h2 id="h.qgvn8q8lker0" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">2. </span><span class="c10 c4">continue</span><span class="c6 c4"> Statement</span>` }} />
          <h3 id="h.y2om93m872zk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c36 c4">What is </span><span class="c23 c4">continue</span><span class="c17 c4">?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c34">continue</span><span> </span><span class="c18 c4">skips the current iteration<br></span></li><li class="c0 c16 li-bullet-0"><span>Loop </span><span class="c18 c4">continues with next iteration<br></span></li><li class="c0 c16 li-bullet-0"><span>Loop does </span><span class="c18 c4">NOT stop<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.9tqvvscf1c7s" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c36 c4">Script 2: Using </span><span class="c23 c4">continue</span><span class="c17 c4"> in a loop</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `for &#123;set i 1&#125; &#123;$i &lt;= 5&#125; &#123;incr i&#125; &#123;
if &#123;$i == 3&#125; &#123;
continue
&#125;
puts "Value: $i"
&#125;
puts "Loop completed"` }} />
          <h3 id="h.7ep98b4noxrw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Execution Flow</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">i = 1 → printed<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">i = 2 → printed<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">i = 3 → skipped<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">i = 4, 5 → printed<br></span></li>` }} />
          <h3 id="h.tf0anr8sxemz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Value: 1
Value: 2
Value: 4
Value: 5
Loop completed` }} />
          <hr className={styles.divider} />
          <h3 id="h.wdo7gzyv557e" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Real-Time Example (Skip invalid data)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set data &#123;10 20 -1 30&#125;
foreach d $data &#123;
if &#123;$d &lt; 0&#125; &#123;
continue
&#125;
puts "Valid value: $d"
&#125;` }} />
          <h3 id="h.aqablvg9fhs" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Valid value: 10
Valid value: 20
Valid value: 30` }} />
          <hr className={styles.divider} />
          <h2 id="h.u4thigpi7eih" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">3. Difference Between </span><span class="c10 c4">break</span><span class="c4 c29"> and </span><span class="c19 c10 c4">continue</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c43" colspan="1" rowspan="1"><p class="c24"><span class="c4">Feature</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c24"><span class="c4">break</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c24"><span class="c4">continue</span></p></td></tr><tr class="c44"><td class="c43" colspan="1" rowspan="1"><p class="c0"><span class="c1">Stops loop</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1"> Yes</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c0"><span class="c1"> No</span></p></td></tr><tr class="c44"><td class="c43" colspan="1" rowspan="1"><p class="c0"><span class="c1">Skips iteration</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1"> No</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c0"><span class="c1"> Yes</span></p></td></tr><tr class="c31"><td class="c43" colspan="1" rowspan="1"><p class="c0"><span class="c1">Control</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c0"><span class="c1">Goes outside loop</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c0"><span class="c1">Goes to next iteration</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.qmq5hrmjdhum" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4"> Summary for Students</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span>Use </span><span class="c41 c4">break</span><span> → when you want to </span><span class="c18 c4">exit loop completely<br></span></li><li class="c0 c16 li-bullet-0"><span>Use </span><span class="c41 c4">continue</span><span> → when you want to </span><span class="c18 c4">skip unwanted values<br></span></li><li class="c0 c16 li-bullet-0"><span>Very useful in </span><span class="c18 c4">data validation, error handling, automation scripts</span></li>` }} />
          <h1 id="h.1nnu3acasjlf" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">DECISION MAKING IN TCL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Decision-making statements allow a program to </span><span class="c4">take decisions based on conditions</span><span class="c1">.</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> In TCL, decision making is done using:</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c2">if<br></span></li><li class="c0 c16 li-bullet-0"><span class="c2">if…else<br></span></li><li class="c0 c16 li-bullet-0"><span class="c2">if…elseif…else<br></span></li><li class="c0 c16 li-bullet-0"><span class="c2">switch<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.sbaofho5c9aj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">1. </span><span class="c10 c4">if</span><span class="c6 c4"> Statement</span>` }} />
          <h3 id="h.77ip34j17ide" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Purpose</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span>Executes a block </span><span class="c18 c4">only when condition is TRUE<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">No action when condition is FALSE<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.m3zswxi4jm77" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `if &#123;condition&#125; &#123;
statements
&#125;` }} />
          <hr className={styles.divider} />
          <h3 id="h.2vnjywti30yg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c36 c4">Script 1: Simple </span><span class="c19 c23 c4">if</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set age 20
if &#123;$age &gt;= 18&#125; &#123;
puts "Eligible to vote"
&#125;` }} />
          <h3 id="h.kw16rrynrjan" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Explanation</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span>Condition: </span><span class="c2">age &gt;= 18<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">True → block executed<br></span></li>` }} />
          <h3 id="h.7txbnzrlui34" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Eligible to vote` }} />
          <hr className={styles.divider} />
          <h3 id="h.a7pahyd333ly" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Real-Time Use</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Checking permission before running a task</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set isAdmin 1
if &#123;$isAdmin&#125; &#123;
puts "Access granted"
&#125;` }} />
          <hr className={styles.divider} />
          <h2 id="h.n7zv4xpgbtln" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">2. </span><span class="c10 c4">if … else</span><span class="c6 c4"> Statement</span>` }} />
          <h3 id="h.wh28tne5u5f4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Purpose</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">Executes one block if condition is TRUE<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Executes alternate block if FALSE<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.jegrenqfp1vr" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `if &#123;condition&#125; &#123;
statements
&#125; else &#123;
statements
&#125;` }} />
          <hr className={styles.divider} />
          <h3 id="h.3r5p8ff5ojdo" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c36 c4">Script 2: </span><span class="c19 c23 c4">if…else</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set marks 45
if &#123;$marks &gt;= 50&#125; &#123;
puts "Pass"
&#125; else &#123;
puts "Fail"
&#125;` }} />
          <h3 id="h.lea1bxkz50ac" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Explanation</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">marks &lt; 50 → else block executed<br></span></li>` }} />
          <h3 id="h.b8ls4cmja4d3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Fail` }} />
          <hr className={styles.divider} />
          <h3 id="h.vpr5qebnq402" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Real-Time Example</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> File existence check</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set file "data.txt"
if &#123;[file exists $file]&#125; &#123;
puts "File exists"
&#125; else &#123;
puts "File not found"
&#125;` }} />
          <hr className={styles.divider} />
          <h2 id="h.aqytrgl07brx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">3. </span><span class="c10 c4">if … elseif … else</span><span class="c6 c4"> Statement</span>` }} />
          <h3 id="h.xzxr0ee171zq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Purpose</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span>Used when </span><span class="c4">multiple conditions</span><span class="c1"> need checking<br></span></li><li class="c0 c16 li-bullet-0"><span>Executes </span><span class="c18 c4">only one matching block<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.k1h91x5ou66z" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `if &#123;cond1&#125; &#123;
statements
&#125; elseif &#123;cond2&#125; &#123;
statements
&#125; else &#123;
statements
&#125;` }} />
          <hr className={styles.divider} />
          <h3 id="h.trjflq888bx" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Script 3: Grade System</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set marks 78
if &#123;$marks &gt;= 85&#125; &#123;
puts "Grade A"
&#125; elseif &#123;$marks &gt;= 60&#125; &#123;
puts "Grade B"
&#125; elseif &#123;$marks &gt;= 40&#125; &#123;
puts "Grade C"
&#125; else &#123;
puts "Fail"
&#125;` }} />
          <h3 id="h.cqxpi5alnm4l" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Explanation</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">marks = 78 → second condition true<br></span></li>` }} />
          <h3 id="h.a1vu4h4hv25j" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Grade B` }} />
          <hr className={styles.divider} />
          <h3 id="h.ep86a8cv3ohx" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Real-Time Example</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Server load decision</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set load 65
if &#123;$load &gt; 80&#125; &#123;
puts "High load"
&#125; elseif &#123;$load &gt; 50&#125; &#123;
puts "Medium load"
&#125; else &#123;
puts "Low load"
&#125;` }} />
          <hr className={styles.divider} />
          <h2 id="h.7dth3l662xlh" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">4. </span><span class="c10 c4">switch</span><span class="c4 c6"> Statement</span>` }} />
          <h3 id="h.598yy5n9gdxc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Purpose</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span>Used for </span><span class="c18 c4">fixed value comparisons<br></span></li><li class="c0 c16 li-bullet-0"><span>Cleaner than multiple </span><span class="c2">elseif<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.tsef3d688yt6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Syntax</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `switch value &#123;
pattern1 &#123; statements &#125;
pattern2 &#123; statements &#125;
default  &#123; statements &#125;
&#125;` }} />
          <hr className={styles.divider} />
          <h3 id="h.if1fy9wdlumf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Script 4: Menu Selection</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set choice 2
switch $choice &#123;
1 &#123; puts "Start" &#125;
2 &#123; puts "Stop" &#125;
3 &#123; puts "Restart" &#125;
default &#123; puts "Invalid option" &#125;
&#125;` }} />
          <h3 id="h.28bkbw87uln2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Explanation</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c1">choice = 2 → matched case 2<br></span></li>` }} />
          <h3 id="h.qrze2c4ifbqs" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Stop` }} />
          <hr className={styles.divider} />
          <h3 id="h.5vp4wq2bkwk5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Real-Time Example</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Day based action</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `set day "Mon"
switch $day &#123;
"Mon" &#123; puts "Work day" &#125;
"Sat" &#123; puts "Weekend" &#125;
"Sun" &#123; puts "Holiday" &#125;
default &#123; puts "Invalid day" &#125;
&#125;` }} />
          <hr className={styles.divider} />
          <h2 id="h.44kxdi3s8cm1" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">Comparison: </span><span class="c10 c4">if</span><span class="c4 c29"> vs </span><span class="c10 c4 c19">switch</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c13" colspan="1" rowspan="1"><p class="c24"><span class="c4">Feature</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c24"><span class="c4">if / elseif</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c24"><span class="c4">switch</span></p></td></tr><tr class="c44"><td class="c13" colspan="1" rowspan="1"><p class="c0"><span class="c1">Range checking</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c0"><span class="c1"> Yes</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0"><span class="c1"> No</span></p></td></tr><tr class="c44"><td class="c13" colspan="1" rowspan="1"><p class="c0"><span class="c1">Exact match</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c0"><span class="c1"> Not ideal</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0"><span class="c1"> Best</span></p></td></tr><tr class="c31"><td class="c13" colspan="1" rowspan="1"><p class="c0"><span class="c1">Readability</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c0"><span class="c1">Medium</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0"><span class="c1">High</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.95v54kwv888d" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Final Summary for Students</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span>Use </span><span class="c41 c4">if</span><span class="c1"> → single condition<br></span></li><li class="c0 c16 li-bullet-0"><span>Use </span><span class="c41 c4">if…else</span><span class="c1"> → yes / no decision<br></span></li><li class="c0 c16 li-bullet-0"><span>Use </span><span class="c4 c41">if…elseif…else</span><span class="c1"> → multiple conditions<br></span></li><li class="c0 c16 li-bullet-0"><span>Use </span><span class="c41 c4">switch</span><span class="c1"> → fixed value matching<br></span></li><li class="c0 c16 li-bullet-0"><span>Decision making is </span><span class="c18 c4">core logic of automation scripts</span></li>` }} />
          <h1 id="h.2mas1btaq5jr" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c8 c4">TCL PROCEDURES (proc)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c47">(Industrial-Level Explanation)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.u718lldc1gt1" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">1. What is a Procedure (</span><span class="c10 c4">proc</span><span class="c6 c4">) in TCL?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>A </span><span class="c4">procedure</span><span> is a </span><span class="c4">reusable block of code</span><span class="c1"> that:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span>Performs a </span><span class="c18 c4">specific task<br></span></li><li class="c0 c16 li-bullet-0"><span>Can accept </span><span class="c18 c4">inputs (arguments)<br></span></li><li class="c0 c16 li-bullet-0"><span>Can </span><span class="c18 c4">return a value<br></span></li><li class="c0 c16 li-bullet-0"><span>Helps in </span><span class="c18 c4">modular, readable, maintainable scripts<br></span></li>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `In industry, 90% of large TCL scripts use proc.` }} />
          <hr className={styles.divider} />
          <h2 id="h.pt7kpp7841b1" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">2. Why Procedures Are Used (Industry View)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c31"><td class="c37" colspan="1" rowspan="1"><p class="c24"><span class="c4">Reason</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c24"><span class="c4">Explanation</span></p></td></tr><tr class="c31"><td class="c37" colspan="1" rowspan="1"><p class="c0"><span class="c1">Code reuse</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c0"><span class="c1">Avoid repeating code</span></p></td></tr><tr class="c31"><td class="c37" colspan="1" rowspan="1"><p class="c0"><span class="c1">Maintenance</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c0"><span class="c1">Change once, effect everywhere</span></p></td></tr><tr class="c31"><td class="c37" colspan="1" rowspan="1"><p class="c0"><span class="c1">Readability</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c0"><span class="c1">Script becomes clean</span></p></td></tr><tr class="c31"><td class="c37" colspan="1" rowspan="1"><p class="c0"><span class="c1">Debugging</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c0"><span class="c1">Easy to test functions</span></p></td></tr><tr class="c31"><td class="c37" colspan="1" rowspan="1"><p class="c0"><span class="c1">Automation</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c0"><span class="c1">Used in EDA, DevOps, CI pipelines</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.xd45nzmfzi3e" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">3. Basic Syntax of </span><span class="c19 c10 c4">proc</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc procedure_name &#123;arguments&#125; &#123;
statements
return value
&#125;` }} />
          <hr className={styles.divider} />
          <h2 id="h.b5rqa8n5ye0d" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">4. Script 1: Simple Procedure (No Arguments)</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc greet &#123;&#125; &#123;
puts "Welcome to TCL programming"
&#125;
greet` }} />
          <h3 id="h.hxh7dycfgvnq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Welcome to TCL programming` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used for </span><span class="c18 c4">common startup messages</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.bdq9nfl36t2h" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">5. Script 2: Procedure with One Argument</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc sayHello &#123;name&#125; &#123;
puts "Hello $name"
&#125;
sayHello "Rahul"` }} />
          <h3 id="h.n665ks9584sm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Hello Rahul` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c18 c4">user-specific automation</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.jazemwb3ja3a" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">6. Script 3: Procedure with Multiple Arguments</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc add &#123;a b&#125; &#123;
set sum [expr &#123;$a + $b&#125;]
puts "Sum is $sum"
&#125;
add 10 20` }} />
          <h3 id="h.dt8k8mk045ty" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Sum is 30` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c18 c4">EDA calculations / reports</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.3f6lve2qgl9g" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">7. Script 4: Procedure with Return Value</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc square &#123;n&#125; &#123;
return [expr &#123;$n * $n&#125;]
&#125;
set result [square 5]
puts "Square = $result"` }} />
          <h3 id="h.888541l0zgco" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Square = 25` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c4">Return</span><span class="c1"> sends value back to caller</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.140cxhc4cq29" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">8. Script 5: Real-Time File Check Procedure</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc checkFile &#123;filename&#125; &#123;
if &#123;[file exists $filename]&#125; &#123;
return "File exists"
&#125; else &#123;
return "File not found"
&#125;
&#125;
puts [checkFile "data.txt"]` }} />
          <h3 id="h.yhi7hyx7jjax" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `File not found` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c18 c4">build &amp; deployment scripts</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.9a8bk4gay0vk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">9. Script 6: Procedure with Default Arguments</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc greetUser &#123;&#123;name "Guest"&#125;&#125; &#123;
puts "Welcome $name"
&#125;
greetUser
greetUser "Admin"` }} />
          <h3 id="h.qscpwnv4hqw4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Welcome Guest
Welcome Admin` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c18 c4">optional input handling</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.syj91p3zazs" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">10. Script 7: Industrial Logging Procedure</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc logMessage &#123;level msg&#125; &#123;
set time [clock format [clock seconds]]
puts "$time [$level] $msg"
&#125;
logMessage INFO "Build started"
logMessage ERROR "File missing"` }} />
          <h3 id="h.5cexjbccwwla" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Mon Jan 8 10:30:20 2026 [INFO] Build started
Mon Jan 8 10:30:20 2026 [ERROR] File missing` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c18 c4">EDA tools, CI/CD logs</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.6sti1rbb366o" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">11. Script 8: Mathematical Utility Procedure</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc average &#123;a b c&#125; &#123;
return [expr &#123;($a + $b + $c) / 3.0&#125;]
&#125;
puts "Average = [average 10 20 30]"` }} />
          <h3 id="h.fn539dkzoc5d" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Average = 20.0` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c18 c4">data analysis scripts</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.7v8e1aemxii9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">12. Script 9: Loop Inside Procedure</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc printNumbers &#123;n&#125; &#123;
for &#123;set i 1&#125; &#123;$i &lt;= $n&#125; &#123;incr i&#125; &#123;
puts $i
&#125;
&#125;
printNumbers 5` }} />
          <h3 id="h.p5goj99w4433" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `1
2
3
4
5` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c18 c4">batch processing</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.queswycptnmx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">13. Script 10: Real Industrial Automation Script</span>` }} />
          <h3 id="h.jbd0w0v9u0p1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Task</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ Read file<br> ✔ Count lines<br> ✔ Return count</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `proc countLines &#123;filename&#125; &#123;
if &#123;![file exists $filename]&#125; &#123;
return -1
&#125;
set fp [open $filename r]
set count 0
while &#123;[gets $fp line] &gt;= 0&#125; &#123;
incr count
&#125;
close $fp
return $count
&#125;
set lines [countLines "data.txt"]
if &#123;$lines == -1&#125; &#123;
puts "File not found"
&#125; else &#123;
puts "Total lines: $lines"
&#125;` }} />
          <h3 id="h.u8bmn6e34zu1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c17 c4">Output</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Total lines: 15` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c18 c4">Very common in EDA verification flows</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.52szm1kujmxw" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c4 c29">14. Important Industry Rules for </span><span class="c19 c10 c4">proc</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `✔ Always use meaningful names ✔ Keep procedures small &amp; single-purpose ✔ Always use return ✔ Avoid global variables (use arguments) ✔ Add comments in production scripts` }} />
          <hr className={styles.divider} />
          <h2 id="h.y5aophoblkvx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">15. Common Mistakes Students Make</span>` }} />
          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: `Forgetting &#123;&#125; in arguments  Not returning values  Using global variables unnecessarily  Writing too much logic in one procedure` }} />
          <hr className={styles.divider} />
          <h2 id="h.ybrqj24pf2t8" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c6 c4">Final Student Summary</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c0 c16 li-bullet-0"><span class="c34">proc</span><span class="c1"> = reusable function<br></span></li><li class="c0 c16 li-bullet-0"><span class="c1">Arguments pass data<br></span></li><li class="c0 c16 li-bullet-0"><span class="c34">return</span><span class="c1"> sends result<br></span></li><li class="c0 c16 li-bullet-0"><span>Used heavily in </span><span class="c18 c4">EDA, automation, DevOps<br></span></li><li class="c0 c16 li-bullet-0"><span>Industry TCL scripts are </span><span class="c18 c4">procedure-driven</span></li>` }} />
          <AdUnit slotId="slot_module4content" />
        </div>
      </div>
    </div>
  );
};

export default Module4Content;
