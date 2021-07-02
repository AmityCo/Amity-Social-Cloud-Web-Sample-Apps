export const download = (url, name) => {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + name);
  element.setAttribute("download", url);
  element.style.display = "none";

  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
