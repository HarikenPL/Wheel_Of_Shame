/* One adapter for local persistence. A future server adapter belongs here. */
(function(root){'use strict';
root.WLStorage={get:key=>localStorage.getItem(key),set:(key,value)=>localStorage.setItem(key,value),remove:key=>localStorage.removeItem(key)};
})(globalThis);
