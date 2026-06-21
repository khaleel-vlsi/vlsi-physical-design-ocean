const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ResumeBuilder-Cy5NYufI.js","assets/index-Gzl8Ab92.js","assets/preload-helper-zJ_50EbN.js","assets/index-Cq_0aAwL.css","assets/resume-builder-D416ycAR.js","assets/resume-builder-CC8vJMPM.css","assets/Module58Content-DXot_iLQ.js","assets/Module58Content-DeUMw4Hd.css","assets/Module55Content-DNhgTarP.js","assets/Module55Content-C3b1GIIG.css"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-zJ_50EbN.js";import{a as t,c as n,f as r,i,l as a,n as o,r as s,s as c}from"./index-Gzl8Ab92.js";import{t as l}from"./paidModulesData-DhRhbLCK.js";var u=r(a(),1),d={detailPage:`_detailPage_1ncv6_1`,loadingText:`_loadingText_1ncv6_31`,backLink:`_backLink_1ncv6_40`,header:`_header_1ncv6_67`,badgeWrapper:`_badgeWrapper_1ncv6_74`,premiumBadge:`_premiumBadge_1ncv6_81`,moduleIdBadge:`_moduleIdBadge_1ncv6_92`,topicsSection:`_topicsSection_1ncv6_121`,topicsHeader:`_topicsHeader_1ncv6_133`,expanded:`_expanded_1ncv6_145`,chevronIcon:`_chevronIcon_1ncv6_149`,topicsGrid:`_topicsGrid_1ncv6_163`,topicItem:`_topicItem_1ncv6_169`,topicBullet:`_topicBullet_1ncv6_189`,toggleTopicsBtn:`_toggleTopicsBtn_1ncv6_195`,viewerToolbar:`_viewerToolbar_1ncv6_219`,secureStatus:`_secureStatus_1ncv6_234`,pulseDot:`_pulseDot_1ncv6_245`,pulse:`_pulse_1ncv6_245`,toolbarCenter:`_toolbarCenter_1ncv6_270`,toolbarBtn:`_toolbarBtn_1ncv6_278`,activeBtn:`_activeBtn_1ncv6_298`,protectionInfo:`_protectionInfo_1ncv6_304`,iframeContainer:`_iframeContainer_1ncv6_312`,iframeWrapper:`_iframeWrapper_1ncv6_327`,widthStandard:`_widthStandard_1ncv6_335`,widthFull:`_widthFull_1ncv6_339`,iframe:`_iframe_1ncv6_312`,emptyState:`_emptyState_1ncv6_351`,docIcon:`_docIcon_1ncv6_366`,lockedState:`_lockedState_1ncv6_373`,lockIcon:`_lockIcon_1ncv6_385`,float:`_float_1ncv6_1`,lockText:`_lockText_1ncv6_402`,timerBadge:`_timerBadge_1ncv6_410`,navRow:`_navRow_1ncv6_434`,navBtn:`_navBtn_1ncv6_443`},f=s(),p=(0,u.lazy)(()=>e(()=>import(`./ResumeBuilder-Cy5NYufI.js`),__vite__mapDeps([0,1,2,3,4,5]))),m=(0,u.lazy)(()=>e(()=>import(`./Module58Content-DXot_iLQ.js`),__vite__mapDeps([6,1,2,3,7]))),h=(0,u.lazy)(()=>e(()=>import(`./Module55Content-DNhgTarP.js`),__vite__mapDeps([8,1,2,3,9]))),g=()=>{let{id:e}=n(),{user:r}=o(),a=c(),[s,g]=(0,u.useState)(!0),[_,v]=(0,u.useState)(`standard`),[y,b]=(0,u.useState)(!1),[x,S]=(0,u.useState)(!1);if((0,u.useEffect)(()=>{if(r!==void 0){if(!r){a(`/login`);return}(async()=>{try{let{data:e,error:t}=await i.from(`profiles`).select(`*`).eq(`id`,r.id).single();if(t||!e){a(`/dashboard`);return}e.course_active&&(e=>e&&new Date(e).getTime()>Date.now())(e.course_expiry)?g(!1):a(`/dashboard`)}catch{a(`/dashboard`)}})()}},[r,a]),(0,u.useEffect)(()=>{window.scrollTo({top:0,behavior:`instant`}),b(!1),S(!1)},[e]),(0,u.useEffect)(()=>{let e=e=>{e.preventDefault()},t=e=>{e.preventDefault(),alert(`Copying is disabled for premium study materials.`)},n=e=>{e.preventDefault()},r=e=>{let t=e.ctrlKey||e.metaKey,n=e.key.toLowerCase();t&&(n===`c`||n===`p`||n===`s`)&&(e.preventDefault(),alert(`Copying, printing, and saving are disabled for premium study materials.`))};return window.addEventListener(`contextmenu`,e),window.addEventListener(`copy`,t),window.addEventListener(`dragstart`,n),window.addEventListener(`keydown`,r),()=>{window.removeEventListener(`contextmenu`,e),window.removeEventListener(`copy`,t),window.removeEventListener(`dragstart`,n),window.removeEventListener(`keydown`,r)}},[]),s)return(0,f.jsx)(`div`,{className:d.detailPage,children:(0,f.jsx)(`div`,{className:d.loadingText,children:`Securing connection... ⏳`})});let C=parseInt(e),w=(l||[]).findIndex(e=>e.id===C),T=w===-1?null:l[w],E=w>0?l[w-1]:null,D=w<(l||[]).length-1?l[w+1]:null,O=T&&T.iframeLink&&T.iframeLink.includes(`drive.google.com`),k=T&&T.iframeLink&&(T.iframeLink.includes(`drive.google.com`)||T.iframeLink.includes(`docs.google.com`));return T?(0,f.jsxs)(`div`,{className:d.detailPage,children:[(0,f.jsx)(t,{to:`/paid-modules`,className:d.backLink,children:`← Back to Paid Modules`}),(0,f.jsx)(t,{to:`/dashboard`,className:d.dashboardLink,children:`Go to Dashboard`}),(0,f.jsxs)(`header`,{className:d.header,children:[(0,f.jsxs)(`div`,{className:d.badgeWrapper,children:[(0,f.jsx)(`span`,{className:d.premiumBadge,children:`✨ PREMIUM ACCESS`}),(0,f.jsxs)(`span`,{className:d.moduleIdBadge,children:[`Module `,T.id]})]}),(0,f.jsx)(`h1`,{children:T.title}),(0,f.jsx)(`p`,{children:T.description})]}),T.topics&&T.topics.length>0&&(0,f.jsxs)(`section`,{className:d.topicsSection,children:[(0,f.jsxs)(`h2`,{onClick:()=>b(!y),className:`${d.topicsHeader} ${y?d.expanded:``}`,style:{cursor:`pointer`,userSelect:`none`},title:`Click to toggle topics list`,children:[(0,f.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,f.jsx)(`span`,{role:`img`,"aria-label":`topics`,children:`📚`}),` Topics Covered`]}),(0,f.jsx)(`span`,{className:d.chevronIcon,children:y?`▲`:`▼`})]}),y&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`div`,{className:d.topicsGrid,children:(x?T.topics:T.topics.slice(0,4)).map((e,t)=>(0,f.jsxs)(`div`,{className:d.topicItem,children:[(0,f.jsx)(`span`,{className:d.topicBullet,children:`•`}),(0,f.jsx)(`span`,{children:e})]},t))}),T.topics.length>4&&(0,f.jsx)(`button`,{className:d.toggleTopicsBtn,onClick:()=>S(!x),title:x?`Collapse list`:`Expand list`,children:x?`▲ Show Less`:`▼ Show More (+${T.topics.length-4})`})]})]}),T.iframeLink&&!T.isLockedTemporarily&&(0,f.jsxs)(`div`,{className:d.viewerToolbar,children:[(0,f.jsx)(`div`,{className:d.toolbarLeft,children:(0,f.jsxs)(`span`,{className:d.secureStatus,children:[(0,f.jsx)(`span`,{className:d.pulseDot}),`SECURE PREMIUM VIEWER`]})}),(0,f.jsxs)(`div`,{className:d.toolbarCenter,children:[(0,f.jsx)(`button`,{className:`${d.toolbarBtn} ${_===`standard`?d.activeBtn:``}`,onClick:()=>v(`standard`),title:`Fit to standard document page width`,children:`📄 Page Width`}),(0,f.jsx)(`button`,{className:`${d.toolbarBtn} ${_===`full`?d.activeBtn:``}`,onClick:()=>v(`full`),title:`Stretch to full container width`,children:`↔️ Full Width`})]}),(0,f.jsx)(`div`,{className:d.toolbarRight,children:(0,f.jsx)(`span`,{className:d.protectionInfo,children:`🔒 Protected Mode`})})]}),T.isResumeBuilder?(0,f.jsx)(u.Suspense,{fallback:(0,f.jsx)(`div`,{className:d.loadingText,children:`Loading Resume Builder...`}),children:(0,f.jsx)(p,{})}):C===55?(0,f.jsx)(u.Suspense,{fallback:(0,f.jsx)(`div`,{className:d.loadingText,children:`Loading Script Hub...`}),children:(0,f.jsx)(h,{})}):C===58?(0,f.jsx)(u.Suspense,{fallback:(0,f.jsx)(`div`,{className:d.loadingText,children:`Loading Script Hub...`}),children:(0,f.jsx)(m,{})}):(0,f.jsx)(`div`,{className:d.iframeContainer,children:T.isLockedTemporarily?(0,f.jsxs)(`div`,{className:d.lockedState,children:[(0,f.jsx)(`span`,{className:d.lockIcon,children:`🔒`}),(0,f.jsx)(`h2`,{children:`Content Locked`}),(0,f.jsx)(`p`,{className:d.lockText,children:T.lockMessage||`This content will unlock automatically 1 month after your course purchase.`}),(0,f.jsx)(`div`,{className:d.timerBadge,children:(0,f.jsxs)(`span`,{children:[`⏳ Unlocking in: `,T.unlockDays||30,` Days (Scheduled)`]})}),T.topics&&T.topics.length>0&&(0,f.jsxs)(`div`,{className:d.topicsSection,children:[(0,f.jsx)(`h3`,{children:`Topics Covered`}),(0,f.jsx)(`div`,{className:d.topicsGrid,children:T.topics.slice(0,5).map((e,t)=>(0,f.jsxs)(`div`,{className:d.topicItem,children:[(0,f.jsx)(`span`,{className:d.topicBullet,children:`•`}),e]},t))})]})]}):T.iframeLink?(0,f.jsx)(`div`,{className:`${d.iframeWrapper} ${_===`standard`?d.widthStandard:d.widthFull}`,children:(0,f.jsx)(`iframe`,{src:T.iframeLink,className:d.iframe,style:O?{marginTop:`-56px`,height:`calc(100% + 56px)`}:{},sandbox:k?`allow-scripts allow-same-origin allow-forms`:void 0,title:`Premium Module ${T.id} Content`,allowFullScreen:!0,onLoad:e=>{try{let t=e.target.contentDocument||e.target.contentWindow.document;if(t){let e=t.createElement(`style`);e.textContent=`
                      .top-nav, 
                      .announcement-bar, 
                      header, 
                      .module-navigation, 
                      .site-footer,
                      .locked-module { 
                        display: none !important; 
                      }
                      .backLink {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.06);
                        padding: 10px 20px;
                        border-radius: 9999px;
                        color: #94a3b8;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 0.85rem;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        backdrop-filter: blur(10px);
                        position: relative;
                        z-index: 10;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                      }
                      
                      .dashboardLink {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        background: rgba(255, 255, 255, 0.04);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        padding: 10px 20px;
                        border-radius: 9999px;
                        color: #60a5fa;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 0.85rem;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        backdrop-filter: blur(10px);
                        position: relative;
                        z-index: 10;
                        box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2);
                      }
                      
                      .dashboardLink:hover {
                        color: #fff;
                        background: rgba(96, 165, 250, 0.2);
                        border-color: rgba(96, 165, 250, 0.4);
                      }
                      body {
                        background-color: #0f172a !important;
                        color: #fff !important;
                        padding: 20px !important;
                      }
                    `,t.head.appendChild(e)}}catch{}}})}):(0,f.jsxs)(`div`,{className:d.emptyState,children:[(0,f.jsx)(`span`,{className:d.docIcon,children:`📄`}),(0,f.jsx)(`h2`,{children:`Preparing Documentation`}),(0,f.jsx)(`p`,{children:`The premium study materials for this module are currently being attached to the server.`})]})}),(0,f.jsxs)(`div`,{className:d.navRow,children:[E?(0,f.jsx)(t,{to:`/paid-modules/module/${E.id}`,className:d.navBtn,children:`« Previous`}):(0,f.jsx)(`div`,{}),(0,f.jsx)(t,{to:`/paid-modules`,className:d.navBtn,children:`📘 All Modules`}),D?(0,f.jsx)(t,{to:`/paid-modules/module/${D.id}`,className:d.navBtn,children:`Next »`}):(0,f.jsx)(`div`,{})]})]}):(0,f.jsx)(`div`,{className:d.detailPage,children:(0,f.jsxs)(`div`,{className:d.emptyState,children:[(0,f.jsx)(`h2`,{children:`Module not found`}),(0,f.jsx)(t,{to:`/paid-modules`,className:d.navBtn,children:`Back to Premium Modules`})]})})};export{g as default};