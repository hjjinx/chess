(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(i,t,r){},15:function(i,t,r){"use strict";r.r(t);var l=r(0),e=r.n(l),n=r(7),a=r.n(n),s=(r(13),r(1)),u=r(2),f=r(4),o=r(3),p=r(5),h=function(i){function t(){var i,r;Object(s.a)(this,t);for(var l=arguments.length,e=new Array(l),n=0;n<l;n++)e[n]=arguments[n];return(r=Object(f.a)(this,(i=Object(o.a)(t)).call.apply(i,[this].concat(e)))).handleClick=function(){var i=r.props.currTurn,t=r.props.boxId.split(""),l=parseInt(t[0]),e=parseInt(t[1]),n=r.props.units[l][e];if(!0===r.props.highlighted[l][e])r.props.moveUnit(l,e);else if(null!==n){i===r.props.units[l][e].split("_")[0]&&r.props.handleSelect(l,e)}},r}return Object(p.a)(t,i),Object(u.a)(t,[{key:"render",value:function(){var i="box",t=this.props.boxId.split(""),r=parseInt(t[0]),l=parseInt(t[1]);i+=(r+l)%2===0?" white":" black";var n=this.props.units[r][l];if(null!==n){var a=n.split("_")[0];i+=" "+a,i+=" "+n.split("_")[1]}if(this.props.highlighted[r][l]){var s=this.props.currTurn;i+="W"===a&&"B"===s?" highlightedKill":"B"===a&&"W"===s?" highlightedKill":" highlighted"}return e.a.createElement("div",{className:i,onClick:this.handleClick})}}]),t}(l.Component),v=function(i){function t(){return Object(s.a)(this,t),Object(f.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(p.a)(t,i),Object(u.a)(t,[{key:"render",value:function(){var i="grid ";i+=this.props.currTurn;for(var t=[],r=0;r<8;r++){t.push([]);for(var l=0;l<8;l++){var n=r+""+l;t[r].push(e.a.createElement(h,{units:this.props.units,currTurn:this.props.currTurn,key:n,boxId:n,handleSelect:this.props.handleSelect,highlighted:this.props.highlighted,moveUnit:this.props.moveUnit}))}}return e.a.createElement("div",{className:i,style:{width:720}},t)}}]),t}(l.Component);function c(i){return JSON.parse(JSON.stringify(i))}var _=function(i){function t(){var i;return Object(s.a)(this,t),(i=Object(f.a)(this,Object(o.a)(t).call(this))).newGame=function(){for(var t=Array(8).fill().map(function(){return Array(8).fill(null)}),r=0;r<8;r++)t[1][r]="B_Pawn",t[6][r]="W_Pawn";t[0][4]="B_King",t[0][0]="B_Rook",t[0][7]="B_Rook",t[0][1]="B_Knight",t[0][6]="B_Knight",t[0][2]="B_Bishop",t[0][5]="B_Bishop",t[0][3]="B_Queen",t[7][4]="W_King",t[7][0]="W_Rook",t[7][7]="W_Rook",t[7][1]="W_Knight",t[7][6]="W_Knight",t[7][2]="W_Bishop",t[7][5]="W_Bishop",t[7][3]="W_Queen",i.setState({units:t})},i.unHighlight=function(i,t){var r=Array(8).fill().map(function(){return Array(8).fill(!1)});return r[i][t]=!0,r},i.handleSelect=function(t,r){var l=c(i.state.highlighted),e=c(i.state.boxSelected);0===e.length&&e.push([t,r]),e.length>1&&e.shift(),e.push([t,r]),i.setState({boxSelected:e}),l=i.unHighlight(t,r);var n=i.state.units[t][r].split("_")[1];switch(i.setState({highlighted:l,boxSelected:e}),n){case"Pawn":i.pawn(t,r,l);break;case"Rook":i.rook(t,r,l);break;case"Knight":i.knight(t,r,l);break;case"Bishop":i.bishop(t,r,l);break;case"Queen":i.queen(t,r,l);break;case"King":i.king(t,r,l)}},i.moveUnit=function(t,r){var l=i.unHighlight(t,r);l[t][r]=!1;var e=c(i.state.boxSelected),n=c(i.state.units),a=parseInt(e[1][0]),s=parseInt(e[1][1]);if(t!==a||r!==s){e.length>1&&e.shift(),e.push([t,r]);var u=n[a][s],f=n[t][r];if(null!==f&&"King"===f.split("_")[1])return i.newGame(),void i.setState({highlighted:Array(8).fill().map(function(){return Array(8).fill(!1)})});n[t][r]=u,n[a][s]=null;var o=i.state.currTurn;o="W"===o?"B":"W",i.setState({units:n,currTurn:o,boxSelected:e,highlighted:l})}},i.pawn=function(t,r,l){var e=c(i.state.units),n=i.state.currTurn;if("W"===n){if(null===e[t-1][r]&&(l[t-1][r]=!0,6===t&&null===e[t-2][r]&&(l[t-2][r]=!0)),r>0){var a=e[t-1][r-1];if(null!==a)"B"===a.split("_")[0]&&(l[t-1][r-1]=!0)}if(r<7){var s=e[t-1][r+1];if(null!==s)"B"===s.split("_")[0]&&(l[t-1][r+1]=!0)}}if("B"===n){if(null===e[t+1][r]&&(l[t+1][r]=!0,1===t&&null===e[t+2][r]&&(l[t+2][r]=!0)),r>0){var u=e[t+1][r-1];if(null!==u)"W"===u.split("_")[0]&&(l[t+1][r-1]=!0)}if(r<7){var f=e[t+1][r+1];if(null!==f)"W"===f.split("_")[0]&&(l[t+1][r+1]=!0)}}i.setState({highlighted:l})},i.rook=function(t,r,l){var e=c(i.state.units);if("W"===i.state.currTurn){if(t>0)for(var n=t-1;n>=0;n--){var a=e[n][r];if(null!==a){if("B"===(a=a.split("_"))[0]){l[n][r]=!0;break}break}l[n][r]=!0}if(t<7)for(var s=t+1;s<=7;s++){var u=e[s][r];if(null!==u){if("B"===(u=u.split("_"))[0]){l[s][r]=!0;break}break}l[s][r]=!0}if(r>0)for(var f=r-1;f>=0;f--){var o=e[t][f];if(null!==o){if("B"===(o=o.split("_"))[0]){l[t][f]=!0;break}break}l[t][f]=!0}if(r<7)for(var p=r+1;p<=7;p++){var h=e[t][p];if(null!==h){if("B"===(h=h.split("_"))[0]){l[t][p]=!0;break}break}l[t][p]=!0}}else{if(t>0)for(var v=t-1;v>=0;v--){var _=e[v][r];if(null!==_){if("W"===(_=_.split("_"))[0]){l[v][r]=!0;break}break}l[v][r]=!0}if(t<7)for(var b=t+1;b<=7;b++){var g=e[b][r];if(null!==g){if("W"===(g=g.split("_"))[0]){l[b][r]=!0;break}break}l[b][r]=!0}if(r>0)for(var k=r-1;k>=0;k--){var d=e[t][k];if(null!==d){if("W"===(d=d.split("_"))[0]){l[t][k]=!0;break}break}l[t][k]=!0}if(r<7)for(var W=r+1;W<=7;W++){var B=e[t][W];if(null!==B){if("W"===(B=B.split("_"))[0]){l[t][W]=!0;break}break}l[t][W]=!0}}i.setState({highlighted:l})},i.knight=function(t,r,l){var e=c(i.state.units);if("W"===i.state.currTurn){if(t>=2){if(r>=1){var n=e[t-2][r-1];null===n?l[t-2][r-1]=!0:"B"===(n=n.split("_"))[0]&&(l[t-2][r-1]=!0)}if(r<=6){var a=e[t-2][r+1];null===a?l[t-2][r+1]=!0:"B"===(a=a.split("_"))[0]&&(l[t-2][r+1]=!0)}}if(t<=5){if(r>=1){var s=e[t+2][r-1];null===s?l[t+2][r-1]=!0:"B"===(s=s.split("_"))[0]&&(l[t+2][r-1]=!0)}if(r<=6){var u=e[t+2][r+1];null===u?l[t+2][r+1]=!0:"B"===(u=u.split("_"))[0]&&(l[t+2][r+1]=!0)}}if(r>=2){if(t>=1){var f=e[t-1][r-2];null===f?l[t-1][r-2]=!0:"B"===(f=f.split("_"))[0]&&(l[t-1][r-2]=!0)}if(t<=6){var o=e[t+1][r-2];null===o?l[t+1][r-2]=!0:"B"===(o=o.split("_"))[0]&&(l[t+1][r-2]=!0)}}if(r<=5){if(t>=1){var p=e[t-1][r+2];null===p?l[t-1][r+2]=!0:"B"===(p=p.split("_"))[0]&&(l[t-1][r+2]=!0)}if(t<=6){var h=e[t+1][r+2];null===h?l[t+1][r+2]=!0:"B"===(h=h.split("_"))[0]&&(l[t+1][r+2]=!0)}}}else{if(t>=2){if(r>=1){var v=e[t-2][r-1];null===v?l[t-2][r-1]=!0:"W"===(v=v.split("_"))[0]&&(l[t-2][r-1]=!0)}if(r<=6){var _=e[t-2][r+1];null===_?l[t-2][r+1]=!0:"W"===(_=_.split("_"))[0]&&(l[t-2][r+1]=!0)}}if(t<=5){if(r>=1){var b=e[t+2][r-1];null===b?l[t+2][r-1]=!0:"W"===(b=b.split("_"))[0]&&(l[t+2][r-1]=!0)}if(r<=6){var g=e[t+2][r+1];null===g?l[t+2][r+1]=!0:"W"===(g=g.split("_"))[0]&&(l[t+2][r+1]=!0)}}if(r>=2){if(t>=1){var k=e[t-1][r-2];null===k?l[t-1][r-2]=!0:"W"===(k=k.split("_"))[0]&&(l[t-1][r-2]=!0)}if(r<=6){var d=e[t+1][r-2];null===d?l[t+1][r-2]=!0:"W"===(d=d.split("_"))[0]&&(l[t+1][r-2]=!0)}}if(r<=5){if(t>=1){var W=e[t-1][r+2];null===W?l[t-1][r+2]=!0:"W"===(W=W.split("_"))[0]&&(l[t-1][r+2]=!0)}if(t<=6){var B=e[t+1][r+2];null===B?l[t+1][r+2]=!0:"W"===(B=B.split("_"))[0]&&(l[t+1][r+2]=!0)}}}},i.bishop=function(t,r,l){var e=c(i.state.units);if("W"===i.state.currTurn){for(var n=1;n<8;n++)if(t-n>=0&&r+n<=7){var a=e[t-n][r+n];if(null!==a){if("B"===(a=a.split("_"))[0]){l[t-n][r+n]=!0;break}break}l[t-n][r+n]=!0}for(var s=1;s<8;s++)if(t+s<=7&&r+s<=7){var u=e[t+s][r+s];if(null!==u){if("B"===(u=u.split("_"))[0]){l[t+s][r+s]=!0;break}break}l[t+s][r+s]=!0}for(var f=1;f<8;f++)if(t+f<=7&&r-f>=0){var o=e[t+f][r-f];if(null!==o){if("B"===(o=o.split("_"))[0]){l[t+f][r-f]=!0;break}break}l[t+f][r-f]=!0}for(var p=1;p<8;p++)if(t-p>=0&&r-p>=0){var h=e[t-p][r-p];if(null!==h){if("B"===(h=h.split("_"))[0]){l[t-p][r-p]=!0;break}break}l[t-p][r-p]=!0}}else{for(var v=1;v<8;v++)if(t-v>=0&&r+v<=7){var _=e[t-v][r+v];if(null!==_){if("W"===(_=_.split("_"))[0]){l[t-v][r+v]=!0;break}break}l[t-v][r+v]=!0}for(var b=1;b<8;b++)if(t+b<=7&&r+b<=7){var g=e[t+b][r+b];if(null!==g){if("W"===(g=g.split("_"))[0]){l[t+b][r+b]=!0;break}break}l[t+b][r+b]=!0}for(var k=1;k<8;k++)if(t+k<=7&&r-k>=0){var d=e[t+k][r-k];if(null!==d){if("W"===(d=d.split("_"))[0]){l[t+k][r-k]=!0;break}break}l[t+k][r-k]=!0}for(var W=1;W<8;W++)if(t-W>=0&&r-W>=0){var B=e[t-W][r-W];if(null!==B){if("W"===(B=B.split("_"))[0]){l[t-W][r-W]=!0;break}break}l[t-W][r-W]=!0}}i.setState({highlighted:l})},i.king=function(t,r,l){var e=c(i.state.units);if("W"===i.state.currTurn){if(t>=1){var n=e[t-1][r];if(console.log(n),null===n?l[t-1][r]=!0:"B"===(n=n.split("_"))[0]&&(l[t-1][r]=!0),r>=1){var a=e[t-1][r-1];null===a?l[t-1][r-1]=!0:"B"===(a=a.split("_"))[0]&&(l[t-1][r-1]=!0)}if(r<=6){var s=e[t-1][r+1];null===s?l[t-1][r+1]=!0:"B"===(s=s.split("_"))[0]&&(l[t-1][r+1]=!0)}}if(t<=6){var u=e[t+1][r];if(console.log(u),null===u?l[t+1][r]=!0:"B"===(u=u.split("_"))[0]&&(l[t+1][r]=!0),r>=1){var f=e[t+1][r-1];null===f?l[t+1][r-1]=!0:"B"===(f=f.split("_"))[0]&&(l[t+1][r-1]=!0)}if(r<=6){var o=e[t+1][r+1];null===o?l[t+1][r+1]=!0:"B"===(o=o.split("_"))[0]&&(l[t+1][r+1]=!0)}}if(r>=1){var p=e[t][r-1];null===p?l[t][r-1]=!0:"B"===(p=p.split("_"))[0]&&(l[t][r-1]=!0)}if(r<=6){var h=e[t][r+1];null===h?l[t][r+1]=!0:"B"===(h=h.split("_"))[0]&&(l[t][r+1]=!0)}}else{if(t>=1){var v=e[t-1][r];if(console.log(v),null===v?l[t-1][r]=!0:"W"===(v=v.split("_"))[0]&&(l[t-1][r]=!0),r>=1){var _=e[t-1][r-1];null===_?l[t-1][r-1]=!0:"W"===(_=_.split("_"))[0]&&(l[t-1][r-1]=!0)}if(r<=6){var b=e[t-1][r+1];null===b?l[t-1][r+1]=!0:"W"===(b=b.split("_"))[0]&&(l[t-1][r+1]=!0)}}if(t<=6){var g=e[t+1][r];if(console.log(g),null===g?l[t+1][r]=!0:"W"===(g=g.split("_"))[0]&&(l[t+1][r]=!0),r>=1){var k=e[t+1][r-1];null===k?l[t+1][r-1]=!0:"W"===(k=k.split("_"))[0]&&(l[t+1][r-1]=!0)}if(r<=6){var d=e[t+1][r+1];null===d?l[t+1][r+1]=!0:"W"===(d=d.split("_"))[0]&&(l[t+1][r+1]=!0)}}if(r>=1){var W=e[t][r-1];null===W?l[t][r-1]=!0:"W"===(W=W.split("_"))[0]&&(l[t][r-1]=!0)}if(r<=6){var B=e[t][r+1];null===B?l[t][r+1]=!0:"W"===(B=B.split("_"))[0]&&(l[t][r+1]=!0)}}},i.queen=function(t,r,l){i.rook(t,r,l),i.bishop(t,r,l)},i.state={units:Array(8).fill().map(function(){return Array(8).fill(null)}),highlighted:Array(8).fill().map(function(){return Array(8).fill(!1)}),boxesChanged:[],currTurn:"W",boxSelected:[]},i}return Object(p.a)(t,i),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.newGame()}},{key:"render",value:function(){return e.a.createElement(v,{units:this.state.units,currTurn:this.state.currTurn,key:"Grid",handleSelect:this.handleSelect,highlighted:this.state.highlighted,moveUnit:this.moveUnit})}}]),t}(l.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(e.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(i){i.unregister()})},8:function(i,t,r){i.exports=r(15)}},[[8,2,1]]]);
//# sourceMappingURL=main.90dba4f1.chunk.js.map