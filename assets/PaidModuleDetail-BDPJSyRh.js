import{i as e,n as t,t as n}from"./jsx-runtime-BHwPObl3.js";import{t as r}from"./supabase-BT7iY704.js";import{a as i,n as a,o,r as s}from"./index-MnSeSxLy.js";import{t as c}from"./paidModulesData-BYLpoftF.js";var l=e(t(),1),u={detailPage:`_detailPage_1ncv6_1`,loadingText:`_loadingText_1ncv6_31`,backLink:`_backLink_1ncv6_40`,header:`_header_1ncv6_67`,badgeWrapper:`_badgeWrapper_1ncv6_74`,premiumBadge:`_premiumBadge_1ncv6_81`,moduleIdBadge:`_moduleIdBadge_1ncv6_92`,topicsSection:`_topicsSection_1ncv6_121`,topicsHeader:`_topicsHeader_1ncv6_133`,expanded:`_expanded_1ncv6_145`,chevronIcon:`_chevronIcon_1ncv6_149`,topicsGrid:`_topicsGrid_1ncv6_163`,topicItem:`_topicItem_1ncv6_169`,topicBullet:`_topicBullet_1ncv6_189`,toggleTopicsBtn:`_toggleTopicsBtn_1ncv6_195`,viewerToolbar:`_viewerToolbar_1ncv6_219`,secureStatus:`_secureStatus_1ncv6_234`,pulseDot:`_pulseDot_1ncv6_245`,pulse:`_pulse_1ncv6_245`,toolbarCenter:`_toolbarCenter_1ncv6_270`,toolbarBtn:`_toolbarBtn_1ncv6_278`,activeBtn:`_activeBtn_1ncv6_298`,protectionInfo:`_protectionInfo_1ncv6_304`,iframeContainer:`_iframeContainer_1ncv6_312`,iframeWrapper:`_iframeWrapper_1ncv6_327`,widthStandard:`_widthStandard_1ncv6_335`,widthFull:`_widthFull_1ncv6_339`,iframe:`_iframe_1ncv6_312`,emptyState:`_emptyState_1ncv6_351`,docIcon:`_docIcon_1ncv6_366`,lockedState:`_lockedState_1ncv6_373`,lockIcon:`_lockIcon_1ncv6_385`,float:`_float_1ncv6_1`,lockText:`_lockText_1ncv6_402`,timerBadge:`_timerBadge_1ncv6_410`,navRow:`_navRow_1ncv6_434`,navBtn:`_navBtn_1ncv6_443`},d=n(),f=()=>{let{id:e}=o(),{user:t}=a(),n=i(),[f,p]=(0,l.useState)(!0),[m,h]=(0,l.useState)(`standard`),[g,_]=(0,l.useState)(!1),[v,y]=(0,l.useState)(!1);if((0,l.useEffect)(()=>{if(t!==void 0){if(!t){n(`/login`);return}(async()=>{try{let{data:e,error:i}=await r.from(`profiles`).select(`*`).eq(`id`,t.id).single();if(i||!e){n(`/dashboard`);return}e.course_active&&(e=>e&&new Date(e).getTime()>Date.now())(e.course_expiry)?p(!1):n(`/dashboard`)}catch{n(`/dashboard`)}})()}},[t,n]),(0,l.useEffect)(()=>{window.scrollTo({top:0,behavior:`instant`}),_(!1),y(!1)},[e]),(0,l.useEffect)(()=>{let e=e=>{e.preventDefault()},t=e=>{e.preventDefault(),alert(`Copying is disabled for premium study materials.`)},n=e=>{e.preventDefault()},r=e=>{let t=e.ctrlKey||e.metaKey,n=e.key.toLowerCase();t&&(n===`c`||n===`p`||n===`s`)&&(e.preventDefault(),alert(`Copying, printing, and saving are disabled for premium study materials.`))};return window.addEventListener(`contextmenu`,e),window.addEventListener(`copy`,t),window.addEventListener(`dragstart`,n),window.addEventListener(`keydown`,r),()=>{window.removeEventListener(`contextmenu`,e),window.removeEventListener(`copy`,t),window.removeEventListener(`dragstart`,n),window.removeEventListener(`keydown`,r)}},[]),f)return(0,d.jsx)(`div`,{className:u.detailPage,children:(0,d.jsx)(`div`,{className:u.loadingText,children:`Securing connection... ⏳`})});let b=parseInt(e),x=(c||[]).findIndex(e=>e.id===b),S=x===-1?null:c[x],C=x>0?c[x-1]:null,w=x<(c||[]).length-1?c[x+1]:null,T=S&&S.iframeLink&&S.iframeLink.includes(`drive.google.com`),E=S&&S.iframeLink&&(S.iframeLink.includes(`drive.google.com`)||S.iframeLink.includes(`docs.google.com`));return S?(0,d.jsxs)(`div`,{className:u.detailPage,children:[(0,d.jsx)(s,{to:`/paid-modules`,className:u.backLink,children:`← Back to Paid Modules`}),(0,d.jsx)(s,{to:`/dashboard`,className:u.dashboardLink,children:`Go to Dashboard`}),(0,d.jsxs)(`header`,{className:u.header,children:[(0,d.jsxs)(`div`,{className:u.badgeWrapper,children:[(0,d.jsx)(`span`,{className:u.premiumBadge,children:`✨ PREMIUM ACCESS`}),(0,d.jsxs)(`span`,{className:u.moduleIdBadge,children:[`Module `,S.id]})]}),(0,d.jsx)(`h1`,{children:S.title}),(0,d.jsx)(`p`,{children:S.description})]}),S.topics&&S.topics.length>0&&(0,d.jsxs)(`section`,{className:u.topicsSection,children:[(0,d.jsxs)(`h2`,{onClick:()=>_(!g),className:`${u.topicsHeader} ${g?u.expanded:``}`,style:{cursor:`pointer`,userSelect:`none`},title:`Click to toggle topics list`,children:[(0,d.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,d.jsx)(`span`,{role:`img`,"aria-label":`topics`,children:`📚`}),` Topics Covered`]}),(0,d.jsx)(`span`,{className:u.chevronIcon,children:g?`▲`:`▼`})]}),g&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`div`,{className:u.topicsGrid,children:(v?S.topics:S.topics.slice(0,4)).map((e,t)=>(0,d.jsxs)(`div`,{className:u.topicItem,children:[(0,d.jsx)(`span`,{className:u.topicBullet,children:`•`}),(0,d.jsx)(`span`,{children:e})]},t))}),S.topics.length>4&&(0,d.jsx)(`button`,{className:u.toggleTopicsBtn,onClick:()=>y(!v),title:v?`Collapse list`:`Expand list`,children:v?`▲ Show Less`:`▼ Show More (+${S.topics.length-4})`})]})]}),S.iframeLink&&!S.isLockedTemporarily&&(0,d.jsxs)(`div`,{className:u.viewerToolbar,children:[(0,d.jsx)(`div`,{className:u.toolbarLeft,children:(0,d.jsxs)(`span`,{className:u.secureStatus,children:[(0,d.jsx)(`span`,{className:u.pulseDot}),`SECURE PREMIUM VIEWER`]})}),(0,d.jsxs)(`div`,{className:u.toolbarCenter,children:[(0,d.jsx)(`button`,{className:`${u.toolbarBtn} ${m===`standard`?u.activeBtn:``}`,onClick:()=>h(`standard`),title:`Fit to standard document page width`,children:`📄 Page Width`}),(0,d.jsx)(`button`,{className:`${u.toolbarBtn} ${m===`full`?u.activeBtn:``}`,onClick:()=>h(`full`),title:`Stretch to full container width`,children:`↔️ Full Width`})]}),(0,d.jsx)(`div`,{className:u.toolbarRight,children:(0,d.jsx)(`span`,{className:u.protectionInfo,children:`🔒 Protected Mode`})})]}),(0,d.jsx)(`div`,{className:u.iframeContainer,children:S.isLockedTemporarily?(0,d.jsxs)(`div`,{className:u.lockedState,children:[(0,d.jsx)(`span`,{className:u.lockIcon,children:`🔒`}),(0,d.jsx)(`h2`,{children:`Content Locked`}),(0,d.jsx)(`p`,{className:u.lockText,children:S.lockMessage||`This content will unlock automatically 1 month after your course purchase.`}),(0,d.jsx)(`div`,{className:u.timerBadge,children:(0,d.jsxs)(`span`,{children:[`⏳ Unlocking in: `,S.unlockDays||30,` Days (Scheduled)`]})})]}):S.iframeLink?(0,d.jsx)(`div`,{className:`${u.iframeWrapper} ${m===`standard`?u.widthStandard:u.widthFull}`,children:(0,d.jsx)(`iframe`,{src:S.iframeLink,className:u.iframe,style:T?{marginTop:`-56px`,height:`calc(100% + 56px)`}:{},sandbox:E?`allow-scripts allow-same-origin allow-forms`:void 0,title:`Premium Module ${S.id} Content`,allowFullScreen:!0,onLoad:e=>{try{let t=e.target.contentDocument||e.target.contentWindow.document;if(t){let e=t.createElement(`style`);e.textContent=`
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
                    `,t.head.appendChild(e)}}catch{}}})}):(0,d.jsxs)(`div`,{className:u.emptyState,children:[(0,d.jsx)(`span`,{className:u.docIcon,children:`📄`}),(0,d.jsx)(`h2`,{children:`Preparing Documentation`}),(0,d.jsx)(`p`,{children:`The premium study materials for this module are currently being attached to the server.`})]})}),(0,d.jsxs)(`div`,{className:u.navRow,children:[C?(0,d.jsx)(s,{to:`/paid-modules/module/${C.id}`,className:u.navBtn,children:`« Previous`}):(0,d.jsx)(`div`,{}),(0,d.jsx)(s,{to:`/paid-modules`,className:u.navBtn,children:`📘 All Modules`}),w?(0,d.jsx)(s,{to:`/paid-modules/module/${w.id}`,className:u.navBtn,children:`Next »`}):(0,d.jsx)(`div`,{})]})]}):(0,d.jsx)(`div`,{className:u.detailPage,children:(0,d.jsxs)(`div`,{className:u.emptyState,children:[(0,d.jsx)(`h2`,{children:`Module not found`}),(0,d.jsx)(s,{to:`/paid-modules`,className:u.navBtn,children:`Back to Premium Modules`})]})})};export{f as default};