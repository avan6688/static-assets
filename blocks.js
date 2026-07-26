// 共享 A/B block 生成 + 测量：保证各 context（device-width / 无 viewport / 宽溢出 / iframe）下
// 文本、宽度、结构完全一致，唯一变量 = text-size-adjust 与所在页的 viewport/布局 context。
(function(){
  var DESC = "高颜值巨乳网红晨练私房大秀身材超话题今日份福利已送达记得点赞收藏关注不迷路更多精彩持续更新中";
  var css = ""
    + "html{font-size:1px;}"  // = Shorts.vue 进页 html{font-size:1px} 的 rem 体系
    + "body{margin:0;background:#111;color:#fff;font-family:-apple-system,'PingFang SC',sans-serif;}"
    + ".block{border:1px solid #444;margin:8px 0;padding:6px;}"
    + ".label{font-size:11px;color:#8cf;-webkit-text-size-adjust:100%;text-size-adjust:100%;}"
    + ".item-desc{width:70%;}"  // = ItemDesc .item-desc width:70%
    + ".description{line-height:1.4;word-break:break-word;font-size:14px;}"  // = ItemDesc .description（继承 14px）
    + ".tsa-auto .description{-webkit-text-size-adjust:auto;text-size-adjust:auto;}"   // 修复前 ssp-overlay
    + ".tsa-100 .description{-webkit-text-size-adjust:100%;text-size-adjust:100%;}"    // 修复后 ssp-overlay
    + ".tsa-none .description{-webkit-text-size-adjust:none;text-size-adjust:none;}"
    + ".f12 .description{font-size:12px;}"
    + ".nowrap .description{white-space:nowrap;overflow:hidden;}";
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  function block(id,cls,label){
    return '<div class="block '+cls+'" id="'+id+'"><div class="label">'+label
      +'</div><div class="item-desc"><div class="description" id="d_'+id+'">'+DESC+'</div></div></div>';
  }
  var html=""
    + block("auto14","tsa-auto","A auto/14px (=修复前 ssp-overlay)")
    + block("fix14","tsa-100","B 100%/14px (=修复后 ssp-overlay)")
    + block("none14","tsa-none","C none/14px")
    + block("auto12","tsa-auto f12","A2 auto/12px")
    + block("fix12","tsa-100 f12","B2 100%/12px")
    + block("nowrap","tsa-auto nowrap","CTRL auto/nowrap");
  var host=document.getElementById('root')||document.body;
  host.insertAdjacentHTML('beforeend', html);

  function measure(id){
    var el=document.getElementById(id); if(!el) return null;
    var cs=getComputedStyle(el); var r=el.getBoundingClientRect();
    return {computedFontSize:cs.fontSize,tsa:(cs.webkitTextSizeAdjust||cs.textSizeAdjust||'n/a'),
            rectH:Math.round(r.height),rectW:Math.round(r.width),lineHeight:cs.lineHeight};
  }
  window.__measureAll=function(){
    var ids=['d_auto14','d_fix14','d_none14','d_auto12','d_fix12','d_nowrap'];
    var res={innerW:window.innerWidth,dpr:window.devicePixelRatio,
             docW:document.documentElement.clientWidth,ua:navigator.userAgent};
    ids.forEach(function(id){res[id]=measure(id);});
    return res;
  };
})();
