(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var c=n(16),a=n.n(c),o=n(7),r=n(3),u=n(2),i=n(4),l=n.n(i),s="http://localhost:3001/api/people",d={getAll:function(){return l.a.get(s).then((function(e){return e.data}))},create:function(e){return l.a.post(s,e).then((function(e){return e.data}))},update:function(e,t){return l.a.put("".concat(s,"/").concat(e),t)},deleteContact:function(e){return l.a.delete("".concat(s,"/").concat(e)).then((function(e){return console.log("contact deleted",e)}))}},b=n(0),j=function(e){var t=e.message,n=e.notificationType;return null===t?null:"success"===n?Object(b.jsx)("div",{className:"success",children:t}):Object(b.jsx)("div",{className:"error",children:t})},h=function(e){var t=e.inputControlState,n=e.changeHandler;return Object(b.jsxs)("div",{children:["filter shown with:"," ",Object(b.jsx)("input",{value:t,onChange:n})]})},f=function(e){var t=e.submitHandler,n=e.inputControlState,c=e.changeHandler;return Object(b.jsxs)("form",{onSubmit:t,children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:n[0],onChange:c[0]})]}),Object(b.jsxs)("div",{children:["number:"," ",Object(b.jsx)("input",{value:n[1],onChange:c[1]})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]})},p=function(e){var t=e.people,n=e.peopleState,c=e.handleDeleteContact,a=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return Object(b.jsx)("ul",{children:a.map((function(e){return Object(b.jsxs)("li",{children:[e.name," ",e.number," ",Object(b.jsx)(O,{id:e.id,handleDeleteContact:c,contactName:e.name})]},e.id)}))})},O=function(e){var t=e.id,n=e.handleDeleteContact,c=e.contactName;return Object(b.jsx)("button",{onClick:function(){return n(t,c)},children:"delete"})},m=function(){var e=Object(u.useState)([]),t=Object(r.a)(e,2),n=t[0],c=t[1],a=Object(u.useState)(""),i=Object(r.a)(a,2),l=i[0],s=i[1],O=Object(u.useState)(""),m=Object(r.a)(O,2),v=m[0],x=m[1],g=Object(u.useState)(""),C=Object(r.a)(g,2),S=C[0],w=C[1],k=Object(u.useState)(null),y=Object(r.a)(k,2),D=y[0],H=y[1],N=Object(u.useState)(null),T=Object(r.a)(N,2),E=T[0],A=T[1];Object(u.useEffect)((function(){d.getAll().then((function(e){c(e)}))}),[]);return Object(b.jsxs)("div",{children:[Object(b.jsx)(j,{message:D,notificationType:E}),Object(b.jsx)("h2",{children:"Phonebook"}),Object(b.jsx)(h,{inputControlState:S,changeHandler:function(e){w(e.target.value)}}),Object(b.jsx)("h2",{children:"add a new"}),Object(b.jsx)(f,{submitHandler:function(e){e.preventDefault();var t=n.find((function(e){return e.name===l&&e.number===v})),a=n.find((function(e){return e.name===l}));if(t)alert("".concat(l," is already added to phonebook"));else if(a){if(window.confirm("".concat(l," is already added to phonebook, replace the old number with a new one?"))){var r=Object(o.a)(Object(o.a)({},a),{},{number:v});d.update(r.id,r).then((function(e){console.log("axios response:",e.data),c(n.map((function(t){return t.id!==r.id?t:e.data}))),A("success"),H("".concat(r.name,"'s details have been successfully updated.")),setTimeout((function(){H(null),A(null)}),5e3),s(""),x("")})).catch((function(e){A("error"),H("Error ".concat(e.response.status,": ").concat(r.name," has already been deleted from the server.")),setTimeout((function(){H(null),A(null)}),5e3),console.log(e)}))}}else{var u={name:l,number:v,date:(new Date).toISOString()};d.create(u).then((function(e){c(n.concat(e)),s(""),x(""),H("".concat(u.name," has been successfully added to the phonebook.")),A("success"),setTimeout((function(){H(null),A(null)}),5e3)}))}},inputControlState:[l,v],changeHandler:[function(e){s(e.target.value)},function(e){console.log(v),x(e.target.value)}]}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)(p,{people:n,peopleState:S,handleDeleteContact:function(e,t){window.confirm("Delete ".concat(t,"?"))&&(d.deleteContact(e),c(n.filter((function(t){return t.id!==e}))))}})]})};n(41);a.a.render(Object(b.jsx)(m,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.b5753321.chunk.js.map